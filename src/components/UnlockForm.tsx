"use client";
import { useState } from "react";

export function UnlockForm() {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token.trim() }),
    });
    const data = await res.json();
    setMessage(res.ok ? "Unlocked. Open the product page to read the full kit." : data.error || "Could not unlock.");
  }

  return (
    <form onSubmit={submit} className="mt-6 space-y-3">
      <textarea value={token} onChange={(e) => setToken(e.target.value)} rows={4} placeholder="Paste your access code" className="w-full rounded-2xl border border-line bg-card p-4 text-sm outline-none" />
      <button className="rounded-full bg-ink px-5 py-3 text-sm text-paper">Unlock</button>
      {message ? <p className="text-sm text-muted">{message}</p> : null}
    </form>
  );
}
