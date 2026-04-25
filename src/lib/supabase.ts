import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client.
 *
 * Both env vars must be set on Vercel (or in your local .env) for forms
 * (Contact, Transport, Newsletter) and the admin dashboard to work.
 *
 *   VITE_SUPABASE_URL       — your project URL from Supabase → Settings → Data API
 *   VITE_SUPABASE_ANON_KEY  — your anon (public) key
 *
 * If they're missing at build time the client is initialised with stub
 * values so the bundle still renders (rather than throwing on first load
 * and producing a blank page). All Supabase calls will then fail at
 * runtime with a clear error in the toast.
 */

const PLACEHOLDER_URL = 'https://placeholder.supabase.co';
const PLACEHOLDER_KEY = 'placeholder-anon-key';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string | undefined) || PLACEHOLDER_URL;
const supabaseKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) || PLACEHOLDER_KEY;

export const supabaseConfigured =
  supabaseUrl !== PLACEHOLDER_URL && supabaseKey !== PLACEHOLDER_KEY;

if (!supabaseConfigured && typeof window !== 'undefined') {
  // Loud, but non-fatal — keeps the site rendering.
  // eslint-disable-next-line no-console
  console.warn(
    '[Golden Dimensions] Supabase env vars are not set — VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. ' +
    'Forms and the admin dashboard will not work until these are configured on Vercel (or in .env locally).'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
