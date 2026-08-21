import React from 'react';
import { Shield, AlertTriangle, CheckCircle2, ArrowRight, Calendar, Calculator, User, FileText } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function RegulationDetailPage({ params, onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, regulations, solutions, detailCommon } = useLanguage();
  const reg = (regulations || []).find(r => r.id === params?.id) || regulations[0] || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs 
        items={[
          { label: t.nav?.solutions || 'Regulations', route: 'regulations' },
          { label: reg.name }
        ]} 
        onNavigate={onNavigate} 
      />

      <div className="py-8 border-b border-surface-border mb-12">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono font-bold text-blue-400">
            {reg.jurisdiction}
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/30 dark:border-[#7096D1]/40">
            {reg.status}
          </span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {reg.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed mt-4">
          {reg.shortDesc}
        </p>

        <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border max-w-xl mt-6 space-y-1">
          <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{detailCommon?.penalties || 'Maximum Statutory Penalties'}</span>
          </div>
          <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 font-mono">
            {reg.penalties}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={onOpenConsultation}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>{detailCommon?.bookConsultation || 'Book Partner Consultation'}</span>
          </button>
          <button
            onClick={onOpenQuote}
            className="px-6 py-3 rounded-xl glass-panel border border-surface-border text-slate-900 dark:text-white font-semibold text-xs flex items-center gap-2"
          >
            <Calculator className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <span>{detailCommon?.requestQuote || 'Request SOW Estimate'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
