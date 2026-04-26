import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldAlert } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AdminLogin from '@/components/AdminLogin';
import { ROLE_HOME, ROLE_LABELS, hasAnyRole, type AppRole } from '@/lib/roles';

interface RoleGateProps {
  /** Roles that may access the wrapped content. */
  allow: AppRole[];
  /** Content to render once the user is signed in and authorised. */
  children: React.ReactNode;
}

/**
 * Wraps a page in three concentric checks:
 *   1. session must exist (otherwise show the login form)
 *   2. roles must have finished loading (otherwise spinner)
 *   3. session.roles ∩ allow must be non-empty (otherwise show 403 panel)
 */
const RoleGate: React.FC<RoleGateProps> = ({ allow, children }) => {
  const { session, loading, roles, rolesLoading, primaryRole, signOut } = useAuth();

  if (loading) {
    return (
      <div className="bg-brand-ivory min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) return <AdminLogin />;

  if (rolesLoading) {
    return (
      <div className="bg-brand-ivory min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!hasAnyRole(roles, allow)) {
    const home = primaryRole ? ROLE_HOME[primaryRole] : '/';
    return (
      <div className="bg-brand-ivory min-h-screen pt-24 pb-16 flex items-start justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-[13px] text-brand-ink-2 hover:text-brand-accent mb-8 transition-colors"
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to site
          </Link>

          <div className="border border-brand-hair-strong bg-brand-paper p-8">
            <div className="flex items-baseline justify-between pb-4 mb-6 border-b border-brand-hair-strong">
              <span className="label-technical text-brand-mute">
                <span className="text-brand-accent">§ ACCESS</span> · Forbidden
              </span>
              <ShieldAlert size={14} className="text-brand-mute" />
            </div>

            <h1 className="font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              You don't have access to this area.
            </h1>
            <p className="mt-3 text-[13.5px] text-brand-ink-2 leading-relaxed">
              This area is restricted to{' '}
              {allow.map((r, i) => (
                <span key={r}>
                  <strong className="text-brand-ink">{ROLE_LABELS[r]}</strong>
                  {i < allow.length - 2 ? ', ' : i === allow.length - 2 ? ' or ' : ''}
                </span>
              ))}{' '}
              accounts. Contact a Super Admin to request access.
            </p>

            <div className="mt-7 pt-5 border-t border-brand-hair flex flex-wrap gap-3">
              <Link
                to={home}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-tight hover:bg-brand-accent transition-colors"
              >
                <Lock size={13} /> Go to my dashboard
              </Link>
              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RoleGate;
