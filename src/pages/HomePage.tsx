import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  TechnicalLabel,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
  Container,
  Section,
  DiagramFrame,
  Metric,
} from '@/components/section-primitives';
import { CapabilityArchitecture, WorldMap } from '@/components/diagrams';
import { Seo } from '@/components/Seo';
import RevealOnScroll from '@/components/RevealOnScroll';
import { pillars, industries, methodology, capabilityModel } from '@/data/servicesPage';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

// -----------------------------------------------------------------------------
// CountMetric — count-up version of <Metric/> for the credibility band.
// -----------------------------------------------------------------------------
const CountMetric: React.FC<{
  value: number;
  suffix: string;
  label: string;
}> = ({ value, suffix, label }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const count = useCountUp(value, 1600, isVisible);
  return (
    <div ref={ref}>
      <div className="font-display text-[40px] md:text-[56px] font-semibold leading-none tracking-[-0.03em] text-brand-ink">
        {count}
        <span className="text-brand-accent">{suffix}</span>
      </div>
      <div className="mt-3 label-technical text-brand-mute">{label}</div>
    </div>
  );
};

const engagementModels = [
  {
    name: 'Advisory',
    appliesWhen: 'Framing the case',
    scope: 'Discrete advisory mandate',
    duration: '4 – 12 weeks',
    description: 'Short-form expert engagements that frame strategy, decisions, and business cases.',
  },
  {
    name: 'Programme Delivery',
    appliesWhen: 'Executing the programme',
    scope: 'Full multidisciplinary delivery',
    duration: '12 – 36 months',
    description: 'Multidisciplinary teams executing major transformations end to end.',
  },
  {
    name: 'Managed Services',
    appliesWhen: 'Running the system',
    scope: 'Operational ownership',
    duration: 'Ongoing — multi-year',
    description: 'Long-term operation of systems, networks, and back-office functions.',
  },
  {
    name: 'Capability Transfer',
    appliesWhen: 'Handing over to client teams',
    scope: 'Embedded knowledge transfer',
    duration: '6 – 18 months',
    description: 'Embedded teams that transfer skills and operating models to client organisations.',
  },
];

const technologyCapabilities = [
  { id: 'soft', name: 'Software & Platforms',  description: 'Custom software, integrations, and enterprise web platforms engineered for production scale.' },
  { id: 'net',  name: 'Networks & Telecom',    description: 'Fixed, mobile, and enterprise network systems with secure end-to-end delivery.' },
  { id: 'data', name: 'Data & Analytics',      description: 'Decision-support data systems, reporting, and analytics for institutional operations.' },
  { id: 'dx',   name: 'Digital Experience',    description: 'UX, product design, and brand systems engineered for consistency at scale.' },
];

