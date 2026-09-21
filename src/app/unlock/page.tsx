import { UnlockForm } from "@/components/UnlockForm";
import { getAccessFromCookies } from "@/lib/access";
import { products } from "@/lib/store";
import Link from "next/link";

export const metadata = { title: "Unlock" };

export default async function UnlockPage() {
  const access = await getAccessFromCookies();
  const owned = products.filter((product) => access?.products.includes(product.slug));
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Unlock</h1>
      <p className="mt-3 max-w-xl text-muted">Use this page if you bought a kit on another browser. Paste the access code from your success page.</p>
      {owned.length ? (
        <section className="mt-8 rounded-2xl border border-line bg-card p-6">
          <h2 className="font-serif text-2xl">Already open here</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {owned.map((product) => (
              <li key={product.slug}><Link href={`/product/${product.slug}`} className="text-rust">{product.name}</Link></li>
            ))}
          </ul>
        </section>
      ) : null}
      <UnlockForm />
    </div>
  );
}
