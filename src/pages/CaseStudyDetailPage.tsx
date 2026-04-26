import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ChevronRight } from 'lucide-react';
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
import { caseStudies, engagementModelsById } from '@/data/caseStudies';
import { industries, pillars } from '@/data/servicesPage';

const CaseStudyDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const cs = caseStudies.find((c) => c.slug === slug);
  if (!cs) return <Navigate to="/case-studies" replace />;

  const csIndex = caseStudies.findIndex((c) => c.slug === slug);
  const sector  = industries.find((i) => i.id === cs.sectorId);
  const pillar  = pillars.find((p) => p.id === cs.pillarId);
  const related = caseStudies
    .filter((c) => c.slug !== cs.slug && (c.sectorId === cs.sectorId || c.pillarId === cs.pillarId))
    .slice(0, 3);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title={`${cs.title} — case study`}
        description={cs.snippet}
        path={`/case-studies/${cs.slug}`}
        ogType="article"
      />

      <PageHeader
        eyebrow={`Case Study · CS.${String(csIndex + 1).padStart(2, '0')}`}
        index={`CS.${String(csIndex + 1).padStart(2, '0')}`}
        title={cs.title}
        subtitle={
          <div>
            <div className="flex items-center gap-2 text-[12px] tracking-tight text-brand-mute mb-4">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/case-studies" className="hover:text-brand-accent transition-colors">Case Studies</Link>
              <ChevronRight size={12} />
              <span className="text-brand-ink">{sector?.name}</span>
            </div>
            <span className="font-editorial italic text-[18px] md:text-[20px] leading-[1.45] text-brand-ink">
              {cs.snippet}
            </span>
          </div>
        }
      />

      {/* Engagement spec ledger */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            {/* Sidebar — engagement metadata */}
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <TechnicalLabel index="01">Engagement Spec</TechnicalLabel>
                <dl className="mt-7 border-t border-brand-hair">
                  {[
                    ['Client',           cs.client],
                    ['Region',           cs.region],
                    ['Sector',           sector?.name],
                    ['Pillar',           pillar ? `${pillar.index} · ${pillar.name}` : undefined],
                    ['Engagement model', engagementModelsById[cs.engagementModelId]],
                    ['Duration',         cs.duration],
                    ['Year',             cs.year],
                  ].filter(([, v]) => Boolean(v)).map(([k, v]) => (
                    <div key={k as string} className="grid grid-cols-[auto_1fr] gap-x-4 py-3 border-b border-brand-hair items-baseline">
                      <dt className="label-technical text-brand-mute">{k}</dt>
                      <dd className="text-[13px] text-brand-ink tracking-tight">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </aside>

            {/* Main body */}
            <article className="lg:col-span-9 max-w-3xl space-y-12">
              <section>
                <TechnicalLabel index="02">Context</TechnicalLabel>
                <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                  {cs.context}
                </p>
              </section>

              <section className="border-t border-brand-hair pt-12">
                <TechnicalLabel index="03">Intervention</TechnicalLabel>
                <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                  {cs.intervention}
                </p>

                {cs.workstreams.length > 0 && (
                  <div className="mt-10 pt-8 border-t border-brand-hair">
                    <div className="label-technical text-brand-accent mb-5">Workstreams</div>
                    <ul className="space-y-3">
                      {cs.workstreams.map((w, i) => (
                        <li key={w} className="grid grid-cols-[auto_1fr] gap-3 items-baseline">
                          <span className="font-mono-tab text-[10px] text-brand-accent shrink-0">
                            W.{String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[14.5px] leading-[1.55] text-brand-ink">{w}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="border-t border-brand-hair pt-12">
                <TechnicalLabel index="04">Outcome</TechnicalLabel>
                <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                  {cs.outcome}
                </p>
              </section>

              {cs.metrics.length > 0 && (
                <section className="border-t border-brand-hair pt-12">
                  <TechnicalLabel index="05">Measured Metrics</TechnicalLabel>
                  <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-brand-hair-strong">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="border-r border-b border-brand-hair-strong p-6 bg-brand-paper">
                        <div className="font-display font-medium text-[24px] md:text-[28px] tracking-[-0.02em] text-brand-ink leading-none font-mono-tab">
                          {m.value}
                        </div>
                        <div className="mt-3 label-technical text-brand-mute">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="border-t border-brand-hair pt-8 flex items-center justify-between">
                <Link
                  to="/case-studies"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                  All case studies
                </Link>
                <Link
                  to="/contact#request-consultation"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
                >
                  Discuss a similar engagement
                  <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* Cross-links */}
      {(sector || pillar) && (
        <Section tone="ivory">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sector && (
                <Link
                  to={`/industries/${sector.id}`}
                  className="group block bg-brand-paper border border-brand-hair-strong p-7 hover:border-brand-ink transition-colors"
                >
                  <span className="label-technical text-brand-accent">Sector</span>
                  <h3 className="mt-3 font-display text-[20px] md:text-[22px] font-medium tracking-[-0.015em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-2">
                    {sector.description}
                  </p>
                  <ArrowRight size={14} className="mt-4 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              )}
              {pillar && (
                <Link
                  to="/services#pillars"
                  className="group block bg-brand-paper border border-brand-hair-strong p-7 hover:border-brand-ink transition-colors"
                >
                  <span className="label-technical text-brand-accent">Capability Pillar</span>
                  <h3 className="mt-3 font-display text-[20px] md:text-[22px] font-medium tracking-[-0.015em] text-brand-ink group-hover:text-brand-accent transition-colors">
                    {pillar.index} · {pillar.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-2">
                    {pillar.tagline}
                  </p>
                  <ArrowRight size={14} className="mt-4 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              )}
            </div>
          </Container>
        </Section>
      )}

      {/* Related case studies */}
      {related.length > 0 && (
        <Section tone="paper" divided>
          <Container>
            <div className="mb-10">
              <TechnicalLabel index="REL">Related Engagements</TechnicalLabel>
              <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                Similar shape, similar sector.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-brand-hair">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to={`/case-studies/${r.slug}`}
                  className="group border-r border-b border-brand-hair p-7 bg-brand-paper hover:bg-brand-stone transition-colors"
                >
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="label-technical text-brand-accent">{engagementModelsById[r.engagementModelId]}</span>
                    <span className="label-technical text-brand-mute font-mono-tab">{r.year}</span>
                  </div>
                  <h3 className="font-display text-[18px] md:text-[19px] font-medium tracking-[-0.015em] text-brand-ink leading-snug group-hover:text-brand-accent transition-colors line-clamp-3">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.55] text-brand-ink-2 line-clamp-3">
                    {r.snippet}
                  </p>
                  <ArrowRight size={13} className="mt-5 text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* CTA */}
      <Section tone="ivory">
        <Container size="narrow">
          <TechnicalLabel index="ENG">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
            Discuss an engagement shaped like this with the{' '}
            <span className="font-editorial italic text-brand-accent">practice team</span>.
          </h2>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact#request-consultation">Request Consultation</PrimaryCta>
            <SecondaryCta to="/case-studies">More Case Studies</SecondaryCta>
            <TertiaryCta to="/services">Explore Capabilities</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default CaseStudyDetailPage;
