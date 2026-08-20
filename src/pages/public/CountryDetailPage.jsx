import React from 'react';
import { Shield, Building2, MapPin, ArrowRight, Calendar, Calculator, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function CountryDetailPage({ params, onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, countries, regulations, solutions, detailCommon } = useLanguage();
  const country = (countries || []).find(c => c.id === params?.id) || countries[0] || {};
  const relatedRegs = (regulations || []).filter(r => country.coreRegulations?.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs 
        items={[
          { label: t.nav?.globalCompliance || 'Global Compliance', route: 'global-compliance' },
          { label: country.name }
        ]} 
        onNavigate={onNavigate} 
      />

      <div className="py-8 border-b border-surface-border mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{country.flag}</span>
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
                {country.region}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {country.status || 'Active Full Jurisdiction'}
              </span>
            </div>
            <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mt-1">
              {country.name}
            </h1>
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed mt-4">
          {country.overview}
        </p>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {detailCommon?.regulators || 'Competent Supervisory Authorities'}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {(country.regulators || []).map((r, i) => (
                <div key={i} className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-center">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
              {detailCommon?.residentDesk || 'Resident Regional Desk'}
            </span>
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-[#334DAF] dark:text-[#7096D1]" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">{country.office}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
