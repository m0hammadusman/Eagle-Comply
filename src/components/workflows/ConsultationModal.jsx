import React, { useMemo, useState, useEffect } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock3, 
  User, 
  Building2, 
  Mail, 
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2,
  Calendar,
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { useTheme } from '../../context/ThemeContext';
import { sendInquiryToCompanyEmail, generateMailtoLink, COMPANY_EMAIL, UK_WHATSAPP_LINK } from '../../utils/contactDispatcher';
import { WhatsAppIcon } from '../common/ContactWorldMap';

export default function ConsultationModal({ isOpen, onClose }) {
  const { t, solutions } = useLanguage();
  const { bookConsultation } = useData();
  const { isDark } = useTheme();
  const [bookingMode, setBookingMode] = useState('cal'); // 'cal' | 'custom'
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const calLink = import.meta.env.VITE_CAL_LINK || 'eagle-comply/strategic-compliance-consultation';

  const [form, setForm] = useState({
    serviceId: solutions?.[0]?.id || 'financial-crime-compliance',
    date: '',
    time: '09:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    fullName: '',
    workEmail: '',
    company: '',
    country: '',
    requirement: ''
  });

  const m = t.modals || {};
  const comm = t.common || {};
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const slots = ['09:00','10:30','12:00','14:00','15:30','17:00'];

  // Initialize Cal.com styling and reactive theme (Dark/Light)
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: 'strategic-compliance-consultation' });
        cal("ui", {
          theme: isDark ? "dark" : "light",
          styles: { branding: { brandColor: "#334DAF" } },
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
        console.error("Cal.com initialization notice:", err);
      }
    })();
  }, [isDark, isOpen]);

  if (!isOpen) return null;

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const next = async () => {
    if (step === 1 && !form.serviceId) return;
    if (step === 2 && !form.date) return;
    if (step === 3) {
      if (!form.fullName || !form.workEmail || !form.company) return;
      setIsSubmitting(true);
      const service = solutions.find(s => s.id === form.serviceId);
      const booking = bookConsultation({
        title: service?.name || 'Compliance Consultation',
        date: form.date,
        time: form.time,
        timezone: form.timezone,
        clientName: form.fullName,
        organization: form.company,
        email: form.workEmail,
        phone: '',
        notes: `Jurisdiction: ${form.country}, Requirement: ${form.requirement}`
      });
      await sendInquiryToCompanyEmail({
        type: 'Partner Consultation Booking',
        clientName: form.fullName,
        email: form.workEmail,
        company: form.company,
        jurisdiction: form.country,
        service: service?.name,
        date: form.date,
        time: form.time,
        requirement: form.requirement
      });
      setIsSubmitting(false);
      setSuccess(booking);
    } else {
      setStep(s => s + 1);
    }
  };

  const close = () => {
    setStep(1);
    setSuccess(null);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto" onClick={close}>
      <div 
        className={`w-full ${bookingMode === 'cal' ? 'max-w-3xl' : 'max-w-xl'} max-h-[88vh] flex flex-col bg-surface-raised border border-surface-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto transition-all duration-300`} 
        onClick={e => e.stopPropagation()}
      >
        {/* Compact Modal Header (Close button always 100% visible) */}
        <div className="shrink-0 px-4 sm:px-5 py-2.5 sm:py-3 bg-surface-subtle border-b border-surface-border flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  {m.consultationTitle || 'Book Partner Scoping Consultation'}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold hidden sm:inline-block shrink-0">
                  Live Calendar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                Direct consultation with EagleComply Senior Compliance Directors.
              </p>
            </div>
          </div>
          <button 
            onClick={close} 
            className="p-1.5 sm:p-2 rounded-xl bg-surface-base hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-surface-border transition-all cursor-pointer shrink-0 ml-2 shadow-xs"
            title="Close modal"
            aria-label="Close"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="shrink-0 px-4 sm:px-5 py-1.5 border-b border-surface-border bg-surface-base flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setBookingMode('cal')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                bookingMode === 'cal'
                  ? 'bg-[#334DAF] text-white shadow-xs'
                  : 'bg-surface-subtle text-slate-600 dark:text-slate-400 hover:bg-surface-raised border border-surface-border'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Live Cal.com Scheduler</span>
            </button>
            <button
              onClick={() => setBookingMode('custom')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                bookingMode === 'custom'
                  ? 'bg-[#334DAF] text-white shadow-xs'
                  : 'bg-surface-subtle text-slate-600 dark:text-slate-400 hover:bg-surface-raised border border-surface-border'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Direct Scoping Form</span>
            </button>
          </div>

          {bookingMode === 'cal' && (
            <a
              href={`https://app.cal.com/${calLink}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#334DAF] dark:text-[#7096D1] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>Open in new window</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Modal Body: Compact Cal embed without scroll */}
        <div className="p-3 sm:p-3.5">
          {bookingMode === 'cal' ? (
            /* Cal.com Live Interactive Embed */
            <div className="space-y-2">
              <div className="w-full h-[360px] sm:h-[380px] rounded-xl overflow-hidden border border-[#1E3778]/50 bg-white dark:bg-[#101E42]">
                <Cal
                  namespace="strategic-compliance-consultation"
                  calLink={calLink}
                  style={{ width: "100%", height: "100%", overflow: "hidden" }}
                  config={{ 
                    layout: 'month_view',
                    theme: isDark ? 'dark' : 'light',
                    useSlotsViewOnSmallScreen: true
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 pt-0.5 px-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <span>Automated calendar invites with Google Meet / Zoom links dispatched immediately.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Need bespoke RFP?</span>
                  <button 
                    onClick={() => setBookingMode('custom')} 
                    className="text-[#334DAF] dark:text-[#7096D1] font-bold hover:underline cursor-pointer"
                  >
                    Switch to Direct Scoping
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Custom SOW / Direct Scoping Wizard */
            <>
              {success ? (
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {m.confirmedTitle || 'Consultation Request Dispatched'}
                  </h4>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Your consultation booking details have been transmitted directly to EagleComply Counsel at <strong className="text-[#334DAF] dark:text-[#7096D1]">{COMPANY_EMAIL}</strong>. A compliance officer will contact you shortly.
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-left rtl:text-right text-xs space-y-1.5 font-mono">
                    <div className="flex justify-between"><span className="text-slate-500">Target Counsel Email:</span><strong>{COMPANY_EMAIL}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">{m.bookingRef || 'Reference'}:</span><strong>{success.id}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">{m.selectDate || 'Date'}:</span><strong>{success.date}</strong></div>
                    <div className="flex justify-between"><span className="text-slate-500">{m.selectTime || 'Time'}:</span><strong>{success.time} ({success.timezone})</strong></div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={UK_WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Direct WhatsApp Chat</span>
                    </a>
                  </div>

                  <div>
                    <button 
                      onClick={close} 
                      className="mt-2 px-6 py-2 rounded-full bg-surface-subtle text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-surface-raised border border-surface-border"
                    >
                      {comm.close || 'Close'}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2 mb-6">
                    {[m.step1 || '1. Service', m.step2 || '2. Date & Time', m.step3 || '3. Your Details'].map((label, i) => (
                      <div key={i} className={`flex-1 rounded-xl px-2 py-2 text-center text-[10px] font-bold border ${step === i + 1 ? 'bg-[#334DAF] text-white border-[#334DAF]' : 'bg-surface-subtle text-slate-400 border-surface-border'}`}>{label}</div>
                    ))}
                  </div>

                  {step === 1 && (
                    <div className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{m.selectPractice || 'Select Service'}</label>
                        <select value={form.serviceId} onChange={e => update('serviceId', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white">
                          {solutions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                      </div>
                      <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                        <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">Choose the practice area that best matches your requirement. You can explain the specific issue in the final step.</p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold mb-2"><CalendarDays className="inline w-3.5 h-3.5 mr-1" />{m.selectDate || 'Select Date'}</label>
                          <input type="date" min={minDate} value={form.date} onChange={e => update('date', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold mb-2"><Clock3 className="inline w-3.5 h-3.5 mr-1" />{m.selectTime || 'Select Time'}</label>
                          <select value={form.time} onChange={e => update('time', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white">
                            {slots.map(s => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-2"><Globe2 className="inline w-3.5 h-3.5 mr-1" />{m.selectTimezone || 'Timezone'}</label>
                        <input value={form.timezone} onChange={e => update('timezone', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field icon={User} label={m.name || 'Full Name'} value={form.fullName} onChange={v => update('fullName', v)} required />
                        <Field icon={Mail} label={m.email || 'Business Email'} type="email" value={form.workEmail} onChange={v => update('workEmail', v)} required />
                        <Field icon={Building2} label={m.organization || 'Company'} value={form.company} onChange={v => update('company', v)} required />
                        <Field icon={Globe2} label={m.jurisdiction || 'Country / Jurisdiction'} value={form.country} onChange={v => update('country', v)} />
                      </div>
                      <div>
                        <label className="block text-xs font-bold mb-2">{m.background || 'Brief Description of Requirement'}</label>
                        <textarea rows="4" value={form.requirement} onChange={e => update('requirement', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white resize-none" placeholder="What compliance issue or objective would you like to discuss?" />
                      </div>
                    </div>
                  )}

                  <div className="mt-7 pt-5 border-t border-surface-border flex items-center justify-between">
                    {step > 1 ? (
                      <button disabled={isSubmitting} onClick={back} className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold flex items-center gap-2 disabled:opacity-50">
                        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />{comm.back || 'Back'}
                      </button>
                    ) : <span />}
                    <button 
                      disabled={isSubmitting} 
                      onClick={next} 
                      className="px-5 py-2.5 rounded-xl bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] text-white font-bold text-xs flex items-center gap-2 disabled:opacity-50 transition-all shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting to Counsel...</span>
                        </>
                      ) : (
                        <>
                          <span>{step === 3 ? (comm.confirm || 'Request Consultation') : (comm.next || 'Continue')}</span>
                          <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="mt-4 text-center text-[10px] text-slate-400">Your information is used only to process the consultation request and coordinate follow-up.</div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="block text-xs font-bold mb-2"><Icon className="inline w-3.5 h-3.5 mr-1" />{label}{required ? ' *' : ''}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
    </div>
  );
}

