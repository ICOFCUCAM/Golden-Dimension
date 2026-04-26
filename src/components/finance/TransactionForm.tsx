import React, { useEffect, useMemo, useState } from 'react';
import { Loader2, Paperclip, Trash2, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  type Account,
  type Engagement,
  type FinancialTransaction,
  type TransactionType,
} from '@/lib/finance';

const ATTACHMENTS_BUCKET = 'finance-attachments';

interface TransactionFormProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  accounts: Account[];
  engagements: Engagement[];
  rates: Record<string, number>;
  /** When provided, the form opens in "edit draft" mode. */
  editing?: FinancialTransaction | null;
}

interface FormState {
  date: string;
  type: TransactionType;
  account_id: string;
  engagement_id: string;
  reference: string;
  counterparty: string;
  description: string;
  amount: string;
  currency: string;
  fx_rate: string;
}

const today = () => new Date().toISOString().slice(0, 10);

const blank = (): FormState => ({
  date: today(),
  type: 'expense',
  account_id: '',
  engagement_id: '',
  reference: '',
  counterparty: '',
  description: '',
  amount: '',
  currency: 'GBP',
  fx_rate: '1',
});

const TransactionForm: React.FC<TransactionFormProps> = ({
  open,
  onClose,
  onSaved,
  accounts,
  engagements,
  rates,
  editing,
}) => {
  const [form, setForm] = useState<FormState>(blank);
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!open) return;
    if (editing) {
      setForm({
        date: editing.date,
        type: editing.type,
        account_id: editing.account_id,
        engagement_id: editing.engagement_id ?? '',
        reference: editing.reference ?? '',
        counterparty: editing.counterparty ?? '',
        description: editing.description,
        amount: String(editing.amount),
        currency: editing.currency,
        fx_rate: String(editing.fx_rate),
      });
    } else {
      setForm(blank());
    }
    setFiles([]);
  }, [open, editing]);

  // Auto-suggest fx_rate from rates table when currency changes (edit only if user hasn't typed).
  useEffect(() => {
    if (!open) return;
    const r = rates[form.currency];
    if (r) setForm((f) => ({ ...f, fx_rate: String(r) }));
  }, [form.currency, rates, open]);

  const accountsByType = useMemo(() => {
    const groups: Record<string, Account[]> = {};
    for (const a of accounts) {
      if (!a.active) continue;
      if (!groups[a.type]) groups[a.type] = [];
      groups[a.type].push(a);
    }
    return groups;
  }, [accounts]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles((prev) => [...prev, ...Array.from(list)]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const validate = (): string | null => {
    if (!form.date) return 'Date is required';
    if (!form.account_id) return 'Account is required';
    if (!form.description.trim()) return 'Description is required';
    const amt = Number(form.amount);
    if (!Number.isFinite(amt) || amt === 0) return 'Amount must be a non-zero number';
    const fx = Number(form.fx_rate);
    if (!Number.isFinite(fx) || fx <= 0) return 'FX rate must be greater than zero';
    if (!/^[A-Z]{3}$/.test(form.currency)) return 'Currency must be a 3-letter ISO code';
    return null;
  };

  const uploadAttachments = async (transactionId: string) => {
    if (files.length === 0) return;
    for (const file of files) {
      const ext = file.name.split('.').pop() ?? 'bin';
      const path = `${transactionId}/${crypto.randomUUID()}.${ext}`;
      const upload = await supabase.storage
        .from(ATTACHMENTS_BUCKET)
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upload.error) {
        toast.error(`Upload failed: ${file.name} — ${upload.error.message}`);
        continue;
      }
      const { error } = await supabase.from('transaction_attachments').insert({
        transaction_id: transactionId,
        storage_path: path,
        file_name: file.name,
        mime_type: file.type,
        size_bytes: file.size,
      });
      if (error) {
        toast.error(`Attachment row failed: ${file.name}`);
      }
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      toast.error(err);
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        date: form.date,
        type: form.type,
        account_id: form.account_id,
        engagement_id: form.engagement_id || null,
        reference: form.reference.trim() || null,
        counterparty: form.counterparty.trim() || null,
        description: form.description.trim(),
        amount: Number(form.amount),
        currency: form.currency,
        fx_rate: Number(form.fx_rate),
      };

      let txId: string | null = editing?.id ?? null;
      if (editing) {
        const { error } = await supabase
          .from('financial_transactions')
          .update(payload)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from('financial_transactions')
          .insert(payload)
          .select('id')
          .single();
        if (error) throw error;
        txId = data?.id ?? null;
      }

      if (txId && files.length > 0) {
        await uploadAttachments(txId);
      }

      toast.success(editing ? 'Draft updated' : 'Transaction saved as draft');
      onSaved();
      onClose();
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed to save transaction';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-brand-ink/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="bg-brand-paper border border-brand-hair-strong w-full max-w-3xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-hair-strong">
          <div>
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent">§ FIN.TX</span> ·{' '}
              {editing ? 'Edit draft' : 'New transaction'}
            </span>
            <h2 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink mt-1">
              {editing ? 'Edit draft transaction' : 'Record a new transaction'}
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
          <Field label="Date" required>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              className={inputCls}
              required
            />
          </Field>
          <Field label="Type" required>
            <select
              value={form.type}
              onChange={(e) => update('type', e.target.value as TransactionType)}
              className={inputCls}
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
              <option value="transfer">Transfer</option>
              <option value="journal_adjustment">Journal adjustment</option>
            </select>
          </Field>

          <Field label="Account" required className="md:col-span-2">
            <select
              value={form.account_id}
              onChange={(e) => update('account_id', e.target.value)}
              className={inputCls}
              required
            >
              <option value="">Select an account…</option>
              {Object.entries(accountsByType).map(([type, list]) => (
                <optgroup key={type} label={type.toUpperCase()}>
                  {list.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.code} · {a.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Description" required className="md:col-span-2">
            <input
              type="text"
              value={form.description}
              onChange={(e) => update('description', e.target.value)}
              className={inputCls}
              placeholder="What does this transaction record?"
              required
            />
          </Field>

          <Field label="Counterparty">
            <input
              type="text"
              value={form.counterparty}
              onChange={(e) => update('counterparty', e.target.value)}
              className={inputCls}
              placeholder="Client, supplier, employee…"
            />
          </Field>
          <Field label="Reference">
            <input
              type="text"
              value={form.reference}
              onChange={(e) => update('reference', e.target.value)}
              className={inputCls}
              placeholder="INV-2026-0042 / GD-PO-014"
            />
          </Field>

          <Field label="Engagement (optional)" className="md:col-span-2">
            <select
              value={form.engagement_id}
              onChange={(e) => update('engagement_id', e.target.value)}
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
              value={form.amount}
              onChange={(e) => update('amount', e.target.value)}
              className={inputCls}
              placeholder="0.00"
              required
            />
          </Field>
          <Field label="Currency" required>
            <select
              value={form.currency}
              onChange={(e) => update('currency', e.target.value)}
              className={inputCls}
            >
              {Object.keys(rates).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>

          <Field label="FX rate (to GBP)" required className="md:col-span-2">
            <input
              type="number"
              step="0.000001"
              value={form.fx_rate}
              onChange={(e) => update('fx_rate', e.target.value)}
              className={inputCls}
              required
            />
            <p className="mt-1 text-[11.5px] text-brand-mute">
              Auto-filled from the FX table. Override if you need a transaction-specific rate.
            </p>
          </Field>

          <Field label="Attachments" className="md:col-span-2">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 px-3 py-2 border border-brand-hair-strong bg-brand-ivory text-[12.5px] font-medium text-brand-ink-2 hover:border-brand-ink hover:text-brand-ink cursor-pointer transition-colors">
                <Paperclip size={13} />
                Add files
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
              <span className="text-[12px] text-brand-mute">
                {files.length === 0 ? 'No files attached' : `${files.length} file(s) ready to upload`}
              </span>
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-1.5">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between border border-brand-hair px-3 py-1.5 text-[12.5px]"
                  >
                    <span className="truncate">
                      {f.name}{' '}
                      <span className="text-brand-mute">({Math.round(f.size / 1024)} KB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-brand-mute hover:text-red-700"
                      aria-label={`Remove ${f.name}`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[11.5px] text-brand-mute">
              Files upload to the <code>{ATTACHMENTS_BUCKET}</code> Storage bucket. Create
              this bucket in Supabase before first use.
            </p>
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
              {editing ? 'Save changes' : 'Save as draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const inputCls =
  'w-full px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink transition-colors';

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

export default TransactionForm;
