import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import RoleGate from '@/components/RoleGate';
import AccountingShell from '@/components/finance/AccountingShell';
import TransactionsTable from '@/components/finance/TransactionsTable';
import TransactionDetailPanel from '@/components/finance/TransactionDetailPanel';
import AuditLogTable from '@/components/finance/AuditLogTable';
import VoidRequestsList from '@/components/finance/VoidRequestsList';
import ReportsTab from '@/components/finance/ReportsTab';
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

type TabId = 'ledger' | 'audit_log' | 'voids' | 'reports';

const AuditInner: React.FC = () => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState<TabId>('ledger');
  const [display, setDisplay] = useState<DisplayCurrency>('GBP');
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({ GBP: 1 });
  const [loading, setLoading] = useState(true);
  const [inspecting, setInspecting] = useState<FinancialTransaction | null>(null);

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

  return (
    <>
      <AccountingShell
        sectionCode="FIN.AU"
        sectionLabel="Auditor Workspace"
        title="Audit trail and review"
        display={display}
        onDisplayChange={setDisplay}
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t as TabId)}
        tabs={[
          { id: 'ledger', label: 'Ledger' },
          { id: 'audit_log', label: 'Audit log' },
          { id: 'voids', label: 'Void requests' },
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
        ) : activeTab === 'ledger' ? (
          <TransactionsTable
            transactions={transactions}
            accounts={accounts}
            engagements={engagements}
            rates={rates}
            display={display}
            onRowClick={(tx) => setInspecting(tx)}
          />
        ) : activeTab === 'audit_log' ? (
          <AuditLogTable />
        ) : activeTab === 'voids' ? (
          <VoidRequestsList
            canDecide={false}
            transactions={transactions}
            accounts={accounts}
            rates={rates}
            display={display}
          />
        ) : (
          <ReportsTab
            transactions={transactions}
            accounts={accounts}
            engagements={engagements}
            rates={rates}
            display={display}
          />
        )}
      </AccountingShell>

      <TransactionDetailPanel
        open={!!inspecting}
        onClose={() => setInspecting(null)}
        onChanged={refresh}
        transaction={inspecting}
        account={inspecting ? accountById[inspecting.account_id] ?? null : null}
        engagement={
          inspecting?.engagement_id ? engagementById[inspecting.engagement_id] ?? null : null
        }
        rates={rates}
        display={display}
        canEdit={false}
        onEdit={() => undefined}
      />
    </>
  );
};

const AuditPage: React.FC = () => (
  <RoleGate allow={['auditor', 'admin', 'super_admin']}>
    <AuditInner />
  </RoleGate>
);

export default AuditPage;
