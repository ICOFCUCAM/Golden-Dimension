import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
  Container,
  Section,
} from '@/components/section-primitives';
import { globalStats } from '@/data/servicesPage';

const collaborationModel = [
  {
    name: 'Single accountable lead',
    description:
      'Each engagement has a partner-level lead accountable for outcomes — not a handoff between disciplines.',
  },
  {
    name: 'Integrated delivery teams',
    description:
      'Strategy, engineering, technology, and operations staff are deployed jointly from kickoff.',
  },
  {
    name: 'Shared governance & quality',
    description:
      'One firm-wide quality framework, regardless of pillar mix or geography.',
  },
  {
    name: 'Capability transfer by design',
    description:
      'Engagements are structured so client teams own the operating model when we step back.',
  },
];

const leadershipCommitments = [
  {
    name: 'Regulatory awareness',
    description:
      'Engagements are scoped with the regulatory and compliance posture of each client jurisdiction in mind.',
  },
  {
    name: 'Multidisciplinary by structure',
    description:
      'Sixteen disciplines across five pillars under one firm — not a federation of independent specialists.',
  },
  {
    name: 'International delivery posture',
    description:
      'Teams structured for cross-border engagements, time-zone coverage, and local regulatory complexity.',
  },
  {
    name: 'Sustainability integrated',
    description:
      'ESG, environmental, and resilience standards embedded into delivery rather than retrofitted at the end.',
  },
];

