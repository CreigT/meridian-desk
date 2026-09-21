export type ProductKind = "one_time" | "subscription";

export type Product = {
  slug: string;
  name: string;
  priceCents: number;
  currency: string;
  kind: ProductKind;
  badge?: string;
  summary: string;
  description: string;
  includes: string[];
  preview: string[];
  locked: string[];
};

export function getStore() {
  return {
    name: process.env.NEXT_PUBLIC_STORE_NAME || "Meridian Desk",
    tagline:
      process.env.NEXT_PUBLIC_STORE_TAGLINE ||
      "Useful AI tools. Plain pages. Fair prices.",
    url: process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3000",
    owner: process.env.NEXT_PUBLIC_OWNER_NAME || "Store Owner",
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "hello@example.com",
    demoMode: (process.env.DEMO_MODE || "true").toLowerCase() !== "false",
  };
}

export const products: Product[] = [
  {
    slug: "starter-pack",
    name: "Starter Pack",
    priceCents: 1200,
    currency: "usd",
    kind: "one_time",
    badge: "Most started here",
    summary: "Forty short prompts and a one-page weekly checklist.",
    description:
      "A small, usable kit for people who want AI to help with writing, planning, and customer replies without a 200-page course.",
    includes: [
      "40 copy-paste prompts",
      "Weekly 20-minute operator checklist",
      "Plain-language prompt rules",
      "Lifetime download access",
    ],
    preview: [
      "Start every prompt with the job, the audience, and the output format.",
      "Ask for two options, then ask the model to combine the strongest parts.",
      "Never send a customer reply the model wrote without reading it once.",
    ],
    locked: [
      "Offer rewrite prompt: take a vague service and turn it into a one-sentence offer, three proof points, and a first price.",
      "Support reply prompt: calm, short, specific next step, no filler.",
      "Weekly review prompt: what sold, what stalled, what to cut.",
      "Landing page prompt: headline, three benefits, one objection, one button.",
      "Checklist: Monday inventory, Wednesday offers, Friday money.",
    ],
  },
  {
    slug: "offer-builder",
    name: "Offer Builder",
    priceCents: 2900,
    currency: "usd",
    kind: "one_time",
    badge: "Best for first sales",
    summary: "A worksheet that helps you price and package one clear offer.",
    description:
      "Most shops stall because the offer is fuzzy. This kit walks through audience, promise, price, and a simple guarantee you can actually keep.",
    includes: [
      "Offer worksheet",
      "Pricing ladder (good / better / best)",
      "Refund and guarantee language",
      "One-page sales script",
    ],
    preview: [
      "A good offer names who it is for, what changes, and how long that takes.",
      "Price from the outcome, then check that the work is still profitable.",
      "A guarantee should be narrow enough that you can honor it.",
    ],
    locked: [
      "Fill-in offer sentence: For [who] who want [result] without [pain], this gives [deliverable] in [time].",
      "Three-tier ladder: Starter $12-29, Core $29-79, Desk Pass monthly.",
      "Guarantee draft: If the files do not open or the pages are incomplete, email us within 14 days for a refund.",
      "Sales script: problem, proof, price, pause.",
    ],
  },
  {
    slug: "operator-bundle",
    name: "Operator Bundle",
    priceCents: 7900,
    currency: "usd",
    kind: "one_time",
    badge: "Best value",
    summary: "Starter Pack + Offer Builder + a 30-day operating calendar.",
    description:
      "The full desk kit. Buy once. Use it to run a small digital shop without extra software.",
    includes: [
      "Everything in Starter Pack",
      "Everything in Offer Builder",
      "30-day operating calendar",
      "Customer email templates",
    ],
    preview: [
      "The calendar is one task a day. No dashboards required.",
      "Templates cover delivery, refund, and a quiet check-in on day 7.",
    ],
    locked: [
      "Day 1: publish one offer. Day 2: write the delivery email. Day 3: set a refund rule.",
      "Day 7: ask one customer what was unclear. Day 14: raise or drop one price.",
      "Day 21: cut any product that needs a meeting to explain.",
      "Day 30: keep only what sold or got a thank-you.",
      "Delivery email: here is the file, here is the first page to read, here is how to ask a question.",
    ],
  },
  {
    slug: "desk-pass",
    name: "Desk Pass",
    priceCents: 1900,
    currency: "usd",
    kind: "subscription",
    badge: "Monthly",
    summary: "A short monthly brief plus one new template.",
    description:
      "For people who already sold something and want a light monthly nudge instead of another community.",
    includes: [
      "Monthly 1-page brief",
      "One new template each month",
      "Cancel any time",
    ],
    preview: [
      "Each brief covers what to sell, what to ignore, and one number to watch.",
      "Templates stay short on purpose.",
    ],
    locked: [
      "This month: raise the middle offer by 10% and measure conversion for 14 days.",
      "Watch one number: paid orders minus refunds.",
      "New template: a 4-line abandoned-checkout email with no urgency tricks.",
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(product: Product) {
  const amount = (product.priceCents / 100).toLocaleString("en-US", {
    style: "currency",
    currency: product.currency.toUpperCase(),
  });
  return product.kind === "subscription" ? `${amount}/mo` : amount;
}

export function unlocksFor(slug: string): string[] {
  if (slug === "operator-bundle") {
    return ["starter-pack", "offer-builder", "operator-bundle"];
  }
  return [slug];
}
