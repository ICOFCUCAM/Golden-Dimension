import React, { useEffect, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import RoleGate from '@/components/RoleGate';
import AccountingShell from '@/components/finance/AccountingShell';
import TransactionsTable from '@/components/finance/TransactionsTable';
import TransactionForm from '@/components/finance/TransactionForm';
import ChartOfAccounts from '@/components/finance/ChartOfAccounts';
import EngagementsTab from '@/components/finance/EngagementsTab';
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
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<FinancialTransaction | null>(null);

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

  const onRowClick = (tx: FinancialTransaction) => {
    if (tx.status !== 'draft') {
      toast.info('Only draft transactions can be edited. Posted entries require an admin-approved void.');
      return;
    }
    setEditing(tx);
    setFormOpen(true);
  };

  return (
    <>
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
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="label-technical text-brand-mute">
                {String(transactions.length).padStart(2, '0')} entries · click a draft to edit
              </p>
              <button
                type="button"
                onClick={() => {
                  setEditing(null);
                  setFormOpen(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors"
              >
                <Plus size={13} /> New transaction
              </button>
            </div>
            <TransactionsTable
              transactions={transactions}
              accounts={accounts}
              engagements={engagements}
              rates={rates}
              display={display}
              onRowClick={onRowClick}
            />
          </>
        ) : activeTab === 'accounts' ? (
          <ChartOfAccounts
            accounts={accounts}
            transactions={transactions}
            rates={rates}
            display={display}
          />
        ) : activeTab === 'engagements' ? (
          <EngagementsTab
            engagements={engagements}
            transactions={transactions}
            rates={rates}
            display={display}
            onChanged={refresh}
          />
        ) : (
          <div className="border border-brand-hair-strong bg-brand-paper p-10">
            <p className="text-[14px] text-brand-mute">
              This tab is coming in the next release.
            </p>
          </div>
        )}
      </AccountingShell>

      <TransactionForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
        onSaved={refresh}
        accounts={accounts}
        engagements={engagements}
        rates={rates}
        editing={editing}
      />
    </>
  );
};

const AccountingPage: React.FC = () => (
  <RoleGate allow={['accountant', 'admin', 'super_admin']}>
    <AccountingInner />
  </RoleGate>
);

export default AccountingPage;
