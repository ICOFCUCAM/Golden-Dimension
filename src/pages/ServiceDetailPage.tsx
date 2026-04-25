import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import {
  PageHeader,
  Container,
  Section,
  TechnicalLabel,
  PrimaryCta,
} from '@/components/section-primitives';
import { Seo } from '@/components/Seo';

const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = services.find((s) => s.id === serviceId);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const currentIndex = services.findIndex((s) => s.id === serviceId);
  const relatedServices = services.filter((s) => s.id !== serviceId).slice(0, 3);

  return (
    <div className="bg-brand-ivory">
      <Seo
        title={`${service.title} — capability detail`}
        description={service.shortDescription}
        path={`/services/${service.id}`}
      />
      <PageHeader
        eyebrow="Capability Detail"
        index={`SVC.${String(currentIndex + 1).padStart(2, '0')}`}
        title={
          <span className="inline-flex items-center gap-5 flex-wrap">
            <span className="w-12 h-12 md:w-14 md:h-14 border border-brand-ink flex items-center justify-center text-brand-ink shrink-0">
              <ServiceIcon icon={service.icon} size={22} />
            </span>
            <span>{service.title}</span>
          </span>
        }
        subtitle={
          <div>
            <div className="flex items-center gap-2 text-[12px] tracking-tight text-brand-mute mb-4">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link to="/services" className="hover:text-brand-accent transition-colors">Capabilities</Link>
              <ChevronRight size={12} />
              <span className="text-brand-ink">{service.title}</span>
            </div>
            {service.shortDescription}
          </div>
        }
      />

      <Section tone="paper">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Main editorial content */}
            <article className="lg:col-span-8 max-w-3xl">
              <TechnicalLabel index="01">Overview</TechnicalLabel>
              <p className="mt-7 text-[16.5px] md:text-[18px] leading-[1.7] text-brand-ink-2">
                {service.fullDescription}
              </p>

              {/* Features — editorial rule grid */}
              <div className="mt-16">
                <TechnicalLabel index="02">Service Features</TechnicalLabel>
                <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                  What this engagement covers
                </h2>

                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-brand-hair">
                  {service.features.map((feature, i) => (
                    <li
                      key={feature}
                      className="border-r border-b border-brand-hair p-5 flex items-baseline gap-3"
                    >
                      <span className="font-mono-tab text-[10px] tracking-widest text-brand-accent shrink-0">
                        F.{String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14px] text-brand-ink leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits — numbered editorial blocks */}
              <div className="mt-16">
                <TechnicalLabel index="03">Key Benefits</TechnicalLabel>
                <h2 className="mt-7 font-display text-[24px] md:text-[28px] font-medium tracking-[-0.015em] text-brand-ink leading-tight">
                  What clients get from this engagement
                </h2>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 border-t border-l border-brand-hair">
                  {service.benefits.map((benefit, i) => (
                    <div
                      key={benefit}
                      className="border-r border-b border-brand-hair p-7"
                    >
                      <div className="font-display font-medium text-[28px] md:text-[32px] leading-none tracking-[-0.02em] text-brand-ink font-mono-tab">
                        0{i + 1}
                      </div>
                      <p className="mt-4 text-[14.5px] leading-[1.65] text-brand-ink-2">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 space-y-10">
                {/* Engagement CTA */}
                <div className="bg-brand-stone border border-brand-hair-strong p-8">
                  <TechnicalLabel index="ENG">Engagement</TechnicalLabel>
                  <h3 className="mt-6 font-display text-[20px] md:text-[22px] font-medium tracking-[-0.015em] text-brand-ink leading-snug">
                    Discuss this capability with the practice team.
                  </h3>
                  <p className="mt-4 text-[13.5px] leading-[1.6] text-brand-ink-2">
                    A partner from the {service.title.toLowerCase()} practice will respond within one business day.
                  </p>
                  <div className="mt-6">
                    <PrimaryCta to="/contact">Request Consultation</PrimaryCta>
                  </div>
                </div>

                {/* Related capabilities */}
                <div>
                  <TechnicalLabel index="REL">Related Capabilities</TechnicalLabel>
                  <ul className="mt-6 border-t border-brand-hair">
                    {relatedServices.map((rs) => (
                      <li key={rs.id} className="border-b border-brand-hair">
                        <Link
                          to={`/services/${rs.id}`}
                          className="group flex items-center justify-between py-4 hover:text-brand-accent transition-colors"
                        >
                          <span className="flex items-center gap-3">
                            <ServiceIcon icon={rs.icon} size={16} className="text-brand-mute group-hover:text-brand-accent transition-colors" />
                            <span className="text-[14px] tracking-tight text-brand-ink group-hover:text-brand-accent transition-colors">
                              {rs.title}
                            </span>
                          </span>
                          <ArrowRight size={13} className="text-brand-mute group-hover:text-brand-accent group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/services"
                  className="group inline-flex items-center gap-2 text-[13px] font-medium tracking-tight text-brand-ink-2 hover:text-brand-accent transition-colors"
                >
                  <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
                  All capabilities
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default ServiceDetailPage;
