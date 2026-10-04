import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("ai", async importOriginal => {
  const actual = await importOriginal<typeof import("ai")>();
  return { ...actual, streamText: vi.fn(() => ({ toUIMessageStreamResponse: () => new Response("stream") })) };
});

import { streamText } from "ai";
import { POST } from "@/app/api/chat/route";

afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("chat route tool restrictions", () => {
  it.each([
    ["Show me the ETIC project 🩵", ["showProjects"]],
    ["Mostra o projeto ETIC", ["showProjects"]],
    ["Show CV", ["showCV"]],
    ["Download CV", ["downloadResume"]],
    ["Tell me more", []],
  ])("selects tools for the current request: %s", async (prompt, expectedTools) => {
    vi.stubEnv("MANIFEST_API_KEY", "test-key");
    const messages = [
      { role: "user", parts: [{ type: "text", text: "Show CV and skills" }] },
      { role: "assistant", parts: [{ type: "text", text: "Here is my CV. Want education too?" }] },
      { role: "user", parts: [{ type: "text", text: prompt }] },
    ];
    const response = await POST(new Request("http://localhost/api/chat", { method: "POST", body: JSON.stringify({ messages }) }));
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("stream");
    const configuration = vi.mocked(streamText).mock.calls[0][0];
    expect(Object.keys(configuration.tools ?? {})).toEqual(expectedTools);
    expect(configuration.prepareStep).toBeTypeOf("function");
  });
});
