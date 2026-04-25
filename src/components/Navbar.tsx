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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-brand-ivory/95 backdrop-blur-md border-b border-brand-hair'
          : 'bg-brand-ivory border-b border-transparent'
      }`}
    >
      <div className="max-w-[88rem] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo / Wordmark */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 bg-brand-ink flex items-center justify-center">
              <span className="text-brand-ivory font-display font-semibold text-[15px]">
                GD
              </span>
            </div>
            <div className="hidden sm:block leading-none">
              <span className="block text-brand-ink font-display font-medium text-[17px] tracking-tight group-hover:text-brand-accent transition-colors">
                Golden Dimensions
              </span>
              <span className="block mt-1 text-brand-mute text-[10px] tracking-[0.22em] uppercase">
                Established 2003
              </span>
            </div>
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
                  className={`px-3.5 py-2 text-[13.5px] font-medium tracking-tight transition-colors relative ${
                    active
                      ? 'text-brand-ink'
                      : 'text-brand-ink-2 hover:text-brand-ink'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-3.5 right-3.5 -bottom-[26px] h-px bg-brand-ink transition-opacity ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </Link>
              );
            })}
            <Link
              to="/contact"
              className="ml-4 inline-flex items-center gap-2 px-5 py-2.5 bg-brand-ink text-brand-ivory text-[13px] font-medium tracking-tight hover:bg-brand-accent transition-colors"
            >
              Request Consultation
              <ArrowRight size={14} />
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

      {/* Mobile menu */}
      <div
        className={`xl:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[640px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-brand-paper border-t border-brand-hair px-6 py-6 space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-2 py-3 text-[15px] font-medium tracking-tight border-b border-brand-hair last:border-0 transition-colors ${
                  active ? 'text-brand-ink' : 'text-brand-ink-2 hover:text-brand-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            to="/contact"
            className="mt-4 inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-ink text-brand-ivory text-[14px] font-medium hover:bg-brand-accent transition-colors"
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
