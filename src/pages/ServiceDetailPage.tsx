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
    <div className="bg-[#0B1F3A]">
      {/* Hero Banner */}
      <section className="relative pt-20 overflow-hidden">
        <div className="h-[400px] relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/70 to-[#0B1F3A]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/80 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-white/40 mb-6">
              <Link to="/" className="hover:text-[#C8A44D] transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link to="/services" className="hover:text-[#C8A44D] transition-colors">Services</Link>
              <ChevronRight size={14} />
              <span className="text-[#C8A44D]">{service.title}</span>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-[#C8A44D]/10 border border-[#C8A44D]/20 flex items-center justify-center text-[#C8A44D]">
                <ServiceIcon icon={service.icon} size={28} />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
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
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <p className="text-white/60 text-lg leading-relaxed mb-12">
                {service.fullDescription}
              </p>

              {/* Features */}
              <h2 className="text-2xl font-bold text-white mb-6">Service Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {service.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/20 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#C8A44D]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={14} className="text-[#C8A44D]" />
                    </div>
                    <span className="text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <h2 className="text-2xl font-bold text-white mb-6">Key Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-gradient-to-br from-[#C8A44D]/5 to-transparent border border-[#C8A44D]/10"
                  >
                    <div className="text-[#C8A44D] font-bold text-3xl mb-2">0{i + 1}</div>
                    <p className="text-white/70">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* CTA Card */}
              <div className="sticky top-28 space-y-6">
                <div className="p-8 rounded-2xl bg-gradient-to-br from-[#C8A44D]/10 to-[#C8A44D]/5 border border-[#C8A44D]/20">
                  <h3 className="text-xl font-bold text-white mb-4">
                    Interested in {service.title}?
                  </h3>
                  <p className="text-white/50 text-sm mb-6 leading-relaxed">
                    Get in touch with our team to discuss how our {service.title.toLowerCase()} services can benefit your organization.
                  </p>
                  <Link
                    to="/contact"
                    className="block w-full px-6 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg text-center hover:shadow-lg hover:shadow-[#C8A44D]/25 transition-all duration-300"
                  >
                    Request Consultation
                  </Link>
                </div>

                {/* Related Services */}
                <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                  <h3 className="text-lg font-bold text-white mb-4">Related Services</h3>
                  <div className="space-y-3">
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.id}
                        to={`/services/${rs.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-lg bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] flex-shrink-0">
                          <ServiceIcon icon={rs.icon} size={18} />
                        </div>
                        <span className="text-white/60 text-sm group-hover:text-[#C8A44D] transition-colors">
                          {rs.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Back to Services */}
                <Link
                  to="/services"
                  className="flex items-center gap-2 text-white/40 hover:text-[#C8A44D] transition-colors text-sm"
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
