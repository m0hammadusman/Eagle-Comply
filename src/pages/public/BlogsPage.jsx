import React, { useState, useMemo } from 'react';
import { BookOpen, Search, ArrowRight, Clock, Calendar, User, Tag, Sparkles, Database, CheckCircle2 } from 'lucide-react';
import { useBlogPosts } from '../../hooks/useContentful';
import { useLanguage } from '../../context/LanguageContext';

export default function BlogsPage({ onNavigate }) {
  const { t } = useLanguage();
  const bp = t.blogsPage || {};
  const { posts, loading, isContentfulConfigured } = useBlogPosts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(['All']);
    posts.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [posts]);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        post.title.toLowerCase().includes(q) || 
        post.excerpt.toLowerCase().includes(q) ||
        post.author?.name?.toLowerCase().includes(q) ||
        (post.tags && post.tags.some(t => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return filteredPosts.find(p => p.featured) || filteredPosts[0];
  }, [filteredPosts]);

  const gridPosts = useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter(p => p.id !== featuredPost.id);
  }, [filteredPosts, featuredPost]);

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20 space-y-12 animate-fade-in text-left rtl:text-right">
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{bp.tag || 'EAGLECOMPLY EDITORIAL & BLOGS'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white dark:text-white">
          {bp.title || 'Compliance Insights & Practice Blogs'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {bp.subtitle || 'In-depth commentary, technical blueprints, and regulatory analysis from resident directors and advisors.'}
        </p>

        {/* Contentful Connection Pill */}
        <div className="flex items-center justify-center gap-2 pt-1 text-[11px] font-mono text-[#7D797A]">
          <span className={`w-2 h-2 rounded-full ${isContentfulConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-blue-500'}`} />
          <span>{isContentfulConfigured ? 'Live Contentful CMS Active' : 'Headless CMS Managed'}</span>
        </div>
      </div>

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
                    ? 'bg-[#E31F1F] text-white shadow-sm dark:bg-[#FF3333] dark:text-[#E31F1F]'
                    : 'bg-surface-base text-slate-600 dark:text-slate-300 hover:text-[#E31F1F] border border-surface-border'
                }`}
              >
                {cat === 'All' ? (bp.allCategories || 'All') : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 text-[#7D797A]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={bp.searchPlaceholder || "Search blogs, topics, authors…"}
              className="w-full pl-9 pr-4 rtl:pl-4 rtl:pr-9 py-1.5 rounded-xl bg-surface-base border border-surface-border text-xs text-black dark:text-white dark:text-white outline-none focus:border-[#E31F1F]"
            />
          </div>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 rounded-3xl bg-surface-subtle border border-surface-border animate-pulse" />
          ))}
        </div>
      )}

      {/* Main Content */}
      {!loading && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Featured Hero Article */}
          {featuredPost && (
            <div 
              onClick={() => onNavigate('article-detail', { id: featuredPost.slug || featuredPost.id })}
              className="group relative rounded-3xl bg-surface-raised border border-surface-border shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-0 text-left rtl:text-right"
            >
              <div className="lg:col-span-5 h-52 sm:h-64 lg:h-full min-h-[220px] max-h-[300px] lg:max-h-none relative overflow-hidden bg-slate-950">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-sm">
                    {bp.featuredTag || 'Featured Analysis'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold uppercase bg-[#E31F1F]/10 dark:bg-[#FF3333]/20 text-[#E31F1F] dark:text-[#FF3333]">
                      {featuredPost.category}
                    </span>
                    <span className="text-[11px] font-mono text-[#7D797A] flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="font-sans tracking-tight text-lg sm:text-xl md:text-2xl font-bold text-black dark:text-white dark:text-white group-hover:text-[#E31F1F] dark:group-hover:text-[#FF3333] transition-colors leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-surface-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {featuredPost.author?.avatar && (
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-8 h-8 rounded-full object-cover object-top border border-surface-border shrink-0"
                      />
                    )}
                    <div>
                      <div className="text-xs font-bold text-black dark:text-white dark:text-white">
                        {featuredPost.author?.name || 'EagleComply Advisor'}
                      </div>
                      <div className="text-[10px] text-[#7D797A] font-mono">
                        {featuredPost.publishDate}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    {bp.readArticle || 'Read Article'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Subsequent Articles Grid */}
          {gridPosts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map(post => (
                <div
                  key={post.id}
                  onClick={() => onNavigate('article-detail', { id: post.slug || post.id })}
                  className="group rounded-3xl bg-surface-raised border border-surface-border shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between h-full text-left rtl:text-right"
                >
                  <div className="relative h-40 sm:h-44 w-full overflow-hidden bg-slate-950 shrink-0">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold uppercase bg-black/60 backdrop-blur-sm text-white border border-white/20">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-mono text-[#7D797A]">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.publishDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-sans text-sm sm:text-base font-bold text-black dark:text-white dark:text-white group-hover:text-[#E31F1F] dark:group-hover:text-[#FF3333] transition-colors leading-snug line-clamp-2 min-h-[2.5rem]">
                        {post.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 min-h-[2rem]">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-surface-border flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        {post.author?.avatar && (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-6 h-6 rounded-full object-cover object-top border border-surface-border shrink-0"
                          />
                        )}
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[120px]">
                          {post.author?.name}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {bp.read || 'Read'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredPosts.length === 0 && (
            <div className="p-12 rounded-3xl glass-panel border border-surface-border text-center space-y-3">
              <Search className="w-8 h-8 text-[#7D797A] mx-auto" />
              <h3 className="text-base font-bold text-black dark:text-white dark:text-white">{bp.noPosts || 'No blog posts found'}</h3>
              <p className="text-xs text-[#7D797A] max-w-sm mx-auto">
                {bp.noPostsDesc || 'No articles matched your filter. Try clearing your search query.'}
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="px-4 py-2 rounded-xl bg-[#E31F1F] text-white text-xs font-bold hover:bg-[#B42318] transition-colors cursor-pointer"
              >
                {bp.resetFilters || 'Reset Filters'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
