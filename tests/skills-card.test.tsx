import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SkillsCard from "@/components/portfolio/SkillsCard";
import source from "@/content/portfolio-content.json";
import type { Skill } from "@/lib/types";

const skills = source.skills as Skill[];

describe("SkillsCard", () => {
  it("renders every configured skill name without proficiency or year labels", () => {
    const markup = renderToStaticMarkup(
      <SkillsCard data={{ skills, category: "all" }} />,
    );

    for (const skill of skills) {
      expect(markup).toContain(skill.name);
    }

    const visibleText = markup
      .replace(/<style>[\s\S]*?<\/style>/g, "")
      .replace(/<[^>]+>/g, " ");

    expect(visibleText).not.toMatch(/\d+%/);
    expect(visibleText).not.toMatch(/\byears?\b/i);
  });

  it("renders a filtered category as a full-width collection", () => {
    const backendSkills = skills.filter((skill) => skill.category === "backend");
    const markup = renderToStaticMarkup(
      <SkillsCard data={{ skills: backendSkills, category: "backend" }} />,
    );

    expect(markup).toContain("skills-grid--filtered");
    expect(markup).toContain("Backend");
    expect(markup).toContain("Python");
    expect(markup).not.toContain("Next.js");
  });
});
