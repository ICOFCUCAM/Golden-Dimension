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

-- =========================================================================
-- CMS — case studies, insights, and practitioners
-- =========================================================================
-- These tables let the firm edit case studies, insights, and team profiles
-- live (via the /admin CMS tab) without redeploying. The site reads from
-- these tables when populated; if a table is empty, the site falls back to
-- the static .ts data shipped in the bundle.
--
-- The "content" column is a JSONB blob so nested fields (body blocks,
-- metrics arrays, expertise tags) don't need separate columns. Top-level
-- fields used for sorting and filtering (slug, sector, year, etc.) are
-- promoted to real columns.

-- Case studies ------------------------------------------------------------
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  sector_id text not null,
  pillar_id text not null,
  engagement_model_id text not null,
  year text,
  ordinal int not null default 0,
  published boolean not null default true,
  content jsonb not null,                -- full CaseStudy shape
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists case_studies_sector_idx on public.case_studies (sector_id);
create index if not exists case_studies_pillar_idx on public.case_studies (pillar_id);

alter table public.case_studies enable row level security;
drop policy if exists "anon read published case_studies" on public.case_studies;
create policy "anon read published case_studies"
  on public.case_studies for select to anon using (published = true);
drop policy if exists "auth manage case_studies" on public.case_studies;
create policy "auth manage case_studies"
  on public.case_studies for all to authenticated using (true) with check (true);

-- Insights ----------------------------------------------------------------
create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  published_at timestamptz,
  ordinal int not null default 0,
  published boolean not null default true,
  content jsonb not null,                -- full NewsArticle shape
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists insights_published_at_idx on public.insights (published_at desc);

alter table public.insights enable row level security;
drop policy if exists "anon read published insights" on public.insights;
create policy "anon read published insights"
  on public.insights for select to anon using (published = true);
drop policy if exists "auth manage insights" on public.insights;
create policy "auth manage insights"
  on public.insights for all to authenticated using (true) with check (true);

-- Practitioners -----------------------------------------------------------
create table if not exists public.practitioners (
  id uuid primary key default gen_random_uuid(),
  practice_area text not null,
  ordinal int not null default 0,
  published boolean not null default true,
  content jsonb not null,                -- full Practitioner shape
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists practitioners_practice_idx on public.practitioners (practice_area);

alter table public.practitioners enable row level security;
drop policy if exists "anon read published practitioners" on public.practitioners;
create policy "anon read published practitioners"
  on public.practitioners for select to anon using (published = true);
drop policy if exists "auth manage practitioners" on public.practitioners;
create policy "auth manage practitioners"
  on public.practitioners for all to authenticated using (true) with check (true);

-- updated_at trigger ------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists case_studies_touch on public.case_studies;
create trigger case_studies_touch before update on public.case_studies
  for each row execute function public.touch_updated_at();

drop trigger if exists insights_touch on public.insights;
create trigger insights_touch before update on public.insights
  for each row execute function public.touch_updated_at();

drop trigger if exists practitioners_touch on public.practitioners;
create trigger practitioners_touch before update on public.practitioners
  for each row execute function public.touch_updated_at();
