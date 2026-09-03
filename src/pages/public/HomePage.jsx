import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Scale, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  Globe2, 
  Check, 
  Lock,
  ChevronRight,
  UserCheck,
  Briefcase,
  Activity,
  Sliders,
  Landmark,
  TrendingUp,
  Layers,
  Radio,
  Clock,
  Download,
  AlertTriangle,
  HelpCircle,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TeamBadges from '../../components/common/TeamBadges';
import GovernanceLattice from '../../components/canvas/GovernanceLattice';
import ComplianceShield3D from '../../components/canvas/ComplianceShield3D';
import GlobalMapCanvas from '../../components/canvas/GlobalMapCanvas';
import InteractivePillarCard from '../../components/common/InteractivePillarCard';

function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

export default function HomePage({ onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, solutions, industries, experts, insights, resources, caseStudies, badges } = useLanguage();
  const hx = t.homeExtended || {};
  const dx = hx.diagOptions || {};

  const badgeIcons = [
    ShieldCheck, Scale, Building2, Lock, Landmark, Award, 
    Cpu, Layers, Sliders, FileText, CheckCircle2, Activity
  ];
  const dynamicBadges = (badges || []).map((b, i) => ({
    ...b,
    icon: badgeIcons[i % badgeIcons.length] || ShieldCheck
  }));
  const displayBadges = [...dynamicBadges, ...dynamicBadges];

  // Diagnostic Calculator State
  const [diagSector, setDiagSector] = useState('fintech');
  const [diagJurisdiction, setDiagJurisdiction] = useState('uk_eu');
  const [diagService, setDiagService] = useState('aml');

  // Industry Tab State
  const [activeIndustryTab, setActiveIndustryTab] = useState('banking');

  const pillarIds = [
    ['financial-crime-compliance', ShieldCheck, 'aml-pillar', 'Standards', 'FATF Aligned'],
    ['regulatory-compliance', Building2, 'regulatory-pillar', 'Scope', 'Multi-Jurisdiction'],
    ['risk-governance', Scale, 'governance-pillar', 'Model', '3 Lines of Defense'],
    ['legal-compliance', FileText, 'legal-pillar', 'Precision', 'Cross-Border Depth']
  ];
  const fourPillars = pillarIds.map(([id, icon, key, statLabel, statValue]) => {
    const service = solutions.find((item) => item.id === id) || {};
    return {
      id: key,
      category: service.category || '',
      badge: service.badge || '',
      title: service.name || '',
      subtitle: service.shortDesc || '',
      image: service.image || `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
      icon,
      route: 'solution-detail',
      param: { id },
      stats: { label: (hx.statLabels || [])[pillarIds.findIndex((x) => x[0] === id)] || statLabel, value: (hx.statValues || [])[pillarIds.findIndex((x) => x[0] === id)] || statValue }
    };
  });

  const frameworkRoadmap = (hx.roadmap || []).map((item, idx) => ({
    step: String(idx + 1).padStart(2, '0'),
    title: item[0],
    subtitle: item[1],
    desc: item[2]
  }));

  const sectorDetails = Object.fromEntries(Object.entries(hx.sectors || {}).map(([key, value]) => [
    key,
    { title: value[0], desc: value[1], image: ({ banking:`${import.meta.env.BASE_URL}assets/images/case-study-bank.jpg`, fintech:`${import.meta.env.BASE_URL}assets/images/fintech-banking.jpg`, payments:`${import.meta.env.BASE_URL}assets/images/critical-infra.jpg`, crypto:`${import.meta.env.BASE_URL}assets/images/blockchain-nodes.jpg` })[key], points: value[2] }
  ]));

  const practitioners = experts || [];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      
      {/* 1. Master Hero Section with 3D Lattice Background */}
      <section className="relative min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden py-10 sm:py-16 lg:py-24 border-b border-surface-border">
        <GovernanceLattice className="z-0" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[700px] h-[300px] sm:h-[400px] bg-gradient-to-tr from-[#E31F1F]/30 via-[#E31F1F]/20 to-[#FF3333]/15 blur-3xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 border border-[#E31F1F]/25 dark:border-[#FF3333]/30 text-[#E31F1F] dark:text-[#E4E4E4] text-xs font-semibold tracking-wide mb-4 sm:mb-6 animate-fade-in shadow-xs max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#E31F1F] dark:text-[#FF3333] shrink-0" />
            <span className="truncate">{t.hero?.badge || 'AML · Regulatory · Risk · Legal Compliance'}</span>
          </div>

          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#E31F1F] dark:text-[#FFFFFF] max-w-4xl mx-auto leading-[1.15] mb-4 sm:mb-6">
            {t.hero.h1}{' '}
            <span className="brand-gradient-text block sm:inline">
              {t.hero.h1Span}
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-[#E4E4E4]/90 max-w-2xl mx-auto leading-relaxed mb-6 sm:mb-10 font-normal">
            {t.hero.desc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#E31F1F] hover:bg-[#B42318] text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookConsultation}</span>
            </button>

            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.hero.quoteBtn}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Seamless Infinite Marquee Ticker (Left to Right) */}
          <div className="pt-10 sm:pt-14 w-full max-w-full overflow-hidden relative group">
            {/* Edge fade gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-surface-base to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-surface-base to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-ltr flex items-center gap-3 sm:gap-4 py-2">
              {displayBadges.map((badge, bIdx) => {
                const BadgeIcon = badge.icon || ShieldCheck;
                return (
                  <div
                    key={bIdx}
                    className="shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl glass-panel border border-surface-border/80 dark:border-white/10 shadow-sm flex items-center gap-2.5 bg-white/90 dark:bg-[#131313]/80"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-[#E31F1F]/10 dark:bg-[#E31F1F]/15 border border-[#E31F1F]/20 dark:border-[#E31F1F]/30 text-[#E31F1F] dark:text-[#E31F1F] flex items-center justify-center shrink-0">
                      <BadgeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="text-left rtl:text-right">
                      <div className="text-[11px] sm:text-xs font-bold text-black dark:text-white dark:text-white whitespace-nowrap">
                        {badge.title}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-[#7D797A] dark:text-[#7D797A] font-mono whitespace-nowrap">
                        {badge.sub}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive 3D Shield & Core 4 Pillars */}
      <section className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10 sm:mb-16">
          <div className="lg:col-span-7 space-y-3 sm:space-y-4 text-center lg:text-left rtl:lg:text-right">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
              {t.pillars.tag}
            </span>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white dark:text-white">
              {t.pillars.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              {hx.pillarsDesc}
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="p-3 sm:p-4 rounded-2xl sm:rounded-3xl glass-panel border border-surface-border shadow-xl relative w-full max-w-sm sm:max-w-md overflow-hidden group">
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 border border-surface-border shadow-inner">
                <video
                  src={`${import.meta.env.BASE_URL}pillars-video.mp4`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-[4/3] sm:aspect-video object-cover"
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>
              <div className="text-center pt-2.5 sm:pt-3">
                <span className="text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  {t.pillars?.videoTag || 'EagleComply Governance Overview'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {fourPillars.map((p) => (
            <InteractivePillarCard
              key={p.id}
              category={p.category}
              badge={p.badge}
              title={p.title}
              subtitle={p.subtitle}
              image={p.image}
              icon={p.icon}
              stats={p.stats}
              onClick={() => onNavigate(p.route, p.param)}
            />
          ))}
        </div>
      </section>

      {/* 3. Live Interactive Global Telemetry Map Section with Video Motion Background */}
      <section className="py-12 sm:py-16 lg:py-24 bg-surface-subtle border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
              {hx.coverageTag}
            </span>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white dark:text-white mt-1">
              {hx.coverageTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              {hx.coverageDesc}
            </p>
          </div>

          <GlobalMapCanvas onSelectCountry={(c) => onNavigate('contact')} />
        </div>
      </section>

      {/* 4. Interactive Compliance Diagnostic & Risk Estimator */}
      <section className="py-12 sm:py-16 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl glass-panel border border-surface-border shadow-xl space-y-6 sm:space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-[10px] sm:text-xs font-mono font-bold">
              <Sliders className="w-3.5 h-3.5" />
              <span>{hx.diagTag}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black dark:text-white dark:text-white">
              {hx.diagTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              {hx.diagDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                1. {hx.industry || 'Industry Sector'}
              </label>
              <select
                value={diagSector}
                onChange={(e) => setDiagSector(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-xs text-black dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E31F1F]"
              >
                <option value="banking">{dx.banking}</option>
                <option value="fintech">{dx.fintech}</option>
                <option value="payments">{dx.payments}</option>
                <option value="remittance">{dx.remittance}</option>
                <option value="crypto">{dx.crypto}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                2. {hx.jurisdiction || 'Primary Jurisdiction'}
              </label>
              <select
                value={diagJurisdiction}
                onChange={(e) => setDiagJurisdiction(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-xs text-black dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E31F1F]"
              >
                <option value="uk_eu">{dx.uk_eu}</option>
                <option value="us">{dx.us}</option>
                <option value="uae">{dx.uae}</option>
                <option value="apac">{dx.apac}</option>
                <option value="global">{dx.global}</option>
              </select>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <label className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-2">
                3. {hx.priority || 'Target Objective'}
              </label>
              <select
                value={diagService}
                onChange={(e) => setDiagService(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-surface-border text-xs text-black dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E31F1F]"
              >
                <option value="aml">{dx.aml}</option>
                <option value="licensing">{dx.licensing}</option>
                <option value="review">{dx.review}</option>
                <option value="training">{dx.training}</option>
              </select>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-surface-subtle border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-mono uppercase text-[#E31F1F] dark:text-[#FF3333] font-bold">
                {hx.recommended || 'Recommended Advisory Roadmap'}
              </div>
              <div className="text-xs sm:text-sm font-bold text-black dark:text-white dark:text-white">
                {diagSector === 'crypto' ? dx.cryptoAction :
                 diagSector === 'remittance' ? dx.remittanceAction :
                 diagSector === 'fintech' ? dx.fintechAction :
                 dx.defaultAction}
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#E31F1F] hover:bg-[#B42318] text-white text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center whitespace-nowrap cursor-pointer shrink-0"
            >
              {hx.discuss || 'Discuss This Plan'}
            </button>
          </div>
        </div>
      </section>

      {/* 5. Five-Stage Compliance Implementation Framework */}
      <section className="py-12 sm:py-16 lg:py-24 bg-surface-subtle/50 border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
              {hx.method}
            </span>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white dark:text-white mt-1">
              {hx.frameworkTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
              {hx.frameworkDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {frameworkRoadmap.map((item, idx) => (
              <div 
                key={idx}
                className="p-5 sm:p-6 rounded-2xl glass-panel border border-surface-border hover:border-[#E31F1F] dark:hover:border-[#FF3333] transition-all flex flex-col justify-between space-y-3 shadow-sm group"
              >
                <div className="space-y-2">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-[#E31F1F] dark:text-[#FF3333]">
                    {item.step}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-black dark:text-white dark:text-white group-hover:text-[#E31F1F] dark:group-hover:text-[#FF3333] transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-[9px] sm:text-[10px] font-mono text-[#E31F1F] dark:text-[#FF3333] font-semibold">
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Industry Regulatory Challenges Matrix */}
      <section className="py-12 sm:py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
            {hx.industryVerticals}
          </span>
          <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-white dark:text-white mt-1">
            {hx.sectorTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
            {Object.keys(sectorDetails).map((key) => (
              <button
                key={key}
                onClick={() => setActiveIndustryTab(key)}
                className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border transition-all text-xs font-bold flex items-center justify-between ${
                  activeIndustryTab === key 
                    ? 'bg-[#E31F1F] text-white border-[#E31F1F] shadow-lg' 
                    : 'glass-panel border-surface-border text-slate-700 dark:text-slate-300 hover:bg-surface-subtle'
                }`}
              >
                <span>{sectorDetails[key].title}</span>
                <ChevronRight className="w-4 h-4 shrink-0 ml-2" />
              </button>
            ))}
          </div>

          <div className="lg:col-span-8 p-5 sm:p-8 rounded-2xl sm:rounded-3xl glass-panel border border-surface-border shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-3 sm:space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white dark:text-white">
                {sectorDetails[activeIndustryTab].title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {sectorDetails[activeIndustryTab].desc}
              </p>
              <ul className="space-y-1.5 sm:space-y-2">
                {sectorDetails[activeIndustryTab].points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onNavigate('industries')}
                className="mt-2 text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] hover:underline flex items-center gap-1"
              >
                <span>{hx.exploreSector}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="h-48 sm:h-64 rounded-xl sm:rounded-2xl overflow-hidden relative shadow-inner">
              <img
                src={`${import.meta.env.BASE_URL}${(sectorDetails[activeIndustryTab].image || '').replace(import.meta.env.BASE_URL, '').replace(/^\/+/, '')}`}
                alt={sectorDetails[activeIndustryTab].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Conversion Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-[#E31F1F] via-[#131313] to-[#E31F1F] text-white overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-6">
          <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/10 text-slate-300 border border-white/20 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest inline-block">
            {t.cta.tag}
          </span>
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug">
            {t.cta.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            {hx.conversionDesc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={onOpenConsultation}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white text-[#E31F1F] font-bold text-xs shadow-2xl hover:bg-[#F5F3F2] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{t.nav.bookConsultation}</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold text-xs hover:bg-white/20 transition-all text-center"
            >
              {hx.submitInquiry}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
