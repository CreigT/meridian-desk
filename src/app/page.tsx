import Link from "next/link";
import { Assistant } from "@/components/Assistant";
import { formatPrice, getStore, products } from "@/lib/store";

export default function HomePage() {
  const store = getStore();
  return (
    <div className="page-wrap py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-muted">A small digital shop</p>
      <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-tight md:text-7xl">{store.tagline}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
        Four kits. Clear prices. A page you can read on a phone. Pay once, or take the monthly pass. No account required to browse.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/shop" className="rounded-full bg-rust px-6 py-3 text-paper hover:bg-[#8c3414]">See the kits</Link>
        <Link href="/product/starter-pack" className="rounded-full border border-ink px-6 py-3">Start at $12</Link>
      </div>
      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {[
          ["Plain pages", "No app to learn. Headlines, prices, and a buy button."],
          ["Fair paywall", "Free preview on every kit. Full pages unlock after payment."],
          ["Demo or live", "Runs without Stripe. Add keys when you want real charges."],
        ].map(([title, copy]) => (
          <article key={title} className="rounded-2xl border border-line bg-card p-6">
            <h2 className="font-serif text-2xl">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
          </article>
        ))}
      </div>
      <section className="mt-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-4xl">The kits</h2>
          <Link href="/shop" className="text-sm text-rust">All products</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {products.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`} className="rounded-2xl border border-line bg-card p-6 hover:border-ink">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-3xl">{product.name}</h3>
                <span className="text-sm">{formatPrice(product)}</span>
              </div>
              <p className="mt-3 text-sm leading-6 text-muted">{product.summary}</p>
              {product.badge ? <p className="mt-4 text-xs uppercase tracking-wider text-forest">{product.badge}</p> : null}
            </Link>
          ))}
        </div>
      </section>
      <div className="mt-16"><Assistant /></div>
    </div>
  );
}
