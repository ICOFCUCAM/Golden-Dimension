import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Check, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { PageHeader, Container, Section, TechnicalLabel } from '@/components/section-primitives';
import { Seo } from '@/components/Seo';

const offices = [
  { city: 'London',     country: 'United Kingdom', type: 'Headquarters',  timezone: 'GMT' },
  { city: 'New York',   country: 'United States',  type: 'Regional Office', timezone: 'EST' },
  { city: 'Dubai',      country: 'United Arab Emirates', type: 'Regional Office', timezone: 'GST' },
  { city: 'Singapore',  country: 'Singapore',      type: 'Asia Pacific',  timezone: 'SGT' },
];

// Editorial form input — sharp corners, hairline border, focus turns ink.
const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 bg-brand-paper border text-[15px] text-brand-ink placeholder:text-brand-mute focus:outline-none transition-colors ${
    hasError ? 'border-red-500/60 focus:border-red-600' : 'border-brand-hair-strong focus:border-brand-ink'
  }`;

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      });
      if (error) throw error;
      setSubmitted(true);
      toast.success("Message sent. We'll respond within one business day.");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      toast.error('Failed to send message. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Contact — discuss your next transformation programme"
        description="Tell us about the institutional outcome you're working toward. A partner from the relevant practice area will respond within one business day."
        path="/contact"
      />
      <PageHeader
        eyebrow="Get in Touch"
        index="C.01"
        title={<>Discuss your next <span className="font-editorial italic text-brand-accent">transformation</span> programme.</>}
        subtitle="Tell us about the institutional outcome you're working toward. We'll respond within one business day with a partner-led conversation, not a sales pitch."
      />

      {/* Form + contact ledger */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <TechnicalLabel index="01">Contact Form</TechnicalLabel>
              <h2 className="mt-7 font-display text-[26px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Send a message
              </h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-brand-ink-2 max-w-xl">
                Provide a brief description of the engagement you're considering.
                We'll route it to the partner most relevant to your sector.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 space-y-7">
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
                  <label className="label-technical text-brand-mute mb-2 block">Engagement details</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: '' }); }}
                    placeholder="Sector, the institutional outcome you're working toward, and any constraints we should know about."
                    rows={6}
                    className={`${inputClass(!!errors.message)} resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  )}
                </div>

                {submitted && (
                  <div className="flex items-start gap-3 px-4 py-3 border border-brand-accent bg-brand-accent-tint">
                    <Check size={16} className="text-brand-accent mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[14px] font-medium text-brand-ink">Message received.</div>
                      <div className="text-[13px] text-brand-ink-2 mt-0.5">We'll respond within one business day.</div>
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
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        Request Consultation
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact ledger */}
            <aside className="lg:col-span-5 lg:border-l lg:border-brand-hair lg:pl-12">
              <TechnicalLabel index="02">Direct Contact</TechnicalLabel>
              <h2 className="mt-7 font-display text-[26px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Reach the firm directly
              </h2>

              <dl className="mt-10 divide-y divide-brand-hair border-y border-brand-hair">
                <div className="grid grid-cols-[auto_1fr] gap-x-8 py-5 items-baseline">
                  <dt className="label-technical text-brand-mute flex items-center gap-2">
                    <Mail size={11} /> Email
                  </dt>
                  <dd>
                    <a
                      href="mailto:admin@golden-dimensions.org"
                      className="text-[14.5px] tracking-tight text-brand-ink hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent"
                    >
                      admin@golden-dimensions.org
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 py-5 items-baseline">
                  <dt className="label-technical text-brand-mute flex items-center gap-2">
                    <Phone size={11} /> Phone
                  </dt>
                  <dd>
                    <a
                      href="tel:+442012345678"
                      className="text-[14.5px] tracking-tight text-brand-ink hover:text-brand-accent transition-colors border-b border-transparent hover:border-brand-accent font-mono-tab"
                    >
                      +44 20 1234 5678
                    </a>
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 py-5 items-baseline">
                  <dt className="label-technical text-brand-mute flex items-center gap-2">
                    <Clock size={11} /> Hours
                  </dt>
                  <dd className="text-[14.5px] tracking-tight text-brand-ink">
                    Mon – Fri · 09:00 – 18:00 GMT
                  </dd>
                </div>
                <div className="grid grid-cols-[auto_1fr] gap-x-8 py-5 items-baseline">
                  <dt className="label-technical text-brand-mute flex items-center gap-2">
                    <MapPin size={11} /> HQ
                  </dt>
                  <dd className="text-[14.5px] tracking-tight text-brand-ink leading-snug">
                    Golden Dimensions Ltd<br />London, United Kingdom
                  </dd>
                </div>
              </dl>

              <p className="mt-8 text-[13px] leading-[1.6] text-brand-ink-2">
                Engagements are responded to by a partner from the practice
                area most relevant to your sector — not by a generic sales
                desk.
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Global offices */}
      <Section tone="ivory" divided>
        <Container>
          <TechnicalLabel index="03">Global Offices</TechnicalLabel>
          <h2 className="mt-7 font-display text-[26px] md:text-[34px] font-medium tracking-[-0.015em] text-brand-ink leading-tight max-w-2xl">
            Where the firm operates from
          </h2>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {offices.map((office, i) => (
              <div key={office.city} className="border-r border-b border-brand-hair p-7 bg-brand-paper">
                <div className="label-technical text-brand-accent mb-5 font-mono-tab">
                  O.{String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[22px] font-medium tracking-[-0.01em] text-brand-ink leading-tight">
                  {office.city}
                </h3>
                <p className="mt-1.5 text-[13.5px] text-brand-ink-2">{office.country}</p>
                <div className="mt-5 pt-4 border-t border-brand-hair grid grid-cols-2 gap-y-2.5">
                  <span className="label-technical text-brand-mute">Role</span>
                  <span className="text-[12.5px] text-brand-ink tracking-tight text-right">{office.type}</span>
                  <span className="label-technical text-brand-mute">Time zone</span>
                  <span className="text-[12.5px] text-brand-ink tracking-tight text-right font-mono-tab">{office.timezone}</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ContactPage;
