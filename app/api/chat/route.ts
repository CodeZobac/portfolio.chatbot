import { streamText, convertToCoreMessages, stepCountIs } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { tools } from "@/lib/ai/tools";

const manifest = createOpenAI({
  baseURL: "https://app.manifest.build/v1",
  apiKey: process.env.MANIFEST_API_KEY,
  fetch: async (url, init) => {
    if (init?.body && typeof init.body === "string") {
      try {
        const body = JSON.parse(init.body);

        // Strip stream_options - OpenAI-specific, rejected by upstream providers
        delete body.stream_options;

        // Fix "developer" role -> "system": the AI SDK treats unknown
        // model IDs as "reasoning models" and converts system messages
        // to "developer" role, which DeepSeek and others don't support.
        if (body.messages) {
          for (const msg of body.messages) {
            if (msg.role === "developer") {
              msg.role = "system";
            }
          }
        }

        init = { ...init, body: JSON.stringify(body) };
      } catch {
        /* ignore */
      }
    }
    return fetch(url, init);
  },
});

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({
          error: "Invalid request: messages array is required",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    if (!process.env.MANIFEST_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Manifest API key not found" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const result = streamText({
      model: manifest.chat("auto"),
      system: SYSTEM_PROMPT,
      messages: convertToCoreMessages(messages),
      tools,
      maxOutputTokens: 40000,
      stopWhen: stepCountIs(3),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: errorMessage,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
