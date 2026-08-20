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
import { practitioners as teamPractitioners } from '../../data/complianceData';
import TeamBadges from '../../components/common/TeamBadges';

function LinkedInIcon({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

function PipelineConsole() {
  const pipelineData = [
    {
      index: "PHASE 01 // DISCOVERY",
      title: "Diagnostic & Risk Discovery",
      desc: "We conduct an in-depth review of your products, customer corridors, business model, and operational processes against applicable regulatory baselines.",
      output: "Regulatory Gap Matrix & Perimeter Map",
      icon: ScanEye
    },
    {
      index: "PHASE 02 // ARCHITECTURE",
      title: "Practical Control Design",
      desc: "We translate complex statutory rules into clear policies, standard operating procedures, and automated workflows that frontline teams can execute.",
      output: "Customized SOPs & Policy Blueprints",
      icon: Cpu
    },
    {
      index: "PHASE 03 // DEPLOYMENT",
      title: "Implementation & Staff Training",
      desc: "We embed compliance routines into your daily operations and train compliance staff, management, and board members on their legal duties.",
      output: "Operationalized Governance & Board Briefing",
      icon: Terminal
    },
    {
      index: "PHASE 04 // SURVEILLANCE",
      title: "Ongoing Assurance & Reviews",
      desc: "We conduct periodic independent testing, gap assessments, and regulatory horizon scanning to keep your organization ahead of supervisory changes.",
      output: "Continuous Audit Logs & Risk Horizon Radar",
      icon: ShieldAlert
    }
  ];

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
  }, [activeStep]);

  const handleStepClick = (index) => {
    setActiveStep(index);
    startTimeRef.current = Date.now();
    setProgress(0);
  };

  const currentItem = pipelineData[activeStep];
  const IconComponent = currentItem.icon;
  const circumference = 88;
  const strokeDashoffset = circumference - (circumference * progress);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-[28px] glass-panel bg-white/90 dark:bg-[#0B1324] border border-slate-200/80 dark:border-white/10 p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden transition-colors duration-300">
      
      {/* Top Console Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200/80 dark:border-white/10 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg font-mono text-xs font-bold uppercase tracking-wider text-[#334DAF] dark:text-cyan-400 bg-[#334DAF]/10 dark:bg-cyan-500/10 border border-[#334DAF]/20 dark:border-cyan-500/30">
          <span className="w-2 h-2 rounded-full bg-[#334DAF] dark:bg-cyan-400 animate-ping" />
          <span>Methodology & Architecture</span>
        </div>
        <div className="font-mono text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <span>EXECUTION PIPELINE:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">ACTIVE</span>
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
                    ? 'bg-blue-50/90 dark:bg-[#0F1E38] border-[#334DAF]/40 dark:border-cyan-500/40 shadow-lg'
                    : 'bg-transparent border-transparent hover:bg-slate-100/60 dark:hover:bg-white/5'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 border transition-all ${
                    isActive
                      ? 'bg-[#091F5C] dark:bg-cyan-400 text-white dark:text-slate-950 border-[#091F5C] dark:border-cyan-300 scale-105 shadow-md shadow-blue-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10'
                  }`}
                >
                  0{idx + 1}
                </div>
                <span
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-[#091F5C] dark:text-white font-bold'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Active Showcase Hub */}
        <div className="md:col-span-7 rounded-2xl p-6 sm:p-8 min-h-[360px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-blue-50/80 via-slate-50 to-indigo-50/40 dark:from-[#0E1A33] dark:via-[#0A1428] dark:to-[#060D1A] border border-[#334DAF]/20 dark:border-cyan-500/25 shadow-inner">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#334DAF]/10 dark:bg-cyan-500/15 border border-[#334DAF]/25 dark:border-cyan-500/30 text-[#334DAF] dark:text-cyan-400 flex items-center justify-center shrink-0 shadow-sm">
                <IconComponent className="w-7 h-7" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-[#334DAF] dark:text-cyan-400 tracking-wider">
                  {currentItem.index}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
                  {currentItem.title}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {currentItem.desc}
            </p>
          </div>

          {/* Telemetry Output Box with Progress Ring */}
          <div className="mt-6 p-3.5 sm:p-4 rounded-xl bg-white/90 dark:bg-[#030712]/70 border border-dashed border-slate-300 dark:border-white/15 flex items-center justify-between gap-3 shadow-sm">
            <div className="font-mono text-xs text-slate-600 dark:text-slate-300">
              <span className="text-slate-400 uppercase text-[10px] block font-bold">DELIVERABLE:</span>
              <span className="font-bold text-slate-900 dark:text-slate-100">{currentItem.output}</span>
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
                  className="stroke-[#334DAF] dark:stroke-cyan-400 fill-none transition-all duration-75"
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
  const { t } = useLanguage();
  const brandValues = [
    {
      icon: ShieldCheck,
      title: "Professional Ethics & Integrity",
      desc: "We adhere to the highest standards of professional conduct, objective assessment, and unbiased regulatory guidance."
    },
    {
      icon: Lock,
      title: "Strict Confidentiality",
      desc: "All client disclosures, risk assessments, and documentation are safeguarded under mutual bilateral NDA protocols."
    },
    {
      icon: Scale,
      title: "Risk-Based Approach",
      desc: "We engineer proportionate compliance frameworks tailored to your actual institutional risk profile and operational realities."
    },
    {
      icon: Eye,
      title: "Vigilance & Clear Vision",
      desc: "Like the eagle, we identify regulatory risks early and provide clear foresight across evolving international supervisory standards."
    }
  ];

  const seniorPractitioners = teamPractitioners;

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <section className="relative py-14 lg:py-20 bg-surface-subtle/70 border-b border-surface-border overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/25 dark:border-[#7096D1]/30 text-[#091F5C] dark:text-[#D0E4FE] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
            <span>ABOUT EAGLECOMPLY</span>
          </div>
          <h1 className="font-sans text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.brand.tagline}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            EagleComply is an international compliance advisory firm helping financial institutions, fintechs, payment companies, remittance businesses, and startups operate with complete regulatory certainty.
          </p>
        </div>
      </section>

      {/* 2. Purpose & Mandate */}
      <section className="py-14 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              Our Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Demystifying Complex Regulatory Frameworks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Regulatory compliance should not be an impediment to business innovation; it should be the solid foundation that enables sustainable, long-term growth.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              EagleComply was established to bridge the divide between complex statutory directives and practical business execution. We deliver tailored AML/CFT programs, regulatory authorization support, enterprise risk frameworks, and legal compliance advisory designed to protect your institutional reputation and satisfy supervisory scrutiny.
            </p>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> FATF Aligned
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> International Depth
              </span>
              <span className="flex items-center gap-1.5 font-bold">
                <Check className="w-4 h-4 text-emerald-500" /> Risk-Based Methodology
              </span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white space-y-5 shadow-xl">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-200">
              The Eagle Identity
            </div>
            <h3 className="text-xl font-bold text-white">
              Vigilance, Oversight & Integrity
            </h3>
            <p className="text-xs text-blue-100/85 leading-relaxed">
              In financial regulation, the eagle represents vigilant oversight, keen discernment, and the ability to view the broader regulatory landscape.
            </p>
            <p className="text-xs text-blue-100/85 leading-relaxed">
              We help institutions detect compliance risks early, navigate multi-jurisdictional hurdles with clarity, and soar with confidence into new regulated markets.
            </p>
            <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono text-blue-200">
              <span>Brand Ethos</span>
              <span className="font-bold">Authoritative · Practical · Trusted</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="py-14 lg:py-20 bg-surface-subtle border-y border-surface-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              Core Principles
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
              Our Professional Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brandValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all space-y-2.5 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
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

      {/* 4. Leadership & Senior Practitioners (Physical Lanyard ID Badges) */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeamBadges 
          title="Senior Compliance Practitioners" 
          subtitle="Directing multi-jurisdictional AML/CFT, regulatory governance, legal safeguards, and financial compliance advisory" 
        />
      </section>

      {/* 5. Interactive Pipeline Console (Methodology) */}
      <section className="py-16 lg:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
            Interactive Methodology
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-1">
            Execution Pipeline & Delivery Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2">
            Click on any phase to inspect our interactive delivery stages, workflows, and tangible compliance deliverables.
          </p>
        </div>

        <PipelineConsole />
      </section>

      {/* 6. Call to Action */}
      <section className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Ready to Elevate Your Institutional Compliance?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto">
          Contact EagleComply today to schedule a confidential discussion with our senior compliance practitioners.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-2.5 rounded-xl bg-[#091F5C] dark:bg-[#334DAF] text-white text-xs font-bold shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{t.nav.bookConsultation}</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-2.5 rounded-xl glass-panel border border-surface-border text-slate-800 dark:text-white text-xs font-bold hover:bg-surface-subtle transition-all"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
}
