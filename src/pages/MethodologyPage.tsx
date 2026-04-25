import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import { methodology } from '@/data/servicesPage';

// Detail extension of the six methodology phases.
// Each phase carries: typical duration · key activities · primary deliverables.
const phaseDetail: Record<
  string,
  { duration: string; activities: string[]; deliverables: string[] }
> = {
  '01': {
    duration: '4 – 8 weeks',
    activities: [
      'Stakeholder interviews and discovery workshops',
      'Current-state diagnostic across operations, technology, and finance',
      'Opportunity framing and option development',
      'Decision-grade business case and investment shape',
    ],
    deliverables: [
      'Diagnostic report',
      'Strategic options paper',
      'Investment business case',
    ],
  },
  '02': {
    duration: '6 – 12 weeks',
    activities: [
      'Programme architecture and dependency mapping',
      'Governance, risk, and assurance framework design',
      'Resource model, vendor strategy, and procurement plan',
      'Integrated delivery roadmap and milestone scheduling',
    ],
    deliverables: [
      'Programme architecture',
      'Governance & assurance handbook',
      'Integrated delivery roadmap',
    ],
  },
  '03': {
    duration: '8 – 20 weeks',
    activities: [
      'Operating-model design and target-state definition',
      'Engineering, technology, and platform architecture',
      'Service blueprints and process design',
      'Design validation through prototypes and pilots',
    ],
    deliverables: [
      'Target operating model',
      'Solution architecture',
      'Validated design artefacts',
    ],
  },
  '04': {
    duration: '6 – 24 months',
    activities: [
      'Multidisciplinary delivery team mobilisation',
      'Engineering build, integration, and platform deployment',
      'Change management and end-user readiness',
      'Quality assurance and progressive go-live',
    ],
    deliverables: [
      'Delivered systems and services',
      'Test and assurance evidence',
      'Go-live and stabilisation report',
    ],
  },
  '05': {
    duration: '3 – 12 months',
    activities: [
      'Performance instrumentation and analytics',
      'Operational tuning and process refinement',
      'Cost-to-serve optimisation',
      'Continuous improvement cycles',
    ],
    deliverables: [
      'Performance baseline and dashboards',
      'Optimisation initiatives portfolio',
      'Benefits realisation report',
    ],
  },
  '06': {
    duration: 'Ongoing — multi-year',
    activities: [
      'Managed-service operation of platforms and processes',
      'Advisory retainer for ongoing decisions',
      'Capability transfer to client teams',
      'Long-horizon evolution and modernisation',
    ],
    deliverables: [
      'Operational service-level reporting',
      'Capability-transfer evidence',
      'Multi-year evolution roadmap',
    ],
  },
};

const MethodologyPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      <PageHeader
        eyebrow="How We Deliver"
        index="M.01"
        title={
          <>
            A six-phase methodology spanning the full{' '}
            <span className="font-editorial italic text-brand-accent">
              transformation lifecycle
            </span>.
          </>
        }
        subtitle="From early-stage diagnostics to long-term sustainment, our delivery framework is designed for institutional accountability and measurable outcomes — and is engineered to be navigated as a single accountable practice, not a chain of vendors."
      />

      {/* Lifecycle rail — same axis as on the homepage but full-width on this page. */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Lifecycle Overview"
            index="02"
            title={
              <>
                Six phases,{' '}
                <span className="font-editorial italic text-brand-accent">
                  one accountable practice
                </span>{' '}
                across all of them.
              </>
            }
            intro="Engagements may begin at any phase and combine across phases as the programme matures. The same firm-wide governance and quality framework applies regardless of where in the rail an engagement starts."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-brand-hair-strong" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
              {methodology.map((phase) => (
                <a
                  key={phase.index}
                  href={`#phase-${phase.index}`}
                  className="group flex lg:flex-col items-start gap-5"
                >
                  <div className="relative z-10 w-14 h-14 shrink-0 border border-brand-ink bg-brand-paper text-brand-ink font-mono-tab text-[12px] flex items-center justify-center group-hover:bg-brand-ink group-hover:text-brand-ivory transition-colors">
                    {phase.index}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[16px] font-medium tracking-[-0.015em] text-brand-ink leading-tight group-hover:text-brand-accent transition-colors">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-brand-ink-2">
                      {phase.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Per-phase detail blocks */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Phase Detail"
            index="03"
            title={
              <>
                Inside each{' '}
                <span className="font-editorial italic text-brand-accent">phase</span>.
              </>
            }
            intro="Typical duration, key activities, and primary deliverables per phase. Specific scoping is tailored to the engagement; ranges below reflect institutional programmes of moderate complexity."
          />

          <div className="space-y-12">
            {methodology.map((phase) => {
              const detail = phaseDetail[phase.index];
              if (!detail) return null;
              return (
                <article
                  key={phase.index}
                  id={`phase-${phase.index}`}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-t-2 border-brand-ink"
                >
                  <header className="lg:col-span-4">
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="font-mono-tab text-[28px] tracking-[-0.02em] text-brand-accent leading-none">
                        {phase.index}
                      </span>
                      <span className="label-technical text-brand-mute">
                        Phase
                      </span>
                    </div>
                    <h3 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.05]">
                      {phase.name}
                    </h3>
                    <p className="mt-5 font-editorial italic text-[16px] leading-[1.5] text-brand-ink-2">
                      {phase.description}
                    </p>
                    <div className="mt-7 inline-flex items-baseline gap-3 px-3 py-1.5 border border-brand-hair-strong">
                      <span className="label-technical text-brand-mute">Typical duration</span>
                      <span className="font-mono-tab text-[12.5px] text-brand-ink">{detail.duration}</span>
                    </div>
                  </header>

                  <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                    <div>
                      <div className="label-technical text-brand-accent mb-4">
                        Key Activities
                      </div>
                      <ul className="space-y-3 border-t border-brand-hair">
                        {detail.activities.map((a, i) => (
                          <li key={a} className="flex items-baseline gap-3 pt-3 border-b border-brand-hair pb-3">
                            <span className="font-mono-tab text-[10px] text-brand-mute shrink-0">
                              A.{String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[13.5px] leading-[1.55] text-brand-ink">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="label-technical text-brand-accent mb-4">
                        Primary Deliverables
                      </div>
                      <ul className="space-y-3 border-t border-brand-hair">
                        {detail.deliverables.map((d, i) => (
                          <li key={d} className="flex items-baseline gap-3 pt-3 border-b border-brand-hair pb-3">
                            <span className="font-mono-tab text-[10px] text-brand-mute shrink-0">
                              D.{String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="text-[13.5px] leading-[1.55] text-brand-ink">{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Lifecycle ownership note */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <TechnicalLabel index="04">Lifecycle Ownership</TechnicalLabel>
              <h2 className="mt-7 font-display text-[26px] md:text-[34px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                One firm across the whole rail.
              </h2>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                ['Origination', 'We frame the case and engage at programme inception, not after scope is fixed.'],
                ['Execution',   'The same firm designs, builds, and integrates — no handoff to a delivery partner.'],
                ['Sustainment', 'We can run the system, hand it back to client teams, or both — designed in from day one.'],
              ].map(([label, copy]) => (
                <div key={label} className="border-l border-brand-accent pl-5">
                  <div className="label-technical text-brand-mute mb-2.5">{label}</div>
                  <p className="text-[13.5px] leading-[1.6] text-brand-ink-2">{copy}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-brand-hair flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="label-technical text-brand-mute">Related</span>
            <Link to="/engagement-models" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Engagement Models <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/services" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Capability Pillars <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/leadership" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Leadership Doctrine <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory" divided>
        <Container size="narrow">
          <TechnicalLabel index="05">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.04] tracking-[-0.015em] text-brand-ink">
            Discuss where in the lifecycle your{' '}
            <span className="font-editorial italic text-brand-accent">programme</span>{' '}
            sits.
          </h2>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/engagement-models">Engagement Models</SecondaryCta>
            <TertiaryCta to="/services">Explore Capabilities</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default MethodologyPage;
