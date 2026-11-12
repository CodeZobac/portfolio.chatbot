import { describe, expect, it } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { SITE_URL, jsonLd, llmsTxt } from "@/lib/seo";

describe("seo", () => {
  it("uses the canonical host everywhere", () => {
    expect(sitemap()[0].url).toBe(SITE_URL);
    expect(robots().sitemap).toBe(`${SITE_URL}/sitemap.xml`);
    expect(JSON.stringify(jsonLd)).not.toContain("afonsocaboz.com");
  });

  it("blocks admin and api from crawlers", () => {
    expect(JSON.stringify(robots().rules)).toContain("/admin");
  });

  it("describes a Faro-based person with real profiles", () => {
    const person = jsonLd["@graph"].find((n) => n["@type"] === "Person") as { address: { addressLocality: string }; sameAs: string[] };
    expect(person.address.addressLocality).toBe("Faro");
    expect(person.sameAs).toContain("https://github.com/CodeZobac");
  });

  it("llms.txt has every section and the full variant is longer", () => {
    const short = llmsTxt(false);
    for (const h of ["## Services", "## Projects", "## Experience", "## Skills", "## Contact"]) expect(short).toContain(h);
    expect(llmsTxt(true).length).toBeGreaterThan(short.length);
  });
});
