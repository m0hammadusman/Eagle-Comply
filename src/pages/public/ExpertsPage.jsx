import React from 'react';
import { 
  Users, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ExpertsPage({ onNavigate, onOpenConsultation }) {
  const { t, experts } = useLanguage();

  return (
    <div className="w-full py-12 sm:py-10 lg:py-16 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Users className="w-3.5 h-3.5" />
          <span>{t.expertsPage?.tag || 'Senior Practice Faculty'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {t.expertsPage?.title || 'Senior Practice Partners'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.expertsPage?.subtitle || 'Former supervisory regulators, ISO technical committee members, and leading compliance counsel providing direct executive advisory.'}
        </p>
      </div>

      {/* Experts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(experts || []).map((exp) => (
            <div
              key={exp.id}
              className="p-8 rounded-3xl glass-panel border border-surface-border shadow-lg space-y-6 flex flex-col justify-between hover:border-[#334DAF] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={exp.photo} 
                    alt={exp.name}
                    className="w-16 h-16 rounded-2xl object-cover object-top shadow-md border-2 border-[#334DAF]/20 dark:border-[#7096D1]/20 bg-surface-subtle"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">{exp.name}</h3>
                    <p className="text-xs text-[#334DAF] dark:text-[#7096D1] font-semibold">{exp.title}</p>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {exp.bio}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" /> Partner Lead
                </span>
                <button
                  onClick={onOpenConsultation}
                  className="px-4 py-2 rounded-xl bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] text-xs font-bold shadow-md hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.expertsPage?.book || 'Book Session'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
