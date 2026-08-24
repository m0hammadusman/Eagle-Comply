import React, { useState } from 'react';
import { Globe2, Mail, ExternalLink, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export function WhatsAppIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.484-8.402" />
    </svg>
  );
}

export function LinkedInIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

export const activeLocations = [
  {
    id: "uk",
    name: "United Kingdom",
    code: "UK",
    flag: "🇬🇧",
    city: "London",
    practice: "UK & Global Practice",
    address: "London, United Kingdom",
    phone: "+44 7706 413233",
    whatsapp: "+44 7706 413233",
    whatsappUrl: "https://wa.me/447706413233",
    email: "info@eaglecomply.com",
    status: "Active Advisory Hub",
    timezone: "GMT / BST",
    coverage: "UK FCA, MLR 2017, SM&CR, PSR 2017 & Cross-Border Compliance",
    badge: "Tier-1 Hub",
    coords: { x: 485, y: 135 }
  },
  {
    id: "italy",
    name: "Italy",
    code: "IT",
    flag: "🇮🇹",
    city: "Milan / Rome",
    practice: "Italy & Southern Europe",
    address: "Milan & Rome, Italy",
    phone: "+39 348 818 4787",
    whatsapp: "+39 348 818 4787",
    whatsappUrl: "https://wa.me/393488184787",
    email: "info@eaglecomply.com",
    status: "EU Advisory Office",
    timezone: "CET (UTC+1)",
    coverage: "EU 6AMLD, MiCA, DORA, Bank of Italy & OAM Regulatory Frameworks",
    badge: "EU Office",
    coords: { x: 520, y: 165 }
  },
  {
    id: "pakistan",
    name: "Pakistan",
    code: "PK",
    flag: "🇵🇰",
    city: "Islamabad / Karachi",
    practice: "South Asia Advisory Hub",
    address: "Islamabad & Karachi, Pakistan",
    phone: "+44 7706 413233",
    whatsapp: "+44 7706 413233",
    whatsappUrl: "https://wa.me/447706413233",
    email: "info@eaglecomply.com",
    status: "South Asia Hub",
    timezone: "PKT (UTC+5)",
    coverage: "State Bank of Pakistan (SBP), SECP & Regional AML/CFT Compliance",
    badge: "Regional Hub",
    coords: { x: 675, y: 195 }
  }
];

