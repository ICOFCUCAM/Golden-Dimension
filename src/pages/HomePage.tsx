import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
  Container,
  Section,
} from '@/components/section-primitives';
import { pillars, industries, methodology } from '@/data/servicesPage';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

// -----------------------------------------------------------------------------
// Stat — minimal editorial metric: serif numeral + thin label.
// -----------------------------------------------------------------------------
const Stat: React.FC<{
  value: number;
  suffix: string;
  label: string;
}> = ({ value, suffix, label }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const count = useCountUp(value, 1800, isVisible);
  return (
    <div ref={ref} className="py-2">
      <div className="font-display text-[44px] md:text-[56px] font-medium leading-none text-brand-ink tracking-tight">
        {count}
        <span className="text-brand-accent">{suffix}</span>
      </div>
      <div className="mt-3 text-[13px] tracking-wide text-brand-mute">
        {label}
      </div>
    </div>
  );
};

const engagementModels = [
  {
    name: 'Advisory',
    description:
      'Short-form expert engagements that frame strategy, decisions, and business cases.',
  },
  {
    name: 'Programme Delivery',
    description:
      'Multidisciplinary teams executing major transformations end to end.',
  },
  {
    name: 'Managed Services',
    description:
      'Long-term operation of systems, networks, and back-office functions.',
  },
  {
    name: 'Capability Build',
    description:
      'Embedded teams that transfer skills and operating models to client organisations.',
  },
];

const technologyCapabilities = [
  {
    name: 'Software & Platforms',
    description:
      'Custom software, integrations, and enterprise web platforms engineered for production scale.',
  },
  {
    name: 'Networks & Telecom',
    description:
      'Fixed, mobile, and enterprise network systems with secure end-to-end delivery.',
  },
  {
    name: 'Data & Analytics',
    description:
      'Decision-support data systems, reporting, and analytics for institutional operations.',
  },
  {
    name: 'Digital Experience',
    description:
      'UX, product design, and brand systems engineered for consistency at scale.',
  },
];

const regions = [
  'United Kingdom & Ireland',
  'European Union',
  'Middle East & North Africa',
  'Sub-Saharan Africa',
  'North America',
  'Asia Pacific',
];

