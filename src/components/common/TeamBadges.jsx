import React, { useState } from 'react';
import { ExternalLink, ShieldCheck, User } from 'lucide-react';
import EagleLogo from './EagleLogo';

export const teamMembers = [
  {
    id: "muhammad-shahid",
    firstName: "Muhammad",
    lastName: "Shahid",
    fullName: "Muhammad Shahid",
    role: "Compliance & Financial Crime Professional",
    department: "Compliance & Financial Crime Advisory",
    strapHeight: 80,
    linkedin: "https://www.linkedin.com/in/shahed-m",
    photo: `${import.meta.env.BASE_URL}images/team/muhammad-shahid.png`
  },
  {
    id: "syed-anvar-hussain",
    firstName: "Syed Anvar",
    lastName: "Hussain",
    fullName: "Syed Anvar Hussain",
    role: "Director Regulatory Compliance",
    department: "Regulatory Compliance",
    strapHeight: 55,
    linkedin: "https://www.linkedin.com/in/syed-husain-9165923b1",
    photo: `${import.meta.env.BASE_URL}images/team/syed-anvar-hussain.png`
  },
  {
    id: "zahid-munir",
    firstName: "Zahid",
    lastName: "Munir",
    fullName: "Zahid Munir",
    role: "Chartered Accountant, ESG & Sustainability Advisor",
    department: "Accounting, ESG & Sustainability",
    strapHeight: 100,
    linkedin: "https://www.linkedin.com/in/zahid-munir",
    photo: `${import.meta.env.BASE_URL}images/team/zahid-munir.png`
  },
  {
    id: "shan-ali",
    firstName: "Shan",
    lastName: "Ali",
    fullName: "Shan Ali",
    role: "Legal, Regulatory & Commercial Advisor",
    department: "Legal & Commercial Advisory",
    strapHeight: 68,
    linkedin: "https://www.linkedin.com/in/shan-ali-blockchain/",
    photo: `${import.meta.env.BASE_URL}images/team/shan-ali.png`
  }
];

