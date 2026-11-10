import { streamText, convertToCoreMessages, stepCountIs } from "ai";
import { createDeepSeek } from "@ai-sdk/deepseek";
import { after } from "next/server";
import { context, trace } from "@opentelemetry/api";
import { propagateAttributes, startObservation } from "@langfuse/tracing";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { latestUserText, resolveToolIntent } from "@/lib/ai/tool-intent";
import { createToolPolicy } from "@/lib/ai/tool-policy";
import { LAYERS, getSpanProcessor, tracingEnabled } from "@/lib/observability/layers";

const MODEL_ID = "deepseek-chat";
const deepseek = createDeepSeek({ apiKey: process.env.DEEPSEEK_API_KEY });

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export async function POST(request: Request) {
  try {
    const { messages, sessionId } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return json({ error: "Invalid request: messages array is required" }, 400);
    }

    if (!process.env.DEEPSEEK_API_KEY) {
      return json({ error: "DeepSeek API key not found" }, 500);
    }

    const userText = latestUserText(messages);
    const traced = tracingEnabled();

    // Layer 1 (interaction.session): one trace per chat turn, ended when the stream ends.
    const root = traced
      ? startObservation(
          LAYERS.session,
          {
            input: userText,
            metadata: { channel: "web", product: "portfolio-chatbot", turn: messages.length },
          },
          { asType: "agent" },
        )
      : undefined;
    const finish = (output: unknown, level?: "ERROR") => {
      if (!root) return;
      root.update({ output, ...(level ? { level } : {}) });
      root.end();
    };
    const run = <T,>(fn: () => T): T =>
      root ? context.with(trace.setSpan(context.active(), root.otelSpan), fn) : fn();

    return await run(() =>
      propagateAttributes(
        {
          traceName: LAYERS.session,
          ...(typeof sessionId === "string" ? { sessionId } : {}),
          tags: ["portfolio-chatbot"],
        },
        () => {
          // Layer 2 (orchestration.flow): intent routing and tool policy.
          const flow = root?.startObservation(LAYERS.orchestration, { input: userText }, { asType: "chain" });
          const intent = resolveToolIntent(userText);
          const policy = createToolPolicy(intent);
          flow?.update({
            output: { selectedTools: intent.selectedTools },
            metadata: {
              strategy: "tool_using_agent",
              maxSteps: policy.maxSteps,
              projectIds: intent.projectIds,
              skillIds: intent.skillIds,
            },
          });
          flow?.end();

          // Layer 4 (model.inference): the AI SDK emits one generation per model call.
          const result = streamText({
            model: deepseek(MODEL_ID),
            system: SYSTEM_PROMPT,
            messages: convertToCoreMessages(messages),
            tools: policy.tools,
            prepareStep: policy.prepareStep,
            // Portfolio answers should stay concise; this also bounds client DOM growth.
            maxOutputTokens: 4000,
            stopWhen: stepCountIs(policy.maxSteps),
            experimental_telemetry: {
              isEnabled: traced,
              functionId: LAYERS.inference,
              metadata: { model: MODEL_ID },
            },
            onFinish: ({ text, steps, totalUsage, finishReason }) => {
              root?.update({
                metadata: {
                  steps: steps.length,
                  finishReason,
                  totalTokens: totalUsage?.totalTokens,
                  path: "success",
                },
              });
              finish(text);
            },
            onError: ({ error }) => {
              root?.update({ metadata: { path: "error" } });
              finish(error instanceof Error ? error.message : String(error), "ERROR");
            },
            onAbort: () => {
              root?.update({ metadata: { path: "abort" } });
              finish("aborted");
            },
          });

          // Serverless: flush before the function freezes.
          const processor = getSpanProcessor();
          if (processor) after(() => processor.forceFlush());

          return result.toUIMessageStreamResponse();
        },
      ),
    );
  } catch (error) {
    console.error("Chat API error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return json({ error: "Failed to process chat request", details: errorMessage }, 500);
  }
}