// =============================================================================
// HomePage
// =============================================================================
const HomePage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      {/* ============================================================
           1 — Hero (editorial split)
         ============================================================ */}
      <section className="relative bg-brand-ivory pt-[120px] md:pt-[140px] pb-20 md:pb-28">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow index="01">Multidisciplinary Consulting & Engineering</Eyebrow>
              <h1 className="mt-7 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-medium leading-[0.98] tracking-[-0.02em] text-brand-ink">
                Integrated capability for institutions, enterprises, and{' '}
                <span className="italic text-brand-accent">governments</span>{' '}
                worldwide.
              </h1>
              <p className="mt-8 max-w-2xl text-[18px] md:text-[20px] leading-[1.55] text-brand-ink-2">
                Golden Dimensions Ltd brings strategy, engineering, technology,
                and human-capital expertise into a single delivery framework —
                supporting transformation across finance, infrastructure,
                healthcare, education, and digital systems since 2003.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
                <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
                <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977155989_8f3386e4.jpg"
                    alt="Multidisciplinary professionals collaborating"
                    className="w-full h-full object-cover grayscale-[25%]"
                  />
                </div>
                <div className="absolute -bottom-px -left-px bg-brand-ivory pr-6 pt-6">
                  <div className="font-display text-[44px] md:text-[56px] font-medium leading-none text-brand-ink">
                    50<span className="text-brand-accent">+</span>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wide text-brand-mute uppercase">
                    Countries served
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ============================================================
           2 — Credibility metrics band
         ============================================================ */}
      <section className="bg-brand-ivory border-t border-brand-hair">
        <Container size="wide">
          <div className="py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            <Stat value={200} suffix="+" label="Professionals worldwide" />
            <Stat value={20} suffix="+" label="Years of consulting practice" />
            <Stat value={50} suffix="+" label="Countries served" />
            <Stat value={16} suffix="" label="Integrated service disciplines" />
          </div>
        </Container>
      </section>

      {/* ============================================================
           3 — Capability pillars (editorial list)
         ============================================================ */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Capabilities"
            index="02"
            title={
              <>
                Five consulting pillars,{' '}
                <span className="italic text-brand-accent">one delivery framework</span>.
              </>
            }
            intro="Every engagement is staffed across the pillars relevant to the client's transformation agenda — strategy, engineering, technology, institutional development, and enterprise support, working as one team."
          />

          <div className="border-t border-brand-hair">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                to="/services#pillars"
                className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-8 md:py-10 border-b border-brand-hair hover:bg-brand-ivory/60 transition-colors"
              >
                <div className="md:col-span-1 font-mono-tab text-[11px] tracking-widest text-brand-mute pt-2">
                  {pillar.index}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-[24px] md:text-[28px] font-medium leading-tight tracking-tight text-brand-ink group-hover:text-brand-accent transition-colors">
                    {pillar.name}
                  </h3>
                </div>
                <div className="md:col-span-6">
                  <p className="text-[15.5px] leading-[1.65] text-brand-ink-2">
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

          <div className="mt-12">
            <Link
              to="/services"
              className="group inline-flex items-center gap-2.5 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
            >
              Explore the full Capability Model
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           4 — Industries (transformation narratives, alternating)
         ============================================================ */}
      <Section tone="ivory">
        <Container>
          <SectionHeader
            eyebrow="Industries"
            index="03"
            title={
              <>
                Sector authority across{' '}
                <span className="italic text-brand-accent">regulated industries</span>.
              </>
            }
            intro="Each pillar combines differently per sector — financial, engineering, technology, and human-capital capabilities tuned to that industry's operating reality."
          />

          <div className="space-y-6">
            {industries.slice(0, 3).map((industry, idx) => (
              <Link
                key={industry.id}
                to="/industries"
                className="group block bg-brand-paper border border-brand-hair p-8 md:p-10 hover:border-brand-ink transition-colors"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start">
                  <div className="md:col-span-1 font-mono-tab text-[11px] tracking-widest text-brand-mute pt-2">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-[22px] md:text-[26px] font-medium leading-tight tracking-tight text-brand-ink group-hover:text-brand-accent transition-colors">
                      {industry.name}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-[15px] leading-[1.65] text-brand-ink-2">
                      {industry.description}
                    </p>
                  </div>
                  <div className="md:col-span-1 flex md:justify-end items-start pt-2">
                    <ArrowUpRight
                      size={18}
                      className="text-brand-mute group-hover:text-brand-accent transition-colors"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-end">
            <Link
              to="/industries"
              className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink hover:text-brand-accent transition-colors"
            >
              View all industries
              <ArrowRight
                size={15}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           5 — Technology capability layer (rule grid)
         ============================================================ */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Technology Capability"
            index="04"
            title={
              <>
                Engineering the digital systems that{' '}
                <span className="italic text-brand-accent">institutions depend on</span>.
              </>
            }
            intro="A dedicated technology practice — software, networks, data, and digital experience — embedded across every transformation programme."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {technologyCapabilities.map((cap, idx) => (
              <div
                key={cap.name}
                className="border-r border-b border-brand-hair p-7 md:p-8"
              >
                <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-5">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[20px] md:text-[22px] font-medium tracking-tight text-brand-ink">
                  {cap.name}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.6] text-brand-ink-2">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
           6 — Delivery methodology (axis flow)
         ============================================================ */}
      <Section tone="ivory">
        <Container>
          <SectionHeader
            eyebrow="How We Deliver"
            index="05"
            title={
              <>
                A six-phase methodology spanning the full{' '}
                <span className="italic text-brand-accent">transformation lifecycle</span>.
              </>
            }
            intro="From early-stage diagnostics to long-term operational support, our delivery framework is built for institutional accountability and measurable outcomes."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-brand-hair-strong" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
              {methodology.map((phase) => (
                <div key={phase.index} className="flex lg:flex-col items-start gap-5">
                  <div className="relative z-10 w-14 h-14 shrink-0 border border-brand-ink bg-brand-ivory text-brand-ink font-mono-tab text-[13px] flex items-center justify-center">
                    {phase.index}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[18px] font-medium tracking-tight text-brand-ink leading-tight">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2">
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
           7 — Leadership positioning (editorial split)
         ============================================================ */}
      <Section tone="paper" divided>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International team collaboration"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <Eyebrow index="06">The Firm</Eyebrow>
              <h2 className="mt-7 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                Multidisciplinary by design.{' '}
                <span className="italic text-brand-accent">
                  Institutional in delivery.
                </span>
              </h2>
              <div className="mt-7 space-y-4 text-[16.5px] leading-[1.65] text-brand-ink-2 max-w-2xl">
                <p>
                  Founded in 2003, Golden Dimensions Ltd was structured from
                  day one as a multidisciplinary firm — finance, engineering,
                  technology, healthcare, education, and sustainability under
                  one governance and quality framework.
                </p>
                <p>
                  That structure is what allows us to staff complex,
                  cross-disciplinary mandates without subcontracting the most
                  important parts of delivery — and to remain accountable for
                  the outcome end to end.
                </p>
              </div>
              <div className="mt-9">
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                >
                  About the firm
                  <ArrowRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           8 — Global footprint (the dark band)
         ============================================================ */}
      <Section tone="ink" id="footprint">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow tone="dark" index="07">
                Global Footprint
              </Eyebrow>
              <h2 className="mt-7 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-on-dark">
                Serving organisations across{' '}
                <span className="italic text-brand-accent-soft">50+ countries</span>{' '}
                — public and private institutions, since 2003.
              </h2>
              <p className="mt-7 max-w-xl text-[16.5px] leading-[1.65] text-brand-on-dark-2">
                Delivery teams structured for international engagements,
                regulatory complexity, and long-horizon institutional outcomes
                across these regions.
              </p>
              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <PrimaryCta to="/contact" tone="dark">
                  Request Consultation
                </PrimaryCta>
                <SecondaryCta to="/industries" tone="dark">
                  View Industries Served
                </SecondaryCta>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-l border-white/10">
                {regions.map((region, idx) => (
                  <div
                    key={region}
                    className="border-r border-b border-white/10 p-6 flex items-baseline gap-4"
                  >
                    <span className="font-mono-tab text-[10px] tracking-widest text-brand-accent-soft">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14.5px] tracking-tight text-brand-on-dark">
                      {region}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-3 gap-x-8">
                <div>
                  <div className="font-display text-[36px] md:text-[44px] font-medium leading-none text-brand-on-dark">
                    50<span className="text-brand-accent-soft">+</span>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wide text-brand-on-dark-2 uppercase">
                    Countries
                  </div>
                </div>
                <div>
                  <div className="font-display text-[36px] md:text-[44px] font-medium leading-none text-brand-on-dark">
                    200<span className="text-brand-accent-soft">+</span>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wide text-brand-on-dark-2 uppercase">
                    Professionals
                  </div>
                </div>
                <div>
                  <div className="font-display text-[36px] md:text-[44px] font-medium leading-none text-brand-on-dark">
                    20<span className="text-brand-accent-soft">+</span>
                  </div>
                  <div className="mt-2 text-[12px] tracking-wide text-brand-on-dark-2 uppercase">
                    Years
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           9 — Engagement models (rule grid 2x2)
         ============================================================ */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Engagement Models"
            index="08"
            title={
              <>
                Four ways institutions{' '}
                <span className="italic text-brand-accent">engage with us</span>.
              </>
            }
            intro="From short advisory mandates through multi-year programme delivery, our engagement models scale to the complexity and time horizon of each transformation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
            {engagementModels.map((model, idx) => (
              <div
                key={model.name}
                className="border-r border-b border-brand-hair p-8 md:p-10"
              >
                <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-5">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-tight text-brand-ink">
                  {model.name}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-brand-ink-2 max-w-md">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============================================================
           10 — Practitioner perspective (editorial pull-quote)
         ============================================================ */}
      <Section tone="ivory">
        <Container size="narrow">
          <Eyebrow index="09">Practitioner Perspective</Eyebrow>
          <blockquote className="mt-8 font-display text-[28px] md:text-[40px] lg:text-[44px] font-medium leading-[1.18] tracking-[-0.015em] text-brand-ink">
            "Multidisciplinary delivery is not a marketing claim — it's an
            operating choice. We staff every mandate so that strategy,
            engineering, technology, and operations are{' '}
            <span className="italic text-brand-accent">in the same room</span>{' '}
            from day one."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-10 h-px bg-brand-ink" />
            <div>
              <div className="text-[14px] font-medium tracking-tight text-brand-ink">
                Leadership Team
              </div>
              <div className="text-[13px] text-brand-mute">
                Golden Dimensions Ltd · Established 2003
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           11 — Final CTA
         ============================================================ */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <Eyebrow index="10">Engage With Us</Eyebrow>
          <h2 className="mt-8 font-display text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
            Bring multidisciplinary capability to your next{' '}
            <span className="italic text-brand-accent">transformation programme</span>.
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.6] text-brand-ink-2">
            Tell us about the institutional outcome you're working toward —
            we'll assemble the right combination of strategy, engineering,
            technology, and operations expertise around it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
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
