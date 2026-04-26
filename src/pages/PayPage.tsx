import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AlertCircle, ArrowLeft, Banknote, Check, CheckCircle, ChevronDown,
  CreditCard, FileText, Loader2, Mail, Receipt, Send,
} from 'lucide-react';
import { toast } from 'sonner';
import { Container, PageHeader, Section, TechnicalLabel } from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { supabase, supabaseConfigured } from '@/lib/supabase';
import {
  type Invoice,
  type PaymentMethod,
  type PaymentMethodsConfig,
  fetchInvoiceByCode,
  fetchPaymentMethodsConfig,
  PAYMENT_METHOD_LABELS,
} from '@/lib/payments';
import { formatMoney } from '@/lib/finance';

const PayPage: React.FC = () => {
  const { invoiceCode } = useParams<{ invoiceCode: string }>();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [config, setConfig] = useState<PaymentMethodsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>('bank_transfer');

  useEffect(() => {
    let active = true;
    (async () => {
      if (!invoiceCode) return;
      setLoading(true);
      const [inv, cfg] = await Promise.all([
        fetchInvoiceByCode(invoiceCode),
        fetchPaymentMethodsConfig(),
      ]);
      if (!active) return;
      setInvoice(inv);
      setConfig(cfg);
      setLoading(false);
    })();
    return () => { active = false; };
  }, [invoiceCode]);

  const enabledMethods = useMemo<PaymentMethod[]>(() => {
    if (!config) return ['bank_transfer'];
    const list: PaymentMethod[] = [];
    if (config.bank_transfer_enabled) list.push('bank_transfer');
    if (config.stripe_enabled && config.stripe_publishable_key) list.push('card');
    if (config.wise_enabled) list.push('wise');
    if (config.paypal_enabled) list.push('paypal');
    if (config.cheque_enabled) list.push('cheque');
    return list.length ? list : ['bank_transfer'];
  }, [config]);

  useEffect(() => {
    if (enabledMethods.length && !enabledMethods.includes(activeMethod)) {
      setActiveMethod(enabledMethods[0]);
    }
  }, [enabledMethods, activeMethod]);

  if (loading) {
    return (
      <div className="bg-brand-ivory min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  if (!supabaseConfigured) {
    return <NotFoundPanel reason="Payment system not configured. Set Supabase env vars on Vercel." />;
  }

  if (!invoice) {
    return <NotFoundPanel reason="No invoice found for this link. The link may have expired or been mistyped." />;
  }

  const isSettled = invoice.status === 'paid';
  const isVoid = invoice.status === 'void';
  const reference = invoice.invoice_code;

  return (
    <div className="bg-brand-ivory">
      <Seo
        title={`Pay invoice ${invoice.invoice_code} — Golden Dimensions Ltd`}
        description={`Settle invoice ${invoice.invoice_code} via bank transfer, card, Wise, PayPal, or cheque.`}
        path={`/pay/${invoice.invoice_code}`}
        noindex
      />

      <PageHeader
        eyebrow="Make Payment"
        index="PAY.01"
        title={
          <>
            Settle invoice{' '}
            <span className="font-editorial italic text-brand-accent">{invoice.invoice_code}</span>
          </>
        }
        subtitle="Choose your preferred method below. Bank transfer is the firm's default; card, Wise, PayPal, and cheque are also supported where enabled."
      />

      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            {/* Invoice summary */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 border border-brand-hair-strong bg-brand-paper p-6">
                <div className="flex items-baseline justify-between pb-3 mb-4 border-b border-brand-hair">
                  <TechnicalLabel index="01">Invoice</TechnicalLabel>
                  <StatusBadge status={invoice.status} />
                </div>

                <h2 className="font-display text-[22px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                  {invoice.client_name}
                </h2>
                <p className="mt-2 text-[13.5px] text-brand-ink-2 leading-snug">{invoice.description}</p>

                <dl className="mt-5 pt-4 border-t border-brand-hair grid grid-cols-2 gap-3 text-[12.5px]">
                  <Detail label="Issued" value={invoice.issued_date} />
                  <Detail label="Due" value={invoice.due_date ?? '—'} />
                  <Detail label="Currency" value={invoice.currency} />
                  <Detail
                    label="Reference"
                    value={<span className="font-mono-tab text-brand-ink">{reference}</span>}
                  />
                </dl>

                <div className="mt-5 pt-4 border-t-2 border-brand-ink">
                  <div className="label-technical text-brand-mute mb-1.5">Total due</div>
                  <div className="font-display font-medium text-[34px] tracking-[-0.02em] leading-none text-brand-ink font-mono-tab">
                    {formatMoney(Number(invoice.amount), invoice.currency)}
                  </div>
                  {invoice.currency !== 'GBP' && (
                    <div className="mt-1 label-technical text-brand-mute font-mono-tab">
                      ≈ {formatMoney(Number(invoice.amount_gbp), 'GBP')}
                    </div>
                  )}
                </div>

                {(isSettled || isVoid) && (
                  <div
                    className={`mt-6 px-4 py-3 border text-[13px] flex items-start gap-2 ${
                      isSettled
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
                        : 'border-red-300 bg-red-50 text-red-900'
                    }`}
                  >
                    {isSettled ? <CheckCircle size={14} className="mt-0.5" /> : <AlertCircle size={14} className="mt-0.5" />}
                    <span>
                      {isSettled
                        ? 'This invoice has been settled in full. Thank you.'
                        : 'This invoice has been voided and is no longer payable.'}
                    </span>
                  </div>
                )}
              </div>
            </aside>

            {/* Method selector + content */}
            <div className="lg:col-span-8">
              {!isSettled && !isVoid && (
                <>
                  <TechnicalLabel index="02">Payment method</TechnicalLabel>
                  <div className="mt-4 mb-8 flex flex-wrap gap-2">
                    {enabledMethods.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setActiveMethod(m)}
                        aria-pressed={activeMethod === m}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 text-[13px] font-medium tracking-tight border transition-colors ${
                          activeMethod === m
                            ? 'bg-brand-ink border-brand-ink text-brand-ivory'
                            : 'bg-brand-paper border-brand-hair-strong text-brand-ink-2 hover:border-brand-ink hover:text-brand-ink'
                        }`}
                      >
                        {iconForMethod(m)}
                        {PAYMENT_METHOD_LABELS[m]}
                      </button>
                    ))}
                  </div>

                  {activeMethod === 'bank_transfer' && (
                    <BankTransferPanel invoice={invoice} config={config} />
                  )}
                  {activeMethod === 'card' && (
                    <CardPanel invoice={invoice} config={config} />
                  )}
                  {activeMethod === 'wise' && (
                    <ManualPanel
                      invoice={invoice}
                      method="wise"
                      title="Pay via Wise"
                      instructions={config?.wise_instructions}
                    />
                  )}
                  {activeMethod === 'paypal' && (
                    <ManualPanel
                      invoice={invoice}
                      method="paypal"
                      title="Pay via PayPal"
                      instructions={config?.paypal_instructions}
                    />
                  )}
                  {activeMethod === 'cheque' && (
                    <ManualPanel
                      invoice={invoice}
                      method="cheque"
                      title="Pay by cheque"
                      instructions={config?.cheque_instructions}
                    />
                  )}
                </>
              )}

              {config?.payment_footer_note && (
                <p className="mt-10 pt-6 border-t border-brand-hair text-[12.5px] text-brand-mute leading-relaxed max-w-2xl">
                  {config.payment_footer_note}
                </p>
              )}

              <div className="mt-10">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                  Question about this invoice? Contact the firm
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

// ----- Sub-panels --------------------------------------------------------

const BankTransferPanel: React.FC<{
  invoice: Invoice;
  config: PaymentMethodsConfig | null;
}> = ({ invoice, config }) => {
  if (!config) return null;
  const fields: Array<[string, string | null]> = [
    ['Account name', config.bank_account_name],
    ['Bank', config.bank_name],
    ['Sort code', config.bank_sort_code],
    ['Account number', config.bank_account_number],
    ['IBAN', config.bank_iban],
    ['SWIFT / BIC', config.bank_swift_bic],
    ['Bank address', config.bank_address],
  ];
  const present = fields.filter(([, v]) => !!v && v.trim());
  return (
    <div>
      <header className="mb-5 flex items-center gap-2">
        <Banknote size={16} className="text-brand-accent" />
        <h3 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
          Pay via bank transfer
        </h3>
      </header>
      <p className="text-[14px] leading-[1.6] text-brand-ink-2 mb-6 max-w-2xl">
        Send {formatMoney(Number(invoice.amount), invoice.currency)} from your bank to the
        details below. Use the reference exactly as shown so your payment gets matched
        automatically.
      </p>

      {present.length === 0 ? (
        <div className="border border-amber-300 bg-amber-50 p-4 text-[13px] text-amber-900">
          Bank details are not yet configured. Contact the firm directly for transfer instructions.
        </div>
      ) : (
        <div className="border border-brand-hair-strong bg-brand-paper">
          <dl className="divide-y divide-brand-hair">
            {present.map(([label, value]) => (
              <div key={label} className="grid grid-cols-[200px_1fr] items-baseline px-5 py-3.5">
                <dt className="label-technical text-brand-mute">{label}</dt>
                <dd className="font-mono-tab text-[14px] text-brand-ink flex items-center gap-3">
                  <span className="break-all">{value}</span>
                  <CopyButton text={value!} />
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[200px_1fr] items-baseline px-5 py-3.5 bg-brand-stone">
              <dt className="label-technical text-brand-accent">Payment reference *</dt>
              <dd className="font-mono-tab text-[14px] text-brand-ink flex items-center gap-3">
                <span className="break-all">{invoice.invoice_code}</span>
                <CopyButton text={invoice.invoice_code} />
              </dd>
            </div>
            <div className="grid grid-cols-[200px_1fr] items-baseline px-5 py-3.5">
              <dt className="label-technical text-brand-mute">Amount</dt>
              <dd className="font-mono-tab text-[14px] text-brand-ink">
                {formatMoney(Number(invoice.amount), invoice.currency)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <div className="mt-8">
        <ClaimForm invoice={invoice} method="bank_transfer" />
      </div>
    </div>
  );
};

const CardPanel: React.FC<{
  invoice: Invoice;
  config: PaymentMethodsConfig | null;
}> = ({ invoice, config }) => {
  const [busy, setBusy] = useState(false);

  const start = async () => {
    setBusy(true);
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ invoice_code: invoice.invoice_code }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || 'Failed to start checkout');
      }
      const data = await res.json();
      if (!data.url) throw new Error('No checkout URL returned');
      window.location.href = data.url;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Could not start card checkout.';
      toast.error(msg);
      setBusy(false);
    }
  };

  return (
    <div>
      <header className="mb-5 flex items-center gap-2">
        <CreditCard size={16} className="text-brand-accent" />
        <h3 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
          Pay by card
        </h3>
      </header>
      <p className="text-[14px] leading-[1.6] text-brand-ink-2 mb-6 max-w-2xl">
        Card payments are processed securely by Stripe. We never see or store your card
        details. You'll be redirected to Stripe's hosted checkout, then returned here when
        the payment completes.
      </p>

      {!config?.stripe_enabled || !config.stripe_publishable_key ? (
        <div className="border border-amber-300 bg-amber-50 p-4 text-[13px] text-amber-900">
          Card payments are not currently enabled. Choose another method from the rail above.
        </div>
      ) : (
        <button
          type="button"
          onClick={start}
          disabled={busy}
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-ink text-brand-ivory text-[14px] font-medium tracking-tight hover:bg-brand-accent transition-colors disabled:opacity-60"
        >
          {busy ? <Loader2 size={14} className="animate-spin" /> : <CreditCard size={14} />}
          Pay {formatMoney(Number(invoice.amount), invoice.currency)} by card
        </button>
      )}
    </div>
  );
};

const ManualPanel: React.FC<{
  invoice: Invoice;
  method: PaymentMethod;
  title: string;
  instructions: string | null | undefined;
}> = ({ invoice, method, title, instructions }) => (
  <div>
    <header className="mb-5 flex items-center gap-2">
      <Receipt size={16} className="text-brand-accent" />
      <h3 className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
        {title}
      </h3>
    </header>
    {instructions ? (
      <div className="border border-brand-hair-strong bg-brand-paper p-5 text-[13.5px] leading-[1.65] text-brand-ink-2 whitespace-pre-wrap max-w-3xl">
        {instructions}
      </div>
    ) : (
      <div className="border border-amber-300 bg-amber-50 p-4 text-[13px] text-amber-900">
        Instructions for this method aren't configured yet. Contact the firm directly.
      </div>
    )}
    <p className="mt-5 text-[12.5px] text-brand-mute">
      Always quote reference{' '}
      <span className="font-mono-tab text-brand-ink">{invoice.invoice_code}</span> when
      sending payment.
    </p>
    <div className="mt-8">
      <ClaimForm invoice={invoice} method={method} />
    </div>
  </div>
);

// ----- Claim form (records that the client says they sent payment) ------

const ClaimForm: React.FC<{ invoice: Invoice; method: PaymentMethod }> = ({
  invoice,
  method,
}) => {
  const [open, setOpen] = useState(false);
  const [payerName, setPayerName] = useState('');
  const [payerRef, setPayerRef] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payerName.trim()) {
      toast.error('Please enter the name on the payment');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from('payments').insert({
      invoice_id: invoice.id,
      method,
      status: 'claimed',
      amount: invoice.amount,
      currency: invoice.currency,
      fx_rate: invoice.fx_rate,
      payer_name: payerName.trim(),
      payer_reference: payerRef.trim() || null,
      notes: notes.trim() || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setDone(true);
    toast.success('Thank you — the firm has been notified and will reconcile your payment shortly.');
  };

  if (done) {
    return (
      <div className="border border-emerald-300 bg-emerald-50 p-5 flex items-start gap-3">
        <CheckCircle size={16} className="text-emerald-700 mt-0.5 shrink-0" />
        <div className="text-[13.5px] leading-[1.6] text-emerald-900">
          We've logged your payment claim against{' '}
          <span className="font-mono-tab">{invoice.invoice_code}</span>. The firm will verify
          receipt and update the invoice status. You'll be notified by email if a follow-up
          is required.
        </div>
      </div>
    );
  }

  return (
    <div className="border border-brand-hair-strong">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-brand-paper hover:bg-brand-stone transition-colors"
      >
        <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-brand-ink">
          <Send size={13} /> I've sent this payment — log it
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform text-brand-mute ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <form onSubmit={submit} className="px-5 py-5 bg-brand-ivory border-t border-brand-hair grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Name on payment" required>
            <input
              type="text"
              required
              value={payerName}
              onChange={(e) => setPayerName(e.target.value)}
              className={inputCls}
              placeholder="The account holder / payer"
            />
          </Field>
          <Field label="Your reference (optional)">
            <input
              type="text"
              value={payerRef}
              onChange={(e) => setPayerRef(e.target.value)}
              className={inputCls}
              placeholder="Anything you put in the payment description"
            />
          </Field>
          <Field label="Notes (optional)" className="md:col-span-2">
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={inputCls}
              placeholder="Anything the firm should know — e.g. value-date, FX info"
            />
          </Field>
          <div className="md:col-span-2 flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-4 py-2.5 bg-brand-paper border border-brand-hair-strong text-brand-ink-2 text-[13px] font-medium hover:border-brand-ink hover:text-brand-ink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60"
            >
              {submitting && <Loader2 size={13} className="animate-spin" />}
              <Send size={13} /> Notify the firm
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

// ----- Small bits --------------------------------------------------------

const StatusBadge: React.FC<{ status: Invoice['status'] }> = ({ status }) => {
  const tones: Record<Invoice['status'], string> = {
    draft:    'border-brand-hair-strong bg-brand-stone text-brand-mute',
    sent:     'border-sky-300 bg-sky-50 text-sky-800',
    partial:  'border-amber-300 bg-amber-50 text-amber-800',
    paid:     'border-emerald-300 bg-emerald-50 text-emerald-800',
    void:     'border-red-300 bg-red-50 text-red-700',
    overdue:  'border-red-300 bg-red-50 text-red-800',
  };
  return (
    <span
      className={`inline-block px-2 py-0.5 text-[10.5px] font-mono-tab tracking-widest uppercase border ${tones[status]}`}
    >
      {status}
    </span>
  );
};

const Detail: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div>
    <dt className="label-technical text-brand-mute mb-0.5">{label}</dt>
    <dd className="text-brand-ink">{value}</dd>
  </div>
);

const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Copy failed');
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${text}`}
      className="inline-flex items-center gap-1 px-2 py-0.5 border border-brand-hair-strong bg-brand-ivory text-[11px] text-brand-mute hover:border-brand-ink hover:text-brand-ink transition-colors"
    >
      {copied ? <Check size={11} /> : null}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
};

const NotFoundPanel: React.FC<{ reason: string }> = ({ reason }) => (
  <div className="bg-brand-ivory min-h-screen pt-24 pb-16 flex items-start justify-center">
    <div className="w-full max-w-lg mx-auto px-6">
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
            <span className="text-brand-accent">§ PAY</span> · Invoice not found
          </span>
          <FileText size={14} className="text-brand-mute" />
        </div>
        <h1 className="font-display text-[24px] font-medium tracking-[-0.015em] text-brand-ink">
          We couldn't find this invoice.
        </h1>
        <p className="mt-3 text-[13.5px] text-brand-ink-2 leading-relaxed">{reason}</p>
        <div className="mt-7 pt-5 border-t border-brand-hair">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors"
          >
            <Mail size={13} /> Contact the firm
          </Link>
        </div>
      </div>
    </div>
  </div>
);

const Field: React.FC<{
  label: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ label, required, className = '', children }) => (
  <label className={`flex flex-col ${className}`}>
    <span className="label-technical text-brand-mute mb-1.5">
      {label}
      {required && <span className="text-brand-accent ml-1">*</span>}
    </span>
    {children}
  </label>
);

const inputCls =
  'w-full px-3 py-2.5 bg-brand-paper border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink transition-colors';

const iconForMethod = (m: PaymentMethod) => {
  const sz = 13;
  switch (m) {
    case 'bank_transfer': return <Banknote size={sz} />;
    case 'card':          return <CreditCard size={sz} />;
    default:              return <Receipt size={sz} />;
  }
};

export default PayPage;
