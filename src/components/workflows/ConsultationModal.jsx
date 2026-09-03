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
            branding: { brandColor: "#E31F1F" }
          },
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#E31F1F",
              "cal-brand-emphasis": "#B42318",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#131313",
              "cal-bg-booker": "#030303",
              "cal-bg-muted": "#131313",
              "cal-bg-emphasis": "#1E1E1E",
              "cal-border-booker": "#1E1E1E",
              "cal-border-subtle": "#1E1E1E",
              "cal-border-default": "#2A2E35",
              "cal-text": "#FFFFFF",
              "cal-text-muted": "#E4E4E4",
              "cal-text-emphasis": "#FFFFFF"
            },
            light: {
              "cal-brand": "#E31F1F",
              "cal-brand-emphasis": "#B42318",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#F5F3F2",
              "cal-bg-booker": "#FFFFFF",
              "cal-bg-muted": "#FFFFFF",
              "cal-bg-emphasis": "#F5F3F2",
              "cal-border-booker": "#E4E4E4",
              "cal-border-subtle": "#E4E4E4",
              "cal-border-default": "#E4E4E4",
              "cal-text": "#E31F1F",
              "cal-text-muted": "#E31F1F",
              "cal-text-emphasis": "#E31F1F"
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
        className="w-full max-w-5xl bg-white dark:bg-[#030303] border border-[#E4E4E4] dark:border-[#1E1E1E] dark:border-[#1E1E1E]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300 font-sans" 
        onClick={e => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* HEADER (~55px high with always-visible Close button)      */}
        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* HEADER (~55px high with always-visible Close button)      */}
        {/* ======================================================== */}
        <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#F5F3F2] dark:bg-[#131313]/90 dark:bg-[#131313] border-b border-[#E4E4E4] dark:border-[#1E1E1E]/80 dark:border-[#1E1E1E]/50 flex items-center justify-between z-10 text-left rtl:text-right">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] border border-[#E31F1F]/20 dark:border-[#FF3333]/30 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base text-black dark:text-white dark:text-white truncate">
                  {t.modals?.bookConsultation || 'Book Partner Scoping Consultation'}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold shrink-0">
                  {t.modals?.liveCalendar || 'Live Calendar'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#7D797A] dark:text-[#7D797A] truncate">
                {t.modals?.consultationDesc || 'Direct consultation with EagleComply Senior Compliance Directors.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2 rtl:ml-0 rtl:mr-2">
            <a
              href={`https://app.cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#E31F1F] dark:text-[#FF3333] hover:underline hidden sm:flex items-center gap-1 mr-1 rtl:mr-0 rtl:ml-1"
              title="Open full page in new tab"
            >
              <span>{t.modals?.newWindow || 'New Window'}</span>
              <ExternalLink className="w-3 h-3 rtl:rotate-180" />
            </a>
            <button 
              onClick={onClose} 
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#1E1E1E] hover:bg-slate-200 dark:hover:bg-slate-700 text-[#7D797A] hover:text-black dark:text-white dark:hover:text-white border border-[#E4E4E4] dark:border-[#1E1E1E] dark:border-[#1E1E1E] transition-colors cursor-pointer"
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
          <div className="w-full h-[520px] sm:h-[550px] md:h-[570px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E4E4E4] dark:border-[#1E1E1E] dark:border-[#1E1E1E]/50 bg-white dark:bg-[#030303]">
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
        <div className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F5F3F2] dark:bg-[#131313]/80 dark:bg-[#131313]/80 border-t border-[#E4E4E4] dark:border-[#1E1E1E]/80 dark:border-[#1E1E1E]/50 flex flex-wrap items-center justify-between gap-2 text-xs text-[#7D797A] dark:text-[#7D797A] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.modals?.calendarNotice || 'Automated calendar invites with Google Meet / Zoom links dispatched immediately.'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#7D797A]">{t.modals?.ndaActive || 'Bilateral NDA Safeguards Active'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
