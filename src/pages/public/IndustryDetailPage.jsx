import React from 'react';
import { ShieldCheck, ArrowRight, Calendar, Calculator, Landmark, Building, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function IndustryDetailPage({ params, onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, industries, regulations, solutions, caseStudies, detailCommon } = useLanguage();
  const industry = (industries || []).find(i => i.id === params?.id) || industries[0] || {};
  const relatedRegs = (regulations || []).filter(r => industry.regulations?.includes(r.id));
  const relatedSols = (solutions || []).filter(s => s.relatedIndustries?.includes(industry.id));
  const caseStudy = (caseStudies || []).find(cs => cs.id === industry.caseStudyId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs 
        items={[
          { label: t.nav?.industries || 'Industries', route: 'industries' },
          { label: industry.name }
        ]} 
        onNavigate={onNavigate} 
      />

      <div className="py-8 border-b border-surface-border mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#E31F1F] dark:text-[#FF3333]">
          {industry.heroTag}
        </span>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white mt-2">
          {industry.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-[#7D797A] mt-4 max-w-4xl leading-relaxed">
          {industry.overview}
        </p>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E31F1F] to-[#E31F1F] dark:from-[#E31F1F] dark:to-[#FF3333] text-white dark:text-[#030303] font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{detailCommon?.bookConsultation || 'Book Partner Consultation'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
              {detailCommon?.challenges || 'Primary Regulatory Challenges'}
            </h2>
            <div className="space-y-3">
              {(industry.challenges || []).map((ch, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/20 text-[#E31F1F] dark:text-[#FF3333] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                    {i + 1}
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{ch}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black dark:text-white dark:text-white">
              {detailCommon?.scope || 'Applicable Solutions'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedSols.map((s) => (
                <div 
                  key={s.id} 
                  onClick={() => onNavigate('solution-detail', { id: s.id })}
                  className="p-4 rounded-2xl glass-panel border border-surface-border hover:border-[#E31F1F] cursor-pointer flex flex-col justify-between"
                >
                  <h3 className="text-sm font-bold text-black dark:text-white dark:text-white">{s.name}</h3>
                  <span className="text-xs text-[#E31F1F] dark:text-[#FF3333] mt-2 font-semibold flex items-center gap-1">
                    {t.common?.explore || 'Explore'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#FF3333]">
              {detailCommon?.relatedRegulations || 'Primary Statutory Frameworks'}
            </span>
            <div className="space-y-2">
              {relatedRegs.map((r) => (
                <div 
                  key={r.id}
                  onClick={() => onNavigate('regulation-detail', { id: r.id })}
                  className="p-3 rounded-xl bg-surface-subtle border border-surface-border hover:border-[#E31F1F] cursor-pointer flex items-center justify-between transition-all"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{r.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E31F1F] dark:text-[#FF3333] rtl:rotate-180" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
