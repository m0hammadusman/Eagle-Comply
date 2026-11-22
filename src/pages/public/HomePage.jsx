import React, { useState } from 'react';
import GovernanceLattice from '../../components/canvas/GovernanceLattice';
import ComplianceCard from '../../components/common/ComplianceCard';
import { 
  ShieldCheck, 
  Building2, 
  Scale, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Globe2, 
  Check, 
  Lock,
  UserCheck,
  Briefcase,
  Landmark,
  Layers,
  Coins,
  CreditCard,
  Zap,
  Sliders,
  Calculator
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { servicePillars, expertDisciplines, jurisdictionCoverage, industries as officialIndustries } from '../../data/complianceData';

export default function HomePage({ onNavigate, onOpenConsultation }) {
  const { t, badges } = useLanguage();

  // Active Industry Tab for Sector Deep-Dive
  const [activeSectorId, setActiveSectorId] = useState('fintech-payments');

  // Active Jurisdiction Tab
  const [activeJurisdictionId, setActiveJurisdictionId] = useState('european-union');

  // Diagnostic Calculator State
  const [diagSector, setDiagSector] = useState('fintech-payments');
  const [diagJurisdiction, setDiagJurisdiction] = useState('uk_eu');
  const [diagService, setDiagService] = useState('fcc');

  const activeSector = officialIndustries.find(ind => ind.id === activeSectorId) || officialIndustries[0];
  const activeJurisdiction = jurisdictionCoverage.find(j => j.id === activeJurisdictionId) || jurisdictionCoverage[0];

  const badgeIcons = [ShieldCheck, Scale, Building2, Lock, Landmark, Zap, Layers, FileText, CheckCircle2];
  const dynamicBadges = (badges || []).map((b, i) => ({
    ...b,
    icon: badgeIcons[i % badgeIcons.length] || ShieldCheck
  }));
  const displayBadges = [...dynamicBadges, ...dynamicBadges];

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      
      {/* ======================================================== */}
      {/* 1. MASTER HERO SECTION                                  */}
      {/* ======================================================== */}
      <section className="relative min-h-[75vh] lg:min-h-[82vh] flex items-center justify-center overflow-hidden py-14 sm:py-18 lg:py-24 border-b border-surface-border dark:border-[#1E3778]/70">
        
        {/* GovernanceLattice animated node network — behind everything */}
        <GovernanceLattice className="absolute inset-0 z-0 w-full h-full" />

        {/* Institutional Clean Architectural Grid & Refined Surface Glow — subtle overlay on top of lattice */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
          {/* Primary 48px precision grid */}
          <div 
            className="absolute inset-0 opacity-[0.035] dark:opacity-[0.07]"
            style={{
              backgroundImage: `linear-gradient(to right, #334DAF 1px, transparent 1px), linear-gradient(to bottom, #334DAF 1px, transparent 1px)`,
              backgroundSize: '48px 48px'
            }}
          />
          {/* Secondary 12px precision grid lines */}
          <div 
            className="absolute inset-0 opacity-[0.018] dark:opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(to right, #7096D1 1px, transparent 1px), linear-gradient(to bottom, #7096D1 1px, transparent 1px)`,
              backgroundSize: '12px 12px'
            }}
          />
          {/* Refined radial ambient surface illumination */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-[radial-gradient(ellipse_at_top,rgba(51,77,175,0.12),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(112,150,209,0.14),transparent_70%)] pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/25 dark:border-[#7096D1]/30 text-[#091F5C] dark:text-[#D0E4FE] text-xs font-semibold tracking-wide mb-4 sm:mb-6 animate-fade-in shadow-xs max-w-full truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
            <span className="truncate">Financial Crime Compliance · Regulatory & Commercial Advisory · Accounting & Finance</span>
          </div>

          {/* Primary Heading from DOCX */}
          <h1 className="font-sans text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#091F5C] dark:text-[#F9FBFF] max-w-4xl mx-auto leading-[1.15] mb-5 sm:mb-6">
            Compliance, regulation and finance for businesses operating in complex markets.
          </h1>

          {/* Core Introduction from DOCX */}
          <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-[#D0E4FE]/90 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 font-normal">
            EagleComply brings together financial crime compliance, regulatory and commercial advisory, and accounting and finance expertise. We support regulated and growth focused businesses with the frameworks, controls, documentation and operational support required to enter markets, manage risk, strengthen governance and run reliable business processes.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0">
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book a Consultation</span>
            </button>

            <button
              onClick={() => onNavigate('solutions')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Infinite Marquee Ticker */}
          <div className="pt-10 sm:pt-14 w-full max-w-full overflow-hidden relative group">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-surface-base to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-surface-base to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee-ltr flex items-center gap-3 sm:gap-4 py-2">
              {displayBadges.map((badge, bIdx) => {
                const BadgeIcon = badge.icon || ShieldCheck;
                return (
                  <div
                    key={bIdx}
                    className="shrink-0 px-4 py-2.5 rounded-xl glass-panel border border-surface-border/80 dark:border-white/10 shadow-sm inline-flex items-center gap-3 bg-white/90 dark:bg-[#0D1629]/80"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/20 dark:border-[#7096D1]/30 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center shrink-0">
                      <BadgeIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col items-start min-w-0">
                      <span className="text-xs font-bold text-slate-900 dark:text-white whitespace-nowrap leading-tight">
                        {badge.title}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap leading-tight mt-0.5">
                        {badge.sub}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. COMPANY INTRODUCTION & MULTIDISCIPLINARY TEAM         */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 w-full bg-[#F4F7FC] dark:bg-[#0B142B] border-b border-surface-border dark:border-[#1E3778]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            <div className="lg:col-span-6 space-y-5 text-left rtl:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WHO WE ARE & OUR MULTIDISCIPLINARY MODEL</span>
              </div>

              <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                A single coordinated team for connected regulatory, commercial and finance realities.
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Our team combines two specialists in AML/CFT, KYC and banking compliance, a regulatory and commercial specialist focused on financial services, contracts, licensing and digital assets, and a UK based Chartered Accountant. This structure allows connected regulatory, operational, commercial and financial issues to be addressed through one coordinated team.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                This combination reflects the way regulated businesses actually operate. A licensing project can require an AML/CFT framework, customer documentation, commercial agreements, governance arrangements and financial information. A remediation project can require policy changes, file reviews, operational support and stronger internal controls. EagleComply brings these workstreams together so that the final solution is consistent across the business.
              </p>

              <div className="pt-3 flex flex-wrap gap-4 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Proportioned to Risk Profile
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Clear Analysis & Usable Docs
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Defined Accountable Ownership
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#334DAF] dark:text-[#7096D1] hover:underline cursor-pointer"
                >
                  <span>Read more about our firm & methodology</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertDisciplines.map((d) => (
                <div 
                  key={d.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#101E42] border border-[#D0E4FE] dark:border-[#1E3778] hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all space-y-3 shadow-sm hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                      {d.category}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                      {d.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                      {d.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[#D0E4FE]/70 dark:border-[#1E3778]/70 text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                    {d.badge}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. THREE PRIMARY SERVICE PILLARS                         */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 w-full bg-surface-base dark:bg-[#101E42] border-b border-surface-border dark:border-[#1E3778]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
              <Layers className="w-3.5 h-3.5" />
              <span>PRIMARY SERVICE CATEGORIES</span>
            </div>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Practical Frameworks, Legal Clarity & Financial Rigour
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              From policy packs and licensing preparation to contract negotiation, customer due diligence, reporting and ongoing support, we deliver proportionate solutions built for operating realities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {servicePillars.map((pillar) => {
              const IconComponent = pillar.id === 'accounting-finance'
                ? Landmark
                : pillar.id === 'regulatory-commercial-advisory'
                  ? Scale
                  : ShieldCheck;

              const homeDesc = pillar.id === 'financial-crime-compliance'
                ? 'AML/CFT frameworks, KYC/KYB onboarding, sanctions screening and supervisory remediation.'
                : pillar.id === 'regulatory-commercial-advisory'
                  ? 'FinTech licensing, commercial contracts, corporate governance and data protection.'
                  : 'Outsourced bookkeeping, management accounts, financial reporting and clean-up.';

              return (
                <ComplianceCard
                  key={pillar.id}
                  uniqueId={`home-${pillar.id}`}
                  compact={true}
                  category={pillar.shortName || pillar.name}
                  categoryIcon={IconComponent}
                  jurisdictions={pillar.jurisdictions}
                  title={pillar.name}
                  desc={homeDesc}
                  deliverablesTitle="Core Deliverables"
                  deliverables={pillar.subOfferings.slice(0, 3)}
                  onDetails={() => onNavigate('solutions')}
                  detailsText="Explore Practice"
                  onConsult={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
                  consultText="Consult"
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. SIX REGULATED INDUSTRY VERTICALS                      */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 w-full bg-[#F4F7FC] dark:bg-[#0B142B] border-b border-surface-border dark:border-[#1E3778]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>REGULATED INDUSTRY VERTICALS</span>
            </div>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Connected Compliance Built for How Your Business Makes Money
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our sector approach reflects how the business serves customers, moves funds, uses third parties and meets its regulatory responsibilities across complex operating corridors.
            </p>
          </div>

          {/* Industry Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {officialIndustries.filter(ind => !ind.isAlias).map((ind) => {
              const isSelected = ind.id === activeSectorId;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveSectorId(ind.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                    isSelected
                      ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C] shadow-md'
                      : 'bg-white dark:bg-[#101E42] border-[#D0E4FE] dark:border-[#1E3778] text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
                  }`}
                >
                  {ind.name}
                </button>
              );
            })}
          </div>

          {/* Active Industry Showcase Card */}
          <div className="rounded-3xl bg-white dark:bg-[#101E42] border border-[#D0E4FE] dark:border-[#1E3778] p-6 sm:p-10 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4 text-left rtl:text-right">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                    {activeSector.heroTag}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {activeSector.badge}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {activeSector.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {activeSector.desc}
                </p>

                <div className="pt-2">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-2">
                    Primary Operational & Regulatory Challenges:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(activeSector.challenges || []).map((ch, cIdx) => (
                      <div key={cIdx} className="p-2.5 rounded-xl bg-[#F8FAFD] dark:bg-[#0E1A38] border border-[#D0E4FE]/70 dark:border-[#1E3778]/70 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-[#334DAF] shrink-0 mt-0.5">0{cIdx+1}</span>
                        <span>{ch}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('industry-detail', { id: activeSector.id })}
                    className="px-5 py-2.5 rounded-xl bg-[#334DAF] hover:bg-[#253982] text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <span>View Dedicated Sector Page</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
                    className="px-5 py-2.5 rounded-xl border border-surface-border text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-surface-subtle transition-all cursor-pointer"
                  >
                    Scope Sector Engagement
                  </button>
                </div>
              </div>

              {/* Service List from DOCX for this Industry */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#F8FAFD] dark:bg-[#0E1A38] border border-[#D0E4FE]/70 dark:border-[#1E3778]/70 space-y-3 text-left rtl:text-right">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
                  Tailored Practice Deliverables:
                </span>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {(activeSector.deliverables || []).map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 py-1 border-b border-surface-border/50 last:border-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-medium">{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. JURISDICTION COVERAGE (EU, GCC, PK, AU, US)           */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 w-full bg-surface-base dark:bg-[#101E42] border-b border-surface-border dark:border-[#1E3778]/60 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
              <Globe2 className="w-3.5 h-3.5" />
              <span>GLOBAL REGULATORY JURISDICTIONS</span>
            </div>
            <h2 className="font-sans tracking-tight text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
              Supporting Businesses Across Key International Markets
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              EagleComply supports businesses across the European Union, Gulf Cooperation Council markets, Pakistan, Australia and the United States. Cross border work is scoped around the activity, customer base, regulatory perimeter and professional requirements of the relevant jurisdiction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
            {jurisdictionCoverage.map((j) => {
              const isSelected = j.id === activeJurisdictionId;
              return (
                <button
                  key={j.id}
                  onClick={() => setActiveJurisdictionId(j.id)}
                  className={`p-4 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#091F5C] dark:bg-[#162758] border-[#334DAF] dark:border-[#7096D1] shadow-lg text-white'
                      : 'bg-white dark:bg-[#101E42] border-[#D0E4FE] dark:border-[#1E3778] hover:border-slate-400 dark:hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="text-2xl mb-2">{j.flag}</div>
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                      {j.name}
                    </h4>
                    <div className={`text-[10px] font-mono mt-1 ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                      {j.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#152754] border border-[#D0E4FE] dark:border-[#223E84] shadow-md text-left rtl:text-right">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{activeJurisdiction.flag}</span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {activeJurisdiction.name} Practice Coverage
                </h3>
                <span className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] font-bold">
                  {activeJurisdiction.tag}
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeJurisdiction.desc}
            </p>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CALL TO ACTION & CONSULTATION INTAKE BANNER          */}
      {/* ======================================================== */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gradient-to-br from-[#091F5C] via-[#102468] to-[#1E3778] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/20">
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>START WITH THE BUSINESS MODEL, JURISDICTION AND OUTCOME</span>
          </div>

          <h2 className="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight max-w-3xl mx-auto">
            Book an Initial Partner Scoping Consultation
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed font-normal">
            An initial consultation is used to understand the issue, identify the relevant workstream and define the scope of specialist support required. Consultations cover financial crime compliance, regulatory and commercial advisory, accounting and finance, licensing and market entry, remediation, documentation and ongoing operational support.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white text-[#091F5C] hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#334DAF]" />
              <span>Book a Consultation</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Submit Project Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
