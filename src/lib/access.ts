import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "md_access";

export type AccessPayload = {
  products: string[];
  email?: string;
  exp: number;
};

function secret() {
  return process.env.ACCESS_TOKEN_SECRET || "change-me-to-a-long-random-string";
}

function sign(input: string) {
  return createHmac("sha256", secret()).update(input).digest("base64url");
}

export function issueAccessToken(
  products: string[],
  email?: string,
  days = 365,
): string {
  const payload: AccessPayload = {
    products: Array.from(new Set(products)),
    email,
    exp: Date.now() + days * 24 * 60 * 60 * 1000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function readAccessToken(token: string | undefined | null): AccessPayload | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return null;
  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as AccessPayload;
    if (!payload.exp || payload.exp < Date.now()) return null;
    if (!Array.isArray(payload.products)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAccessFromCookies() {
  const jar = await cookies();
  return readAccessToken(jar.get(ACCESS_COOKIE)?.value);
}

export function hasProduct(access: AccessPayload | null, slug: string) {
  return Boolean(access?.products.includes(slug));
}
