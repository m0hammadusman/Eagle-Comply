import React from 'react';
import { 
  Building2, 
  Landmark, 
  Coins, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock,
  Zap,
  Globe2,
  ShieldCheck,
  Check,
  Rocket
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function IndustriesPage({ onNavigate }) {
  const { t, industries } = useLanguage();
  const ip = t.industriesPage || {};

  const industryImages = {
    'banking': `${import.meta.env.BASE_URL}assets/images/case-study-bank.jpg`,
    'fintech': `${import.meta.env.BASE_URL}assets/images/fintech-banking.jpg`,
    'payments': `${import.meta.env.BASE_URL}assets/images/critical-infra.jpg`,
    'remittance-msb': `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`,
    'digital-assets': `${import.meta.env.BASE_URL}assets/images/blockchain-nodes.jpg`,
    'financial-services': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'startups': `${import.meta.env.BASE_URL}assets/images/careers-culture.jpg`
  };

  const iconMap = {
    'banking': Landmark,
    'fintech': Zap,
    'payments': ShieldCheck,
    'remittance-msb': Globe2,
    'digital-assets': Coins,
    'financial-services': Building2,
    'startups': Rocket
  };

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{ip.tag || 'REGULATED INDUSTRY VERTICALS'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {ip.title || 'Tailored Compliance Across Industry Sectors'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {ip.subtitle || 'From institutional banking frameworks to agile fintech licensing and digital asset compliance, explore our sector-specific regulatory architectures.'}
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(industries || []).map((ind) => {
            const Icon = iconMap[ind.id] || Building2;
            const imgUrl = industryImages[ind.id] || `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`;

            return (
              <div
                key={ind.id}
                onClick={() => onNavigate('industry-detail', { id: ind.id })}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#E31F1F] dark:hover:border-[#FF3333] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-2xl text-left rtl:text-right"
              >
                {/* Visual Header Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={ind.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[#E31F1F] dark:text-[#E4E4E4] border border-surface-border font-bold shadow-sm">
                      {ind.badge || 'Core Sector'}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 rtl:right-auto rtl:left-4 w-10 h-10 rounded-2xl bg-surface-raised/90 backdrop-blur-md text-[#E31F1F] dark:text-[#FF3333] border border-surface-border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-sans tracking-tight text-lg font-bold text-black dark:text-white dark:text-white group-hover:text-[#E31F1F] dark:group-hover:text-[#FF3333] transition-colors leading-snug">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {ind.overview || ind.desc}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-surface-border/70">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7D797A]">
                      {ip.challengesTitle || 'Key Compliance Challenges:'}
                    </div>
                    <ul className="space-y-1">
                      {(ind.challenges || []).slice(0, 2).map((ch, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{ch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-bold text-[#E31F1F] dark:text-[#FF3333] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {ip.exploreSector || 'Explore Sector Framework'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
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
