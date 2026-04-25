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

// =============================================================================
// Consulting-grade footer information architecture:
//   1. Engagement CTA banner
//   2. Capability columns (Capabilities · Industries · Firm · Contact)
//   3. Global presence + bottom legal bar
// =============================================================================

const firmLinks = [
  { label: 'About the Firm', path: '/about' },
  { label: 'How We Deliver', path: '/services#methodology' },
  { label: 'Insights', path: '/news' },
  { label: 'Legal Advisory', path: '/legal' },
  { label: 'Transport Logistics', path: '/transport' },
  { label: 'Contact', path: '/contact' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1F3A] relative overflow-hidden border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* ----------------------------------------------------------------
             1. Engagement CTA banner
           ---------------------------------------------------------------- */}
        <div className="rounded-2xl border border-[#C8A44D]/20 bg-gradient-to-r from-[#C8A44D]/[0.08] via-[#C8A44D]/[0.04] to-transparent p-8 md:p-10 mb-16 md:mb-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <span className="block text-[#C8A44D] text-xs font-semibold uppercase tracking-[0.24em] mb-3">
                Engage With Us
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
                Discuss your next transformation with our multidisciplinary
                team.
              </h3>
            </div>
            <Link
              to="/contact"
              className="shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-md hover:shadow-lg hover:shadow-[#C8A44D]/25 transition-all"
            >
              Request Consultation <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* ----------------------------------------------------------------
             2. Capability columns
           ---------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-3">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#C8A44D] to-[#E8C96D] flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-base">GD</span>
              </div>
              <div>
                <span className="block text-white font-semibold text-base tracking-tight">
                  Golden Dimensions
                </span>
                <span className="block text-[#C8A44D] text-[10px] tracking-[0.24em] uppercase">
                  Ltd · Established 2003
                </span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-sm">
              Multidisciplinary consulting and engineering capability for
              institutions, enterprises, and governments worldwide.
            </p>
            <div className="flex space-x-2">
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
                  className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/55 hover:bg-[#C8A44D]/10 hover:text-[#C8A44D] hover:border-[#C8A44D]/30 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3">
            <h4 className="text-[#C8A44D] font-semibold text-[11px] uppercase tracking-[0.24em] mb-6">
              Capabilities
            </h4>
            <ul className="space-y-3">
              {pillars.map((pillar) => (
                <li key={pillar.id}>
                  <Link
                    to="/services#pillars"
                    className="text-white/55 hover:text-[#C8A44D] transition-colors text-sm leading-snug flex items-start gap-2"
                  >
                    <span className="text-[#C8A44D]/50 font-mono text-[10px] mt-1">
                      {pillar.index}
                    </span>
                    <span>{pillar.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/services"
                  className="text-[#C8A44D] hover:underline text-xs font-semibold uppercase tracking-[0.18em] inline-flex items-center gap-1"
                >
                  View all capabilities <ArrowUpRight size={12} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="lg:col-span-3">
            <h4 className="text-[#C8A44D] font-semibold text-[11px] uppercase tracking-[0.24em] mb-6">
              Industries
            </h4>
            <ul className="space-y-3">
              {industries.map((industry) => (
                <li key={industry.id}>
                  <Link
                    to="/industries"
                    className="text-white/55 hover:text-[#C8A44D] transition-colors text-sm leading-snug"
                  >
                    {industry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Firm + Contact (stacked on the right column) */}
          <div className="lg:col-span-3 space-y-10">
            <div>
              <h4 className="text-[#C8A44D] font-semibold text-[11px] uppercase tracking-[0.24em] mb-6">
                The Firm
              </h4>
              <ul className="space-y-3">
                {firmLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/55 hover:text-[#C8A44D] transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[#C8A44D] font-semibold text-[11px] uppercase tracking-[0.24em] mb-6">
                Contact
              </h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="mailto:admin@golden-dimensions.org"
                    className="flex items-start gap-3 text-white/55 hover:text-[#C8A44D] transition-colors text-sm"
                  >
                    <Mail size={14} className="mt-0.5 shrink-0" />
                    admin@golden-dimensions.org
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+442012345678"
                    className="flex items-start gap-3 text-white/55 hover:text-[#C8A44D] transition-colors text-sm"
                  >
                    <Phone size={14} className="mt-0.5 shrink-0" />
                    +44 20 1234 5678
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-white/55 text-sm">
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

        {/* ----------------------------------------------------------------
             3. Global presence signals
           ---------------------------------------------------------------- */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8 mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Globe2 size={18} className="text-[#C8A44D]" />
              <span className="text-white/70 text-sm tracking-wide">
                Serving organisations across{' '}
                <span className="text-white font-semibold">50+ countries</span>{' '}
                · Public and private sector institutions · Multidisciplinary
                consulting since 2003
              </span>
            </div>
            <Link
              to="/about"
              className="text-[#C8A44D] text-xs font-semibold uppercase tracking-[0.2em] hover:underline inline-flex items-center gap-1 shrink-0"
            >
              About the firm <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>

        {/* ----------------------------------------------------------------
             Bottom legal bar
           ---------------------------------------------------------------- */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs tracking-wide">
            © {new Date().getFullYear()} Golden Dimensions Ltd · Registered in
            the United Kingdom · All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/legal"
              className="text-white/40 hover:text-[#C8A44D] text-xs transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="/legal"
              className="text-white/40 hover:text-[#C8A44D] text-xs transition-colors"
            >
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-white/50 hover:bg-[#C8A44D]/10 hover:text-[#C8A44D] hover:border-[#C8A44D]/30 transition-all"
              aria-label="Scroll to top"
            >
              <svg
                width="14"
                height="14"
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