const values = [
  {
    title: 'Excellence',
    desc: 'We hold every deliverable to a standard that reflects the institutional weight of the engagement.',
  },
  {
    title: 'Integrity',
    desc: 'We operate transparently and decline work where independence or quality would be compromised.',
  },
  {
    title: 'Innovation',
    desc: 'We pair rigorous analysis with practical engineering to bring novel solutions to bear on hard problems.',
  },
  {
    title: 'Collaboration',
    desc: 'We work as one firm — across disciplines, geographies, and with client teams as joint operators.',
  },
  {
    title: 'Sustainability',
    desc: 'We deliver outcomes that are durable for the institution, the community, and the environment.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-ivory pt-[120px] md:pt-[140px] pb-20 md:pb-28">
        <Container size="wide">
          <Eyebrow index="01">About the Firm</Eyebrow>
          <h1 className="mt-7 font-display text-[40px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-medium leading-[0.98] tracking-[-0.02em] text-brand-ink max-w-5xl">
            A multidisciplinary consulting and engineering firm built for{' '}
            <span className="italic text-brand-accent">
              institutional transformation
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-[18px] md:text-[20px] leading-[1.55] text-brand-ink-2">
            Founded in 2003, Golden Dimensions Ltd unites finance, engineering,
            technology, healthcare, education, sustainability, and strategic
            consulting under one governance and quality framework — supporting
            public and private institutions across more than fifty countries.
          </p>
        </Container>
      </section>

      {/* Scale indicators */}
      <section className="bg-brand-ivory border-t border-brand-hair">
        <Container size="wide">
          <div className="py-14 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-10">
            {globalStats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[44px] md:text-[56px] font-medium leading-none text-brand-ink tracking-tight">
                  {stat.value.replace('+', '')}
                  {stat.value.includes('+') && (
                    <span className="text-brand-accent">+</span>
                  )}
                </div>
                <div className="mt-3 text-[13px] tracking-wide text-brand-mute">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Mission & Vision */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Mission & Vision"
            index="02"
            title={
              <>
                What we exist to do, and where we{' '}
                <span className="italic text-brand-accent">intend to lead</span>.
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
            <div className="border-r border-b border-brand-hair p-10 md:p-12">
              <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-6">
                MISSION
              </div>
              <h3 className="font-display text-[24px] md:text-[28px] font-medium tracking-tight text-brand-ink leading-tight">
                Materially improve how institutions operate.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-brand-ink-2">
                To deliver multidisciplinary consulting and engineering
                capability that materially improves how institutions operate —
                combining strategic insight, engineering rigour, and technology
                delivery into outcomes our clients can stand behind.
              </p>
            </div>
            <div className="border-r border-b border-brand-hair p-10 md:p-12">
              <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-6">
                VISION
              </div>
              <h3 className="font-display text-[24px] md:text-[28px] font-medium tracking-tight text-brand-ink leading-tight">
                The multidisciplinary firm of choice for complex transformation.
              </h3>
              <p className="mt-5 text-[16px] leading-[1.65] text-brand-ink-2">
                To be the multidisciplinary firm of choice for institutions
                undertaking complex, regulated transformation — recognised for
                the breadth of our capability, the integrity of our delivery,
                and the durability of our outcomes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Collaboration model */}
      <Section tone="ivory">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow index="03">Collaboration Model</Eyebrow>
              <h2 className="mt-7 font-display text-[28px] md:text-[40px] lg:text-[44px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
                One firm.{' '}
                <span className="italic text-brand-accent">
                  One accountable team
                </span>{' '}
                per engagement.
              </h2>
              <p className="mt-7 max-w-xl text-[16.5px] leading-[1.65] text-brand-ink-2">
                We do not subcontract delivery to a federation of independent
                specialists. Strategy, engineering, technology, and operations
                are staffed jointly from day one, under one accountable lead
                and a shared quality framework.
              </p>
              <div className="mt-9">
                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                >
                  See our capability pillars
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-brand-hair">
              {collaborationModel.map((item, idx) => (
                <div
                  key={item.name}
                  className="border-r border-b border-brand-hair p-7 bg-brand-paper"
                >
                  <span className="font-mono-tab text-[10px] tracking-widest text-brand-accent">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-[18px] md:text-[20px] font-medium tracking-tight text-brand-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-[14px] leading-[1.6] text-brand-ink-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership commitments */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Leadership Commitments"
            index="04"
            title={
              <>
                The standards our leadership{' '}
                <span className="italic text-brand-accent">
                  holds the firm to
                </span>
                .
              </>
            }
            intro="Beyond service delivery, our leadership team commits to a small set of institutional standards that govern how we engage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-brand-hair">
            {leadershipCommitments.map((item, idx) => (
              <div
                key={item.name}
                className="border-r border-b border-brand-hair p-7 md:p-8"
              >
                <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-5">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[18px] md:text-[20px] font-medium tracking-tight text-brand-ink">
                  {item.name}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.6] text-brand-ink-2">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Story */}
      <Section tone="ink">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International team collaboration"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2">
              <Eyebrow tone="dark" index="05">
                Our Story
              </Eyebrow>
              <h2 className="mt-7 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-on-dark">
                Two decades of multidisciplinary practice.
              </h2>
              <div className="mt-7 space-y-4 text-[16.5px] leading-[1.65] text-brand-on-dark-2 max-w-2xl">
                <p>
                  Golden Dimensions Ltd was founded in 2003 to address a gap
                  that had become structural in professional services:
                  institutions facing complex transformation needed strategy,
                  engineering, and technology delivered as a single capability,
                  not as separate vendor tracks.
                </p>
                <p>
                  Twenty years on, that thesis is the firm's operating model.
                  Today we deploy more than 200 multidisciplinary professionals
                  across over 50 countries, supporting both public and private
                  sector institutions through complex, regulated programmes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Core values */}
      <Section tone="paper" divided>
        <Container>
          <SectionHeader
            eyebrow="Core Values"
            index="06"
            title={
              <>
                Five principles that guide every{' '}
                <span className="italic text-brand-accent">engagement</span>.
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-l border-brand-hair">
            {values.map((value, idx) => (
              <div
                key={value.title}
                className="border-r border-b border-brand-hair p-7"
              >
                <div className="font-mono-tab text-[10px] tracking-widest text-brand-accent mb-5">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-[18px] font-medium tracking-tight text-brand-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ivory">
        <Container size="narrow">
          <Eyebrow index="07">Engage With Us</Eyebrow>
          <h2 className="mt-8 font-display text-[32px] md:text-[48px] lg:text-[56px] font-medium leading-[1.05] tracking-[-0.015em] text-brand-ink">
            Discuss how multidisciplinary delivery applies to your{' '}
            <span className="italic text-brand-accent">next mandate</span>.
          </h2>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default AboutPage;
