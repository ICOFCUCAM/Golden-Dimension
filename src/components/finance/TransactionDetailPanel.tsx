import React, { useState } from 'react';
import { Loader2, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  type Account,
  type DisplayCurrency,
  type Engagement,
  type FinancialTransaction,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';

interface Props {
  open: boolean;
  onClose: () => void;
  onChanged: () => void;
  /** Transaction being inspected. */
  transaction: FinancialTransaction | null;
  account: Account | null;
  engagement: Engagement | null;
  rates: Record<string, number>;
  display: DisplayCurrency;
  /** When true the form / actions are also exposed (accountant + admin). */
  canEdit: boolean;
  /** When true, "Edit" opens the existing draft form. */
  onEdit: () => void;
}

const TransactionDetailPanel: React.FC<Props> = ({
  open,
  onClose,
  onChanged,
  transaction,
  account,
  engagement,
  rates,
  display,
  canEdit,
  onEdit,
}) => {
  const [busy, setBusy] = useState(false);
  const [voidReason, setVoidReason] = useState('');
  const [showVoidForm, setShowVoidForm] = useState(false);

  if (!open || !transaction) return null;

  const isDraft = transaction.status === 'draft';

  const post = async () => {
    setBusy(true);
    const { error } = await supabase
      .from('financial_transactions')
      .update({
        status: 'posted',
        posted_at: new Date().toISOString(),
      })
      .eq('id', transaction.id);
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Transaction posted to the ledger');
    onChanged();
    onClose();
  };

  const proposeVoid = async () => {
    if (!voidReason.trim()) {
      toast.error('Provide a reason for the void');
      return;
    }
    setBusy(true);
    const { error } = await supabase.from('void_requests').insert({
      transaction_id: transaction.id,
      reason: voidReason.trim(),
    });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Void request sent to admin for approval');
    setVoidReason('');
    setShowVoidForm(false);
    onChanged();
    onClose();
  };

  const displayAmount = convertFromGbp(Number(transaction.amount_gbp), display, rates);

  return (
    <div className="fixed inset-0 z-[60] bg-brand-ink/40 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
      <div className="bg-brand-paper border border-brand-hair-strong w-full max-w-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-hair-strong">
          <div>
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent">§ FIN.TX</span> · Transaction detail
            </span>
            <h2 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink mt-1">
              {transaction.description}
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

        <dl className="p-6 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-[13px]">
          <DetailRow label="Date" value={<span className="font-mono-tab">{transaction.date}</span>} />
          <DetailRow label="Status" value={transaction.status} />
          <DetailRow label="Type" value={transaction.type} />
          <DetailRow
            label="Reference"
            value={transaction.reference ?? <span className="text-brand-mute">—</span>}
          />
          <DetailRow
            label="Account"
            value={
              account ? (
                <>
                  <span className="font-mono-tab text-brand-mute">{account.code}</span>{' '}
                  {account.name}
                </>
              ) : (
                <span className="text-brand-mute">—</span>
              )
            }
            wide
          />
          <DetailRow
            label="Counterparty"
            value={transaction.counterparty ?? <span className="text-brand-mute">—</span>}
          />
          <DetailRow
            label="Engagement"
            value={
              engagement ? (
                <>
                  <span className="font-mono-tab text-brand-mute">{engagement.code}</span>{' '}
                  {engagement.client_name}
                </>
              ) : (
                <span className="text-brand-mute">—</span>
              )
            }
          />
          <DetailRow
            label={`Amount (${transaction.currency})`}
            value={
              <span className="font-mono-tab">{formatMoney(Number(transaction.amount), transaction.currency)}</span>
            }
          />
          <DetailRow
            label={`Amount (${display})`}
            value={<span className="font-mono-tab">{formatMoney(displayAmount, display)}</span>}
          />
          <DetailRow label="FX rate to GBP" value={<span className="font-mono-tab">{transaction.fx_rate}</span>} />
          <DetailRow
            label="Created"
            value={<span className="font-mono-tab text-brand-mute">{transaction.created_at}</span>}
          />
          {transaction.posted_at && (
            <DetailRow
              label="Posted"
              value={<span className="font-mono-tab text-brand-mute">{transaction.posted_at}</span>}
            />
          )}
          {transaction.voided_at && (
            <DetailRow
              label="Voided"
              value={<span className="font-mono-tab text-brand-mute">{transaction.voided_at}</span>}
            />
          )}
          {transaction.void_reason && (
            <DetailRow label="Void reason" value={transaction.void_reason} wide />
          )}
        </dl>

        {/* Actions */}
        {canEdit && (
          <div className="px-6 pb-6 border-t border-brand-hair pt-4">
            {showVoidForm ? (
              <div className="space-y-3">
                <label className="flex flex-col text-[12px]">
                  <span className="label-technical text-brand-mute mb-1.5">
                    Reason for void <span className="text-brand-accent">*</span>
                  </span>
                  <textarea
                    value={voidReason}
                    onChange={(e) => setVoidReason(e.target.value)}
                    rows={3}
                    placeholder="Why should this transaction be voided? Admin will review."
                    className="w-full px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink"
                  />
                </label>
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setShowVoidForm(false);
                      setVoidReason('');
                    }}
                    className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={proposeVoid}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-700 text-white text-[13px] font-medium hover:bg-red-800 transition-colors disabled:opacity-60"
                  >
                    {busy && <Loader2 size={13} className="animate-spin" />}
                    <Send size={13} /> Send to admin
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-end gap-2">
                {isDraft && (
                  <>
                    <button
                      type="button"
                      onClick={onEdit}
                      className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
                    >
                      Edit draft
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={post}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60"
                    >
                      {busy && <Loader2 size={13} className="animate-spin" />}
                      Post to ledger
                    </button>
                  </>
                )}
                {!isDraft && transaction.status !== 'void' && (
                  <button
                    type="button"
                    onClick={() => setShowVoidForm(true)}
                    className="px-4 py-2.5 bg-brand-paper border border-red-300 text-red-700 text-[13px] font-medium hover:bg-red-50 transition-colors"
                  >
                    Propose void
                  </button>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DetailRow: React.FC<{
  label: string;
  value: React.ReactNode;
  wide?: boolean;
}> = ({ label, value, wide }) => (
  <div className={wide ? 'md:col-span-2' : ''}>
    <dt className="label-technical text-brand-mute mb-0.5">{label}</dt>
    <dd className="text-brand-ink">{value}</dd>
  </div>
);

export default TransactionDetailPanel;
