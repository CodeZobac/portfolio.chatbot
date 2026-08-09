import { describe, expect, it } from "vitest";
import { withoutProficiencyScores } from "@/lib/ai/tools";
import { skills } from "@/lib/data/skills";

describe("AI skill payloads", () => {
  it("remove proficiency scores before exposing skills to the model", () => {
    const presentedSkills = withoutProficiencyScores(skills);

    expect(presentedSkills).toHaveLength(skills.length);
    expect(presentedSkills.every((skill) => !("proficiency" in skill))).toBe(true);
  });
});
