import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

/**
 * POST /api/stripe-webhook
 *
 * Stripe → Vercel webhook endpoint. Configure in the Stripe dashboard
 * (Developers → Webhooks → Add endpoint) to send `checkout.session.completed`
 * events to https://<your-domain>/api/stripe-webhook.
 *
 * On a successful checkout, this handler creates a payments row with
 * status='received' linked back to the invoice via the metadata.invoice_id
 * we set in /api/create-checkout-session. The recalc_invoice_status()
 * trigger then auto-flips the invoice to 'paid'.
 *
 * Required env vars on Vercel:
 *   STRIPE_SECRET_KEY
 *   STRIPE_WEBHOOK_SECRET        — whsec_… from the Stripe webhook config
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

// Disable Vercel's automatic body-parsing — Stripe needs the raw body
// to verify the signature.
export const config = {
  api: {
    bodyParser: false,
  },
};

const readRawBody = (req: VercelRequest): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const supabaseUrl = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!stripeKey || !webhookSecret || !supabaseUrl || !supabaseKey) {
    res.status(500).json({
      error:
        'Server is missing STRIPE_SECRET_KEY / STRIPE_WEBHOOK_SECRET / SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars.',
    });
    return;
  }

  const stripe = new Stripe(stripeKey);
  const sig = req.headers['stripe-signature'];
  if (typeof sig !== 'string') {
    res.status(400).json({ error: 'Missing stripe-signature header' });
    return;
  }

  let event: Stripe.Event;
  try {
    const raw = await readRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, webhookSecret);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Invalid webhook signature';
    res.status(400).json({ error: msg });
    return;
  }

  if (event.type !== 'checkout.session.completed') {
    res.status(200).json({ ignored: event.type });
    return;
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const invoiceId = session.metadata?.invoice_id;
  if (!invoiceId) {
    res.status(200).json({ ignored: 'no invoice_id in metadata' });
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  // Idempotency: skip if we already recorded a payment for this Stripe session.
  const existing = await supabase
    .from('payments')
    .select('id')
    .eq('external_reference', session.id)
    .maybeSingle();

  if (existing.data) {
    res.status(200).json({ duplicate: true });
    return;
  }

  const amountMajor = (session.amount_total ?? 0) / 100;
  const currency = (session.currency ?? 'gbp').toUpperCase();

  const { error } = await supabase.from('payments').insert({
    invoice_id: invoiceId,
    method: 'card',
    status: 'received',
    amount: amountMajor,
    currency,
    fx_rate: 1.0, // Stripe charges in the invoice currency, so no FX here.
    payer_name: session.customer_details?.name ?? null,
    external_reference: session.id,
    notes: 'Auto-recorded by Stripe webhook',
    received_at: new Date().toISOString(),
  });

  if (error) {
    res.status(500).json({ error: error.message });
    return;
  }

  // The recalc_invoice_status() trigger flips the invoice to 'paid' for us.
  res.status(200).json({ ok: true });
}
