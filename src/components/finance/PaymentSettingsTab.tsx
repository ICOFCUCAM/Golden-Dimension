import React, { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { fetchPaymentMethodsConfig, type PaymentMethodsConfig } from '@/lib/payments';

const PaymentSettingsTab: React.FC = () => {
  const [config, setConfig] = useState<PaymentMethodsConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    void (async () => {
      const c = await fetchPaymentMethodsConfig();
      setConfig(
        c ?? {
          id: 1,
          bank_account_name: null, bank_account_number: null, bank_sort_code: null,
          bank_iban: null, bank_swift_bic: null, bank_name: null, bank_address: null,
          wise_instructions: null, paypal_instructions: null, cheque_instructions: null,
          stripe_publishable_key: null, stripe_enabled: false,
          bank_transfer_enabled: true, wise_enabled: false, paypal_enabled: false, cheque_enabled: false,
          payment_footer_note: null,
          updated_at: new Date().toISOString(),
        },
      );
      setLoading(false);
    })();
  }, []);

  if (loading || !config) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-6 h-6 border-2 border-brand-accent/30 border-t-brand-accent rounded-full animate-spin" />
      </div>
    );
  }

  const set = <K extends keyof PaymentMethodsConfig>(k: K, v: PaymentMethodsConfig[K]) =>
    setConfig((c) => (c ? { ...c, [k]: v } : c));

  const save = async () => {
    setSaving(true);
    const payload = { ...config, id: 1, updated_at: new Date().toISOString() };
    const { error } = await supabase
      .from('payment_methods_config')
      .upsert(payload, { onConflict: 'id' });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Payment settings saved');
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Method enable flags */}
      <Card title="Methods enabled on the public payment page" eyebrow="01">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Toggle label="Bank transfer" value={config.bank_transfer_enabled}
                  onChange={(v) => set('bank_transfer_enabled', v)} />
          <Toggle label="Card (Stripe)" value={config.stripe_enabled}
                  onChange={(v) => set('stripe_enabled', v)} />
          <Toggle label="Wise" value={config.wise_enabled}
                  onChange={(v) => set('wise_enabled', v)} />
          <Toggle label="PayPal" value={config.paypal_enabled}
                  onChange={(v) => set('paypal_enabled', v)} />
          <Toggle label="Cheque" value={config.cheque_enabled}
                  onChange={(v) => set('cheque_enabled', v)} />
        </div>
      </Card>

      {/* Bank details */}
      <Card title="Bank transfer details" eyebrow="02"
            help="Shown on the public payment page when bank transfer is enabled.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Account name" value={config.bank_account_name}
                 onChange={(v) => set('bank_account_name', v)} />
          <Input label="Bank name" value={config.bank_name}
                 onChange={(v) => set('bank_name', v)} />
          <Input label="Sort code" value={config.bank_sort_code}
                 onChange={(v) => set('bank_sort_code', v)} placeholder="20-00-00" />
          <Input label="Account number" value={config.bank_account_number}
                 onChange={(v) => set('bank_account_number', v)} placeholder="12345678" />
          <Input label="IBAN" value={config.bank_iban}
                 onChange={(v) => set('bank_iban', v)} placeholder="GB29 NWBK 6016 1331 9268 19" />
          <Input label="SWIFT / BIC" value={config.bank_swift_bic}
                 onChange={(v) => set('bank_swift_bic', v)} placeholder="NWBKGB2L" />
          <Textarea label="Bank address" value={config.bank_address}
                    onChange={(v) => set('bank_address', v)} className="md:col-span-2" />
        </div>
      </Card>

      {/* Stripe */}
      <Card title="Stripe (card payments)" eyebrow="03"
            help="Set the secret key + webhook secret on Vercel as STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET — never paste secrets here.">
        <Input label="Publishable key (pk_…)" value={config.stripe_publishable_key}
               onChange={(v) => set('stripe_publishable_key', v)}
               placeholder="pk_live_…  or  pk_test_…" />
      </Card>

      {/* Manual instructions */}
      <Card title="Manual method instructions" eyebrow="04"
            help="Free-text shown to clients on the public payment page. Plain text only.">
        <div className="grid grid-cols-1 gap-4">
          <Textarea label="Wise instructions" value={config.wise_instructions}
                    onChange={(v) => set('wise_instructions', v)} rows={4} />
          <Textarea label="PayPal instructions" value={config.paypal_instructions}
                    onChange={(v) => set('paypal_instructions', v)} rows={4} />
          <Textarea label="Cheque instructions" value={config.cheque_instructions}
                    onChange={(v) => set('cheque_instructions', v)} rows={4} />
          <Textarea label="Footer note (shown under all methods)"
                    value={config.payment_footer_note}
                    onChange={(v) => set('payment_footer_note', v)} rows={2} />
        </div>
      </Card>

      <div className="flex items-center justify-end gap-2 pt-4 border-t border-brand-hair">
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium hover:bg-brand-accent transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
          Save settings
        </button>
      </div>
    </div>
  );
};

// ----- Atoms -------------------------------------------------------------

const Card: React.FC<{
  title: string;
  eyebrow: string;
  help?: string;
  children: React.ReactNode;
}> = ({ title, eyebrow, help, children }) => (
  <section className="border border-brand-hair-strong bg-brand-paper p-6">
    <header className="mb-5 pb-4 border-b border-brand-hair flex items-baseline justify-between">
      <h3 className="font-display text-[16px] font-medium tracking-[-0.01em] text-brand-ink">
        {title}
      </h3>
      <span className="label-technical text-brand-accent font-mono-tab">CFG.{eyebrow}</span>
    </header>
    {help && <p className="mb-4 text-[12.5px] text-brand-mute leading-relaxed">{help}</p>}
    {children}
  </section>
);

const Toggle: React.FC<{
  label: string;
  value: boolean;
  onChange: (next: boolean) => void;
}> = ({ label, value, onChange }) => (
  <label className="flex items-center justify-between border border-brand-hair-strong bg-brand-ivory px-4 py-3 cursor-pointer">
    <span className="text-[13.5px] text-brand-ink">{label}</span>
    <input
      type="checkbox"
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className="accent-brand-ink"
    />
  </label>
);

const Input: React.FC<{
  label: string;
  value: string | null;
  onChange: (next: string | null) => void;
  placeholder?: string;
}> = ({ label, value, onChange, placeholder }) => (
  <label className="flex flex-col">
    <span className="label-technical text-brand-mute mb-1.5">{label}</span>
    <input
      type="text"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      placeholder={placeholder}
      className="w-full px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink transition-colors"
    />
  </label>
);

const Textarea: React.FC<{
  label: string;
  value: string | null;
  onChange: (next: string | null) => void;
  rows?: number;
  className?: string;
}> = ({ label, value, onChange, rows = 3, className = '' }) => (
  <label className={`flex flex-col ${className}`}>
    <span className="label-technical text-brand-mute mb-1.5">{label}</span>
    <textarea
      rows={rows}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value || null)}
      className="w-full px-3 py-2.5 bg-brand-ivory border border-brand-hair-strong text-[13.5px] text-brand-ink focus:outline-none focus:border-brand-ink transition-colors"
    />
  </label>
);

export default PaymentSettingsTab;
