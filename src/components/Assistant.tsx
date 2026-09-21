"use client";
import { useState } from "react";

export function Assistant() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [busy, setBusy] = useState(false);

  async function ask(event: React.FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setBusy(true);
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    const data = await res.json();
    setAnswer(data.answer || data.error || "No answer.");
    setBusy(false);
  }

  return (
    <section className="rounded-2xl border border-line bg-card p-6">
      <p className="font-serif text-2xl">Ask the shop</p>
      <p className="mt-1 text-sm text-muted">Short answers about prices, refunds, and what is inside each kit.</p>
      <form onSubmit={ask} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Is there a refund?" className="flex-1 rounded-full border border-line bg-paper px-4 py-3 text-sm outline-none" />
        <button disabled={busy} className="rounded-full bg-ink px-5 py-3 text-sm text-paper disabled:opacity-60">{busy ? "Thinking..." : "Ask"}</button>
      </form>
      {answer ? <p className="mt-4 text-sm leading-6">{answer}</p> : null}
    </section>
  );
}
