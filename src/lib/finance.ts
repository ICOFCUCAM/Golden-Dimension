import { supabase } from '@/lib/supabase';

// ----- Types matching supabase/schema.sql -------------------------------

export type AccountType = 'asset' | 'liability' | 'equity' | 'income' | 'expense';

export interface Account {
  id: string;
  code: string;
  name: string;
  type: AccountType;
  parent_code: string | null;
  description: string | null;
  active: boolean;
}

export interface Engagement {
  id: string;
  code: string;
  client_name: string;
  sector_id: string | null;
  pillar_id: string | null;
  engagement_model_id: string | null;
  start_date: string | null;
  end_date: string | null;
  active: boolean;
}

export type TransactionType = 'income' | 'expense' | 'transfer' | 'journal_adjustment';
export type TransactionStatus = 'draft' | 'posted' | 'reconciled' | 'audited' | 'void';

export interface FinancialTransaction {
  id: string;
  date: string;
  type: TransactionType;
  account_id: string;
  counterparty: string | null;
  description: string;
  reference: string | null;
  engagement_id: string | null;
  amount: number;
  currency: string;
  fx_rate: number;
  amount_gbp: number;
  status: TransactionStatus;
  posted_at: string | null;
  posted_by: string | null;
  audited_at: string | null;
  audited_by: string | null;
  voided_at: string | null;
  voided_by: string | null;
  void_reason: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export interface FxRate {
  currency: string;
  rate_to_gbp: number;
}

export interface VoidRequest {
  id: string;
  transaction_id: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  requested_at: string;
  requested_by: string;
  decided_at: string | null;
  decided_by: string | null;
  decision_note: string | null;
}

export interface AuditLog {
  id: string;
  event_at: string;
  actor_id: string | null;
  table_name: string;
  row_id: string;
  action: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
}

// ----- Currency helpers --------------------------------------------------

export const SUPPORTED_DISPLAY_CURRENCIES = ['GBP', 'USD', 'EUR', 'AED'] as const;
export type DisplayCurrency = (typeof SUPPORTED_DISPLAY_CURRENCIES)[number];

const SYMBOL: Record<string, string> = {
  GBP: '£',
  USD: '$',
  EUR: '€',
  AED: 'AED ',
};

export const formatMoney = (amount: number, currency: string): string => {
  const sym = SYMBOL[currency] ?? '';
  const sign = amount < 0 ? '-' : '';
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('en-GB', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${sign}${sym}${formatted}`;
};

/**
 * Convert a GBP amount to the chosen display currency using the rate map
 * (rate is "1 unit of FX = N GBP", so we divide).
 */
export const convertFromGbp = (
  amountGbp: number,
  display: string,
  rates: Record<string, number>,
): number => {
  if (display === 'GBP') return amountGbp;
  const rate = rates[display];
  if (!rate || rate <= 0) return amountGbp;
  return amountGbp / rate;
};

// ----- Fetchers ----------------------------------------------------------

export const fetchAccounts = async (): Promise<Account[]> => {
  const { data, error } = await supabase
    .from('accounts')
    .select('*')
    .order('code', { ascending: true });
  if (error || !data) return [];
  return data as Account[];
};

export const fetchEngagements = async (): Promise<Engagement[]> => {
  const { data, error } = await supabase
    .from('engagements')
    .select('*')
    .order('code', { ascending: false });
  if (error || !data) return [];
  return data as Engagement[];
};

export const fetchTransactions = async (): Promise<FinancialTransaction[]> => {
  const { data, error } = await supabase
    .from('financial_transactions')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as FinancialTransaction[];
};

export const fetchFxRates = async (): Promise<Record<string, number>> => {
  const { data, error } = await supabase.from('fx_rates').select('*');
  if (error || !data) return { GBP: 1 };
  const map: Record<string, number> = {};
  for (const row of data as FxRate[]) {
    map[row.currency] = Number(row.rate_to_gbp);
  }
  if (!map.GBP) map.GBP = 1;
  return map;
};

// ----- CSV export --------------------------------------------------------

const csvEscape = (value: unknown): string => {
  const s = value === null || value === undefined ? '' : String(value);
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
};

export const transactionsToCsv = (
  rows: FinancialTransaction[],
  accountByid: Record<string, Account>,
  engagementById: Record<string, Engagement>,
): string => {
  const headers = [
    'Date',
    'Reference',
    'Type',
    'Status',
    'Account code',
    'Account name',
    'Description',
    'Counterparty',
    'Engagement',
    'Currency',
    'Amount',
    'FX rate',
    'Amount (GBP)',
  ];
  const lines = [headers.map(csvEscape).join(',')];
  for (const r of rows) {
    const acc = accountByid[r.account_id];
    const eng = r.engagement_id ? engagementById[r.engagement_id] : null;
    lines.push(
      [
        r.date,
        r.reference,
        r.type,
        r.status,
        acc?.code,
        acc?.name,
        r.description,
        r.counterparty,
        eng ? `${eng.code} · ${eng.client_name}` : '',
        r.currency,
        r.amount,
        r.fx_rate,
        r.amount_gbp,
      ]
        .map(csvEscape)
        .join(','),
    );
  }
  return lines.join('\n');
};

export const downloadFile = (
  filename: string,
  contents: string,
  mime = 'text/plain;charset=utf-8',
) => {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

// ----- Word-compatible HTML export ---------------------------------------

/**
 * Build a Word-compatible HTML document. Word opens .doc files that contain
 * HTML, so saving the report as `<name>.doc` lets a user open it in Word
 * (or LibreOffice) without us having to ship a full DOCX writer.
 */
export const buildWordHtml = (title: string, bodyHtml: string): string =>
  `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8"/>
<title>${escapeHtml(title)}</title>
<!--[if gte mso 9]><xml>
<w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument>
</xml><![endif]-->
<style>
  body { font-family: 'Calibri', 'Helvetica Neue', Arial, sans-serif; font-size: 11pt; color: #1f1f1f; }
  h1 { font-size: 18pt; margin: 0 0 4pt 0; }
  h2 { font-size: 13pt; margin: 16pt 0 6pt 0; border-bottom: 1pt solid #d4d0ca; padding-bottom: 3pt; }
  p.meta { color: #666; font-size: 9pt; margin: 0 0 18pt 0; }
  table { border-collapse: collapse; width: 100%; margin: 6pt 0; }
  th { background: #ece7e0; text-align: left; padding: 5pt 6pt; font-size: 9pt; text-transform: uppercase; letter-spacing: 0.05em; }
  td { padding: 4pt 6pt; border-top: 0.5pt solid #d4d0ca; font-size: 10pt; }
  td.num, th.num { text-align: right; font-family: 'Consolas', 'Menlo', monospace; }
  .group { background: #f7f5f2; font-weight: bold; color: #b4532a; text-transform: uppercase; letter-spacing: 0.05em; padding: 4pt 6pt; font-size: 9pt; }
  .footer { margin-top: 18pt; color: #666; font-size: 8.5pt; }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;

const escapeHtml = (s: string): string =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const escapeWordText = escapeHtml;

// ----- Reporting helpers -------------------------------------------------

export interface TrialBalanceRow {
  account: Account;
  debit_gbp: number;
  credit_gbp: number;
}

/**
 * Trivial "running totals by account" — for income/expense we sum signed
 * amounts. For asset/liability/equity we treat insert-amounts as movements.
 * This is a working surface for the v1 module; full double-entry comes later.
 */
export const computeTrialBalance = (
  transactions: FinancialTransaction[],
  accounts: Account[],
): TrialBalanceRow[] => {
  const byId: Record<string, Account> = {};
  for (const a of accounts) byId[a.id] = a;
  const totals: Record<string, number> = {};
  for (const t of transactions) {
    if (t.status === 'void') continue;
    const sign = t.type === 'expense' ? -1 : 1;
    totals[t.account_id] = (totals[t.account_id] ?? 0) + sign * Number(t.amount_gbp);
  }
  return accounts
    .filter((a) => totals[a.id] !== undefined && totals[a.id] !== 0)
    .map((a) => {
      const v = totals[a.id] ?? 0;
      return v >= 0
        ? { account: a, debit_gbp: v, credit_gbp: 0 }
        : { account: a, debit_gbp: 0, credit_gbp: -v };
    });
};

export const sumGbp = (rows: FinancialTransaction[], filter?: (r: FinancialTransaction) => boolean) => {
  return rows
    .filter((r) => r.status !== 'void' && (filter ? filter(r) : true))
    .reduce((acc, r) => acc + Number(r.amount_gbp), 0);
};
