import React, { useState } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Scale,
  Clock,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function RegulationsPage({ onNavigate }) {
  const { t, regulations } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRegulations = (regulations || []).filter((r) => {
    return r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           r.jurisdiction.toLowerCase().includes(searchQuery.toLowerCase()) ||
           r.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const regulationImages = {
    'eu-ai-act': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
    'dora': `${import.meta.env.BASE_URL}assets/images/cyber-resilience.jpg`,
    'gdpr': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'mica': `${import.meta.env.BASE_URL}assets/images/blockchain-crypto.jpg`
  };

  return (
    <div className="w-full py-12 sm:py-10 lg:py-16 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <Scale className="w-3.5 h-3.5" />
          <span>{t.regulationsPage?.tag || 'Statutory Directives & Risk Codex'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {t.regulationsPage?.title || 'Major Regulatory Frameworks'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.regulationsPage?.subtitle || 'In-depth statutory breakdowns, implementation timelines, mandatory governance obligations, and maximum non-compliance penalty structures.'}
        </p>

        {/* Search */}
        <div className="max-w-2xl mx-auto pt-6">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7D797A] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.regulationsPage?.search || "Search by regulation name (e.g. AI Act, DORA, GDPR, MiCA)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-surface-border text-sm text-black dark:text-white dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E31F1F]"
            />
          </div>
        </div>
      </div>

      {/* Regulations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredRegulations.map((r) => {
            const imgUrl = regulationImages[r.id] || `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`;

            return (
              <div
                key={r.id}
                onClick={() => onNavigate('regulation-detail', { id: r.id })}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#E31F1F] dark:hover:border-[#FF3333] transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                {/* Visual Header Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[#E31F1F] dark:text-[#E4E4E4] border border-surface-border font-bold shadow-sm">
                      {r.jurisdiction}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 w-12 h-12 rounded-2xl bg-surface-raised/90 backdrop-blur-md text-[#E31F1F] dark:text-[#FF3333] border border-surface-border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Scale className="w-6 h-6" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      {r.status}
                    </span>
                    <h3 className="font-sans tracking-tight text-2xl font-bold text-black dark:text-white dark:text-white group-hover:text-[#E31F1F] dark:group-hover:text-[#FF3333] transition-colors leading-snug">
                      {r.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {r.shortDesc}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-surface-subtle border border-surface-border space-y-1">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{t.regulationsPage?.fines || 'Maximum Statutory Penalties'}</span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 font-mono">
                      {r.penalties}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#7D797A] dark:text-[#7D797A]">
                      {r.jurisdiction}
                    </span>
                    <span className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t.regulationsPage?.inspect || 'Inspect Statute'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
