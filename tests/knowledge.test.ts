import { describe, expect, it } from "vitest";
import { SYSTEM_PROMPT } from "@/lib/ai/system-prompt";
import { experiences, projects } from "@/lib/content/content";

describe("system prompt knowledge", () => {
  it("includes every experience and project from the content JSON", () => {
    for (const experience of experiences) expect(SYSTEM_PROMPT).toContain(experience.company);
    for (const project of projects) expect(SYSTEM_PROMPT).toContain(`canonical ID: ${project.id}`);
  });

  it("never leaks proficiency percentages", () => {
    expect(SYSTEM_PROMPT).not.toMatch(/proficiency: \d/i);
  });

  it("has no unresolved template placeholders", () => {
    expect(SYSTEM_PROMPT).not.toContain("${");
  });
});
