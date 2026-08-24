import React, { useEffect } from 'react';
import { 
  X, 
  CalendarDays, 
  ShieldCheck, 
  ExternalLink,
  Sparkles
} from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ConsultationModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const calLink = import.meta.env.VITE_CAL_LINK || 'eagle-comply/strategic-compliance-consultation';

  // Initialize and synchronize Cal.com embed with dark/light themes & custom brand tokens
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: 'strategic-compliance-consultation' });
        cal("ui", {
          theme: isDark ? "dark" : "light",
          styles: {
            branding: { brandColor: "#334DAF" }
          },
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#334DAF",
              "cal-brand-emphasis": "#253982",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#16295C",
              "cal-bg-booker": "#101E42",
              "cal-bg-muted": "#16295C",
              "cal-bg-emphasis": "#1E3778",
              "cal-border-booker": "#1E3778",
              "cal-border-subtle": "#1E3778",
              "cal-border-default": "#2B4E9E",
              "cal-text": "#FFFFFF",
              "cal-text-muted": "#D0E4FE",
              "cal-text-emphasis": "#F9FBFF"
            },
            light: {
              "cal-brand": "#334DAF",
              "cal-brand-emphasis": "#253982",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#E8F2FE",
              "cal-bg-booker": "#FFFFFF",
              "cal-bg-muted": "#F9FBFF",
              "cal-bg-emphasis": "#E8F2FE",
              "cal-border-booker": "#D0E4FE",
              "cal-border-subtle": "#D0E4FE",
              "cal-border-default": "#D0E4FE",
              "cal-text": "#091F5C",
              "cal-text-muted": "#334DAF",
              "cal-text-emphasis": "#091F5C"
            }
          },
          hideEventTypeDetails: false,
          layout: "month_view"
        });
      } catch (err) {
        console.error("Cal.com initialization error:", err);
      }
    })();
  }, [isDark, isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-3 sm:pt-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-5xl bg-white dark:bg-[#0A1224] border border-slate-200 dark:border-[#1E3778]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300 font-sans" 
        onClick={e => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* HEADER (~55px high with always-visible Close button)      */}
        {/* ======================================================== */}
        <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50/90 dark:bg-[#0F1C36] border-b border-slate-200/80 dark:border-[#1E3778]/50 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  Book Partner Scoping Consultation
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold shrink-0">
                  Live Calendar
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate">
                Direct consultation with EagleComply Senior Compliance Directors.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <a
              href={`https://app.cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] hover:underline hidden sm:flex items-center gap-1 mr-1"
              title="Open full page in new tab"
            >
              <span>New Window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button 
              onClick={onClose} 
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#162544] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E3778] transition-colors cursor-pointer"
              title="Close modal"
              aria-label="Close"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MAIN BODY: Live Cal.com 3-Column Interactive Scheduler    */}
        {/* ======================================================== */}
        <div className="p-3 sm:p-5 flex-1">
          <div className="w-full h-[520px] sm:h-[550px] md:h-[570px] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E3778]/50 bg-white dark:bg-[#101E42]">
            <Cal
              namespace="strategic-compliance-consultation"
              calLink={calLink}
              style={{ width: "100%", height: "100%", overflow: "auto" }}
              config={{ 
                layout: 'month_view',
                theme: isDark ? 'dark' : 'light',
                useSlotsViewOnSmallScreen: true
              }}
            />
          </div>
        </div>

        {/* ======================================================== */}
        {/* FOOTER: Security Guarantee & Calendar Notice             */}
        {/* ======================================================== */}
        <div className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-50/80 dark:bg-[#0F1C36]/80 border-t border-slate-200/80 dark:border-[#1E3778]/50 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Automated calendar invites with Google Meet / Zoom links dispatched immediately.</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400">Bilateral NDA Safeguards Active</span>
          </div>
        </div>

      </div>
    </div>
  );
}
