import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

/**
 * POST /api/create-checkout-session
 *
 * Body: { invoice_code: string }
 * Returns: { url: string }   // Stripe Checkout Session URL
 *
 * Required env vars on Vercel (Settings → Environment Variables):
 *   STRIPE_SECRET_KEY            — sk_live_… or sk_test_…
 *   SUPABASE_URL                 — same as VITE_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY    — service role (server-only) key for
 *                                  read-only invoice lookup; do NOT
 *                                  expose this in the browser.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.VITE_SUPABASE_ANON_KEY;

  if (!stripeKey || !supabaseUrl || !supabaseKey) {
    res.status(500).json({
      error:
        'Server is missing STRIPE_SECRET_KEY / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars.',
    });
    return;
  }

  const body = (req.body ?? {}) as { invoice_code?: unknown };
  const invoiceCode = typeof body.invoice_code === 'string' ? body.invoice_code : null;
  if (!invoiceCode) {
    res.status(400).json({ error: 'invoice_code is required' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('id, invoice_code, client_name, client_email, description, amount, currency, status')
    .eq('invoice_code', invoiceCode)
    .maybeSingle();

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }
  if (!invoice) {
    res.status(404).json({ error: 'Invoice not found' });
    return;
  }
  if (!['sent', 'partial', 'overdue'].includes(invoice.status)) {
    res.status(400).json({ error: `Invoice is not payable (status=${invoice.status})` });
    return;
  }

  const stripe = new Stripe(stripeKey);

  const origin =
    (req.headers['origin'] as string | undefined) ??
    `https://${req.headers['host'] as string | undefined}`;

  const amountMinor = Math.round(Number(invoice.amount) * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: invoice.client_email ?? undefined,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: invoice.currency.toLowerCase(),
          unit_amount: amountMinor,
          product_data: {
            name: `Invoice ${invoice.invoice_code}`,
            description: invoice.description,
          },
        },
      },
    ],
    metadata: {
      invoice_id: invoice.id,
      invoice_code: invoice.invoice_code,
    },
    success_url: `${origin}/pay/${invoice.invoice_code}?status=success`,
    cancel_url: `${origin}/pay/${invoice.invoice_code}?status=cancelled`,
  });

  if (!session.url) {
    res.status(500).json({ error: 'Stripe did not return a checkout URL' });
    return;
  }

  res.status(200).json({ url: session.url });
}
