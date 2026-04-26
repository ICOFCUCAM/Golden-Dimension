import { supabase } from '@/lib/supabase';

// ----- Types matching supabase/schema.sql --------------------------------

export type InvoiceStatus =
  | 'draft' | 'sent' | 'partial' | 'paid' | 'void' | 'overdue';

export type PaymentMethod =
  | 'bank_transfer' | 'card' | 'wise' | 'paypal' | 'cheque' | 'other';

export type PaymentStatus =
  | 'claimed' | 'received' | 'failed' | 'refunded';

export interface Invoice {
  id: string;
  invoice_code: string;
  engagement_id: string | null;
  client_name: string;
  client_email: string | null;
  description: string;
  amount: number;
  currency: string;
  fx_rate: number;
  amount_gbp: number;
  status: InvoiceStatus;
  issued_date: string;
  due_date: string | null;
  sent_at: string | null;
  paid_at: string | null;
  created_at: string;
  created_by: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amount: number;
  currency: string;
  fx_rate: number;
  amount_gbp: number;
  payer_name: string | null;
  payer_reference: string | null;
  external_reference: string | null;
  notes: string | null;
  claimed_at: string;
  received_at: string | null;
  received_by: string | null;
  financial_transaction_id: string | null;
  created_at: string;
}

export interface PaymentMethodsConfig {
  id: number;
  bank_account_name: string | null;
  bank_account_number: string | null;
  bank_sort_code: string | null;
  bank_iban: string | null;
  bank_swift_bic: string | null;
  bank_name: string | null;
  bank_address: string | null;
  wise_instructions: string | null;
  paypal_instructions: string | null;
  cheque_instructions: string | null;
  stripe_publishable_key: string | null;
  stripe_enabled: boolean;
  bank_transfer_enabled: boolean;
  wise_enabled: boolean;
  paypal_enabled: boolean;
  cheque_enabled: boolean;
  payment_footer_note: string | null;
  updated_at: string;
}

// ----- Labels for UI -----------------------------------------------------

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  bank_transfer: 'Bank transfer',
  card: 'Card payment',
  wise: 'Wise',
  paypal: 'PayPal',
  cheque: 'Cheque',
  other: 'Other',
};

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: 'Draft',
  sent: 'Sent',
  partial: 'Part-paid',
  paid: 'Paid',
  void: 'Void',
  overdue: 'Overdue',
};

export const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
  claimed: 'Claimed',
  received: 'Received',
  failed: 'Failed',
  refunded: 'Refunded',
};

// ----- Fetchers ----------------------------------------------------------

export const fetchInvoices = async (): Promise<Invoice[]> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .order('issued_date', { ascending: false });
  if (error || !data) return [];
  return data as Invoice[];
};

export const fetchInvoiceByCode = async (code: string): Promise<Invoice | null> => {
  const { data, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('invoice_code', code)
    .maybeSingle();
  if (error || !data) return null;
  return data as Invoice;
};

export const fetchPayments = async (): Promise<Payment[]> => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .order('claimed_at', { ascending: false });
  if (error || !data) return [];
  return data as Payment[];
};

export const fetchPaymentMethodsConfig = async (): Promise<PaymentMethodsConfig | null> => {
  const { data, error } = await supabase
    .from('payment_methods_config')
    .select('*')
    .eq('id', 1)
    .maybeSingle();
  if (error || !data) return null;
  return data as PaymentMethodsConfig;
};

// ----- Helpers -----------------------------------------------------------

/**
 * Generate a fresh invoice code in the form GD-INV-YYYY-NNNN-RRRR where
 * NNNN is the next sequential number for the year and RRRR is a random
 * tail so the URL slug isn't guessable by enumeration.
 */
export const newInvoiceCode = (year: number, ordinal: number): string => {
  const tail = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `GD-INV-${year}-${String(ordinal).padStart(4, '0')}-${tail}`;
};
