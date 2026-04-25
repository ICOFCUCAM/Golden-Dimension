import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search } from 'lucide-react';
import { services } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServicesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, isVisible } = useScrollAnimation(0.05);

  const filteredServices = services.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-[#0B1F3A]">
      {/* Hero */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#C8A44D]/5 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
            Our Expertise
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Our <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed mb-10">
            Comprehensive professional services spanning 16 disciplines. From accounting to web development, we deliver excellence across every domain.
          </p>

          {/* Search */}
          <div className="max-w-md relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#C8A44D]/50 focus:bg-white/[0.08] transition-all"
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 pb-24" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-white/50 text-lg">No services found matching "{searchQuery}"</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#C8A44D] hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredServices.map((service, index) => (
                <Link
                  key={service.id}
                  to={`/services/${service.id}`}
                  className={`group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-[#C8A44D]/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#C8A44D]/5 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 40}ms` }}
                >
                  {/* Image */}
                  <div className="h-44 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-4 -mt-12 relative z-10 border border-[#C8A44D]/20 backdrop-blur-sm group-hover:bg-[#C8A44D]/20 transition-colors">
                      <ServiceIcon icon={service.icon} size={22} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C8A44D] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-3">
                      {service.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-[#C8A44D] text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-1">
                      View Details <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a1a30]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-white/60 text-lg mb-8">
            Our multidisciplinary team can create tailored solutions that combine expertise from multiple service areas.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300"
          >
            Request Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
