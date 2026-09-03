import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Calculator, 
  ShieldCheck, 
  FileText, 
  Users, 
  Globe2, 
  Building,
  Lock,
  ArrowLeft
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function SolutionDetailPage({ params, onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, solutions, experts, regulations, industries, detailCommon } = useLanguage();
  
  const solution = (solutions || []).find(s => s.id === params?.id) || solutions[0] || {};
  const leadExpert = (experts || []).find(e => e.id === solution.leadExpert) || experts[0] || {};

  const relatedRegs = (regulations || []).filter(r => solution.relatedRegulations?.includes(r.id));
  const relatedInds = (industries || []).filter(i => solution.relatedIndustries?.includes(i.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs 
        items={[
          { label: t.nav?.solutions || 'Solutions', route: 'solutions' },
          { label: solution.name }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Header */}
      <div className="py-8 border-b border-surface-border mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#DD2A40] dark:text-[#FF3333]">
            {solution.category}
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#DD2A40]/10 dark:bg-[#FF3333]/15 text-[#DD2A40] dark:text-[#FF3333] border border-[#DD2A40]/30 dark:border-[#FF3333]/40">
            {solution.badge}
          </span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {solution.name}
        </h1>
        <p className="text-lg text-[#DD2A40] dark:text-[#FF3333] font-sans tracking-tight italic mt-2">
          "{solution.valueProp}"
        </p>
        <p className="text-sm sm:text-base text-slate-600 dark:text-[#667085] mt-4 max-w-4xl leading-relaxed">
          {solution.shortDesc}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#DD2A40] to-[#DD2A40] dark:from-[#DD2A40] dark:to-[#FF3333] text-white dark:text-[#000000] font-bold text-xs shadow-lg hover:shadow-[#DD2A40]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{detailCommon?.bookConsultation || 'Book Partner Consultation'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Scope & Methodology */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Challenges Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
              {detailCommon?.challenges || 'Primary Regulatory Challenges'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(solution.challenges || []).map((ch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#DD2A40]/10 dark:bg-[#FF3333]/20 text-[#DD2A40] dark:text-[#FF3333] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                    {i + 1}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{ch}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
              {detailCommon?.deliverables || 'Core Institutional Deliverables'}
            </h2>
            <div className="space-y-3">
              {(solution.deliverables || []).map((del, i) => (
                <div key={i} className="p-4 rounded-2xl glass-panel border border-surface-border flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Process / Steps */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
              {detailCommon?.methodology || 'Implementation Methodology'}
            </h2>
            <div className="space-y-4">
              {(solution.process || []).map((step) => (
                <div key={step.step} className="p-5 rounded-2xl glass-panel border border-surface-border flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-[#DD2A40] dark:bg-[#FF3333] text-white dark:text-[#000000] font-bold font-mono text-sm flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-black dark:text-white dark:text-white">{step.title}</h3>
                    <p className="text-xs text-slate-600 dark:text-[#667085] mt-1 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Lead Partner & Related Frameworks */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Lead Partner Card */}
          <div className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DD2A40] dark:text-[#FF3333]">
              {detailCommon?.leadExpert || 'Lead Practice Partner'}
            </span>
            <div className="flex items-center gap-4">
              <img 
                src={`${import.meta.env.BASE_URL}${(leadExpert.photo || '').replace(/^\/+/, '')}`} 
                alt={leadExpert.name}
                className="w-14 h-14 rounded-2xl object-cover object-top border-2 border-[#DD2A40]/20 dark:border-[#FF3333]/20 bg-surface-subtle"
              />
              <div>
                <h4 className="text-base font-bold text-black dark:text-white dark:text-white">{leadExpert.name}</h4>
                <p className="text-xs text-[#DD2A40] dark:text-[#FF3333]">{leadExpert.title}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#667085] leading-relaxed">
              {leadExpert.bio}
            </p>
          </div>

          {/* Related Regulations */}
          <div className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DD2A40] dark:text-[#FF3333]">
              {detailCommon?.relatedRegulations || 'Primary Statutory Frameworks'}
            </span>
            <div className="space-y-2">
              {relatedRegs.map((r) => (
                <div 
                  key={r.id}
                  onClick={() => onNavigate('regulation-detail', { id: r.id })}
                  className="p-3 rounded-xl bg-surface-subtle border border-surface-border hover:border-[#DD2A40] cursor-pointer flex items-center justify-between transition-all"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#DD2A40] dark:text-[#FF3333] rtl:rotate-180" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
