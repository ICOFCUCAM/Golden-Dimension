import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, Send, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { industries, pillars } from '@/data/servicesPage';

/**
 * Multi-step engagement intake form. Replaces the single message form on
 * /contact. Four steps: Sector → Capability → Timeline → Contact.
 *
 * On submit, posts a structured payload as JSON in the `message` field of
 * the existing `contact_messages` Supabase table — so no schema change is
 * required. Admin Inbox will display the JSON; readable as-is.
 */

interface FormState {
  sectorId: string;
  pillarId: string;
  timeline: string;
  name: string;
  email: string;
  organisation: string;
  message: string;
}

const empty: FormState = {
  sectorId: '',
  pillarId: '',
  timeline: '',
  name: '',
  email: '',
  organisation: '',
  message: '',
};

const timelines = [
  { id: 'immediate',  label: 'Immediate',                 desc: 'We need to begin within the next 4 weeks.' },
  { id: 'q1',         label: 'This quarter',              desc: 'Targeting kickoff in the next 8–12 weeks.' },
  { id: 'q2-q3',      label: '3–6 months',                desc: 'Active planning; engagement decision pending.' },
  { id: '6plus',      label: '6+ months',                 desc: 'Strategic horizon; framing options now.' },
  { id: 'exploring',  label: 'Exploring',                 desc: 'No fixed timeline; gathering perspective.' },
];

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 bg-brand-paper border text-[15px] text-brand-ink placeholder:text-brand-mute focus:outline-none transition-colors ${
    hasError ? 'border-red-500/60 focus:border-red-600' : 'border-brand-hair-strong focus:border-brand-ink'
  }`;

const SelectionCard: React.FC<{
  index: string;
  title: string;
  subtitle?: string;
  active: boolean;
  onClick: () => void;
}> = ({ index, title, subtitle, active, onClick }) => (
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
    <div className="flex items-baseline gap-3">
      <span className={`label-technical font-mono-tab ${active ? 'text-brand-accent' : 'text-brand-mute'}`}>
        {index}
      </span>
      <div className="flex-1">
        <div className="text-[15px] font-medium tracking-tight text-brand-ink">{title}</div>
        {subtitle && <div className="mt-1 text-[12.5px] text-brand-ink-2 leading-snug">{subtitle}</div>}
      </div>
      {active && <Check size={14} className="text-brand-accent shrink-0" />}
    </div>
  </button>
);

interface EngagementIntakeFormProps {
  onComplete?: () => void;
}

const STEPS = ['Sector', 'Capability', 'Timeline', 'Contact'] as const;

export const EngagementIntakeForm: React.FC<EngagementIntakeFormProps> = ({ onComplete }) => {
  const [step, setStep]       = useState(0);
  const [data, setData]       = useState<FormState>(empty);
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [submitting, setSub]  = useState(false);
  const [done, setDone]       = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setData((prev) => ({ ...prev, [k]: v }));
    if (errors[k as string]) setErrors((prev) => ({ ...prev, [k as string]: '' }));
  };

  const validateStep = (s: number): boolean => {
    const e: Record<string, string> = {};
    if (s === 0 && !data.sectorId)  e.sectorId = 'Choose the sector closest to your engagement';
    if (s === 1 && !data.pillarId)  e.pillarId = 'Choose a primary capability area';
    if (s === 2 && !data.timeline)  e.timeline = 'Choose a timeline';
    if (s === 3) {
      if (!data.name.trim())  e.name = 'Name is required';
      if (!data.email.trim()) e.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
      if (!data.message.trim()) e.message = 'A short note about your engagement is required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;
    setSub(true);

    // Format the structured payload as a readable message body so the
    // existing Admin Inbox renders it cleanly without a schema change.
    const sector = industries.find((i) => i.id === data.sectorId);
    const pillar = pillars.find((p) => p.id === data.pillarId);
    const timeline = timelines.find((t) => t.id === data.timeline);
    const body =
      `[Engagement Intake]\n\n` +
      `Sector:       ${sector?.name ?? data.sectorId}\n` +
      `Capability:   ${pillar ? `${pillar.index} ${pillar.name}` : data.pillarId}\n` +
      `Timeline:     ${timeline?.label ?? data.timeline}\n` +
      `Organisation: ${data.organisation || '—'}\n\n` +
      `--- Notes ---\n${data.message}`;

    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: data.name.trim(),
        email: data.email.trim(),
        message: body,
      });
      if (error) throw error;
      setDone(true);
      toast.success('Engagement intake received. A partner will respond within one business day.');
      onComplete?.();
    } catch (err: any) {
      toast.error('Submission failed — please try again or email us directly.');
      console.error(err);
    } finally {
      setSub(false);
    }
  };

  if (done) {
    return (
      <div className="border border-brand-accent bg-brand-accent-tint p-8 md:p-10">
        <div className="flex items-baseline gap-3 mb-6">
          <Check size={18} className="text-brand-accent" />
          <span className="label-technical text-brand-accent">Intake Received</span>
        </div>
        <h3 className="font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
          Thank you, {data.name.split(' ')[0]}.
        </h3>
        <p className="mt-4 text-[15.5px] leading-[1.65] text-brand-ink-2 max-w-xl">
          Your engagement intake has been routed to the partner accountable for{' '}
          {industries.find((i) => i.id === data.sectorId)?.name.toLowerCase()}. You can expect
          a partner-led response within one business day — not a sales follow-up.
        </p>
        <button
          type="button"
          onClick={() => { setData(empty); setStep(0); setDone(false); setErrors({}); }}
          className="mt-7 inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
        >
          Submit another intake
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} aria-label="Engagement intake — four steps">
      {/* Step indicator */}
      <div className="mb-8 pb-5 border-b border-brand-hair-strong">
        <div className="flex items-baseline justify-between mb-3">
          <span className="label-technical text-brand-accent font-mono-tab">
            STEP {String(step + 1).padStart(2, '0')} / {String(STEPS.length).padStart(2, '0')}
          </span>
          <span className="label-technical text-brand-mute">{STEPS[step]}</span>
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`h-1 transition-colors ${
                i <= step ? 'bg-brand-accent' : 'bg-brand-hair-strong'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1 — Sector */}
      {step === 0 && (
        <div>
          <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
            Which sector is closest to your engagement?
          </h3>
          <p className="mt-3 text-[14px] text-brand-ink-2">
            We'll route the intake to the partner accountable for that sector.
          </p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {industries.map((s, i) => (
              <SelectionCard
                key={s.id}
                index={`S.${String(i + 1).padStart(2, '0')}`}
                title={s.name}
                subtitle={s.description}
                active={data.sectorId === s.id}
                onClick={() => set('sectorId', s.id)}
              />
            ))}
          </div>
          {errors.sectorId && (
            <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-red-600">
              <AlertCircle size={12} /> {errors.sectorId}
            </p>
          )}
        </div>
      )}

      {/* Step 2 — Capability */}
      {step === 1 && (
        <div>
          <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
            Which capability area applies?
          </h3>
          <p className="mt-3 text-[14px] text-brand-ink-2">
            Pick the primary one. Most engagements combine multiple — we'll work that out together.
          </p>
          <div className="mt-7 grid grid-cols-1 gap-3">
            {pillars.map((p) => (
              <SelectionCard
                key={p.id}
                index={p.index}
                title={p.name}
                subtitle={p.tagline}
                active={data.pillarId === p.id}
                onClick={() => set('pillarId', p.id)}
              />
            ))}
          </div>
          {errors.pillarId && (
            <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-red-600">
              <AlertCircle size={12} /> {errors.pillarId}
            </p>
          )}
        </div>
      )}

      {/* Step 3 — Timeline */}
      {step === 2 && (
        <div>
          <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
            What's the engagement timeline?
          </h3>
          <p className="mt-3 text-[14px] text-brand-ink-2">
            A rough sense is enough. We use this to route to the right team.
          </p>
          <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {timelines.map((t, i) => (
              <SelectionCard
                key={t.id}
                index={`T.${String(i + 1).padStart(2, '0')}`}
                title={t.label}
                subtitle={t.desc}
                active={data.timeline === t.id}
                onClick={() => set('timeline', t.id)}
              />
            ))}
          </div>
          {errors.timeline && (
            <p className="mt-4 inline-flex items-center gap-2 text-[12.5px] text-red-600">
              <AlertCircle size={12} /> {errors.timeline}
            </p>
          )}
        </div>
      )}

      {/* Step 4 — Contact */}
      {step === 3 && (
        <div>
          <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
            Tell us how to reach you.
          </h3>
          <p className="mt-3 text-[14px] text-brand-ink-2">
            A partner will respond within one business day.
          </p>

          <div className="mt-7 space-y-5">
            <div>
              <label className="label-technical text-brand-mute mb-2 block">Full name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Your name"
                className={inputClass(!!errors.name)}
              />
              {errors.name && <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600"><AlertCircle size={12} /> {errors.name}</p>}
            </div>
            <div>
              <label className="label-technical text-brand-mute mb-2 block">Email address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="you@organisation.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600"><AlertCircle size={12} /> {errors.email}</p>}
            </div>
            <div>
              <label className="label-technical text-brand-mute mb-2 block">Organisation <span className="text-brand-mute font-normal normal-case tracking-normal">(optional)</span></label>
              <input
                type="text"
                value={data.organisation}
                onChange={(e) => set('organisation', e.target.value)}
                placeholder="Your organisation"
                className={inputClass(false)}
              />
            </div>
            <div>
              <label className="label-technical text-brand-mute mb-2 block">A few lines on the engagement</label>
              <textarea
                value={data.message}
                onChange={(e) => set('message', e.target.value)}
                placeholder="The institutional outcome you're working toward, and any constraints we should know about."
                rows={5}
                className={`${inputClass(!!errors.message)} resize-none`}
              />
              {errors.message && <p className="mt-2 inline-flex items-center gap-2 text-[12.5px] text-red-600"><AlertCircle size={12} /> {errors.message}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Step controls */}
      <div className="mt-9 pt-6 border-t border-brand-hair flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>

        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={next}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-tight hover:bg-brand-accent transition-colors"
          >
            Continue
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-tight hover:bg-brand-accent transition-colors disabled:opacity-60"
          >
            {submitting ? (
              <>
                <span className="w-3.5 h-3.5 border border-brand-ivory/30 border-t-brand-ivory rounded-full animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <Send size={13} />
                Submit Engagement Intake
              </>
            )}
          </button>
        )}
      </div>
    </form>
  );
};

export default EngagementIntakeForm;