export default function ContactWorldMap({ onSelectLocation }) {
  const [selectedId, setSelectedId] = useState("uk");
  const selectedLocation = activeLocations.find(l => l.id === selectedId) || activeLocations[0];

  return (
    <div className="w-full rounded-3xl glass-panel border border-surface-border p-6 lg:p-8 space-y-6 shadow-xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-surface-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-[#334DAF] dark:text-[#7096D1]">
            <Globe2 className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <span>GLOBAL ADVISORY PRESENCE & REGIONAL OFFICES</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Operational Locations: United Kingdom, Italy & Pakistan
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {activeLocations.map((loc) => {
            const isActive = loc.id === selectedId;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#334DAF] dark:bg-[#7096D1] text-white dark:text-[#101E42] shadow-md scale-[1.02]"
                    : "bg-surface-subtle hover:bg-surface-raised text-slate-700 dark:text-slate-300 border border-surface-border"
                }`}
              >
                <span>{loc.flag}</span>
                <span>{loc.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive
                    ? "bg-white/20 dark:bg-black/20 text-white dark:text-[#101E42]"
                    : "bg-surface-raised text-slate-500"
                }`}>{loc.code}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 bg-[#091F5C] dark:bg-[#0c1633] rounded-2xl p-4 sm:p-6 border border-[#1E3778] relative overflow-hidden shadow-inner flex flex-col justify-between min-h-[360px]">
          <div className="flex items-center justify-between text-[11px] font-mono text-blue-200/70 mb-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              GLOBAL COMPLIANCE RADAR: 3 ACTIVE LOCATIONS
            </span>
            <span>PROJECTION: MERCATOR</span>
          </div>

          <div className="relative w-full h-64 sm:h-72 my-auto">
            <svg viewBox="0 0 1000 450" className="w-full h-full object-contain filter drop-shadow-md select-none">
              <defs>
                <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1E3778" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#132759" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              <g stroke="rgba(208, 228, 254, 0.08)" strokeWidth="1" strokeDasharray="3 3">
                <line x1="0" y1="112" x2="1000" y2="112" />
                <line x1="0" y1="225" x2="1000" y2="225" />
                <line x1="0" y1="337" x2="1000" y2="337" />
                <line x1="250" y1="0" x2="250" y2="450" />
                <line x1="500" y1="0" x2="500" y2="450" />
                <line x1="750" y1="0" x2="750" y2="450" />
              </g>

              <path d="M 120,60 Q 220,50 280,100 Q 300,160 260,200 Q 230,240 190,240 Q 150,200 130,130 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />
              <path d="M 230,250 Q 290,260 280,340 Q 250,420 220,430 Q 190,360 210,290 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />
              <path d="M 440,70 Q 560,50 720,70 Q 880,90 920,150 Q 840,200 750,170 Q 640,140 540,110 Q 470,90 440,70 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />
              <path d="M 460,160 Q 550,160 570,230 Q 560,330 500,380 Q 450,300 440,210 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />
              <path d="M 640,160 Q 770,160 840,230 Q 780,300 700,260 Q 640,210 640,160 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />
              <path d="M 780,290 Q 880,280 890,360 Q 830,410 770,370 Z" fill="url(#mapGradient)" stroke="#2B4C9B" strokeWidth="1.2" opacity="0.85" />

              <path d="M 485,135 Q 502,150 520,165" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />
              <path d="M 520,165 Q 600,170 675,195" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.7" />

              {activeLocations.map((loc) => {
                const isSelected = loc.id === selectedId;
                return (
                  <g key={loc.id} className="cursor-pointer" onClick={() => setSelectedId(loc.id)}>
                    <circle cx={loc.coords.x} cy={loc.coords.y} r={isSelected ? 18 : 12} fill="none" stroke={isSelected ? "#38BDF8" : "#60A5FA"} strokeWidth="1.5" opacity="0.8" className="animate-ping" style={{ transformOrigin: `${loc.coords.x}px ${loc.coords.y}px`, animationDuration: "2.5s" }} />
                    <circle cx={loc.coords.x} cy={loc.coords.y} r={isSelected ? 14 : 9} fill={isSelected ? "#38BDF8" : "#2563EB"} opacity="0.4" />
                    <circle cx={loc.coords.x} cy={loc.coords.y} r={isSelected ? 6.5 : 4.5} fill={isSelected ? "#FFFFFF" : "#93C5FD"} stroke="#091F5C" strokeWidth="1.5" />
                    <g transform={`translate(${loc.coords.x}, ${loc.coords.y - 14})`}>
                      <rect x="-36" y="-16" width="72" height="18" rx="9" fill={isSelected ? "#0284C7" : "#091F5C"} stroke={isSelected ? "#38BDF8" : "#1E3778"} strokeWidth="1" />
                      <text x="0" y="-4" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace">{loc.flag} {loc.code}</text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#1E3778] text-xs font-mono text-blue-200">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>United Kingdom</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Italy</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Pakistan</span>
              </span>
            </div>
            <span className="text-[11px] text-blue-300/70">Click pin or card to view location details</span>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#091F5C] to-[#132759] text-white border border-[#1E3778] shadow-xl space-y-5">
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#1E3778]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedLocation.flag}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      {selectedLocation.name}
                    </h3>
                  </div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                {selectedLocation.status}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-bold">
                Regulatory Scope & Supervisory Coverage:
              </div>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                {selectedLocation.coverage}
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-blue-300 font-bold">
                Direct Contact & Instant Messaging:
              </div>

              <a
                href={selectedLocation.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.01] transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>WhatsApp: <strong>{selectedLocation.whatsapp}</strong></span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${selectedLocation.email}`}
                className="w-full flex items-center justify-between px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/15 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-blue-300" />
                  <span>Email: <strong>{selectedLocation.email}</strong></span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-blue-300" />
              </a>
            </div>

            <div className="pt-2 border-t border-[#1E3778] flex items-center justify-between text-[11px] font-mono text-blue-200/80">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-300" /> Timezone: {selectedLocation.timezone}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Bilateral NDA
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {activeLocations.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  loc.id === selectedId
                    ? "bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border-[#334DAF] dark:border-[#7096D1]"
                    : "glass-panel border-surface-border hover:bg-surface-raised"
                }`}
              >
                <div className="text-base mb-1">{loc.flag}</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white truncate">{loc.name}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
