import React, { useState, useEffect } from 'react';
import { Search, X, Shield, BookOpen, Globe2, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SearchModal({ isOpen, onClose, onNavigate }) {
  const { t, solutions, regulations, countries, insights, resources } = useLanguage();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const results = {
    solutions: (solutions || []).filter(s => !q || s.name?.toLowerCase().includes(q) || s.shortDesc?.toLowerCase().includes(q)),
    regulations: (regulations || []).filter(r => !q || r.name?.toLowerCase().includes(r) || r.shortDesc?.toLowerCase().includes(q)),
    countries: (countries || []).filter(c => !q || c.name?.toLowerCase().includes(q) || c.overview?.toLowerCase().includes(q)),
    insights: (insights || []).filter(i => !q || i.title?.toLowerCase().includes(q) || i.excerpt?.toLowerCase().includes(q)),
    resources: (resources || []).filter(res => !q || res.title?.toLowerCase().includes(q) || res.description?.toLowerCase().includes(q))
  };

  const totalResults = (
    (filter === 'all' || filter === 'solutions' ? results.solutions.length : 0) +
    (filter === 'all' || filter === 'regulations' ? results.regulations.length : 0) +
    (filter === 'all' || filter === 'countries' ? results.countries.length : 0) +
    (filter === 'all' || filter === 'insights' ? results.insights.length : 0) +
    (filter === 'all' || filter === 'resources' ? results.resources.length : 0)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/60 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-3xl bg-surface-raised border border-surface-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-surface-border flex items-center gap-3 bg-surface-subtle">
          <Search className="w-5 h-5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
          <input
            type="text"
            placeholder={t.searchPlaceholder || "Search regulatory directives, practice areas, jurisdictions..."}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder-slate-400 text-sm sm:text-base"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs font-mono text-slate-400 hover:text-slate-200 px-2 py-1 bg-surface-base rounded"
            >
              Clear
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 p-3 border-b border-surface-border bg-surface-base/50 overflow-x-auto text-xs font-mono">
          <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0">Filter:</span>
          {['all', 'solutions', 'regulations', 'countries', 'insights', 'resources'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-2.5 py-1 rounded-lg capitalize transition-all shrink-0 ${
                filter === f 
                  ? 'bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-surface-subtle'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto text-[11px] text-slate-500 font-bold shrink-0">
            {totalResults} Results
          </span>
        </div>

        {/* Results Scroll Area */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {totalResults === 0 ? (
            <div className="text-center py-12 text-slate-500 space-y-2">
              <p className="text-sm">No regulatory matches found for "{query}"</p>
              <p className="text-xs font-mono text-slate-400">Try searching for "DORA", "AI Act", "VARA", or "GDPR"</p>
            </div>
          ) : (
            <>
              {/* Solutions */}
              {(filter === 'all' || filter === 'solutions') && results.solutions.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> Solutions & Practice Areas ({results.solutions.length})
                  </div>
                  <div className="grid gap-2">
                    {results.solutions.map(s => (
                      <div
                        key={s.id}
                        onClick={() => {
                          onNavigate('solution-detail', { id: s.id });
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-base border border-surface-border cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1]">
                            {s.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                            {s.shortDesc}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] shrink-0 ml-4 rtl:rotate-180" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Regulations */}
              {(filter === 'all' || filter === 'regulations') && results.regulations.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" /> Statutory Regulations ({results.regulations.length})
                  </div>
                  <div className="grid gap-2">
                    {results.regulations.map(r => (
                      <div
                        key={r.id}
                        onClick={() => {
                          onNavigate('regulation-detail', { id: r.id });
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-base border border-surface-border cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1]">
                            {r.name}
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                            {r.shortDesc}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] shrink-0 ml-4 rtl:rotate-180" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Countries */}
              {(filter === 'all' || filter === 'countries') && results.countries.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5" /> Country & Jurisdiction Desks ({results.countries.length})
                  </div>
                  <div className="grid gap-2">
                    {results.countries.map(c => (
                      <div
                        key={c.id}
                        onClick={() => {
                          onNavigate('country-detail', { id: c.id });
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-base border border-surface-border cursor-pointer flex items-center justify-between transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{c.flag}</span>
                          <div>
                            <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1]">
                              {c.name}
                            </div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1">
                              {c.overview}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] shrink-0 ml-4 rtl:rotate-180" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
