import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, MapPin, ArrowLeft } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { practitioners } from '@/data/team';
import { pillars } from '@/data/servicesPage';

const pillarById = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

const FilterChip: React.FC<{
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ label, active, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`px-3 py-1.5 text-[12.5px] font-medium tracking-tight border transition-colors ${
      active
        ? 'bg-brand-ink border-brand-ink text-brand-ivory'
        : 'bg-brand-paper border-brand-hair-strong text-brand-ink-2 hover:border-brand-ink hover:text-brand-ink'
    }`}
  >
    {label}
  </button>
);

const LeadershipTeamPage: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    if (filter === 'all') return practitioners;
    return practitioners.filter((p) => p.practiceArea === filter);
  }, [filter]);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Leadership Team — practice leads across the firm"
        description="Practice leads across Engineering & Infrastructure, Financial & Legal Advisory, Digital Transformation & Technology, Education & Institutional Development, and Enterprise Strategy — plus firm-wide leadership."
        path="/leadership/team"
      />

      <PageHeader
        eyebrow="Leadership Team"
        index="LD.02"
        title={
          <>
            Practice leads across the{' '}
            <span className="font-editorial italic text-brand-accent">firm</span>.
          </>
        }
        subtitle="The partners and practice leads accountable for engagements across the firm's five capability pillars and firm-wide functions."
      />

      {/* Filter rail */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container>
          <div className="py-6 flex items-baseline gap-6 overflow-x-auto">
            <span className="label-technical text-brand-mute shrink-0">Filter by practice</span>
            <div className="flex flex-wrap gap-2">
              <FilterChip label="All practitioners" active={filter === 'all'} onClick={() => setFilter('all')} />
              <FilterChip label="Firm-wide" active={filter === 'firm'} onClick={() => setFilter('firm')} />
              {pillars.map((p) => (
                <FilterChip
                  key={p.id}
                  label={`${p.index} · ${p.name}`}
                  active={filter === p.id}
                  onClick={() => setFilter(p.id)}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Practitioner grid */}
      <Section tone="paper">
        <Container>
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-brand-hair">
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent font-mono-tab">{String(filtered.length).padStart(2, '0')}</span>{' '}
              of {String(practitioners.length).padStart(2, '0')} practitioners
            </span>
            {filter !== 'all' && (
              <button
                onClick={() => setFilter('all')}
                className="label-technical text-brand-ink hover:text-brand-accent transition-colors"
              >
                Clear filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
            {filtered.map((p, idx) => {
              const pillar = pillarById[p.practiceArea];
              return (
                <article
                  key={p.id}
                  className="border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper"
                >
                  {/* Initials block + index */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 border border-brand-ink bg-brand-paper text-brand-ink font-display font-medium text-[18px] tracking-[-0.01em] flex items-center justify-center">
                      {p.initials}
                    </div>
                    <span className="label-technical text-brand-accent font-mono-tab">
                      LD.{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-display text-[20px] md:text-[22px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[13.5px] text-brand-ink-2 leading-snug">{p.title}</p>

                  {/* Meta */}
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1.5">
                    <span className="label-technical text-brand-mute inline-flex items-center gap-1.5">
                      <MapPin size={11} /> {p.location}
                    </span>
                    <span className="text-brand-hair-strong" aria-hidden>·</span>
                    <span className="label-technical text-brand-mute font-mono-tab">Since {p.since}</span>
                  </div>

                  {/* Bio */}
                  <p className="mt-5 text-[13.5px] leading-[1.65] text-brand-ink-2">
                    {p.bio}
                  </p>

                  {/* Expertise tags */}
                  <div className="mt-6 pt-5 border-t border-brand-hair">
                    <div className="label-technical text-brand-mute mb-3">Expertise</div>
                    <ul className="flex flex-wrap gap-1.5">
                      {p.expertise.map((e) => (
                        <li
                          key={e}
                          className="inline-flex items-baseline gap-1.5 px-2 py-0.5 border border-brand-hair-strong text-[11.5px] text-brand-ink"
                        >
                          {e}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer: practice link + LinkedIn */}
                  <div className="mt-6 pt-5 border-t border-brand-hair flex items-center justify-between">
                    {pillar ? (
                      <Link
                        to="/services#pillars"
                        className="label-technical text-brand-accent hover:underline"
                      >
                        {pillar.index} · {pillar.name.split(' & ')[0]}
                      </Link>
                    ) : (
                      <span className="label-technical text-brand-mute">Firm-wide</span>
                    )}
                    {p.linkedin && (
                      <a
                        href={p.linkedin}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${p.name} on LinkedIn`}
                        className="text-brand-mute hover:text-brand-accent transition-colors"
                      >
                        <Linkedin size={14} />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-12">
            <Link
              to="/leadership"
              className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to Leadership Doctrine
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory" divided>
        <Container size="narrow">
          <div className="border-t-2 border-brand-ink pt-12">
            <TechnicalLabel index="ENG">Engage With Us</TechnicalLabel>
            <h2 className="mt-8 font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
              Engage with the relevant{' '}
              <span className="font-editorial italic text-brand-accent">practice lead</span>{' '}
              for your sector.
            </h2>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.65] text-brand-ink-2">
              The firm routes incoming engagements directly to the practice lead
              accountable for that sector. Initial conversations are partner-led,
              not gated by a sales desk.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/case-studies">Engagement Evidence</SecondaryCta>
              <TertiaryCta to="/services">Explore Capabilities</TertiaryCta>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LeadershipTeamPage;
