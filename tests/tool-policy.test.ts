import { describe, expect, it } from "vitest";
import { streamText, stepCountIs, type LanguageModel } from "ai";
import { resolveToolIntent } from "@/lib/ai/tool-intent";
import { createToolPolicy } from "@/lib/ai/tool-policy";

describe("server tool policy", () => {
  it("only exposes requested tools and enforces named project filters", async () => {
    const policy = createToolPolicy(resolveToolIntent("Show ETIC"));
    expect(Object.keys(policy.tools)).toEqual(["showProjects"]);
    const output = await policy.tools.showProjects!.execute!(
      { category: "ai", featured: true, projectIds: ["fleetflow"] },
      { toolCallId: "project", messages: [] },
    );
    if (!("data" in output)) throw new Error("Expected a project result");
    expect(output.data.projects.map(project => project.id)).toEqual(["etic-resource-hub"]);
  });

  it("enforces named skills independently of generated arguments", async () => {
    const policy = createToolPolicy(resolveToolIntent("Show React"));
    const output = await policy.tools.showSkills!.execute!(
      { category: "backend", skillIds: ["python"] },
      { toolCallId: "skill", messages: [] },
    );
    if (!("data" in output)) throw new Error("Expected a skill result");
    expect(output.data.skills.map(skill => skill.id)).toEqual(["react"]);
    expect(output.data.skills[0]).not.toHaveProperty("proficiency");
  });

  it("retires called tools and streams final prose without additional cards", async () => {
    const policy = createToolPolicy(resolveToolIntent("Show ETIC and skills"));
    let call = 0;
    const model: Exclude<LanguageModel, string> = {
      specificationVersion: "v2",
      provider: "test",
      modelId: "portfolio-policy",
      supportedUrls: {},
      doGenerate: async () => { throw new Error("Streaming only"); },
      doStream: async options => {
        const turn = call++;
        const toolName = turn === 0 ? "showProjects" : "showSkills";
        expect(options.tools?.map(tool => tool.name)).toEqual(turn === 0
          ? ["showProjects", "showSkills"] : turn === 1 ? ["showSkills"] : []);
        expect(options.toolChoice).toEqual(turn < 2 ? { type: "auto" } : { type: "none" });
        return {
          stream: new ReadableStream({ start(controller) { for (const chunk of [
            ...(turn < 2 ? [{ type: "tool-call" as const, toolCallId: `call-${turn}`, toolName, input: '{}' }]
              : [{ type: "text-start" as const, id: "text" }, { type: "text-delta" as const, id: "text", delta: "Here is the requested information." }, { type: "text-end" as const, id: "text" }]),
            { type: "finish" as const, finishReason: turn < 2 ? "tool-calls" as const : "stop" as const, usage: { inputTokens: 10, outputTokens: 10, totalTokens: 20 } },
          ]) controller.enqueue(chunk); controller.close(); } }),
        };
      },
    };
    const result = streamText({ model, tools: policy.tools, prepareStep: policy.prepareStep,
      prompt: "Show ETIC and skills",
      stopWhen: stepCountIs(policy.maxSteps),
    });
    expect(await result.text).toBe("Here is the requested information.");
    expect(call).toBe(3);
    const steps = await result.steps;
    expect(steps.flatMap(step => step.toolCalls.map(tool => tool?.toolName))).toEqual(["showProjects", "showSkills"]);
  });

  it("provides no tools for conversational prompts", async () => {
    const policy = createToolPolicy(resolveToolIntent("Tell me more"));
    expect(policy.tools).toEqual({});
    expect(policy.maxSteps).toBe(1);
  });
});
