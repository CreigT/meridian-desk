import Link from "next/link";
import { formatPrice, products } from "@/lib/store";

export const metadata = { title: "Shop" };

export default function ShopPage() {
  return (
    <div className="page-wrap py-12">
      <h1 className="font-serif text-5xl">Shop</h1>
      <p className="mt-3 max-w-xl text-muted">One-time kits stay yours. Desk Pass renews monthly until you cancel.</p>
      <div className="mt-10 grid gap-5">
        {products.map((product) => (
          <article key={product.slug} className="grid gap-6 rounded-2xl border border-line bg-card p-6 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-wider text-forest">{product.badge || product.kind}</p>
              <h2 className="mt-2 font-serif text-3xl">{product.name}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">{product.description}</p>
              <ul className="mt-4 grid gap-1 text-sm md:grid-cols-2">
                {product.includes.map((item) => <li key={item}>• {item}</li>)}
              </ul>
            </div>
            <div className="flex flex-col items-start justify-between gap-4 md:items-end">
              <p className="font-serif text-3xl">{formatPrice(product)}</p>
              <Link href={`/product/${product.slug}`} className="rounded-full bg-rust px-5 py-3 text-sm text-paper">View kit</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
