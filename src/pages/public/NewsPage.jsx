import React, { useState, useMemo } from 'react';
import { Newspaper, Search, ArrowRight, Clock, Calendar, Globe, AlertCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { useNewsArticles } from '../../hooks/useContentful';
import { useLanguage } from '../../context/LanguageContext';

export default function NewsPage({ onNavigate }) {
  const { t } = useLanguage();
  const np = t.newsPage || {};
  const { articles, loading, isContentfulConfigured } = useNewsArticles();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    articles.forEach(a => {
      if (a.category) cats.add(a.category);
    });
    return Array.from(cats);
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        article.title.toLowerCase().includes(q) || 
        article.excerpt.toLowerCase().includes(q) ||
        (article.tags && article.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  const breakingNews = useMemo(() => {
    return articles.find(a => a.breaking) || articles[0];
  }, [articles]);

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 space-y-12 animate-fade-in text-left rtl:text-right">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DD2A40]/10 dark:bg-[#FF3333]/15 text-[#DD2A40] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#DD2A40]/20 dark:border-[#FF3333]/30">
          <Newspaper className="w-3.5 h-3.5" />
          <span>{np.tag || 'EAGLECOMPLY REGULATORY NEWSROOM'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white dark:text-white">
          {np.title || 'Regulatory News & Supervisory Updates'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {np.subtitle || 'Real-time tracking of statutory deadlines, regulatory enforcement actions, and international financial crime intelligence.'}
        </p>

        {/* Contentful Connection Pill */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-[#667085]">
          <span className={`w-2 h-2 rounded-full ${isContentfulConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
          <span>{isContentfulConfigured ? 'Live Contentful CMS Active' : 'Headless CMS Managed'}</span>
        </div>
      </div>

      {/* Breaking News Banner (if available) */}
      {breakingNews && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            onClick={() => onNavigate('article-detail', { id: breakingNews.slug || breakingNews.id })}
            className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:border-amber-500/60 transition-all shadow-sm text-left rtl:text-right"
          >
            <div className="flex items-start sm:items-center gap-3">
              <span className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-mono font-black uppercase tracking-wider shrink-0 flex items-center gap-1.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping inline-block" />
                {np.dispatchTag || 'SUPERVISORY DISPATCH'}
              </span>
              <p className="text-xs sm:text-sm font-bold text-black dark:text-white dark:text-white leading-snug line-clamp-1">
                {breakingNews.title}
              </p>
            </div>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400 whitespace-nowrap flex items-center gap-1 shrink-0">
              {np.readDispatch || 'Read Dispatch'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </span>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface-subtle p-3 rounded-2xl border border-surface-border">
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#DD2A40] text-white shadow-sm dark:bg-[#FF3333] dark:text-[#DD2A40]'
                    : 'bg-surface-base text-slate-600 dark:text-slate-300 hover:text-[#DD2A40] border border-surface-border'
                }`}
              >
                {cat === 'All' ? (np.allCategories || 'All') : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-[#667085]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={np.searchPlaceholder || "Search news, regulations, authorities…"}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-1.5 rounded-xl bg-surface-base border border-surface-border text-xs text-black dark:text-white dark:text-white outline-none focus:border-[#DD2A40]"
            />
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-28 rounded-2xl bg-surface-subtle border border-surface-border animate-pulse" />
          ))}
        </div>
      )}

      {/* News Feed */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => onNavigate('article-detail', { id: article.slug || article.id })}
              className="group p-5 sm:p-6 rounded-3xl bg-surface-raised border border-surface-border shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left rtl:text-right"
            >
              <div className="flex-1 space-y-2.5">
                <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#DD2A40]/10 dark:bg-[#FF3333]/20 text-[#DD2A40] dark:text-[#FF3333] font-bold">
                    {article.category}
                  </span>
                  <span className="text-[#667085] flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {article.publishDate}
                  </span>
                  <span className="text-[#667085] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {article.readTime}
                  </span>
                </div>

                <h3 className="font-sans text-base sm:text-lg font-bold text-black dark:text-white dark:text-white group-hover:text-[#DD2A40] dark:group-hover:text-[#FF3333] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                  {article.excerpt}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {article.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle border border-surface-border text-[#667085]">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-surface-border">
                {article.coverImage && (
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-slate-950 border border-surface-border shrink-0 hidden sm:block">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-3 rounded-2xl bg-surface-subtle group-hover:bg-[#DD2A40] group-hover:text-white text-[#DD2A40] dark:text-[#FF3333] transition-colors">
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredArticles.length === 0 && (
            <div className="p-12 rounded-3xl glass-panel border border-surface-border text-center space-y-3">
              <Search className="w-8 h-8 text-[#667085] mx-auto" />
              <h3 className="text-base font-bold text-black dark:text-white dark:text-white">{np.noArticles || 'No regulatory updates found'}</h3>
              <p className="text-xs text-[#667085] max-w-sm mx-auto">
                {np.noArticlesDesc || 'No articles matched your filter. Try clearing your search query.'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-[#DD2A40] text-white text-xs font-bold hover:bg-[#BA1B30] transition-colors cursor-pointer"
              >
                {np.resetFilters || 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
