import { NextResponse } from "next/server";
import { getProduct, getStore, unlocksFor } from "@/lib/store";
import { getStripe, isDemoMode } from "@/lib/stripe";
import { ACCESS_COOKIE, issueAccessToken } from "@/lib/access";

export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json().catch(() => ({}));
  const slug = String(body.slug || "");
  const email = body.email ? String(body.email) : undefined;
  const product = getProduct(slug);

  if (!product) {
    return NextResponse.json({ error: "Unknown product." }, { status: 404 });
  }

  if (isDemoMode()) {
    const token = issueAccessToken(unlocksFor(product.slug), email);
    const response = NextResponse.json({
      demo: true,
      url: `${store.url}/success?demo=1&product=${product.slug}`,
    });
    response.cookies.set(ACCESS_COOKIE, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: store.url.startsWith("https"),
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe is not configured. Set DEMO_MODE=true or add STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  const session = await stripe.checkout.sessions.create({
    mode: product.kind === "subscription" ? "subscription" : "payment",
    customer_email: email,
    success_url: `${store.url}/api/claim?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${store.url}/product/${product.slug}`,
    metadata: { product: product.slug },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: `${store.name} - ${product.name}`,
            description: product.summary,
          },
          ...(product.kind === "subscription"
            ? { recurring: { interval: "month" as const } }
            : {}),
        },
      },
    ],
  });

  return NextResponse.json({ url: session.url });
}
