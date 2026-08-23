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
  Globe2 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import EagleLogo from './EagleLogo';

export default function Header({ onNavigate, currentRoute, onOpenSearch, onOpenConsultation, onOpenQuote }) {
  const { theme, setTheme, isDark } = useTheme();
  const { language, setLanguage, t, supportedLanguages, solutions, industries, countries } = useLanguage();

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
    { id: 'home', label: t.nav?.home || 'Home', route: 'home', hasMega: false,},
    { id: 'about', label: t.nav?.about || 'About', route: 'about', hasMega: false },
    { id: 'team', label: t.nav?.team || 'Team', route: 'team', hasMega: false },
    { id: 'solutions', label: t.nav?.services || 'Services', route: 'solutions', hasMega: true },
    { id: 'industries', label: t.nav?.industries || 'Industries', route: 'industries', hasMega: true },
    { 
      id: 'news-blogs', 
      label: 'News / Blogs', 
      route: 'blogs', 
      hasDropdown: true,
      children: [
        { id: 'blogs', label: 'Blogs', route: 'blogs', desc: 'Compliance analysis & practice insights' },
        { id: 'news', label: 'News', route: 'news', desc: 'Regulatory dispatches & announcements' }
      ]
    },
    { id: 'contact', label: t.nav?.contact || 'Contact', route: 'contact', hasMega: false }
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-surface-base/95 backdrop-blur-md shadow-lg border-b border-surface-border py-1.5' 
        : 'bg-surface-base/90 backdrop-blur-sm border-b border-surface-border/70 py-2'
    }`}>
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-4 xl:px-8">
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
              const isActive = currentRoute === item.route || (item.children && item.children.some(c => c.route === currentRoute));
              const ItemIcon = item.icon;
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
                      if (!item.hasDropdown) {
                        onNavigate(item.route); 
                      }
                      setActiveMegaMenu(null); 
                    }}
                    className={`px-2 xl:px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'text-[#334DAF] dark:text-[#7096D1] bg-[#334DAF]/10 dark:bg-[#7096D1]/15 font-bold' 
                        : 'text-slate-700 dark:text-slate-200 hover:text-[#334DAF] dark:hover:text-[#7096D1] hover:bg-surface-subtle'
                    }`}
                  >
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5 shrink-0" />}
                    <span className="whitespace-nowrap">{item.label}</span>
                    {hasSubmenu && (
                      <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${activeMegaMenu === item.id ? 'rotate-180 text-[#334DAF] dark:text-[#7096D1]' : 'text-slate-400'}`} />
                    )}
                  </button>

                  {/* Standard Simple Dropdown for News / Blogs */}
                  {item.hasDropdown && activeMegaMenu === item.id && (
                    <div 
                      className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-64 pt-2 animate-fade-in z-50"
                      onMouseEnter={() => setActiveMegaMenu(item.id)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="bg-surface-raised rounded-2xl border border-surface-border shadow-2xl p-2.5 glass-panel space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => { onNavigate(child.route); setActiveMegaMenu(null); }}
                            className={`w-full p-2.5 rounded-xl hover:bg-surface-subtle transition-all text-left rtl:text-right flex flex-col border ${
                              currentRoute === child.route 
                                ? 'bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] border-[#334DAF]/20' 
                                : 'border-transparent text-slate-800 dark:text-slate-200'
                            }`}
                          >
                            <span className="text-xs font-bold">{child.label}</span>
                            <span className="text-[11px] text-slate-500 line-clamp-1">{child.desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mega Menu Dropdowns for Services & Industries */}
                  {item.hasMega && activeMegaMenu === item.id && (
                    <div 
                      className="absolute top-full left-0 rtl:left-auto rtl:right-0 w-[640px] xl:w-[720px] pt-2 animate-fade-in z-50"
                      onMouseEnter={() => setActiveMegaMenu(item.id)}
                      onMouseLeave={() => setActiveMegaMenu(null)}
                    >
                      <div className="bg-surface-raised rounded-2xl border border-surface-border shadow-2xl p-6 glass-panel grid grid-cols-12 gap-6">
                        {item.id === 'solutions' && (
                          <>
                            <div className="col-span-8 space-y-3">
                              <div className="text-xs font-mono uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] font-bold">
                                {t.solutionsSec?.tag || 'Regulatory Practice Areas'}
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {(solutions || []).slice(0, 4).map((sol) => (
                                  <button
                                    key={sol.id}
                                    onClick={() => { onNavigate('solution-detail', { id: sol.id }); setActiveMegaMenu(null); }}
                                    className="p-3 rounded-xl hover:bg-surface-subtle transition-all text-left rtl:text-right flex flex-col justify-center group/card border border-transparent hover:border-surface-border"
                                  >
                                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/card:text-[#334DAF] dark:group-hover/card:text-[#7096D1] transition-colors">
                                      {sol.name}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {sol.valueProp || sol.shortDesc}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="col-span-4 bg-surface-subtle p-4 rounded-xl border border-surface-border flex flex-col justify-between">
                              <div>
                                <span className="text-[10px] font-mono font-bold text-[#334DAF] dark:text-[#7096D1] uppercase">{t.solutionsSec?.megaTitle || 'Enterprise Assurance'}</span>
                                <h4 className="font-bold text-sm text-slate-900 dark:text-white mt-1">
                                  {t.solutionsSec?.megaSubtitle || 'Full-Scope Compliance'}
                                </h4>
                                <p className="text-[11px] text-slate-500 mt-1">
                                  {t.solutionsSec?.megaDesc || 'CE-marking, DORA ICT registers, and regulatory defense.'}
                                </p>
                              </div>
                              <button
                                onClick={() => { onNavigate('solutions'); setActiveMegaMenu(null); }}
                                className="mt-3 text-xs font-bold text-[#334DAF] dark:text-[#7096D1] hover:underline flex items-center gap-1 whitespace-nowrap"
                              >
                                {t.solutionsSec?.viewAll || 'See all services'} <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                              </button>
                            </div>
                          </>
                        )}

                        {item.id === 'industries' && (
                          <div className="col-span-12">
                            <div className="text-xs font-mono uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] font-bold mb-3">
                              {t.nav?.industries || 'Specialized Industry Verticals'}
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                              {(industries || []).map((ind) => (
                                <button
                                  key={ind.id}
                                  onClick={() => { onNavigate('industry-detail', { id: ind.id }); setActiveMegaMenu(null); }}
                                  className="p-3 rounded-xl hover:bg-surface-subtle transition-all text-left rtl:text-right border border-transparent hover:border-surface-border group/ind"
                                >
                                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/ind:text-[#334DAF] dark:group-hover/ind:text-[#7096D1]">
                                    {ind.name}
                                  </div>
                                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                                    {ind.heroTag}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.id === 'global-compliance' && (
                          <div className="col-span-12 flex items-center gap-6">
                            <div className="flex-1 space-y-4">
                              <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                                {t.nav?.globalCompliance || 'Global Compliance Hub'}
                              </h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                {t.globalSec?.desc || 'Navigate regional variations in AI, Crypto, Privacy, and ESG regulations through our interactive global map.'}
                              </p>
                              <div className="grid grid-cols-2 gap-3 pt-2">
                                {(countries || []).slice(0, 4).map(c => (
                                  <div key={c.id} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                    <span className="w-5 text-center">{c.flag}</span>
                                    <span className="font-semibold">{c.name}</span>
                                  </div>
                                ))}
                              </div>
                              <button onClick={() => onNavigate('global-compliance')} className="mt-4 px-4 py-2 rounded-lg bg-[#334DAF] text-white text-xs font-bold hover:bg-[#2B4E9E] transition-colors">
                                {t.globalSec?.btn || 'Open Interactive Map'}
                              </button>
                            </div>
                            <div className="w-64 h-48 rounded-xl bg-[#091F5C] overflow-hidden relative shadow-inner">
                              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
                              <Globe2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-blue-400/20" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            {/* Search */}
            <button 
              onClick={onOpenSearch}
              className="p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors shrink-0"
              title="Search Regulations"
            >
              <Search className="w-4 h-4 shrink-0" />
            </button>
            
            {/* Language Dropdown */}
            <div className="relative shrink-0">
              <button 
                onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors font-semibold text-[11px] sm:text-xs"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:block">{language.toUpperCase()}</span>
              </button>
              
              {isLangDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-surface-raised rounded-xl border border-surface-border shadow-xl py-2 z-50 animate-fade-in">
                  {(supportedLanguages || []).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between ${
                        language === lang.code 
                          ? 'bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] font-bold' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-surface-subtle'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{lang.badge}</span>
                        <span>{lang.nativeName}</span>
                      </span>
                      <span className="text-xs opacity-50">{lang.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-1 sm:p-1.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-surface-subtle transition-colors shrink-0"
              title="Toggle Theme"
            >
              {isDark ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            </button>

            {/* Book Consultation CTA */}
            <button
              onClick={onOpenConsultation}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 xl:px-4 py-1.5 xl:py-2 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-[11px] xl:text-xs shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all whitespace-nowrap shrink-0 ml-1"
            >
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden lg:block whitespace-nowrap">{t.nav?.bookConsultation || 'Consultation'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-surface-subtle shrink-0"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface-raised border-b border-surface-border px-4 py-6 space-y-4 animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => (
              item.children ? (
                <div key={item.id} className="space-y-1 pl-1">
                  {item.children.map(child => (
                    <button
                      key={child.id}
                      onClick={() => { onNavigate(child.route); setIsMobileMenuOpen(false); }}
                      className={`w-full p-2.5 rounded-xl text-left rtl:text-right text-sm font-semibold flex items-center justify-between whitespace-nowrap ${currentRoute === child.route ? 'text-[#334DAF] dark:text-[#7096D1] bg-[#334DAF]/10 font-bold' : 'text-slate-800 dark:text-slate-200'}`}
                    >
                      <span>{child.label}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.route); setIsMobileMenuOpen(false); }}
                  className={`w-full p-2.5 rounded-xl text-left rtl:text-right text-sm font-semibold flex items-center justify-between whitespace-nowrap ${currentRoute === item.route ? 'text-[#334DAF] dark:text-[#7096D1] bg-[#334DAF]/10 font-bold' : 'text-slate-800 dark:text-slate-200'}`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                </button>
              )
            ))}
          </div>

          <div className="pt-4 border-t border-surface-border flex flex-col gap-2">
            <button
              onClick={() => { onOpenConsultation(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-sm shadow-md text-center whitespace-nowrap"
            >
              {t.common?.bookConsultation || 'Book Consultation'}
            </button>
            <button
              onClick={() => { onOpenQuote(); setIsMobileMenuOpen(false); }}
              className="w-full py-3 rounded-xl bg-surface-subtle border border-surface-border text-slate-900 dark:text-white font-semibold text-sm text-center whitespace-nowrap"
            >
              {t.common?.requestQuote || 'Request a Quote'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
