import React from 'react';
import { 
  FileText, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  User 
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function InsightsPage({ onNavigate }) {
  const { t, insights } = useLanguage();

  return (
    <div className="w-full py-12 sm:py-10 lg:py-16 space-y-16 animate-fade-in">
      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{t.insightsPage?.tag || 'Executive Legal Analysis'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {t.insightsPage?.title || 'Regulatory Insights & Editorial Analysis'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.insightsPage?.subtitle || 'Critical commentary and practical implementation guidance on emerging global regulations, supervisory enforcement patterns, and compliance architecture.'}
        </p>
      </div>

      {/* Insights Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(insights || []).map((ins) => (
            <div
              key={ins.id}
              onClick={() => onNavigate('article-detail', { id: ins.id })}
              className="p-8 rounded-3xl glass-panel border border-surface-border shadow-lg space-y-4 flex flex-col justify-between hover:border-[#E31F1F] cursor-pointer transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#E31F1F] dark:text-[#FF3333]">
                    {ins.category}
                  </span>
                  <span className="text-xs font-mono text-[#7D797A] dark:text-[#7D797A] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {ins.readTime}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-black dark:text-white dark:text-white leading-snug hover:text-[#E31F1F] transition-colors">
                  {ins.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {ins.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#E31F1F]" /> {ins.authorName}
                </span>
                <span className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] flex items-center gap-1">
                  {t.insightsPage?.read || 'Read Article'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
