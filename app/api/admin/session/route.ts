import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_SECONDS,
  assertSameOrigin,
  createAdminSessionToken,
  isValidAdminPassword,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password !== "string" || !isValidAdminPassword(body.password)) {
      await new Promise((resolve) => setTimeout(resolve, 650));
      return NextResponse.json(
        { error: "The password was not accepted. Check it and try again." },
        { status: 401 },
      );
    }

    const response = NextResponse.json({ authenticated: true });
    response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: ADMIN_SESSION_SECONDS,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Authentication could not be completed." },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    assertSameOrigin(request);
    const response = NextResponse.json({ authenticated: false });
    response.cookies.set(ADMIN_COOKIE_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Logout could not be completed." },
      { status: 400 },
    );
  }
}

