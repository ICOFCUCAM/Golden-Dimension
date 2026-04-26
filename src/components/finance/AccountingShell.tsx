import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { ROLE_LABELS } from '@/lib/roles';
import {
  SUPPORTED_DISPLAY_CURRENCIES,
  type DisplayCurrency,
} from '@/lib/finance';

export interface AccountingShellProps {
  display: DisplayCurrency;
  onDisplayChange: (next: DisplayCurrency) => void;
  activeTab: string;
  onTabChange: (next: string) => void;
  tabs: { id: string; label: string; badge?: number }[];
  children: React.ReactNode;
  /** Eyebrow code shown above the page title — e.g. "FIN.AC". */
  sectionCode?: string;
  /** Workspace label shown in the eyebrow. */
  sectionLabel?: string;
  /** Page title under the eyebrow. */
  title?: string;
}

const AccountingShell: React.FC<AccountingShellProps> = ({
  display,
  onDisplayChange,
  activeTab,
  onTabChange,
  tabs,
  children,
  sectionCode = 'FIN.AC',
  sectionLabel = 'Accountant Workspace',
  title = 'Internal financial ledger',
}) => {
  const { session, roles, signOut } = useAuth();

  return (
    <div className="bg-brand-ivory min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-brand-hair-strong">
          <div>
            <Link
              to="/"
              className="group inline-flex items-center gap-1.5 text-[13px] text-brand-ink-2 hover:text-brand-accent mb-4 transition-colors"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to site
            </Link>
            <div className="label-technical text-brand-mute mb-3">
              <span className="text-brand-accent">§ {sectionCode}</span> · {sectionLabel}
            </div>
            <h1 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              {title}
            </h1>
            <p className="text-brand-ink-2 text-[13.5px] mt-2">
              GBP base · UK GAAP chart of accounts · {session?.user.email} ·{' '}
              {roles.map((r) => ROLE_LABELS[r]).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CurrencySwitch value={display} onChange={onDisplayChange} />
            <button
              onClick={signOut}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
            >
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-px bg-brand-hair-strong border border-brand-hair-strong mb-8 w-fit">
          {tabs.map((t) => {
            const active = t.id === activeTab;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onTabChange(t.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 text-[13px] font-medium tracking-tight transition-colors ${
                  active
                    ? 'bg-brand-ink text-brand-ivory'
                    : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
                }`}
              >
                {t.label}
                {t.badge !== undefined && t.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 bg-brand-accent text-brand-ivory text-[10px] font-mono-tab">
                    {t.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {children}
      </div>
    </div>
  );
};

const CurrencySwitch: React.FC<{
  value: DisplayCurrency;
  onChange: (next: DisplayCurrency) => void;
}> = ({ value, onChange }) => (
  <div className="inline-flex items-center gap-px bg-brand-hair-strong border border-brand-hair-strong">
    {SUPPORTED_DISPLAY_CURRENCIES.map((c) => {
      const active = c === value;
      return (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          aria-pressed={active}
          className={`px-3 py-2.5 text-[12px] font-mono-tab tracking-wide transition-colors ${
            active
              ? 'bg-brand-ink text-brand-ivory'
              : 'bg-brand-paper text-brand-ink-2 hover:bg-brand-stone'
          }`}
        >
          {c}
        </button>
      );
    })}
  </div>
);

export default AccountingShell;
