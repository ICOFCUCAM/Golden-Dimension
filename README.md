# Golden Dimensions Ltd — Website

React + TypeScript + Vite + Tailwind + shadcn/ui, with a Supabase backend for
contact and shipment-request forms.

## Local development

```bash
npm install
cp .env.example .env   # then fill in your Supabase URL + anon key
npm run dev
```

## Supabase setup (supabase.com)

1. Create a project at <https://supabase.com/dashboard>.
2. **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates the
   `contact_messages` and `shipment_requests` tables and the row-level
   security policies the app needs.
3. **Settings → Data API**, copy:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
4. Put both in `.env` for local dev, and into your Vercel project's
   **Settings → Environment Variables** for deployments.

## Deploy to Vercel

The repo includes a `vercel.json` (Vite preset + SPA rewrite). After importing
the repo at <https://vercel.com/new>:

- Set the two `VITE_SUPABASE_*` env vars (Production, Preview, Development).
- Click **Deploy**.

## Build

```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build locally
```
