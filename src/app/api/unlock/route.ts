import { NextResponse } from "next/server";
import { ACCESS_COOKIE, readAccessToken } from "@/lib/access";
import { getStore } from "@/lib/store";

export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json().catch(() => ({}));
  const token = String(body.token || "");
  const access = readAccessToken(token);
  if (!access) {
    return NextResponse.json({ error: "That access code is not valid." }, { status: 400 });
  }
  const response = NextResponse.json({ ok: true, products: access.products });
  response.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: store.url.startsWith("https"),
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
