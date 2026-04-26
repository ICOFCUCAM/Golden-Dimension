import React, { useState } from 'react';
import { Mail, Phone, MapPin as MapPinIcon, Clock } from 'lucide-react';
import { PageHeader, Container, Section, TechnicalLabel } from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { EngagementIntakeForm } from '@/components/EngagementIntakeForm';
import { WorldMap, type MapPin } from '@/components/diagrams';

const offices = [
  { city: 'London',     country: 'United Kingdom',         type: 'Headquarters',    timezone: 'GMT', coords: [-0.13,  51.51] as [number, number] },
  { city: 'New York',   country: 'United States',          type: 'Regional Office', timezone: 'EST', coords: [-74.01, 40.71] as [number, number] },
  { city: 'Dubai',      country: 'United Arab Emirates',   type: 'Regional Office', timezone: 'GST', coords: [55.27,  25.20] as [number, number] },
  { city: 'Singapore',  country: 'Singapore',              type: 'Asia Pacific',    timezone: 'SGT', coords: [103.82,  1.35] as [number, number] },
];

const officePins: MapPin[] = offices.map((o) => ({
  id: o.city.toLowerCase().replace(/\s+/g, '-'),
  label: `${o.city} · ${o.timezone}`,
  coords: o.coords,
}));

const ContactPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Contact — discuss your next transformation programme"
        description="Tell us about the institutional outcome you're working toward. A partner from the relevant practice area will respond within one business day."
        path="/contact"
      />
      <PageHeader
        eyebrow="Engagement Intake"
        index="C.01"
        title={<>Discuss your next <span className="font-editorial italic text-brand-accent">transformation</span> programme.</>}
        subtitle="Four short steps. We use them to route your enquiry directly to the partner accountable for your sector — initial conversations are partner-led, not gated by a sales desk."
      />

      {/* Intake form + contact ledger */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Multi-step intake */}
            <div className="lg:col-span-7">
              <TechnicalLabel index="01">Engagement Intake</TechnicalLabel>
              <h2 className="mt-7 font-display text-[26px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Start the intake
              </h2>
              <p className="mt-4 text-[15px] leading-[1.6] text-brand-ink-2 max-w-xl">
                Sector → Capability → Timeline → Contact. Takes about 90 seconds.
              </p>

              <div className="mt-10 bg-brand-paper border border-brand-hair-strong p-7 md:p-9">
                <EngagementIntakeForm />
              </div>
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
                    <MapPinIcon size={11} /> HQ
                  </dt>
                  <dd className="text-[14.5px] tracking-tight text-brand-ink leading-snug">
                    Golden Dimensions Ltd<br />London, United Kingdom
                  </dd>
                </div>
              </dl>

              <p className="mt-8 text-[13px] leading-[1.6] text-brand-ink-2">
                Engagements are routed by sector to the partner accountable
                for that practice. Initial conversations are partner-led, not
                gated by a sales desk.
              </p>

              <div className="mt-7 p-5 border-l-2 border-brand-accent bg-brand-stone">
                <p className="font-editorial italic text-[14.5px] leading-[1.5] text-brand-ink">
                  Prefer email? Write directly to{' '}
                  <a href="mailto:admin@golden-dimensions.org" className="text-brand-accent hover:underline">
                    admin@golden-dimensions.org
                  </a>{' '}
                  with a one-line description of the engagement. We'll route
                  it the same way the intake form does.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Global offices — map + ledger */}
      <Section tone="ivory" divided>
        <Container>
          <TechnicalLabel index="03">Global Offices</TechnicalLabel>
          <h2 className="mt-7 font-display text-[26px] md:text-[34px] font-medium tracking-[-0.015em] text-brand-ink leading-tight max-w-2xl">
            Where the firm operates from
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.6] text-brand-ink-2">
            Four operating offices today. Engagements may be staffed from any combination depending on
            sector, time zone, and language requirements.
          </p>

          {/* Map */}
          <div className="mt-12 bg-brand-paper border border-brand-hair-strong p-6 md:p-10">
            <WorldMap tone="light" pins={officePins} scale={170} maxWidthClass="max-w-3xl" />
          </div>

          {/* Office ledger */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
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
