import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import { industries, pillars, globalStats } from '@/data/servicesPage';

const pillarById = Object.fromEntries(pillars.map((p) => [p.id, p] as const));

const IndustriesPage: React.FC = () => {
  return (
    <div className="bg-[#0B1F3A]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute -top-20 right-0 w-[34rem] h-[34rem] bg-[#C8A44D]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl">
            Multidisciplinary capability,{' '}
            <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
              applied across regulated sectors
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/60 leading-relaxed">
            We assemble the right combination of strategy, engineering, technology,
            and human-capital expertise around each sector's operating reality —
            supporting public and private institutions through complex
            transformation programmes.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="#sectors">Jump to Sectors</TertiaryCta>
          </div>
        </div>
      </section>

      {/* Sector cards */}
      <section id="sectors" className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Sectors We Serve"
            title={
              <>
                Six regulated sectors where{' '}
                <span className="text-[#C8A44D]">multidisciplinary capability</span>{' '}
                drives outcomes.
              </>
            }
            intro="Each engagement is staffed from across our pillars — so financial, engineering, technology, and operations specialists deliver as a single team."
          />

          <div className="space-y-6">
            {industries.map((industry, idx) => (
              <article
                key={industry.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 md:p-10 rounded-2xl bg-white/[0.025] border border-white/[0.06] hover:border-[#C8A44D]/25 transition-colors"
              >
                <div className="lg:col-span-4 flex items-start gap-5">
                  <div className="w-12 h-12 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] shrink-0">
                    <ServiceIcon icon={industry.icon} size={20} />
                  </div>
                  <div>
                    <span className="block text-[#C8A44D]/70 text-xs font-mono tracking-widest mb-1">
                      {String(idx + 1).padStart(2, '0')} / SECTOR
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight">
                      {industry.name}
                    </h2>
                  </div>
                </div>

                <div className="lg:col-span-8">
                  <p className="text-white/65 text-base md:text-lg leading-relaxed">
                    {industry.summary}
                  </p>

                  <div className="mt-6">
                    <span className="block text-[#C8A44D] text-[10px] font-semibold uppercase tracking-[0.24em] mb-3">
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
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/[0.03] text-white/70 text-xs font-medium hover:border-[#C8A44D]/40 hover:text-white transition-colors"
                          >
                            <span className="text-[#C8A44D]/70 font-mono text-[10px]">
                              {p.index}
                            </span>
                            {p.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-sector capability */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Cross-Sector Capability</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                One firm. Five capability pillars.{' '}
                <span className="text-[#C8A44D]">Engaged differently per sector.</span>
              </h2>
              <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed">
                Our pillars converge differently for each industry — combining
                the engineering, technology, financial, and human-capital
                capabilities most relevant to that sector's operating reality.
              </p>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[#C8A44D] font-semibold hover:gap-3 transition-all"
                >
                  Explore the full Capability Model <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.id}
                  to="/services#pillars"
                  className="group bg-[#0B1F3A] p-7 hover:bg-white/[0.025] transition-colors"
                >
                  <span className="text-[#C8A44D]/70 text-xs font-mono tracking-widest">
                    {pillar.index}
                  </span>
                  <h3 className="mt-2 text-base font-semibold text-white tracking-tight group-hover:text-[#C8A44D] transition-colors">
                    {pillar.name}
                  </h3>
                  <p className="mt-2 text-white/45 text-xs leading-relaxed line-clamp-2">
                    {pillar.tagline}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Global stats */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Global Delivery</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Industry transformation, delivered{' '}
                <span className="text-[#C8A44D]">across 50+ countries</span> since 2003.
              </h2>
              <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed">
                We support both public and private sector institutions, with
                multidisciplinary teams structured for international delivery,
                regulatory complexity, and long-horizon institutional outcomes.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              {globalStats.map((stat) => (
                <div key={stat.label} className="bg-[#0B1F3A] p-8 md:p-10">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent leading-none">
                    {stat.value}
                  </div>
                  <div className="mt-3 text-white/55 text-sm tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 md:py-32 bg-[#0a1a30]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-white/[0.08] rounded-2xl p-10 md:p-14 bg-gradient-to-br from-white/[0.02] to-transparent">
            <Eyebrow>Engage With Us</Eyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
              Discuss a sector-specific{' '}
              <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
                transformation programme
              </span>
              .
            </h2>
            <p className="mt-5 max-w-2xl text-white/60 text-lg leading-relaxed">
              We'll assemble the right combination of strategy, engineering,
              technology, and operations expertise around the institutional
              outcome you're working toward.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesPage;