function BadgeItem({ member, onNavigate }) {
  const [imgError, setImgError] = useState(false);

  const handleClick = (e) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate('team-detail', { id: member.id });
    }
  };

  return (
    <div
      onClick={handleClick}
      title={`Inspect ${member.fullName}'s Professional Dossier`}
      className="group relative flex flex-col items-center cursor-pointer transition-all duration-300 no-underline focus:outline-none shrink-0 md:shrink w-[240px] sm:w-[255px] md:w-full md:max-w-[270px] snap-center"
    >
      {/* Realistic Ribbed Strap extending from top */}
      <div
        style={{
          height: `${member.strapHeight}px`,
          width: '28px',
          background: 'repeating-linear-gradient(0deg, #131313, #131313 2px, #E31F1F 2px, #E31F1F 4px)',
          boxShadow: '3px 0 10px rgba(0, 0, 0, 0.35), inset 0 0 3px rgba(0, 0, 0, 0.5)',
          transition: 'height 0.4s ease'
        }}
        className="shrink-0 group-hover:brightness-125"
      />

      {/* Metallic Crimp */}
      <div
        style={{
          width: '34px',
          height: '9px',
          background: 'linear-gradient(90deg, #475569, #94a3b8, #475569)',
          borderRadius: '2px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 4
        }}
      />

      {/* Metallic Ring */}
      <div
        style={{
          width: '20px',
          height: '20px',
          border: '3.5px solid #94a3b8',
          borderRadius: '50%',
          marginTop: '-5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          zIndex: 3
        }}
      />

      {/* Metallic Clasp */}
      <div
        style={{
          width: '11px',
          height: '24px',
          background: 'linear-gradient(90deg, #64748b, #cbd5e1, #64748b)',
          borderRadius: '4px 4px 6px 6px',
          marginTop: '-5px',
          position: 'relative',
          boxShadow: '0 3px 6px rgba(0,0,0,0.35)',
          zIndex: 4
        }}
      >
        <div
          style={{
            position: 'absolute',
            bottom: '-5px',
            left: '1px',
            width: '9px',
            height: '10px',
            border: '2.5px solid #94a3b8',
            borderTop: 'none',
            borderRadius: '0 0 5px 5px'
          }}
        />
      </div>

      {/* Outer Matte Plastic Holder (Theme Adaptive) */}
      <div
        className="w-full h-[390px] sm:h-[410px] rounded-[22px] p-3 sm:p-3.5 relative -mt-1 shadow-[0_16px_36px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_45px_rgba(0,0,0,0.6)] bg-slate-300 dark:bg-[#1E1E1E] border border-slate-400/50 dark:border-white/10 transform-origin-top transition-all duration-300 group-hover:translate-y-1.5 group-hover:scale-[1.02] group-hover:shadow-[0_26px_50px_rgba(227,31,31,0.35)] dark:group-hover:shadow-[0_28px_52px_rgba(0,0,0,0.7)] group-hover:border-[#E31F1F]/50 dark:group-hover:border-[#E31F1F]/40"
      >
        {/* Hanging Slot Hole */}
        <div
          className="w-11 h-2 bg-[#F5F3F2] dark:bg-[#131313] rounded-full mx-auto mb-2.5 shadow-inner"
        />

        {/* Inner Card Surface */}
        <div
          className="w-full h-[calc(100%-16px)] rounded-[14px] relative overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 bg-white dark:bg-[#131313] text-black dark:text-white border border-[#E4E4E4] dark:border-[#262626] shadow-sm"
        >
          {/* Subtle Plastic Reflection Glare */}
          <div
            style={{
              position: 'absolute',
              top: '-60%',
              left: '-60%',
              width: '220%',
              height: '220%',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 42%)',
              pointerEvents: 'none',
              zIndex: 5
            }}
          />

          {/* Top Row: Simple Clean Company Logo & QR Code */}
          <div className="z-10 flex items-start justify-between">
            {/* Top-Left Clean Logo (No blue container / no blue outline) */}
            <div className="h-10 sm:h-11 w-auto flex items-center shrink-0">
              <img 
                src={`${import.meta.env.BASE_URL}logo-dark.png`} 
                alt="EagleComply" 
                className="h-full w-auto object-contain rounded-md block dark:hidden"
              />
              <img 
                src={`${import.meta.env.BASE_URL}logo-light.png`} 
                alt="EagleComply" 
                className="h-full w-auto object-contain rounded-md hidden dark:block"
              />
            </div>

            {/* Top-Right Scannable LinkedIn QR Code */}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              title={`Open ${member.fullName}'s LinkedIn profile`}
              className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] bg-white p-1 rounded-xl shadow-md border border-[#E4E4E4] dark:border-[#1E1E1E] shrink-0 hover:scale-105 transition-transform z-20 cursor-pointer block"
            >
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(member.linkedin)}`}
                alt={`${member.fullName} LinkedIn QR`}
                className="w-full h-full object-contain block"
              />
            </a>
          </div>

          {/* Layer 1: Transparent Cutout Portrait (Behind Blue Gradient) */}
          <div className="absolute right-[-6px] bottom-0 w-[82%] h-[78%] pointer-events-none z-[1] overflow-hidden flex items-end justify-end">
            {!imgError ? (
              <img
                src={`${import.meta.env.BASE_URL}${(member.photo || '').replace(import.meta.env.BASE_URL, '').replace(/^\/+/, '')}`}
                alt={member.fullName}
                onError={() => setImgError(true)}
                className="h-full w-auto max-w-full object-contain object-bottom filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-400 drop-shadow-xl"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#E31F1F]/10 dark:bg-[#E31F1F]/10 flex items-center justify-center text-[#E31F1F] dark:text-[#E31F1F] mb-4 mr-2 border border-[#E31F1F]/20">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>

          {/* Layer 2: Bottom Gradient Wash */}
          <div 
            className="absolute inset-x-0 bottom-0 h-[46%] pointer-events-none z-[2] bg-gradient-to-t from-[#E31F1F] via-[#E31F1F]/90 via-[42%] to-transparent dark:from-[#560101] dark:via-[#560101]/90 dark:via-[42%] dark:to-transparent" 
          />

          {/* Layer 3: Text & Footer Content */}
          <div className="mt-auto z-10 text-left pt-2">
            {/* DIRECTOR Tag */}
            <div className="text-[10px] sm:text-[11px] font-mono font-black tracking-widest text-[#FF3333] uppercase mb-0.5 drop-shadow-md">
              DIRECTOR
            </div>

            {/* Member Name */}
            <div className="text-[1.18rem] sm:text-[1.32rem] font-black uppercase leading-[1.05] text-white tracking-tight drop-shadow-md">
              {member.firstName} {member.lastName}
            </div>

            {/* Member Designation */}
            <div className="text-[11px] sm:text-[12px] font-extrabold uppercase tracking-wide text-slate-100 mt-1 max-w-[85%] leading-snug drop-shadow-md">
              {member.role}
            </div>

            {/* Accent Line Bar */}
            <div className="w-full h-[3px] sm:h-[3.5px] rounded-full bg-[#E31F1F] my-2 shadow-xs" />

            {/* Card Footer URL & LinkedIn */}
            <div className="flex items-center justify-between text-[0.62rem] sm:text-[0.66rem] text-slate-200 font-mono tracking-wider font-bold drop-shadow-md">
              <span>www.eaglecomply.com</span>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-0.5 text-[#FF3333] font-extrabold hover:underline hover:text-[#FFBEBE] transition-colors z-20 cursor-pointer"
                title={`Open ${member.fullName}'s LinkedIn profile`}
              >
                <span>LinkedIn</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TeamBadges({ 
  title = "Leadership & Practice Directors", 
  subtitle = "Senior compliance practitioners directing our multi-jurisdictional regulatory advisory",
  onNavigate
}) {
  return (
    <section className="relative w-full py-12 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden rounded-3xl bg-surface-subtle/70 dark:bg-[#030303] border border-surface-border shadow-xl my-6 transition-colors duration-300">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E31F1F]/10 dark:bg-[#E31F1F]/10 border border-[#E31F1F]/20 dark:border-[#E31F1F]/30 text-[#E31F1F] dark:text-[#E31F1F] text-xs font-mono font-bold tracking-widest uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY ACCREDITED DIRECTORS</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-wider text-black dark:text-white dark:text-white drop-shadow-sm">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Desktop/Laptop: Strict 4-Column Grid (Always 1 Row!) | Mobile: Smooth Horizontal Scrollable Row */}
      <div className="w-full max-w-[1280px] mx-auto">
        <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:grid md:grid-cols-4 gap-4 sm:gap-6 xl:gap-8 items-start justify-start md:justify-items-center pt-2 pb-6 px-2 sm:px-4 lg:px-0 scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
          {teamMembers.map((member) => (
            <BadgeItem key={member.id} member={member} onNavigate={onNavigate} />
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="md:hidden text-center text-[10.5px] font-mono font-bold tracking-widest text-[#7D797A] dark:text-[#E31F1F]/80 flex items-center justify-center gap-2 pt-2 uppercase">
        <span>&larr; Scroll horizontally to view all directors &rarr;</span>
      </div>
    </section>
  );
}
