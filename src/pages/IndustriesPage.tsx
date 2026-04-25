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
import { industries, pillars } from '@/data/servicesPage';

const pillarById = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

const IndustriesPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-ivory pt-[120px] md:pt-[140px] pb-20 md:pb-28">
        <Container size="wide">
          <Eyebrow index="01">Industries</Eyebrow>
          <h1 className="mt-7 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-medium leading-[0.98] tracking-[-0.02em] text-brand-ink max-w-5xl">
            Multidisciplinary capability,{' '}
            <span className="italic text-brand-accent">
              applied across regulated sectors
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-[18px] md:text-[20px] leading-[1.55] text-brand-ink-2">
            We assemble the right combination of strategy, engineering,
            technology, and human-capital expertise around each sector's
            operating reality — supporting public and private institutions
            through complex transformation programmes.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="#sectors">Jump to Sectors</TertiaryCta>
          </div>
        </Container>
      </section>

      {/* Sector narratives — alternating editorial blocks */}
      <Section tone="paper" divided id="sectors">
        <Container>
          <SectionHeader
            eyebrow="Sectors We Serve"
            index="02"
            title={
              <>
                Six regulated sectors where{' '}
                <span className="italic text-brand-accent">
                  multidisciplinary capability
                </span>{' '}
                drives outcomes.
              </>
            }
            intro="Each engagement is staffed from across our pillars — so financial, engineering, technology, and operations specialists deliver as a single team."
          />

          <div>
            {industries.map((industry, idx) => (
              <article
                key={industry.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-14 md:py-20 ${
                  idx > 0 ? 'border-t border-brand-hair' : ''
                }`}
              >
                <div
                  className={`lg:col-span-5 ${
                    idx % 2 === 1 ? 'lg:col-start-8 lg:row-start-1' : ''
                  }`}
                >
                  <div className="font-mono-tab text-[11px] tracking-widest text-brand-mute mb-6">
                    {String(idx + 1).padStart(2, '0')} / SECTOR
                  </div>
                  <h2 className="font-display text-[28px] md:text-[40px] lg:text-[44px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                    {industry.name}
                  </h2>
                </div>

                <div
                  className={`lg:col-span-7 ${
                    idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''
                  }`}
                >
                  <p className="text-[17px] md:text-[18px] leading-[1.65] text-brand-ink-2">
                    {industry.summary}
                  </p>

                  <div className="mt-8">
                    <span className="block text-brand-accent text-[10px] font-medium uppercase tracking-[0.24em] mb-4">
                      Capability Pillars Engaged
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {industry.pillars.map((pid) => {
                        const p = pillarById[pid];
                        if (!p) return null;
                        return (
                          <Link
                            key={pid}
                            to="/services#pillars"
                            className="group inline-flex items-center gap-2.5 px-3 py-2 border border-brand-hair-strong bg-brand-paper text-brand-ink-2 text-[12.5px] font-medium tracking-tight hover:border-brand-ink hover:text-brand-ink hover:bg-brand-stone transition-colors"
                          >
                            <span className="font-mono-tab text-[10px] text-brand-accent">
                              {p.index}
                            </span>
                            <span>{p.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-8">
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                    >
                      Discuss a {industry.name.toLowerCase()} engagement
                      <ArrowRight
                        size={14}
                        className="group-hover:translate-x-0.5 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Cross-sector capability framework */}
      <Section tone="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow index="03">Cross-Sector Capability</Eyebrow>
              <h2 className="mt-7 font-display text-[28px] md:text-[40px] lg:text-[44px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                One firm. Five capability pillars.{' '}
                <span className="italic text-brand-accent">
                  Engaged differently per sector.
                </span>
              </h2>
              <p className="mt-7 max-w-xl text-[16.5px] leading-[1.65] text-brand-ink-2">
                Our pillars converge differently for each industry — combining
                the engineering, technology, financial, and human-capital
                capabilities most relevant to that sector's operating reality.
              </p>
              <div className="mt-9">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                >
                  Explore the full Capability Model
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-brand-hair">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.id}
                  to="/services#pillars"
                  className="group border-r border-b border-brand-hair p-7 bg-brand-paper hover:bg-brand-stone transition-colors"
                >
                  <span className="font-mono-tab text-[10px] tracking-widest text-brand-accent">
                    {pillar.index}
                  </span>
                  <h3 className="mt-3 font-display text-[18px] md:text-[20px] font-medium tracking-tight text-brand-ink">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2 line-clamp-2">
                    {pillar.tagline}
                  </p>
                  <ArrowUpRight
                    size={14}
                    className="mt-4 text-brand-mute group-hover:text-brand-accent transition-colors"
                  />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section tone="ink">
        <Container size="narrow">
          <Eyebrow tone="dark" index="04">
            Engage With Us
          </Eyebrow>
          <h2 className="mt-8 font-display text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-on-dark">
            Discuss a sector-specific{' '}
            <span className="italic text-brand-accent-soft">
              transformation programme
            </span>
            .
          </h2>
          <p className="mt-7 max-w-2xl text-[17px] leading-[1.65] text-brand-on-dark-2">
            We'll assemble the right combination of strategy, engineering,
            technology, and operations expertise around the institutional
            outcome you're working toward.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact" tone="dark">
              Request Consultation
            </PrimaryCta>
            <SecondaryCta to="/services" tone="dark">
              Explore Capabilities
            </SecondaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default IndustriesPage;
