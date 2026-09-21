import Link from "next/link";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, readAccessToken } from "@/lib/access";
import { getProduct } from "@/lib/store";

export const metadata = { title: "Purchase complete" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ product?: string; error?: string }> }) {
  const params = await searchParams;
  const jar = await cookies();
  const token = jar.get(ACCESS_COOKIE)?.value || "";
  const access = readAccessToken(token);
  const product = params.product ? getProduct(params.product) : null;
  const first = product?.slug || access?.products[0];

  return (
    <div className="page-wrap py-16">
      <p className="text-sm uppercase tracking-[0.18em] text-forest">Done</p>
      <h1 className="mt-3 font-serif text-5xl">You can open the kit.</h1>
      <p className="mt-4 max-w-xl text-muted">Access is saved in this browser. Save the code below if you will open the kit on another device.</p>
      {params.error ? <p className="mt-4 text-sm text-rust">Stripe did not confirm the payment yet. Refresh this page or contact support.</p> : null}
      {token && access ? (
        <pre className="mt-6 overflow-x-auto rounded-2xl border border-line bg-card p-4 text-xs leading-6">{token}</pre>
      ) : (
        <p className="mt-6 text-sm text-muted">No access cookie was found on this browser yet.</p>
      )}
      <div className="mt-8 flex flex-wrap gap-3">
        {first ? <Link href={`/product/${first}`} className="rounded-full bg-rust px-5 py-3 text-paper">Open the kit</Link> : null}
        <Link href="/shop" className="rounded-full border border-ink px-5 py-3">Back to shop</Link>
      </div>
    </div>
  );
}
