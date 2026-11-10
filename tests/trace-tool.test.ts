import { afterEach, describe, expect, it, vi } from "vitest";
import { traceOperation } from "@/lib/observability/trace-tool";
import { LAYERS, tracingEnabled } from "@/lib/observability/layers";

afterEach(() => vi.unstubAllEnvs());

describe("traceOperation", () => {
  it("is disabled without Langfuse keys and passes results through", async () => {
    vi.stubEnv("LANGFUSE_PUBLIC_KEY", "");
    vi.stubEnv("LANGFUSE_SECRET_KEY", "");
    expect(tracingEnabled()).toBe(false);
    const result = { type: "projects", data: { projects: [1, 2] } };
    await expect(traceOperation("showProjects", async () => result)({})).resolves.toBe(result);
  });

  it("passes results and errors through when tracing is on", async () => {
    vi.stubEnv("LANGFUSE_PUBLIC_KEY", "pk-test");
    vi.stubEnv("LANGFUSE_SECRET_KEY", "sk-test");
    const result = { type: "skills", data: { skills: [1] } };
    await expect(traceOperation("showSkills", async () => result)({})).resolves.toBe(result);
    await expect(traceOperation("showCV", async () => { throw new Error("boom"); })({})).rejects.toThrow("boom");
  });

  it("keeps stable layer names", () => {
    expect(Object.values(LAYERS)).toEqual(["interaction.session", "orchestration.flow", "operation.unit", "model.inference"]);
  });
});
