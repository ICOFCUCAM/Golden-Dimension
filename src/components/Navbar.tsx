import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Capabilities', path: '/services' },
  { label: 'Industries', path: '/industries' },
  { label: 'Transport Logistics', path: '/transport' },
  { label: 'Insights', path: '/news' },
  { label: 'Legal Advisory', path: '/legal' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'shadow-[0_1px_0_rgba(0,0,0,0.06)]' : ''
      }`}
    >
      {/* Slim dark technical bar — gives the whole nav a publication-header
          feel and ensures the bar is always visible against the ivory body. */}
      <div className="bg-brand-ink text-brand-on-dark">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-10 h-7 flex items-center justify-between">
          <span className="label-technical text-brand-on-dark-2">
            <span className="text-brand-accent-soft">EST.</span> 2003 / GLOBAL · MULTIDISCIPLINARY
          </span>
          <span className="hidden md:inline label-technical text-brand-on-dark-2">
            EN · GMT+0
          </span>
        </div>
      </div>

      {/* Main navigation bar — paper-white so it sits visibly above the
          warm-ivory page surface. */}
      <div className="bg-brand-paper border-b border-brand-hair">
        <div className="max-w-[88rem] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            {/* Logo — GD monogram (PNG) + typeset wordmark next to it. */}
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <img
                src="https://ousjmnfvtdnztyqqyvay.supabase.co/storage/v1/object/public/Golden%20Dimension/GD.png"
                alt="Golden Dimensions"
                className="block h-9 w-auto"
              />
              <span className="hidden sm:block leading-none">
                <span className="block text-brand-ink font-display font-medium text-[17px] tracking-[-0.015em] group-hover:text-brand-accent transition-colors">
                  Golden Dimensions
                </span>
                <span className="block mt-1.5 label-technical text-brand-mute">
                  LTD · Established 2003
                </span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center">
              {navLinks.map((link) => {
                const active =
                  location.pathname === link.path ||
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 text-[13px] font-medium tracking-[-0.01em] transition-colors relative ${
                      active ? 'text-brand-ink' : 'text-brand-ink-2 hover:text-brand-ink'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-3.5 right-3.5 -bottom-[24px] h-px bg-brand-accent transition-opacity ${
                        active ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </Link>
                );
              })}
              <Link
                to="/contact"
                className="ml-4 group inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-[-0.01em] hover:bg-brand-accent transition-colors"
              >
                Request Consultation
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden text-brand-ink p-2 hover:text-brand-accent transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`xl:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-paper border-t border-brand-hair px-6 py-6">
          <div className="space-y-1">
            {navLinks.map((link, idx) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-4 py-3 text-[15px] font-medium tracking-[-0.01em] border-b border-brand-hair last:border-0 transition-colors ${
                    active ? 'text-brand-ink' : 'text-brand-ink-2 hover:text-brand-ink'
                  }`}
                >
                  <span className="label-technical text-brand-accent w-8">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </Link>
              );
            })}
          </div>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-ink text-brand-ivory text-[14px] font-medium hover:bg-brand-accent transition-colors"
          >
            Request Consultation
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
