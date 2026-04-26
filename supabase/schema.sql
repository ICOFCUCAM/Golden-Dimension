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

-- =========================================================================
-- INTERNAL FINANCE MODULE
-- =========================================================================
-- Role-gated financial transaction recording + approvals + audit trail.
-- Designed for UK GAAP-aligned bookkeeping at Golden Dimensions Ltd.
--
-- Role hierarchy:
--   super-admin  → everything; the only role allowed to assign roles
--   admin        → CMS + Inbox; approves accountant void/edit requests
--   accountant   → CRUD on financial_transactions (drafts), proposes voids
--   auditor      → read-only across the finance module + audit_log
--
-- Money invariant: all amounts are stored in original currency AND in
-- GBP base. Reports default to GBP; the UI offers a display-only toggle
-- to USD/EUR using the fx_rates table.
-- =========================================================================

-- Role enum + user_roles join ---------------------------------------------
do $$ begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('super_admin', 'admin', 'accountant', 'auditor');
  end if;
end $$;

create table if not exists public.user_roles (
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  granted_at timestamptz not null default now(),
  granted_by uuid references auth.users(id),
  primary key (user_id, role)
);

alter table public.user_roles enable row level security;

-- Helper: does the current authenticated user have a given role?
create or replace function public.has_role(target public.app_role)
returns boolean
language sql stable security definer
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = auth.uid() and role = target
  );
$$;

-- RLS for user_roles: every authenticated user can read their own rows;
-- only super_admin can insert/delete (i.e. assign / revoke roles).
drop policy if exists "user can read own roles" on public.user_roles;
create policy "user can read own roles"
  on public.user_roles for select to authenticated
  using (user_id = auth.uid() or public.has_role('super_admin'));

drop policy if exists "super_admin manages roles" on public.user_roles;
create policy "super_admin manages roles"
  on public.user_roles for all to authenticated
  using (public.has_role('super_admin'))
  with check (public.has_role('super_admin'));

