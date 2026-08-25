import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Layout & Common
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import SearchModal from './components/common/SearchModal';
import ComplianceChatbot from './components/chat/ComplianceChatbot';
import WhatsAppFloatingWidget from './components/common/WhatsAppFloatingWidget';
import ErrorBoundary from './components/common/ErrorBoundary';
import PlatformLoader from './components/common/PlatformLoader';
import PageEnhancements from './components/common/PageEnhancements';
import useScrollReveal from './hooks/useScrollReveal';

// Modals
import ConsultationModal from './components/workflows/ConsultationModal';
import OrderServiceModal from './components/workflows/OrderServiceModal';

// Public Pages
import HomePage from './pages/public/HomePage';
import SolutionsPage from './pages/public/SolutionsPage';
import SolutionDetailPage from './pages/public/SolutionDetailPage';
import IndustriesPage from './pages/public/IndustriesPage';
import IndustryDetailPage from './pages/public/IndustryDetailPage';
import GlobalCompliancePage from './pages/public/GlobalCompliancePage';
import CountryDetailPage from './pages/public/CountryDetailPage';
import RegulationsPage from './pages/public/RegulationsPage';
import RegulationDetailPage from './pages/public/RegulationDetailPage';
import KnowledgeCenterPage from './pages/public/KnowledgeCenterPage';
import InsightsPage from './pages/public/InsightsPage';
import ArticleDetailPage from './pages/public/ArticleDetailPage';
import ExpertsPage from './pages/public/ExpertsPage';
import AboutPage from './pages/public/AboutPage';
import TeamPage from './pages/public/TeamPage';
import TeamMemberDetailPage from './pages/public/TeamMemberDetailPage';
import BlogsPage from './pages/public/BlogsPage';
import NewsPage from './pages/public/NewsPage';
import FaqPage from './pages/public/FaqPage';
import CaseStudiesPage from './pages/public/CaseStudiesPage';
import CareersPage from './pages/public/CareersPage';
import ContactPage from './pages/public/ContactPage';
import LegalPage from './pages/public/LegalPage';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const routeFromPath = (path = window.location.pathname) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    let cleanPath = path;
    if (baseUrl !== '/' && cleanPath.startsWith(baseUrl)) {
      cleanPath = cleanPath.slice(baseUrl.length - 1);
    }
    const clean = cleanPath.replace(/\/+$/, '') || '/';
    const parts = clean.split('/').filter(Boolean);
    if (!parts.length) return { route: 'home', params: null };
    const [section, slug] = parts;
    if (section === 'services') return slug ? { route: 'solution-detail', params: { id: slug } } : { route: 'solutions', params: null };
    if (section === 'solutions') return slug ? { route: 'solution-detail', params: { id: slug } } : { route: 'solutions', params: null };
    if (section === 'industries') return slug ? { route: 'industry-detail', params: { id: slug } } : { route: 'industries', params: null };
    if (section === 'jurisdictions') return slug ? { route: 'country-detail', params: { id: slug } } : { route: 'global-compliance', params: null };
    if (section === 'regulations') return slug ? { route: 'regulation-detail', params: { id: slug } } : { route: 'regulations', params: null };
    if (section === 'insights') return slug ? { route: 'article-detail', params: { id: slug } } : { route: 'insights', params: null };
    if (section === 'blogs' || section === 'blog') return slug ? { route: 'article-detail', params: { id: slug } } : { route: 'blogs', params: null };
    if (section === 'news') return slug ? { route: 'article-detail', params: { id: slug } } : { route: 'news', params: null };
    if (section === 'article') return slug ? { route: 'article-detail', params: { id: slug } } : { route: 'insights', params: null };
    const direct = {
      about:'about', contact:'contact', resources:'knowledge-center', 'knowledge-center':'knowledge-center',
      experts:'experts', 'case-studies':'case-studies', careers:'careers', legal:'legal',
      'global-compliance':'global-compliance', blogs:'blogs', news:'news'
    };
    return { route: direct[section] || 'home', params: null };
  };

  const initialRoute = routeFromPath();
  const [currentRoute, setCurrentRoute] = useState(initialRoute.route);
  const [routeParams, setRouteParams] = useState(initialRoute.params);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [orderResource, setOrderResource] = useState(null);

  // Initialize Global Scroll Reveal
  useScrollReveal([currentRoute]);

  const routeToPath = (route, params = null) => {
    const id = params?.id;
    const map = {
      home: '/', about: '/about/', solutions: '/services/', 'solution-detail': `/services/${id || ''}`,
      industries: '/industries/', 'industry-detail': `/industries/${id || ''}`,
      'global-compliance': '/global-compliance/', 'country-detail': `/jurisdictions/${id || ''}`,
      regulations: '/regulations/', 'regulation-detail': `/regulations/${id || ''}`,
      insights: '/insights/', 'article-detail': `/insights/${id || ''}`,
      blogs: '/blogs/', news: '/news/',
      'knowledge-center': '/resources/', experts: '/experts/', 'case-studies': '/case-studies/',
      careers: '/careers/', contact: '/contact/', legal: '/legal/', portal: '/portal/',
      consultant: '/consultant/'
    };
    const path = map[route] || '/';
    const baseUrl = import.meta.env.BASE_URL || '/';
    if (baseUrl === '/') return path;
    return baseUrl.replace(/\/$/, '') + path;
  };

  const navigate = (route, params = null, replace = false) => {
    setCurrentRoute(route);
    setRouteParams(params);
    const nextPath = routeToPath(route, params);
    if (window.location.pathname !== nextPath) {
      window.history[replace ? 'replaceState' : 'pushState']({ route, params }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPopState = () => {
      const next = routeFromPath();
      setCurrentRoute(next.route);
      setRouteParams(next.params);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <>
      {/* Animated Preloader on Initial Page Refresh */}
      {isLoading && (
        <PlatformLoader onFinish={() => setIsLoading(false)} />
      )}

      <div className="min-h-screen w-full flex flex-col bg-surface-base text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Universal Header */}
        <Header
          currentRoute={currentRoute}
          onNavigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Main Routed Content */}
        <main className="flex-1 w-full max-w-full overflow-x-hidden">
          {currentRoute === 'home' && (
            <HomePage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {(currentRoute === 'solutions' || currentRoute === 'services') && (
            <SolutionsPage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {(currentRoute === 'solution-detail' || currentRoute === 'service-detail') && (
            <SolutionDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'industries' && (
            <IndustriesPage onNavigate={navigate} />
          )}
          {currentRoute === 'industry-detail' && (
            <IndustryDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'global-compliance' && (
            <GlobalCompliancePage onNavigate={navigate} />
          )}
          {currentRoute === 'country-detail' && (
            <CountryDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'regulations' && (
            <RegulationsPage onNavigate={navigate} />
          )}
          {currentRoute === 'regulation-detail' && (
            <RegulationDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'knowledge-center' && (
            <KnowledgeCenterPage 
              onNavigate={navigate} 
              onOrderResource={(res) => setOrderResource(res)} 
            />
          )}
          {currentRoute === 'insights' && (
            <InsightsPage onNavigate={navigate} />
          )}
          {currentRoute === 'article-detail' && (
            <ArticleDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'about' && (
            <AboutPage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {(currentRoute === 'team' || currentRoute === 'experts') && (
            <TeamPage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {(currentRoute === 'team-detail' || currentRoute === 'expert-detail') && (
            <TeamMemberDetailPage 
              params={routeParams} 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'blogs' && (
            <BlogsPage onNavigate={navigate} />
          )}
          {currentRoute === 'news' && (
            <NewsPage onNavigate={navigate} />
          )}
          {(currentRoute === 'faqs' || currentRoute === 'faq') && (
            <FaqPage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'case-studies' && (
            <CaseStudiesPage 
              onNavigate={navigate} 
              onOpenConsultation={() => setIsConsultationOpen(true)} 
            />
          )}
          {currentRoute === 'careers' && (
            <CareersPage onNavigate={navigate} />
          )}
          {currentRoute === 'contact' && (
            <ContactPage onNavigate={navigate} />
          )}
          {currentRoute === 'legal' && (
            <LegalPage onNavigate={navigate} />
          )}

          {/* Extended interactive experience on specific service/industry/regulatory pages */}
          {!['home', 'team', 'team-detail', 'experts', 'expert-detail', 'blogs', 'news', 'article-detail', 'insights', 'contact', 'faqs', 'faq'].includes(currentRoute) && (
            <PageEnhancements
              route={currentRoute}
              onNavigate={navigate}
              onOpenConsultation={() => setIsConsultationOpen(true)}
            />
          )}
        </main>

        {/* Universal Footer */}
        <Footer onNavigate={navigate} />

        {/* Live AI Regulatory Assistant */}
        <ComplianceChatbot 
          onNavigate={navigate}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* Floating WhatsApp Contact Speed Dial Overlay */}
        <WhatsAppFloatingWidget />

        {/* Global Modals */}
        <SearchModal 
          isOpen={isSearchOpen} 
          onClose={() => setIsSearchOpen(false)} 
          onNavigate={navigate} 
        />
        <ConsultationModal 
          isOpen={isConsultationOpen} 
          onClose={() => setIsConsultationOpen(false)} 
        />
        <OrderServiceModal 
          isOpen={!!orderResource} 
          preselectedResource={orderResource} 
          onClose={() => setOrderResource(null)} 
        />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <DataProvider>
              <AppContent />
            </DataProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
