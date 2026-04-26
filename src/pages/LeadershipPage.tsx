import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
  Metric,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';

const doctrine = [
  {
    name: 'Single accountable lead',
    description:
      'Every engagement has a partner-level lead accountable for the outcome end-to-end — there is no handoff between disciplines, geographies, or phases.',
  },
  {
    name: 'Integrated delivery teams',
    description:
      'Strategy, engineering, technology, and operations specialists are deployed jointly from kickoff. We do not subcontract the parts of delivery that determine whether the outcome holds.',
  },
  {
    name: 'Shared governance & quality',
    description:
      'One firm-wide quality framework applies to every engagement, regardless of pillar mix or geography. Assurance gates are independent of the delivery line.',
  },
  {
    name: 'Capability transfer by design',
    description:
      'Engagements are structured so client teams own the operating model when we step back. The exit plan is part of the entry plan.',
  },
];

const commitments = [
  {
    name: 'Regulatory awareness',
    description:
      'Engagements are scoped with the regulatory and compliance posture of each client jurisdiction in mind — not retrofitted at handover.',
  },
  {
    name: 'Multidisciplinary by structure',
    description:
      'Sixteen disciplines across five pillars under one firm — not a federation of independent specialists trading deliverables across vendor boundaries.',
  },
  {
    name: 'International delivery posture',
    description:
      'Teams structured for cross-border engagements, time-zone coverage, and local regulatory complexity — staffed against the institutional reality, not the convenient one.',
  },
  {
    name: 'Sustainability integrated',
    description:
      'ESG, environmental, and resilience standards embedded into delivery from the design phase — accountable to the same governance as financial and operational outcomes.',
  },
];

