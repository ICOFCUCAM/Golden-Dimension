import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, RotateCcw, Check, Compass, Wrench, Activity, Users } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  PrimaryCta,
  SecondaryCta,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { industries, pillars } from '@/data/servicesPage';
import { engagementModelsById } from '@/data/caseStudies';

/**
 * Capability Configurator.
 *
 * Three questions:
 *   1. What are you trying to do?  (intent → engagement model)
 *   2. Which sector?               (sector → industry slug)
 *   3. When do you need to act?    (timeline → urgency)
 *
 * The recommendation logic is intentionally simple and explainable.
 * The recommendation isn't a binding answer — it's a starting point
 * for a partner conversation, with deep-links to the relevant pages.
 */

type IntentId = 'diagnose' | 'deliver' | 'run' | 'transfer';
type TimelineId = 'immediate' | 'this-quarter' | 'longer';

interface Intent {
  id: IntentId;
  label: string;
  desc: string;
  icon: React.ReactNode;
  defaultModel: 'advisory' | 'programme-delivery' | 'managed-services' | 'capability-transfer';
}

const intents: Intent[] = [
  {
    id: 'diagnose',
    label: 'Diagnose or decide',
    desc: 'Frame a strategic question, build the case, get an independent read before we commit.',
    icon: <Compass size={18} />,
    defaultModel: 'advisory',
  },
  {
    id: 'deliver',
    label: 'Build & deliver',
    desc: 'Execute a major programme end to end — strategy through systems, integrated.',
    icon: <Wrench size={18} />,
    defaultModel: 'programme-delivery',
  },
  {
    id: 'run',
    label: 'Run & sustain',
    desc: 'Operate a system, network, or back-office function on our shoulders for now.',
    icon: <Activity size={18} />,
    defaultModel: 'managed-services',
  },
  {
    id: 'transfer',
    label: 'Build internal capability',
    desc: 'Embed expertise in our team and hand the operating model back to us.',
    icon: <Users size={18} />,
    defaultModel: 'capability-transfer',
  },
];

const timelines: { id: TimelineId; label: string; desc: string; urgency: string }[] = [
  { id: 'immediate',    label: 'Within 4 weeks',     desc: 'We need to begin imminently.',                       urgency: 'High urgency' },
  { id: 'this-quarter', label: '1–3 months',          desc: 'Active planning; engagement decision pending.',     urgency: 'Standard' },
  { id: 'longer',       label: '3+ months / exploring', desc: 'Strategic horizon; framing options now.',         urgency: 'Strategic' },
];

// Sector → preferred pillar mapping (drawn from the Industry data).
// First pillar in each industry's `pillars` array is treated as the
// primary recommendation.
const sectorPrimaryPillar: Record<string, string> = Object.fromEntries(
  industries.map((i) => [i.id, i.pillars[0]])
);

const STEPS = ['Intent', 'Sector', 'Timeline'] as const;

const StepCard: React.FC<{
  index: string;
  title: string;
  subtitle?: string;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}> = ({ index, title, subtitle, active, onClick, icon }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`w-full text-left p-5 border transition-colors ${
      active
        ? 'border-brand-ink bg-brand-stone'
        : 'border-brand-hair-strong bg-brand-paper hover:border-brand-ink hover:bg-brand-stone'
    }`}
  >
    <div className="flex items-start gap-4">
      <span className={`label-technical font-mono-tab pt-1 ${active ? 'text-brand-accent' : 'text-brand-mute'}`}>
        {index}
      </span>
      <div className="flex-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[15px] font-medium tracking-tight text-brand-ink">{title}</span>
          {active && <Check size={14} className="text-brand-accent shrink-0" />}
        </div>
        {subtitle && <p className="mt-1 text-[12.5px] text-brand-ink-2 leading-snug">{subtitle}</p>}
      </div>
      {icon && <span className="text-brand-mute shrink-0 pt-0.5">{icon}</span>}
    </div>
  </button>
);

