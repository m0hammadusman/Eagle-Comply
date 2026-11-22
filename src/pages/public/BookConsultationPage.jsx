import React, { useState, useEffect } from 'react';
import { 
  CalendarDays, 
  Send, 
  Loader2, 
  Check, 
  ShieldCheck, 
  Clock, 
  Video, 
  Globe2, 
  Sparkles 
} from 'lucide-react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function BookConsultationPage({ onNavigate }) {
  const { t } = useLanguage();
  const { isDark } = useTheme();

  const [activeMode, setActiveMode] = useState('form');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
      setErrorMessage("Network error connecting to email service. Please email us directly at info@eaglecomply.com");
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in text-left rtl:text-right">
      <Breadcrumbs 
        items={[
          { label: 'Home', route: 'home' },
          { label: 'Book a Consultation' }
        ]} 
        onNavigate={onNavigate} 
      />

      <div className="py-8 text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <CalendarDays className="w-3.5 h-3.5" />
          <span>SCOPING & ENGAGEMENT INTAKE</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Book a Partner Consultation
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Start with the business model, jurisdiction and outcome you need to achieve. An initial consultation is used to understand the issue, identify the relevant workstream and define the scope of specialist support required.
        </p>

        {/* View Toggle */}
        <div className="pt-2 flex items-center justify-center">
          <div className="inline-flex items-center p-1 rounded-2xl bg-surface-subtle border border-surface-border text-xs font-semibold">
            <button
              onClick={() => setActiveMode('form')}
              className={`px-5 py-2 rounded-xl transition-all cursor-pointer ${activeMode === 'form' ? 'bg-[#091F5C] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Structured Intake Form
            </button>
            <button
              onClick={() => setActiveMode('calendar')}
              className={`px-5 py-2 rounded-xl transition-all cursor-pointer ${activeMode === 'calendar' ? 'bg-[#091F5C] text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Live Booking Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-surface-raised border border-surface-border rounded-3xl p-6 sm:p-10 shadow-xl glass-panel">
        {activeMode === 'calendar' ? (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
              Choose an available date and time slot with a partner in our practice:
            </p>
            <div className="min-h-[520px] rounded-2xl overflow-hidden border border-surface-border">
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
                  Consultation Request Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you. Your consultation requirements have been delivered to our practice team. A partner will review your specifications and email you to confirm the meeting details.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => onNavigate('home')}
                    className="px-6 py-2.5 rounded-xl bg-[#091F5C] text-white text-xs font-semibold cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Name and Company <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova, Digital Finance Corp"
                      value={formData.nameAndCompany}
                      onChange={(e) => setFormData({ ...formData, nameAndCompany: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Work Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. elena@digitalfinance.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Jurisdiction or Jurisdictions
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. United Kingdom, EU, Pakistan, Australia, USA"
                      value={formData.jurisdictions}
                      onChange={(e) => setFormData({ ...formData, jurisdictions: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                      Industry and Business Model
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. FinTech & Payments, Crypto Exchange, Remittance"
                      value={formData.industryAndModel}
                      onChange={(e) => setFormData({ ...formData, industryAndModel: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    Current Issue or Project <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current business requirement, regulatory milestone, gap assessment, or operating issue..."
                    value={formData.currentIssue}
                    onChange={(e) => setFormData({ ...formData, currentIssue: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                  />
                </div>

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

                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Consultation Intake...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Partner Consultation Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
