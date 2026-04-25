import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

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
      <div className="w-full max-w-md mx-auto px-4 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-brand-mute hover:text-brand-accent text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Site
        </Link>

        <div className="rounded-2xl border border-brand-hair bg-brand-paper p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 rounded-lg bg-brand-accent/10 text-brand-accent">
              <Lock size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-brand-ink">Admin Sign In</h1>
              <p className="text-brand-mute text-sm">Authorized personnel only</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-brand-ink-2 text-sm mb-1.5">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-brand-paper border border-brand-hair text-brand-ink placeholder:text-brand-mute focus:outline-none focus:border-brand-accent/30 transition-colors"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-brand-ink-2 text-sm mb-1.5">Password</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-brand-paper border border-brand-hair text-brand-ink placeholder:text-brand-mute focus:outline-none focus:border-brand-accent/30 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-brand-accent text-brand-ivory font-medium hover:bg-brand-accent-hover transition-colors disabled:opacity-60"
            >
              {submitting ? <Loader2 size={16} className="animate-spin" /> : null}
              {submitting ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className="text-brand-mute text-xs mt-6">
            Create the admin user in your Supabase dashboard under Authentication → Users.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
