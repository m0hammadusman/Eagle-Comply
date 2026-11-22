import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  Calendar, 
  ArrowRight, 
  Check, 
  Globe2, 
  UserCheck,
  Landmark,
  Layers,
  Activity,
  Target
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { expertDisciplines, ourApproach, jurisdictionCoverage } from '../../data/complianceData';

export default function AboutPage({ params, onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  
  // Section Navigation: 'who-we-are' | 'our-experts' | 'our-approach' | 'jurisdictions'
  const [activeTab, setActiveTab] = useState(params?.section || 'who-we-are');

  useEffect(() => {
    if (params?.section) {
      setActiveTab(params.section);
      const element = document.getElementById(params.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [params]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      
      {/* 1. Hero Header */}
      <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 bg-surface-subtle/70 border-b border-surface-border overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/25 dark:border-[#7096D1]/30 text-[#091F5C] dark:text-[#D0E4FE] text-xs font-mono font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
            <span>ABOUT EAGLECOMPLY</span>
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-4xl mx-auto">
            Compliance, regulation and finance foundations for businesses operating in complex markets.
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto">
            EagleComply is a specialist advisory firm supporting businesses that operate in regulated markets or require stronger compliance, governance, commercial and finance foundations. Our work combines financial crime expertise, regulatory and commercial analysis, and accounting and finance capability in a single multidisciplinary model.
          </p>

          {/* Sub-Navigation Pill Bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'who-we-are', label: 'Who We Are' },
              { id: 'our-experts', label: 'Our Experts' },
              { id: 'our-approach', label: 'Our Approach' },
              { id: 'jurisdictions', label: 'Jurisdictions' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeTab === tab.id
                    ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C] shadow-md'
                    : 'bg-surface-raised border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SUBSECTION 1: WHO WE ARE */}
      <section id="who-we-are" className="py-14 lg:py-20 w-full bg-surface-base dark:bg-[#101E42] border-b border-surface-border dark:border-[#1E3778]/60 scroll-mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            <div className="lg:col-span-7 space-y-5 text-left rtl:text-right">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
                SUBSECTION 01 // OVERVIEW
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                Who We Are
              </h2>
              
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                EagleComply is built around practical specialist expertise. Two members of the team focus on AML/CFT, KYC, banking compliance, sanctions, transaction monitoring and financial crime operations. A regulatory and commercial specialist covers financial services regulation, FinTech, licensing, commercial contracts, negotiation, terms and conditions, governance documentation and digital assets. The accounting and finance practice is led by a UK based Chartered Accountant with expertise in accounting, reporting, payroll, statutory compliance, finance support and internal controls.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                This combination reflects the way regulated businesses actually operate. A licensing project can require an AML/CFT framework, customer documentation, commercial agreements, governance arrangements and financial information. A remediation project can require policy changes, file reviews, operational support and stronger internal controls. EagleComply brings these workstreams together so that the final solution is consistent across the business.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Our work is proportionate to the size, complexity and risk profile of the organisation. We focus on clear analysis, usable documentation, defined responsibilities and controls that management and operational teams can apply in practice.
              </p>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Proportionate to Size & Risk
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Usable Operational Documentation
                </span>
                <span className="flex items-center gap-1.5 font-bold">
                  <Check className="w-4 h-4 text-emerald-500" /> Coordinated Multidisciplinary Team
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white space-y-4 shadow-xl text-left rtl:text-right border border-[#1E3778]">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-200">
                OUR TARGET ORGANISATIONS
              </span>
              <h3 className="text-xl font-bold text-white">
                Who We Work With
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                We work with financial institutions, FinTech and payment businesses, remittance providers, digital asset businesses, lenders, professional services firms and other regulated organisations.
              </p>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Our services cover both advisory and operational needs, from framework design and licensing preparation to customer due diligence, remediation, contract negotiation, reporting and ongoing support.
              </p>
              <div className="pt-4 border-t border-white/20">
                <button
                  onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
                  className="w-full py-2.5 rounded-xl bg-white text-[#091F5C] hover:bg-blue-50 font-bold text-xs transition-all text-center cursor-pointer shadow-md"
                >
                  Book a Consultation
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SUBSECTION 2: OUR EXPERTS */}
      <section id="our-experts" className="py-14 lg:py-20 w-full bg-[#F4F7FC] dark:bg-[#0B142B] border-b border-surface-border dark:border-[#1E3778]/60 scroll-mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              SUBSECTION 02 // MULTIDISCIPLINARY CAPABILITY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Experts
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              EagleComply brings together four distinct specialist disciplines into a single synchronized advisory practice, addressing complex compliance, legal, commercial and finance challenges through one coordinated team.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {expertDisciplines.map((expert) => (
              <div 
                key={expert.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101E42] border border-[#D0E4FE] dark:border-[#1E3778] hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all shadow-md space-y-4 text-left rtl:text-right"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/20 dark:border-[#7096D1]/30">
                    {expert.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                    {expert.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {expert.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {expert.desc}
                </p>

                <div className="pt-3 border-t border-[#D0E4FE]/70 dark:border-[#1E3778]/70 text-xs text-[#334DAF] dark:text-[#7096D1] font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Integrated Cross-Disciplinary Engagement Lead</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('team')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>Meet the Leadership Team & Senior Directors</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. SUBSECTION 3: OUR APPROACH */}
      <section id="our-approach" className="py-14 lg:py-20 w-full bg-surface-base dark:bg-[#101E42] border-b border-surface-border dark:border-[#1E3778]/60 scroll-mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              SUBSECTION 03 // METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Our Approach
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our engagements follow a structured six-step methodology that moves from foundational business diagnostic to tailored design, frontline implementation, operational support, and ongoing review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ourApproach.map((step) => (
              <div 
                key={step.step}
                className="p-6 rounded-2xl bg-white dark:bg-[#152754] border border-[#D0E4FE] dark:border-[#223E84] flex flex-col justify-between space-y-4 text-left rtl:text-right shadow-sm hover:shadow-md transition-all"
              >
                <div className="space-y-2">
                  <span className="text-2xl font-mono font-bold text-[#334DAF] dark:text-[#7096D1]">
                    {step.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-2 border-t border-[#D0E4FE]/70 dark:border-[#223E84]/70 text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Phase {step.step} Milestone
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUBSECTION 4: JURISDICTIONS */}
      <section id="jurisdictions" className="py-14 lg:py-20 w-full bg-[#F4F7FC] dark:bg-[#0B142B] border-b border-surface-border dark:border-[#1E3778]/60 scroll-mt-20 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              SUBSECTION 04 // CROSS-BORDER COVERAGE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              Jurisdictions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              EagleComply supports businesses across the European Union, Gulf Cooperation Council markets, Pakistan, Australia and the United States. Cross border work is scoped around the activity, customer base, regulatory perimeter and professional requirements of the relevant jurisdiction.
            </p>
          </div>

          <div className="space-y-6">
            {jurisdictionCoverage.map((j) => (
              <div 
                key={j.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#101E42] border border-[#D0E4FE] dark:border-[#1E3778] space-y-3 text-left rtl:text-right shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D0E4FE]/70 dark:border-[#1E3778]/70">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{j.flag}</span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {j.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] font-semibold">
                    {j.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {j.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Bottom Consultation CTA */}
      <section className="py-16 sm:py-20 w-full bg-gradient-to-br from-[#091F5C] via-[#102468] to-[#1E3778] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase border border-white/20">
            <Calendar className="w-3.5 h-3.5 text-blue-300" />
            <span>START WITH THE BUSINESS MODEL, JURISDICTION AND OUTCOME</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            Ready to Scope Your Compliance, Legal or Finance Requirement?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
            Start with the business model, jurisdiction and outcome you need to achieve. An initial consultation is used to understand the issue, identify the relevant workstream and define the scope of specialist support required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl bg-white text-[#091F5C] hover:bg-slate-100 font-bold text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-[#334DAF]" />
              <span>Book a Consultation</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-xs transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Contact Our Practice</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
