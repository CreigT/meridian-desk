import Link from "next/link";
import { getStore } from "@/lib/store";

export function Header() {
  const store = getStore();
  return (
    <header className="border-b border-line">
      <div className="page-wrap flex items-center justify-between gap-4 py-5">
        <Link href="/" className="font-serif text-2xl tracking-tight">{store.name}</Link>
        <nav className="flex items-center gap-5 text-sm">
          <Link href="/shop" className="hover:text-rust">Shop</Link>
          <Link href="/unlock" className="hover:text-rust">Unlock</Link>
          <Link href="/ops" className="hover:text-rust">Status</Link>
          <Link href="/shop" className="rounded-full bg-rust px-4 py-2 text-paper hover:bg-[#8c3414]">Buy a kit</Link>
        </nav>
      </div>
    </header>
  );
}