const LeadershipPage: React.FC = () => {
  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Leadership Doctrine — multidisciplinary by design"
        description="The firm's leadership philosophy, transformation doctrine, and the operating choices that shape how every engagement is staffed and governed."
        path="/leadership"
      />
      <PageHeader
        eyebrow="Leadership"
        index="LD.01"
        title={
          <>
            Multidisciplinary by design.{' '}
            <span className="font-editorial italic text-brand-accent">
              Institutional in delivery
            </span>.
          </>
        }
        subtitle="The firm's leadership philosophy, transformation doctrine, and the operating choices that shape how every engagement is staffed and governed."
      />

      {/* Leadership message — long-form editorial */}
      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <aside className="lg:col-span-3">
              <TechnicalLabel index="02">Leadership Message</TechnicalLabel>
              <p className="mt-6 label-technical text-brand-mute leading-relaxed">
                A short article on the
                <br />
                operating thesis
                <br />
                behind the firm.
              </p>
              <div className="mt-6 hidden lg:block">
                <div className="h-px w-12 bg-brand-accent" />
                <div className="mt-3 label-technical text-brand-mute font-mono-tab">
                  ~ 5 min read
                </div>
              </div>
            </aside>

            <article className="lg:col-span-9 max-w-3xl">
              <h2 className="font-display text-[28px] md:text-[36px] lg:text-[44px] font-medium leading-[1.1] tracking-[-0.015em] text-brand-ink">
                Why we built the firm as one practice, not a{' '}
                <span className="font-editorial italic text-brand-accent">federation</span>.
              </h2>

              <div className="mt-10 space-y-6 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                <p>
                  <span className="font-display text-brand-ink float-left text-[64px] md:text-[80px] leading-[0.85] mr-3 mt-1">G</span>
                  olden Dimensions was founded in 2003 to address a structural
                  failure mode in professional services: institutions facing
                  complex transformation needed strategy, engineering, and
                  technology delivered as a single accountable capability — but
                  the industry kept delivering them as separate vendor tracks,
                  each accountable only for its slice. The seams between them
                  is where most programmes break.
                </p>

                <p>
                  Twenty years on, our operating thesis is unchanged: the firm
                  is structured so that the seams don't exist. Strategy,
                  engineering, technology, operations, sustainability, and
                  human-capital development sit inside one firm under one
                  governance and quality framework. Engagements are staffed
                  jointly from day one by a partner-level lead who is
                  accountable for the outcome end-to-end — not handed off when
                  the design phase closes.
                </p>
              </div>

              {/* Pull-quote */}
              <figure className="my-12 md:my-14 border-l-2 border-brand-accent pl-6 md:pl-8">
                <blockquote className="font-editorial italic text-[22px] md:text-[28px] lg:text-[32px] leading-[1.25] tracking-[-0.005em] text-brand-ink">
                  "We do not subcontract the parts of delivery that determine
                  whether the outcome holds — and that is what allows us to
                  remain accountable for it."
                </blockquote>
                <figcaption className="mt-5 label-technical text-brand-mute">
                  <span className="text-brand-accent">→</span> Operating principle, since 2003
                </figcaption>
              </figure>

              <div className="space-y-6 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                <p>
                  This structure has consequences. It means we sometimes decline
                  work where the scope would force us to act as a federation
                  rather than a firm. It means our engagements often span the
                  full transformation lifecycle — from diagnostics through
                  long-term sustainment — rather than a single phase. It means
                  the same partners who frame the strategy stay accountable when
                  the system goes live.
                </p>
                <p>
                  Today the firm operates across more than fifty countries for
                  banks, ministries, infrastructure agencies, healthcare
                  systems, network operators, and educational institutions. The
                  thesis is unusual in our industry. The outcome is the point.
                </p>
              </div>
            </article>
          </div>
        </Container>
      </Section>

      {/* Transformation doctrine */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Transformation Doctrine"
            index="03"
            title={
              <>
                Four operating choices that shape{' '}
                <span className="font-editorial italic text-brand-accent">every engagement</span>.
              </>
            }
            intro="The doctrine is short on purpose. These are the choices the firm holds itself to — not aspirational values, but operating constraints that govern how teams are staffed and how governance is structured."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
            {doctrine.map((d, idx) => (
              <article key={d.name} className="border-r border-b border-brand-hair p-8 md:p-10 bg-brand-paper">
                <div className="flex items-baseline gap-4 mb-5">
                  <span className="font-mono-tab text-[24px] tracking-[-0.02em] text-brand-accent leading-none">
                    D.{String(idx + 1).padStart(2, '0')}
                  </span>
                  <span className="label-technical text-brand-mute">Doctrine</span>
                </div>
                <h3 className="font-display text-[22px] md:text-[26px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                  {d.name}
                </h3>
                <p className="mt-4 text-[14.5px] leading-[1.65] text-brand-ink-2">
                  {d.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Firm scale */}
      <Section tone="ink">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-5">
              <TechnicalLabel index="04" tone="dark">Firm Scale</TechnicalLabel>
              <h2 className="mt-7 font-display text-[28px] md:text-[40px] lg:text-[48px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-on-dark">
                Two decades of multidisciplinary practice — at{' '}
                <span className="font-editorial italic text-brand-accent-soft">institutional scale</span>.
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
              <Metric value="200+" label="Professionals" tone="dark" size="md" />
              <Metric value="20+"  label="Years"         tone="dark" size="md" />
              <Metric value="50+"  label="Countries"     tone="dark" size="md" />
              <Metric value="16"   label="Disciplines"   tone="dark" size="md" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership commitments */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Leadership Commitments"
            index="05"
            title={
              <>
                The standards leadership{' '}
                <span className="font-editorial italic text-brand-accent">holds the firm to</span>.
              </>
            }
            intro="Beyond service delivery, the firm's leadership team commits to a small set of institutional standards that govern how we engage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {commitments.map((item, idx) => (
              <div key={item.name} className="border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper">
                <div className="label-technical text-brand-accent mb-5 font-mono-tab">
                  C.{String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[18px] md:text-[20px] font-medium tracking-[-0.015em] text-brand-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-brand-hair flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="label-technical text-brand-mute">Related</span>
            <Link to="/leadership/team" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Practice Leads <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/methodology" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Delivery Methodology <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/engagement-models" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              Engagement Models <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/about" className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink hover:text-brand-accent hover:border-brand-accent transition-colors pb-1">
              About the Firm <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory">
        <Container size="narrow">
          <TechnicalLabel index="06">Engage With Us</TechnicalLabel>
          <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.04] tracking-[-0.015em] text-brand-ink">
            Discuss how the firm's doctrine applies to your{' '}
            <span className="font-editorial italic text-brand-accent">programme</span>.
          </h2>
          <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
            <PrimaryCta to="/contact#request-consultation">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LeadershipPage;
