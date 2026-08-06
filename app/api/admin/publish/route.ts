import { NextResponse } from "next/server";
import { assertSameOrigin, hasAdminSession } from "@/lib/admin/auth";
import { publishContent, type MediaUpload } from "@/lib/admin/github";
import type { PortfolioContent } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Your admin session has expired. Sign in again." }, { status: 401 });
  }
  try {
    assertSameOrigin(request);
    const declaredSize = Number(request.headers.get("content-length") ?? 0);
    if (declaredSize > 4_300_000) {
      return NextResponse.json(
        { error: "This publish is too large for Vercel. Remove images or publish a smaller batch." },
        { status: 413 },
      );
    }
    const body = (await request.json()) as {
      content?: PortfolioContent;
      baseCommitSha?: string;
      uploads?: MediaUpload[];
    };
    if (!body.content || typeof body.baseCommitSha !== "string" || !Array.isArray(body.uploads)) {
      return NextResponse.json({ error: "The publish request is incomplete." }, { status: 400 });
    }
    const result = await publishContent({
      content: body.content,
      baseCommitSha: body.baseCommitSha,
      uploads: body.uploads,
    });
    return NextResponse.json(result);
  } catch (error) {
    const status = error instanceof Error && error.name === "PublishConflictError" ? 409 : 400;
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "The content could not be published." },
      { status },
    );
  }
}

