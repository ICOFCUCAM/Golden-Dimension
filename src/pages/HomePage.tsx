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
    description: 'Short-form expert engagements that frame strategy, decisions, and business cases.',
  },
  {
    name: 'Programme Delivery',
    description: 'Multidisciplinary teams executing major transformations end to end.',
  },
  {
    name: 'Managed Services',
    description: 'Long-term operation of systems, networks, and back-office functions.',
  },
  {
    name: 'Capability Build',
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
      {/* ============================================================
           § 01 — Hero
         ============================================================ */}
      <section className="relative bg-brand-ivory pt-[140px] md:pt-[160px] pb-20 md:pb-28 border-b border-brand-hair">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-8">
              <TechnicalLabel index="01">Multidisciplinary Consulting & Engineering</TechnicalLabel>
              <h1 className="mt-8 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-semibold leading-[0.98] tracking-[-0.03em] text-brand-ink">
                Integrated capability for institutions, enterprises, and{' '}
                <span className="font-editorial italic font-medium text-brand-accent">
                  governments
                </span>{' '}
                worldwide.
              </h1>
              <p className="mt-8 max-w-2xl text-[17px] md:text-[19px] leading-[1.55] text-brand-ink-2">
                Golden Dimensions Ltd brings strategy, engineering, technology,
                and human-capital expertise into a single delivery framework —
                supporting transformation across finance, infrastructure,
                healthcare, education, and digital systems since 2003.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
                <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
                <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
                <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end">
              <DiagramFrame label="Operating Posture" index="OP" className="bg-brand-paper">
                <div className="p-7">
                  <ul className="space-y-4">
                    {[
                      ['Active Mandates',          '> 200 professionals'],
                      ['Geographies',              '> 50 countries'],
                      ['Disciplines integrated',   '16 / 5 pillars'],
                      ['Practice established',     '2003'],
                      ['Client base',              'Public + private'],
                    ].map(([k, v]) => (
                      <li key={k} className="grid grid-cols-2 gap-3">
                        <span className="label-technical text-brand-mute">{k}</span>
                        <span className="text-[13px] text-brand-ink tracking-tight text-right">{v}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </DiagramFrame>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
           § 02 — Credibility metrics band
         ============================================================ */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container size="wide">
          <div className="py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            <CountMetric value={200} suffix="+" label="Professionals worldwide" />
            <CountMetric value={20}  suffix="+" label="Years of practice" />
            <CountMetric value={50}  suffix="+" label="Countries served" />
            <CountMetric value={16}  suffix=""  label="Integrated disciplines" />
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
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-brand-hair hover:bg-brand-stone transition-colors"
              >
                <div className="md:col-span-1 label-technical text-brand-accent pt-2">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-[20px] md:text-[24px] font-semibold leading-tight tracking-[-0.025em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {industry.name}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-[14.5px] leading-[1.65] text-brand-ink-2">
                    {industry.description}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                  <ArrowUpRight
                    size={18}
                    className="text-brand-mute group-hover:text-brand-accent transition-colors"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {technologyCapabilities.map((cap, idx) => (
              <div
                key={cap.id}
                className="border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper"
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
              </div>
            ))}
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
        </Container>
      </Section>

      {/* ============================================================
           § 08 — Global Footprint (the dark band, with map)
         ============================================================ */}
      <Section tone="ink" id="footprint">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <TechnicalLabel index="08" tone="dark">Global Footprint</TechnicalLabel>
              <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.025em] text-brand-on-dark">
                Operating across{' '}
                <span className="font-editorial italic font-medium text-brand-accent-soft">six regions</span>{' '}
                — public and private institutions, since 2003.
              </h2>
              <p className="mt-7 max-w-xl text-[15.5px] leading-[1.65] text-brand-on-dark-2">
                Delivery teams structured for international engagements,
                regulatory complexity, and long-horizon institutional outcomes.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-x-6">
                <Metric value="50+"  label="Countries"     tone="dark" size="md" />
                <Metric value="200+" label="Professionals" tone="dark" size="md" />
                <Metric value="20+"  label="Years"         tone="dark" size="md" />
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <PrimaryCta to="/contact" tone="dark">Request Consultation</PrimaryCta>
                <SecondaryCta to="/industries" tone="dark">View Industries Served</SecondaryCta>
              </div>
            </div>

            <div className="lg:col-span-7">
              <WorldMap tone="dark" />
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

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair-strong">
            {engagementModels.map((model, idx) => (
              <div key={model.name} className="border-r border-b border-brand-hair-strong p-8 md:p-10 bg-brand-paper">
                <div className="label-technical text-brand-accent mb-5">
                  E.{String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[22px] md:text-[24px] font-semibold tracking-[-0.025em] text-brand-ink">
                  {model.name}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-brand-ink-2 max-w-md">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 10 — Practitioner perspective (editorial pull-quote)
         ============================================================ */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <TechnicalLabel index="10">Practitioner Perspective</TechnicalLabel>
          <blockquote className="mt-8 font-editorial italic text-[26px] md:text-[36px] lg:text-[42px] font-medium leading-[1.18] tracking-[-0.015em] text-brand-ink">
            "Multidisciplinary delivery is not a marketing claim — it's an
            operating choice. We staff every mandate so that strategy,
            engineering, technology, and operations are{' '}
            <span className="text-brand-accent">in the same room</span>{' '}
            from day one."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-10 h-px bg-brand-ink" />
            <div>
              <div className="text-[14px] font-medium tracking-tight text-brand-ink">
                Leadership Team
              </div>
              <div className="label-technical text-brand-mute mt-1">
                Golden Dimensions Ltd · EST. 2003
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 11 — Final CTA
         ============================================================ */}
      <Section tone="ivory">
        <Container size="narrow">
          <TechnicalLabel index="11">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[32px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.04] tracking-[-0.03em] text-brand-ink">
            Bring multidisciplinary capability to your next{' '}
            <span className="font-editorial italic font-medium text-brand-accent">
              transformation programme
            </span>.
          </h2>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.6] text-brand-ink-2">
            Tell us about the institutional outcome you're working toward —
            we'll assemble the right combination of strategy, engineering,
            technology, and operations expertise around it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
