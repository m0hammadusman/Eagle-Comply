import React from 'react';
import { FileText, Clock, User, Calendar, ArrowLeft, Share2, Bookmark } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function ArticleDetailPage({ params, onNavigate }) {
  const { t, insights, detailCommon } = useLanguage();
  const article = (insights || []).find(i => i.id === params?.id) || insights[0] || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs 
        items={[
          { label: t.nav?.knowledge || 'Insights', route: 'insights' },
          { label: article.title }
        ]} 
        onNavigate={onNavigate} 
      />

      <div className="py-8 space-y-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1]">
            {article.category}
          </span>
          <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>

        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex items-center gap-3 py-3 border-y border-surface-border text-sm text-slate-600 dark:text-slate-400">
          <User className="w-4 h-4 text-[#334DAF]" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">{article.authorName}</span>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none pt-4 text-base leading-relaxed space-y-4">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
            {article.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
}
