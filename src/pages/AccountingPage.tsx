import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import RoleGate from '@/components/RoleGate';
import AccountingShell from '@/components/finance/AccountingShell';
import TransactionsTable from '@/components/finance/TransactionsTable';
import { useAuth } from '@/contexts/AuthContext';
import {
  fetchAccounts,
  fetchEngagements,
  fetchFxRates,
  fetchTransactions,
  type Account,
  type DisplayCurrency,
  type Engagement,
  type FinancialTransaction,
} from '@/lib/finance';
import { supabaseConfigured } from '@/lib/supabase';

type TabId = 'transactions' | 'accounts' | 'engagements' | 'reports';

const AccountingInner: React.FC = () => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('transactions');
  const [display, setDisplay] = useState<DisplayCurrency>('GBP');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({ GBP: 1 });
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    try {
      const [a, e, t, r] = await Promise.all([
        fetchAccounts(),
        fetchEngagements(),
        fetchTransactions(),
        fetchFxRates(),
      ]);
      setAccounts(a);
      setEngagements(e);
      setTransactions(t);
      setRates(r);
    } catch {
      toast.error('Failed to load finance data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) void refresh();
  }, [session]);

  const draftCount = useMemo(
    () => transactions.filter((t) => t.status === 'draft').length,
    [transactions],
  );

  return (
    <AccountingShell
      display={display}
      onDisplayChange={setDisplay}
      activeTab={activeTab}
      onTabChange={(t) => setActiveTab(t as TabId)}
      tabs={[
        { id: 'transactions', label: 'Transactions', badge: draftCount },
        { id: 'accounts', label: 'Chart of accounts' },
        { id: 'engagements', label: 'Engagements' },
        { id: 'reports', label: 'Reports' },
      ]}
    >
      {!supabaseConfigured && (
        <div className="mb-6 px-4 py-3 border border-amber-300 bg-amber-50 text-amber-900 text-[13px]">
          Supabase is not configured. Set <code>VITE_SUPABASE_URL</code> and{' '}
          <code>VITE_SUPABASE_ANON_KEY</code> on Vercel to load the ledger.
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
        </div>
      ) : activeTab === 'transactions' ? (
        <TransactionsTable
          transactions={transactions}
          accounts={accounts}
          engagements={engagements}
          rates={rates}
          display={display}
        />
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper p-10">
          <p className="text-[14px] text-brand-mute">
            This tab is coming in the next release.
          </p>
        </div>
      )}
    </AccountingShell>
  );
};

const AccountingPage: React.FC = () => (
  <RoleGate allow={['accountant', 'admin', 'super_admin']}>
    <AccountingInner />
  </RoleGate>
);

export default AccountingPage;
