import React, { lazy, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import FloatingContactPill from '@/components/FloatingContactPill';

// HomePage loads eagerly so the landing page paint is fast.
import HomePage from '@/pages/HomePage';

// All other pages lazy-loaded so they ship as separate JS chunks and
// only download when the user navigates to them.
const AboutPage             = lazy(() => import('@/pages/AboutPage'));
const ServicesPage          = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage     = lazy(() => import('@/pages/ServiceDetailPage'));
const IndustriesPage        = lazy(() => import('@/pages/IndustriesPage'));
const SectorPage            = lazy(() => import('@/pages/SectorPage'));
const MethodologyPage       = lazy(() => import('@/pages/MethodologyPage'));
const EngagementModelsPage  = lazy(() => import('@/pages/EngagementModelsPage'));
const ConfiguratorPage      = lazy(() => import('@/pages/ConfiguratorPage'));
const LeadershipPage        = lazy(() => import('@/pages/LeadershipPage'));
const LeadershipTeamPage    = lazy(() => import('@/pages/LeadershipTeamPage'));
const CaseStudiesPage       = lazy(() => import('@/pages/CaseStudiesPage'));
const CaseStudyDetailPage   = lazy(() => import('@/pages/CaseStudyDetailPage'));
const TransportPage         = lazy(() => import('@/pages/TransportPage'));
const NewsPage              = lazy(() => import('@/pages/NewsPage'));
const InsightDetailPage     = lazy(() => import('@/pages/InsightDetailPage'));
const LegalPage             = lazy(() => import('@/pages/LegalPage'));
const ContactPage           = lazy(() => import('@/pages/ContactPage'));
const AdminPage             = lazy(() => import('@/pages/AdminPage'));
const AccountingPage        = lazy(() => import('@/pages/AccountingPage'));
const AuditPage             = lazy(() => import('@/pages/AuditPage'));
const PayPage               = lazy(() => import('@/pages/PayPage'));

// Loading fallback — minimal so it doesn't flash.
const PageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div
      className="w-6 h-6 border-2 border-brand-hair-strong border-t-brand-accent rounded-full animate-spin"
      role="status"
      aria-label="Loading"
    />
  </div>
);

const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // On every navigation (including clicking a Link to the page we're
    // already on), scroll to the hash target if present, otherwise scroll
    // to top. The setTimeout gives React a tick to mount the destination
    // route's DOM before we look up the element.
    const id = location.hash ? location.hash.slice(1) : '';
    const tick = window.setTimeout(() => {
      if (id) {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 0);
    return () => window.clearTimeout(tick);
  }, [location.pathname, location.hash, location.key]);

  const isChromeless =
    location.pathname === '/admin' ||
    location.pathname === '/accounting' ||
    location.pathname === '/audit';

  const renderPage = () => {
    const path = location.pathname;
    if (path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/services') return <ServicesPage />;
    if (path.startsWith('/services/')) return <ServiceDetailPage />;
    if (path === '/industries') return <IndustriesPage />;
    if (path.startsWith('/industries/')) return <SectorPage />;
    if (path === '/methodology') return <MethodologyPage />;
    if (path === '/engagement-models/configurator') return <ConfiguratorPage />;
    if (path === '/engagement-models') return <EngagementModelsPage />;
    if (path === '/leadership/team') return <LeadershipTeamPage />;
    if (path === '/leadership') return <LeadershipPage />;
    if (path === '/case-studies') return <CaseStudiesPage />;
    if (path.startsWith('/case-studies/')) return <CaseStudyDetailPage />;
    if (path === '/transport') return <TransportPage />;
    if (path === '/news') return <NewsPage />;
    if (path.startsWith('/news/')) return <InsightDetailPage />;
    if (path === '/legal') return <LegalPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/admin') return <AdminPage />;
    if (path === '/accounting') return <AccountingPage />;
    if (path === '/audit') return <AuditPage />;
    if (path.startsWith('/pay/')) return <PayPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      {/* Skip link — visible only on keyboard focus, jumps past navigation. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-ink focus:text-brand-ivory focus:text-[13px] focus:font-medium"
      >
        Skip to main content
      </a>
      {!isChromeless && <Navbar />}
      <main id="main-content" role="main" tabIndex={-1}>
        <Suspense fallback={<PageLoader />}>{renderPage()}</Suspense>
      </main>
      {!isChromeless && <Footer />}

      {/* Site-wide overlays (consent banner + floating CTA pill).
          Both are dismissible and persist their state in localStorage. */}
      {!isChromeless && <FloatingContactPill />}
      {!isChromeless && <CookieConsent />}
    </div>
  );
};

export default AppLayout;
