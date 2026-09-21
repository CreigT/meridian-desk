import { NextResponse } from "next/server";
import { getStore, products } from "@/lib/store";
import { isDemoMode } from "@/lib/stripe";

export async function GET() {
  const store = getStore();
  return NextResponse.json({
    ok: true,
    store: store.name,
    demoMode: isDemoMode(),
    products: products.length,
    stripe: Boolean(process.env.STRIPE_SECRET_KEY),
    time: new Date().toISOString(),
  });
}
