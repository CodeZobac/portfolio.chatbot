import { describe, expect, it } from "vitest";
import { withoutProficiencyScores } from "@/lib/ai/tools";
import { skills } from "@/lib/data/skills";
import { projects } from "@/lib/data/projects";
import { showProjects, showSkills, showExperience } from "@/lib/ai/tools";
import { z } from "zod";

describe("AI skill payloads", () => {
  it("remove proficiency scores before exposing skills to the model", () => {
    const presentedSkills = withoutProficiencyScores(skills);

    expect(presentedSkills).toHaveLength(skills.length);
    expect(presentedSkills.every((skill) => !("proficiency" in skill))).toBe(true);
  });
});

describe("scoped portfolio payloads", () => {
  const options = { toolCallId: "test", messages: [] };

  it("returns only experience for work-history requests", async () => {
    const result = await showExperience.execute!({ highlight: "ETIC" }, options);
    expect(result).toMatchObject({ type: "experience", data: { highlight: "ETIC" } });
    expect(result).not.toHaveProperty("data.skills");
    expect(result).not.toHaveProperty("data.projects");
  });

  it("preserves category and featured project filters", async () => {
    const result = await showProjects.execute!({ category: "web", featured: true }, options);
    expect(result).toMatchObject({ data: { projects: projects.filter(p => p.category === "web" && p.featured) } });
  });

  it("rejects unknown project and skill IDs at the tool boundary", () => {
    const projectSchema = showProjects.inputSchema as z.ZodType;
    const skillSchema = showSkills.inputSchema as z.ZodType;
    expect(projectSchema.safeParse({ projectIds: ["invented-project"] }).success).toBe(false);
    expect(skillSchema.safeParse({ skillIds: ["invented-skill"] }).success).toBe(false);
    expect(projectSchema.safeParse({ projectIds: ["etic-resource-hub"] }).success).toBe(true);
    expect(skillSchema.safeParse({ skillIds: ["react"] }).success).toBe(true);
  });
});
