import React from 'react';
import { Newspaper, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function NewsPage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 lg:py-24 space-y-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Newspaper className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY NEWSROOM</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Regulatory News & Supervisory Updates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Stay informed on international supervisory developments, statutory enforcement actions, and firm announcements.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-12 rounded-3xl glass-panel border border-surface-border text-center space-y-3">
          <Sparkles className="w-8 h-8 text-[#334DAF] dark:text-[#7096D1] mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Latest Regulatory Dispatches Pending</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Real-time regulatory tracking and institutional news updates will appear here shortly.
          </p>
        </div>
      </div>
    </div>
  );
}
