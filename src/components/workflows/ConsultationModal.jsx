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
            branding: { brandColor: "#DD2A40" }
          },
          cssVarsPerTheme: {
            dark: {
              "cal-brand": "#DD2A40",
              "cal-brand-emphasis": "#BA1B30",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#111111",
              "cal-bg-booker": "#000000",
              "cal-bg-muted": "#111111",
              "cal-bg-emphasis": "#22252A",
              "cal-border-booker": "#22252A",
              "cal-border-subtle": "#22252A",
              "cal-border-default": "#2A2E35",
              "cal-text": "#FFFFFF",
              "cal-text-muted": "#E4E7EC",
              "cal-text-emphasis": "#FFFFFF"
            },
            light: {
              "cal-brand": "#DD2A40",
              "cal-brand-emphasis": "#BA1B30",
              "cal-brand-text": "#FFFFFF",
              "cal-brand-subtle": "#F8F9FA",
              "cal-bg-booker": "#FFFFFF",
              "cal-bg-muted": "#FFFFFF",
              "cal-bg-emphasis": "#F8F9FA",
              "cal-border-booker": "#E4E7EC",
              "cal-border-subtle": "#E4E7EC",
              "cal-border-default": "#E4E7EC",
              "cal-text": "#DD2A40",
              "cal-text-muted": "#DD2A40",
              "cal-text-emphasis": "#DD2A40"
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
        className="w-full max-w-5xl bg-white dark:bg-[#0A1224] border border-[#E4E7EC] dark:border-[#22252A] dark:border-[#22252A]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300 font-sans" 
        onClick={e => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* HEADER (~55px high with always-visible Close button)      */}
        {/* ======================================================== */}
        {/* ======================================================== */}
        {/* HEADER (~55px high with always-visible Close button)      */}
        {/* ======================================================== */}
        <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 bg-[#F8F9FA] dark:bg-[#111111]/90 dark:bg-[#111111] border-b border-[#E4E7EC] dark:border-[#22252A]/80 dark:border-[#22252A]/50 flex items-center justify-between z-10 text-left rtl:text-right">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#DD2A40]/10 dark:bg-[#FF3333]/15 text-[#DD2A40] dark:text-[#FF3333] border border-[#DD2A40]/20 dark:border-[#FF3333]/30 flex items-center justify-center shrink-0">
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
              <p className="text-[11px] sm:text-xs text-[#667085] dark:text-[#667085] truncate">
                {t.modals?.consultationDesc || 'Direct consultation with EagleComply Senior Compliance Directors.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2 rtl:ml-0 rtl:mr-2">
            <a
              href={`https://app.cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#DD2A40] dark:text-[#FF3333] hover:underline hidden sm:flex items-center gap-1 mr-1 rtl:mr-0 rtl:ml-1"
              title="Open full page in new tab"
            >
              <span>{t.modals?.newWindow || 'New Window'}</span>
              <ExternalLink className="w-3 h-3 rtl:rotate-180" />
            </a>
            <button 
              onClick={onClose} 
              className="p-1.5 sm:p-2 rounded-xl bg-white dark:bg-[#22252A] hover:bg-slate-200 dark:hover:bg-slate-700 text-[#667085] hover:text-black dark:text-white dark:hover:text-white border border-[#E4E7EC] dark:border-[#22252A] dark:border-[#22252A] transition-colors cursor-pointer"
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
          <div className="w-full h-[520px] sm:h-[550px] md:h-[570px] rounded-xl sm:rounded-2xl overflow-hidden border border-[#E4E7EC] dark:border-[#22252A] dark:border-[#22252A]/50 bg-white dark:bg-[#000000]">
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
        <div className="shrink-0 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#F8F9FA] dark:bg-[#111111]/80 dark:bg-[#111111]/80 border-t border-[#E4E7EC] dark:border-[#22252A]/80 dark:border-[#22252A]/50 flex flex-wrap items-center justify-between gap-2 text-xs text-[#667085] dark:text-[#667085] font-mono">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{t.modals?.calendarNotice || 'Automated calendar invites with Google Meet / Zoom links dispatched immediately.'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#667085]">{t.modals?.ndaActive || 'Bilateral NDA Safeguards Active'}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
