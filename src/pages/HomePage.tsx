import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Users, Clock, Globe2, Layers, ChevronRight } from 'lucide-react';
import { services } from '@/data/services';
import ServiceIcon from '@/components/ServiceIcon';
import { useScrollAnimation, useCountUp } from '@/hooks/useScrollAnimation';

const StatCard: React.FC<{ value: number; suffix: string; label: string; icon: React.ReactNode; delay: number }> = ({ value, suffix, label, icon, delay }) => {
  const { ref, isVisible } = useScrollAnimation(0.2);
  const count = useCountUp(value, 2000, isVisible);

  return (
    <div
      ref={ref}
      className={`text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all duration-700 hover:bg-white/10 hover:border-[#C8A44D]/30 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] group-hover:bg-[#C8A44D]/20 transition-colors">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {count}{suffix}
      </div>
      <div className="text-white/50 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollAnimation(0.1);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation(0.1);

  return (
    <div className="bg-[#0B1F3A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977155989_8f3386e4.jpg"
            alt="Global professionals collaborating"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B1F3A]/95 via-[#0B1F3A]/80 to-[#0B1F3A]/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-transparent to-transparent" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#C8A44D]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#C8A44D]/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8A44D]/10 border border-[#C8A44D]/30 mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-[#C8A44D] animate-pulse" />
              <span className="text-[#C8A44D] text-sm font-medium">Established 2003 — Global Excellence</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[0.95] tracking-tight">
              Golden
              <br />
              <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
                Dimensions
              </span>
              <span className="text-[#C8A44D] text-4xl md:text-5xl lg:text-6xl ml-2">Ltd</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#C8A44D]/80 font-light tracking-wide mb-6 italic">
              Always Pursuing Excellence in Business
            </p>

            <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-2xl">
              Golden Dimensions Ltd is a global multidisciplinary company founded in 2003. With more than{' '}
              <span className="text-white font-semibold">200 professionals worldwide</span>, we deliver expertise across
              finance, engineering, technology, education, healthcare, sustainability, and strategic consulting.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Explore Our Services
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-[#C8A44D]/50 hover:bg-white/5 transition-all duration-300"
              >
                Contact Our Team
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#C8A44D]/50 to-transparent" />
        </div>
      </section>

      {/* Trust Statistics */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard value={200} suffix="+" label="Professionals Worldwide" icon={<Users size={24} />} delay={0} />
            <StatCard value={20} suffix="+" label="Years of Experience" icon={<Clock size={24} />} delay={100} />
            <StatCard value={50} suffix="+" label="Countries Served" icon={<Globe2 size={24} />} delay={200} />
            <StatCard value={16} suffix="" label="Service Disciplines" icon={<Layers size={24} />} delay={300} />
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-[#0a1a30] relative" ref={servicesRef}>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOEE0NEQiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Services
            </h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Comprehensive professional services spanning 16 disciplines, delivered with excellence and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                className={`group p-6 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-[#C8A44D]/30 transition-all duration-500 hover:-translate-y-1 ${
                  servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-4 group-hover:bg-[#C8A44D]/20 transition-colors">
                  <ServiceIcon icon={service.icon} size={22} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#C8A44D] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[#C8A44D] text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ChevronRight size={14} />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#C8A44D]/30 text-[#C8A44D] font-semibold rounded-lg hover:bg-[#C8A44D]/10 transition-all duration-300"
            >
              View All Services
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
                About Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                A Legacy of
                <br />
                <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">
                  Excellence
                </span>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-6">
                Since 2003, Golden Dimensions Ltd has been at the forefront of global professional services. Our multidisciplinary approach combines academic rigor with practical expertise to deliver outstanding results for clients across every industry.
              </p>
              <p className="text-white/60 leading-relaxed mb-8">
                With a network of over 200 professionals spanning multiple continents, we bring diverse perspectives and deep expertise to every engagement. Our commitment to excellence, integrity, and innovation drives everything we do.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-[#C8A44D] font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn More About Us <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International professionals working together"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0B1F3A] border border-[#C8A44D]/20 rounded-xl p-6 shadow-xl">
                <div className="text-3xl font-bold text-[#C8A44D] mb-1">20+</div>
                <div className="text-white/60 text-sm">Years of Global<br />Excellence</div>
              </div>
              {/* Gold corner accent */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-[#C8A44D]/30 rounded-tr-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Industries */}
      <section className="py-24 bg-[#0a1a30]" ref={ctaRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Industries
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sectors We Serve
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Financial Services',
                desc: 'Strategic advisory, risk management, and financial transformation for banks, insurers, and investment firms.',
                image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977278005_0d9f47a5.jpg'
              },
              {
                title: 'Technology & Telecom',
                desc: 'Digital transformation, network infrastructure, and software solutions for the connected world.',
                image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977370549_8a38d5c2.png'
              },
              {
                title: 'Healthcare & Life Sciences',
                desc: 'Improving patient outcomes and operational excellence across healthcare organizations.',
                image: 'https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977301660_a8b4da81.png'
              }
            ].map((industry, i) => (
              <div
                key={i}
                className={`group relative rounded-2xl overflow-hidden h-80 cursor-pointer transition-all duration-700 ${
                  ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <img
                  src={industry.image}
                  alt={industry.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h3 className="text-xl font-bold text-white mb-2">{industry.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{industry.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Quote */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-[#C8A44D] text-6xl font-serif mb-6">"</div>
          <blockquote className="text-2xl md:text-3xl text-white/80 font-light leading-relaxed mb-8 italic">
            Excellence is not a destination but a continuous journey. At Golden Dimensions, we partner with our clients to navigate complexity and unlock transformative growth.
          </blockquote>
          <div className="w-16 h-0.5 bg-[#C8A44D] mx-auto mb-4" />
          <p className="text-[#C8A44D] font-semibold">Leadership Team</p>
          <p className="text-white/40 text-sm">Golden Dimensions Ltd</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
