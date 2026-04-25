import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Target,
  Eye,
  Shield,
  Lightbulb,
  Users,
  Leaf,
  Gem,
  Network,
  Layers,
  Globe2,
} from 'lucide-react';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import { globalStats } from '@/data/servicesPage';

// -----------------------------------------------------------------------------
// Multidisciplinary collaboration model — how the firm staffs engagements.
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Leadership credibility signals — institutional positioning, not bios.
// -----------------------------------------------------------------------------
const leadershipCommitments = [
  {
    icon: <Shield size={18} />,
    name: 'Regulatory awareness',
    description:
      'Engagements are scoped with the regulatory and compliance posture of each client jurisdiction in mind.',
  },
  {
    icon: <Network size={18} />,
    name: 'Multidisciplinary by structure',
    description:
      'Sixteen disciplines across five pillars under one firm — not a federation of independent specialists.',
  },
  {
    icon: <Globe2 size={18} />,
    name: 'International delivery posture',
    description:
      'Teams structured for cross-border engagements, time-zone coverage, and local regulatory complexity.',
  },
  {
    icon: <Leaf size={18} />,
    name: 'Sustainability integrated',
    description:
      'ESG, environmental, and resilience standards embedded into delivery rather than retrofitted at the end.',
  },
];

const values = [
  {
    icon: <Gem size={20} />,
    title: 'Excellence',
    desc: 'We hold every deliverable to a standard that reflects the institutional weight of the engagement.',
  },
  {
    icon: <Shield size={20} />,
    title: 'Integrity',
    desc: 'We operate transparently and decline work where independence or quality would be compromised.',
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'Innovation',
    desc: 'We pair rigorous analysis with practical engineering to bring novel solutions to bear on hard problems.',
  },
  {
    icon: <Users size={20} />,
    title: 'Collaboration',
    desc: 'We work as one firm — across disciplines, geographies, and with client teams as joint operators.',
  },
  {
    icon: <Leaf size={20} />,
    title: 'Sustainability',
    desc: 'We deliver outcomes that are durable for the institution, the community, and the environment.',
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#0B1F3A]">
      {/* ============================================================
           Hero — institutional positioning
         ============================================================ */}
      <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden border-b border-white/[0.06]">
        <div className="absolute -top-20 left-0 w-[34rem] h-[34rem] bg-[#C8A44D]/[0.06] rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>About the Firm</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl">
            A multidisciplinary consulting and engineering firm built for{' '}
            <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
              institutional transformation
            </span>
            .
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/65 leading-relaxed">
            Founded in 2003, Golden Dimensions Ltd unites finance, engineering,
            technology, healthcare, education, sustainability, and strategic
            consulting under one governance and quality framework — supporting
            public and private institutions across more than fifty countries.
          </p>
        </div>
      </section>

      {/* ============================================================
           Organisational scale indicators
         ============================================================ */}
      <section className="py-20 md:py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
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
      </section>

      {/* ============================================================
           Mission & Vision
         ============================================================ */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Mission & Vision"
            title={
              <>
                What we exist to do, and where we{' '}
                <span className="text-[#C8A44D]">intend to lead</span>.
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="bg-[#0B1F3A] p-10 md:p-12">
              <div className="w-12 h-12 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-6">
                <Target size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                Mission
              </h3>
              <p className="text-white/60 leading-relaxed">
                To deliver multidisciplinary consulting and engineering capability
                that materially improves how institutions operate — combining
                strategic insight, engineering rigour, and technology delivery
                into outcomes our clients can stand behind.
              </p>
            </div>
            <div className="bg-[#0B1F3A] p-10 md:p-12">
              <div className="w-12 h-12 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-6">
                <Eye size={20} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-4">
                Vision
              </h3>
              <p className="text-white/60 leading-relaxed">
                To be the multidisciplinary firm of choice for institutions
                undertaking complex, regulated transformation — recognised for
                the breadth of our capability, the integrity of our delivery,
                and the durability of our outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           Multidisciplinary collaboration model
         ============================================================ */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Collaboration Model</Eyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                One firm.{' '}
                <span className="text-[#C8A44D]">One accountable team</span>{' '}
                per engagement.
              </h2>
              <p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed">
                We do not subcontract delivery to a federation of independent
                specialists. Strategy, engineering, technology, and operations
                are staffed jointly from day one, under one accountable lead and
                a shared quality framework.
              </p>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-[#C8A44D] font-semibold hover:gap-3 transition-all"
                >
                  See our capability pillars <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              {collaborationModel.map((item, idx) => (
                <div key={item.name} className="bg-[#0B1F3A] p-7">
                  <span className="text-[#C8A44D]/70 text-xs font-mono tracking-widest">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-white tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-white/55 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           Leadership commitments (institutional credibility, not bios)
         ============================================================ */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Leadership Commitments"
            title={
              <>
                The standards our leadership{' '}
                <span className="text-[#C8A44D]">holds the firm to</span>.
              </>
            }
            intro="Beyond service delivery, our leadership team commits to a small set of institutional standards that govern how we engage."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {leadershipCommitments.map((item) => (
              <div
                key={item.name}
                className="p-7 rounded-xl bg-white/[0.025] border border-white/[0.06]"
              >
                <div className="w-11 h-11 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-5">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white tracking-tight">
                  {item.name}
                </h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           Story (image + narrative)
         ============================================================ */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International team collaboration"
                  className="w-full h-[480px] object-cover"
                />
              </div>
              <div className="absolute -top-5 -left-5 hidden md:flex items-center gap-3 bg-[#0B1F3A] border border-[#C8A44D]/20 rounded-xl px-5 py-4 shadow-xl">
                <Layers size={18} className="text-[#C8A44D]" />
                <div>
                  <div className="text-white text-sm font-semibold tracking-tight">
                    Sixteen integrated disciplines
                  </div>
                  <div className="text-white/50 text-xs">
                    Five capability pillars
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <Eyebrow>Our Story</Eyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Two decades of multidisciplinary practice.
              </h2>
              <p className="mt-6 text-white/60 leading-relaxed">
                Golden Dimensions Ltd was founded in 2003 to address a gap that
                had become structural in professional services: institutions
                facing complex transformation needed strategy, engineering, and
                technology delivered as a single capability, not as separate
                vendor tracks.
              </p>
              <p className="mt-4 text-white/60 leading-relaxed">
                Twenty years on, that thesis is the firm's operating model.
                Today we deploy more than 200 multidisciplinary professionals
                across over 50 countries, supporting both public and private
                sector institutions through complex, regulated programmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
           Core values
         ============================================================ */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Values"
            title={
              <>
                Five principles that guide every{' '}
                <span className="text-[#C8A44D]">engagement</span>.
              </>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {values.map((value) => (
              <div key={value.title} className="bg-[#0B1F3A] p-7">
                <div className="w-11 h-11 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-5">
                  {value.icon}
                </div>
                <h3 className="text-base font-semibold text-white tracking-tight mb-2">
                  {value.title}
                </h3>
                <p className="text-white/55 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
           CTA
         ============================================================ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-white/[0.08] rounded-2xl p-10 md:p-14 bg-gradient-to-br from-white/[0.02] to-transparent">
            <Eyebrow>Engage With Us</Eyebrow>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl">
              Discuss how multidisciplinary delivery applies to your{' '}
              <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
                next mandate
              </span>
              .
            </h2>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4">
              <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
              <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
