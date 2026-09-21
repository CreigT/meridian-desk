import { notFound } from "next/navigation";
import { BuyButton } from "@/components/BuyButton";
import { getAccessFromCookies, hasProduct } from "@/lib/access";
import { formatPrice, getProduct, products } from "@/lib/store";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  return { title: product?.name || "Product" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const access = await getAccessFromCookies();
  const unlocked = hasProduct(access, product.slug);

  return (
    <div className="page-wrap py-12">
      <p className="text-sm uppercase tracking-[0.18em] text-muted">{product.kind === "subscription" ? "Monthly pass" : "One-time kit"}</p>
      <h1 className="mt-3 font-serif text-5xl md:text-6xl">{product.name}</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-muted">{product.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <p className="font-serif text-4xl">{formatPrice(product)}</p>
        {unlocked ? (
          <p className="rounded-full bg-forest px-4 py-2 text-sm text-paper">Unlocked on this browser</p>
        ) : (
          <BuyButton slug={product.slug} label={`Buy ${product.name}`} />
        )}
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-serif text-2xl">What is inside</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6">{product.includes.map((item) => <li key={item}>• {item}</li>)}</ul>
        </section>
        <section className="rounded-2xl border border-line bg-card p-6">
          <h2 className="font-serif text-2xl">Free preview</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6">{product.preview.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      </div>
      <section className="mt-6 rounded-2xl border border-line bg-card p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl">Full kit</h2>
          {!unlocked ? <span className="text-xs uppercase tracking-wider text-rust">Behind the paywall</span> : null}
        </div>
        {unlocked ? (
          <ul className="mt-4 space-y-3 text-sm leading-7">{product.locked.map((item) => <li key={item}>{item}</li>)}</ul>
        ) : (
          <div className="mt-4 rounded-xl bg-paper p-5 text-sm leading-7 text-muted">
            The rest of this kit unlocks after checkout. In demo mode the buy button grants access immediately so you can see the flow before connecting Stripe.
          </div>
        )}
      </section>
    </div>
  );
}
