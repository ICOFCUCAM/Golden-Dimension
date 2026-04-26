import React, { useMemo, useState } from 'react';
import { Download, FileSpreadsheet, Printer } from 'lucide-react';
import {
  type Account,
  type AccountType,
  type DisplayCurrency,
  type Engagement,
  type FinancialTransaction,
  convertFromGbp,
  downloadFile,
  formatMoney,
  transactionsToCsv,
} from '@/lib/finance';

interface ReportsTabProps {
  transactions: FinancialTransaction[];
  accounts: Account[];
  engagements: Engagement[];
  rates: Record<string, number>;
  display: DisplayCurrency;
}

const TYPE_ORDER: AccountType[] = ['asset', 'liability', 'equity', 'income', 'expense'];

const ReportsTab: React.FC<ReportsTabProps> = ({
  transactions,
  accounts,
  engagements,
  rates,
  display,
}) => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');

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

  // In-period rows excluding void.
  const inPeriod = useMemo(() => {
    return transactions.filter((t) => {
      if (t.status === 'void') return false;
      if (from && t.date < from) return false;
      if (to && t.date > to) return false;
      return true;
    });
  }, [transactions, from, to]);

  // Trial balance: signed running net by account, grouped by type.
  const trialBalance = useMemo(() => {
    const totals: Record<string, number> = {};
    for (const t of inPeriod) {
      const sign = t.type === 'expense' ? -1 : 1;
      totals[t.account_id] = (totals[t.account_id] ?? 0) + sign * Number(t.amount_gbp);
    }
    const groups: Record<AccountType, { account: Account; balance: number }[]> = {
      asset: [], liability: [], equity: [], income: [], expense: [],
    };
    for (const a of accounts) {
      const v = totals[a.id];
      if (v === undefined || v === 0) continue;
      groups[a.type].push({ account: a, balance: v });
    }
    return groups;
  }, [inPeriod, accounts]);

  const totals = useMemo(() => {
    const sum = (type: AccountType) =>
      (trialBalance[type] ?? []).reduce((s, r) => s + r.balance, 0);
    const income = sum('income');
    const expense = -sum('expense'); // expense rows come in negative
    return {
      income,
      expense,
      net: income - expense,
      assets: sum('asset'),
      liabilities: sum('liability'),
      equity: sum('equity'),
    };
  }, [trialBalance]);

  const exportCsv = () => {
    const csv = transactionsToCsv(inPeriod, accountById, engagementById);
    const stamp = new Date().toISOString().slice(0, 10);
    downloadFile(`golden-dimensions-ledger-${stamp}.csv`, csv, 'text/csv;charset=utf-8');
  };

  const showPeriod = from || to ? `${from || '…'} → ${to || '…'}` : 'all-time';

  return (
    <div>
      {/* Toolbar */}
      <div className="border border-brand-hair-strong bg-brand-paper p-4 mb-6 flex flex-wrap items-end gap-4 print:hidden">
        <label className="flex flex-col text-[12px]">
          <span className="label-technical text-brand-mute mb-1">From</span>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="px-3 py-2 bg-brand-ivory border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          />
        </label>
        <label className="flex flex-col text-[12px]">
          <span className="label-technical text-brand-mute mb-1">To</span>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="px-3 py-2 bg-brand-ivory border border-brand-hair-strong text-[13px] text-brand-ink focus:outline-none focus:border-brand-ink"
          />
        </label>
        {(from || to) && (
          <button
            type="button"
            onClick={() => {
              setFrom('');
              setTo('');
            }}
            className="label-technical text-brand-ink-2 hover:text-brand-accent transition-colors self-end pb-2.5"
          >
            Clear period
          </button>
        )}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
          >
            <FileSpreadsheet size={13} /> Export CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors"
          >
            <Printer size={13} /> Print / save PDF
          </button>
        </div>
      </div>

      {/* Print-styled report area */}
      <div className="print:p-0">
        <header className="hidden print:block mb-6">
          <h1 className="text-[20px] font-bold text-brand-ink">Golden Dimensions Ltd</h1>
          <p className="text-[12px] text-brand-ink-2 mt-1">
            Internal financial report · period {showPeriod} · presented in {display}
          </p>
        </header>

        {/* Summary */}
        <section className="mb-8 grid grid-cols-2 lg:grid-cols-6 gap-3">
          <SummaryTile label="Income" value={totals.income} display={display} rates={rates} tone="positive" />
          <SummaryTile label="Expenses" value={totals.expense} display={display} rates={rates} tone="muted" />
          <SummaryTile
            label="Net result"
            value={totals.net}
            display={display}
            rates={rates}
            tone={totals.net >= 0 ? 'positive' : 'negative'}
            accent
          />
          <SummaryTile label="Assets" value={totals.assets} display={display} rates={rates} />
          <SummaryTile label="Liabilities" value={totals.liabilities} display={display} rates={rates} />
          <SummaryTile label="Equity" value={totals.equity} display={display} rates={rates} />
        </section>

        {/* Trial balance */}
        <section className="border border-brand-hair-strong bg-brand-paper">
          <header className="flex items-baseline justify-between px-5 py-4 border-b border-brand-hair">
            <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-brand-ink">
              Trial balance
            </h3>
            <span className="label-technical text-brand-mute">
              Period {showPeriod} · {inPeriod.length} entries
            </span>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px] border-collapse">
              <thead className="bg-brand-stone text-left">
                <tr>
                  <th className="label-technical text-brand-mute py-3 px-5 w-[120px]">Code</th>
                  <th className="label-technical text-brand-mute py-3 px-5">Account</th>
                  <th className="label-technical text-brand-mute py-3 px-5 text-right whitespace-nowrap">
                    Debit ({display})
                  </th>
                  <th className="label-technical text-brand-mute py-3 px-5 text-right whitespace-nowrap">
                    Credit ({display})
                  </th>
                </tr>
              </thead>
              <tbody>
                {TYPE_ORDER.map((type) => {
                  const list = trialBalance[type];
                  if (!list || list.length === 0) return null;
                  return (
                    <React.Fragment key={type}>
                      <tr className="bg-brand-ivory">
                        <td colSpan={4} className="py-2 px-5 label-technical text-brand-accent">
                          {type.toUpperCase()}
                        </td>
                      </tr>
                      {list.map(({ account, balance }) => {
                        const debit = balance >= 0 ? balance : 0;
                        const credit = balance < 0 ? -balance : 0;
                        return (
                          <tr key={account.id} className="border-t border-brand-hair">
                            <td className="py-2.5 px-5 font-mono-tab text-brand-ink-2">
                              {account.code}
                            </td>
                            <td className="py-2.5 px-5 text-brand-ink">{account.name}</td>
                            <td className="py-2.5 px-5 text-right font-mono-tab">
                              {debit > 0
                                ? formatMoney(convertFromGbp(debit, display, rates), display)
                                : ''}
                            </td>
                            <td className="py-2.5 px-5 text-right font-mono-tab">
                              {credit > 0
                                ? formatMoney(convertFromGbp(credit, display, rates), display)
                                : ''}
                            </td>
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        <p className="mt-6 text-[11.5px] text-brand-mute leading-relaxed max-w-2xl print:mt-4">
          Trial balance presents account-level net movement in the period (income, transfers,
          and journal adjustments aggregate positive; expenses aggregate negative). Display
          currency is converted from the GBP base using the FX rates table; original
          transaction currencies are preserved in the ledger.
        </p>
      </div>
    </div>
  );
};

const SummaryTile: React.FC<{
  label: string;
  value: number;
  display: DisplayCurrency;
  rates: Record<string, number>;
  tone?: 'muted' | 'positive' | 'negative';
  accent?: boolean;
}> = ({ label, value, display, rates, tone = 'muted', accent }) => (
  <div
    className={`border ${
      accent ? 'border-brand-ink' : 'border-brand-hair-strong'
    } bg-brand-paper p-4`}
  >
    <div className="label-technical text-brand-mute mb-2">{label}</div>
    <div
      className={`font-display font-medium text-[20px] tracking-[-0.01em] font-mono-tab ${
        tone === 'positive'
          ? 'text-emerald-700'
          : tone === 'negative'
          ? 'text-red-700'
          : 'text-brand-ink'
      }`}
    >
      {formatMoney(convertFromGbp(value, display, rates), display)}
    </div>
  </div>
);

export default ReportsTab;
