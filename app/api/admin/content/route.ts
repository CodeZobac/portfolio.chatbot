import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin/auth";
import { getPublishedContent } from "@/lib/admin/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Your admin session has expired. Sign in again." }, { status: 401 });
  }
  try {
    const published = await getPublishedContent();
    return NextResponse.json(published, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Published content could not be loaded." },
      { status: 502 },
    );
  }
}

