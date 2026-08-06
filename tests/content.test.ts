import { describe, expect, it } from "vitest";
import source from "@/content/portfolio-content.json";
import { portfolioContentSchema } from "@/lib/content/schema";
import { parseYouTubeId } from "@/lib/content/youtube";

describe("portfolio content", () => {
  it("validates the migrated source with stable unique IDs", () => {
    const result = portfolioContentSchema.safeParse(source);
    expect(result.success).toBe(true);
    expect(source.projects.map((project) => project.id)).toContain("cybercompass");
    expect(new Set(source.skills.map((skill) => skill.id)).size).toBe(source.skills.length);
  });

  it("rejects duplicate record IDs", () => {
    const duplicate = structuredClone(source);
    duplicate.skills[1].id = duplicate.skills[0].id;
    const result = portfolioContentSchema.safeParse(duplicate);
    expect(result.success).toBe(false);
    expect(result.error?.issues.some((issue) => issue.path.join(".") === "skills.1.id")).toBe(true);
  });
});

describe("YouTube links", () => {
  it.each([
    ["https://www.youtube.com/watch?v=BpA0IFLWH-c", "BpA0IFLWH-c"],
    ["https://youtu.be/BpA0IFLWH-c?t=4", "BpA0IFLWH-c"],
    ["https://youtube.com/shorts/BpA0IFLWH-c", "BpA0IFLWH-c"],
    ["https://youtube.com/embed/BpA0IFLWH-c", "BpA0IFLWH-c"],
    ["BpA0IFLWH-c", "BpA0IFLWH-c"],
  ])("extracts an ID from %s", (value, expected) => {
    expect(parseYouTubeId(value)).toBe(expected);
  });

  it("rejects unrelated URLs", () => {
    expect(parseYouTubeId("https://example.com/video")).toBeUndefined();
  });
});

