import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, ExternalLink, Globe2, Building2, Radio, Activity, CheckCircle2, ChevronRight, Crosshair } from 'lucide-react';

const COUNTRY_SHORT_NAMES = {
  'united-kingdom': 'UK',
  'european-union': 'EU',
  'united-states': 'USA',
  'united-arab-emirates': 'UAE',
  'pakistan': 'Pakistan',
  'australia': 'Australia'
};

const COUNTRY_COORDINATES = {
  'united-kingdom': { top: '30%', left: '48%', region: 'London (UK FCA)' },
  'european-union': { top: '34%', left: '52%', region: 'Brussels (EU 6AMLD)' },
  'united-states': { top: '36%', left: '26%', region: 'Washington D.C. (FinCEN)' },
  'united-arab-emirates': { top: '44%', left: '62%', region: 'Dubai (VARA / ADGM)' },
  'pakistan': { top: '42%', left: '68%', region: 'Islamabad (SBP / SECP)' },
  'australia': { top: '72%', left: '85%', region: 'Sydney (AUSTRAC)' }
};

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

  const activeCoord = COUNTRY_COORDINATES[activeCountry?.id] || { top: '35%', left: '50%', region: activeCountry?.name };

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
          <div className="px-3 py-1 rounded-xl bg-surface-subtle border border-surface-border flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{radar?.hubs || '45+ Supervised Hubs'}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold">
            {radar?.uptime || '99.98% Telemetry Uptime'}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Dynamic Telemetry Map Video with Interactive Region Highlight Overlay */}
        <div className="relative w-full lg:w-2/3 h-64 sm:h-80 lg:h-[450px] rounded-2xl bg-[#101E42] border border-[#7096D1]/30 overflow-hidden shadow-2xl group">
          <video
            ref={videoRef}
            src={`${import.meta.env.BASE_URL}world-map.mp4`}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover rounded-2xl select-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101E42]/80 via-transparent to-[#101E42]/30 pointer-events-none rounded-2xl" />

          {/* Interactive Geographic Radar Target HUD (Issue 11 fix) */}
          <div 
            className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none"
            style={{ top: activeCoord.top, left: activeCoord.left }}
          >
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-cyan-400 opacity-60"></span>
              <span className="relative inline-flex rounded-full h-5 w-5 bg-[#334DAF] border-2 border-white shadow-lg items-center justify-center">
                <span className="h-2 w-2 rounded-full bg-cyan-300 animate-pulse"></span>
              </span>
            </div>
            <div className="mt-1.5 px-2.5 py-1 rounded-lg bg-[#091F5C]/90 text-white border border-cyan-400/40 shadow-xl backdrop-blur-md text-[11px] font-mono whitespace-nowrap flex items-center gap-1.5">
              <span>{activeCountry?.flag}</span>
              <span className="font-bold text-cyan-300">{activeCountry?.name}</span>
            </div>
          </div>

          {/* Map Footer Status Bar */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs font-mono text-cyan-200/90 bg-[#091F5C]/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>{radar?.targetJurisdiction || 'Target Jurisdiction'}: <strong>{activeCountry?.name}</strong></span>
            </div>
            <span className="hidden sm:inline-block text-emerald-400 font-bold">● {radar?.radarLocked || 'Radar Locked'}</span>
          </div>
        </div>

        {/* Dynamic Regional Dossier Inspector Card with Jurisdiction Selector */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between min-h-auto lg:min-h-[450px] bg-surface-raised rounded-2xl p-5 sm:p-6 border border-surface-border shadow-md">
          <div>
            {/* Quick Jurisdiction Selector Pills (Issue 12 & 23 fixes) */}
            <div className="mb-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block mb-2.5 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                {radar?.selectJurisdiction || 'Select Jurisdiction'}
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(countries || []).map((c) => {
                  const isSelected = activeCountry?.id === c.id;
                  const label = COUNTRY_SHORT_NAMES[c.id] || c.name;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setActiveCountry(c);
                        if (onSelectCountry) onSelectCountry(c);
                      }}
                      className={`px-2.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] border-transparent font-bold shadow-md scale-[1.02]'
                          : 'bg-surface-subtle border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]/60 hover:bg-surface-raised'
                      }`}
                    >
                      <span className="text-sm shrink-0">{c.flag}</span>
                      <span className="truncate text-xs">{label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3.5 border-t border-surface-border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{activeCountry?.flag}</span>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeCountry?.name}
                  </h3>
                  <span className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] uppercase tracking-wider font-bold">
                    {activeCountry?.status || radar?.activeJurisdiction || 'ACTIVE FULL JURISDICTION'} • {activeCountry?.region}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {activeCountry?.overview}
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" /> {radar?.supervisoryRegulators || 'Supervisory Regulators'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeCountry?.regulators?.slice(0, 4).map((r, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-surface-subtle text-xs font-mono font-medium text-slate-700 dark:text-slate-300 border border-surface-border">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" /> {radar?.residentDesk || 'Regional Practice Office'}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {activeCountry?.office}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectCountry && onSelectCountry(activeCountry)}
            className="w-full py-3 px-4 rounded-xl bg-[#334DAF] hover:bg-[#253982] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] mt-3 cursor-pointer"
          >
            <span>{(radar?.inspectDossier || 'Inspect {name} Dossier').replace('{name}', activeCountry?.name || '')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