// =============================================================================
// HomePage
// =============================================================================
const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Multidisciplinary Consulting & Engineering"
        description="Integrated consulting and engineering capabilities for institutions, enterprises, and governments worldwide — multidisciplinary delivery across finance, infrastructure, healthcare, education, and digital systems since 2003."
        path="/"
      />
      {/* ============================================================
           § 01 — Hero
         ============================================================ */}
      <section className="relative bg-brand-ivory pt-[140px] md:pt-[160px] pb-20 md:pb-28 border-b border-brand-hair">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <RevealOnScroll delayMs={0}>
                <TechnicalLabel index="01">Multidisciplinary Consulting & Engineering</TechnicalLabel>
              </RevealOnScroll>

              <RevealOnScroll delayMs={80} as="h1">
                <span className="block mt-8 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-medium leading-[1.02] tracking-[-0.015em] text-brand-ink">
                  Integrated{' '}
                  <span className="font-editorial italic text-brand-accent">capability</span>{' '}
                  for{' '}
                  <span className="font-editorial italic text-brand-accent">institutions</span>,
                  enterprises, and{' '}
                  <span className="font-editorial italic text-brand-accent">governments</span>{' '}
                  worldwide.
                </span>
              </RevealOnScroll>

              <RevealOnScroll delayMs={180}>
                <p className="mt-8 max-w-2xl text-[17px] md:text-[19px] leading-[1.55] text-brand-ink-2">
                  One firm. Strategy, engineering, technology, and human-capital
                  expertise delivered as a single accountable practice — across
                  finance, infrastructure, healthcare, education, and digital
                  systems, in over fifty countries since 2003.
                </p>
              </RevealOnScroll>

              <RevealOnScroll delayMs={260}>
                <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
                  <PrimaryCta to="/contact#request-consultation">Request Consultation</PrimaryCta>
                  <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
                  <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delayMs={340}>
                {/* Micro credibility rail — the four institutional disciplines
                    the firm operates across, immediately under hero CTAs. */}
                <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-2xl border-t border-brand-hair pt-6">
                  {['Strategy', 'Engineering', 'Technology', 'Operations'].map((disc, idx) => (
                    <div key={disc} className="flex items-baseline gap-3">
                      <span className="font-mono-tab text-[10px] tracking-widest text-brand-accent">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] tracking-tight text-brand-ink">
                        {disc}
                      </span>
                    </div>
                  ))}
                </div>
              </RevealOnScroll>

              <RevealOnScroll delayMs={400}>
                {/* Institutional metadata strip */}
                <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 max-w-2xl">
                  {[
                    'Established 2003',
                    'Public + private sector delivery',
                    'Global multidisciplinary practice',
                  ].map((item, idx, arr) => (
                    <React.Fragment key={item}>
                      <span className="label-technical text-brand-mute">{item}</span>
                      {idx < arr.length - 1 && (
                        <span className="text-brand-hair-strong" aria-hidden>·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </RevealOnScroll>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              {/* Editorial hero visual — architectural infrastructure photo,
                  desaturated to match the editorial palette, with a thin
                  technical annotation overlay in the corner. Replaces the
                  earlier SVG schematic. */}
              <figure className="relative">
                <div className="relative overflow-hidden bg-brand-stone aspect-[4/5]">
                  <img
                    src="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1200&q=80"
                    alt="Modern architectural infrastructure — a vertical view of a steel-and-glass facade representing the institutional engineering work the firm delivers."
                    className="w-full h-full object-cover grayscale contrast-[1.05]"
                    loading="eager"
                  />
                  {/* Corner ticks (Palantir-coded) */}
                  <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-brand-accent" aria-hidden />
                  <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-brand-accent" aria-hidden />
                  <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-brand-accent" aria-hidden />
                  <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-brand-accent" aria-hidden />

                  {/* Technical annotation top-left */}
                  <div className="absolute top-3 left-4 right-4 flex items-baseline justify-between">
                    <span className="label-technical text-brand-on-dark/90">
                      <span className="text-brand-accent-soft">§</span> HERO / 01
                    </span>
                    <span className="label-technical text-brand-on-dark/70 font-mono-tab">
                      {new Date().getFullYear()}
                    </span>
                  </div>

                  {/* Caption bottom-left */}
                  <figcaption className="absolute bottom-3 left-4 right-4">
                    <span className="label-technical text-brand-on-dark/85">
                      <span className="text-brand-accent-soft">→</span> Institutional engineering capability
                    </span>
                  </figcaption>
                </div>

                {/* Footer ledger row beneath the image */}
                <div className="mt-3 pt-3 border-t border-brand-hair grid grid-cols-2 gap-3">
                  <span className="label-technical text-brand-mute">Practice est.</span>
                  <span className="text-[12.5px] text-brand-ink tracking-tight text-right font-mono-tab">2003</span>
                  <span className="label-technical text-brand-mute">Client base</span>
                  <span className="text-[12.5px] text-brand-ink tracking-tight text-right">Public + private</span>
                </div>
              </figure>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
           § 02 — Credibility metrics band
         ============================================================ */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container size="wide">
          <div className="py-14 md:py-20 grid grid-cols-2 lg:grid-cols-12 gap-x-10 gap-y-10 items-end">
            <div className="lg:col-span-2"><CountMetric value={200} suffix="+" label="Professionals worldwide" /></div>
            <div className="lg:col-span-2"><CountMetric value={20}  suffix="+" label="Years of practice" /></div>
            <div className="lg:col-span-2"><CountMetric value={50}  suffix="+" label="Countries served" /></div>
            <div className="lg:col-span-2"><CountMetric value={16}  suffix=""  label="Integrated disciplines" /></div>

            {/* Right-aligned institutional statement */}
            <div className="col-span-2 lg:col-span-4 lg:border-l lg:border-brand-hair lg:pl-10">
              <div className="label-technical text-brand-accent mb-4">Two decades of practice</div>
              <p className="font-display text-[20px] md:text-[24px] leading-[1.3] tracking-[-0.01em] text-brand-ink max-w-sm">
                Two decades delivering{' '}
                <span className="font-editorial italic text-brand-accent">transformation</span>{' '}
                across regulated sectors.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
           § 03 — Capability Architecture (the diagrammatic heart)
         ============================================================ */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Capability Architecture"
            index="03"
            title={
              <>
                A three-layer system that staffs every{' '}
                <span className="font-editorial italic font-medium text-brand-accent">institutional engagement</span>.
              </>
            }
            intro="Six capability layers feed five consulting pillars; pillars are then assembled per industry. Engagements draw across the stack rather than from a single discipline."
          />

          <CapabilityArchitecture
            layers={capabilityModel.map((l, idx) => ({
              index: `L1.${String(idx + 1).padStart(2, '0')}`,
              name: l.name,
            }))}
            pillars={pillars.map((p) => ({ index: p.index, name: p.name }))}
            industries={industries.map((i) => ({ name: i.name }))}
          />

          <div className="mt-10">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[-0.01em] text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
            >
              Open the full Capability Model
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 04 — Capability pillars (editorial list)
         ============================================================ */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Capability Pillars"
            index="04"
            title={
              <>
                Five pillars,{' '}
                <span className="font-editorial italic font-medium text-brand-accent">one delivery framework</span>.
              </>
            }
            intro="Sixteen disciplines clustered into five pillars so engagements are scoped, staffed, and governed as coherent transformation programmes."
          />

          <div className="border-t border-brand-hair-strong">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                to="/services#pillars"
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-brand-hair hover:bg-brand-paper transition-colors"
              >
                <div className="md:col-span-1 label-technical text-brand-accent pt-2">
                  {pillar.index}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-[22px] md:text-[26px] font-semibold leading-tight tracking-[-0.025em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {pillar.name}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-[14.5px] leading-[1.65] text-brand-ink-2">
                    {pillar.tagline}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                  <ArrowUpRight
                    size={18}
                    className="text-brand-mute group-hover:text-brand-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 05 — Industries (transformation narratives)
         ============================================================ */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Industries"
            index="05"
            title={
              <>
                Sector authority across{' '}
                <span className="font-editorial italic font-medium text-brand-accent">regulated industries</span>.
              </>
            }
            intro="Each pillar combines differently per sector — financial, engineering, technology, and human-capital capabilities tuned to that industry's operating reality."
          />

          <div className="border-t border-brand-hair-strong">
            {industries.slice(0, 3).map((industry, idx) => (
              <Link
                key={industry.id}
                to="/industries"
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-10 md:py-14 border-b border-brand-hair hover:bg-brand-stone transition-colors"
              >
                <div className="md:col-span-1 label-technical text-brand-accent pt-2">
                  S.{String(idx + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-[20px] md:text-[24px] font-semibold leading-tight tracking-[-0.025em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {industry.name}
                  </h3>
                  <p className="mt-5 font-editorial italic text-[16px] md:text-[18px] leading-[1.45] text-brand-ink-2">
                    {industry.impact}
                  </p>
                </div>
                <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 md:pt-1">
                  <div>
                    <div className="label-technical text-brand-mute mb-2">
                      <span className="text-brand-accent">→</span> Delivery scope
                    </div>
                    <p className="text-[13.5px] leading-[1.6] text-brand-ink-2">
                      {industry.scope}
                    </p>
                  </div>
                  <div>
                    <div className="label-technical text-brand-mute mb-2">
                      <span className="text-brand-accent">→</span> Institutional relevance
                    </div>
                    <p className="text-[13.5px] leading-[1.6] text-brand-ink-2">
                      {industry.relevance}
                    </p>
                  </div>
                  <div className="sm:col-span-2 pt-2 border-t border-brand-hair">
                    <div className="label-technical text-brand-mute mb-3">
                      <span className="text-brand-accent">→</span> Used by
                    </div>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
                      {industry.clients.map((c) => (
                        <li
                          key={c}
                          className="inline-flex items-baseline gap-1.5 text-[12.5px] tracking-tight text-brand-ink"
                        >
                          <span className="block w-1 h-1 bg-brand-accent" aria-hidden />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                  <ArrowUpRight
                    size={18}
                    className="text-brand-mute group-hover:text-brand-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link
              to="/industries"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-brand-ink hover:text-brand-accent transition-colors"
            >
              View all industries
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 06 — Technology capability layer
         ============================================================ */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Technology Capability"
            index="06"
            title={
              <>
                Engineering the digital systems that{' '}
                <span className="font-editorial italic font-medium text-brand-accent">institutions depend on</span>.
              </>
            }
            intro="A dedicated technology practice — software, networks, data, and digital experience — embedded across every transformation programme."
          />

          {/* Connector axis — communicates the four modules as a system. */}
          <div className="hidden lg:flex items-center mb-px relative">
            <div className="flex-1 h-px bg-brand-hair-strong" />
            <div className="absolute inset-x-0 flex justify-around">
              {technologyCapabilities.map((cap) => (
                <span key={cap.id} className="block w-2 h-2 -mt-px bg-brand-accent" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {technologyCapabilities.map((cap, idx) => (
              <div
                key={cap.id}
                className="relative border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper"
              >
                <div className="label-technical text-brand-accent mb-5">
                  T.{String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[19px] md:text-[20px] font-semibold tracking-[-0.02em] text-brand-ink leading-tight">
                  {cap.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {cap.description}
                </p>
                {/* Inter-module arrow connector (lg only, between cells) */}
                {idx < technologyCapabilities.length - 1 && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 items-center justify-center text-brand-accent z-10 bg-brand-paper border border-brand-hair-strong"
                    aria-hidden
                  >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span className="block h-px w-8 bg-brand-accent" aria-hidden />
            <p className="label-technical text-brand-mute">
              Technology deployed as a single integrated practice, not isolated tracks.
            </p>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 07 — Delivery methodology (axis flow)
         ============================================================ */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="How We Deliver"
            index="07"
            title={
              <>
                A six-phase methodology spanning the full{' '}
                <span className="font-editorial italic font-medium text-brand-accent">transformation lifecycle</span>.
              </>
            }
            intro="From early-stage diagnostics to long-term operational support, our delivery framework is built for institutional accountability and measurable outcomes."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-brand-hair-strong" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
              {methodology.map((phase) => (
                <div key={phase.index} className="flex lg:flex-col items-start gap-5">
                  <div className="relative z-10 w-14 h-14 shrink-0 border border-brand-ink bg-brand-paper text-brand-ink font-mono-tab text-[12px] flex items-center justify-center">
                    {phase.index}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-brand-ink leading-tight">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-brand-ink-2">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lifecycle ownership — explains how the firm spans the rail. */}
          <div className="mt-14 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-10 border-t border-brand-hair">
            <div className="lg:col-span-4">
              <div className="label-technical text-brand-accent mb-3">Lifecycle Ownership</div>
              <h3 className="font-display text-[20px] md:text-[24px] font-semibold tracking-[-0.025em] text-brand-ink leading-tight">
                One firm across the whole rail.
              </h3>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                ['Origination', 'We frame the case and engage at programme inception, not after scope is fixed.'],
                ['Execution',   'The same firm designs, builds, and integrates — no handoff to a delivery partner.'],
                ['Sustainment', 'We can run the system, hand it back to client teams, or both — designed in from day one.'],
              ].map(([label, copy]) => (
                <div key={label} className="border-l border-brand-accent pl-4">
                  <div className="label-technical text-brand-mute mb-2">{label}</div>
                  <p className="text-[13px] leading-[1.6] text-brand-ink-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <Link
              to="/methodology"
              className="group inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[-0.01em] text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
            >
              Open the methodology in detail
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 08 — Global Footprint (the dark band, with map)
         ============================================================ */}
      <Section tone="ink" id="footprint">
        <Container size="wide">
          {/* Header row — left-aligned typography on top of the map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <TechnicalLabel index="08" tone="dark">Global Footprint</TechnicalLabel>
              <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-on-dark">
                Operating across{' '}
                <span className="font-editorial italic text-brand-accent-soft">six regions</span>{' '}
                — public and private institutions, since 2003.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[15.5px] leading-[1.65] text-brand-on-dark-2 lg:pt-6">
                Delivery teams structured for international engagements,
                regulatory complexity, and long-horizon institutional outcomes.
              </p>
            </div>
          </div>

          {/* Full-width map */}
          <WorldMap tone="dark" />

          {/* Metrics row + CTAs below the map */}
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end pt-10 border-t border-white/10">
            <div className="lg:col-span-7 grid grid-cols-3 gap-x-6">
              <Metric value="50+"  label="Countries"     tone="dark" size="md" />
              <Metric value="200+" label="Professionals" tone="dark" size="md" />
              <Metric value="20+"  label="Years"         tone="dark" size="md" />
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3">
              <PrimaryCta to="/contact#request-consultation" tone="dark">Request Consultation</PrimaryCta>
              <SecondaryCta to="/industries" tone="dark">View Industries Served</SecondaryCta>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 09 — Engagement models
         ============================================================ */}
      <Section tone="ivory">
        <Container>
          <SectionHeader
            eyebrow="Engagement Models"
            index="09"
            title={
              <>
                Four ways institutions{' '}
                <span className="font-editorial italic font-medium text-brand-accent">engage with us</span>.
              </>
            }
            intro="From short advisory mandates through multi-year programme delivery, our engagement models scale to the complexity and time horizon of each transformation."
          />

          {/* Sequential pathway — Advisory → Programme Delivery → Managed
              Services → Capability Transfer. Engagement model can begin at
              any stage; the rail makes the progression explicit. */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-brand-hair-strong border border-brand-hair-strong">
            {engagementModels.map((model, idx) => (
              <div
                key={model.name}
                className="relative bg-brand-paper p-7 md:p-8"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="label-technical text-brand-accent">
                    E.{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="label-technical text-brand-mute">
                    Phase {idx + 1} of {engagementModels.length}
                  </span>
                </div>
                <h3 className="font-display text-[20px] md:text-[22px] font-medium tracking-[-0.01em] text-brand-ink leading-tight">
                  {model.name}
                </h3>
                <div className="mt-3 mb-4 inline-flex items-center gap-2 px-2.5 py-1 border border-brand-hair-strong">
                  <span className="block w-1.5 h-1.5 bg-brand-accent" aria-hidden />
                  <span className="label-technical text-brand-ink-2">
                    {model.appliesWhen}
                  </span>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {model.description}
                </p>

                {/* Scope + duration meta */}
                <dl className="mt-5 pt-4 border-t border-brand-hair grid grid-cols-1 gap-y-3">
                  <div>
                    <dt className="label-technical text-brand-mute">Scope depth</dt>
                    <dd className="mt-1 text-[13px] tracking-tight text-brand-ink">
                      {model.scope}
                    </dd>
                  </div>
                  <div>
                    <dt className="label-technical text-brand-mute">Duration profile</dt>
                    <dd className="mt-1 text-[13px] tracking-tight text-brand-ink font-mono-tab">
                      {model.duration}
                    </dd>
                  </div>
                </dl>

                {/* Forward-flow arrow on lg+ between cells */}
                {idx < engagementModels.length - 1 && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 items-center justify-center text-brand-accent z-10 bg-brand-paper border border-brand-hair-strong"
                    aria-hidden
                  >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="block h-px w-8 bg-brand-accent" aria-hidden />
              <p className="label-technical text-brand-mute">
                Engagements can begin at any phase — and combine across phases as the programme matures.
              </p>
            </div>
            <Link
              to="/engagement-models"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
            >
              Open the engagement models in detail
              <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 10 — Practitioner perspective (editorial pull-quote)
         ============================================================ */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <div className="text-center">
            <div className="flex justify-center">
              <TechnicalLabel index="10">Practice Perspective</TechnicalLabel>
            </div>

            {/* Thin divider above */}
            <div className="mt-12 mx-auto w-24 h-px bg-brand-hair-strong" />

            <blockquote className="mt-12 font-editorial italic text-[28px] md:text-[40px] lg:text-[46px] font-normal leading-[1.22] tracking-[-0.005em] text-brand-ink max-w-3xl mx-auto">
              "Multidisciplinary delivery is not a marketing claim — it's an
              operating choice. We staff every mandate so that strategy,
              engineering, technology, and operations are{' '}
              <span className="text-brand-accent">in the same room</span>{' '}
              from day one."
            </blockquote>

            {/* Thin divider below */}
            <div className="mt-12 mx-auto w-24 h-px bg-brand-hair-strong" />

            <div className="mt-8">
              <div className="text-[14px] font-medium tracking-tight text-brand-ink">
                Leadership Team
              </div>
              <div className="label-technical text-brand-mute mt-1">
                Golden Dimensions Ltd · EST. 2003
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              <Link
                to="/leadership"
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
              >
                Read the leadership doctrine
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/case-studies"
                className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.01em] text-brand-ink-2 hover:text-brand-accent transition-colors"
              >
                Or browse engagement evidence
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 11 — Final CTA
         ============================================================ */}
      <Section tone="ivory">
        <Container>
          {/* Elevated container panel — bordered, raised paper, corner ticks */}
          <DiagramFrame label="Transformation Invitation" index="11" className="bg-brand-paper">
            <div className="p-10 md:p-16 lg:p-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
                <div className="lg:col-span-8">
                  <h2 className="font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                    Bring multidisciplinary{' '}
                    <span className="font-editorial italic text-brand-accent">capability</span>{' '}
                    to your next{' '}
                    <span className="font-editorial italic text-brand-accent">transformation</span>{' '}
                    programme.
                  </h2>
                  <p className="mt-6 max-w-2xl text-[16px] leading-[1.6] text-brand-ink-2">
                    Tell us about the institutional outcome you're working toward —
                    we'll assemble the right combination of strategy, engineering,
                    technology, and operations expertise around it.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:border-l lg:border-brand-hair lg:pl-10">
                  <div className="label-technical text-brand-accent mb-4">Engagement starts at</div>
                  <ul className="space-y-3">
                    {[
                      ['Origination', 'Frame the case'],
                      ['Execution',   'Deliver the programme'],
                      ['Sustainment', 'Operate or hand over'],
                    ].map(([k, v]) => (
                      <li key={k} className="flex items-baseline justify-between gap-4 border-b border-brand-hair pb-2">
                        <span className="text-[13px] tracking-tight text-brand-ink">{k}</span>
                        <span className="label-technical text-brand-mute">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-brand-hair flex flex-col sm:flex-row sm:items-center gap-4">
                <PrimaryCta to="/contact#request-consultation">Request Consultation</PrimaryCta>
                <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
                <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
              </div>
            </div>
          </DiagramFrame>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
