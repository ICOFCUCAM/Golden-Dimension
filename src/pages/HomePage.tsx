import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Users,
  Clock,
  Globe2,
  Layers,
  Code2,
  Radio,
  BarChart3,
  Palette,
} from 'lucide-react';
import ServiceIcon from '@/components/ServiceIcon';
import {
  Eyebrow,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
  TertiaryCta,
} from '@/components/section-primitives';
import {
  pillars,
  industries,
  methodology,
  globalStats,
} from '@/data/servicesPage';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

// -----------------------------------------------------------------------------
// Stat tile (count-up on scroll-into-view)
// -----------------------------------------------------------------------------
const StatTile: React.FC<{
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
}> = ({ value, suffix, label, icon }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const count = useCountUp(value, 1800, isVisible);
  return (
    <div ref={ref} className="bg-[#0B1F3A] p-8 md:p-10">
      <div className="w-10 h-10 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-6">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent leading-none">
        {count}
        {suffix}
      </div>
      <div className="mt-3 text-white/55 text-sm tracking-wide">{label}</div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// Engagement-model framing (replaces partner-logo carousel — no real logos
// to show, but consulting firms communicate the same idea via engagement
// shapes the firm offers).
// -----------------------------------------------------------------------------
const engagementModels = [
  {
    name: 'Advisory',
    description:
      'Short-form expert engagements that frame strategy, decisions, and business cases.',
  },
  {
    name: 'Programme Delivery',
    description:
      'Multidisciplinary teams executing major transformations end to end.',
  },
  {
    name: 'Managed Services',
    description:
      'Long-term operation of systems, networks, and back-office functions.',
  },
  {
    name: 'Capability Build',
    description:
      'Embedded teams that transfer skills and operating models to client organisations.',
  },
];

// -----------------------------------------------------------------------------
// Technology capability layer
// -----------------------------------------------------------------------------
const technologyCapabilities = [
  {
    name: 'Software & Platforms',
    icon: <Code2 size={20} />,
    description:
      'Custom software, integrations, and enterprise web platforms engineered for production scale.',
  },
  {
    name: 'Networks & Telecom',
    icon: <Radio size={20} />,
    description:
      'Fixed, mobile, and enterprise network systems with secure end-to-end delivery.',
  },
  {
    name: 'Data & Analytics',
    icon: <BarChart3 size={20} />,
    description:
      'Decision-support data systems, reporting, and analytics for institutional operations.',
  },
  {
    name: 'Digital Experience',
    icon: <Palette size={20} />,
    description:
      'UX, product design, and brand systems engineered for consistency at scale.',
  },
];

// -----------------------------------------------------------------------------
// Regions (global footprint)
// -----------------------------------------------------------------------------
const regions = [
  'United Kingdom & Ireland',
  'European Union',
  'Middle East & North Africa',
  'Sub-Saharan Africa',
  'North America',
  'Asia Pacific',
];

// =============================================================================
// HomePage
// =============================================================================
const HomePage: React.FC = () => {
  return (
    <div className="bg-[#0B1F3A]">
      {/* ==============================================================
           1 — Hero: capability positioning
         ============================================================== */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977155989_8f3386e4.jpg"
            alt="Global professionals collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/95 via-[#0B1F3A]/85 to-[#0B1F3A]/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
        </div>

        <div className="absolute -top-10 right-0 w-[34rem] h-[34rem] bg-[#C8A44D]/[0.08] rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full">
          <Eyebrow>Established 2003 — Multidisciplinary Consulting</Eyebrow>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight max-w-5xl">
            Integrated consulting and engineering capabilities for{' '}
            <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
              institutions, enterprises, and governments
            </span>{' '}
            worldwide.
          </h1>
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-white/65 leading-relaxed">
            Golden Dimensions Ltd unites strategy, engineering, technology, and
            human-capital expertise into a single delivery framework — supporting
            multidisciplinary transformation across finance, infrastructure,
            healthcare, education, and digital systems.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
            <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
          </div>
        </div>
      </section>

      {/* ==============================================================
           2 — Global credibility metrics
         ============================================================== */}
      <section className="py-20 md:py-24 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            <StatTile value={200} suffix="+" label="Professionals worldwide" icon={<Users size={18} />} />
            <StatTile value={20} suffix="+" label="Years of consulting practice" icon={<Clock size={18} />} />
            <StatTile value={50} suffix="+" label="Countries served" icon={<Globe2 size={18} />} />
            <StatTile value={16} suffix="" label="Integrated service disciplines" icon={<Layers size={18} />} />
          </div>
        </div>
      </section>

      {/* ==============================================================
           3 — Capability pillars overview
         ============================================================== */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Capabilities"
            title={
              <>
                Five consulting pillars,{' '}
                <span className="text-[#C8A44D]">one delivery framework</span>.
              </>
            }
            intro="Every engagement is staffed across the pillars relevant to the client's transformation agenda — strategy, engineering, technology, institutional development, and enterprise support, working as one team."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {pillars.map((pillar) => (
              <Link
                key={pillar.id}
                to="/services#pillars"
                className="group bg-[#0B1F3A] p-8 md:p-10 hover:bg-white/[0.025] transition-colors flex flex-col"
              >
                <span className="text-[#C8A44D]/70 text-xs font-mono tracking-widest mb-4">
                  {pillar.index}
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug group-hover:text-[#C8A44D] transition-colors">
                  {pillar.name}
                </h3>
                <p className="mt-3 text-white/50 text-sm leading-relaxed flex-1">
                  {pillar.tagline}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[#C8A44D] text-xs font-semibold uppercase tracking-[0.18em] opacity-70 group-hover:opacity-100 transition-opacity">
                  Explore Pillar <ArrowRight size={12} />
                </span>
              </Link>
            ))}
            {/* Trailing tile to balance grid + push to capabilities page */}
            <Link
              to="/services"
              className="group bg-gradient-to-br from-[#C8A44D]/10 via-[#C8A44D]/5 to-transparent p-8 md:p-10 flex flex-col justify-between hover:from-[#C8A44D]/15 transition-colors"
            >
              <div>
                <span className="text-[#C8A44D]/70 text-xs font-mono tracking-widest mb-4 block">
                  06
                </span>
                <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">
                  Explore the full Capability Model
                </h3>
                <p className="mt-3 text-white/55 text-sm leading-relaxed">
                  Six-layer model spanning Strategy, Engineering, Technology,
                  Operations, Sustainability, and Human Capital Development.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[#C8A44D] font-semibold text-sm">
                View Capabilities <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==============================================================
           4 — Industries served
         ============================================================== */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
            <div className="max-w-3xl">
              <Eyebrow>Industries</Eyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Sector authority across{' '}
                <span className="text-[#C8A44D]">regulated industries</span>.
              </h2>
            </div>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-[#C8A44D] font-semibold text-sm hover:gap-3 transition-all"
            >
              View all industries <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((industry) => (
              <Link
                key={industry.id}
                to="/industries"
                className="group p-7 rounded-xl bg-white/[0.025] border border-white/[0.06] hover:border-[#C8A44D]/30 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] shrink-0">
                    <ServiceIcon icon={industry.icon} size={18} />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white tracking-tight leading-snug group-hover:text-[#C8A44D] transition-colors">
                      {industry.name}
                    </h3>
                    <p className="mt-2 text-white/55 text-sm leading-relaxed">
                      {industry.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
           5 — Technology capability layer
         ============================================================== */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Technology Capability"
            title={
              <>
                Engineering the digital systems that{' '}
                <span className="text-[#C8A44D]">institutions depend on</span>.
              </>
            }
            intro="A dedicated technology practice — software, networks, data, and digital experience — embedded across every transformation programme."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {technologyCapabilities.map((cap) => (
              <div
                key={cap.name}
                className="p-7 rounded-xl bg-white/[0.025] border border-white/[0.06]"
              >
                <div className="w-11 h-11 rounded-md bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D] mb-5">
                  {cap.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-white tracking-tight leading-snug">
                  {cap.name}
                </h3>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
           6 — Delivery methodology
         ============================================================== */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="How We Deliver"
            title={
              <>
                A six-phase methodology spanning the full{' '}
                <span className="text-[#C8A44D]">transformation lifecycle</span>.
              </>
            }
            intro="From early-stage diagnostics to long-term operational support, our delivery framework is built for institutional accountability and measurable outcomes."
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

      {/* ==============================================================
           7 — Leadership positioning
         ============================================================== */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International team collaboration"
                  className="w-full h-[440px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 hidden md:block bg-[#0B1F3A] border border-[#C8A44D]/20 rounded-xl px-6 py-5 shadow-xl">
                <div className="text-3xl font-bold bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent leading-none">
                  20+
                </div>
                <div className="mt-1 text-white/60 text-xs tracking-wide">
                  Years of multidisciplinary practice
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Eyebrow>The Firm</Eyebrow>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight">
                Multidisciplinary by design.{' '}
                <span className="text-[#C8A44D]">Institutional in delivery.</span>
              </h2>
              <p className="mt-6 text-white/60 text-base md:text-lg leading-relaxed">
                Founded in 2003, Golden Dimensions Ltd was structured from day
                one as a multidisciplinary firm — finance, engineering,
                technology, healthcare, education, and sustainability under one
                governance and quality framework.
              </p>
              <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">
                That structure is what allows us to staff complex,
                cross-disciplinary mandates without subcontracting the most
                important parts of delivery — and to remain accountable for the
                outcome end to end.
              </p>
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-[#C8A44D] font-semibold hover:gap-3 transition-all"
                >
                  About the firm <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
           8 — Global footprint
         ============================================================== */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <Eyebrow>Global Footprint</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Serving organisations across{' '}
                <span className="text-[#C8A44D]">50+ countries</span> — public
                and private institutions, since 2003.
              </h2>
              <p className="mt-6 text-white/55 text-base md:text-lg leading-relaxed">
                Our delivery teams are structured for international engagements,
                regulatory complexity, and long-horizon institutional outcomes
                across these regions.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
                {regions.map((region) => (
                  <div
                    key={region}
                    className="bg-[#0B1F3A] p-6 flex items-center gap-4"
                  >
                    <Globe2 size={16} className="text-[#C8A44D] shrink-0" />
                    <span className="text-white/80 text-sm tracking-wide">
                      {region}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
                {globalStats.slice(0, 2).map((stat) => (
                  <div key={stat.label} className="bg-[#0B1F3A] p-6 md:p-8">
                    <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent leading-none">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-white/55 text-sm tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
           9 — Engagement models (replaces partner-logo carousel)
         ============================================================== */}
      <section className="py-24 md:py-32 bg-[#0a1a30] border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Engagement Models"
            title={
              <>
                Four ways institutions{' '}
                <span className="text-[#C8A44D]">engage with us</span>.
              </>
            }
            intro="From short advisory mandates through multi-year programme delivery, our engagement models scale to the complexity and time horizon of each transformation."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
            {engagementModels.map((model, idx) => (
              <div key={model.name} className="bg-[#0B1F3A] p-8 md:p-10">
                <span className="text-[#C8A44D]/70 text-xs font-mono tracking-widest">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                  {model.name}
                </h3>
                <p className="mt-3 text-white/55 text-sm leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==============================================================
           10 — Case capability signal (positioning quote)
         ============================================================== */}
      <section className="py-24 md:py-32 border-b border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Eyebrow>Practitioner Perspective</Eyebrow>
          <blockquote className="text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-[1.25] tracking-tight">
            "Multidisciplinary delivery is not a marketing claim — it's an
            operating choice. We staff every mandate so that strategy,
            engineering, technology, and operations are{' '}
            <span className="text-[#C8A44D]">in the same room from day one</span>."
          </blockquote>
          <div className="mt-10 flex items-center gap-4">
            <div className="w-10 h-px bg-[#C8A44D]" />
            <div>
              <div className="text-white font-semibold tracking-tight">
                Leadership Team
              </div>
              <div className="text-white/40 text-sm">
                Golden Dimensions Ltd — Established 2003
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==============================================================
           11 — Final CTA hierarchy
         ============================================================== */}
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
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
              <TertiaryCta to="/industries">View Industries Served</TertiaryCta>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
