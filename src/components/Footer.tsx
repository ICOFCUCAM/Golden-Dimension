import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react';
import { pillars, industries } from '@/data/servicesPage';

const firmLinks = [
  { label: 'About the Firm',     path: '/about' },
  { label: 'How We Deliver',     path: '/services#methodology' },
  { label: 'Insights',           path: '/news' },
  { label: 'Legal Advisory',     path: '/legal' },
  { label: 'Transport Logistics',path: '/transport' },
  { label: 'Contact',            path: '/contact' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <footer className="bg-brand-ink text-brand-on-dark border-t border-white/10">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-10">
        {/* Engagement banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 mb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <span className="block h-px w-8 bg-brand-accent" aria-hidden />
              <span className="label-technical text-brand-accent">§ FN.01 · ENGAGEMENT</span>
            </div>
            <h3 className="text-[28px] md:text-[44px] font-semibold leading-[1.05] tracking-[-0.025em] text-brand-on-dark">
              Discuss your next transformation with our{' '}
              <span className="font-editorial italic text-brand-accent-soft">multidisciplinary team</span>.
            </h3>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-on-dark text-brand-ink text-[14px] font-medium tracking-[-0.01em] hover:bg-brand-accent-soft hover:text-brand-ink transition-colors"
            >
              Request Consultation
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Capability columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src="https://ousjmnfvtdnztyqqyvay.supabase.co/storage/v1/object/public/Golden%20Dimension/GD.png"
                alt="Golden Dimensions"
                className="block h-10 w-auto"
              />
              <span className="leading-none">
                <span className="block font-display font-medium text-[17px] text-brand-on-dark tracking-[-0.015em]">
                  Golden Dimensions
                </span>
                <span className="block mt-1.5 label-technical text-brand-on-dark-2">
                  LTD · EST. 2003
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[13.5px] leading-[1.6] text-brand-on-dark-2">
              Multidisciplinary consulting and engineering capability for
              institutions, enterprises, and governments worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter,  label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-brand-on-dark-2 hover:border-brand-accent-soft hover:text-brand-accent-soft transition-colors"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <span className="label-technical text-brand-accent-soft mb-6 block">§ FN.02 · CAPABILITIES</span>
            <ul className="space-y-3.5">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    to="/services#pillars"
                    className="text-[13px] leading-snug text-brand-on-dark-2 hover:text-brand-on-dark transition-colors flex items-start gap-3"
                  >
                    <span className="font-mono-tab text-[10px] text-brand-accent-soft mt-1 shrink-0">
                      {pillar.index}
                    </span>
                    <span>{pillar.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="label-technical text-brand-accent-soft hover:underline inline-flex items-center gap-1.5 mt-2"
                >
                  All capabilities <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <span className="label-technical text-brand-accent-soft mb-6 block">§ FN.03 · INDUSTRIES</span>
            <ul className="space-y-3.5">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    to="/industries"
                    className="text-[13px] leading-snug text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <div>
              <span className="label-technical text-brand-accent-soft mb-6 block">§ FN.04 · THE FIRM</span>
              <ul className="space-y-3.5">
                {firmLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[13px] text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="label-technical text-brand-accent-soft mb-6 block">§ FN.05 · CONTACT</span>
              <ul className="space-y-2.5 text-[13px] text-brand-on-dark-2">
                <li>
                  <a
                    href="mailto:admin@golden-dimensions.org"
                    className="hover:text-brand-on-dark transition-colors"
                  >
                    admin@golden-dimensions.org
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+442012345678"
                    className="hover:text-brand-on-dark transition-colors"
                  >
                    +44 20 1234 5678
                  </a>
                </li>
                <li className="leading-relaxed">
                  Golden Dimensions Ltd<br />
                  London, United Kingdom
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global presence row */}
        <div className="border-t border-b border-white/10 py-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-3 gap-x-8">
            <div className="flex items-baseline gap-3">
              <span className="label-technical text-brand-accent-soft">50+</span>
              <span className="text-[12.5px] text-brand-on-dark-2">Countries served</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="label-technical text-brand-accent-soft">200+</span>
              <span className="text-[12.5px] text-brand-on-dark-2">Multidisciplinary professionals</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="label-technical text-brand-accent-soft">20+</span>
              <span className="text-[12.5px] text-brand-on-dark-2">Years of consulting practice</span>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="label-technical text-brand-on-dark-2">
            © {new Date().getFullYear()} GOLDEN DIMENSIONS LTD · REG. UK · ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="label-technical text-brand-on-dark-2 hover:text-brand-on-dark transition-colors">
              Privacy
            </Link>
            <Link to="/legal" className="label-technical text-brand-on-dark-2 hover:text-brand-on-dark transition-colors">
              Terms
            </Link>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-brand-on-dark-2 hover:border-brand-accent-soft hover:text-brand-accent-soft transition-colors"
              aria-label="Scroll to top"
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12V4M4 8l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
