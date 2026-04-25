import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
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
import { industries, pillars } from '@/data/servicesPage';

const pillarById = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

const SectorPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const sector = industries.find((s) => s.id === sectorId);
  if (!sector) return <Navigate to="/industries" replace />;

  const sectorIndex = industries.findIndex((s) => s.id === sectorId);
  const otherSectors = industries.filter((s) => s.id !== sectorId);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title={`${sector.name} — sector capability`}
        description={sector.summary}
        path={`/industries/${sector.id}`}
      />

      <PageHeader
        eyebrow={`Sector · S.${String(sectorIndex + 1).padStart(2, '0')}`}
        index={`S.${String(sectorIndex + 1).padStart(2, '0')}`}
        title={
          <span>
            {sector.name}
            <span className="block mt-3 font-editorial italic text-brand-accent text-[24px] md:text-[32px] lg:text-[36px] leading-[1.2]">
              {sector.impact}
            </span>
          </span>
        }
        subtitle={
          <div>
            <div className="flex items-center gap-2 text-[12px] tracking-tight text-brand-mute mb-4">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/industries" className="hover:text-brand-accent transition-colors">Industries</Link>
              <ChevronRight size={12} />
              <span className="text-brand-ink">{sector.name}</span>
            </div>
            {sector.summary}
          </div>
        }
      />

      {/* Sector thesis */}
      {sector.thesis && (
        <Section tone="paper">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <aside className="lg:col-span-3">
                <TechnicalLabel index="02">Sector Thesis</TechnicalLabel>
                <p className="mt-6 label-technical text-brand-mute leading-relaxed">
                  How the firm thinks
                  <br />
                  about transformation
                  <br />
                  in this sector.
                </p>
              </aside>
              <article className="lg:col-span-9 max-w-3xl">
                <h2 className="font-display text-[24px] md:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.15]">
                  Where the seam usually breaks — and how we engage with it.
                </h2>
                <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                  {sector.thesis}
                </p>
              </article>
            </div>
          </Container>
        </Section>
      )}

      {/* Workstreams */}
      {sector.workstreams && (
        <Section tone="ivory" divided>
          <Container>
            <SectionHeader
              eyebrow="Workstreams"
              index="03"
              title={
                <>
                  How sector engagements typically{' '}
                  <span className="font-editorial italic text-brand-accent">break down</span>.
                </>
              }
              intro="Most sector mandates pick one or two workstreams; complex programmes engage all of them under one accountable lead."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
              {sector.workstreams.map((w, i) => (
                <article key={w.name} className="border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper">
                  <div className="label-technical text-brand-accent mb-5 font-mono-tab">
                    W.{String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="font-display text-[19px] md:text-[21px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    {w.name}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.6] text-brand-ink-2">
                    {w.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Signals + Outcomes side-by-side */}
      {(sector.signals || sector.outcomes) && (
        <Section tone="paper">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              {sector.signals && (
                <div>
                  <TechnicalLabel index="04">Engagement Signals</TechnicalLabel>
                  <h3 className="mt-7 font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    When institutions typically engage us.
                  </h3>
                  <ul className="mt-7 border-t border-brand-hair">
                    {sector.signals.map((s, i) => (
                      <li key={s} className="grid grid-cols-[auto_1fr] gap-4 py-4 border-b border-brand-hair items-baseline">
                        <span className="font-mono-tab text-[10px] text-brand-accent shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[14.5px] leading-[1.55] text-brand-ink-2">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sector.outcomes && (
                <div>
                  <TechnicalLabel index="05">Target Outcomes</TechnicalLabel>
                  <h3 className="mt-7 font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                    What we aim at, measurably.
                  </h3>
                  <ul className="mt-7 border-t border-brand-hair">
                    {sector.outcomes.map((o, i) => (
                      <li key={o} className="grid grid-cols-[auto_1fr] gap-4 py-4 border-b border-brand-hair items-baseline">
                        <span className="font-mono-tab text-[10px] text-brand-accent shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[14.5px] leading-[1.55] text-brand-ink-2">{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Capability pillars engaged */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Capability Pillars Engaged"
            index="06"
            title={
              <>
                The pillars typically combined for{' '}
                <span className="font-editorial italic text-brand-accent">
                  {sector.name.toLowerCase()}
                </span>{' '}
                engagements.
              </>
            }
            intro="Engagements are staffed across these pillars from day one. Specific mix is tailored per mandate."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
            {sector.pillars.map((pid) => {
              const p = pillarById[pid];
              if (!p) return null;
              return (
                <Link
                  key={pid}
                  to="/services#pillars"
                  className="group border-r border-b border-brand-hair p-7 bg-brand-paper hover:bg-brand-stone transition-colors"
                >
                  <span className="label-technical text-brand-accent font-mono-tab">{p.index}</span>
                  <h3 className="mt-3 font-display text-[18px] md:text-[20px] font-medium tracking-[-0.015em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-3">
                    {p.tagline}
                  </p>
                  <ArrowRight size={13} className="mt-5 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Case example (anonymised) */}
      {sector.caseExample && (
        <Section tone="ink">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              <aside className="lg:col-span-3">
                <TechnicalLabel index="07" tone="dark">Engagement Example</TechnicalLabel>
                <p className="mt-6 label-technical text-brand-on-dark-2 leading-relaxed">
                  An anonymised
                  <br />
                  illustration of how
                  <br />
                  the practice engages.
                </p>
              </aside>

              <div className="lg:col-span-9 max-w-3xl space-y-8">
                <div>
                  <div className="label-technical text-brand-accent-soft mb-3">Context</div>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-brand-on-dark">
                    {sector.caseExample.context}
                  </p>
                </div>
                <div className="border-t border-white/15 pt-8">
                  <div className="label-technical text-brand-accent-soft mb-3">Intervention</div>
                  <p className="text-[16px] md:text-[17px] leading-[1.65] text-brand-on-dark">
                    {sector.caseExample.intervention}
                  </p>
                </div>
                <div className="border-t border-white/15 pt-8">
                  <div className="label-technical text-brand-accent-soft mb-3">Outcome</div>
                  <p className="font-editorial italic text-[18px] md:text-[20px] leading-[1.5] text-brand-on-dark">
                    {sector.caseExample.outcome}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Other sectors + CTA */}
      <Section tone="paper" divided>
        <Container>
          <div className="mb-10">
            <TechnicalLabel index="08">Other Sectors</TechnicalLabel>
            <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
              Continue across the practice.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair mb-12">
            {otherSectors.map((s) => (
              <Link
                key={s.id}
                to={`/industries/${s.id}`}
                className="group border-r border-b border-brand-hair p-6 bg-brand-paper hover:bg-brand-stone transition-colors"
              >
                <h3 className="font-display text-[17px] font-medium tracking-[-0.015em] text-brand-ink group-hover:text-brand-accent transition-colors">
                  {s.name}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.55] text-brand-ink-2 line-clamp-2">
                  {s.description}
                </p>
                <ArrowRight size={13} className="mt-4 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
              </Link>
            ))}
          </div>

          <div className="border-t-2 border-brand-ink pt-12">
            <TechnicalLabel index="09">Engage With Us</TechnicalLabel>
            <h2 className="mt-8 font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
              Discuss a {sector.name.toLowerCase()}{' '}
              <span className="font-editorial italic text-brand-accent">engagement</span>.
            </h2>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
              <TertiaryCta to="/industries">All Industries</TertiaryCta>
            </div>
            <Link to="/industries" className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent mt-8 transition-colors">
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              Back to all industries
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default SectorPage;
