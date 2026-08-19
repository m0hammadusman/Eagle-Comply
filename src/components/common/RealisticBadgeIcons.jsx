import React from 'react';

export function IsoBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="isoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334DAF" />
          <stop offset="100%" stopColor="#091F5C" />
        </linearGradient>
        <linearGradient id="isoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#isoGrad)" stroke="url(#isoGold)" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="13" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" />
      <path d="M12 18L16 22L24 14" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="18" y="30" textAnchor="middle" fill="#FFFFFF" fontSize="4.5" fontWeight="bold" fontFamily="monospace">ISO</text>
    </svg>
  );
}

export function EuAuditorBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="euGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#euGrad)" stroke="#60A5FA" strokeWidth="1.2" />
      {/* 8 Golden Stars Circle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <circle 
          key={i} 
          cx={18 + 10.5 * Math.cos((deg * Math.PI) / 180)} 
          cy={18 + 10.5 * Math.sin((deg * Math.PI) / 180)} 
          r="1.2" 
          fill="#FBBF24" 
        />
      ))}
      <path d="M15 13H21M18 13V23M14 23H22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function Soc2Badge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="socGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="100%" stopColor="#064E3B" />
        </linearGradient>
      </defs>
      <path d="M18 4L30 9V17C30 24 24.5 30 18 32C11.5 30 6 24 6 17V9L18 4Z" fill="url(#socGrad)" stroke="#34D399" strokeWidth="1.5" />
      <path d="M13 18L16.5 21.5L23 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="18" y="28" textAnchor="middle" fill="#A7F3D0" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">SOC 2</text>
    </svg>
  );
}

export function NistBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="nistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#082F49" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="24" height="24" rx="6" fill="url(#nistGrad)" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="11" y="11" width="14" height="14" rx="3" fill="#0C4A6E" stroke="#7DD3FC" strokeWidth="1" />
      {/* Microchip pins */}
      <path d="M11 3V6M18 3V6M25 3V6M11 30V33M18 30V33M25 30V33M3 11H6M3 18H6M3 25H6M30 11H33M30 18H33M30 25H33" stroke="#38BDF8" strokeWidth="1.2" />
      <circle cx="18" cy="18" r="3" fill="#38BDF8" />
    </svg>
  );
}

export function FinmaBafinBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="finGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338CA" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#finGrad)" stroke="#818CF8" strokeWidth="1.2" />
      {/* Neoclassical Bank Pillars */}
      <path d="M10 25H26M10 13H26M18 7L9 12H27L18 7Z" stroke="#FDE047" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 14V24M16 14V24M20 14V24M24 14V24" stroke="#FFFFFF" strokeWidth="1.8" />
    </svg>
  );
}

export function GlobalJurisdictionsBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor="#134E4A" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#globeGrad)" stroke="#2DD4BF" strokeWidth="1.5" />
      <ellipse cx="18" cy="18" rx="16" ry="7" stroke="rgba(255,255,255,0.4)" strokeWidth="1" transform="rotate(-25 18 18)" />
      <ellipse cx="18" cy="18" rx="7" ry="16" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
      <circle cx="18" cy="18" r="4" fill="#FDE047" />
    </svg>
  );
}

export function ApprovalRecordBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="apprGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      {/* Rosette 12-point seal */}
      <circle cx="18" cy="18" r="16" fill="url(#apprGrad)" stroke="#FDE68A" strokeWidth="1.5" />
      <path d="M12 18L16 22L24 13" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <text x="18" y="30" textAnchor="middle" fill="#FEF3C7" fontSize="5" fontWeight="bold">99.4%</text>
    </svg>
  );
}

export function IappPrivacyBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="iappGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#iappGrad)" stroke="#C4B5FD" strokeWidth="1.2" />
      {/* Cryptographic Padlock & Keyhole */}
      <rect x="11" y="16" width="14" height="11" rx="2.5" fill="#DDD6FE" />
      <path d="M14 16V12C14 9.8 15.8 8 18 8C20.2 8 22 9.8 22 12V16" stroke="#DDD6FE" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="21.5" r="1.5" fill="#4C1D95" />
    </svg>
  );
}

export function CeConformityBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="ceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#ceGrad)" stroke="#93C5FD" strokeWidth="1.2" />
      {/* CE Symbol */}
      <path d="M15 12C11.5 12 9.5 14.5 9.5 18C9.5 21.5 11.5 24 15 24" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M25 12C21.5 12 19.5 14.5 19.5 18C19.5 21.5 21.5 24 25 24" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M19.5 18H23.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function TiberThreatBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="tiberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      <polygon points="18,4 31,10 31,21 18,32 5,21 5,10" fill="url(#tiberGrad)" stroke="#FCA5A5" strokeWidth="1.5" />
      <path d="M18 10V22M12 16H24" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="16" r="3" fill="#FEF08A" />
    </svg>
  );
}

export function CsrdEsgBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="esgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
      </defs>
      <circle cx="18" cy="18" r="16" fill="url(#esgGrad)" stroke="#86EFAC" strokeWidth="1.5" />
      {/* Green Leaf & Sprout */}
      <path d="M18 26C18 26 25 21 24 13C16 12 11 19 18 26Z" fill="#BBF7D0" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M14 20C17 18 21 15 21 15" stroke="#16A34A" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function VaraCryptoBadge() {
  return (
    <svg viewBox="0 0 36 36" className="w-7 h-7 shrink-0" fill="none">
      <defs>
        <linearGradient id="varaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>
      </defs>
      {/* Geometric Octagram Star */}
      <rect x="7" y="7" width="22" height="22" rx="2" fill="url(#varaGrad)" stroke="#FDE68A" strokeWidth="1.2" />
      <rect x="7" y="7" width="22" height="22" rx="2" fill="url(#varaGrad)" stroke="#FDE68A" strokeWidth="1.2" transform="rotate(45 18 18)" />
      <circle cx="18" cy="18" r="7" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
      <path d="M15 15L21 21M21 15L15 21" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
