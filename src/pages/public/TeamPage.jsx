import React from 'react';
import { 
  Users, 
  MapPin, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  FileText,
  ExternalLink
} from 'lucide-react';
import { experts } from '../../data/complianceData';
import { useLanguage } from '../../context/LanguageContext';
import TeamBadges from '../../components/common/TeamBadges';

export function LinkedInIcon({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67-1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

export default function TeamPage({ onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Users className="w-3.5 h-3.5" />
          <span>OUR COMPLIANCE LEADERSHIP</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Senior Practice Directors & Regulatory Counsel
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Directing multi-jurisdictional AML/CFT frameworks, regulatory licensing, statutory governance, corporate legal opinions, and prudential financial assurance.
        </p>
      </div>

      {/* Interactive Physical Badges Section */}
      <section className="py-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TeamBadges 
          title="Senior Practice Directors" 
          subtitle="Click any executive pass to inspect their complete career history, publications, and certifications" 
          onNavigate={onNavigate}
        />
      </section>

      {/* Detailed Senior Practice Directory Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
            Executive Dossiers
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            Comprehensive Practice Profiles
          </h2>
          <p className="text-xs text-slate-500">
            Select any director to view their detailed work experience, certifications, and research publications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {(experts || []).map((exp) => {
            const photoSrc = `${import.meta.env.BASE_URL}${(exp.photo || '').replace(import.meta.env.BASE_URL, '').replace(/^\/+/, '')}`;

            return (
              <div
                key={exp.id}
                className="p-8 rounded-3xl glass-panel border border-surface-border shadow-lg space-y-6 flex flex-col justify-between hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all group"
              >
                <div className="space-y-4">
                  
                  {/* Member Top Bar */}
                  <div className="flex items-start gap-4">
                    <div className="relative shrink-0">
                      <img 
                        src={photoSrc} 
                        alt={exp.name}
                        className="w-20 h-20 rounded-2xl object-cover object-top shadow-md border-2 border-[#334DAF]/20 dark:border-[#7096D1]/20 bg-surface-subtle"
                      />
                      <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full bg-[#334DAF] text-white text-[9px] font-mono font-bold">
                        DIRECTOR
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] transition-colors">
                        {exp.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#334DAF] dark:text-[#7096D1]">
                        {exp.role}
                      </p>
                      <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                        <MapPin className="w-3 h-3" />
                        <span>{exp.location || 'Global Practice Desk'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio Snippet */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {exp.bio}
                  </p>

                  {/* Core Specialisms */}
                  <div className="space-y-1.5 pt-2 border-t border-surface-border/60">
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                      Primary Disciplines
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(exp.specialisms || []).slice(0, 3).map((s, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-1 rounded-lg bg-surface-subtle border border-surface-border text-slate-700 dark:text-slate-300">
                          {s}
                        </span>
                      ))}
                      {(exp.specialisms?.length || 0) > 3 && (
                        <span className="text-[11px] px-2 py-1 rounded-lg bg-surface-subtle text-slate-500 font-mono">
                          +{exp.specialisms.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                </div>

                {/* Bottom Action Strip */}
                <div className="pt-4 border-t border-surface-border flex items-center justify-between gap-3">
                  <button
                    onClick={() => onNavigate('team-detail', { id: exp.id })}
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#334DAF] dark:text-[#7096D1] hover:underline"
                  >
                    <span>View Profile, Certs & Publications</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>

                  <div className="flex items-center gap-2">
                    {exp.linkedin && (
                      <a
                        href={exp.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-surface-subtle hover:bg-[#0077B5]/10 text-slate-600 hover:text-[#0077B5] transition-colors border border-surface-border"
                        title="LinkedIn Profile"
                      >
                        <LinkedInIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <button
                      onClick={onOpenConsultation}
                      className="px-3 py-2 rounded-xl bg-[#334DAF] hover:bg-[#253B8A] text-white dark:bg-[#7096D1] dark:text-[#101E42] text-xs font-bold shadow-sm transition-all"
                    >
                      Book Session
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#091F5C] via-[#16295C] to-[#334DAF] text-white shadow-2xl text-center space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-blue-200 font-bold inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20">
            Institutional Advisory
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Retain Senior Compliance Directors for Your Board
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/80 max-w-xl mx-auto">
            Engage our senior practitioners for independent AML/CFT audits, regulatory authorization dossiers, and ongoing compliance oversight.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenConsultation}
              className="px-8 py-3.5 rounded-xl bg-white text-[#091F5C] font-bold text-xs shadow-xl hover:bg-blue-50 transition-all inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule Initial Consultation</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
