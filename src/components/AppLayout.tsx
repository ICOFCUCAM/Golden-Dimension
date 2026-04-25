import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import IndustriesPage from '@/pages/IndustriesPage';
import TransportPage from '@/pages/TransportPage';
import MethodologyPage from '@/pages/MethodologyPage';
import EngagementModelsPage from '@/pages/EngagementModelsPage';
import LeadershipPage from '@/pages/LeadershipPage';
import NewsPage from '@/pages/NewsPage';
import LegalPage from '@/pages/LegalPage';
import ContactPage from '@/pages/ContactPage';
import AdminPage from '@/pages/AdminPage';

const AppLayout: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const isAdmin = location.pathname === '/admin';

  const renderPage = () => {
    const path = location.pathname;
    if (path === '/') return <HomePage />;
    if (path === '/about') return <AboutPage />;
    if (path === '/services') return <ServicesPage />;
    if (path.startsWith('/services/')) return <ServiceDetailPage />;
    if (path === '/industries') return <IndustriesPage />;
    if (path === '/methodology') return <MethodologyPage />;
    if (path === '/engagement-models') return <EngagementModelsPage />;
    if (path === '/leadership') return <LeadershipPage />;
    if (path === '/transport') return <TransportPage />;
    if (path === '/news') return <NewsPage />;
    if (path === '/legal') return <LegalPage />;
    if (path === '/contact') return <ContactPage />;
    if (path === '/admin') return <AdminPage />;
    return <HomePage />;
  };

  return (
    <div className="min-h-screen bg-brand-ivory text-brand-ink">
      {!isAdmin && <Navbar />}
      <main>{renderPage()}</main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export default AppLayout;
