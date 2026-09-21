"use client";
import { useState } from "react";

export function BuyButton({ slug, label }: { slug: string; label: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "Checkout failed.");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed.");
      setBusy(false);
    }
  }

  return (
    <div>
      <button onClick={buy} disabled={busy} className="rounded-full bg-rust px-5 py-3 text-sm text-paper hover:bg-[#8c3414] disabled:opacity-60">
        {busy ? "Opening checkout..." : label}
      </button>
      {error ? <p className="mt-2 text-sm text-rust">{error}</p> : null}
    </div>
  );
}
