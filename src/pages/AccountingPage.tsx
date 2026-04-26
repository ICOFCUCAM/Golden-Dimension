import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, FileSpreadsheet, LogOut, Receipt, Wallet } from 'lucide-react';
import RoleGate from '@/components/RoleGate';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS } from '@/lib/roles';

const ModuleCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  caption: string;
  meta: string;
}> = ({ icon, title, caption, meta }) => (
  <div className="border border-brand-hair-strong bg-brand-paper p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-10 h-10 border border-brand-hair-strong bg-brand-ivory text-brand-ink-2 flex items-center justify-center">
        {icon}
      </div>
      <span className="label-technical text-brand-accent font-mono-tab">{meta}</span>
    </div>
    <h3 className="font-display text-[18px] md:text-[20px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
      {title}
    </h3>
    <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2">{caption}</p>
    <div className="mt-4 pt-4 border-t border-brand-hair label-technical text-brand-mute">
      Coming in next release
    </div>
  </div>
);

const AccountingInner: React.FC = () => {
  const { session, roles, signOut } = useAuth();

  return (
    <div className="bg-brand-ivory min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 mb-10 border-b border-brand-hair-strong">
          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 text-[13px] text-brand-ink-2 hover:text-brand-accent mb-4 transition-colors"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to site
            </Link>
            <div className="label-technical text-brand-mute mb-3">
              <span className="text-brand-accent">§ FIN.AC</span> · Accountant Workspace
            </div>
            <h1 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              Internal financial ledger
            </h1>
            <p className="text-brand-ink-2 text-[14px] mt-2">
              GBP base · UK GAAP chart of accounts · {session?.user.email} ·{' '}
              {roles.map((r) => ROLE_LABELS[r]).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>

        {/* Placeholder modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModuleCard
            icon={<Receipt size={18} />}
            meta="FIN.01"
            title="Transactions"
            caption="Record income and expense entries against the chart of accounts. Multi-currency with GBP base. Attach receipts and link to engagements."
          />
          <ModuleCard
            icon={<BookOpen size={18} />}
            meta="FIN.02"
            title="Chart of accounts"
            caption="UK GAAP-aligned professional services template. Browse account codes, see balances, and propose new accounts for admin approval."
          />
          <ModuleCard
            icon={<Wallet size={18} />}
            meta="FIN.03"
            title="Engagements"
            caption="Per-engagement profit and loss. Tag any transaction to a client engagement for project-level reporting."
          />
          <ModuleCard
            icon={<FileSpreadsheet size={18} />}
            meta="FIN.04"
            title="Reports & exports"
            caption="Trial balance, P&L, balance sheet. Export to CSV, PDF, and DOCX. Print-ready statements with firm letterhead."
          />
        </div>

        <div className="mt-10 border-t border-brand-hair-strong pt-6">
          <p className="label-technical text-brand-mute leading-relaxed normal-case tracking-normal max-w-2xl">
            This workspace is provisioned and role-gated. Transaction entry,
            chart of accounts, engagement linkages, and exports are scheduled
            for the next release.
          </p>
        </div>
      </div>
    </div>
  );
};

const AccountingPage: React.FC = () => (
  <RoleGate allow={['accountant', 'admin', 'super_admin']}>
    <AccountingInner />
  </RoleGate>
);

export default AccountingPage;
