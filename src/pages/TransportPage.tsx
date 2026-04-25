import React, { useState } from 'react';
import { Plane, Ship, Truck, Package, Check, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  SectionHeader,
} from '@/components/section-primitives';

const transportServices = [
  {
    id: 'air',
    icon: <Plane size={20} />,
    title: 'Air Freight',
    desc: 'Time-critical air cargo across major international hubs — for high-value, perishable, or schedule-sensitive shipments.',
    features: ['Express delivery options', 'Temperature-controlled cargo', 'Real-time tracking', 'Customs clearance support'],
  },
  {
    id: 'sea',
    icon: <Ship size={20} />,
    title: 'Maritime Cargo',
    desc: 'Ocean freight for bulk and containerised cargo across all major global ports — full and less-than-container loads.',
    features: ['Full container load (FCL)', 'Less than container load (LCL)', 'Port-to-port service', 'Cargo insurance'],
  },
  {
    id: 'land',
    icon: <Truck size={20} />,
    title: 'Ground Transportation',
    desc: 'Road freight, cross-border haulage, and last-mile delivery across major continental routes.',
    features: ['Full & partial truckload', 'Last-mile delivery', 'Cross-border transport', 'Fleet management'],
  },
  {
    id: 'project',
    icon: <Package size={20} />,
    title: 'Project & Heavy Cargo',
    desc: 'Specialised logistics for oversized, heavy, or project cargo requiring permits, escorts, or specialised equipment.',
    features: ['Project cargo management', 'Oversized load handling', 'Route planning & permits', 'Specialised equipment'],
  },
];

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 bg-brand-paper border text-[15px] text-brand-ink placeholder:text-brand-mute focus:outline-none transition-colors ${
    hasError ? 'border-red-500/60 focus:border-red-600' : 'border-brand-hair-strong focus:border-brand-ink'
  }`;

const TransportPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = 'Invalid email address';
    if (!formData.details.trim()) e.details = 'Shipment details are required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('shipment_requests').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        details: formData.details.trim(),
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success('Shipment request submitted. Our logistics team will respond shortly.');
      setFormData({ name: '', email: '', details: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast.error('Failed to submit request. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-ivory">
      <PageHeader
        eyebrow="Transport & Logistics"
        index="T.01"
        title={<>End-to-end <span className="font-editorial italic text-brand-accent">logistics</span> across air, sea, and land.</>}
        subtitle="Multidisciplinary freight, mobility, and supply-chain capability for institutional clients moving cargo across regulated jurisdictions."
      />

      {/* Logistics services — editorial rule grid */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Logistics Services"
            index="02"
            title={
              <>
                Four delivery modes,{' '}
                <span className="font-editorial italic text-brand-accent">one logistics practice</span>.
              </>
            }
            intro="Each mode is operated by the same logistics team — so multimodal shipments handed across air, sea, and land remain accountable to a single delivery lead."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
            {transportServices.map((s, idx) => (
              <article key={s.id} className="border-r border-b border-brand-hair p-8 md:p-10 bg-brand-paper">
                <div className="flex items-baseline justify-between mb-6">
                  <span className="label-technical text-brand-accent font-mono-tab">
                    L.{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="text-brand-mute">{s.icon}</span>
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-brand-ink-2">
                  {s.desc}
                </p>

                <ul className="mt-6 pt-5 border-t border-brand-hair space-y-2.5">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-baseline gap-3 text-[13.5px] text-brand-ink">
                      <Check size={12} className="text-brand-accent shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Shipment request form */}
      <Section tone="ivory" divided>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <aside className="lg:col-span-4">
              <TechnicalLabel index="03">Shipment Request</TechnicalLabel>
              <h2 className="mt-7 font-display text-[26px] md:text-[34px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Submit shipment details
              </h2>
              <p className="mt-5 text-[15px] leading-[1.65] text-brand-ink-2">
                Provide origin, destination, cargo type, weight, and timeline.
                Our logistics team will respond with a tailored quotation and
                routing recommendation within one business day.
              </p>

              <ul className="mt-8 space-y-3 text-[13.5px] text-brand-ink-2">
                {[
                  'Multimodal — air, sea, ground, project',
                  'Customs and regulatory support included',
                  'Cargo insurance available',
                  'Real-time tracking after dispatch',
                ].map((item) => (
                  <li key={item} className="flex items-baseline gap-3">
                    <span className="block w-1 h-1 bg-brand-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="lg:col-span-8">
              <form onSubmit={handleSubmit} className="space-y-7 bg-brand-paper border border-brand-hair-strong p-8 md:p-10">
                <div>
                  <label className="label-technical text-brand-mute mb-2 block">Full name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: '' }); }}
                    placeholder="Your name"
                    className={inputClass(!!errors.name)}
                  />
                  {errors.name && (
                    <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600">
                      <AlertCircle size={12} /> {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label-technical text-brand-mute mb-2 block">Email address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: '' }); }}
                    placeholder="you@organisation.com"
                    className={inputClass(!!errors.email)}
                  />
                  {errors.email && (
                    <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="label-technical text-brand-mute mb-2 block">Shipment details</label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => { setFormData({ ...formData, details: e.target.value }); if (errors.details) setErrors({ ...errors, details: '' }); }}
                    placeholder="Origin · destination · cargo type · weight · timeline · any special handling requirements."
                    rows={7}
                    className={`${inputClass(!!errors.details)} resize-none`}
                  />
                  {errors.details && (
                    <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600">
                      <AlertCircle size={12} /> {errors.details}
                    </p>
                  )}
                </div>

                {submitted && (
                  <div className="flex items-start gap-3 px-4 py-3 border border-brand-accent bg-brand-accent-tint">
                    <Check size={16} className="text-brand-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[14px] font-medium text-brand-ink">Request received.</div>
                      <div className="text-[13px] text-brand-ink-2 mt-0.5">Our logistics team will respond within one business day.</div>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-brand-ink text-brand-ivory text-[14px] font-medium tracking-tight hover:bg-brand-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border border-brand-ivory/30 border-t-brand-ivory rounded-full animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Submit Shipment Request
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default TransportPage;
