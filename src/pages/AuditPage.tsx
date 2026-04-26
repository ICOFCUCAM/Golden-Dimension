import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, FileSearch, History, LogOut, ScrollText } from 'lucide-react';
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
      Read-only access
    </div>
  </div>
);

const AuditInner: React.FC = () => {
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
              <span className="text-brand-accent">§ FIN.AU</span> · Auditor Workspace
            </div>
            <h1 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              Audit trail and review
            </h1>
            <p className="text-brand-ink-2 text-[14px] mt-2">
              Read-only access · {session?.user.email} ·{' '}
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
            icon={<ScrollText size={18} />}
            meta="AUD.01"
            title="Transaction ledger"
            caption="All financial transactions, posted and draft, with full attribution. Filter by period, account, currency, or engagement."
          />
          <ModuleCard
            icon={<History size={18} />}
            meta="AUD.02"
            title="Audit log"
            caption="Append-only history of every change to the ledger. Each row shows actor, timestamp, before/after values, and the linked transaction."
          />
          <ModuleCard
            icon={<Eye size={18} />}
            meta="AUD.03"
            title="Void requests"
            caption="Review pending and resolved void/edit proposals from accountants and the admin decisions on each."
          />
          <ModuleCard
            icon={<FileSearch size={18} />}
            meta="AUD.04"
            title="Statement exports"
            caption="Trial balance, P&L, balance sheet, and engagement-level reports for any date range. Export to PDF, DOCX, or CSV."
          />
        </div>

        <div className="mt-10 border-t border-brand-hair-strong pt-6">
          <p className="label-technical text-brand-mute leading-relaxed normal-case tracking-normal max-w-2xl">
            This workspace is provisioned and role-gated for read-only access.
            Ledger inspection, audit log filters, and statement exports are
            scheduled for the next release.
          </p>
        </div>
      </div>
    </div>
  );
};

const AuditPage: React.FC = () => (
  <RoleGate allow={['auditor', 'admin', 'super_admin']}>
    <AuditInner />
  </RoleGate>
);

export default AuditPage;
