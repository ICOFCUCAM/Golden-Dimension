import React, { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import {
  type Account,
  type AccountType,
  type DisplayCurrency,
  type FinancialTransaction,
  convertFromGbp,
  formatMoney,
} from '@/lib/finance';

interface ChartOfAccountsProps {
  accounts: Account[];
  transactions: FinancialTransaction[];
  rates: Record<string, number>;
  display: DisplayCurrency;
}

const TYPE_ORDER: AccountType[] = ['asset', 'liability', 'equity', 'income', 'expense'];

const TYPE_LABEL: Record<AccountType, string> = {
  asset: 'Assets',
  liability: 'Liabilities',
  equity: 'Equity',
  income: 'Income',
  expense: 'Expenses',
};

const TYPE_BADGE: Record<AccountType, string> = {
  asset: 'border-emerald-300 bg-emerald-50 text-emerald-800',
  liability: 'border-amber-300 bg-amber-50 text-amber-800',
  equity: 'border-indigo-300 bg-indigo-50 text-indigo-800',
  income: 'border-sky-300 bg-sky-50 text-sky-800',
  expense: 'border-rose-300 bg-rose-50 text-rose-800',
};

const ChartOfAccounts: React.FC<ChartOfAccountsProps> = ({
  accounts,
  transactions,
  rates,
  display,
}) => {
  const [query, setQuery] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  // Per-account net (excluding void) — signed by transaction type so income/
  // expense aggregate sensibly. v1 surface; full double-entry in a later cut.
  const balanceByAccount = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const t of transactions) {
      if (t.status === 'void') continue;
      const sign = t.type === 'expense' ? -1 : 1;
      totals[t.account_id] = (totals[t.account_id] ?? 0) + sign * Number(t.amount_gbp);
    }
    return totals;
  }, [transactions]);

  const txCountByAccount = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const t of transactions) {
      if (t.status === 'void') continue;
      counts[t.account_id] = (counts[t.account_id] ?? 0) + 1;
    }
    return counts;
  }, [transactions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return accounts.filter((a) => {
      if (!showInactive && !a.active) return false;
      if (!q) return true;
      return (
        a.code.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        (a.description ?? '').toLowerCase().includes(q)
      );
    });
  }, [accounts, query, showInactive]);

  const grouped = useMemo(() => {
    const groups: Record<AccountType, Account[]> = {
      asset: [], liability: [], equity: [], income: [], expense: [],
    };
    for (const a of filtered) groups[a.type].push(a);
    return groups;
  }, [filtered]);

  return (
    <div>
      {/* Search bar */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[260px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-mute" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code, name, or description…"
            className="w-full pl-9 pr-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          />
        </div>
        <label className="inline-flex items-center gap-2 text-[12.5px] text-brand-ink-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="accent-brand-ink"
          />
          Show inactive
        </label>
        <span className="label-technical text-brand-mute">
          {String(filtered.length).padStart(2, '0')} of{' '}
          {String(accounts.length).padStart(2, '0')} accounts
        </span>
      </div>

      {/* Groups */}
      <div className="space-y-8">
        {TYPE_ORDER.map((type) => {
          const list = grouped[type];
          if (!list || list.length === 0) return null;
          const groupTotal = list.reduce((s, a) => s + (balanceByAccount[a.id] ?? 0), 0);
          return (
            <section key={type}>
              <header className="flex items-baseline justify-between mb-3 pb-2 border-b border-brand-hair">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${TYPE_BADGE[type]}`}
                  >
                    {type}
                  </span>
                  <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-brand-ink">
                    {TYPE_LABEL[type]}
                  </h3>
                </div>
                <span className="label-technical text-brand-mute">
                  Total{' '}
                  <span className="font-mono-tab text-brand-ink">
                    {formatMoney(convertFromGbp(groupTotal, display, rates), display)}
                  </span>
                </span>
              </header>

              <div className="border border-brand-hair-strong bg-brand-paper overflow-x-auto">
                <table className="w-full text-[13px] border-collapse">
                  <thead className="bg-brand-stone text-left">
                    <tr>
                      <th className="label-technical text-brand-mute py-3 px-4 w-[100px]">Code</th>
                      <th className="label-technical text-brand-mute py-3 px-4">Name</th>
                      <th className="label-technical text-brand-mute py-3 px-4 hidden md:table-cell">
                        Description
                      </th>
                      <th className="label-technical text-brand-mute py-3 px-4 text-right whitespace-nowrap">
                        Tx
                      </th>
                      <th className="label-technical text-brand-mute py-3 px-4 text-right whitespace-nowrap">
                        Net ({display})
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((a) => {
                      const balGbp = balanceByAccount[a.id] ?? 0;
                      const balDisp = convertFromGbp(balGbp, display, rates);
                      const count = txCountByAccount[a.id] ?? 0;
                      return (
                        <tr
                          key={a.id}
                          className={`border-t border-brand-hair ${
                            a.active ? '' : 'opacity-60'
                          }`}
                        >
                          <td className="py-3 px-4 font-mono-tab text-brand-ink-2 align-top">
                            {a.code}
                          </td>
                          <td className="py-3 px-4 align-top">
                            <span className="text-brand-ink">{a.name}</span>
                            {a.parent_code && (
                              <span className="ml-2 label-technical text-brand-mute">
                                ↳ {a.parent_code}
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-brand-ink-2 align-top hidden md:table-cell">
                            {a.description ?? <span className="text-brand-mute">—</span>}
                          </td>
                          <td className="py-3 px-4 text-right font-mono-tab text-brand-mute align-top">
                            {count > 0 ? count : '—'}
                          </td>
                          <td className="py-3 px-4 text-right font-mono-tab align-top">
                            {count > 0 ? (
                              <span className={balDisp < 0 ? 'text-red-700' : 'text-brand-ink'}>
                                {formatMoney(balDisp, display)}
                              </span>
                            ) : (
                              <span className="text-brand-mute">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ChartOfAccounts;
