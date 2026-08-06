import "server-only";

import type { PortfolioContent } from "@/lib/types";
import { portfolioContentSchema } from "@/lib/content/schema";

const CONTENT_PATH = "content/portfolio-content.json";
const MAX_UPLOADS = 8;
const MAX_FILE_BYTES = 700 * 1024;
const MAX_TOTAL_BYTES = 2.5 * 1024 * 1024;

interface GitHubConfig {
  token: string;
  owner: string;
  repo: string;
  branch: string;
}

export interface MediaUpload {
  path: string;
  contentBase64: string;
  mime: "image/webp";
  size: number;
}

interface BranchState {
  commitSha: string;
  treeSha: string;
}

function config(): GitHubConfig {
  const values = {
    token: process.env.GITHUB_TOKEN,
    owner: process.env.GITHUB_OWNER,
    repo: process.env.GITHUB_REPO,
    branch: process.env.GITHUB_BRANCH,
  };
  const missing = Object.entries(values).filter(([, value]) => !value).map(([key]) => key);
  if (missing.length) throw new Error(`Missing GitHub configuration: ${missing.join(", ")}.`);
  return values as GitHubConfig;
}

async function github<T>(path: string, init?: RequestInit): Promise<T> {
  const { token } = config();
  const response = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    cache: "no-store",
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`GitHub returned ${response.status}: ${detail.slice(0, 300)}`);
  }
  return response.json() as Promise<T>;
}

function repoPath(path: string): string {
  const { owner, repo } = config();
  return `/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}${path}`;
}

async function branchState(): Promise<BranchState> {
  const { branch } = config();
  const ref = await github<{ object: { sha: string } }>(
    repoPath(`/git/ref/heads/${encodeURIComponent(branch)}`),
  );
  const commit = await github<{ tree: { sha: string } }>(repoPath(`/git/commits/${ref.object.sha}`));
  return { commitSha: ref.object.sha, treeSha: commit.tree.sha };
}

function decodeContent(value: string): unknown {
  return JSON.parse(Buffer.from(value.replace(/\n/g, ""), "base64").toString("utf8"));
}

export async function getPublishedContent(): Promise<{
  content: PortfolioContent;
  baseCommitSha: string;
}> {
  const { branch } = config();
  const [state, file] = await Promise.all([
    branchState(),
    github<{ content: string }>(
      repoPath(`/contents/${CONTENT_PATH}?ref=${encodeURIComponent(branch)}`),
    ),
  ]);
  return {
    content: portfolioContentSchema.parse(decodeContent(file.content)) as PortfolioContent,
    baseCommitSha: state.commitSha,
  };
}

function managedPaths(content: PortfolioContent): Set<string> {
  const paths = new Set<string>();
  for (const project of content.projects) {
    for (const value of [project.image, ...(project.gallery ?? [])]) {
      if (value.startsWith("/projects/admin/")) paths.add(`public${value}`);
    }
  }
  return paths;
}

function validateUploads(uploads: MediaUpload[], content: PortfolioContent): void {
  if (uploads.length > MAX_UPLOADS) throw new Error(`Publish at most ${MAX_UPLOADS} new images at once.`);
  const referenced = managedPaths(content);
  let total = 0;
  for (const upload of uploads) {
    if (!/^public\/projects\/admin\/[a-z0-9-]+\/[a-f0-9-]+\.webp$/.test(upload.path)) {
      throw new Error("An uploaded image has an invalid managed path.");
    }
    const bytes = Buffer.from(upload.contentBase64, "base64");
    total += bytes.length;
    if (upload.mime !== "image/webp" || bytes.length !== upload.size || bytes.length > MAX_FILE_BYTES) {
      throw new Error("An uploaded image failed size or format validation.");
    }
    if (bytes[0] !== 0x52 || bytes[1] !== 0x49 || bytes[2] !== 0x46 || bytes[3] !== 0x46) {
      throw new Error("An uploaded image is not a valid WebP file.");
    }
    if (!referenced.has(upload.path)) throw new Error("An uploaded image is not referenced by the content.");
  }
  if (total > MAX_TOTAL_BYTES) throw new Error("Uploaded images exceed the 2.5 MB publish limit.");
}

export async function publishContent(input: {
  content: PortfolioContent;
  baseCommitSha: string;
  uploads: MediaUpload[];
}): Promise<{ commitSha: string; commitUrl: string }> {
  const content = portfolioContentSchema.parse(input.content) as PortfolioContent;
  validateUploads(input.uploads, content);
  const current = await getPublishedContent();
  if (current.baseCommitSha !== input.baseCommitSha) {
    const conflict = new Error("The production branch changed. Reload the published content before trying again.");
    conflict.name = "PublishConflictError";
    throw conflict;
  }

  const { owner, repo, branch } = config();
  const state = await branchState();
  const oldManaged = managedPaths(current.content);
  const nextManaged = managedPaths(content);
  const removed = [...oldManaged].filter((path) => !nextManaged.has(path));

  const contentBlob = await github<{ sha: string }>(repoPath("/git/blobs"), {
    method: "POST",
    body: JSON.stringify({
      content: `${JSON.stringify(content, null, 2)}\n`,
      encoding: "utf-8",
    }),
  });
  const uploadedBlobs = await Promise.all(
    input.uploads.map(async (upload) => ({
      path: upload.path,
      sha: (
        await github<{ sha: string }>(repoPath("/git/blobs"), {
          method: "POST",
          body: JSON.stringify({ content: upload.contentBase64, encoding: "base64" }),
        })
      ).sha,
    })),
  );

  const tree = await github<{ sha: string }>(repoPath("/git/trees"), {
    method: "POST",
    body: JSON.stringify({
      base_tree: state.treeSha,
      tree: [
        { path: CONTENT_PATH, mode: "100644", type: "blob", sha: contentBlob.sha },
        ...uploadedBlobs.map((blob) => ({ ...blob, mode: "100644", type: "blob" })),
        ...removed.map((path) => ({ path, mode: "100644", type: "blob", sha: null })),
      ],
    }),
  });
  const commit = await github<{ sha: string }>(repoPath("/git/commits"), {
    method: "POST",
    body: JSON.stringify({
      message: "chore(portfolio): publish admin content",
      tree: tree.sha,
      parents: [state.commitSha],
    }),
  });
  await github(repoPath(`/git/refs/heads/${encodeURIComponent(branch)}`), {
    method: "PATCH",
    body: JSON.stringify({ sha: commit.sha, force: false }),
  });
  return {
    commitSha: commit.sha,
    commitUrl: `https://github.com/${owner}/${repo}/commit/${commit.sha}`,
  };
}
