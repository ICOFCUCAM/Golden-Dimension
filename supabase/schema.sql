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
-- Public visitors (anon) can submit forms (insert only).
-- Reading and updating rows requires a logged-in admin (authenticated).
-- Create the admin user in Supabase: Authentication → Users → Add user.
-- Sign in at /admin in the app.

alter table public.contact_messages enable row level security;
alter table public.shipment_requests enable row level security;

-- contact_messages
drop policy if exists "anon insert contact_messages" on public.contact_messages;
create policy "anon insert contact_messages"
  on public.contact_messages for insert to anon with check (true);

drop policy if exists "auth select contact_messages" on public.contact_messages;
create policy "auth select contact_messages"
  on public.contact_messages for select to authenticated using (true);

drop policy if exists "auth update contact_messages" on public.contact_messages;
create policy "auth update contact_messages"
  on public.contact_messages for update to authenticated using (true) with check (true);

-- shipment_requests
drop policy if exists "anon insert shipment_requests" on public.shipment_requests;
create policy "anon insert shipment_requests"
  on public.shipment_requests for insert to anon with check (true);

drop policy if exists "auth select shipment_requests" on public.shipment_requests;
create policy "auth select shipment_requests"
  on public.shipment_requests for select to authenticated using (true);

drop policy if exists "auth update shipment_requests" on public.shipment_requests;
create policy "auth update shipment_requests"
  on public.shipment_requests for update to authenticated using (true) with check (true);

-- Clean up old open-access policies (if you ran the previous version of this file)
drop policy if exists "anon select contact_messages" on public.contact_messages;
drop policy if exists "anon update contact_messages" on public.contact_messages;
drop policy if exists "anon select shipment_requests" on public.shipment_requests;
drop policy if exists "anon update shipment_requests" on public.shipment_requests;

-- =========================================================================
-- Newsletter subscribers (Capability Brief signup in footer)
-- =========================================================================
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  subscribed_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;

drop policy if exists "anon insert subscribers" on public.subscribers;
create policy "anon insert subscribers"
  on public.subscribers for insert to anon with check (true);

drop policy if exists "auth select subscribers" on public.subscribers;
create policy "auth select subscribers"
  on public.subscribers for select to authenticated using (true);
