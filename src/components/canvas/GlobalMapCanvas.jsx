import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, ExternalLink, Globe2, Building2, Radio, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

export default function GlobalMapCanvas({ onSelectCountry }) {
  const { isDark } = useTheme();
  const { countries, radar, t } = useLanguage();
  const [activeCountry, setActiveCountry] = useState(countries[0] || null);
  const videoRef = useRef(null);

  // Sync active country if language switches
  useEffect(() => {
    if (countries && countries.length > 0) {
      setActiveCountry(prev => {
        const found = countries.find(c => c.id === prev?.id);
        return found || countries[0];
      });
    }
  }, [countries]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.preload = 'auto';

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        video.play();
      });
    }
  }, []);

  const handleVideoEnded = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden glass-panel p-4 sm:p-6 lg:p-8 border border-surface-border shadow-2xl">
      
      {/* Live System Status Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center text-[#334DAF] dark:text-[#7096D1]">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1] font-bold flex items-center gap-2">
              <span>{radar?.radarTag || 'LIVE REGULATORY SURVEILLANCE RADAR'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {radar?.telemetry || 'Continuous Cross-Border Supervisory Network & Global Telemetry'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1 rounded-xl bg-surface-subtle border border-surface-border flex items-center gap-2 text-slate-400">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{radar?.hubs || '45+ Supervised Hubs'}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
            {radar?.uptime || '99.98% Telemetry Uptime'}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Video Player */}
        <div className="relative w-full lg:w-2/3 h-52 sm:h-80 lg:h-[430px] rounded-2xl bg-[#101E42] border border-[#7096D1]/30 overflow-hidden flex items-center justify-center shadow-2xl group">
          <video
            ref={videoRef}
            src="/world-map.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover rounded-2xl select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101E42]/60 via-transparent to-[#101E42]/20 pointer-events-none rounded-2xl" />
        </div>

        {/* Dynamic Regional Dossier Inspector Card with Jurisdiction Selector */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between min-h-auto lg:min-h-[430px] bg-surface-raised rounded-2xl p-4 sm:p-6 border border-surface-border shadow-md">
          <div>
            {/* Quick Jurisdiction Selector Pills */}
            <div className="mb-4">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {radar?.selectJurisdiction || 'Select Jurisdiction'}
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {(countries || []).map((c) => {
                  const isSelected = activeCountry?.id === c.id;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCountry(c);
                        if (onSelectCountry) onSelectCountry(c);
                      }}
                      className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border ${
                        isSelected
                          ? 'bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] border-transparent font-bold shadow-md'
                          : 'bg-surface-subtle border-surface-border text-slate-600 dark:text-slate-300 hover:border-[#334DAF]/40'
                      }`}
                    >
                      <span className="text-sm shrink-0">{c.flag}</span>
                      <span className="truncate text-[11px]">{c.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-surface-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{activeCountry?.flag}</span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeCountry?.name}
                  </h3>
                  <span className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] uppercase tracking-wider font-bold">
                    {activeCountry?.status || radar?.activeJurisdiction || 'ACTIVE FULL JURISDICTION'} • {activeCountry?.region}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {activeCountry?.overview}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" /> {radar?.supervisoryRegulators || 'Supervisory Regulators'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {activeCountry?.regulators?.slice(0, 4).map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-surface-subtle text-[10px] font-mono font-medium text-slate-700 dark:text-slate-300 border border-surface-border">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" /> {radar?.residentDesk || 'Resident Desk'}
                  </div>
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {activeCountry?.office}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectCountry && onSelectCountry(activeCountry)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] mt-2"
          >
            <span>{(radar?.inspectDossier || 'Inspect {name} Dossier').replace('{name}', activeCountry?.name || '')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
