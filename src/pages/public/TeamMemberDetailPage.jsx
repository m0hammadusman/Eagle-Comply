import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Calendar, 
  ArrowLeft, 
  BookOpen, 
  Globe2, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Layers,
  Building2,
  Scale,
  Award
} from 'lucide-react';
import { experts } from '../../data/complianceData';
import { useLanguage } from '../../context/LanguageContext';

export function LinkedInIcon({ className = "w-4 h-4", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

export default function TeamMemberDetailPage({ params, onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  const memberId = params?.id || 'syed-anvar-hussain';
  const member = experts.find(e => e.id === memberId) || experts[0];

  const photoSrc = `${import.meta.env.BASE_URL}${(member.photo || '').replace(import.meta.env.BASE_URL, '').replace(/^\/+/, '')}`;

  return (
    <div className="w-full py-8 sm:py-12 lg:py-16 space-y-10 animate-fade-in">
      
      {/* Top Breadcrumbs & Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-surface-border">
          <button
            onClick={() => onNavigate('team')}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#334DAF] dark:text-[#7096D1] hover:underline"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Back to All Practice Directors</span>
          </button>
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <span className="cursor-pointer hover:text-[#334DAF]" onClick={() => onNavigate('home')}>Home</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="cursor-pointer hover:text-[#334DAF]" onClick={() => onNavigate('team')}>Team</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white font-bold">{member.name}</span>
          </div>
        </div>
      </div>

      {/* Main Executive Profile Header & About Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Photo & Direct Engagement Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-3xl overflow-hidden glass-panel border border-surface-border shadow-xl p-4 bg-surface-subtle/50 text-center space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-inner bg-surface-base">
                <img 
                  src={photoSrc} 
                  alt={member.name}
                  className="w-full h-full object-cover object-top filter contrast-105"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#334DAF] dark:text-[#7096D1] border border-surface-border">
                  {member.department || 'Executive Advisory'}
                </div>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{member.name}</h1>
                <p className="text-xs font-semibold text-[#334DAF] dark:text-[#7096D1] mt-1">{member.role}</p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onOpenConsultation?.()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Consultation Session</span>
                </button>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] border border-[#0077B5]/30 font-bold text-xs transition-all flex items-center justify-center gap-2"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                    <span>View LinkedIn Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Quick Contact Line */}
              <div className="pt-3 border-t border-surface-border flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
                <Mail className="w-3.5 h-3.5" />
                <span>info@eaglecomply.com</span>
              </div>
            </div>

            {/* Jurisdictional & Language Footprint */}
            <div className="p-6 rounded-3xl glass-panel border border-surface-border space-y-4 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
                Jurisdictional Coverage
              </span>
              <div className="flex flex-wrap gap-2">
                {(member.countries || []).map((c, i) => (
                  <span key={i} className="text-xs font-mono px-3 py-1 rounded-full bg-surface-subtle border border-surface-border text-slate-700 dark:text-slate-300">
                    {c}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-surface-border space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                  Working Languages
                </span>
                <div className="flex items-center gap-2">
                  {(member.languages || ['English']).map((lang, i) => (
                    <span key={i} className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {lang}{i < (member.languages?.length || 1) - 1 ? ' · ' : ''}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Structured Executive About & Core Disciplines */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About / Executive Profile & Practice Mandate */}
            <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-surface-border shadow-md space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXECUTIVE PROFILE & ABOUT</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                About {member.name}
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {member.aboutParagraphs ? (
                  member.aboutParagraphs.map((para, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {para}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="leading-relaxed">
                      {member.intro || member.bio}
                    </p>
                    {member.bio && member.bio !== member.intro && (
                      <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                        {member.bio}
                      </p>
                    )}
                  </>
                )}
              </div>

              {/* Core Specialisms Grid */}
              <div className="pt-6 border-t border-surface-border space-y-4">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
                  Core Practice Areas & Specialisms
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(member.specialisms || []).map((spec, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 p-3 rounded-2xl bg-surface-subtle border border-surface-border/70 hover:border-[#334DAF]/40 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="font-semibold">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Consultation Card */}
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#091F5C] via-[#16295C] to-[#334DAF] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <span className="text-xs font-mono uppercase tracking-widest text-blue-200 font-bold inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  DIRECT ADVISORY & CONSULTATION
                </span>
                <h3 className="text-2xl font-bold text-white">
                  Consult with {member.name}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100/85 max-w-xl leading-relaxed">
                  Engage our senior practice directors for custom statutory gap analyses, licensing dossiers, and independent audit assurance.
                </p>
              </div>
              <button
                onClick={() => onOpenConsultation?.()}
                className="px-6 py-3.5 rounded-xl bg-white text-[#091F5C] font-bold text-xs shadow-xl hover:bg-blue-50 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                Schedule Advisory Discussion
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
