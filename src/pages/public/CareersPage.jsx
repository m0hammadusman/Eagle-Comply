import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Send 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function CareersPage({ onNavigate, onOpenConsultation }) {
  const { t, careers } = useLanguage();

  return (
    <div className="w-full py-12 sm:py-10 lg:py-16 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.careersPage?.tag || 'Join The Practice'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {t.careersPage?.title || 'Shape the Future of Regulatory Law'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.careersPage?.subtitle || 'We are hiring senior AI governance auditors, DORA resilience architects, and cross-border financial regulatory counsel in London, Brussels, New York, and Dubai.'}
        </p>
      </div>

      {/* Careers Openings */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl font-bold text-black dark:text-white dark:text-white">
          {t.careersPage?.openings || 'Current Practice Openings'}
        </h2>

        <div className="space-y-4">
          {(careers || []).map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:border-[#E31F1F] transition-all"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333]">
                    {c.department}
                  </span>
                  <span className="text-xs font-mono text-[#7D797A] dark:text-[#7D797A]">
                    {c.type}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white dark:text-white">{c.title}</h3>
                <p className="text-xs text-slate-600 dark:text-[#7D797A] max-w-2xl leading-relaxed">
                  {c.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-[#7D797A] pt-1">
                  <MapPin className="w-3.5 h-3.5 text-[#E31F1F]" />
                  <span>{c.location}</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#E31F1F] to-[#E31F1F] dark:from-[#E31F1F] dark:to-[#FF3333] text-white dark:text-[#030303] font-bold text-xs shadow-md hover:scale-105 transition-all shrink-0 flex items-center justify-center gap-2"
              >
                <span>{t.careersPage?.apply || 'Apply for Role'}</span>
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
