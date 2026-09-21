import { getStore } from "@/lib/store";
export const metadata = { title: "Refunds" };
export default function RefundPage() {
  const store = getStore();
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Refunds</h1>
      <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted">
        <p>If a file will not open or a purchased page is missing, email {store.supportEmail} within 14 days. Include the product name and the email used at checkout.</p>
        <p>Because these are digital pages, refunds are for broken delivery, not for a change of mind after the kit has been read.</p>
      </div>
    </div>
  );
}
