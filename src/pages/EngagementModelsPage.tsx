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
import { Seo } from '@/components/Seo';

interface EngagementModel {
  id: string;
  index: string;
  name: string;
  appliesWhen: string;
  scope: string;
  duration: string;
  team: string;
  governance: string;
  description: string;
  whenToUse: string[];
  outcomes: string[];
}

const models: EngagementModel[] = [
  {
    id: 'advisory',
    index: '01',
    name: 'Advisory',
    appliesWhen: 'Framing the case',
    scope: 'Discrete advisory mandate',
    duration: '4 – 12 weeks',
    team: 'Partner-led, 3 – 6 specialists',
    governance: 'Direct partner oversight, weekly cadence',
    description:
      'Short-form expert engagements that frame strategy, decisions, and business cases. Used when the client needs decision-grade analysis and clarity before committing to a programme.',
    whenToUse: [
      'Framing a major investment decision',
      'Independent review or assurance of an existing programme',
      'Pre-procurement diagnostic and option development',
      'Regulatory or board-level position paper',
    ],
    outcomes: [
      'Decision-grade business case',
      'Strategic options paper',
      'Independent assurance opinion',
      'Investment shape and indicative roadmap',
    ],
  },
  {
    id: 'programme-delivery',
    index: '02',
    name: 'Programme Delivery',
    appliesWhen: 'Executing the programme',
    scope: 'Full multidisciplinary delivery',
    duration: '12 – 36 months',
    team: '15 – 80+ multidisciplinary professionals',
    governance: 'Steering committee, programme board, monthly assurance',
    description:
      'Multidisciplinary teams executing major transformations end to end — strategy, engineering, technology, and operations under one accountable lead, on one shared programme governance.',
    whenToUse: [
      'Major capital or technology programme requiring integrated delivery',
      'Multi-stream transformation with hard interdependencies',
      'Programmes where vendor handoffs would compromise outcomes',
      'Cross-jurisdictional programmes needing one accountable owner',
    ],
    outcomes: [
      'Delivered systems, platforms, and services',
      'Realised business benefits, instrumented and reported',
      'Operating-model changes embedded in client organisations',
      'Programme assurance evidence at every gate',
    ],
  },
  {
    id: 'managed-services',
    index: '03',
    name: 'Managed Services',
    appliesWhen: 'Running the system',
    scope: 'Operational ownership',
    duration: 'Ongoing — multi-year',
    team: 'Service teams sized to SLA — typically 8 – 40+',
    governance: 'Service-level agreements, monthly service reviews',
    description:
      'Long-term operation of systems, networks, and back-office functions on behalf of the client. Typically used after a programme delivery to provide stability while client teams are built up.',
    whenToUse: [
      'Operating systems the client doesn\'t want to staff in-house',
      'Specialist functions (network operations, payments, regulatory reporting)',
      'Bridge to capability transfer once internal teams are ready',
      'Sustained second-line assurance for critical infrastructure',
    ],
    outcomes: [
      'Service performance against agreed SLAs',
      'Operational stability and continuity',
      'Cost-to-serve transparency and improvement',
      'Reduced client operational burden',
    ],
  },
  {
    id: 'capability-transfer',
    index: '04',
    name: 'Capability Transfer',
    appliesWhen: 'Handing over to client teams',
    scope: 'Embedded knowledge transfer',
    duration: '6 – 18 months',
    team: 'Embedded specialists alongside client staff',
    governance: 'Joint client-firm steering, quarterly capability reviews',
    description:
      'Embedded teams that transfer skills, methods, and operating models to client organisations — designed in from day one. The end state is client teams owning the capability without us.',
    whenToUse: [
      'Building in-house capability after programme delivery',
      'Standing up new functions inside the client organisation',
      'Transitioning from managed services to client ownership',
      'Public-sector mandates with capability-transfer requirements',
    ],
    outcomes: [
      'Client teams operating independently',
      'Documented operating model and playbooks',
      'Trained leadership and operational staff',
      'Reduced or eliminated dependency on the firm',
    ],
  },
];

const EngagementModelsPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Engagement Models — four ways institutions engage with us"
        description="Advisory, Programme Delivery, Managed Services, and Capability Transfer — engagement shapes that scale to the complexity and time horizon of each transformation."
        path="/engagement-models"
      />
      <PageHeader
        eyebrow="Engagement Models"
        index="E.01"
        title={
          <>
            Four ways institutions{' '}
            <span className="font-editorial italic text-brand-accent">engage with us</span>.
          </>
        }
        subtitle="From short advisory mandates through multi-year programme delivery, our engagement models scale to the complexity and time horizon of each transformation. Engagements can begin at any phase and combine across phases as the programme matures."
      />

      {/* Sequential pathway summary */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Engagement Pathway"
            index="02"
            title={
              <>
                A sequential model — but engagements may{' '}
                <span className="font-editorial italic text-brand-accent">enter or exit at any phase</span>.
              </>
            }
            intro="The default progression runs Advisory → Programme Delivery → Managed Services → Capability Transfer. In practice, most engagements pick one or two phases and combine them based on the client's institutional context."
          />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-brand-hair-strong border border-brand-hair-strong">
            {models.map((m, idx) => (
              <a
                key={m.id}
                href={`#model-${m.id}`}
                className="group relative bg-brand-paper p-7 md:p-8 hover:bg-brand-stone transition-colors"
              >
                <div className="flex items-baseline gap-3 mb-5">
                  <span className="label-technical text-brand-accent font-mono-tab">
                    E.{m.index}
                  </span>
                  <span className="label-technical text-brand-mute">
                    Phase {idx + 1} of {models.length}
                  </span>
                </div>
                <h3 className="font-display text-[20px] md:text-[22px] font-medium tracking-[-0.015em] text-brand-ink leading-tight group-hover:text-brand-accent transition-colors">
                  {m.name}
                </h3>
                <div className="mt-3 mb-4 inline-flex items-center gap-2 px-2.5 py-1 border border-brand-hair-strong">
                  <span className="block w-1.5 h-1.5 bg-brand-accent" aria-hidden />
                  <span className="label-technical text-brand-ink-2">{m.appliesWhen}</span>
                </div>
                <p className="text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-3">
                  {m.description}
                </p>

                {idx < models.length - 1 && (
                  <span
                    className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-6 h-6 items-center justify-center text-brand-accent z-10 bg-brand-paper border border-brand-hair-strong"
                    aria-hidden
                  >
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </span>
                )}
              </a>
            ))}
          </div>
        </Container>
      </Section>

      {/* Per-model detail */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Model Detail"
            index="03"
            title={
              <>
                When each model{' '}
                <span className="font-editorial italic text-brand-accent">applies</span>.
              </>
            }
            intro="Scope, duration, team composition, and governance posture for each engagement model — plus the typical situations where each is the right shape for the work."
          />

          <div className="space-y-12">
            {models.map((m) => (
              <article
                key={m.id}
                id={`model-${m.id}`}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12 border-t-2 border-brand-ink"
              >
                <header className="lg:col-span-4">
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono-tab text-[28px] tracking-[-0.02em] text-brand-accent leading-none">
                      E.{m.index}
                    </span>
                    <span className="label-technical text-brand-mute">Engagement Model</span>
                  </div>
                  <h3 className="font-display text-[28px] md:text-[36px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.05]">
                    {m.name}
                  </h3>
                  <p className="mt-5 font-editorial italic text-[16px] leading-[1.5] text-brand-ink-2">
                    {m.description}
                  </p>

                  {/* Spec ledger */}
                  <dl className="mt-7 border-t border-brand-hair">
                    {[
                      ['Scope',      m.scope],
                      ['Duration',   m.duration],
                      ['Team',       m.team],
                      ['Governance', m.governance],
                    ].map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[auto_1fr] gap-x-6 py-3 border-b border-brand-hair items-baseline">
                        <dt className="label-technical text-brand-mute">{k}</dt>
                        <dd className="text-[13px] text-brand-ink tracking-tight">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </header>

                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                  <div>
                    <div className="label-technical text-brand-accent mb-4">When to use</div>
                    <ul className="space-y-3 border-t border-brand-hair">
                      {m.whenToUse.map((u, i) => (
                        <li key={u} className="flex items-baseline gap-3 pt-3 border-b border-brand-hair pb-3">
                          <span className="font-mono-tab text-[10px] text-brand-mute shrink-0">
                            U.{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[13.5px] leading-[1.55] text-brand-ink">{u}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="label-technical text-brand-accent mb-4">Typical Outcomes</div>
                    <ul className="space-y-3 border-t border-brand-hair">
                      {m.outcomes.map((o, i) => (
                        <li key={o} className="flex items-baseline gap-3 pt-3 border-b border-brand-hair pb-3">
                          <span className="font-mono-tab text-[10px] text-brand-mute shrink-0">
                            O.{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[13.5px] leading-[1.55] text-brand-ink">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Comparison matrix */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Comparison Matrix"
            index="04"
            title={
              <>
                Models{' '}
                <span className="font-editorial italic text-brand-accent">side by side</span>.
              </>
            }
            intro="A condensed view of the four engagement shapes for institutional clients evaluating which fits the mandate."
          />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-t-2 border-b border-brand-ink">
                  <th className="text-left py-4 pr-6 label-technical text-brand-mute"> </th>
                  {models.map((m) => (
                    <th key={m.id} className="text-left py-4 pr-6 align-bottom">
                      <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-1">E.{m.index}</div>
                      <div className="font-display text-[15px] font-medium text-brand-ink">{m.name}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['When',       (m: EngagementModel) => m.appliesWhen],
                  ['Scope',      (m: EngagementModel) => m.scope],
                  ['Duration',   (m: EngagementModel) => m.duration],
                  ['Team',       (m: EngagementModel) => m.team],
                  ['Governance', (m: EngagementModel) => m.governance],
                ].map(([label, getter]) => (
                  <tr key={label as string} className="border-b border-brand-hair">
                    <td className="py-4 pr-6 label-technical text-brand-mute align-top">{label as string}</td>
                    {models.map((m) => (
                      <td key={m.id} className="py-4 pr-6 text-[13px] text-brand-ink-2 leading-[1.55] align-top">
                        {(getter as (m: EngagementModel) => string)(m)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-12 pt-10 border-t border-brand-hair flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="label-technical text-brand-mute">Related</span>
            <Link to="/methodology" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Delivery Methodology <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/services" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Capability Pillars <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/industries" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Industries Served <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory" divided>
        <Container size="narrow">
          <TechnicalLabel index="05">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.04] tracking-[-0.015em] text-brand-ink">
            Discuss the right engagement model for your{' '}
            <span className="font-editorial italic text-brand-accent">mandate</span>.
          </h2>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/methodology">Delivery Methodology</SecondaryCta>
            <TertiaryCta to="/leadership">Leadership Doctrine</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default EngagementModelsPage;
