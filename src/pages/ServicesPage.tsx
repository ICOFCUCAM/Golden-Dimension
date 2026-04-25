import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import {
  capabilityModel,
  pillars,
  methodology,
  industries,
  globalStats,
} from '@/data/servicesPage';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

const ServicesPage: React.FC = () => {
  return (
    <div className="bg-[#0B1F3A]">
      {/* ==================================================================
           SECTION 1 — Hero: enterprise capability positioning
         ================================================================== */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute -top-20 left-0 w-[34rem] h-[34rem] bg-[#C8A44D]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Capabilities</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl">
            Integrated consulting and engineering capabilities for{' '}
            <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
              institutions, enterprises, and governments
            </span>{' '}
            worldwide.
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/60 leading-relaxed">
            Golden Dimensions Ltd unites strategy, engineering, technology, and
            human-capital expertise into a single delivery framework — supporting
            multidisciplinary transformation across finance, infrastructure,
            healthcare, education, and digital systems since 2003.
          </p>

          {/* CTA hierarchy: primary / secondary / tertiary */}
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="#pillars">Explore Capability Areas</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </div>
      </section>

      {/* ==================================================================
           SECTION 2 — Our Capability Model (six layers)
         ================================================================== */}
      <section id="capabilities" className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Capability Model"
            title={
              <>
                Six integrated layers that frame every{' '}
                <span className="text-[#C8A44D]">institutional engagement</span>.
              </>
            }
            intro="Each engagement combines these layers in proportions tailored to the client's transformation agenda — from strategic framing through long-term operational support."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {capabilityModel.map((layer) => (
              <div
                key={layer.name}
                className="bg-[#0B1F3A] p-8 md:p-10 hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-11 h-11 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-6">
                  <ServiceIcon icon={layer.icon} size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white tracking-tight mb-3">
                  {layer.name}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">
                  {layer.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
           SECTION 3 — Capability Pillars (16 services regrouped into 5)
         ================================================================== */}
      <section id="pillars" className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capability Pillars"
            title={
              <>
                Sixteen disciplines, organised into five{' '}
                <span className="text-[#C8A44D]">consulting pillars</span>.
              </>
            }
            intro="Each pillar groups complementary capabilities so engagements are scoped, staffed, and governed as a coherent transformation programme."
          />

          <div className="space-y-20 md:space-y-24">
            {pillars.map((pillar) => (
              <div key={pillar.id}>
                {/* Pillar header */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 pb-8 mb-10 border-b border-white/[0.08]">
                  <div className="md:col-span-4 lg:col-span-3 flex items-start gap-5">
                    <span className="text-[#C8A44D]/70 text-sm font-mono tracking-widest pt-1">
                      {pillar.index}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight">
                      {pillar.name}
                    </h3>
                  </div>
                  <p className="md:col-span-8 lg:col-span-9 text-white/55 text-base md:text-lg leading-relaxed md:pt-2">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Pillar services */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {pillar.services.map((svc) => (
                    <Link
                      key={svc.id}
                      to={`/services/${svc.id}`}
                      className="group relative flex flex-col p-7 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/40 hover:bg-white/[0.045] transition-all duration-300"
                    >
                      <h4 className="text-base md:text-lg font-semibold text-white leading-snug tracking-tight pr-6">
                        {svc.title}
                      </h4>
                      <p className="mt-3 text-white/50 text-sm leading-relaxed">
                        {svc.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-[#C8A44D] text-xs font-semibold uppercase tracking-[0.18em] opacity-70 group-hover:opacity-100 transition-opacity">
                        View Capability <ArrowRight size={12} />
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="absolute top-6 right-6 text-white/20 group-hover:text-[#C8A44D] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
           SECTION 4 — How We Deliver (lifecycle methodology)
         ================================================================== */}
      <section id="methodology" className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Deliver"
            title={
              <>
                A six-phase methodology that supports clients across the full{' '}
                <span className="text-[#C8A44D]">transformation lifecycle</span>.
              </>
            }
            intro="From early-stage diagnostics to long-term operational support, our delivery framework is designed for institutional accountability and measurable outcomes."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C8A44D]/30 to-transparent" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-4">
              {methodology.map((phase) => (
                <div key={phase.index} className="relative">
                  <div className="flex lg:flex-col items-start gap-4 lg:gap-5">
                    <div className="relative z-10 w-14 h-14 shrink-0 rounded-full border border-[#C8A44D]/30 bg-[#0B1F3A] text-[#C8A44D] font-mono text-sm flex items-center justify-center">
                      {phase.index}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white tracking-tight">
                        {phase.name}
                      </h3>
                      <p className="mt-2 text-white/50 text-sm leading-relaxed">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================
           SECTION 5 — Industries We Support
         ================================================================== */}
      <section id="industries" className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Industries We Support"
            title={
              <>
                Multidisciplinary capabilities, applied across{' '}
                <span className="text-[#C8A44D]">regulated sectors</span>.
              </>
            }
            intro="Our pillars converge differently for each industry — combining the engineering, technology, financial, and human-capital capabilities most relevant to that sector's operating reality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="group p-8 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-[#C8A44D]/30 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] shrink-0">
                    <ServiceIcon icon={industry.icon} size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white tracking-tight leading-snug">
                      {industry.name}
                    </h3>
                    <p className="mt-2.5 text-white/55 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================
           SECTION 6 — Global Delivery (credibility positioning)
         ================================================================== */}
      <section id="global" className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Global Delivery</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Serving organisations across{' '}
                <span className="text-[#C8A44D]">50+ countries</span> — delivering
                multidisciplinary consulting since 2003.
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

      {/* ==================================================================
           SECTION 7 — Closing CTA hierarchy
         ================================================================== */}
      <section className="py-24 md:py-32 bg-[#0a1a30]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-white/[0.08] rounded-2xl p-10 md:p-14 bg-gradient-to-br from-white/[0.02] to-transparent">
            <Eyebrow>Engage With Us</Eyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
              Bring multidisciplinary capability to your next{' '}
              <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
                transformation programme
              </span>
              .
            </h2>
            <p className="mt-5 max-w-2xl text-white/60 text-lg leading-relaxed">
              Tell us about the institutional outcome you're working toward —
              we'll assemble the right combination of strategy, engineering,
              technology, and operations expertise around it.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="#pillars">Explore Capability Areas</SecondaryCta>
              <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
