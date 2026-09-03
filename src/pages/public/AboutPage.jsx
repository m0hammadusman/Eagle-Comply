import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Award, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Target, 
  Eye, 
  Briefcase, 
  Check, 
  Globe2, 
  ScanEye,
  Cpu,
  Terminal,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import TeamBadges from '../../components/common/TeamBadges';

function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

function PipelineConsole() {
  const { t } = useLanguage();
  const ap = t.aboutPage || {};

  const icons = [ScanEye, Cpu, Terminal, ShieldAlert];

  const defaultPipeline = [
    {
      index: "PHASE 01 // DISCOVERY",
      title: "Diagnostic & Risk Discovery",
      desc: "We conduct an in-depth review of your products, customer corridors, business model, and operational processes against applicable regulatory baselines.",
      output: "Regulatory Gap Matrix & Perimeter Map"
    },
    {
      index: "PHASE 02 // ARCHITECTURE",
      title: "Practical Control Design",
      desc: "We translate complex statutory rules into clear policies, standard operating procedures, and automated workflows that frontline teams can execute.",
      output: "Customized SOPs & Policy Blueprints"
    },
    {
      index: "PHASE 03 // DEPLOYMENT",
      title: "Implementation & Staff Training",
      desc: "We embed compliance routines into your daily operations and train compliance staff, management, and board members on their legal duties.",
      output: "Operationalized Governance & Board Briefing"
    },
    {
      index: "PHASE 04 // SURVEILLANCE",
      title: "Ongoing Assurance & Reviews",
      desc: "We conduct periodic independent testing, gap assessments, and regulatory horizon scanning to keep your organization ahead of supervisory changes.",
      output: "Continuous Audit Logs & Risk Horizon Radar"
    }
  ];

  const pipelineData = (ap.pipelineData || defaultPipeline).map((item, idx) => ({
    ...item,
    icon: icons[idx] || ScanEye
  }));

  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const duration = 4000;
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const p = Math.min(elapsed / duration, 1);
      setProgress(p);

      if (p >= 1) {
        setActiveStep((prev) => (prev + 1) % pipelineData.length);
        startTimeRef.current = Date.now();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [activeStep, pipelineData.length]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const currentItem = pipelineData[activeStep] || pipelineData[0];
  const IconComponent = currentItem.icon;
  const circumference = 88;
  const strokeDashoffset = circumference - (circumference * progress);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] glass-panel bg-white/90 dark:bg-[#030303] border border-[#E4E4E4] dark:border-[#1E1E1E]/80 dark:border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-colors duration-300">
      
      {/* Top Console Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#E4E4E4] dark:border-[#1E1E1E]/80 dark:border-white/10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#E31F1F] bg-[#E31F1F]/10 dark:bg-[#E31F1F]/10 border border-[#E31F1F]/20 dark:border-[#E31F1F]/30">
          <span className="w-2 h-2 rounded-full bg-[#E31F1F] dark:bg-[#E31F1F] animate-ping" />
          <span>{ap.methodologyBadge || 'Methodology & Architecture'}</span>
        </div>
        <div className="font-mono text-xs text-[#7D797A] dark:text-[#7D797A] flex items-center gap-1.5">
          <span>{ap.executionPipeline || 'EXECUTION PIPELINE:'}</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">{ap.activeStatus || 'ACTIVE'}</span>
        </div>
      </div>

      {/* Split Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Left Step Pipeline Navigation */}
        <div className="md:col-span-5 flex flex-col gap-3 relative">
          <div className="absolute left-[26px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-white/10 z-0" />

          {pipelineData.map((item, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                onClick={() => handleStepClick(idx)}
                className={`flex items-center gap-4 p-3.5 rounded-2xl border transition-all relative z-10 text-left ${
                  isActive
                    ? 'bg-[#F5F3F2] dark:bg-[#131313] border-[#E31F1F]/40 dark:border-[#E31F1F]/40 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border transition-all ${
                    isActive
                      ? 'bg-[#E31F1F] dark:bg-[#E31F1F] text-white dark:text-slate-950 border-[#E31F1F] dark:border-[#FF3333] scale-105 shadow-md shadow-red-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-[#7D797A] dark:text-[#7D797A] border-[#E4E4E4] dark:border-[#1E1E1E] dark:border-white/10'
                  }`}
                >
                  0{idx + 1}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#E31F1F] dark:text-white font-bold'
                      : 'text-slate-600 dark:text-[#7D797A]'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Showcase Hub */}
        <div className="md:col-span-7 rounded-2xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-[#F5F3F2] via-slate-50 to-[#FFF5F5] dark:from-[#131313] dark:via-[#030303] dark:to-[#030303] border border-[#E31F1F]/20 dark:border-[#E31F1F]/25 shadow-inner">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#E31F1F]/10 dark:bg-[#E31F1F]/15 border border-[#E31F1F]/25 dark:border-[#E31F1F]/30 text-[#E31F1F] dark:text-[#E31F1F] flex items-center justify-center shrink-0 shadow-sm">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-[#E31F1F] dark:text-[#E31F1F] tracking-wider">
                  {currentItem.index}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white dark:text-white mt-0.5 leading-snug">
                  {currentItem.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentItem.desc}
            </p>
          </div>

          {/* Telemetry Output Box with Progress Ring */}
          <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-[#030303]/70 border border-dashed border-slate-300 dark:border-white/15 flex items-center justify-between gap-3 shadow-sm">
            <div className="font-mono text-xs text-slate-600 dark:text-slate-300">
              <span className="text-[#7D797A] uppercase text-[10px] block font-bold">{ap.deliverableLabel || 'DELIVERABLE:'}</span>
              <span className="font-bold text-black dark:text-white dark:text-slate-100">{currentItem.output}</span>
            </div>

            {/* Circular Timer Ring */}
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 32 32">
                <circle
                  className="stroke-slate-200 dark:stroke-white/10 fill-none"
                  strokeWidth="3"
                  cx="16"
                  cy="16"
                  r="14"
                />
                <circle
                  className="stroke-[#E31F1F] dark:stroke-cyan-400 fill-none transition-all duration-75"
                  strokeWidth="3"
                  strokeDasharray="88"
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  cx="16"
                  cy="16"
                  r="14"
                />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function AboutPage({ onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, experts } = useLanguage();
  const ap = t.aboutPage || {};

  const valueIcons = [ShieldCheck, Lock, Scale, Eye];
  
  const defaultValues = [
    {
      title: "Professional Ethics & Integrity",
      desc: "We adhere to the highest standards of professional conduct, objective assessment, and unbiased regulatory guidance."
    },
    {
      title: "Strict Confidentiality",
      desc: "All client disclosures, risk assessments, and documentation are safeguarded under mutual bilateral NDA protocols."
    },
    {
      title: "Risk-Based Approach",
      desc: "We engineer proportionate compliance frameworks tailored to your actual institutional risk profile and operational realities."
    },
    {
      title: "Vigilance & Clear Vision",
      desc: "Like the eagle, we identify regulatory risks early and provide clear foresight across evolving international supervisory standards."
    }
  ];

  const brandValues = (ap.brandValues || defaultValues).map((val, idx) => ({
    ...val,
    icon: valueIcons[idx] || ShieldCheck
  }));

  const seniorPractitioners = experts || [];

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <section className="relative pt-4 sm:pt-6 pb-8 sm:pb-12 lg:pt-6 lg:pb-12 bg-surface-subtle/70 border-b border-surface-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 border border-[#E31F1F]/25 dark:border-[#FF3333]/30 text-[#E31F1F] dark:text-[#E4E4E4] text-xs font-mono font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#E31F1F] dark:text-[#FF3333]" />
                <span>{ap.tag || 'ABOUT EAGLECOMPLY'}</span>
              </div>

              <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-black dark:text-white dark:text-white leading-[1.15]">
                {t.brand?.tagline || ap.title || 'Complex Regulations. Clear Solutions. Confident Growth.'}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-2xl">
                {ap.description || 'EagleComply is an international compliance advisory firm helping financial institutions, fintechs, payment companies, remittance businesses, and startups operate with complete regulatory certainty.'}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onOpenConsultation?.()}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#E31F1F] to-[#E31F1F] dark:from-[#E31F1F] dark:to-[#FF3333] text-white dark:text-[#030303] font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{ap.bookConsultation || t.nav?.bookConsultation || 'Book a Consultation'}</span>
                </button>
                <button
                  onClick={() => onNavigate?.('solutions')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-surface-base border border-surface-border text-slate-800 dark:text-slate-200 hover:border-[#E31F1F] font-bold text-xs transition-all shadow-sm cursor-pointer"
                >
                  <span>{ap.explorePractice || 'Explore Practice Areas'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {/* Key Practice Credential Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-3 border-t border-surface-border/60 max-w-lg">
                <div>
                  <div className="text-base sm:text-lg font-bold text-black dark:text-white dark:text-white font-mono">100%</div>
                  <div className="text-[11px] text-[#7D797A] font-mono">{ap.auditTested || 'Audit Tested'}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-black dark:text-white dark:text-white font-mono">FATF</div>
                  <div className="text-[11px] text-[#7D797A] font-mono">{ap.alignedBaselines || 'Aligned Baselines'}</div>
                </div>
                <div>
                  <div className="text-base sm:text-lg font-bold text-black dark:text-white dark:text-white font-mono">UK / EU</div>
                  <div className="text-[11px] text-[#7D797A] font-mono">{ap.crossBorder || 'Cross-Border Depth'}</div>
                </div>
              </div>
            </div>

            {/* Right Video Showcase Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden glass-panel border border-surface-border shadow-2xl bg-[#E31F1F]/5 dark:bg-[#030303]/40 aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center group">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover rounded-3xl"
                  poster={`${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`}
                >
                  <source src={`${import.meta.env.BASE_URL}about-video.mp4`} type="video/mp4" />
                  <source src={`${import.meta.env.BASE_URL}assets/about-video.mp4`} type="video/mp4" />
                  <source src={`${import.meta.env.BASE_URL}world-map.mp4`} type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-3xl" />

                <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-mono flex items-center gap-2 pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-bold">{ap.motionTag || 'EAGLECOMPLY MOTION'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Purpose & Mandate */}
      <section className="py-14 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4 text-left rtl:text-right">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
              {ap.purposeTag || 'Our Purpose'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white dark:text-white">
              {ap.purposeTitle || 'Demystifying Complex Regulatory Frameworks'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ap.purposeP1 || 'Regulatory compliance should not be an impediment to business innovation; it should be the solid foundation that enables sustainable, long-term growth.'}
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ap.purposeP2 || 'EagleComply was established to bridge the divide between complex statutory directives and practical business execution. We deliver tailored AML/CFT programs, regulatory authorization support, enterprise risk frameworks, and legal compliance advisory designed to protect your institutional reputation and satisfy supervisory scrutiny.'}
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> {ap.fatfAligned || 'FATF Aligned'}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> {ap.intlDepth || 'International Depth'}
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> {ap.riskMethodology || 'Risk-Based Methodology'}
              </span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#E31F1F] to-[#1E1E1E] text-white space-y-5 shadow-xl text-left rtl:text-right">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-300">
              {ap.eagleIdentityTag || 'The Eagle Identity'}
            </div>
            <h3 className="text-xl font-bold text-white">
              {ap.eagleIdentityTitle || 'Vigilance, Oversight & Integrity'}
            </h3>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ap.eagleIdentityP1 || 'In financial regulation, the eagle represents vigilant oversight, keen discernment, and the ability to view the broader regulatory landscape.'}
            </p>
            <p className="text-xs text-slate-200 leading-relaxed">
              {ap.eagleIdentityP2 || 'We help institutions detect compliance risks early, navigate multi-jurisdictional hurdles with clarity, and soar with confidence into new regulated markets.'}
            </p>
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono text-slate-300">
              <span>{t.brand?.separated || 'Brand Ethos'}</span>
              <span className="font-bold">{ap.brandEthos || 'Authoritative · Practical · Trusted'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="py-14 lg:py-20 bg-surface-subtle border-y border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
              {ap.valuesTag || 'Core Principles'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white dark:text-white mt-1">
              {ap.valuesTitle || 'Our Professional Values'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brandValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border border-surface-border hover:border-[#E31F1F] dark:hover:border-[#FF3333] transition-all space-y-2.5 shadow-sm text-left rtl:text-right"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-black dark:text-white dark:text-white">
                    {val.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Interactive Pipeline Console (Methodology) */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
            {ap.methodologyTag || 'Interactive Methodology'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-black dark:text-white dark:text-white mt-1">
            {ap.methodologyTitle || 'Execution Pipeline & Delivery Architecture'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
            {ap.methodologyDesc || 'Click on any phase to inspect our interactive delivery stages, workflows, and tangible compliance deliverables.'}
          </p>
        </div>

        <PipelineConsole />
      </section>

      {/* 6. Call to Action */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
          {ap.ctaTitle || 'Ready to Elevate Your Institutional Compliance?'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          {ap.ctaDesc || 'Contact EagleComply today to schedule a confidential discussion with our senior compliance practitioners.'}
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 rounded-xl bg-[#E31F1F] dark:bg-[#E31F1F] text-white text-xs font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{ap.bookConsultation || t.nav?.bookConsultation || 'Book a Consultation'}</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 rounded-xl glass-panel border border-surface-border text-slate-800 dark:text-white text-xs font-bold hover:bg-surface-subtle transition-all cursor-pointer"
          >
            {ap.contactUs || 'Contact Us'}
          </button>
        </div>
      </section>
    </div>
  );
}
