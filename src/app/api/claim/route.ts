import { NextResponse } from "next/server";
import { ACCESS_COOKIE, issueAccessToken } from "@/lib/access";
import { getProduct, getStore, unlocksFor } from "@/lib/store";
import { getStripe } from "@/lib/stripe";

export async function GET(request: Request) {
  const store = getStore();
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("session_id");
  if (!sessionId) return NextResponse.redirect(new URL("/success", store.url));
  const stripe = getStripe();
  if (!stripe) return NextResponse.redirect(new URL("/success", store.url));
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const paid = session.payment_status === "paid" || session.status === "complete";
  const productSlug = session.metadata?.product;
  if (!paid || !productSlug || !getProduct(productSlug)) {
    return NextResponse.redirect(new URL("/success?error=1", store.url));
  }
  const token = issueAccessToken(unlocksFor(productSlug), session.customer_email || undefined);
  const response = NextResponse.redirect(new URL(`/success?product=${productSlug}`, store.url));
  response.cookies.set(ACCESS_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: store.url.startsWith("https"),
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}
