import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';

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
      {/* Hero Banner */}
      <section className="relative pt-20 overflow-hidden">
        <div className="h-[400px] relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ivory via-brand-ivory to-brand-ivory" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-ivory to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-brand-mute mb-6">
              <Link to="/" className="hover:text-brand-accent transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/services" className="hover:text-brand-accent transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-brand-accent">{service.title}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent">
                <ServiceIcon icon={service.icon} size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-ink">
                {service.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-brand-ink mb-6">Overview</h2>
              <p className="text-brand-ink-2 text-lg leading-relaxed mb-12">
                {service.fullDescription}
              </p>

              {/* Features */}
              <h2 className="text-2xl font-bold text-brand-ink mb-6">Service Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-brand-paper border border-brand-hair hover:border-brand-accent/30 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-brand-accent" />
                    </div>
                    <span className="text-brand-ink-2">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <h2 className="text-2xl font-bold text-brand-ink mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-gradient-to-br from-brand-ink to-transparent border border-brand-accent/30"
                  >
                    <div className="text-brand-accent font-bold text-3xl mb-2">0{i + 1}</div>
                    <p className="text-brand-ink-2">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="sticky top-28 space-y-6">
                <div className="p-8 bg-brand-paper border border-brand-hair-strong">
                  <h3 className="font-display text-xl font-medium text-brand-ink mb-4">
                    Interested in {service.title}?
                  </h3>
                  <p className="text-brand-ink-2 text-sm mb-6 leading-relaxed">
                    Get in touch with our team to discuss how our {service.title.toLowerCase()} services can benefit your organisation.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full px-6 py-4 bg-gradient-to-r from-brand-ink to-brand-ink text-brand-ivory font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-black/5 transition-all duration-300"
                  >
                    Request Consultation
                  </Link>
                </div>

                {/* Related Services */}
                <div className="p-8 rounded-2xl bg-brand-paper border border-brand-hair">
                  <h3 className="text-lg font-bold text-brand-ink mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.id}
                        to={`/services/${rs.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-brand-paper transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-brand-accent/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                          <ServiceIcon icon={rs.icon} size={18} />
                        </div>
                        <span className="text-brand-ink-2 text-sm group-hover:text-brand-accent transition-colors">
                          {rs.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Back to Services */}
                <Link
                  to="/services"
                  className="flex items-center gap-2 text-brand-mute hover:text-brand-accent transition-colors text-sm"
                >
                  <ArrowLeft size={16} />
                  Back to All Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;
