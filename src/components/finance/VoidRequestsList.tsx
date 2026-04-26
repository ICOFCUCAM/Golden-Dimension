import React, { useEffect, useMemo, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  type Account,
  type DisplayCurrency,
  type FinancialTransaction,
  type VoidRequest,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';

interface Props {
  /** Whether the viewer can decide on requests (admin / super_admin). */
  canDecide: boolean;
  transactions: FinancialTransaction[];
  accounts: Account[];
  rates: Record<string, number>;
  display: DisplayCurrency;
  /** Called after a decision so parent can refresh transactions. */
  onDecided?: () => void;
}

const STATUS_BADGE: Record<VoidRequest['status'], string> = {
  pending: 'border-amber-300 bg-amber-50 text-amber-800',
  approved: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  rejected: 'border-brand-hair-strong bg-brand-stone text-brand-mute',
};

const VoidRequestsList: React.FC<Props> = ({
  canDecide,
  transactions,
  accounts,
  rates,
  display,
  onDecided,
}) => {
  const [requests, setRequests] = useState<VoidRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | VoidRequest['status']>('all');
  const [note, setNote] = useState<Record<string, string>>({});

  const txById = useMemo(() => {
    const map: Record<string, FinancialTransaction> = {};
    for (const t of transactions) map[t.id] = t;
    return map;
  }, [transactions]);

  const accountById = useMemo(() => {
    const map: Record<string, Account> = {};
    for (const a of accounts) map[a.id] = a;
    return map;
  }, [accounts]);

  const refresh = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('void_requests')
      .select('*')
      .order('requested_at', { ascending: false });
    setLoading(false);
    if (error) {
      toast.error('Failed to load void requests');
      return;
    }
    setRequests((data as VoidRequest[]) ?? []);
  };

  useEffect(() => {
    void refresh();
  }, []);

  const decide = async (req: VoidRequest, decision: 'approved' | 'rejected') => {
    setBusyId(req.id);
    const decisionNote = note[req.id]?.trim() || null;
    const decisionAt = new Date().toISOString();

    const reqUpdate = await supabase
      .from('void_requests')
      .update({
        status: decision,
        decision_note: decisionNote,
        decided_at: decisionAt,
      })
      .eq('id', req.id);

    if (reqUpdate.error) {
      setBusyId(null);
      toast.error(reqUpdate.error.message);
      return;
    }

    if (decision === 'approved') {
      const txUpdate = await supabase
        .from('financial_transactions')
        .update({
          status: 'void',
          voided_at: decisionAt,
          void_reason: req.reason,
        })
        .eq('id', req.transaction_id);
      if (txUpdate.error) {
        setBusyId(null);
        toast.error(`Approval saved but transaction void failed: ${txUpdate.error.message}`);
        return;
      }
    }

    setBusyId(null);
    setNote((n) => ({ ...n, [req.id]: '' }));
    toast.success(decision === 'approved' ? 'Void approved' : 'Void rejected');
    void refresh();
    onDecided?.();
  };

  const filtered = useMemo(
    () => (filter === 'all' ? requests : requests.filter((r) => r.status === filter)),
    [requests, filter],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-end gap-4">
        <label className="flex flex-col text-[12px]">
          <span className="label-technical text-brand-mute mb-1">Status</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-3 py-2 bg-brand-paper border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>
        <span className="ml-auto label-technical text-brand-mute">
          {String(filtered.length).padStart(2, '0')} requests
        </span>
      </div>

      {filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-16 text-center">
          <p className="text-[14px] text-brand-mute">No void requests.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const tx = txById[r.transaction_id];
            const acc = tx ? accountById[tx.account_id] : null;
            return (
              <article
                key={r.id}
                className="border border-brand-hair-strong bg-brand-paper p-5"
              >
                <div className="flex flex-wrap items-baseline gap-3 mb-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${STATUS_BADGE[r.status]}`}
                  >
                    {r.status}
                  </span>
                  <span className="label-technical text-brand-mute font-mono-tab">
                    {r.requested_at}
                  </span>
                  {tx && (
                    <span className="label-technical text-brand-ink-2">
                      {tx.date} · {acc?.code} {acc?.name}
                    </span>
                  )}
                  <span className="ml-auto font-mono-tab text-brand-ink">
                    {tx
                      ? formatMoney(
                          convertFromGbp(Number(tx.amount_gbp), display, rates),
                          display,
                        )
                      : ''}
                  </span>
                </div>
                {tx && (
                  <p className="text-[13px] text-brand-ink mb-2">
                    {tx.description}
                    {tx.counterparty && (
                      <span className="text-brand-mute"> · {tx.counterparty}</span>
                    )}
                  </p>
                )}
                <p className="text-[13px] text-brand-ink-2 leading-[1.6]">
                  <span className="label-technical text-brand-mute mr-2">Reason</span>
                  {r.reason}
                </p>
                {r.decision_note && (
                  <p className="mt-2 text-[12.5px] text-brand-ink-2 leading-[1.6]">
                    <span className="label-technical text-brand-mute mr-2">Decision note</span>
                    {r.decision_note}
                  </p>
                )}

                {canDecide && r.status === 'pending' && (
                  <div className="mt-4 pt-4 border-t border-brand-hair">
                    <label className="flex flex-col text-[12px] mb-3">
                      <span className="label-technical text-brand-mute mb-1.5">
                        Decision note (optional)
                      </span>
                      <input
                        type="text"
                        value={note[r.id] ?? ''}
                        onChange={(e) => setNote((n) => ({ ...n, [r.id]: e.target.value }))}
                        placeholder="Why approving / rejecting?"
                        className="px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink"
                      />
                    </label>
                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => decide(r, 'rejected')}
                        className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors disabled:opacity-60"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        disabled={busyId === r.id}
                        onClick={() => decide(r, 'approved')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-700 text-white text-[13px] font-medium hover:bg-red-800 transition-colors disabled:opacity-60"
                      >
                        {busyId === r.id && <Loader2 size={13} className="animate-spin" />}
                        Approve void
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default VoidRequestsList;
