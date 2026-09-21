import { getStore } from "@/lib/store";
export const metadata = { title: "Terms" };
export default function TermsPage() {
  const store = getStore();
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Terms</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        <p>{store.name} sells digital files and written kits. Buying a kit gives you a personal license to use it. You may not resell the files as your own product.</p>
        <p>Prices are shown before checkout. Demo mode may grant access without a card charge so the owner can test the shop.</p>
        <p>Questions: {store.supportEmail}. Owner: {store.owner}.</p>
      </div>
    </div>
  );
}
