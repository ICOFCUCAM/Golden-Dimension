import React, { useState } from 'react';
import { Scale, FileText, Shield, AlertTriangle, BookOpen, ArrowRight, Plus, Minus } from 'lucide-react';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  SectionHeader,
  PrimaryCta,
  SecondaryCta,
} from '@/components/section-primitives';
import { Link } from 'react-router-dom';
import { Seo } from '@/components/Seo';

const legalTopics = [
  {
    icon: <Shield size={16} />,
    title: 'Regulatory Compliance',
    summary: 'Stay ahead of evolving regulations with comprehensive compliance advisory.',
    content:
      'Golden Dimensions provides expert guidance on regulatory compliance across multiple jurisdictions. Our legal team monitors regulatory changes, assesses their impact on your business, and develops compliance strategies that protect your organisation while enabling growth. We cover financial regulations, data protection laws (GDPR, CCPA), employment law, environmental regulations, and industry-specific requirements.',
  },
  {
    icon: <FileText size={16} />,
    title: 'Contract Review & Documentation',
    summary: 'Professional contract review, drafting, and documentation services for institutions of all sizes.',
    content:
      'Our contract specialists review, draft, and negotiate agreements that protect your interests. From commercial contracts and partnership agreements to employment contracts and service-level agreements, we ensure every document is legally sound, clearly written, and aligned with your business objectives. We also provide template libraries and contract management systems for ongoing efficiency.',
  },
  {
    icon: <Scale size={16} />,
    title: 'Corporate Governance',
    summary: 'Establish robust governance frameworks that ensure accountability and transparency.',
    content:
      'Good corporate governance is the foundation of sustainable business success. We help organisations establish and maintain governance frameworks that meet regulatory requirements, satisfy stakeholder expectations, and support strategic decision-making. Services include board advisory, policy development, risk-management frameworks, and governance audits.',
  },
  {
    icon: <AlertTriangle size={16} />,
    title: 'Risk Management',
    summary: 'Identify, assess, and mitigate legal risks before they become business problems.',
    content:
      'Our risk-management approach combines legal expertise with business acumen to identify potential threats and develop mitigation strategies. We conduct comprehensive risk assessments, develop risk policies, and provide ongoing monitoring and advisory. The proactive approach helps organisations avoid costly legal disputes and regulatory penalties.',
  },
  {
    icon: <BookOpen size={16} />,
    title: 'Dispute Resolution',
    summary: 'Strategic guidance through mediation, arbitration, and dispute resolution.',
    content:
      'When disputes arise, our experienced legal professionals provide strategic guidance to achieve the best possible outcome. We specialise in alternative dispute resolution methods including mediation and arbitration, which are often faster and more cost-effective than litigation. The team has extensive experience in commercial disputes, employment matters, and international arbitration.',
  },
];

const recentUpdates = [
  { date: 'March 2026',    title: 'New Data Protection Regulations in the EU',          desc: 'Updated guidance on the latest amendments to GDPR compliance requirements for international businesses.' },
  { date: 'February 2026', title: 'Employment Law Changes: Remote Work Policies',       desc: 'Key considerations for employers updating their remote and hybrid work policies to comply with new legislation.' },
  { date: 'January 2026',  title: 'Anti-Money Laundering Updates',                       desc: 'New AML regulations affecting financial-services firms and their compliance obligations.' },
  { date: 'December 2025', title: 'Environmental Compliance Standards',                 desc: 'Overview of new environmental reporting requirements for businesses operating in multiple jurisdictions.' },
];

