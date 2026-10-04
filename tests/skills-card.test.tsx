import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import SkillsCard from "@/components/portfolio/SkillsCard";
import source from "@/content/portfolio-content.json";
import type { Skill } from "@/lib/types";

const skills = source.skills as Skill[];
const renderSkills = (data: { skills: Skill[]; category?: string }) =>
  renderToStaticMarkup(<SkillsCard data={data} />);

describe("SkillsCard", () => {
  it("renders every configured skill without proficiency, years, or field-manual decoration", () => {
    const markup = renderSkills({ skills, category: "all" });
    for (const skill of skills) expect(markup).toContain(skill.name);
    const visibleText = markup.replace(/<[^>]+>/g, " ");
    expect(visibleText).not.toMatch(/\d+%/);
    expect(visibleText).not.toMatch(/\byears?\b/i);
    expect(visibleText).not.toContain("Field Manual");
    expect(markup).toContain('aria-label="Filter skills by category"');
    expect(markup).toMatch(/aria-pressed="true"[^>]*>All<\/button>/);
  });

  it("enforces category scope even when given all skills and omits redundant filters", () => {
    const markup = renderSkills({ skills, category: "backend" });
    expect(markup).toContain("Backend");
    expect(markup).toContain("Python");
    expect(markup).not.toContain("Next.js");
    expect(markup).not.toContain('aria-pressed=');
  });

  it("includes application examples in initially closed, labelled disclosures", () => {
    const markup = renderSkills({ skills: skills.filter((skill) => skill.name === "Python") });
    expect(markup).toContain('aria-label="Used in: Python"');
    expect(markup).toContain("FleetFlow");
    expect(markup).toContain("ETIC Resource Hub");
    expect(markup).toContain("<details");
    expect(markup).not.toMatch(/<details[^>]*\bopen/);
    expect(markup).not.toContain('aria-pressed=');
  });

  it("does not invent examples for skills without them", () => {
    const markup = renderSkills({ skills: [{ id: "custom", name: "Custom", category: "frontend", proficiency: 70 }] });
    expect(markup).toContain("Custom");
    expect(markup).not.toContain("<details");
  });

  it("provides an empty state for empty or unmatched results", () => {
    expect(renderSkills({ skills: [] })).toContain("No skills to show.");
    expect(renderSkills({ skills, category: "unknown" })).toContain("No skills to show.");
  });

  it("keeps emerging labels and sorts priorities without mutating input", () => {
    const backend = skills.filter((skill) => skill.category === "backend").reverse();
    const original = [...backend];
    const markup = renderSkills({ skills: backend });
    expect(markup.indexOf("Python")).toBeLessThan(markup.indexOf("Django"));
    expect(markup.indexOf("Django")).toBeLessThan(markup.indexOf("Rust"));
    expect(markup).toContain("Emerging");
    expect(backend).toEqual(original);
  });

  it("isolates accessible IDs for multiple responses", () => {
    const markup = renderToStaticMarkup(<><SkillsCard data={{ skills }} /><SkillsCard data={{ skills }} /></>);
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
