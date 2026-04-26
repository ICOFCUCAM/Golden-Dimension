import React, { useMemo, useState } from 'react';
import { Filter } from 'lucide-react';
import {
  type Account,
  type Engagement,
  type FinancialTransaction,
  type TransactionStatus,
  type DisplayCurrency,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';

const STATUS_LABELS: Record<TransactionStatus, string> = {
  draft: 'Draft',
  posted: 'Posted',
  reconciled: 'Reconciled',
  audited: 'Audited',
  void: 'Void',
};

const STATUS_BADGE: Record<TransactionStatus, string> = {
  draft: 'border-amber-300 bg-amber-50 text-amber-800',
  posted: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  reconciled: 'border-sky-300 bg-sky-50 text-sky-800',
  audited: 'border-indigo-300 bg-indigo-50 text-indigo-800',
  void: 'border-red-300 bg-red-50 text-red-700',
};

interface TransactionsTableProps {
  transactions: FinancialTransaction[];
  accounts: Account[];
  engagements: Engagement[];
  rates: Record<string, number>;
  display: DisplayCurrency;
  /** When supplied, the row is clickable and the callback fires on click. */
  onRowClick?: (tx: FinancialTransaction) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({
  transactions,
  accounts,
  engagements,
  rates,
  display,
  onRowClick,
}) => {
  const [status, setStatus] = useState<'all' | TransactionStatus>('all');
  const [accountId, setAccountId] = useState<string>('all');
  const [engagementId, setEngagementId] = useState<string>('all');

  const accountById = useMemo(() => {
    const map: Record<string, Account> = {};
    for (const a of accounts) map[a.id] = a;
    return map;
  }, [accounts]);

  const engagementById = useMemo(() => {
    const map: Record<string, Engagement> = {};
    for (const e of engagements) map[e.id] = e;
    return map;
  }, [engagements]);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (status !== 'all' && t.status !== status) return false;
      if (accountId !== 'all' && t.account_id !== accountId) return false;
      if (engagementId !== 'all' && t.engagement_id !== engagementId) return false;
      return true;
    });
  }, [transactions, status, accountId, engagementId]);

  const totalGbp = useMemo(
    () => filtered.filter((r) => r.status !== 'void').reduce((s, r) => s + Number(r.amount_gbp), 0),
    [filtered],
  );

  return (
    <div>
      {/* Filter rail */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-end gap-4">
        <div className="inline-flex items-center gap-2 label-technical text-brand-mute">
          <Filter size={12} /> Filter
        </div>
        <FilterSelect
          label="Status"
          value={status}
          onChange={(v) => setStatus(v as 'all' | TransactionStatus)}
          options={[
            { value: 'all', label: 'All statuses' },
            ...(Object.keys(STATUS_LABELS) as TransactionStatus[]).map((s) => ({
              value: s,
              label: STATUS_LABELS[s],
            })),
          ]}
        />
        <FilterSelect
          label="Account"
          value={accountId}
          onChange={setAccountId}
          options={[
            { value: 'all', label: 'All accounts' },
            ...accounts.map((a) => ({ value: a.id, label: `${a.code} · ${a.name}` })),
          ]}
        />
        <FilterSelect
          label="Engagement"
          value={engagementId}
          onChange={setEngagementId}
          options={[
            { value: 'all', label: 'All engagements' },
            ...engagements.map((e) => ({
              value: e.id,
              label: `${e.code} · ${e.client_name}`,
            })),
          ]}
        />
        <div className="ml-auto text-[12.5px] text-brand-ink-2">
          <span className="label-technical text-brand-mute mr-2">Net (excl. void)</span>
          <span className="font-mono-tab text-brand-ink">
            {formatMoney(convertFromGbp(totalGbp, display, rates), display)}
          </span>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="border border-brand-hair-strong bg-brand-paper py-20 text-center">
          <p className="text-[14px] text-brand-mute">No transactions match these filters.</p>
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper overflow-x-auto">
          <table className="w-full text-[13px] border-collapse">
            <thead className="bg-brand-stone text-left">
              <tr>
                <Th>Date</Th>
                <Th>Reference</Th>
                <Th>Account</Th>
                <Th>Description</Th>
                <Th>Engagement</Th>
                <Th align="right">Amount</Th>
                <Th align="right">{display}</Th>
                <Th>Status</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => {
                const acc = accountById[t.account_id];
                const eng = t.engagement_id ? engagementById[t.engagement_id] : null;
                const displayAmt = convertFromGbp(Number(t.amount_gbp), display, rates);
                return (
                  <tr
                    key={t.id}
                    onClick={onRowClick ? () => onRowClick(t) : undefined}
                    className={`border-t border-brand-hair ${
                      onRowClick ? 'cursor-pointer hover:bg-brand-stone' : ''
                    } ${t.status === 'void' ? 'text-brand-mute' : 'text-brand-ink'}`}
                  >
                    <Td className="font-mono-tab whitespace-nowrap">{t.date}</Td>
                    <Td className="font-mono-tab text-brand-ink-2">{t.reference ?? ''}</Td>
                    <Td>
                      {acc ? (
                        <span>
                          <span className="font-mono-tab text-brand-mute">{acc.code}</span>{' '}
                          <span>{acc.name}</span>
                        </span>
                      ) : (
                        ''
                      )}
                    </Td>
                    <Td className="max-w-[260px] truncate" title={t.description}>
                      {t.description}
                      {t.counterparty && (
                        <span className="text-brand-mute"> · {t.counterparty}</span>
                      )}
                    </Td>
                    <Td>
                      {eng ? (
                        <span className="text-[12px]">
                          <span className="font-mono-tab text-brand-mute">{eng.code}</span>{' '}
                          {eng.client_name}
                        </span>
                      ) : (
                        <span className="text-brand-mute">—</span>
                      )}
                    </Td>
                    <Td align="right" className="font-mono-tab whitespace-nowrap">
                      {formatMoney(Number(t.amount), t.currency)}
                    </Td>
                    <Td align="right" className="font-mono-tab whitespace-nowrap">
                      {formatMoney(displayAmt, display)}
                    </Td>
                    <Td>
                      <span
                        className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${
                          STATUS_BADGE[t.status]
                        }`}
                      >
                        {t.status}
                      </span>
                    </Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const Th: React.FC<{ children: React.ReactNode; align?: 'left' | 'right' }> = ({
  children,
  align = 'left',
}) => (
  <th
    className={`label-technical text-brand-mute py-3 px-4 ${
      align === 'right' ? 'text-right' : 'text-left'
    }`}
  >
    {children}
  </th>
);

const Td: React.FC<{
  children: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
  title?: string;
}> = ({ children, align = 'left', className = '', title }) => (
  <td
    title={title}
    className={`py-3 px-4 ${align === 'right' ? 'text-right' : 'text-left'} ${className}`}
  >
    {children}
  </td>
);

const FilterSelect: React.FC<{
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <label className="flex flex-col text-[12px]">
    <span className="label-technical text-brand-mute mb-1">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-3 py-2 bg-brand-paper border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </label>
);

export default TransactionsTable;
