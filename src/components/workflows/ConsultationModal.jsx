import React, { useState, useEffect } from 'react';
import { 
  X, 
  CalendarDays, 
  ShieldCheck, 
  Send,
  Loader2,
  Check,
  Calendar,
  Layers,
  Globe2,
  Video
} from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export default function ConsultationModal({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  // Mode: 'form' | 'calendar'
  const [activeMode, setActiveMode] = useState('form');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // 8 Consultation Fields per Website Content.docx requirements:
  // 1. Name and company
  // 2. Work email
  // 3. Jurisdiction or jurisdictions
  // 4. Industry and business model
  // 5. Service required
  // 6. Current issue or project
  // 7. Target timing
  // 8. Preferred meeting format
  const [formData, setFormData] = useState({
    nameAndCompany: '',
    workEmail: '',
    jurisdictions: 'United Kingdom',
    industryAndModel: '',
    serviceRequired: 'Financial Crime Compliance',
    currentIssue: '',
    targetTiming: 'Immediate / Next 14 Days',
    preferredMeetingFormat: 'Video Conference (Zoom / Teams / Google Meet)'
  });

  const calLink = import.meta.env.VITE_CAL_LINK || 'eagle-comply/strategic-compliance-consultation';

  // Initialize Cal.com embed
  useEffect(() => {
    if (activeMode === 'calendar') {
      (async function () {
        try {
          const cal = await getCalApi({ namespace: 'strategic-compliance-consultation' });
          cal("ui", {
            theme: isDark ? "dark" : "light",
            styles: {
              branding: { brandColor: "#334DAF" }
            },
            hideEventTypeDetails: false,
            layout: "month_view"
          });
        } catch (err) {
          console.error("Cal.com initialization error:", err);
        }
      })();
    }
  }, [isDark, activeMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nameAndCompany.trim() || !formData.workEmail.trim() || !formData.currentIssue.trim()) {
      setErrorMessage("Please complete all required fields (Name & Company, Work Email, and Current Issue / Project).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formDataPayload = new FormData();
    formDataPayload.append("access_key", "82d704f5-ba44-4790-b41d-55dd4cd644c4");
    formDataPayload.append("name", formData.nameAndCompany);
    formDataPayload.append("email", formData.workEmail);
    formDataPayload.append("subject", `[Consultation Request] ${formData.nameAndCompany} — ${formData.serviceRequired}`);
    formDataPayload.append("from_name", "EagleComply Consultation Intake");
    formDataPayload.append("replyto", formData.workEmail);
    formDataPayload.append("jurisdictions", formData.jurisdictions);
    formDataPayload.append("industry_model", formData.industryAndModel || "N/A");
    formDataPayload.append("service_required", formData.serviceRequired);
    formDataPayload.append("target_timing", formData.targetTiming);
    formDataPayload.append("meeting_format", formData.preferredMeetingFormat);
    formDataPayload.append("message", 
      `• Name & Company: ${formData.nameAndCompany}\n` +
      `• Work Email: ${formData.workEmail}\n` +
      `• Jurisdiction(s): ${formData.jurisdictions}\n` +
      `• Industry & Business Model: ${formData.industryAndModel || 'N/A'}\n` +
      `• Service Required: ${formData.serviceRequired}\n` +
      `• Target Timing: ${formData.targetTiming}\n` +
      `• Preferred Meeting Format: ${formData.preferredMeetingFormat}\n\n` +
      `Current Issue or Project Details:\n${formData.currentIssue}`
    );

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataPayload
      });
      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Submission failed. Please email us directly at info@eaglecomply.com");
      }
    } catch (err) {
      console.error("Submission network error:", err);
      setErrorMessage("Network error connecting to email service. Please email us at info@eaglecomply.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesList = [
    'Financial Crime Compliance (AML/CFT, KYC, Sanctions, Monitoring)',
    'Regulatory & Commercial Advisory (Licensing, FinTech Regs, Contracts)',
    'Accounting & Finance (Bookkeeping, Reporting, Clean-Up, Payroll)',
    'Licensing, Authorisation & Market Entry (FCA, MiCA, AUSTRAC, SBP)',
    'Remediation, Independent Review & File Testing',
    'Comprehensive Multidisciplinary Scoping'
  ];

  const timingsList = [
    'Immediate / Urgent (Next 1-7 days)',
    'Short Term (Within 14-30 days)',
    'Medium Term (1-3 months)',
    'Exploratory / Strategic Scoping'
  ];

  const meetingFormats = [
    'Video Conference (Zoom / Microsoft Teams / Google Meet)',
    'Phone Consultation',
    'In-Person Advisory Briefing (London / Milan / Islamabad)'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-2 sm:p-4 pt-3 sm:pt-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in" 
      onClick={onClose}
    >
      <div 
        className="w-full max-w-4xl bg-white dark:bg-[#0A1224] border border-slate-200 dark:border-[#1E3778]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-300 font-sans" 
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="shrink-0 px-4 sm:px-6 py-3 sm:py-3.5 bg-slate-50 dark:bg-[#0F1C36] border-b border-slate-200 dark:border-[#1E3778]/50 flex items-center justify-between z-10 text-left rtl:text-right">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/20 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                Book a Partner Scoping Consultation
              </h2>
              <span className="text-[10px] text-slate-500 font-mono block">
                Financial Crime Compliance · Regulatory & Commercial Advisory · Accounting & Finance
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => setActiveMode('form')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeMode === 'form' ? 'bg-white dark:bg-[#0A1224] text-[#334DAF] dark:text-[#7096D1] shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Intake Form
              </button>
              <button
                type="button"
                onClick={() => setActiveMode('calendar')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${activeMode === 'calendar' ? 'bg-white dark:bg-[#0A1224] text-[#334DAF] dark:text-[#7096D1] shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
              >
                Live Calendar
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 max-h-[80vh] overflow-y-auto text-left rtl:text-right">
          
          {activeMode === 'calendar' ? (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Select an open time slot directly on our practice partner calendar below for an immediate video meeting.
              </p>
              <div className="min-h-[480px] rounded-2xl overflow-hidden border border-surface-border">
                <Cal 
                  namespace="strategic-compliance-consultation"
                  calLink={calLink}
                  style={{ width: "100%", height: "100%", overflow: "scroll" }}
                  config={{ layout: 'month_view' }}
                />
              </div>
            </div>
          ) : (
            <>
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Consultation Request Confirmed
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you. We have received your consultation details. A partner in our practice will review your operating parameters and confirm the meeting invitation via work email.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-xl bg-[#091F5C] text-white text-xs font-semibold cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  
                  <div className="bg-surface-subtle p-3.5 rounded-xl border border-surface-border text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Start with the business model, jurisdiction and outcome you need to achieve. An initial consultation is used to understand the issue, identify the relevant workstream and define the scope of specialist support required.
                  </div>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-medium">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 1. Name and Company */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Name and Company <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. John Doe, Horizon Payments Ltd"
                        value={formData.nameAndCompany}
                        onChange={(e) => setFormData({ ...formData, nameAndCompany: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      />
                    </div>

                    {/* 2. Work Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. j.doe@horizonpayments.com"
                        value={formData.workEmail}
                        onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 3. Jurisdiction or Jurisdictions */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Jurisdiction or Jurisdictions
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. United Kingdom, EU, Pakistan, Australia"
                        value={formData.jurisdictions}
                        onChange={(e) => setFormData({ ...formData, jurisdictions: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      />
                    </div>

                    {/* 4. Industry and Business Model */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Industry and Business Model
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Cross-border remittance, B2B payment gateway"
                        value={formData.industryAndModel}
                        onChange={(e) => setFormData({ ...formData, industryAndModel: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* 5. Service Required */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Service Required
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      >
                        {servicesList.map((s, i) => (
                          <option key={i} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* 7. Target Timing */}
                    <div>
                      <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                        Target Timing
                      </label>
                      <select
                        value={formData.targetTiming}
                        onChange={(e) => setFormData({ ...formData, targetTiming: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      >
                        {timingsList.map((t, i) => (
                          <option key={i} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* 6. Current Issue or Project */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Current Issue or Project <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Outline the current challenge, regulatory review, licensing application, or remediation mandate..."
                      value={formData.currentIssue}
                      onChange={(e) => setFormData({ ...formData, currentIssue: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>

                  {/* 8. Preferred Meeting Format */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Preferred Meeting Format
                    </label>
                    <select
                      value={formData.preferredMeetingFormat}
                      onChange={(e) => setFormData({ ...formData, preferredMeetingFormat: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {meetingFormats.map((m, i) => (
                        <option key={i} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Consultation Intake...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Scoping Request</span>
                        </>
                      )}
                    </button>
                    <div className="mt-2 text-center">
                      <button
                        type="button"
                        onClick={() => setActiveMode('calendar')}
                        className="text-[11px] text-[#334DAF] dark:text-[#7096D1] font-semibold hover:underline cursor-pointer"
                      >
                        Prefer to choose an instant calendar time slot? Click here
                      </button>
                    </div>
                  </div>

                </form>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
