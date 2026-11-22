import React from 'react';
import { 
  Building2, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  Globe2, 
  Check,
  ShieldCheck,
  Landmark,
  Zap,
  Coins,
  CreditCard,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { industries as officialIndustries } from '../../data/complianceData';

export default function IndustryDetailPage({ params, onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  const rawId = params?.id || 'fintech-payments';

  // Handle aliases
  const aliasMap = {
    'banking': 'banks-financial-institutions',
    'fintech': 'fintech-payments',
    'payments': 'fintech-payments',
    'remittance-msb': 'remittance-money-services',
    'digital-assets': 'digital-assets-crypto',
    'financial-services': 'banks-financial-institutions',
    'startups': 'professional-services'
  };

  const resolvedId = aliasMap[rawId] || rawId;
  const industry = officialIndustries.find(i => i.id === resolvedId) || officialIndustries[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Breadcrumbs 
        items={[
          { label: 'Industries', route: 'industries' },
          { label: industry.name }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Header */}
      <div className="py-8 border-b border-surface-border mb-12 text-left rtl:text-right">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
            {industry.heroTag}
          </span>
          <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/30">
            {industry.badge}
          </span>
        </div>

        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white max-w-4xl">
          {industry.name}
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-4 max-w-4xl leading-relaxed whitespace-pre-line font-normal">
          {industry.overview || industry.desc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Scope Sector Engagement</span>
          </button>
          <button
            onClick={() => onNavigate('solutions')}
            className="px-6 py-3 rounded-xl border border-surface-border text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-surface-subtle transition-all cursor-pointer"
          >
            Explore Applicable Practice Offerings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Sector Deliverables and Challenges */}
        <div className="lg:col-span-8 space-y-10 text-left rtl:text-right">
          
          {/* Detailed Deliverables List from DOCX */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Tailored Sector Services & Deliverables
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(industry.deliverables || []).map((del, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-surface-raised border border-surface-border flex items-start gap-3 shadow-xs">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium">
                    {del}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Challenges */}
          {industry.challenges && (
            <div className="space-y-4 pt-4 border-t border-surface-border">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sector Regulatory Realities & Challenges
              </h2>
              <div className="space-y-3">
                {industry.challenges.map((ch, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {ch}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Quick Contact & Consultation */}
        <div className="lg:col-span-4 space-y-6 text-left rtl:text-right">
          
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white shadow-xl space-y-4">
            <h3 className="text-lg font-bold">
              Consult on {industry.name}
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Start with the business model, jurisdiction and outcome you need to achieve. An initial consultation is used to understand the issue, identify the relevant workstream and define the scope of specialist support required.
            </p>
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="w-full py-3 rounded-xl bg-white text-[#091F5C] hover:bg-slate-100 font-bold text-xs shadow-md transition-all cursor-pointer text-center"
            >
              Book a Consultation
            </button>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-surface-border bg-surface-raised space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
              Multidisciplinary Support
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Engagements can focus on a defined control, a customer portfolio, an investigation backlog, a remediation programme or a broader financial crime workstream. Work is structured to fit the institution’s existing policies, systems, lines of defence and decision authorities.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
