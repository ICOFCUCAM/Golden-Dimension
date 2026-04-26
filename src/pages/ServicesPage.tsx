import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import {
  TechnicalLabel,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
  Container,
  Section,
} from '@/components/section-primitives';
import { LayerStack } from '@/components/diagrams';
import {
  capabilityModel,
  pillars,
  methodology,
  industries,
} from '@/data/servicesPage';
import { Seo } from '@/components/Seo';
import { PillarIllustration } from '@/components/PillarIllustrations';

const ServicesPage: React.FC = () => {
  return (
    <div>
      <Seo
        title="Capabilities — five consulting pillars, sixteen disciplines"
        description="Capability architecture spanning Engineering & Infrastructure, Financial & Legal Advisory, Digital Transformation & Technology, Education & Institutional Development, and Enterprise Strategy — under one delivery framework."
        path="/services"
      />
      {/* Hero */}
      <section className="bg-brand-ivory pt-[140px] md:pt-[160px] pb-20 md:pb-28 border-b border-brand-hair">
        <Container size="wide">
          <TechnicalLabel index="01">Capabilities</TechnicalLabel>
          <h1 className="mt-8 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-semibold leading-[0.98] tracking-[-0.03em] text-brand-ink max-w-5xl">
            Integrated consulting and engineering capabilities for{' '}
            <span className="font-editorial italic font-medium text-brand-accent">
              institutions, enterprises, and governments
            </span>{' '}
            worldwide.
          </h1>
          <p className="mt-8 max-w-3xl text-[17px] md:text-[19px] leading-[1.55] text-brand-ink-2">
            Five consulting pillars and sixteen disciplines under one firm —
            staffed jointly so engagements span strategy through systems
            without vendor handoffs in between.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="#pillars">Explore Capability Areas</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </Container>
      </section>

      {/* Capability Layer Stack — diagrammatic systems view */}
      <Section tone="paper" id="capabilities">
        <Container>
          <SectionHeader
            eyebrow="Our Capability Model"
            index="02"
            title={
              <>
                Six layers that frame every{' '}
                <span className="font-editorial italic font-medium text-brand-accent">
                  institutional engagement
                </span>.
              </>
            }
            intro="Each engagement combines these layers in proportions tuned to the client's transformation agenda — from strategic framing through long-term operational support."
          />

          <LayerStack
            layers={capabilityModel.map((l, idx) => ({
              index: `L1.${String(idx + 1).padStart(2, '0')}`,
              name: l.name,
              description: l.description,
            }))}
          />
        </Container>
      </Section>

      {/* Capability Pillars — numbered editorial blocks with rule-grid services */}
      <Section tone="ivory" id="pillars">
        <Container>
          <SectionHeader
            eyebrow="Capability Pillars"
            index="03"
            title={
              <>
                Sixteen disciplines, organised into five{' '}
                <span className="font-editorial italic font-medium text-brand-accent">
                  consulting pillars
                </span>.
              </>
            }
            intro="Each pillar groups complementary capabilities so engagements are scoped, staffed, and governed as a coherent transformation programme."
          />

          <div className="space-y-20 md:space-y-24">
            {pillars.map((pillar) => (
              <div key={pillar.id}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 pb-6 mb-8 border-b border-brand-hair-strong">
                  <div className="md:col-span-1 label-technical text-brand-accent pt-2">
                    {pillar.index}
                  </div>
                  <div className="md:col-span-5 flex items-start gap-5">
                    <div className="hidden md:block shrink-0 text-brand-ink-2 pt-1">
                      <PillarIllustration pillarId={pillar.id} size={88} />
                    </div>
                    <h3 className="font-display text-[26px] md:text-[34px] font-semibold leading-[1.05] tracking-[-0.025em] text-brand-ink">
                      {pillar.name}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-[15px] md:text-[16px] leading-[1.65] text-brand-ink-2 md:pt-2">
                      {pillar.tagline}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
                  {pillar.services.map((svc, idx) => (
                    <Link
                      key={svc.id}
                      to={`/services/${svc.id}`}
                      className="group relative border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper hover:bg-brand-stone transition-colors"
                    >
                      <div className="label-technical text-brand-mute mb-4">
                        <span className="text-brand-accent">{pillar.index}</span>
                        .{String(idx + 1).padStart(2, '0')}
                      </div>
                      <h4 className="font-display text-[18px] md:text-[19px] font-semibold leading-snug tracking-[-0.02em] text-brand-ink pr-8">
                        {svc.title}
                      </h4>
                      <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2">
                        {svc.summary}
                      </p>
                      <ArrowUpRight
                        size={16}
                        className="absolute top-6 right-6 text-brand-mute group-hover:text-brand-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                      />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* How We Deliver */}
      <Section tone="paper" id="methodology">
        <Container>
          <SectionHeader
            eyebrow="How We Deliver"
            index="04"
            title={
              <>
                A six-phase methodology spanning the full{' '}
                <span className="font-editorial italic font-medium text-brand-accent">
                  transformation lifecycle
                </span>.
              </>
            }
            intro="From early-stage diagnostics to long-term operational support, our delivery framework is designed for institutional accountability and measurable outcomes."
          />

          <div className="relative">
            <div className="hidden lg:block absolute top-7 left-0 right-0 h-px bg-brand-hair-strong" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6">
              {methodology.map((phase) => (
                <div key={phase.index} className="flex lg:flex-col items-start gap-5">
                  <div className="relative z-10 w-14 h-14 shrink-0 border border-brand-ink bg-brand-paper text-brand-ink font-mono-tab text-[12px] flex items-center justify-center">
                    {phase.index}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[16px] font-semibold tracking-[-0.02em] text-brand-ink leading-tight">
                      {phase.name}
                    </h3>
                    <p className="mt-2 text-[13px] leading-[1.6] text-brand-ink-2">
                      {phase.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Industries summary */}
      <Section tone="ivory" id="industries">
        <Container>
          <SectionHeader
            eyebrow="Industries We Support"
            index="05"
            title={
              <>
                Multidisciplinary capabilities, applied across{' '}
                <span className="font-editorial italic font-medium text-brand-accent">
                  regulated sectors
                </span>.
              </>
            }
            intro="Our pillars converge differently for each industry — combining the engineering, technology, financial, and human-capital capabilities most relevant to that sector's operating reality."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-brand-hair">
            {industries.map((industry, idx) => (
              <Link
                key={industry.id}
                to="/industries"
                className="group border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper hover:bg-brand-stone transition-colors"
              >
                <div className="label-technical text-brand-accent mb-5">
                  S.{String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[19px] md:text-[20px] font-semibold tracking-[-0.025em] text-brand-ink leading-tight">
                  {industry.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {industry.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <TechnicalLabel index="06">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[32px] md:text-[48px] lg:text-[56px] font-semibold leading-[1.04] tracking-[-0.03em] text-brand-ink">
            Bring multidisciplinary capability to your next{' '}
            <span className="font-editorial italic font-medium text-brand-accent">
              transformation programme
            </span>.
          </h2>
          <p className="mt-7 max-w-2xl text-[16px] leading-[1.6] text-brand-ink-2">
            Tell us about the institutional outcome you're working toward —
            we'll assemble the right combination of strategy, engineering,
            technology, and operations expertise around it.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="#pillars">Explore Capability Areas</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ServicesPage;