const ConfiguratorPage: React.FC = () => {
  const [step, setStep]               = useState(0);
  const [intentId, setIntentId]       = useState<IntentId | null>(null);
  const [sectorId, setSectorId]       = useState<string | null>(null);
  const [timelineId, setTimelineId]   = useState<TimelineId | null>(null);

  const reset = () => {
    setStep(0);
    setIntentId(null);
    setSectorId(null);
    setTimelineId(null);
  };

  const next = () => setStep((s) => Math.min(STEPS.length, s + 1));
  const back = () => setStep((s) => Math.max(0, s - 1));

  const recommendation = useMemo(() => {
    if (!intentId || !sectorId || !timelineId) return null;
    const intent = intents.find((i) => i.id === intentId)!;
    const sector = industries.find((i) => i.id === sectorId)!;
    const pillarId = sectorPrimaryPillar[sectorId] || 'enterprise-strategy';
    const pillar = pillars.find((p) => p.id === pillarId)!;
    const timeline = timelines.find((t) => t.id === timelineId)!;
    const modelId = intent.defaultModel;
    const modelName = engagementModelsById[modelId];
    return { intent, sector, pillar, timeline, modelId, modelName };
  }, [intentId, sectorId, timelineId]);

  const canContinue = (s: number) =>
    (s === 0 && !!intentId) ||
    (s === 1 && !!sectorId) ||
    (s === 2 && !!timelineId);

  const onResultStep = step === STEPS.length;

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Capability Configurator — find the right engagement shape"
        description="Three questions on your intent, sector, and timeline. The configurator suggests the engagement model and capability pillar most likely to fit — as a starting point for a partner conversation."
        path="/engagement-models/configurator"
      />

      <PageHeader
        eyebrow="Configurator"
        index="EC.01"
        title={
          <>
            Find the right{' '}
            <span className="font-editorial italic text-brand-accent">engagement shape</span>{' '}
            for your mandate.
          </>
        }
        subtitle="Three short questions. The recommendation isn't a binding answer — it's a starting point for a partner conversation, deep-linked to the relevant pages."
      />

      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left rail — step indicator */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <TechnicalLabel index="02">Three Questions</TechnicalLabel>
                <ol className="mt-7 space-y-3">
                  {STEPS.map((label, i) => {
                    const completed = i < step;
                    const active = i === step;
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => i <= step && setStep(i)}
                          disabled={i > step}
                          className={`w-full flex items-baseline gap-3 py-2 border-l-2 pl-3 transition-colors ${
                            active
                              ? 'border-brand-accent text-brand-ink'
                              : completed
                                ? 'border-brand-ink text-brand-ink-2 hover:text-brand-ink'
                                : 'border-brand-hair text-brand-mute cursor-default'
                          }`}
                        >
                          <span className="font-mono-tab text-[10px] tracking-widest shrink-0">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[13px] tracking-tight">{label}</span>
                        </button>
                      </li>
                    );
                  })}
                  <li>
                    <div
                      className={`flex items-baseline gap-3 py-2 border-l-2 pl-3 ${
                        onResultStep
                          ? 'border-brand-accent text-brand-ink'
                          : 'border-brand-hair text-brand-mute'
                      }`}
                    >
                      <span className="font-mono-tab text-[10px] tracking-widest shrink-0">→</span>
                      <span className="text-[13px] tracking-tight">Recommendation</span>
                    </div>
                  </li>
                </ol>
              </div>
            </aside>

            {/* Right column — current step */}
            <div className="lg:col-span-9">
              {/* Step 1 — Intent */}
              {step === 0 && (
                <div>
                  <span className="label-technical text-brand-accent font-mono-tab">Q.01</span>
                  <h2 className="mt-3 font-display text-[24px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    What are you primarily trying to do?
                  </h2>
                  <p className="mt-3 text-[14.5px] text-brand-ink-2 max-w-2xl">
                    Pick the closest match. Most engagements combine more than one — we work that out together.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {intents.map((it, i) => (
                      <StepCard
                        key={it.id}
                        index={`I.${String(i + 1).padStart(2, '0')}`}
                        title={it.label}
                        subtitle={it.desc}
                        active={intentId === it.id}
                        onClick={() => setIntentId(it.id)}
                        icon={it.icon}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 — Sector */}
              {step === 1 && (
                <div>
                  <span className="label-technical text-brand-accent font-mono-tab">Q.02</span>
                  <h2 className="mt-3 font-display text-[24px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    Which sector is closest to your engagement?
                  </h2>
                  <p className="mt-3 text-[14.5px] text-brand-ink-2 max-w-2xl">
                    We use this to suggest the capability pillar likely to lead — and the partner accountable for that sector.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {industries.map((s, i) => (
                      <StepCard
                        key={s.id}
                        index={`S.${String(i + 1).padStart(2, '0')}`}
                        title={s.name}
                        subtitle={s.description}
                        active={sectorId === s.id}
                        onClick={() => setSectorId(s.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 — Timeline */}
              {step === 2 && (
                <div>
                  <span className="label-technical text-brand-accent font-mono-tab">Q.03</span>
                  <h2 className="mt-3 font-display text-[24px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    When do you need to act?
                  </h2>
                  <p className="mt-3 text-[14.5px] text-brand-ink-2 max-w-2xl">
                    A rough sense is enough. We use this to size the right team and the right cadence.
                  </p>
                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {timelines.map((t, i) => (
                      <StepCard
                        key={t.id}
                        index={`T.${String(i + 1).padStart(2, '0')}`}
                        title={t.label}
                        subtitle={t.desc}
                        active={timelineId === t.id}
                        onClick={() => setTimelineId(t.id)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Result */}
              {onResultStep && recommendation && (
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="block h-px w-8 bg-brand-accent" aria-hidden />
                    <span className="label-technical text-brand-accent font-mono-tab">Recommendation</span>
                  </div>
                  <h2 className="font-display text-[28px] md:text-[40px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.05] max-w-3xl">
                    A{' '}
                    <span className="font-editorial italic text-brand-accent">
                      {recommendation.modelName.toLowerCase()}
                    </span>{' '}
                    engagement led from the{' '}
                    <span className="font-editorial italic text-brand-accent">
                      {recommendation.pillar.name.toLowerCase()}
                    </span>{' '}
                    practice, in {recommendation.sector.name.toLowerCase()}.
                  </h2>

                  <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 border-t border-l border-brand-hair-strong">
                    <div className="border-r border-b border-brand-hair-strong p-6 bg-brand-paper">
                      <div className="label-technical text-brand-mute mb-3">Engagement model</div>
                      <div className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
                        {recommendation.modelName}
                      </div>
                      <p className="mt-2 text-[12.5px] leading-[1.55] text-brand-ink-2">
                        Based on your intent: {recommendation.intent.label.toLowerCase()}.
                      </p>
                    </div>
                    <div className="border-r border-b border-brand-hair-strong p-6 bg-brand-paper">
                      <div className="label-technical text-brand-mute mb-3">Lead capability pillar</div>
                      <div className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
                        {recommendation.pillar.index} · {recommendation.pillar.name.split(' & ')[0]}
                      </div>
                      <p className="mt-2 text-[12.5px] leading-[1.55] text-brand-ink-2">
                        Most {recommendation.sector.name.toLowerCase()} engagements lead from this pillar.
                      </p>
                    </div>
                    <div className="border-r border-b border-brand-hair-strong p-6 bg-brand-paper">
                      <div className="label-technical text-brand-mute mb-3">Urgency profile</div>
                      <div className="font-display text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
                        {recommendation.timeline.urgency}
                      </div>
                      <p className="mt-2 text-[12.5px] leading-[1.55] text-brand-ink-2">
                        {recommendation.timeline.label} · we'll size accordingly.
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 p-6 md:p-8 border-l-2 border-brand-accent bg-brand-stone">
                    <p className="font-editorial italic text-[16px] md:text-[18px] leading-[1.5] text-brand-ink">
                      The recommendation is a starting point — not a binding scope. Most
                      engagements combine across pillars and shift between models as the
                      programme matures. A partner from the {recommendation.sector.name.toLowerCase()}{' '}
                      practice will discuss the actual shape with you.
                    </p>
                  </div>

                  <div className="mt-10 flex flex-wrap items-center gap-4">
                    <PrimaryCta to="/contact">Discuss this engagement</PrimaryCta>
                    <Link
                      to={`/industries/${recommendation.sector.id}`}
                      className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                    >
                      View {recommendation.sector.name.toLowerCase()} sector page
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link
                      to="/engagement-models"
                      className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
                    >
                      Compare all engagement models
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <button
                      type="button"
                      onClick={reset}
                      className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-mute hover:text-brand-ink transition-colors"
                    >
                      <RotateCcw size={13} /> Start over
                    </button>
                  </div>
                </div>
              )}

              {/* Step controls (hidden on result) */}
              {!onResultStep && (
                <div className="mt-10 pt-6 border-t border-brand-hair flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    disabled={!canContinue(step)}
                    className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-tight hover:bg-brand-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {step === STEPS.length - 1 ? 'See recommendation' : 'Continue'}
                    <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {/* Cross-link to manual route */}
      <Section tone="ivory" divided>
        <Container size="narrow">
          <div className="border-t-2 border-brand-ink pt-12">
            <span className="label-technical text-brand-accent">Or skip the configurator</span>
            <h2 className="mt-7 font-display text-[24px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              Prefer to write a few lines about the engagement?
            </h2>
            <p className="mt-4 text-[15px] leading-[1.6] text-brand-ink-2 max-w-2xl">
              The contact intake routes your enquiry directly to the partner accountable for your sector — no configurator required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact">Open Engagement Intake</PrimaryCta>
              <SecondaryCta to="/engagement-models">All Engagement Models</SecondaryCta>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ConfiguratorPage;
