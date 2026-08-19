import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  IsoBadge, 
  EuAuditorBadge, 
  Soc2Badge, 
  NistBadge, 
  FinmaBafinBadge, 
  GlobalJurisdictionsBadge, 
  ApprovalRecordBadge, 
  IappPrivacyBadge, 
  CeConformityBadge, 
  TiberThreatBadge, 
  CsrdEsgBadge, 
  VaraCryptoBadge 
} from './RealisticBadgeIcons';

export default function CredentialsStrip() {
  const { badges: dynamicBadges } = useLanguage();

  const badgeComponents = [
    IsoBadge,
    EuAuditorBadge,
    GlobalJurisdictionsBadge,
    ApprovalRecordBadge,
    IappPrivacyBadge,
    CeConformityBadge,
    TiberThreatBadge,
    CsrdEsgBadge,
    VaraCryptoBadge,
    NistBadge,
    Soc2Badge,
    FinmaBafinBadge
  ];

  const badges = (dynamicBadges || []).map((b, idx) => ({
    ...b,
    component: badgeComponents[idx % badgeComponents.length]
  }));

  return (
    <div className="relative w-full py-4 bg-surface-subtle/90 dark:bg-[#16295C]/80 border-y border-surface-border backdrop-blur-md overflow-hidden select-none">
      
      {/* Smooth Side Gradient Vignettes for Seamless Edge Blending */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-surface-base dark:from-[#101E42] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-surface-base dark:from-[#101E42] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Continuous Marquee Motion (Left to Right) */}
      <div className="animate-marquee-seamless flex items-center gap-6 sm:gap-8">
        
        {/* First Loop Copy */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {badges.map((b, i) => {
            const BadgeComponent = b.component;
            return (
              <div 
                key={`b1-${i}`} 
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface-raised dark:bg-[#101E42]/80 border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] shadow-sm hover:shadow-md shrink-0 whitespace-nowrap group transition-all"
              >
                <div className="shrink-0 group-hover:scale-110 transition-transform filter drop-shadow-sm">
                  <BadgeComponent />
                </div>
                <div>
                  <div className="text-[0.72rem] font-bold tracking-wider text-[#091F5C] dark:text-[#F9FBFF] font-mono whitespace-nowrap">
                    {b.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {b.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Second Duplicate Copy for Unbroken Seamless Loop */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0">
          {badges.map((b, i) => {
            const BadgeComponent = b.component;
            return (
              <div 
                key={`b2-${i}`} 
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-surface-raised dark:bg-[#101E42]/80 border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] shadow-sm hover:shadow-md shrink-0 whitespace-nowrap group transition-all"
              >
                <div className="shrink-0 group-hover:scale-110 transition-transform filter drop-shadow-sm">
                  <BadgeComponent />
                </div>
                <div>
                  <div className="text-[0.72rem] font-bold tracking-wider text-[#091F5C] dark:text-[#F9FBFF] font-mono whitespace-nowrap">
                    {b.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                    {b.sub}
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