-- FX rates ---------------------------------------------------------------
create table if not exists public.fx_rates (
  currency char(3) primary key,                 -- ISO 4217, e.g. 'USD'
  rate_to_gbp numeric(14, 6) not null,          -- 1 unit of <currency> = N GBP
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

-- Seed the base currency + a few defaults. Admin updates via UI.
insert into public.fx_rates (currency, rate_to_gbp) values
  ('GBP', 1.0),
  ('USD', 0.79),
  ('EUR', 0.85),
  ('AED', 0.215)
on conflict (currency) do nothing;

alter table public.fx_rates enable row level security;
drop policy if exists "auth read fx" on public.fx_rates;
create policy "auth read fx" on public.fx_rates for select to authenticated using (true);
drop policy if exists "admin writes fx" on public.fx_rates;
create policy "admin writes fx"
  on public.fx_rates for all to authenticated
  using (public.has_role('super_admin') or public.has_role('admin'))
  with check (public.has_role('super_admin') or public.has_role('admin'));

-- Chart of accounts (UK GAAP-aligned, professional services template) -----
do $$ begin
  if not exists (select 1 from pg_type where typname = 'account_type') then
    create type public.account_type as enum (
      'asset', 'liability', 'equity', 'income', 'expense'
    );
  end if;
end $$;

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,                    -- e.g. '4000'
  name text not null,                           -- e.g. 'Professional services revenue'
  type public.account_type not null,
  parent_code text,                             -- soft hierarchy via code
  description text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists accounts_type_idx on public.accounts (type);

alter table public.accounts enable row level security;
drop policy if exists "auth read accounts" on public.accounts;
create policy "auth read accounts" on public.accounts for select to authenticated using (true);
drop policy if exists "accountant writes accounts" on public.accounts;
create policy "accountant writes accounts"
  on public.accounts for all to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'))
  with check (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'));

drop trigger if exists accounts_touch on public.accounts;
create trigger accounts_touch before update on public.accounts
  for each row execute function public.touch_updated_at();

-- UK GAAP-aligned seed CoA for a professional services firm.
insert into public.accounts (code, name, type, parent_code, description) values
  -- 1xxx Assets
  ('1000', 'Cash at bank',                      'asset',   null,   'Operating bank accounts (GBP)'),
  ('1010', 'Cash at bank — USD',                'asset',   '1000', 'USD-denominated bank accounts'),
  ('1020', 'Cash at bank — EUR',                'asset',   '1000', 'EUR-denominated bank accounts'),
  ('1100', 'Trade debtors',                     'asset',   null,   'Amounts receivable from clients'),
  ('1200', 'Prepayments',                       'asset',   null,   'Expenses paid in advance'),
  ('1500', 'Office equipment',                  'asset',   null,   'IT, furniture, fixtures (cost)'),
  ('1510', 'Accumulated depreciation',          'asset',   '1500', 'Accumulated depreciation contra-asset'),
  -- 2xxx Liabilities
  ('2000', 'Trade creditors',                   'liability', null, 'Amounts payable to suppliers'),
  ('2100', 'Accruals',                          'liability', null, 'Accrued but unpaid expenses'),
  ('2200', 'VAT control',                       'liability', null, 'VAT input/output net'),
  ('2210', 'PAYE / NI control',                 'liability', null, 'Payroll taxes due to HMRC'),
  ('2300', 'Corporation tax provision',         'liability', null, 'CT due, provided'),
  ('2400', 'Deferred income',                   'liability', null, 'Fees billed in advance of delivery'),
  -- 3xxx Equity
  ('3000', 'Share capital',                     'equity',   null,  'Issued share capital'),
  ('3100', 'Retained earnings',                 'equity',   null,  'Accumulated profit / loss'),
  ('3200', 'Current year P&L',                  'equity',   null,  'Current period profit / loss'),
  -- 4xxx Income
  ('4000', 'Professional services revenue',     'income',   null,  'Advisory + delivery fees'),
  ('4010', 'Programme delivery revenue',        'income',   '4000','Multidisciplinary programme fees'),
  ('4020', 'Managed services revenue',          'income',   '4000','Ongoing managed-service fees'),
  ('4030', 'Capability transfer revenue',       'income',   '4000','Capability-build engagement fees'),
  ('4100', 'Reimbursable expenses recovered',   'income',   null,  'Pass-through expenses billed back'),
  ('4900', 'Other operating income',            'income',   null,  'Sundry income'),
  -- 5xxx Direct costs
  ('5000', 'Staff costs — salaries',            'expense',  null,  'Gross salary expense'),
  ('5010', 'Staff costs — Employer NI',         'expense',  null,  'Employer National Insurance'),
  ('5020', 'Staff costs — Pension contributions','expense', null,  'Employer pension contributions'),
  ('5030', 'Subcontractor fees',                'expense',  null,  'External delivery resource'),
  ('5100', 'Travel & subsistence',              'expense',  null,  'Engagement-related travel'),
  ('5110', 'Engagement-billable expenses',      'expense',  null,  'Pass-through engagement costs'),
  -- 6xxx Operating expenses
  ('6000', 'Rent — office',                     'expense',  null,  'Office rent'),
  ('6010', 'Utilities',                         'expense',  null,  'Electricity, water, internet'),
  ('6020', 'Insurance — PI',                    'expense',  null,  'Professional indemnity'),
  ('6030', 'Insurance — other',                 'expense',  null,  'Other business insurance'),
  ('6100', 'Software & subscriptions',          'expense',  null,  'SaaS + tooling'),
  ('6200', 'Professional fees — legal',         'expense',  null,  'External legal'),
  ('6210', 'Professional fees — accountancy',   'expense',  null,  'External accountancy'),
  ('6300', 'Marketing & business development',  'expense',  null,  'BD + marketing'),
  ('6400', 'Bank charges',                      'expense',  null,  'Bank fees + card processing'),
  ('6410', 'Foreign exchange — gains/losses',   'expense',  null,  'Realised + unrealised FX P&L'),
  ('6500', 'Depreciation',                      'expense',  null,  'P&L charge for depreciation'),
  ('6900', 'Other operating expenses',          'expense',  null,  'Sundry')
on conflict (code) do nothing;

-- Engagements (lightweight — just enough for transaction linkage) ----------
create table if not exists public.engagements (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,                     -- e.g. 'GD-2026-014'
  client_name text not null,
  sector_id text,                                -- matches industries.id
  pillar_id text,                                -- matches pillars.id
  engagement_model_id text,                      -- e.g. 'programme-delivery'
  start_date date,
  end_date date,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists engagements_active_idx on public.engagements (active);

alter table public.engagements enable row level security;
drop policy if exists "auth read engagements" on public.engagements;
create policy "auth read engagements" on public.engagements for select to authenticated using (true);
drop policy if exists "accountant writes engagements" on public.engagements;
create policy "accountant writes engagements"
  on public.engagements for all to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'))
  with check (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'));

drop trigger if exists engagements_touch on public.engagements;
create trigger engagements_touch before update on public.engagements
  for each row execute function public.touch_updated_at();

-- Financial transactions (the spine) --------------------------------------
do $$ begin
  if not exists (select 1 from pg_type where typname = 'transaction_type') then
    create type public.transaction_type as enum (
      'income', 'expense', 'transfer', 'journal_adjustment'
    );
  end if;
  if not exists (select 1 from pg_type where typname = 'transaction_status') then
    create type public.transaction_status as enum (
      'draft', 'posted', 'reconciled', 'audited', 'void'
    );
  end if;
end $$;

create table if not exists public.financial_transactions (
  id uuid primary key default gen_random_uuid(),

  -- Editorial fields
  date date not null,
  type public.transaction_type not null,
  account_id uuid not null references public.accounts(id),
  counterparty text,
  description text not null,
  reference text,
  engagement_id uuid references public.engagements(id),

  -- Money
  amount numeric(14, 2) not null,                -- in original currency
  currency char(3) not null default 'GBP',
  fx_rate numeric(14, 6) not null default 1.0,   -- to GBP
  amount_gbp numeric(14, 2) generated always as (round(amount * fx_rate, 2)) stored,

  -- Workflow
  status public.transaction_status not null default 'draft',
  posted_at timestamptz,
  posted_by uuid references auth.users(id),
  audited_at timestamptz,
  audited_by uuid references auth.users(id),
  voided_at timestamptz,
  voided_by uuid references auth.users(id),
  void_reason text,

  -- Audit
  created_at timestamptz not null default now(),
  created_by uuid not null default auth.uid() references auth.users(id),
  updated_at timestamptz not null default now()
);
create index if not exists ft_date_idx        on public.financial_transactions (date desc);
create index if not exists ft_status_idx      on public.financial_transactions (status);
create index if not exists ft_account_idx     on public.financial_transactions (account_id);
create index if not exists ft_engagement_idx  on public.financial_transactions (engagement_id);

drop trigger if exists ft_touch on public.financial_transactions;
create trigger ft_touch before update on public.financial_transactions
  for each row execute function public.touch_updated_at();

alter table public.financial_transactions enable row level security;

-- Read: any internal role can read. (Auditors must be able to see everything.)
drop policy if exists "internal read transactions" on public.financial_transactions;
create policy "internal read transactions"
  on public.financial_transactions for select to authenticated
  using (
    public.has_role('super_admin') or public.has_role('admin')
    or public.has_role('accountant') or public.has_role('auditor')
  );

-- Insert: accountants can insert (defaults to draft).
drop policy if exists "accountant inserts transactions" on public.financial_transactions;
create policy "accountant inserts transactions"
  on public.financial_transactions for insert to authenticated
  with check (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'));

-- Update: accountants can edit drafts only; admins / super_admins can update any.
drop policy if exists "accountant edits drafts" on public.financial_transactions;
create policy "accountant edits drafts"
  on public.financial_transactions for update to authenticated
  using (
    public.has_role('super_admin') or public.has_role('admin')
    or (public.has_role('accountant') and status = 'draft')
  )
  with check (
    public.has_role('super_admin') or public.has_role('admin')
    or (public.has_role('accountant') and status = 'draft')
  );

-- No direct delete — voids only. Hard-deny delete to everyone.
drop policy if exists "no deletes on transactions" on public.financial_transactions;
create policy "no deletes on transactions"
  on public.financial_transactions for delete to authenticated using (false);

-- Void requests (accountant proposes → admin approves/rejects) -------------
do $$ begin
  if not exists (select 1 from pg_type where typname = 'request_status') then
    create type public.request_status as enum ('pending', 'approved', 'rejected');
  end if;
end $$;

create table if not exists public.void_requests (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.financial_transactions(id) on delete cascade,
  reason text not null,
  status public.request_status not null default 'pending',
  requested_at timestamptz not null default now(),
  requested_by uuid not null default auth.uid() references auth.users(id),
  decided_at timestamptz,
  decided_by uuid references auth.users(id),
  decision_note text
);
create index if not exists void_requests_status_idx on public.void_requests (status);

alter table public.void_requests enable row level security;
drop policy if exists "internal read void_requests" on public.void_requests;
create policy "internal read void_requests"
  on public.void_requests for select to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant') or public.has_role('auditor'));
drop policy if exists "accountant proposes voids" on public.void_requests;
create policy "accountant proposes voids"
  on public.void_requests for insert to authenticated
  with check (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'));
drop policy if exists "admin decides voids" on public.void_requests;
create policy "admin decides voids"
  on public.void_requests for update to authenticated
  using (public.has_role('super_admin') or public.has_role('admin'))
  with check (public.has_role('super_admin') or public.has_role('admin'));

-- Attachments (linked to Supabase Storage bucket "finance-attachments") ----
create table if not exists public.transaction_attachments (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references public.financial_transactions(id) on delete cascade,
  storage_path text not null,                   -- path inside the bucket
  file_name text not null,
  mime_type text,
  size_bytes int,
  uploaded_at timestamptz not null default now(),
  uploaded_by uuid not null default auth.uid() references auth.users(id)
);
create index if not exists tx_attach_idx on public.transaction_attachments (transaction_id);

alter table public.transaction_attachments enable row level security;
drop policy if exists "internal read attachments" on public.transaction_attachments;
create policy "internal read attachments"
  on public.transaction_attachments for select to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant') or public.has_role('auditor'));
drop policy if exists "accountant writes attachments" on public.transaction_attachments;
create policy "accountant writes attachments"
  on public.transaction_attachments for all to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'))
  with check (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant'));

-- Append-only audit log ---------------------------------------------------
create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  event_at timestamptz not null default now(),
  actor_id uuid references auth.users(id),
  table_name text not null,
  row_id uuid not null,
  action text not null,                          -- 'insert' | 'update' | 'void' | ...
  before jsonb,
  after jsonb
);
create index if not exists audit_log_row_idx   on public.audit_log (table_name, row_id);
create index if not exists audit_log_event_idx on public.audit_log (event_at desc);

alter table public.audit_log enable row level security;
drop policy if exists "internal read audit_log" on public.audit_log;
create policy "internal read audit_log"
  on public.audit_log for select to authenticated
  using (public.has_role('super_admin') or public.has_role('admin') or public.has_role('accountant') or public.has_role('auditor'));
-- Append-only: nobody can update or delete audit log rows directly.
drop policy if exists "no updates on audit_log" on public.audit_log;
create policy "no updates on audit_log" on public.audit_log for update to authenticated using (false);
drop policy if exists "no deletes on audit_log" on public.audit_log;
create policy "no deletes on audit_log" on public.audit_log for delete to authenticated using (false);
-- Insert allowed only by triggers (security definer); no direct row-level
-- insert policy exposed to clients.

-- Trigger: log every change to financial_transactions ---------------------
create or replace function public.log_financial_change()
returns trigger language plpgsql security definer as $$
begin
  if (tg_op = 'INSERT') then
    insert into public.audit_log (actor_id, table_name, row_id, action, before, after)
    values (auth.uid(), 'financial_transactions', new.id, 'insert', null, to_jsonb(new));
    return new;
  elsif (tg_op = 'UPDATE') then
    insert into public.audit_log (actor_id, table_name, row_id, action, before, after)
    values (auth.uid(), 'financial_transactions', new.id,
            case when old.status <> 'void' and new.status = 'void' then 'void' else 'update' end,
            to_jsonb(old), to_jsonb(new));
    return new;
  end if;
  return null;
end;
$$;

drop trigger if exists ft_audit on public.financial_transactions;
create trigger ft_audit
  after insert or update on public.financial_transactions
  for each row execute function public.log_financial_change();
