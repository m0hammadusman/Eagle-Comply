import React, { useState, useEffect } from 'react';
import { 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  FileText,
  Shield,
  Globe2,
  Calendar,
  Filter,
  Layers,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  ExternalLink,
  Target,
  ShieldCheck,
  Activity,
  Cpu,
  Coins,
  Code2,
  Landmark,
  Check,
  Lock,
  Boxes,
  Zap,
  BarChart3
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CaseStudiesPage({ onNavigate, onOpenConsultation }) {
  const { t, caseStudies: dynamicCaseStudies, isRtl } = useLanguage();
  const csPage = t.caseStudiesPage || {};
  const comm = t.common || {};

  const [activeCategory, setActiveCategory] = useState('All Case Studies');
  const [currentPage, setCurrentPage] = useState(1);
  const [liveSuccessRate, setLiveSuccessRate] = useState(98.7);
  const [liveProjectsCount, setLiveProjectsCount] = useState(524);
  const [feedIndex, setFeedIndex] = useState(0);

  // Live real-time feed entries
  const liveFeeds = [
    { time: '00:58:12', tag: 'DORA TLPT', text: 'ECB & BaFin clearance validated: 0 non-conformities', status: 'VERIFIED 200 OK' },
    { time: '00:57:40', tag: 'EU AI ACT', text: 'High-risk LLM CE technical dossier approved in 9 weeks', status: 'PASSED' },
    { time: '00:56:05', tag: 'VARA / MiCA', text: 'Dual crypto CASP passporting confirmed across 27 EU states', status: 'AUTHORIZED' },
    { time: '00:54:30', tag: 'ISO 42001', text: 'Automated bias-testing pipeline certified under Lead Auditor inspection', status: 'AUDITED' }
  ];

  // Motion effects interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveSuccessRate(prev => Number((98.7 + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      setLiveProjectsCount(prev => prev + 1);
      setFeedIndex(prev => (prev + 1) % liveFeeds.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Categories list
  const categories = csPage.categories || [
    'All Case Studies',
    'Financial Services',
    'Technology',
    'Digital Assets',
    'Healthcare',
    'Manufacturing',
    'Energy',
    'Government'
  ];

  // Default fallback case studies
  const caseList = (dynamicCaseStudies && dynamicCaseStudies.length > 0) ? dynamicCaseStudies : [
    {
      id: 'dora-banking',
      category: 'Financial Services',
      categoryTag: 'FINANCIAL SERVICES & BANKING',
      client: 'Top-5 European Financial Conglomerate',
      title: 'Tier-1 Global Investment Bank: Complete DORA Compliance & ICT Third-Party Audit',
      challenge: 'The client operated over 1,400 legacy and cloud ICT systems across 18 subsidiaries with fragmented vendor oversight, facing severe non-compliance risk ahead of the mandatory DORA enforcement deadline.',
      solution: 'Eagle Compliance deployed an automated third-party ICT risk register, conducted threat-led penetration testing (TLPT) readiness, and renegotiated 330 critical supplier contracts.',
      outcome: '100% regulatory clearance by the European Central Bank (ECB) and BaFin with zero non-conformity findings.',
      image: `${import.meta.env.BASE_URL}assets/images/case-study-bank.jpg`,
      iconType: 'bank',
      score: '100%',
      progressLabel: 'ECB/BaFin Clearance',
      metricPill: '1,400+ Systems Inspected'
    },
    {
      id: 'ai-act-llm',
      category: 'Technology',
      categoryTag: 'TECHNOLOGY & SOFTWARE',
      client: 'Frontier AI Developer & Enterprise SaaS',
      title: 'Enterprise LLM Provider: EU AI Act High-Risk Model Conformity & Technical Dossier',
      challenge: 'Client required urgent CE-marking and algorithmic conformity certification for its enterprise automated underwriting LLM deployed across European retail banking clients.',
      solution: 'Eagle Compliance formulated comprehensive model cards, automated bias-testing pipelines, and established an ISO/IEC 42001 AI Management System.',
      outcome: 'First-in-market CE-marking authorization achieved in 9 weeks, enabling €45M in European enterprise contracts.',
      image: `${import.meta.env.BASE_URL}assets/images/case-study-ai.jpg`,
      iconType: 'ai',
      score: '9 Wks',
      progressLabel: 'Time-to-CE Authorization',
      metricPill: '€45M Pipeline Unlocked'
    },
    {
      id: 'mica-vara-exchange',
      category: 'Digital Assets',
      categoryTag: 'DIGITAL ASSETS & WEB3',
      client: 'Top-10 Global Crypto-Asset Platform',
      title: 'Cross-Border Web3 Exchange: Dual VARA Full Market License & MiCA CASP Authorization',
      challenge: 'Client needed simultaneous authorization in the EU under MiCA and in the GCC under Dubai VARA while maintaining operational continuity.',
      solution: 'Eagle Compliance authored complete regulatory whitepapers, implemented automated Travel Rule architectures, and prepared the board for rigorous supervisory examinations.',
      outcome: 'Secured full VARA Market Services License and passported MiCA CASP authorization across 27 EU member states.',
      image: `${import.meta.env.BASE_URL}assets/images/blockchain-crypto.jpg`,
      iconType: 'crypto',
      score: '27 States',
      progressLabel: 'EU Passported Reach',
      metricPill: 'VARA & MiCA Approved'
    }
  ];

  // Filter items
  const filteredCases = activeCategory === 'All Case Studies' || activeCategory === categories[0]
    ? caseList
    : caseList.filter(c => 
        (c.category && c.category.toLowerCase().includes(activeCategory.toLowerCase())) ||
        (c.categoryTag && c.categoryTag.toLowerCase().includes(activeCategory.toLowerCase()))
      );

  const currentFeed = liveFeeds[feedIndex];

  return (
    <div className="w-full pb-20 space-y-16 animate-fade-in text-black dark:text-white dark:text-slate-100">
      
      {/* ======================================================== */}
      {/* 1. HERO SECTION WITH 3D NETWORK GLOBE & FLOATING METRICS */}
      {/* ======================================================== */}
      <section className="relative w-full pt-12 pb-16 overflow-hidden border-b border-surface-border bg-[#050D24] dark:bg-[#07112A] text-white">
        {/* Background Atmosphere Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E31F1F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#131313]/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Title, Subtitle, Capability Badges */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31F1F]/20 text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/40">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{csPage.tag || 'PROVEN ENTERPRISE OUTCOMES'}</span>
              </div>

              <h1 className="font-sans tracking-tight text-4xl sm:text-5.5xl font-extrabold text-white leading-[1.15]">
                {csPage.title || 'Client Case Studies & Audit Records'}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {csPage.subtitle || 'Explore how Eagle Compliance delivers measurable regulatory clearance, risk mitigation, and operational resilience across complex global environments.'}
              </p>

              {/* Three Pill Badges with Live Hover Accents */}
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#030303]/80 border border-[#2A2E35] text-xs text-slate-200 font-medium hover:border-[#FF3333] transition-all">
                  <Target className="w-4 h-4 text-[#FF3333]" />
                  <span>{csPage.pills?.precision || 'Regulatory Precision'}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#030303]/80 border border-[#2A2E35] text-xs text-slate-200 font-medium hover:border-emerald-400 transition-all">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>{csPage.pills?.mitigation || 'Risk Mitigation'}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#030303]/80 border border-[#2A2E35] text-xs text-slate-200 font-medium hover:border-[#FF3333] transition-all">
                  <Activity className="w-4 h-4 text-[#FF3333]" />
                  <span>{csPage.pills?.resilience || 'Operational Resilience'}</span>
                </div>
              </div>

              {/* Live Outcome Feed Stream Box */}
              <div className="p-3.5 rounded-2xl bg-[#E31F1F]/80 border border-[#2A2E35] font-mono flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-[#FF3333] font-bold shrink-0">[{currentFeed.tag}]</span>
                  <span className="text-slate-200 truncate">{currentFeed.text}</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold shrink-0">
                  {currentFeed.status}
                </span>
              </div>
            </div>

            {/* Right Column: Globe Mesh Visual with 3 Floating Glass Telemetry Cards & Orbital Motion */}
            <div className="lg:col-span-6 relative h-[380px] sm:h-[440px] flex items-center justify-center">
              
              {/* Central Globe Image with Deep Ambient Glow */}
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#E31F1F]/40 to-transparent blur-2xl pointer-events-none" />
                <img
                  src={`${import.meta.env.BASE_URL}assets/images/global-earth.jpg`}
                  alt="Global Regulatory Network"
                  className="w-full h-full object-cover rounded-full opacity-60 mix-blend-screen shadow-[0_0_80px_rgba(255, 51, 51,0.3)] animate-pulse"
                  style={{ animationDuration: '6s' }}
                />
              </div>

              {/* Floating Stat Card 1: Top Right */}
              <div className="absolute top-4 right-2 sm:right-6 p-4 rounded-2xl bg-[#E31F1F]/90 backdrop-blur-md border border-[#E31F1F]/70 shadow-2xl space-y-0.5 min-w-[135px] hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-[#7D797A] uppercase tracking-wider">
                    {csPage.telemetry?.reach || 'Global Reach'}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3333] animate-ping" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">45+</div>
                <div className="text-[10px] text-blue-200">
                  {csPage.telemetry?.reachSub || 'Jurisdictions Served'}
                </div>
              </div>

              {/* Floating Stat Card 2: Middle Left */}
              <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 p-4 rounded-2xl bg-[#E31F1F]/90 backdrop-blur-md border border-[#E31F1F]/70 shadow-2xl space-y-0.5 min-w-[135px] hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-[#7D797A] uppercase tracking-wider">
                    {csPage.telemetry?.outcomes || 'Client Outcomes'}
                  </div>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">{liveProjectsCount}+</div>
                <div className="text-[10px] text-blue-200">
                  {csPage.telemetry?.outcomesSub || 'Projects Delivered'}
                </div>
              </div>

              {/* Floating Stat Card 3: Bottom Right */}
              <div className="absolute bottom-4 right-4 sm:right-10 p-4 rounded-2xl bg-[#E31F1F]/90 backdrop-blur-md border border-[#E31F1F]/70 shadow-2xl space-y-0.5 min-w-[135px] hover:scale-105 transition-transform">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-mono text-[#7D797A] uppercase tracking-wider">
                    {csPage.telemetry?.success || 'Regulatory Success'}
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl font-bold text-emerald-400 font-mono">{liveSuccessRate}%</div>
                <div className="text-[10px] text-blue-200">
                  {csPage.telemetry?.successSub || 'Average Clearance Rate'}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. FOUR KEY METRICS RIBBON (HORIZONTAL ROW)              */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-2xl bg-surface-raised border border-surface-border shadow-lg flex items-center gap-4 hover:border-[#E31F1F] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white font-mono">
                20+
              </div>
              <div className="text-[11px] text-[#7D797A] font-medium">
                {csPage.metrics?.[0]?.label || 'Years of Regulatory Excellence'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-raised border border-surface-border shadow-lg flex items-center gap-4 hover:border-[#E31F1F] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white font-mono">
                {liveProjectsCount}+
              </div>
              <div className="text-[11px] text-[#7D797A] font-medium">
                {csPage.metrics?.[1]?.label || 'Successful Engagements'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-raised border border-surface-border shadow-lg flex items-center gap-4 hover:border-[#E31F1F] transition-all group">
            <div className="w-11 h-11 rounded-xl bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white font-mono">
                45+
              </div>
              <div className="text-[11px] text-[#7D797A] font-medium">
                {csPage.metrics?.[2]?.label || 'Global Jurisdictions'}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-raised border border-surface-border shadow-lg flex items-center gap-4 hover:border-emerald-500 transition-all group">
            <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white font-mono">
                {liveSuccessRate}%
              </div>
              <div className="text-[11px] text-[#7D797A] font-medium">
                {csPage.metrics?.[3]?.label || 'Regulatory Clearance Rate'}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CATEGORY FILTER PILLS & ACTION BUTTON                 */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-2.5 rounded-2xl bg-surface-raised border border-surface-border shadow-sm">
          
          {/* Scrollable / Wrap Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat, idx) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#E31F1F] text-white shadow-md font-bold dark:bg-[#FF3333] dark:text-[#030303]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-surface-subtle'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Right Filter Button */}
          <button 
            onClick={() => setActiveCategory('All Case Studies')}
            className="px-4 py-2 rounded-xl bg-surface-subtle border border-surface-border text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 hover:border-[#E31F1F] transition-all"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>{csPage.filter || 'Filter'}</span>
          </button>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. RICH HORIZONTAL CASE STUDY CARDS WITH MOTION GAUGES   */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {filteredCases.map((cs) => {
          return (
            <div
              key={cs.id}
              className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl hover:border-[#E31F1F] transition-all group hover:scale-[1.005]"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Image with Badge Overlay */}
                <div className="lg:col-span-3 relative w-full h-48 lg:h-56 rounded-2xl overflow-hidden bg-slate-900 border border-surface-border shrink-0">
                  <img
                    src={cs.image || `${import.meta.env.BASE_URL}assets/images/case-study-bank.jpg`}
                    alt={cs.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Category icon bottom badge */}
                  <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-[#E31F1F]/90 backdrop-blur-md border border-[#E31F1F]/60 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    {cs.iconType === 'ai' ? (
                      <Code2 className="w-5 h-5 text-[#FF3333]" />
                    ) : cs.iconType === 'crypto' ? (
                      <Boxes className="w-5 h-5 text-[#FF3333]" />
                    ) : (
                      <Landmark className="w-5 h-5 text-[#FF3333]" />
                    )}
                  </div>
                </div>

                {/* Right Column: Case Data */}
                <div className="lg:col-span-9 space-y-5">
                  
                  {/* Top Metadata Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#FF3333]">
                      {cs.categoryTag || cs.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-surface-subtle text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-300 border border-surface-border self-start sm:self-auto">
                      {cs.client}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white leading-snug">
                    {cs.title}
                  </h3>

                  {/* Challenge, Solution & Verified Outcome 3-Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-2">
                    
                    {/* Challenge */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-1.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-500">
                        {csPage.challenge || 'CHALLENGE'}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cs.challenge}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-surface-subtle border border-surface-border space-y-1.5">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#FF3333]">
                        {csPage.solution || 'SOLUTION'}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {cs.solution}
                      </p>
                    </div>

                    {/* Verified Outcome with Animated Verification Indicator */}
                    <div className="md:col-span-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            {csPage.outcome || 'VERIFIED OUTCOME'}
                          </div>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold leading-relaxed mt-1">
                          {cs.outcome}
                        </p>
                      </div>

                      <button
                        onClick={onOpenConsultation}
                        className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] hover:underline flex items-center gap-1.5 pt-2 group-hover:translate-x-1 transition-all"
                      >
                        <span>{csPage.viewSummary || 'View Full Summary'}</span>
                        <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* ======================================================== */}
      {/* 5. PAGINATION STRIP                                      */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 py-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            className="w-8 h-8 rounded-lg bg-surface-raised border border-surface-border text-[#7D797A] flex items-center justify-center hover:bg-surface-subtle disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
          </button>
          
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num)}
              className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
                currentPage === num
                  ? 'bg-[#E31F1F] text-white shadow-sm'
                  : 'bg-surface-raised border border-surface-border text-slate-600 dark:text-slate-300 hover:bg-surface-subtle'
              }`}
            >
              {num}
            </button>
          ))}

          <span className="text-[#7D797A] font-mono px-1">...</span>

          <button
            onClick={() => setCurrentPage(8)}
            className={`w-8 h-8 rounded-lg text-xs font-mono font-bold transition-all ${
              currentPage === 8
                ? 'bg-[#E31F1F] text-white'
                : 'bg-surface-raised border border-surface-border text-slate-600 dark:text-slate-300 hover:bg-surface-subtle'
            }`}
          >
            8
          </button>

          <button 
            disabled={currentPage === 8}
            onClick={() => setCurrentPage(prev => Math.min(8, prev + 1))}
            className="w-8 h-8 rounded-lg bg-surface-raised border border-surface-border text-[#7D797A] flex items-center justify-center hover:bg-surface-subtle disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION BANNER (BOTTOM)                        */}
      {/* ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-10 rounded-3xl bg-[#E31F1F] dark:bg-[#030303] text-white shadow-2xl border border-[#1E1E1E] overflow-hidden group">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#E31F1F]/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            
            {/* Left Glowing Orbital Clipboard Icon */}
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#131313] border-2 border-[#FF3333]/40 flex items-center justify-center shadow-[0_0_30px_rgba(255, 51, 51,0.3)] shrink-0 group-hover:scale-110 transition-transform">
                <div className="w-12 h-12 rounded-full bg-[#E31F1F]/40 flex items-center justify-center text-[#FF3333]">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono font-bold tracking-widest text-[#FF3333] uppercase">
                  {csPage.ctaTag || 'READY TO STRENGTHEN YOUR COMPLIANCE POSTURE?'}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {csPage.ctaTitle || "Let's Achieve Your Next Regulatory Milestone"}
                </h3>
                <p className="text-xs text-blue-200/80 max-w-xl leading-relaxed">
                  {csPage.ctaSubtitle || 'Partner with Eagle Compliance for outcome-driven regulatory intelligence designed for complex, high-stakes environments.'}
                </p>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3.5 rounded-xl bg-[#E31F1F] hover:bg-[#253B8C] text-white text-xs font-bold shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>{csPage.ctaBtn || 'Book a Consultation'}</span>
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
