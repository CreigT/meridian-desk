import { getStore, products } from "@/lib/store";
import { isDemoMode } from "@/lib/stripe";

export const metadata = { title: "Status" };

export default function OpsPage() {
  const store = getStore();
  const checks = [
    ["Store name", store.name],
    ["Public URL", store.url],
    ["Support", store.supportEmail],
    ["Demo mode", isDemoMode() ? "On - no card charge" : "Off - Stripe checkout"],
    ["Stripe key", process.env.STRIPE_SECRET_KEY ? "Present" : "Missing"],
    ["Catalog", `${products.length} products`],
    ["Assistant", process.env.OPENAI_API_KEY ? "Model answers" : "Local FAQ"],
  ];
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Store status</h1>
      <p className="mt-3 max-w-xl text-muted">A public health page so you can see what the shop is using. No customer data is shown here.</p>
      <div className="mt-8 divide-y divide-line rounded-2xl border border-line bg-card">
        {checks.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between gap-4 p-4">
            <span className="text-sm text-muted">{label}</span>
            <span className="text-sm">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
