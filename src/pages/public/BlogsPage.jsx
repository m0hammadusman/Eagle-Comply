import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function BlogsPage({ onNavigate }) {
  const { t } = useLanguage();

  return (
    <div className="w-full py-16 lg:py-24 space-y-12 animate-fade-in">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY BLOGS</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">
          Compliance Insights & Practice Blogs
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
          Expert commentary, practitioner analyses, and regulatory guidance from EagleComply directors.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-12 rounded-3xl glass-panel border border-surface-border text-center space-y-3">
          <Sparkles className="w-8 h-8 text-[#334DAF] dark:text-[#7096D1] mx-auto animate-pulse" />
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Articles Coming Soon</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Our editorial board is preparing practical compliance guides, AML typologies, and supervisory reviews.
          </p>
        </div>
      </div>
    </div>
  );
}
