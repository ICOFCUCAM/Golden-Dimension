import React from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Linkedin,
  Twitter,
  Facebook,
  Globe2,
} from 'lucide-react';
import { pillars, industries } from '@/data/servicesPage';

const firmLinks = [
  { label: 'About the Firm', path: '/about' },
  { label: 'How We Deliver', path: '/services#methodology' },
  { label: 'Insights', path: '/news' },
  { label: 'Legal Advisory', path: '/legal' },
  { label: 'Transport Logistics', path: '/transport' },
  { label: 'Contact', path: '/contact' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-brand-ink text-brand-on-dark border-t border-white/10">
      <div className="max-w-[88rem] mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-12">
        {/* Engagement banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-16 mb-16 border-b border-white/10">
          <div className="lg:col-span-7">
            <span className="block text-brand-accent-soft text-[11px] font-medium uppercase tracking-[0.22em] mb-5">
              <span className="inline-flex items-center gap-3">
                <span className="block h-px w-6 bg-current opacity-50" />
                Engage With Us
              </span>
            </span>
            <h3 className="font-display text-[28px] md:text-[40px] font-medium leading-[1.08] text-brand-on-dark max-w-2xl">
              Discuss your next transformation with our multidisciplinary team.
            </h3>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end items-end">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-brand-on-dark text-brand-ink text-[14px] font-medium tracking-tight hover:bg-white transition-colors"
            >
              Request Consultation
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        {/* Capability columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-9 h-9 bg-brand-ivory text-brand-ink flex items-center justify-center font-display font-semibold text-[15px]">
                GD
              </div>
              <div className="leading-none">
                <span className="block font-display font-medium text-[16px] text-brand-on-dark tracking-tight">
                  Golden Dimensions
                </span>
                <span className="block mt-1 text-[10px] tracking-[0.22em] uppercase text-brand-on-dark-2">
                  Ltd · Established 2003
                </span>
              </div>
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.6] text-brand-on-dark-2">
              Multidisciplinary consulting and engineering capability for
              institutions, enterprises, and governments worldwide.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-brand-on-dark-2 hover:border-brand-accent-soft hover:text-brand-accent-soft transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-brand-accent-soft text-[10px] font-medium uppercase tracking-[0.24em] mb-6">
              Capabilities
            </h4>
            <ul className="space-y-3.5">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    to="/services#pillars"
                    className="text-[13.5px] leading-snug text-brand-on-dark-2 hover:text-brand-on-dark transition-colors flex items-start gap-3"
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
                  className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-accent-soft hover:underline inline-flex items-center gap-1.5"
                >
                  All capabilities <ArrowUpRight size={11} />
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-brand-accent-soft text-[10px] font-medium uppercase tracking-[0.24em] mb-6">
              Industries
            </h4>
            <ul className="space-y-3.5">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    to="/industries"
                    className="text-[13.5px] leading-snug text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-10">
            <div>
              <h4 className="text-brand-accent-soft text-[10px] font-medium uppercase tracking-[0.24em] mb-6">
                The Firm
              </h4>
              <ul className="space-y-3.5">
                {firmLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-[13.5px] text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-brand-accent-soft text-[10px] font-medium uppercase tracking-[0.24em] mb-6">
                Contact
              </h4>
              <ul className="space-y-3.5">
                <li>
                  <a
                    href="mailto:admin@golden-dimensions.org"
                    className="flex items-start gap-3 text-[13.5px] text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                  >
                    <Mail size={14} className="mt-0.5 shrink-0" />
                    admin@golden-dimensions.org
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+442012345678"
                    className="flex items-start gap-3 text-[13.5px] text-brand-on-dark-2 hover:text-brand-on-dark transition-colors"
                  >
                    <Phone size={14} className="mt-0.5 shrink-0" />
                    +44 20 1234 5678
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-[13.5px] text-brand-on-dark-2">
                    <MapPin size={14} className="mt-0.5 shrink-0" />
                    <span>
                      Golden Dimensions Ltd
                      <br />
                      London, United Kingdom
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Global presence row */}
        <div className="border-t border-b border-white/10 py-6 mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3 text-[13px] text-brand-on-dark-2">
            <Globe2 size={16} className="text-brand-accent-soft" />
            <span>
              Serving organisations across{' '}
              <span className="text-brand-on-dark font-medium">50+ countries</span> ·
              Public and private sector institutions · Multidisciplinary consulting
              since 2003
            </span>
          </div>
          <Link
            to="/about"
            className="text-[11px] font-medium uppercase tracking-[0.2em] text-brand-accent-soft hover:underline inline-flex items-center gap-1.5 shrink-0"
          >
            About the firm <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Legal bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-on-dark-2 text-[12px] tracking-wide">
            © {new Date().getFullYear()} Golden Dimensions Ltd · Registered in
            the United Kingdom · All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/legal"
              className="text-brand-on-dark-2 hover:text-brand-on-dark text-[12px] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/legal"
              className="text-brand-on-dark-2 hover:text-brand-on-dark text-[12px] transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 border border-white/15 flex items-center justify-center text-brand-on-dark-2 hover:border-brand-accent-soft hover:text-brand-accent-soft transition-colors"
              aria-label="Scroll to top"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
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