const LegalPage: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(0);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title="Legal Advisory — corporate, regulatory, and cross-jurisdictional counsel"
        description="Legal guidance, compliance updates, and regulatory advisory for institutional clients operating across multiple jurisdictions."
        path="/legal"
      />
      <PageHeader
        eyebrow="Legal Advisory"
        index="L.01"
        title={<>Corporate, regulatory, and <span className="font-editorial italic text-brand-accent">cross-jurisdictional counsel</span>.</>}
        subtitle="Legal guidance, compliance updates, and regulatory advisory for institutional clients operating across multiple jurisdictions."
      />

      {/* Legal services accordion — editorial */}
      <Section tone="paper">
        <Container>
          <SectionHeader
            eyebrow="Practice Areas"
            index="02"
            title={
              <>
                Five practice areas of{' '}
                <span className="font-editorial italic text-brand-accent">legal advisory</span>.
              </>
            }
            intro="Each practice area is led by a partner with cross-jurisdictional experience. Engagements may combine multiple practice areas — staffed jointly under one accountable lead."
          />

          <div className="border-t-2 border-brand-ink">
            {legalTopics.map((topic, i) => {
              const open = expandedTopic === i;
              return (
                <div key={topic.title} className="border-b border-brand-hair">
                  <button
                    onClick={() => setExpandedTopic(open ? null : i)}
                    className="group w-full grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline py-7 text-left hover:bg-brand-stone transition-colors px-2 -mx-2"
                  >
                    <div className="md:col-span-1 label-technical text-brand-accent font-mono-tab pt-1">
                      L.{String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="md:col-span-4 flex items-center gap-3">
                      <span className="text-brand-mute group-hover:text-brand-accent transition-colors">{topic.icon}</span>
                      <h3 className="font-display text-[20px] md:text-[24px] font-medium tracking-[-0.015em] text-brand-ink leading-tight group-hover:text-brand-accent transition-colors">
                        {topic.title}
                      </h3>
                    </div>
                    <div className="md:col-span-6">
                      <p className="text-[14.5px] leading-[1.6] text-brand-ink-2">
                        {topic.summary}
                      </p>
                    </div>
                    <div className="md:col-span-1 flex md:justify-end pt-1">
                      <span className="w-7 h-7 border border-brand-ink-2 group-hover:border-brand-accent flex items-center justify-center text-brand-ink-2 group-hover:text-brand-accent transition-colors">
                        {open ? <Minus size={13} /> : <Plus size={13} />}
                      </span>
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ${
                      open ? 'max-h-[600px]' : 'max-h-0'
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 pb-8 pt-2">
                      <div className="md:col-start-6 md:col-span-7 max-w-2xl">
                        <p className="text-[15px] leading-[1.7] text-brand-ink-2">
                          {topic.content}
                        </p>
                        <Link
                          to="/contact#request-consultation"
                          className="group inline-flex items-center gap-2 mt-6 text-[13px] font-medium tracking-tight text-brand-ink border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-colors"
                        >
                          Discuss this practice
                          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Recent legal updates */}
      <Section tone="ivory" divided>
        <Container>
          <SectionHeader
            eyebrow="Regulatory Updates"
            index="03"
            title={
              <>
                Recent <span className="font-editorial italic text-brand-accent">legal developments</span>.
              </>
            }
            intro="Periodic notes from our practice on regulatory changes that may affect institutional clients across jurisdictions."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-brand-hair">
            {recentUpdates.map((update, i) => (
              <article
                key={update.title}
                className="border-r border-b border-brand-hair p-7 md:p-8 bg-brand-paper"
              >
                <div className="flex items-baseline justify-between mb-4">
                  <span className="label-technical text-brand-accent font-mono-tab">
                    U.{String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="label-technical text-brand-mute font-mono-tab">
                    {update.date.toUpperCase()}
                  </span>
                </div>
                <h3 className="font-display text-[19px] md:text-[20px] font-medium tracking-[-0.015em] text-brand-ink leading-snug">
                  {update.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-brand-ink-2">
                  {update.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="paper" divided>
        <Container size="narrow">
          <div className="border-t-2 border-brand-ink pt-10 md:pt-12">
            <TechnicalLabel index="04">Engage Counsel</TechnicalLabel>
            <h2 className="mt-8 font-display text-[32px] md:text-[44px] lg:text-[52px] font-medium leading-[1.04] tracking-[-0.015em] text-brand-ink">
              Discuss a legal advisory engagement with our{' '}
              <span className="font-editorial italic text-brand-accent">practice team</span>.
            </h2>
            <p className="mt-7 max-w-2xl text-[16px] leading-[1.65] text-brand-ink-2">
              A partner from the relevant practice area will respond within
              one business day. All initial consultations are confidential.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-3">
              <PrimaryCta to="/contact#request-consultation">Request Consultation</PrimaryCta>
              <SecondaryCta to="/services">Explore Capabilities</SecondaryCta>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LegalPage;
