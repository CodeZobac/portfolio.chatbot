import { beforeEach, describe, expect, it, vi } from "vitest";
import source from "@/content/portfolio-content.json";
import type { PortfolioContent } from "@/lib/types";

vi.mock("server-only", () => ({}));

const content = source as PortfolioContent;

function response(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

describe("GitHub publishing", () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = "test-token";
    process.env.GITHUB_OWNER = "CodeZobac";
    process.env.GITHUB_REPO = "portfolio.chatbot";
    process.env.GITHUB_BRANCH = "main";
  });

  it("publishes content through one tree and one fast-forward commit", async () => {
    const requests: Array<{ url: string; method: string; body?: Record<string, unknown> }> = [];
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
      const url = String(input); const method = init?.method ?? "GET";
      const body = init?.body ? JSON.parse(String(init.body)) as Record<string, unknown> : undefined;
      requests.push({ url, method, body });
      if (url.includes("/git/ref/heads/")) return response({ object: { sha: "head-sha" } });
      if (url.includes("/git/commits/head-sha")) return response({ tree: { sha: "base-tree" } });
      if (url.includes("/contents/")) return response({ content: Buffer.from(JSON.stringify(content)).toString("base64") });
      if (url.endsWith("/git/blobs")) return response({ sha: "content-blob" });
      if (url.endsWith("/git/trees")) return response({ sha: "next-tree" });
      if (url.endsWith("/git/commits")) return response({ sha: "next-commit" });
      if (url.includes("/git/refs/heads/")) return response({});
      return response({ error: "unexpected" }, 500);
    }));

    const { publishContent } = await import("@/lib/admin/github");
    const result = await publishContent({ content, baseCommitSha: "head-sha", uploads: [] });
    expect(result.commitSha).toBe("next-commit");
    const tree = requests.find((request) => request.url.endsWith("/git/trees"));
    expect(tree?.body?.base_tree).toBe("base-tree");
    expect(tree?.body?.tree).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: "content/portfolio-content.json", sha: "content-blob" }),
    ]));
    const ref = requests.find((request) => request.method === "PATCH");
    expect(ref?.body).toEqual({ sha: "next-commit", force: false });
  });

  it("rejects a stale editor before creating blobs", async () => {
    vi.stubGlobal("fetch", vi.fn(async (input: string | URL | Request) => {
      const url = String(input);
      if (url.includes("/git/ref/heads/")) return response({ object: { sha: "new-head" } });
      if (url.includes("/git/commits/new-head")) return response({ tree: { sha: "base-tree" } });
      if (url.includes("/contents/")) return response({ content: Buffer.from(JSON.stringify(content)).toString("base64") });
      return response({}, 500);
    }));
    const { publishContent } = await import("@/lib/admin/github");
    await expect(publishContent({ content, baseCommitSha: "old-head", uploads: [] })).rejects.toMatchObject({ name: "PublishConflictError" });
  });
});

