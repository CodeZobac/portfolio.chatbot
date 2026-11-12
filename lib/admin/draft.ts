import type { PortfolioContent } from "@/lib/types";

type Upload = { path: string; contentBase64: string; mime: string };
export const SECTIONS = ["skills", "projects", "experiences"] as const;
export type SectionKey = (typeof SECTIONS)[number];
export type SectionDiff = { added: string[]; changed: string[]; removed: string[] };

/** Draft copy where unpublished uploads resolve to data URLs, so cards can render them. */
export function buildPreviewContent(content: PortfolioContent, uploads: Upload[]): PortfolioContent {
  if (!uploads.length) return content;
  const urls = new Map(uploads.map((u) => [`/${u.path.replace(/^public\//, "")}`, `data:${u.mime};base64,${u.contentBase64}`]));
  const swap = (src: string) => urls.get(src) ?? src;
  return {
    ...content,
    projects: content.projects.map((p) => ({ ...p, image: swap(p.image), gallery: p.gallery?.map(swap) })),
  };
}

const label = (r: { id: string; name?: string; title?: string }) => r.name || r.title || r.id;

export function diffContent(published: PortfolioContent, draft: PortfolioContent): Record<SectionKey, SectionDiff> {
  const out = {} as Record<SectionKey, SectionDiff>;
  for (const key of SECTIONS) {
    const before = new Map<string, { id: string; name?: string; title?: string }>(published[key].map((r) => [r.id, r]));
    const after = new Map<string, { id: string; name?: string; title?: string }>(draft[key].map((r) => [r.id, r]));
    out[key] = {
      added: [...after.values()].filter((r) => !before.has(r.id)).map(label),
      removed: [...before.values()].filter((r) => !after.has(r.id)).map(label),
      changed: [...after.values()]
        .filter((r) => before.has(r.id) && JSON.stringify(before.get(r.id)) !== JSON.stringify(r))
        .map(label),
    };
  }
  return out;
}

/** True when only record order differs (diffContent ignores order). */
export const orderChanged = (a: PortfolioContent, b: PortfolioContent) =>
  SECTIONS.some((k) => a[k].map((r) => r.id).join() !== b[k].map((r) => r.id).join());
