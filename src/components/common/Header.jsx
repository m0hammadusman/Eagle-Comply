import React, { useState, useEffect } from 'react';
import { 
  Home,
  Search, 
  Moon, 
  Sun, 
  Globe, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar, 
  ArrowRight, 
  Building2, 
  Globe2,
  ShieldCheck,
  Scale,
  Landmark,
  FileText,
  Zap,
  Coins,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import EagleLogo from './EagleLogo';

export default function Header({ onNavigate, currentRoute, onOpenSearch, onOpenConsultation, onOpenQuote }) {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t, supportedLanguages } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', route: 'home', hasMega: false },
    { 
      id: 'about', 
      label: 'About Us', 
      route: 'about', 
      hasDropdown: true,
      children: [
        { id: 'about-main', label: 'About Us', route: 'about' },
        { id: 'who-we-are', label: 'Who We Are', route: 'about', section: 'who-we-are' },
        { id: 'our-experts', label: 'Our Experts', route: 'about', section: 'our-experts' },
        { id: 'our-approach', label: 'Our Approach', route: 'about', section: 'our-approach' },
        { id: 'jurisdictions', label: 'Jurisdictions', route: 'about', section: 'jurisdictions' }
      ]
    },
    { 
      id: 'team', 
      label: 'Team', 
      route: 'team', 
      hasMega: false 
    },
    { 
      id: 'services', 
      label: 'Services', 
      route: 'solutions', 
      hasMega: true 
    },
    { 
      id: 'industries', 
      label: 'Industries', 
      route: 'industries', 
      hasMega: true 
    },
    { 
      id: 'insights', 
      label: 'Insights', 
      route: 'insights', 
      hasDropdown: true,
      children: [
        { id: 'regulatory-updates', label: 'Regulatory Updates', route: 'insights', category: 'regulatory-updates' },
        { id: 'articles-analysis', label: 'Articles & Analysis', route: 'insights', category: 'articles-analysis' },
        { id: 'guides-resources', label: 'Guides & Resources', route: 'insights', category: 'guides-resources' },
        { id: 'news-events', label: 'News & Events', route: 'insights', category: 'news-events' }
      ]
    },
    { id: 'contact', label: 'Contact', route: 'contact', hasMega: false }
  ];

  const servicePillarsSummary = [
    {
      id: 'financial-crime-compliance',
      name: 'Financial Crime Compliance',
      tagline: 'AML/CFT frameworks, KYC/KYB, screening, monitoring & remediation',
      jurisdictions: 'Australia · UK · Pakistan · EU',
      icon: ShieldCheck,
      links: [
        { name: 'Compliance Frameworks & Policies', id: 'compliance-frameworks' },
        { name: 'Travel Rule & Transfer Compliance', id: 'travel-rule-compliance' },
        { name: 'Licensing, Authorisation & Market Entry', id: 'licensing-authorisation' },
        { name: 'Compliance Advisory & Regulatory Change', id: 'compliance-advisory' }
      ]
    },
    {
      id: 'regulatory-commercial-advisory',
      name: 'Regulatory & Commercial Advisory',
      tagline: 'FinTech regulation, commercial contracts, governance & digital assets',
      jurisdictions: 'Australia · UK · Pakistan · EU',
      icon: Scale,
      links: [
        { name: 'Business Legal Advice & Support', id: 'legal-consultancy' },
        { name: 'Commercial Contracts & Negotiation', id: 'commercial-contracts' },
        { name: 'Privacy, Data Protection & Website Terms', id: 'privacy-data-protection' },
        { name: 'Contract Templates & Governance Docs', id: 'contract-templates-governance' }
      ]
    },
    {
      id: 'accounting-finance',
      name: 'Accounting & Finance',
      tagline: 'Outsourced bookkeeping, financial reporting, payroll & internal controls',
      jurisdictions: 'UK · Pakistan · EU',
      icon: Landmark,
      links: [
        { name: 'Bookkeeping & Accounting Support', id: 'bookkeeping-accounting' },
        { name: 'Financial Reporting & Management Accounts', id: 'financial-reporting' },
        { name: 'Accounting Clean-Up & Reconciliation', id: 'accounting-cleanup' }
      ]
    }
  ];

  const industriesList = [
    { id: 'fintech-payments', name: 'FinTech & Payments', desc: 'Licensing, AML/CFT, onboarding, contracts & finance', icon: Zap },
    { id: 'banks-financial-institutions', name: 'Banks & Financial Institutions', desc: 'AML/CFT reviews, KYC remediation & control testing', icon: Landmark },
    { id: 'remittance-money-services', name: 'Remittance & Money Services', desc: 'High-volume cross-border transaction controls & payout agreements', icon: Globe2 },
    { id: 'digital-assets-crypto', name: 'Digital Assets & Crypto', desc: 'CASP/VASP authorisation, Travel Rule & MiCA compliance', icon: Coins },
    { id: 'lending-credit', name: 'Lending & Credit', desc: 'Regulatory permissions, disclosures, loan contracts & accounts', icon: CreditCard },
    { id: 'professional-services', name: 'Professional Services & Regulated Entities', desc: 'Proportionate AML/CFT, KYC, client onboarding & accounting', icon: Briefcase }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-surface-base/95 backdrop-blur-md shadow-lg border-b border-surface-border py-1.5' 
        : 'bg-surface-base/90 backdrop-blur-sm border-b border-surface-border/70 py-2'
    }`}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-1 lg:gap-3 xl:gap-5 h-14 sm:h-16 lg:h-16 2xl:h-20 flex-nowrap">
          
          {/* Official Logo */}
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center group focus:outline-none shrink-0 py-0.5 hover:opacity-90 transition-opacity"
            title="Eagle Compliance Home"
          >
            <EagleLogo className="h-8 sm:h-10 lg:h-11 2xl:h-14 w-auto hover:scale-105 transition-transform origin-left" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2 flex-nowrap shrink-0">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route || 
                (item.children && item.children.some(c => c.route === currentRoute)) ||
                (item.id === 'services' && (currentRoute === 'solutions' || currentRoute === 'solution-detail')) ||
                (item.id === 'industries' && (currentRoute === 'industries' || currentRoute === 'industry-detail')) ||
                (item.id === 'team' && (currentRoute === 'team' || currentRoute === 'experts' || currentRoute === 'team-detail'));
              
              const hasSubmenu = item.hasMega || item.hasDropdown;

              return (
                <div 
                  key={item.id} 
                  className="relative group shrink-0"
                  onMouseEnter={() => hasSubmenu && setActiveMegaMenu(item.id)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    onClick={() => { 
                      onNavigate(item.route); 
                      setActiveMegaMenu(null); 
                    }}
                    className={`px-2.5 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive 
                        ? 'text-[#334DAF] dark:text-[#7096D1] bg-[#334DAF]/10 dark:bg-[#7096D1]/15 font-bold' 
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#334DAF] dark:hover:text-[#7096D1] hover:bg-surface-subtle'
                    }`}
                  >
                    <span className="whitespace-nowrap">{item.label}</span>
                    {hasSubmenu && (
                      <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${activeMegaMenu === item.id ? 'rotate-180 text-[#334DAF] dark:text-[#7096D1]' : 'text-slate-400'}`} />
                    )}
                  </button>

                  {/* Standard Simple Dropdown for About & Insights (Solid Opaque #0B132B) */}
                  {item.hasDropdown && activeMegaMenu === item.id && (
                    <div 
                      className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-auto min-w-[160px] pt-2 animate-fade-in z-50 pointer-events-auto"
                      onMouseEnter={() => setActiveMegaMenu(item.id)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="bg-[#0B132B] rounded-xl border border-[#1E3778] shadow-2xl p-1.5 space-y-0.5 text-white">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => { 
                              if (child.section) {
                                onNavigate(child.route, { section: child.section });
                              } else if (child.category) {
                                onNavigate(child.route, { category: child.category });
                              } else {
                                onNavigate(child.route);
                              }
                              setActiveMegaMenu(null); 
                            }}
                            className="w-full px-3 py-2 rounded-lg hover:bg-[#162758] transition-all text-left rtl:text-right whitespace-nowrap border border-transparent hover:border-[#1E3778] group/sub cursor-pointer"
                          >
                            <span className="text-xs font-semibold text-slate-200 group-hover/sub:text-white">
                              {child.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Slim Services Dropdown — inside nav item, positioned correctly */}
                  {item.id === 'services' && item.hasMega && activeMegaMenu === 'services' && (
                    <div 
                      className="absolute top-full left-0 w-auto min-w-[240px] pt-2 animate-fade-in z-50 pointer-events-auto"
                      onMouseEnter={() => setActiveMegaMenu('services')}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="bg-[#0B132B] rounded-xl border border-[#1E3778] shadow-2xl p-1.5 space-y-0.5 text-white">
                        {servicePillarsSummary.map((pillar) => {
                          const Icon = pillar.icon;
                          return (
                            <button
                              key={pillar.id}
                              onClick={() => { onNavigate('solutions', { pillar: pillar.id }); setActiveMegaMenu(null); }}
                              className="w-full px-3 py-2 rounded-lg hover:bg-[#162758] transition-all text-left rtl:text-right whitespace-nowrap flex items-center gap-2 border border-transparent hover:border-[#1E3778] group/svc cursor-pointer"
                            >
                              <Icon className="w-3.5 h-3.5 text-[#7096D1] shrink-0" />
                              <span className="text-xs font-semibold text-slate-200 group-hover/svc:text-white">
                                {pillar.name}
                              </span>
                            </button>
                          );
                        })}
                        <div className="pt-1 mt-1 border-t border-[#1E3778]">
                          <button
                            onClick={() => { onNavigate('solutions'); setActiveMegaMenu(null); }}
                            className="w-full px-3 py-2 rounded-lg hover:bg-[#162758] transition-all text-left rtl:text-right whitespace-nowrap flex items-center gap-1.5 cursor-pointer group/all"
                          >
                            <span className="text-[11px] font-semibold text-[#7096D1] group-hover/all:text-white">All Services</span>
                            <ArrowRight className="w-3 h-3 text-[#7096D1] group-hover/all:text-white rtl:rotate-180" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Slim Industries Dropdown — inside nav item, positioned correctly */}
                  {item.id === 'industries' && item.hasMega && activeMegaMenu === 'industries' && (
                    <div 
                      className="absolute top-full left-0 w-auto min-w-[260px] pt-2 animate-fade-in z-50 pointer-events-auto"
                      onMouseEnter={() => setActiveMegaMenu('industries')}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="bg-[#0B132B] rounded-xl border border-[#1E3778] shadow-2xl p-1.5 space-y-0.5 text-white">
                        {industriesList.map((ind) => {
                          const Icon = ind.icon;
                          return (
                            <button
                              key={ind.id}
                              onClick={() => { onNavigate('industry-detail', { id: ind.id }); setActiveMegaMenu(null); }}
                              className="w-full px-3 py-2 rounded-lg hover:bg-[#162758] transition-all text-left rtl:text-right whitespace-nowrap flex items-center gap-2 border border-transparent hover:border-[#1E3778] group/ind cursor-pointer"
                            >
                              <Icon className="w-3.5 h-3.5 text-[#7096D1] shrink-0" />
                              <span className="text-xs font-semibold text-slate-200 group-hover/ind:text-white">
                                {ind.name}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>


          {/* Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Search */}
            <button 
              onClick={onOpenSearch}
              className="p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors shrink-0 cursor-pointer"
              title="Search Regulations & Services"
            >
              <Search className="w-4 h-4 shrink-0" />
            </button>
            
            {/* Language Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors font-semibold text-[11px] sm:text-xs cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">{language.toUpperCase()}</span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-[#0B132B] text-white rounded-xl border border-[#1E3778] shadow-2xl py-2 z-50 animate-fade-in">
                  {(supportedLanguages || []).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between cursor-pointer ${
                        language === lang.code 
                          ? 'bg-[#334DAF]/40 text-[#7096D1] font-bold' 
                          : 'text-slate-200 hover:bg-[#162758] hover:text-white'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.badge}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-xs opacity-60 text-slate-300">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors shrink-0 cursor-pointer"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            </button>

            {/* Book Consultation CTA Button */}
            <button
              onClick={() => {
                if (onOpenConsultation) {
                  onOpenConsultation();
                } else {
                  onNavigate('book-consultation');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 ml-1 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="whitespace-nowrap">Book a Consultation</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-surface-subtle shrink-0 cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (100% Solid Opaque Dark Navy) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0B132B] text-white border-b border-[#1E3778] px-4 py-6 space-y-4 animate-fade-in max-h-[85vh] overflow-y-auto z-50">
          <div className="space-y-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.id} className="space-y-1 py-1">
                  <div className="px-2.5 text-[11px] font-mono uppercase tracking-wider text-[#7096D1] font-bold">
                    {item.label}
                  </div>
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => { 
                        if (child.section) {
                          onNavigate(child.route, { section: child.section });
                        } else if (child.category) {
                          onNavigate(child.route, { category: child.category });
                        } else {
                          onNavigate(child.route);
                        }
                        setIsMobileMenuOpen(false); 
                      }}
                      className="w-full p-2.5 rounded-xl text-left rtl:text-right text-xs font-semibold flex items-center justify-between whitespace-nowrap text-slate-200 hover:text-white hover:bg-[#162758] transition-colors"
                    >
                      <span>{child.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 rtl:rotate-180" />
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.route); setIsMobileMenuOpen(false); }}
                  className={`w-full p-2.5 rounded-xl text-left rtl:text-right text-sm font-semibold flex items-center justify-between whitespace-nowrap transition-colors ${currentRoute === item.route ? 'text-[#7096D1] bg-[#162758] font-bold' : 'text-slate-200 hover:text-white hover:bg-[#162758]'}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                </button>
              )
            ))}
          </div>

          <div className="pt-4 border-t border-[#1E3778] flex flex-col gap-2">
            <button
              onClick={() => { onOpenConsultation(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] text-white font-bold text-sm shadow-md text-center whitespace-nowrap cursor-pointer hover:opacity-95 transition-opacity"
            >
              Book a Consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
