import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, Shield, AlertTriangle, BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { PageHeader } from '@/components/section-primitives';

const legalTopics = [
  {
    icon: <Shield size={24} />,
    title: 'Regulatory Compliance',
    summary: 'Stay ahead of evolving regulations with our comprehensive compliance advisory services.',
    content: 'Golden Dimensions provides expert guidance on regulatory compliance across multiple jurisdictions. Our legal team monitors regulatory changes, assesses their impact on your business, and develops compliance strategies that protect your organization while enabling growth. We cover financial regulations, data protection laws (GDPR, CCPA), employment law, environmental regulations, and industry-specific requirements.'
  },
  {
    icon: <FileText size={24} />,
    title: 'Contract Review & Documentation',
    summary: 'Professional contract review, drafting, and documentation services for businesses of all sizes.',
    content: 'Our contract specialists review, draft, and negotiate agreements that protect your interests. From commercial contracts and partnership agreements to employment contracts and service level agreements, we ensure every document is legally sound, clearly written, and aligned with your business objectives. We also provide template libraries and contract management systems for ongoing efficiency.'
  },
  {
    icon: <Scale size={24} />,
    title: 'Corporate Governance',
    summary: 'Establish robust governance frameworks that ensure accountability and transparency.',
    content: 'Good corporate governance is the foundation of sustainable business success. We help organizations establish and maintain governance frameworks that meet regulatory requirements, satisfy stakeholder expectations, and support strategic decision-making. Our services include board advisory, policy development, risk management frameworks, and governance audits.'
  },
  {
    icon: <AlertTriangle size={24} />,
    title: 'Risk Management',
    summary: 'Identify, assess, and mitigate legal risks before they become business problems.',
    content: 'Our risk management approach combines legal expertise with business acumen to identify potential threats and develop mitigation strategies. We conduct comprehensive risk assessments, develop risk management policies, and provide ongoing monitoring and advisory services. Our proactive approach helps organizations avoid costly legal disputes and regulatory penalties.'
  },
  {
    icon: <BookOpen size={24} />,
    title: 'Dispute Resolution',
    summary: 'Expert guidance through mediation, arbitration, and dispute resolution processes.',
    content: 'When disputes arise, our experienced legal professionals provide strategic guidance to achieve the best possible outcome. We specialize in alternative dispute resolution methods including mediation and arbitration, which are often faster and more cost-effective than litigation. Our team has extensive experience in commercial disputes, employment matters, and international arbitration.'
  }
];

const recentUpdates = [
  {
    date: 'March 2026',
    title: 'New Data Protection Regulations in the EU',
    desc: 'Updated guidance on the latest amendments to GDPR compliance requirements for international businesses.'
  },
  {
    date: 'February 2026',
    title: 'Employment Law Changes: Remote Work Policies',
    desc: 'Key considerations for employers updating their remote and hybrid work policies to comply with new legislation.'
  },
  {
    date: 'January 2026',
    title: 'Anti-Money Laundering Updates',
    desc: 'New AML regulations affecting financial services firms and their compliance obligations.'
  },
  {
    date: 'December 2025',
    title: 'Environmental Compliance Standards',
    desc: 'Overview of new environmental reporting requirements for businesses operating in multiple jurisdictions.'
  }
];

const LegalPage: React.FC = () => {
  const [expandedTopic, setExpandedTopic] = useState<number | null>(null);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div className="bg-brand-ivory">
      <PageHeader
        eyebrow="Legal Advisory"
        index="L.01"
        title={<>Corporate, regulatory, and <span className="font-editorial italic text-brand-accent">cross-jurisdictional counsel</span>.</>}
        subtitle="Legal guidance, compliance updates, and regulatory advisory for institutional clients operating across multiple jurisdictions."
      />

      {/* Legal Services Accordion */}
      <section className="py-16" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4">Legal Advisory Services</h2>
            <p className="text-brand-mute">Comprehensive legal support across all areas of business law.</p>
          </div>

          <div className="space-y-4">
            {legalTopics.map((topic, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-brand-paper border border-brand-hair overflow-hidden transition-all duration-500 ${
                  expandedTopic === i ? 'border-brand-accent/30' : 'hover:border-brand-hair'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setExpandedTopic(expandedTopic === i ? null : i)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-brand-ink mb-1">{topic.title}</h3>
                    <p className="text-brand-mute text-sm">{topic.summary}</p>
                  </div>
                  <div className="text-brand-accent flex-shrink-0">
                    {expandedTopic === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedTopic === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-[88px]">
                    <p className="text-brand-ink-2 leading-relaxed">{topic.content}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 mt-4 text-brand-accent text-sm font-medium hover:gap-3 transition-all"
                    >
                      Get Legal Advice <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Legal Updates */}
      <section className="py-24 bg-brand-stone">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-accent text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Regulatory Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-4">Recent Legal Developments</h2>
            <p className="text-brand-mute max-w-2xl mx-auto">
              Stay informed about the latest regulatory changes and legal developments that may affect your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentUpdates.map((update, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-brand-paper border border-brand-hair hover:border-brand-accent/30 transition-all duration-300 group cursor-pointer"
              >
                <span className="text-brand-accent text-sm font-medium">{update.date}</span>
                <h3 className="text-lg font-bold text-brand-ink mt-2 mb-3 group-hover:text-brand-accent transition-colors">
                  {update.title}
                </h3>
                <p className="text-brand-mute text-sm leading-relaxed">{update.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-ink mb-6">
            Need Legal Guidance?
          </h2>
          <p className="text-brand-ink-2 text-lg mb-8">
            Our legal experts are ready to help you navigate complex regulatory landscapes and protect your business interests.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-brand-ink to-brand-ink text-brand-ivory font-semibold rounded-lg hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
          >
            Contact Our Legal Team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
