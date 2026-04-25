import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader2, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const inputClass =
  'w-full px-4 py-3 bg-brand-paper border border-brand-hair-strong text-[15px] text-brand-ink placeholder:text-brand-mute focus:outline-none focus:border-brand-ink transition-colors';

const AdminLogin: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = await signIn(email.trim(), password);
    setSubmitting(false);
    if (err) setError(err);
  };

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
              <span className="text-brand-accent">§ ADMIN</span> · Authenticated
            </span>
            <Lock size={14} className="text-brand-mute" />
          </div>

          <h1 className="font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
            Admin sign in
          </h1>
          <p className="mt-2 text-[13.5px] text-brand-ink-2">
            Authorised personnel only.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label className="label-technical text-brand-mute mb-2 block">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="label-technical text-brand-mute mb-2 block">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-3 px-3 py-2.5 border border-red-500/40 bg-red-50 text-[13px] text-red-700">
                <AlertCircle size={13} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex items-center justify-center gap-2.5 w-full px-5 py-3 bg-brand-ink text-brand-ivory text-[14px] font-medium tracking-tight hover:bg-brand-accent transition-colors disabled:opacity-60"
            >
              {submitting ? <Loader2 size={14} className="animate-spin" /> : null}
              {submitting ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-7 pt-5 border-t border-brand-hair label-technical text-brand-mute leading-relaxed normal-case tracking-normal">
            Create the admin user in your Supabase dashboard under
            Authentication → Users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
