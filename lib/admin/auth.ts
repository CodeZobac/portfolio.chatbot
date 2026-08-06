import "server-only";

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "portfolio_admin_session";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 8;

function secret(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET"): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured.`);
  if (name === "ADMIN_SESSION_SECRET" && value.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");
  }
  return value;
}

function digest(value: string): Buffer {
  return createHmac("sha256", "portfolio-admin-password").update(value).digest();
}

export function isValidAdminPassword(candidate: string): boolean {
  return timingSafeEqual(digest(candidate), digest(secret("ADMIN_PASSWORD")));
}

function sign(payload: string): string {
  return createHmac("sha256", secret("ADMIN_SESSION_SECRET"))
    .update(payload)
    .digest("base64url");
}

export function createAdminSessionToken(now = Date.now()): string {
  const expiresAt = Math.floor(now / 1000) + ADMIN_SESSION_SECONDS;
  const payload = `${expiresAt}.${randomBytes(18).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expiresAt, nonce, signature] = parts;
  if (!/^\d+$/.test(expiresAt) || !nonce || !signature) return false;
  if (Number(expiresAt) <= Math.floor(now / 1000)) return false;

  const expected = Buffer.from(sign(`${expiresAt}.${nonce}`));
  const actual = Buffer.from(signature);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function assertSameOrigin(request: Request): void {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin) {
    throw new Error("The request origin could not be verified.");
  }
}

