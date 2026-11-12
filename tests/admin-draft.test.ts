import { describe, expect, it } from "vitest";
import source from "@/content/portfolio-content.json";
import type { PortfolioContent } from "@/lib/types";
import { buildPreviewContent, diffContent } from "@/lib/admin/draft";

const content = source as PortfolioContent;
const clone = () => JSON.parse(JSON.stringify(content)) as PortfolioContent;

describe("admin draft helpers", () => {
  it("reports no differences for identical content", () => {
    const d = diffContent(content, clone());
    expect(Object.values(d).every((s) => !s.added.length && !s.changed.length && !s.removed.length)).toBe(true);
  });

  it("detects added, changed and removed records", () => {
    const draft = clone();
    const removed = draft.skills.shift()!;
    draft.projects[0].tagline += " edited";
    draft.experiences.push({ ...draft.experiences[0], id: "new-role", title: "New role" });
    const d = diffContent(content, draft);
    expect(d.skills.removed).toEqual([removed.name]);
    expect(d.projects.changed).toHaveLength(1);
    expect(d.experiences.added).toEqual(["New role"]);
  });

  it("swaps unpublished upload paths for data URLs", () => {
    const draft = clone();
    draft.projects[0].image = "/projects/admin/p/a.webp";
    const out = buildPreviewContent(draft, [{ path: "public/projects/admin/p/a.webp", contentBase64: "AAAA", mime: "image/webp" }]);
    expect(out.projects[0].image).toBe("data:image/webp;base64,AAAA");
    expect(draft.projects[0].image).toBe("/projects/admin/p/a.webp");
  });
});
