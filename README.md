# Meridian Desk

A small digital-product store you can deploy on Vercel.

You only change the variables. The pages, paywall, checkout, and legal copy are already built.

## What you get

- A readable landing page
- A shop with four starter kits ($12, $29, $79, $19/month)
- A free preview and a paid section on every product
- Demo checkout that works with no Stripe account
- Live Stripe checkout when you add keys
- An unlock page for another browser
- Terms, privacy, and refund pages
- A public status page at `/ops`

## Deploy on Vercel

1. Import this GitHub repo in Vercel.
2. Add environment variables from `.env.example`.
3. Set `NEXT_PUBLIC_STORE_URL` to your live URL, such as `https://your-shop.vercel.app`.
4. Keep `DEMO_MODE=true` until you want live charges.
5. Deploy.

## Live payments later

- Add `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Set `DEMO_MODE=false`
- Change `ACCESS_TOKEN_SECRET` to a long random string
- Optional webhook: `/api/webhook`

## Change the catalog

Edit `src/lib/store.ts`. Each product has a preview (free) and locked pages (paid). No database is required.

## Local run

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000
