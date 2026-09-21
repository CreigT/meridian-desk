import Link from "next/link";
import { getStore } from "@/lib/store";

export function Footer() {
  const store = getStore();
  return (
    <footer className="mt-16 border-t border-line">
      <div className="page-wrap grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="font-serif text-xl">{store.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted">{store.tagline}</p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">Pages</p>
          <div className="flex flex-col gap-1 text-muted">
            <Link href="/shop">Shop</Link>
            <Link href="/unlock">Unlock a purchase</Link>
            <Link href="/ops">Store status</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-medium">Policies</p>
          <div className="flex flex-col gap-1 text-muted">
            <Link href="/legal/terms">Terms</Link>
            <Link href="/legal/privacy">Privacy</Link>
            <Link href="/legal/refund">Refunds</Link>
            <a href={`mailto:${store.supportEmail}`}>{store.supportEmail}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
