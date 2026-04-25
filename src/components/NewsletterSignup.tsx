import React, { useState } from 'react';
import { Send, Check, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

/**
 * Compact newsletter / brief signup. Inserts an email into the
 * `subscribers` table on Supabase. Designed to live in the footer
 * dark band — uses on-dark colours.
 *
 * Required Supabase table:
 *   create table public.subscribers (
 *     id uuid primary key default gen_random_uuid(),
 *     email text not null unique,
 *     subscribed_at timestamptz not null default now()
 *   );
 *   alter table public.subscribers enable row level security;
 *   create policy "anon insert subscribers"
 *     on public.subscribers for insert to anon with check (true);
 */
const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Invalid email address');
      return;
    }

    setState('submitting');
    try {
      const { error: dbError } = await supabase
        .from('subscribers')
        .insert({ email: email.trim().toLowerCase() });
      if (dbError) {
        // Already-subscribed (unique violation) is treated as success
        if (dbError.code === '23505') {
          setState('success');
          setEmail('');
          return;
        }
        throw dbError;
      }
      setState('success');
      setEmail('');
    } catch (err: any) {
      setState('error');
      setError(err?.message || 'Subscription failed');
    }
  };

  return (
    <div>
      <span className="label-technical text-brand-accent-soft mb-3 block">
        § FN.06 · Capability Brief
      </span>
      <p className="text-[13px] leading-[1.6] text-brand-on-dark-2 mb-4 max-w-sm">
        Quarterly brief from the practice — institutional-quality writing on
        what we're seeing across sectors. No marketing emails.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (error) setError(null); }}
          placeholder="you@organisation.com"
          aria-invalid={state === 'error'}
          disabled={state === 'submitting' || state === 'success'}
          className="flex-1 px-3 py-2.5 bg-transparent border border-white/20 text-[13px] text-brand-on-dark placeholder:text-brand-on-dark-2/60 focus:outline-none focus:border-brand-accent-soft transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={state === 'submitting' || state === 'success'}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brand-on-dark text-brand-ink text-[13px] font-medium tracking-tight hover:bg-brand-accent-soft transition-colors disabled:opacity-60"
        >
          {state === 'submitting' && <span className="w-3 h-3 border border-brand-ink/30 border-t-brand-ink rounded-full animate-spin" />}
          {state === 'success' ? <><Check size={13} /> Subscribed</> : state === 'submitting' ? 'Sending…' : <><Send size={13} /> Subscribe</>}
        </button>
      </form>

      {error && (
        <p className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-red-300">
          <AlertCircle size={11} /> {error}
        </p>
      )}
      {state === 'success' && (
        <p className="mt-2 text-[12px] text-brand-accent-soft">
          Thank you — you'll receive the next quarterly brief.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
