import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: vi.fn() }));

describe("admin sessions", () => {
  beforeEach(() => {
    process.env.ADMIN_PASSWORD = "correct horse battery staple";
    process.env.ADMIN_SESSION_SECRET = "a-session-secret-that-is-longer-than-thirty-two-characters";
  });

  it("validates only the configured password", async () => {
    const { isValidAdminPassword } = await import("@/lib/admin/auth");
    expect(isValidAdminPassword("correct horse battery staple")).toBe(true);
    expect(isValidAdminPassword("incorrect")).toBe(false);
  });

  it("accepts a current token and rejects tampering or expiry", async () => {
    const { createAdminSessionToken, verifyAdminSessionToken } = await import("@/lib/admin/auth");
    const now = Date.UTC(2026, 7, 6);
    const token = createAdminSessionToken(now);
    expect(verifyAdminSessionToken(token, now + 1_000)).toBe(true);
    expect(verifyAdminSessionToken(`${token}x`, now + 1_000)).toBe(false);
    expect(verifyAdminSessionToken(token, now + 9 * 60 * 60 * 1_000)).toBe(false);
  });
});

