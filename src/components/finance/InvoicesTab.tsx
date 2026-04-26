import React, { useEffect, useMemo, useState } from 'react';
import { Copy, ExternalLink, Loader2, Plus, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  type Engagement,
  type DisplayCurrency,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';
import {
  type Invoice,
  type InvoiceStatus,
  INVOICE_STATUS_LABELS,
  fetchInvoices,
  newInvoiceCode,
} from '@/lib/payments';

interface Props {
  engagements: Engagement[];
  rates: Record<string, number>;
  display: DisplayCurrency;
  onChanged?: () => void;
}

const STATUS_BADGE: Record<InvoiceStatus, string> = {
  draft: 'border-brand-hair-strong bg-brand-stone text-brand-mute',
  sent: 'border-sky-300 bg-sky-50 text-sky-800',
  partial: 'border-amber-300 bg-amber-50 text-amber-800',
  paid: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  void: 'border-red-300 bg-red-50 text-red-700',
  overdue: 'border-red-300 bg-red-50 text-red-800',
};

const InvoicesTab: React.FC<Props> = ({ engagements, rates, display, onChanged }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | InvoiceStatus>('all');
  const [formOpen, setFormOpen] = useState(false);

  const refresh = async () => {
    setLoading(true);
    const list = await fetchInvoices();
    setInvoices(list);
    setLoading(false);
  };

  useEffect(() => { void refresh(); }, []);

  const engagementById = useMemo(() => {
    const map: Record<string, Engagement> = {};
    for (const e of engagements) map[e.id] = e;
    return map;
  }, [engagements]);

  const filtered = useMemo(
    () => (filter === 'all' ? invoices : invoices.filter((i) => i.status === filter)),
    [invoices, filter],
  );

  const markSent = async (inv: Invoice) => {
    const { error } = await supabase
      .from('invoices')
      .update({ status: 'sent', sent_at: new Date().toISOString() })
      .eq('id', inv.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${inv.invoice_code} marked as sent`);
    void refresh();
    onChanged?.();
  };

  const markVoid = async (inv: Invoice) => {
    if (!window.confirm(`Void invoice ${inv.invoice_code}? This cannot be undone.`)) return;
    const { error } = await supabase
      .from('invoices')
      .update({ status: 'void' })
      .eq('id', inv.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`${inv.invoice_code} voided`);
    void refresh();
    onChanged?.();
  };

  const copyLink = async (inv: Invoice) => {
    const url = `${window.location.origin}/pay/${inv.invoice_code}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Payment link copied');
    } catch {
      toast.error('Copy failed — manually copy: ' + url);
    }
  };

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
            {(Object.keys(INVOICE_STATUS_LABELS) as InvoiceStatus[]).map((s) => (
              <option key={s} value={s}>{INVOICE_STATUS_LABELS[s]}</option>
            ))}
          </select>
        </label>
        <span className="label-technical text-brand-mute">
          {String(filtered.length).padStart(2, '0')} of {String(invoices.length).padStart(2, '0')} invoices
        </span>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors"
          >
            <Plus size={13} /> New invoice
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
          <p className="text-[14px] text-brand-mute">No invoices yet.</p>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="mt-4 text-[13px] font-medium text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
          >
            Create the first invoice
          </button>
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead className="bg-brand-stone text-left">
              <tr>
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">Code</th>
                <th className="label-technical text-brand-mute py-3 px-4">Client / Description</th>
                <th className="label-technical text-brand-mute py-3 px-4">Engagement</th>
                <th className="label-technical text-brand-mute py-3 px-4 text-right whitespace-nowrap">Amount</th>
                <th className="label-technical text-brand-mute py-3 px-4 text-right whitespace-nowrap">{display}</th>
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">Issued</th>
                <th className="label-technical text-brand-mute py-3 px-4 whitespace-nowrap">Due</th>
                <th className="label-technical text-brand-mute py-3 px-4">Status</th>
                <th className="label-technical text-brand-mute py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv) => {
                const eng = inv.engagement_id ? engagementById[inv.engagement_id] : null;
                return (
                  <tr key={inv.id} className="border-t border-brand-hair">
                    <td className="py-3 px-4 font-mono-tab text-brand-ink-2 whitespace-nowrap">
                      {inv.invoice_code}
                    </td>
                    <td className="py-3 px-4 max-w-[260px]">
                      <div className="text-brand-ink truncate">{inv.client_name}</div>
                      <div className="text-[12px] text-brand-mute truncate">{inv.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      {eng ? (
                        <span className="text-[12px]">
                          <span className="font-mono-tab text-brand-mute">{eng.code}</span>{' '}
                          {eng.client_name}
                        </span>
                      ) : (
                        <span className="text-brand-mute">—</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tab whitespace-nowrap">
                      {formatMoney(Number(inv.amount), inv.currency)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono-tab whitespace-nowrap">
                      {formatMoney(convertFromGbp(Number(inv.amount_gbp), display, rates), display)}
                    </td>
                    <td className="py-3 px-4 font-mono-tab text-brand-mute whitespace-nowrap">
                      {inv.issued_date}
                    </td>
                    <td className="py-3 px-4 font-mono-tab text-brand-mute whitespace-nowrap">
                      {inv.due_date ?? '—'}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${STATUS_BADGE[inv.status]}`}
                      >
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => copyLink(inv)}
                          aria-label="Copy payment link"
                          className="p-1.5 text-brand-mute hover:text-brand-accent transition-colors"
                        >
                          <Copy size={13} />
                        </button>
                        <a
                          href={`/pay/${inv.invoice_code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Open payment page"
                          className="p-1.5 text-brand-mute hover:text-brand-accent transition-colors"
                        >
                          <ExternalLink size={13} />
                        </a>
                        {inv.status === 'draft' && (
                          <button
                            type="button"
                            onClick={() => markSent(inv)}
                            aria-label="Mark sent"
                            className="p-1.5 text-brand-mute hover:text-brand-accent transition-colors"
                          >
                            <Send size={13} />
                          </button>
                        )}
                        {inv.status !== 'paid' && inv.status !== 'void' && (
                          <button
                            type="button"
                            onClick={() => markVoid(inv)}
                            aria-label="Void"
                            className="p-1.5 text-brand-mute hover:text-red-700 transition-colors"
                          >
                            <X size={13} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <InvoiceForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={() => { void refresh(); onChanged?.(); }}
        engagements={engagements}
        invoiceCount={invoices.length}
      />
    </div>
  );
};

// ----- Form modal --------------------------------------------------------

const InvoiceForm: React.FC<{
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  engagements: Engagement[];
  invoiceCount: number;
}> = ({ open, onClose, onSaved, engagements, invoiceCount }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [description, setDescription] = useState('');
  const [engagementId, setEngagementId] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('GBP');
  const [fxRate, setFxRate] = useState('1');
  const [dueDate, setDueDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setClientName('');
      setClientEmail('');
      setDescription('');
      setEngagementId('');
      setAmount('');
      setCurrency('GBP');
      setFxRate('1');
      setDueDate('');
    }
  }, [open]);

  // Default 30 days when the form opens.
  useEffect(() => {
    if (open && !dueDate) {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      setDueDate(d.toISOString().slice(0, 10));
    }
  }, [open]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !description.trim()) {
      toast.error('Client name and description are required');
      return;
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      toast.error('Amount must be a positive number');
      return;
    }
    setSubmitting(true);
    const code = newInvoiceCode(new Date().getFullYear(), invoiceCount + 1);
    const { error } = await supabase.from('invoices').insert({
      invoice_code: code,
      engagement_id: engagementId || null,
      client_name: clientName.trim(),
      client_email: clientEmail.trim() || null,
      description: description.trim(),
      amount: amt,
      currency,
      fx_rate: Number(fxRate) || 1,
      due_date: dueDate || null,
      status: 'draft',
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(`Invoice ${code} created as draft`);
    onSaved();
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-brand-ink/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="bg-brand-paper border border-brand-hair-strong w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-hair-strong">
          <div>
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent">§ FIN.IN</span> · New invoice
            </span>
            <h2 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink mt-1">
              Issue an invoice
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 inline-flex items-center justify-center text-brand-mute hover:text-brand-ink transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Client name" required>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={inputCls}
              placeholder="Anonymised or full name"
            />
          </Field>
          <Field label="Client email">
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className={inputCls}
              placeholder="finance@client.example"
            />
          </Field>
          <Field label="Description" required className="md:col-span-2">
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputCls}
              placeholder="Programme delivery — Q2 milestone, etc."
            />
          </Field>
          <Field label="Engagement (optional)" className="md:col-span-2">
            <select
              value={engagementId}
              onChange={(e) => setEngagementId(e.target.value)}
              className={inputCls}
            >
              <option value="">— None —</option>
              {engagements.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.code} · {e.client_name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Amount" required>
            <input
              type="number"
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputCls}
              placeholder="0.00"
            />
          </Field>
          <Field label="Currency" required>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={inputCls}
            >
              <option value="GBP">GBP</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="AED">AED</option>
            </select>
          </Field>
          <Field label="FX rate to GBP" required>
            <input
              type="number"
              step="0.000001"
              required
              value={fxRate}
              onChange={(e) => setFxRate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Due date">
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className={inputCls}
            />
          </Field>

          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-4 border-t border-brand-hair">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60"
            >
              {submitting && <Loader2 size={13} className="animate-spin" />}
              Create as draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Field: React.FC<{
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, required, className = '', children }) => (
  <label className={`flex flex-col ${className}`}>
    <span className="label-technical text-brand-mute mb-1.5">
      {label}
      {required && <span className="text-brand-accent ml-1">*</span>}
    </span>
    {children}
  </label>
);

const inputCls =
  'w-full px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink transition-colors';

export default InvoicesTab;
