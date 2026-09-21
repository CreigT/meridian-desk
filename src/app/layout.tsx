import type { Metadata } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getStore } from "@/lib/store";

const serif = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--font-source" });

export function generateMetadata(): Metadata {
  const store = getStore();
  return {
    title: { default: store.name, template: `%s \u00b7 ${store.name}` },
    description: store.tagline,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
