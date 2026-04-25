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
  Metric,
} from '@/components/section-primitives';
import { CapabilityArchitecture } from '@/components/diagrams';
import { pillars, industries, methodology, capabilityModel } from '@/data/servicesPage';

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
      {/* ============================================================
           § 01 — Hero (editorial authority)
         ============================================================ */}
      <section className="relative bg-brand-ivory pt-[100px] md:pt-[120px] pb-24 md:pb-32 border-b border-brand-hair">
        <Container size="wide">
          {/* Paper-style masthead — frames the page as a published brief. */}
          <div className="flex items-baseline justify-between pb-6 mb-16 border-b border-brand-hair-strong">
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent">Capability Brief</span> · Vol. XX · Issue 01
            </span>
            <span className="label-technical text-brand-mute font-mono-tab">
              {new Date().toLocaleDateString('en-GB', { month: 'short', year: 'numeric' }).toUpperCase()}
            </span>
          </div>

          <div className="max-w-5xl">
            <TechnicalLabel index="01">Multidisciplinary Consulting & Engineering</TechnicalLabel>

            <h1 className="mt-10 font-display text-[44px] sm:text-[56px] md:text-[72px] lg:text-[88px] font-medium leading-[1.02] tracking-[-0.015em] text-brand-ink">
              Integrated{' '}
              <span className="font-editorial italic text-brand-accent">capability</span>{' '}
              for{' '}
              <span className="font-editorial italic text-brand-accent">institutions</span>,
              enterprises, and{' '}
              <span className="font-editorial italic text-brand-accent">governments</span>{' '}
              worldwide.
            </h1>

            <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 max-w-4xl">
              <div className="lg:col-span-12 space-y-4 text-[17px] md:text-[19px] leading-[1.6] text-brand-ink-2">
                <p>
                  Golden Dimensions Ltd brings strategy, engineering, technology,
                  and human-capital expertise into a single delivery framework —
                  supporting transformation across finance, infrastructure,
                  healthcare, education, and digital systems since 2003.
                </p>
                <p>
                  We work with public and private sector institutions across more
                  than fifty countries — sized for institutional accountability,
                  scoped for measurable outcomes.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
              <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
            </div>

            {/* Micro credibility rail — the four institutional disciplines
                the firm operates across, immediately under hero CTAs. */}
            <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-4 max-w-3xl border-t border-brand-hair pt-6">
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

            {/* Institutional metadata strip */}
            <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 max-w-3xl">
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
          </div>
        </Container>
      </section>

      {/* ============================================================
           § 02 — Editorial article (long-form thesis)
         ============================================================ */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-3">
              <TechnicalLabel index="02">Practice Thesis</TechnicalLabel>
              <p className="mt-6 label-technical text-brand-mute leading-relaxed">
                A short article on what
                <br />
                multidisciplinary delivery
                <br />
                means in practice.
              </p>
              <div className="mt-6 hidden lg:block">
                <div className="h-px w-12 bg-brand-accent" />
                <div className="mt-3 label-technical text-brand-mute font-mono-tab">
                  ~ 4 min read
                </div>
              </div>
            </aside>

            <article className="lg:col-span-9 max-w-3xl">
              <h2 className="font-display text-[28px] md:text-[36px] lg:text-[44px] font-medium leading-[1.1] tracking-[-0.015em] text-brand-ink">
                What multidisciplinary delivery actually means in{' '}
                <span className="font-editorial italic text-brand-accent">practice</span>.
              </h2>

              <div className="mt-10 space-y-6 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                <p>
                  <span className="font-display text-brand-ink float-left text-[64px] md:text-[80px] leading-[0.85] mr-3 mt-1">M</span>
                  ost large transformation programmes fail in the seams. A
                  strategy team hands a brief to an engineering vendor. The
                  engineering vendor hands a system to an operating team. By
                  the time the system is running, no one is accountable for
                  whether the original strategic outcome was met. The work
                  technically completes; the institution does not change.
                </p>

                <p>
                  Golden Dimensions was structured in 2003 to remove those
                  handoffs. The firm operates as a single delivery practice
                  across five capability pillars and six layers of
                  capability — strategy, engineering, technology, operations,
                  sustainability, and human-capital development — under one
                  governance and quality framework. Engagements are staffed
                  jointly from day one, by one accountable lead.
                </p>
              </div>

              {/* Pull-quote */}
              <figure className="my-12 md:my-14 border-l-2 border-brand-accent pl-6 md:pl-8">
                <blockquote className="font-editorial italic text-[22px] md:text-[28px] lg:text-[32px] leading-[1.25] tracking-[-0.005em] text-brand-ink">
                  "We do not subcontract the parts of delivery that determine
                  whether the outcome holds — and that is what allows us to
                  remain accountable for it."
                </blockquote>
                <figcaption className="mt-5 label-technical text-brand-mute">
                  <span className="text-brand-accent">→</span> Operating principle, since 2003
                </figcaption>
              </figure>

              <div className="space-y-6 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                <p>
                  In practice this means clients work with one firm across
                  the lifecycle: from the initial diagnostic and business
                  case, through engineering design and platform build, into
                  operations and capability transfer. The same partners who
                  framed the strategy stay accountable when the system goes
                  live. The same engineers who built it can run it, hand it
                  back to client teams, or both.
                </p>
                <p>
                  Two decades on, the firm operates this way for banks,
                  ministries, infrastructure agencies, healthcare systems,
                  network operators, and educational institutions across
                  more than fifty countries. The structure is unusual; the
                  outcome is the point.
                </p>
              </div>

              <div className="mt-12 pt-6 border-t border-brand-hair flex items-center justify-between">
                <span className="label-technical text-brand-mute">
                  Continue reading the firm's positioning
                </span>
                <Link
                  to="/about"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                >
                  About the firm
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 03 — Credibility metrics rail (single horizontal row)
         ============================================================ */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container size="wide">
          <div className="py-12 md:py-16">
            <div className="mb-6">
              <TechnicalLabel index="03">Operating Scale</TechnicalLabel>
            </div>

            {/* Single editorial rail — no card grid, no count-up. */}
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-brand-hair border-y border-brand-hair">
              {[
                { v: '200+', l: 'Professionals worldwide' },
                { v: '20+',  l: 'Years of practice' },
                { v: '50+',  l: 'Countries served' },
                { v: '16',   l: 'Integrated disciplines' },
                { v: '2003', l: 'Established' },
              ].map((m) => (
                <div key={m.l} className="px-5 md:px-7 py-7 first:pl-0 last:pr-0">
                  <div className="font-display text-[28px] md:text-[36px] lg:text-[40px] font-medium leading-none tracking-[-0.02em] text-brand-ink font-mono-tab">
                    {m.v}
                  </div>
                  <div className="mt-3 label-technical text-brand-mute">
                    {m.l}
                  </div>
                </div>
              ))}
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

          {/* Each sector reads as a mini editorial article: kicker (impact)
              → body (scope + relevance prose) → key-fact list (clients).
              Generous whitespace; hairline rule above each article. */}
          <div className="border-t-2 border-brand-ink">
            {industries.slice(0, 3).map((industry, idx) => (
              <article
                key={industry.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-14 md:py-20 border-b border-brand-hair"
              >
                <header className="lg:col-span-4">
                  <div className="label-technical text-brand-accent">
                    Industry / S.{String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="mt-5 font-display text-[26px] md:text-[34px] lg:text-[40px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-6 font-editorial italic text-[17px] md:text-[19px] leading-[1.4] text-brand-ink-2">
                    {industry.impact}
                  </p>
                </header>

                <div className="lg:col-span-8 max-w-3xl">
                  <div className="space-y-4 text-[15.5px] md:text-[16.5px] leading-[1.7] text-brand-ink-2">
                    <p>{industry.scope}</p>
                    <p>{industry.relevance}</p>
                  </div>

                  <dl className="mt-8 pt-6 border-t border-brand-hair grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-8 gap-y-3">
                    <dt className="label-technical text-brand-mute">Used by</dt>
                    <dd>
                      <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                        {industry.clients.map((c) => (
                          <li
                            key={c}
                            className="inline-flex items-baseline gap-2 text-[13.5px] tracking-tight text-brand-ink"
                          >
                            <span className="block w-1 h-1 bg-brand-accent" aria-hidden />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </dl>

                  <div className="mt-8">
                    <Link
                      to="/industries"
                      className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                    >
                      Read on {industry.name.toLowerCase()}
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
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
        </Container>
      </Section>

      {/* ============================================================
           § 08 — Global Footprint (the dark band, with map)
         ============================================================ */}
      <Section tone="ink" id="footprint">
        <Container>
          <TechnicalLabel index="08" tone="dark">Global Footprint</TechnicalLabel>

          {/* Text-led typographic block — no map. Regions read as a single
              long sentence; metrics inline below. */}
          <h2 className="mt-10 font-display text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-medium leading-[1.02] tracking-[-0.015em] text-brand-on-dark max-w-5xl">
            Operating across{' '}
            <span className="font-editorial italic text-brand-accent-soft">50+ countries</span>{' '}
            — North America, the United Kingdom, the European Union, MENA,
            Sub-Saharan Africa, and Asia Pacific.
          </h2>

          <p className="mt-10 max-w-3xl text-[16.5px] md:text-[18px] leading-[1.7] text-brand-on-dark-2">
            Delivery teams are structured for international engagements,
            regulatory complexity, and long-horizon institutional outcomes —
            for both public sector clients (ministries, central agencies,
            regulators, sovereign development bodies) and private sector
            clients (banks, insurers, network operators, healthcare systems,
            and infrastructure sponsors).
          </p>

          {/* Region ledger — laid out as a typographic list, not a map. */}
          <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-x-10 gap-y-8">
            {[
              ['01', 'North America'],
              ['02', 'United Kingdom'],
              ['03', 'European Union'],
              ['04', 'MENA'],
              ['05', 'Sub-Saharan Africa'],
              ['06', 'Asia Pacific'],
            ].map(([idx, name]) => (
              <div key={name} className="flex items-baseline gap-4">
                <span className="font-mono-tab text-[11px] tracking-widest text-brand-accent-soft">
                  {idx}
                </span>
                <span className="font-display text-[17px] md:text-[19px] tracking-[-0.005em] text-brand-on-dark">
                  {name}
                </span>
              </div>
            ))}
          </div>

          {/* Inline metrics rail */}
          <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-3 gap-x-6 max-w-3xl">
            <Metric value="50+"  label="Countries"     tone="dark" size="md" />
            <Metric value="200+" label="Professionals" tone="dark" size="md" />
            <Metric value="20+"  label="Years"         tone="dark" size="md" />
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-3">
            <PrimaryCta to="/contact" tone="dark">Request Consultation</PrimaryCta>
            <SecondaryCta to="/industries" tone="dark">View Industries Served</SecondaryCta>
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

          <div className="mt-6 flex items-center gap-3">
            <span className="block h-px w-8 bg-brand-accent" aria-hidden />
            <p className="label-technical text-brand-mute">
              Engagements can begin at any phase — and combine across phases as the programme matures.
            </p>
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
          </div>
        </Container>
      </Section>

      {/* ============================================================
           § 11 — Final CTA
         ============================================================ */}
      <Section tone="ivory">
        <Container>
          {/* Minimal editorial close — no panel, no decoration. Just a
              hairline-divided invitation block. */}
          <div className="border-t-2 border-brand-ink pt-12 md:pt-16">
            <TechnicalLabel index="11">Engage With Us</TechnicalLabel>

            <h2 className="mt-10 font-display text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] font-medium leading-[1.04] tracking-[-0.015em] text-brand-ink max-w-5xl">
              Bring multidisciplinary{' '}
              <span className="font-editorial italic text-brand-accent">capability</span>{' '}
              to your next{' '}
              <span className="font-editorial italic text-brand-accent">transformation</span>{' '}
              programme.
            </h2>

            <p className="mt-10 max-w-2xl text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
              Tell us about the institutional outcome you're working toward.
              We'll assemble the right combination of strategy, engineering,
              technology, and operations expertise around it.
            </p>

            <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
              <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default HomePage;
