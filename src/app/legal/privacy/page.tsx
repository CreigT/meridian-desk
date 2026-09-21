import { getStore } from "@/lib/store";
export const metadata = { title: "Privacy" };
export default function PrivacyPage() {
  const store = getStore();
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Privacy</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        <p>We store an access cookie on your browser so purchased pages stay unlocked. If you pay with Stripe, Stripe processes the card. We do not keep card numbers.</p>
        <p>The optional assistant sends your question to the model provider only if an API key is configured.</p>
        <p>Contact: {store.supportEmail}.</p>
      </div>
    </div>
  );
}
