import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';
import { caseStudies as staticCaseStudies, engagementModelsById } from '@/data/caseStudies';
import { industries, pillars } from '@/data/servicesPage';
import { useCmsCollection } from '@/lib/cms';
import type { CaseStudy } from '@/data/caseStudies';

const sectorById  = Object.fromEntries(industries.map((i) => [i.id, i] as const));
const pillarById  = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

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

const CaseStudiesPage: React.FC = () => {
  const [sector, setSector] = useState<string>('all');
  const [pillar, setPillar] = useState<string>('all');
  const [model, setModel]   = useState<string>('all');

  const { data: caseStudies } = useCmsCollection<CaseStudy>('case_studies', staticCaseStudies);

  const filtered = useMemo(() => {
    return caseStudies.filter((c) => {
      if (sector !== 'all' && c.sectorId !== sector) return false;
      if (pillar !== 'all' && c.pillarId !== pillar) return false;
      if (model  !== 'all' && c.engagementModelId !== model) return false;
      return true;
    });
  }, [caseStudies, sector, pillar, model]);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Case Studies — anonymised engagement evidence"
        description="Anonymised engagement evidence across financial systems, infrastructure, healthcare, telecommunications, education, and government — context, intervention, and measured outcomes."
        path="/case-studies"
      />
      <PageHeader
        eyebrow="Case Studies"
        index="CS.01"
        title={
          <>
            Anonymised{' '}
            <span className="font-editorial italic text-brand-accent">engagement evidence</span>{' '}
            across the practice.
          </>
        }
        subtitle="Each case below is anonymised at client level but specific on intervention shape and measured outcome. Where the same firm-wide governance and quality framework applied — across every engagement, regardless of sector or geography."
      />

      {/* Filter rail */}
      <section className="bg-brand-ivory border-b border-brand-hair">
        <Container>
          <div className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
            <div className="lg:col-span-4">
              <span className="label-technical text-brand-mute mb-3 block">Sector</span>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All sectors" active={sector === 'all'} onClick={() => setSector('all')} />
                {industries.map((i) => (
                  <FilterChip key={i.id} label={i.name} active={sector === i.id} onClick={() => setSector(i.id)} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <span className="label-technical text-brand-mute mb-3 block">Capability pillar</span>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All pillars" active={pillar === 'all'} onClick={() => setPillar('all')} />
                {pillars.map((p) => (
                  <FilterChip key={p.id} label={`${p.index} · ${p.name}`} active={pillar === p.id} onClick={() => setPillar(p.id)} />
                ))}
              </div>
            </div>
            <div className="lg:col-span-4">
              <span className="label-technical text-brand-mute mb-3 block">Engagement model</span>
              <div className="flex flex-wrap gap-2">
                <FilterChip label="All models" active={model === 'all'} onClick={() => setModel('all')} />
                {Object.entries(engagementModelsById).map(([id, name]) => (
                  <FilterChip key={id} label={name} active={model === id} onClick={() => setModel(id)} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Case study grid */}
      <Section tone="paper">
        <Container>
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-brand-hair">
            <span className="label-technical text-brand-mute">
              <span className="text-brand-accent font-mono-tab">{String(filtered.length).padStart(2, '0')}</span>{' '}
              of {String(caseStudies.length).padStart(2, '0')} engagements
            </span>
            {(sector !== 'all' || pillar !== 'all' || model !== 'all') && (
              <button
                onClick={() => { setSector('all'); setPillar('all'); setModel('all'); }}
                className="label-technical text-brand-ink hover:text-brand-accent transition-colors"
              >
                Clear filters
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="py-20 text-center border border-brand-hair-strong bg-brand-paper">
              <p className="text-[14px] text-brand-mute">No engagements match these filters.</p>
              <button
                onClick={() => { setSector('all'); setPillar('all'); setModel('all'); }}
                className="mt-4 text-[13px] font-medium text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1"
              >
                Show all engagements
              </button>
            </div>
          ) : (
            <div className="border-t-2 border-brand-ink">
              {filtered.map((c, idx) => {
                const sectorObj = sectorById[c.sectorId];
                const pillarObj = pillarById[c.pillarId];
                return (
                  <Link
                    key={c.id}
                    to={`/case-studies/${c.slug}`}
                    className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-10 md:py-14 border-b border-brand-hair hover:bg-brand-stone transition-colors"
                  >
                    <div className="lg:col-span-1 label-technical text-brand-accent font-mono-tab">
                      CS.{String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="lg:col-span-5">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1.5 mb-4">
                        <span className="label-technical text-brand-mute">{sectorObj?.name}</span>
                        <span className="text-brand-hair-strong" aria-hidden>·</span>
                        <span className="label-technical text-brand-mute">{engagementModelsById[c.engagementModelId]}</span>
                        <span className="text-brand-hair-strong" aria-hidden>·</span>
                        <span className="label-technical text-brand-mute font-mono-tab">{c.year}</span>
                      </div>
                      <h2 className="font-display text-[22px] md:text-[28px] lg:text-[32px] font-medium tracking-[-0.015em] text-brand-ink leading-[1.1] group-hover:text-brand-accent transition-colors">
                        {c.title}
                      </h2>
                      <p className="mt-4 text-[13.5px] text-brand-mute">{c.client} · {c.region}</p>
                    </div>
                    <div className="lg:col-span-5">
                      <p className="font-editorial italic text-[16px] md:text-[18px] leading-[1.5] text-brand-ink-2">
                        {c.snippet}
                      </p>
                      {pillarObj && (
                        <div className="mt-5 flex items-baseline gap-2">
                          <span className="label-technical text-brand-mute">Pillar</span>
                          <span className="text-[12.5px] tracking-tight text-brand-ink">
                            {pillarObj.index} · {pillarObj.name}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="lg:col-span-1 flex lg:justify-end items-start pt-2">
                      <ArrowUpRight size={18} className="text-brand-mute group-hover:text-brand-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory" divided>
        <Container size="narrow">
          <div className="border-t-2 border-brand-ink pt-12">
            <span className="block label-technical mb-7">
              <span className="text-brand-accent">§ ENG</span> · Discuss an Engagement
            </span>
            <h2 className="font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
              Discuss an engagement shaped like one of these.
            </h2>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <Link
                to="/contact#request-consultation"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 text-[13px] font-medium tracking-tight bg-brand-ink text-brand-ivory hover:bg-brand-accent transition-colors"
              >
                Request Consultation
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3 text-[13px] font-medium tracking-tight border border-brand-ink text-brand-ink hover:bg-brand-ink hover:text-brand-ivory transition-colors"
              >
                Explore Capabilities
              </Link>
              <Link
                to="/industries"
                className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-ink-2 hover:text-brand-accent border-b border-transparent hover:border-brand-accent transition-colors"
              >
                View Industries Served <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default CaseStudiesPage;
