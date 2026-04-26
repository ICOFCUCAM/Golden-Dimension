import React, { useMemo, useState } from 'react';
import { Loader2, Plus, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { industries, pillars } from '@/data/servicesPage';
import { engagementModelsById } from '@/data/caseStudies';
import {
  type DisplayCurrency,
  type Engagement,
  type FinancialTransaction,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';

interface EngagementsTabProps {
  engagements: Engagement[];
  transactions: FinancialTransaction[];
  rates: Record<string, number>;
  display: DisplayCurrency;
  onChanged: () => void;
}

const sectorById = Object.fromEntries(industries.map((i) => [i.id, i] as const));
const pillarById = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

const EngagementsTab: React.FC<EngagementsTabProps> = ({
  engagements,
  transactions,
  rates,
  display,
  onChanged,
}) => {
  const [showInactive, setShowInactive] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Per-engagement P&L: signed sum of GBP amounts excluding void.
  const pnlByEngagement = useMemo(() => {
    const totals: Record<string, { income: number; expense: number; tx: number }> = {};
    for (const t of transactions) {
      if (t.status === 'void') continue;
      if (!t.engagement_id) continue;
      const cur = totals[t.engagement_id] ?? { income: 0, expense: 0, tx: 0 };
      cur.tx += 1;
      if (t.type === 'income') cur.income += Number(t.amount_gbp);
      else if (t.type === 'expense') cur.expense += Number(t.amount_gbp);
      totals[t.engagement_id] = cur;
    }
    return totals;
  }, [transactions]);

  const filtered = useMemo(
    () => (showInactive ? engagements : engagements.filter((e) => e.active)),
    [engagements, showInactive],
  );

  const toggleActive = async (e: Engagement) => {
    const { error } = await supabase
      .from('engagements')
      .update({ active: !e.active })
      .eq('id', e.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(e.active ? 'Engagement archived' : 'Engagement activated');
    onChanged();
  };

  return (
    <div>
      {/* Header bar */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-center gap-4">
        <span className="label-technical text-brand-mute">
          {String(filtered.length).padStart(2, '0')} of{' '}
          {String(engagements.length).padStart(2, '0')} engagements
        </span>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-brand-ink-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="accent-brand-ink"
          />
          Show archived
        </label>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors"
          >
            <Plus size={13} /> New engagement
          </button>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-20 text-center">
          <p className="text-[14px] text-brand-mute">No engagements yet.</p>
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="mt-4 text-[13px] font-medium text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
          >
            Create the first engagement
          </button>
        </div>
      ) : (
        <div className="border-t border-l border-brand-hair">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e) => {
              const pnl = pnlByEngagement[e.id] ?? { income: 0, expense: 0, tx: 0 };
              const netGbp = pnl.income - pnl.expense;
              const sector = e.sector_id ? sectorById[e.sector_id] : null;
              const pillar = e.pillar_id ? pillarById[e.pillar_id] : null;
              const model = e.engagement_model_id
                ? engagementModelsById[e.engagement_model_id]
                : null;
              return (
                <article
                  key={e.id}
                  className={`border-r border-b border-brand-hair p-6 bg-brand-paper ${
                    e.active ? '' : 'opacity-70'
                  }`}
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <span className="label-technical text-brand-accent font-mono-tab">
                      {e.code}
                    </span>
                    <span
                      className={`label-technical px-2 py-0.5 border ${
                        e.active
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                          : 'border-brand-hair-strong bg-brand-stone text-brand-mute'
                      }`}
                    >
                      {e.active ? 'Active' : 'Archived'}
                    </span>
                  </div>

                  <h3 className="font-display text-[18px] font-medium tracking-[-0.01em] text-brand-ink leading-snug">
                    {e.client_name}
                  </h3>

                  <ul className="mt-3 space-y-1 text-[12.5px] text-brand-ink-2">
                    {sector && (
                      <li>
                        <span className="label-technical text-brand-mute mr-2">Sector</span>
                        {sector.name}
                      </li>
                    )}
                    {pillar && (
                      <li>
                        <span className="label-technical text-brand-mute mr-2">Pillar</span>
                        {pillar.index} · {pillar.name}
                      </li>
                    )}
                    {model && (
                      <li>
                        <span className="label-technical text-brand-mute mr-2">Model</span>
                        {model}
                      </li>
                    )}
                    {(e.start_date || e.end_date) && (
                      <li>
                        <span className="label-technical text-brand-mute mr-2">Window</span>
                        <span className="font-mono-tab">
                          {e.start_date ?? '—'} → {e.end_date ?? 'open'}
                        </span>
                      </li>
                    )}
                  </ul>

                  <div className="mt-5 pt-4 border-t border-brand-hair grid grid-cols-3 gap-3 text-[12px]">
                    <Stat
                      label="Income"
                      value={formatMoney(convertFromGbp(pnl.income, display, rates), display)}
                    />
                    <Stat
                      label="Expense"
                      value={formatMoney(convertFromGbp(pnl.expense, display, rates), display)}
                      tone="muted"
                    />
                    <Stat
                      label="Net"
                      value={formatMoney(convertFromGbp(netGbp, display, rates), display)}
                      tone={netGbp >= 0 ? 'positive' : 'negative'}
                    />
                  </div>

                  <div className="mt-5 pt-4 border-t border-brand-hair flex items-center justify-between">
                    <span className="label-technical text-brand-mute font-mono-tab">
                      {pnl.tx} tx
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleActive(e)}
                      className="label-technical text-brand-ink-2 hover:text-brand-accent transition-colors"
                    >
                      {e.active ? 'Archive' : 'Reactivate'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      <EngagementForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={onChanged}
      />
    </div>
  );
};

const Stat: React.FC<{
  label: string;
  value: string;
  tone?: 'muted' | 'positive' | 'negative';
}> = ({ label, value, tone = 'muted' }) => (
  <div>
    <div className="label-technical text-brand-mute mb-0.5">{label}</div>
    <div
      className={`font-mono-tab ${
        tone === 'positive'
          ? 'text-emerald-700'
          : tone === 'negative'
          ? 'text-red-700'
          : 'text-brand-ink'
      }`}
    >
      {value}
    </div>
  </div>
);

// ----- Engagement form ----------------------------------------------------

interface EngagementFormProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const EngagementForm: React.FC<EngagementFormProps> = ({ open, onClose, onSaved }) => {
  const [code, setCode] = useState('');
  const [clientName, setClientName] = useState('');
  const [sectorId, setSectorId] = useState('');
  const [pillarId, setPillarId] = useState('');
  const [modelId, setModelId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const reset = () => {
    setCode('');
    setClientName('');
    setSectorId('');
    setPillarId('');
    setModelId('');
    setStartDate('');
    setEndDate('');
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !clientName.trim()) {
      toast.error('Code and client name are required');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('engagements').insert({
      code: code.trim(),
      client_name: clientName.trim(),
      sector_id: sectorId || null,
      pillar_id: pillarId || null,
      engagement_model_id: modelId || null,
      start_date: startDate || null,
      end_date: endDate || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Engagement created');
    reset();
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
              <span className="text-brand-accent">§ FIN.EN</span> · New engagement
            </span>
            <h2 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink mt-1">
              Create a client engagement
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
          <Field label="Engagement code" required>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={inputCls}
              placeholder="GD-2026-014"
              required
            />
          </Field>
          <Field label="Client name" required>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className={inputCls}
              placeholder="Anonymised or full name"
              required
            />
          </Field>

          <Field label="Sector">
            <select
              value={sectorId}
              onChange={(e) => setSectorId(e.target.value)}
              className={inputCls}
            >
              <option value="">— None —</option>
              {industries.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Capability pillar">
            <select
              value={pillarId}
              onChange={(e) => setPillarId(e.target.value)}
              className={inputCls}
            >
              <option value="">— None —</option>
              {pillars.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.index} · {p.name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Engagement model" className="md:col-span-2">
            <select
              value={modelId}
              onChange={(e) => setModelId(e.target.value)}
              className={inputCls}
            >
              <option value="">— None —</option>
              {Object.entries(engagementModelsById).map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Start date">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="End date">
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
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
              Create engagement
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

export default EngagementsTab;
