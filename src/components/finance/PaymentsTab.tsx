import React, { useEffect, useMemo, useState } from 'react';
import { Check, ExternalLink, Loader2, RotateCcw, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  type Account,
  type DisplayCurrency,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';
import {
  type Invoice,
  type Payment,
  type PaymentStatus,
  fetchInvoices,
  fetchPayments,
  PAYMENT_METHOD_LABELS,
  PAYMENT_STATUS_LABELS,
} from '@/lib/payments';

interface Props {
  accounts: Account[];
  rates: Record<string, number>;
  display: DisplayCurrency;
  /** Refresh transactions/invoices when a payment is posted to the ledger. */
  onLedgerUpdated?: () => void;
}

const STATUS_BADGE: Record<PaymentStatus, string> = {
  claimed: 'border-amber-300 bg-amber-50 text-amber-800',
  received: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  failed: 'border-red-300 bg-red-50 text-red-700',
  refunded: 'border-brand-hair-strong bg-brand-stone text-brand-mute',
};

// Default income account for posting received payments. Matches the seed
// CoA in supabase/schema.sql ("Professional services revenue").
const DEFAULT_INCOME_ACCOUNT_CODE = '4000';

const PaymentsTab: React.FC<Props> = ({ accounts, rates, display, onLedgerUpdated }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | PaymentStatus>('claimed');
  const [busyId, setBusyId] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    const [p, i] = await Promise.all([fetchPayments(), fetchInvoices()]);
    setPayments(p);
    setInvoices(i);
    setLoading(false);
  };

  useEffect(() => { void refresh(); }, []);

  const invoiceById = useMemo(() => {
    const m: Record<string, Invoice> = {};
    for (const i of invoices) m[i.id] = i;
    return m;
  }, [invoices]);

  const filtered = useMemo(
    () => (filter === 'all' ? payments : payments.filter((p) => p.status === filter)),
    [payments, filter],
  );

  const incomeAccount = useMemo(
    () => accounts.find((a) => a.code === DEFAULT_INCOME_ACCOUNT_CODE),
    [accounts],
  );

  const verify = async (p: Payment) => {
    setBusyId(p.id);
    try {
      const inv = invoiceById[p.invoice_id];
      const description = inv
        ? `Payment received: ${inv.invoice_code} — ${inv.client_name}`
        : `Payment received against invoice ${p.invoice_id}`;

      // 1. Post a financial_transactions row (so the ledger / trial balance reflects this).
      let txId: string | null = null;
      if (incomeAccount) {
        const { data, error } = await supabase
          .from('financial_transactions')
          .insert({
            date: new Date().toISOString().slice(0, 10),
            type: 'income',
            account_id: incomeAccount.id,
            engagement_id: inv?.engagement_id ?? null,
            counterparty: p.payer_name ?? inv?.client_name ?? null,
            description,
            reference: inv?.invoice_code ?? null,
            amount: p.amount,
            currency: p.currency,
            fx_rate: p.fx_rate,
            status: 'posted',
            posted_at: new Date().toISOString(),
          })
          .select('id')
          .single();
        if (error) throw error;
        txId = data?.id ?? null;
      }

      // 2. Mark the payment received and link the ledger row.
      const { error: payErr } = await supabase
        .from('payments')
        .update({
          status: 'received',
          received_at: new Date().toISOString(),
          financial_transaction_id: txId,
        })
        .eq('id', p.id);
      if (payErr) throw payErr;

      toast.success(
        incomeAccount
          ? 'Payment verified and posted to the ledger'
          : 'Payment verified — no income account configured, ledger not updated',
      );
      void refresh();
      onLedgerUpdated?.();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Verification failed';
      toast.error(msg);
    } finally {
      setBusyId(null);
    }
  };

  const reject = async (p: Payment) => {
    if (!window.confirm('Mark this claim as failed? The client will need to retry.')) return;
    setBusyId(p.id);
    const { error } = await supabase
      .from('payments')
      .update({ status: 'failed' })
      .eq('id', p.id);
    setBusyId(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Marked as failed');
    void refresh();
  };

  const refund = async (p: Payment) => {
    if (!window.confirm('Mark this payment as refunded? The invoice will reopen for collection.'))
      return;
    setBusyId(p.id);
    const { error } = await supabase
      .from('payments')
      .update({ status: 'refunded' })
      .eq('id', p.id);
    setBusyId(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Marked as refunded');
    void refresh();
  };

  const claimedCount = payments.filter((p) => p.status === 'claimed').length;

  return (
    <div>
      {/* Toolbar */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-[12px]">
          <span className="label-technical text-brand-mute mb-1">Status</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-2 bg-brand-paper border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          >
            <option value="all">All</option>
            {(Object.keys(PAYMENT_STATUS_LABELS) as PaymentStatus[]).map((s) => (
              <option key={s} value={s}>{PAYMENT_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </label>
        <span className="label-technical text-brand-mute">
          {String(filtered.length).padStart(2, '0')} of {String(payments.length).padStart(2, '0')} payments
        </span>
        {claimedCount > 0 && filter !== 'claimed' && (
          <button
            type="button"
            onClick={() => setFilter('claimed')}
            className="label-technical text-brand-accent hover:underline ml-auto"
          >
            {claimedCount} awaiting verification
          </button>
        )}
      </div>

      {!incomeAccount && (
        <div className="mb-6 px-4 py-3 border border-amber-300 bg-amber-50 text-amber-900 text-[13px]">
          Income account <code className="font-mono-tab">{DEFAULT_INCOME_ACCOUNT_CODE}</code> not
          found in the chart of accounts. Verifying a payment will mark it received but won't
          post to the ledger until that account exists.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
          <p className="text-[14px] text-brand-mute">No payments under this filter.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((p) => {
            const inv = invoiceById[p.invoice_id];
            const busy = busyId === p.id;
            return (
              <article key={p.id} className="border border-brand-hair-strong bg-brand-paper p-5">
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${STATUS_BADGE[p.status]}`}
                  >
                    {p.status}
                  </span>
                  <span className="label-technical text-brand-mute">
                    {PAYMENT_METHOD_LABELS[p.method]}
                  </span>
                  <span className="label-technical text-brand-mute font-mono-tab">
                    Claimed {p.claimed_at}
                  </span>
                  <span className="ml-auto font-mono-tab text-brand-ink text-[15px] font-medium">
                    {formatMoney(Number(p.amount), p.currency)}
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2 text-[13px]">
                  <div>
                    <span className="label-technical text-brand-mute mr-2">Invoice</span>
                    {inv ? (
                      <a
                        href={`/pay/${inv.invoice_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-tab text-brand-ink hover:text-brand-accent inline-flex items-center gap-1"
                      >
                        {inv.invoice_code} <ExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="text-brand-mute">{p.invoice_id.slice(0, 8)}…</span>
                    )}
                    {inv && (
                      <div className="text-[12px] text-brand-mute mt-0.5">
                        {inv.client_name} · {inv.description}
                      </div>
                    )}
                  </div>
                  <div>
                    <span className="label-technical text-brand-mute mr-2">Payer</span>
                    <span className="text-brand-ink">{p.payer_name ?? '—'}</span>
                    {p.payer_reference && (
                      <div className="text-[12px] text-brand-mute mt-0.5 font-mono-tab">
                        ref: {p.payer_reference}
                      </div>
                    )}
                  </div>
                  {p.external_reference && (
                    <div className="lg:col-span-2">
                      <span className="label-technical text-brand-mute mr-2">External ref</span>
                      <span className="font-mono-tab text-brand-ink">{p.external_reference}</span>
                    </div>
                  )}
                  {p.notes && (
                    <div className="lg:col-span-2">
                      <span className="label-technical text-brand-mute mr-2">Notes</span>
                      <span className="text-brand-ink-2">{p.notes}</span>
                    </div>
                  )}
                  {p.currency !== 'GBP' && (
                    <div className="lg:col-span-2 text-[12px] text-brand-mute font-mono-tab">
                      ≈ {formatMoney(convertFromGbp(Number(p.amount_gbp), display, rates), display)} {' '}
                      (FX {p.fx_rate})
                    </div>
                  )}
                  {p.financial_transaction_id && (
                    <div className="lg:col-span-2 text-[12px] text-emerald-700 font-mono-tab">
                      ✓ Posted to ledger as {p.financial_transaction_id.slice(0, 8)}…
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 pt-4 border-t border-brand-hair flex flex-wrap items-center justify-end gap-2">
                  {p.status === 'claimed' && (
                    <>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => reject(p)}
                        className="px-4 py-2 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors disabled:opacity-60 inline-flex items-center gap-2"
                      >
                        <X size={13} /> Mark failed
                      </button>
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => verify(p)}
                        className="inline-flex items-center gap-2 px-5 py-2 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60"
                      >
                        {busy ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                        Verify & post to ledger
                      </button>
                    </>
                  )}
                  {p.status === 'received' && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => refund(p)}
                      className="px-4 py-2 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors disabled:opacity-60 inline-flex items-center gap-2"
                    >
                      <RotateCcw size={13} /> Mark refunded
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PaymentsTab;
