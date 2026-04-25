import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUpRight, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B1F3A] relative overflow-hidden">
      {/* Gold accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#C8A44D] to-transparent" />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-[#C8A44D]/10 to-[#C8A44D]/5 rounded-2xl p-8 md:p-12 border border-[#C8A44D]/20 mb-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Ready to Transform Your Business?
              </h3>
              <p className="text-white/60 text-lg">
                Let's discuss how Golden Dimensions can help you achieve excellence.
              </p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 px-8 py-4 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#C8A44D]/25 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              Request Consultation
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A44D] to-[#E8C96D] flex items-center justify-center">
                <span className="text-[#0B1F3A] font-bold text-lg">GD</span>
              </div>
              <div>
                <span className="text-white font-semibold text-lg">Golden Dimensions</span>
                <span className="block text-[#C8A44D] text-[10px] tracking-[0.2em] uppercase">Ltd</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Always Pursuing Excellence in Business. A global multidisciplinary company delivering expertise across finance, engineering, technology, and more since 2003.
            </p>
            <div className="flex space-x-3">
              {[Linkedin, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#C8A44D]/20 hover:text-[#C8A44D] transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#C8A44D] font-semibold text-sm uppercase tracking-wider mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Transport Logistics', path: '/transport' },
                { label: 'News & Insights', path: '/news' },
                { label: 'Legal Issues', path: '/legal' },
                { label: 'Contact Us', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-[#C8A44D] transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#C8A44D] transition-all duration-300" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#C8A44D] font-semibold text-sm uppercase tracking-wider mb-6">Services</h4>
            <ul className="space-y-3">
              {['Accounting', 'Engineering', 'Finance', 'Marketing', 'Programming', 'Transport', 'Websites', 'Consulting'].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-white/50 hover:text-[#C8A44D] transition-colors text-sm flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#C8A44D] transition-all duration-300" />
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-[#C8A44D] font-semibold text-sm uppercase tracking-wider mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:admin@golden-dimensions.org"
                  className="flex items-start gap-3 text-white/50 hover:text-[#C8A44D] transition-colors text-sm"
                >
                  <Mail size={16} className="mt-0.5 flex-shrink-0" />
                  admin@golden-dimensions.org
                </a>
              </li>
              <li>
                <a
                  href="tel:+442012345678"
                  className="flex items-start gap-3 text-white/50 hover:text-[#C8A44D] transition-colors text-sm"
                >
                  <Phone size={16} className="mt-0.5 flex-shrink-0" />
                  +44 20 1234 5678
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-white/50 text-sm">
                  <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Golden Dimensions Ltd<br />
                    London, United Kingdom
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; 2024 Golden Dimensions Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="text-white/40 hover:text-[#C8A44D] text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal" className="text-white/40 hover:text-[#C8A44D] text-sm transition-colors">
              Terms of Service
            </Link>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#C8A44D]/20 hover:text-[#C8A44D] transition-all duration-300"
              aria-label="Scroll to top"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 12V4M4 8l4-4 4 4" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A44D]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C8A44D]/2 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
};

export default Footer;
