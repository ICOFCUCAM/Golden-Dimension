import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Gem, Shield, Lightbulb, Users, Leaf } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const values = [
  { icon: <Gem size={24} />, title: 'Excellence', desc: 'We pursue the highest standards in everything we do, delivering exceptional quality and results that exceed expectations.' },
  { icon: <Shield size={24} />, title: 'Integrity', desc: 'We operate with transparency, honesty, and ethical principles, building trust with every client relationship.' },
  { icon: <Lightbulb size={24} />, title: 'Innovation', desc: 'We embrace creative thinking and cutting-edge solutions to solve complex challenges and drive progress.' },
  { icon: <Users size={24} />, title: 'Collaboration', desc: 'We believe in the power of teamwork, bringing diverse perspectives together to achieve extraordinary outcomes.' },
  { icon: <Leaf size={24} />, title: 'Sustainability', desc: 'We are committed to responsible practices that create lasting value for communities and the environment.' },
];

const AboutPage: React.FC = () => {
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation();
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation();

  return (
    <div className="bg-[#0B1F3A]">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A] via-[#0a1a30] to-[#0B1F3A]" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#C8A44D]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">About Us</span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Who We <span className="bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] bg-clip-text text-transparent">Are</span>
          </h1>
          <p className="text-xl text-white/60 max-w-3xl leading-relaxed">
            Golden Dimensions Ltd prides itself on academic rigor, professional excellence, collaborative expertise, and outstanding client service. Since 2003, we have been building a global professional network with multidisciplinary capabilities that span industries and continents.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://d64gsuwffb70l.cloudfront.net/69ad7b9650a26a8c1a6eecd1_1772977411881_74b98593.jpg"
                  alt="International team collaboration"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#C8A44D]/30 rounded-br-2xl" />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#C8A44D]/30 rounded-tl-2xl" />
            </div>
            <div>
              <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Two Decades of Global Impact
              </h2>
              <p className="text-white/60 leading-relaxed mb-6">
                Founded in 2003, Golden Dimensions Ltd began as a small consultancy with a bold vision: to create a truly multidisciplinary professional services firm that could serve clients across any industry, anywhere in the world.
              </p>
              <p className="text-white/60 leading-relaxed mb-6">
                Today, with over 200 professionals spanning multiple continents, we have realized that vision and more. Our team brings together experts in finance, engineering, technology, education, healthcare, sustainability, and strategic consulting — all united by a shared commitment to excellence.
              </p>
              <p className="text-white/60 leading-relaxed">
                We don't just advise — we partner with our clients to navigate complexity, seize opportunities, and achieve transformative results. Our approach combines rigorous analysis with creative thinking, ensuring solutions that are both innovative and practical.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-[#0a1a30]" ref={missionRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`p-10 rounded-2xl bg-gradient-to-br from-[#C8A44D]/10 to-transparent border border-[#C8A44D]/20 transition-all duration-700 ${
                missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <div className="w-14 h-14 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-white/60 leading-relaxed">
                To deliver world-class professional services that empower organizations and individuals to achieve their full potential. We combine deep expertise with innovative thinking to solve complex challenges and create lasting value for our clients, our people, and the communities we serve.
              </p>
            </div>
            <div
              className={`p-10 rounded-2xl bg-gradient-to-br from-[#C8A44D]/10 to-transparent border border-[#C8A44D]/20 transition-all duration-700 ${
                missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="w-14 h-14 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-6">
                <Eye size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/60 leading-relaxed">
                To be the world's most trusted multidisciplinary professional services firm — recognized for our unwavering commitment to excellence, our global reach, and our ability to deliver transformative outcomes across every industry and discipline we serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24" ref={valuesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#C8A44D] text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Our Foundation
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Core Values</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              Five principles that guide every decision, every engagement, and every relationship at Golden Dimensions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <div
                key={value.title}
                className={`group p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.08] hover:border-[#C8A44D]/30 transition-all duration-500 ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                } ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#C8A44D]/10 flex items-center justify-center text-[#C8A44D] mb-6 group-hover:bg-[#C8A44D]/20 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C8A44D] transition-colors">
                  {value.title}
                </h3>
                <p className="text-white/50 leading-relaxed text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0a1a30]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Discover how Golden Dimensions can help your organization achieve its goals with our comprehensive professional services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-xl hover:shadow-[#C8A44D]/25 transition-all duration-300"
            >
              Explore Services <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:border-[#C8A44D]/50 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
