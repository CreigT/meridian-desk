import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-wrap py-16">
      <h1 className="font-serif text-5xl">That page is not here.</h1>
      <p className="mt-4 text-muted">Try the shop.</p>
      <Link href="/shop" className="mt-6 inline-block text-rust">Back to shop</Link>
    </div>
  );
}
