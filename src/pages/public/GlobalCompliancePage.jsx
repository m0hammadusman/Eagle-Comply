import React, { useState } from 'react';
import { 
  Globe2, 
  Building2, 
  Shield, 
  ExternalLink, 
  ArrowRight, 
  Search, 
  CheckCircle2, 
  Sparkles,
  Radio
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import GlobalMapCanvas from '../../components/canvas/GlobalMapCanvas';

export default function GlobalCompliancePage({ onNavigate }) {
  const { t, countries } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  const filteredCountries = (countries || []).filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (c.regulators || []).some(r => r.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesRegion = selectedRegion === 'all' || c.region.toLowerCase() === selectedRegion.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  const countryImages = {
    'european-union': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'united-states': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'united-kingdom': `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`,
    'uae-gcc': `${import.meta.env.BASE_URL}assets/images/blockchain-crypto.jpg`,
    'japan': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`
  };

  const regions = [
    { id: 'all', label: 'All Jurisdictions' },
    { id: 'europe', label: 'Europe (EU & UK)' },
    { id: 'north america', label: 'North America' },
    { id: 'middle east', label: 'Middle East (GCC)' },
    { id: 'asia pacific', label: 'Asia Pacific' }
  ];

  return (
    <div className="w-full py-12 sm:py-10 lg:py-16 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Radio className="w-3.5 h-3.5 animate-pulse" />
          <span>{t.globalPage?.tag || 'Cross-Border Supervisory Directory'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {t.globalPage?.title || 'Global Compliance & Jurisdiction Directory'}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          {t.globalPage?.subtitle || 'Comprehensive statutory dossiers, competent national authorities, and dedicated advisory coverage across 45+ supervised jurisdictions.'}
        </p>

        {/* Search & Region Filter Bar */}
        <div className="max-w-2xl mx-auto pt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.globalPage?.search || "Search by country, regulator (e.g. FCA, BaFin, VARA)..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel border border-surface-border text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
            />
          </div>
        </div>
      </div>

      {/* Global Interactive Video Radar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <GlobalMapCanvas onSelectCountry={(c) => onNavigate('country-detail', { id: c.id })} />
      </div>

      {/* Countries Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCountries.map((c) => {
            const imgUrl = countryImages[c.id] || `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`;

            return (
              <div
                key={c.id}
                onClick={() => onNavigate('country-detail', { id: c.id })}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-lg hover:shadow-2xl"
              >
                {/* Visual Header Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[#334DAF] dark:text-[#D0E4FE] border border-surface-border font-bold shadow-sm">
                      {c.region}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-sans tracking-tight text-2xl font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] transition-colors leading-snug">
                      {c.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {c.overview}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                      {c.office}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {c.status || 'Active Full Jurisdiction'}
                    </span>
                    <span className="text-xs font-bold text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t.globalPage?.inspect || 'Inspect Dossier'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
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
