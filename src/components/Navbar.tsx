import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

// Consulting-grade information architecture: capability-first ordering.
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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0B1F3A]/95 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#C8A44D] to-[#E8C96D] flex items-center justify-center shadow-lg">
              <span className="text-[#0B1F3A] font-bold text-lg">GD</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-lg tracking-wide group-hover:text-[#C8A44D] transition-colors">
                Golden Dimensions
              </span>
              <span className="block text-[#C8A44D] text-[10px] tracking-[0.2em] uppercase">
                Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 text-[13px] font-medium transition-all duration-300 relative group whitespace-nowrap ${
                  location.pathname === link.path
                    ? 'text-[#C8A44D]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-[#C8A44D] transition-all duration-300 ${
                    location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-3 px-5 py-2.5 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] text-[13px] font-semibold rounded-md hover:shadow-lg hover:shadow-[#C8A44D]/25 transition-all duration-300"
            >
              Request Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-white p-2 hover:text-[#C8A44D] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`xl:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0B1F3A]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                location.pathname === link.path
                  ? 'text-[#C8A44D] bg-white/5'
                  : 'text-white/80 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="block mx-4 mt-3 px-6 py-3 bg-gradient-to-r from-[#C8A44D] to-[#E8C96D] text-[#0B1F3A] text-sm font-semibold rounded-lg text-center"
          >
            Request Consultation
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
