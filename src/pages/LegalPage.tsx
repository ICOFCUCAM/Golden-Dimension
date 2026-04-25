import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, FileText, Shield, AlertTriangle, BookOpen, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
    <div className="bg-[#0B1F3A]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#C8A44D]/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Legal Advisory
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Legal <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">Issues</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            Expert legal guidance, compliance updates, and regulatory advisory services to protect and empower your business.
          </p>
        </div>
      </section>

      {/* Legal Services Accordion */}
      <section className="py-16" ref={ref}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Legal Advisory Services</h2>
            <p className="text-white/50">Comprehensive legal support across all areas of business law.</p>
          </div>

          <div className="space-y-4">
            {legalTopics.map((topic, i) => (
              <div
                key={i}
                className={`rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden transition-all duration-500 ${
                  expandedTopic === i ? 'border-[#C8A44D]/30' : 'hover:border-white/10'
                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setExpandedTopic(expandedTopic === i ? null : i)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] flex-shrink-0">
                    {topic.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1">{topic.title}</h3>
                    <p className="text-white/40 text-sm">{topic.summary}</p>
                  </div>
                  <div className="text-[#C8A44D] flex-shrink-0">
                    {expandedTopic === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <div
                  className={`transition-all duration-500 overflow-hidden ${
                    expandedTopic === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 pl-[88px]">
                    <p className="text-white/60 leading-relaxed">{topic.content}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 mt-4 text-[#C8A44D] text-sm font-medium hover:gap-3 transition-all"
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
      <section className="py-24 bg-[#0a1a30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Regulatory Updates
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Recent Legal Developments</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Stay informed about the latest regulatory changes and legal developments that may affect your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentUpdates.map((update, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/20 transition-all duration-300 group cursor-pointer"
              >
                <span className="text-[#C8A44D] text-sm font-medium">{update.date}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-[#C8A44D] transition-colors">
                  {update.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{update.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need Legal Guidance?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Our legal experts are ready to help you navigate complex regulatory landscapes and protect your business interests.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300"
          >
            Contact Our Legal Team <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LegalPage;
