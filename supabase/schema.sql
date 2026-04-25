-- Golden Dimensions — Supabase schema setup
-- Run this in your Supabase project's SQL Editor:
--   https://supabase.com/dashboard → your project → SQL Editor → New query → paste → Run.

-- =========================================================================
-- Tables
-- =========================================================================

-- Contact form submissions (used by ContactPage)
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

-- Shipment / transport requests (used by TransportPage)
create table if not exists public.shipment_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  details text not null,
  status text not null default 'unread',
  created_at timestamptz not null default now()
);

-- =========================================================================
-- Row Level Security
-- =========================================================================
-- The current AdminPage at /admin has no login, so it talks to Supabase
-- with the anon key. To keep it working, we allow anon to insert / select /
-- update on both tables. This means anyone who knows the URL could read or
-- modify rows. To lock it down later: add Supabase Auth, gate /admin behind
-- a login, and replace the "anon can ..." policies with "authenticated".

alter table public.contact_messages enable row level security;
alter table public.shipment_requests enable row level security;

-- contact_messages
drop policy if exists "anon insert contact_messages" on public.contact_messages;
create policy "anon insert contact_messages"
  on public.contact_messages for insert to anon with check (true);

drop policy if exists "anon select contact_messages" on public.contact_messages;
create policy "anon select contact_messages"
  on public.contact_messages for select to anon using (true);

drop policy if exists "anon update contact_messages" on public.contact_messages;
create policy "anon update contact_messages"
  on public.contact_messages for update to anon using (true) with check (true);

-- shipment_requests
drop policy if exists "anon insert shipment_requests" on public.shipment_requests;
create policy "anon insert shipment_requests"
  on public.shipment_requests for insert to anon with check (true);

drop policy if exists "anon select shipment_requests" on public.shipment_requests;
create policy "anon select shipment_requests"
  on public.shipment_requests for select to anon using (true);

drop policy if exists "anon update shipment_requests" on public.shipment_requests;
create policy "anon update shipment_requests"
  on public.shipment_requests for update to anon using (true) with check (true);
