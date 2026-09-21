import { NextResponse } from "next/server";
import { getStore, products } from "@/lib/store";

const faq = [
  { q: ["price", "cost", "how much"], a: "Starter Pack is $12. Offer Builder is $29. Operator Bundle is $79. Desk Pass is $19 each month." },
  { q: ["refund", "money back"], a: "If the files do not open or a page is missing, email support within 14 days for a refund." },
  { q: ["stripe", "pay", "card"], a: "Checkout uses Stripe when keys are set. If DEMO_MODE is on, the store grants access without charging a card." },
  { q: ["download", "access", "unlock"], a: "After payment you land on the success page and the product page shows the locked pages." },
  { q: ["who", "human", "support"], a: "The shop runs on simple pages. A person only steps in for refunds, legal questions, or a broken payment." },
];

function localAnswer(question: string) {
  const text = question.toLowerCase();
  const hit = faq.find((item) => item.q.some((word) => text.includes(word)));
  if (hit) return hit.a;
  const catalog = products.map((p) => `${p.name}: ${p.summary}`).join(" ");
  return `This store sells four digital kits. ${catalog} If you want a product, open Shop. If something is broken, use the support email on the footer.`;
}

export async function POST(request: Request) {
  const store = getStore();
  const body = await request.json().catch(() => ({}));
  const question = String(body.question || "").slice(0, 500).trim();
  if (!question) return NextResponse.json({ error: "Ask a short question." }, { status: 400 });
  if (!process.env.OPENAI_API_KEY) return NextResponse.json({ answer: localAnswer(question), source: "faq" });
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          { role: "system", content: `You help shoppers on ${store.name}. Be brief. Do not invent prices. Products: ${JSON.stringify(products.map((p) => ({ name: p.name, price: p.priceCents, summary: p.summary })))}. Support: ${store.supportEmail}.` },
          { role: "user", content: question },
        ],
      }),
    });
    const data = await res.json();
    const answer = data.choices?.[0]?.message?.content || localAnswer(question);
    return NextResponse.json({ answer, source: "model" });
  } catch {
    return NextResponse.json({ answer: localAnswer(question), source: "faq" });
  }
}
