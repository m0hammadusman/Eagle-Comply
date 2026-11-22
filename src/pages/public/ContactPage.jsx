import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Clock, 
  Calendar, 
  Check, 
  Globe2, 
  Loader2,
  Building2,
  Lock,
  MessageSquare
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ContactWorldMap, { WhatsAppIcon, LinkedInIcon } from '../../components/common/ContactWorldMap';
import { industries as officialIndustries } from '../../data/complianceData';

export default function ContactPage({ onNavigate }) {
  const { t } = useLanguage();

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Form Fields per Website Content.docx requirements:
  // 1. Full name
  // 2. Business email
  // 3. Company or organisation
  // 4. Country or jurisdiction
  // 5. Industry
  // 6. Service area
  // 7. Brief description of the requirement
  // 8. Preferred contact method
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    company: '',
    jurisdiction: 'United Kingdom',
    industry: 'FinTech & Payments',
    serviceArea: 'Financial Crime Compliance',
    requirement: '',
    preferredContactMethod: 'Email'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim() || !formData.businessEmail.trim() || !formData.requirement.trim()) {
      setErrorMessage("Please complete all required fields (Full Name, Business Email, and Description of Requirement).");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const formDataPayload = new FormData();
    formDataPayload.append("access_key", "82d704f5-ba44-4790-b41d-55dd4cd644c4");
    formDataPayload.append("name", formData.fullName);
    formDataPayload.append("email", formData.businessEmail);
    formDataPayload.append("subject", `[EagleComply Inquiry] ${formData.fullName} (${formData.company || 'Direct'}) — ${formData.serviceArea}`);
    formDataPayload.append("from_name", "EagleComply Client Portal");
    formDataPayload.append("replyto", formData.businessEmail);
    formDataPayload.append("company", formData.company || "N/A");
    formDataPayload.append("jurisdiction", formData.jurisdiction || "N/A");
    formDataPayload.append("industry", formData.industry || "N/A");
    formDataPayload.append("service_area", formData.serviceArea || "General Advisory");
    formDataPayload.append("preferred_contact_method", formData.preferredContactMethod || "Email");
    formDataPayload.append("message", 
      `• Client Name: ${formData.fullName}\n` +
      `• Business Email: ${formData.businessEmail}\n` +
      `• Company / Organisation: ${formData.company || 'N/A'}\n` +
      `• Country / Jurisdiction: ${formData.jurisdiction}\n` +
      `• Industry: ${formData.industry}\n` +
      `• Service Area: ${formData.serviceArea}\n` +
      `• Preferred Contact Method: ${formData.preferredContactMethod}\n\n` +
      `Requirement Description:\n${formData.requirement}`
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
      setErrorMessage("Network error connecting to email service. Please email us directly at info@eaglecomply.com or reach out via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryOptions = [
    'FinTech & Payments',
    'Banks & Financial Institutions',
    'Remittance & Money Services',
    'Digital Assets & Crypto',
    'Lending & Credit',
    'Professional Services & Other Regulated Businesses',
    'Other Regulated Sector'
  ];

  const serviceAreaOptions = [
    'Financial Crime Compliance (AML/CFT, KYC, Sanctions, Monitoring)',
    'Regulatory & Commercial Advisory (Licensing, FinTech Regs, Contracts)',
    'Accounting & Finance (Bookkeeping, Reporting, Clean-Up, Payroll)',
    'Multidisciplinary Engagement (Compliance + Legal + Finance)'
  ];

  const jurisdictionOptions = [
    'United Kingdom',
    'European Union',
    'Pakistan',
    'Australia',
    'United States',
    'Gulf Cooperation Council (GCC) / UAE',
    'Multi-Jurisdictional Cross-Border',
    'Other Jurisdiction'
  ];

  const contactMethods = [
    'Email',
    'WhatsApp',
    'Video Conference (Zoom / Teams / Meet)',
    'Phone Call'
  ];

  return (
    <div className="w-full py-10 lg:py-16 space-y-16 animate-fade-in text-left rtl:text-right">
      
      {/* Header Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Mail className="w-3.5 h-3.5" />
          <span>DIRECT ADVISORY ENQUIRIES</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Contact EagleComply
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Speak with EagleComply about a financial crime compliance, regulatory, commercial or accounting and finance requirement. Share the business issue, jurisdiction and current stage of the project so that the enquiry can be directed to the relevant specialist.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Comprehensive Contact Form */}
          <div className="lg:col-span-7 bg-surface-raised border border-surface-border rounded-3xl p-6 sm:p-10 shadow-xl glass-panel space-y-6">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Enquiry Received
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for contacting EagleComply. Your requirement has been routed directly to our specialist advisory team. We will review your project parameters and respond within one business day via your preferred contact method.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        businessEmail: '',
                        company: '',
                        jurisdiction: 'United Kingdom',
                        industry: 'FinTech & Payments',
                        serviceArea: 'Financial Crime Compliance',
                        requirement: '',
                        preferredContactMethod: 'Email'
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl border border-surface-border text-xs font-semibold hover:bg-surface-subtle transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-medium">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alexander Vance"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>

                  {/* 2. Business Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. alexander@enterprise.com"
                      value={formData.businessEmail}
                      onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 3. Company or Organisation */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Company or Organisation
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Payments Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    />
                  </div>

                  {/* 4. Country or Jurisdiction */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Country or Jurisdiction
                    </label>
                    <select
                      value={formData.jurisdiction}
                      onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {jurisdictionOptions.map((jur, i) => (
                        <option key={i} value={jur}>{jur}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 5. Industry */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {industryOptions.map((ind, i) => (
                        <option key={i} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* 6. Service Area */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                      Service Area
                    </label>
                    <select
                      value={formData.serviceArea}
                      onChange={(e) => setFormData({ ...formData, serviceArea: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {serviceAreaOptions.map((serv, i) => (
                        <option key={i} value={serv}>{serv}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 7. Brief Description of Requirement */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Brief Description of the Requirement <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current project, regulatory perimeter, operational challenges, or target completion timeline..."
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                  />
                </div>

                {/* 8. Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <select
                    value={formData.preferredContactMethod}
                    onChange={(e) => setFormData({ ...formData, preferredContactMethod: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                  >
                    {contactMethods.map((m, i) => (
                      <option key={i} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] hover:from-[#1E3778] hover:to-[#2B4E9E] text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Requirement to Specialist Team</span>
                      </>
                    )}
                  </button>
                  <span className="block text-center text-[10px] text-slate-400 mt-2 font-mono">
                    Encrypted via 256-Bit SSL · Strict Bilateral Client Confidentiality Protected
                  </span>
                </div>

              </form>
            )}

          </div>

          {/* Right Column: Direct Practice Contacts & Presence */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Speed Dial Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl glass-panel space-y-5">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
                DIRECT PRACTICE CHANNELS
              </span>
              
              <div className="space-y-3">
                <a
                  href="mailto:info@eaglecomply.com"
                  className="p-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-base border border-surface-border flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">Primary Email</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] truncate">
                      info@eaglecomply.com
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/447706413233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-base border border-surface-border flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">WhatsApp UK (+44)</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 truncate">
                      +44 7706 413233
                    </div>
                  </div>
                </a>

                <a
                  href="https://wa.me/393488184787"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-base border border-surface-border flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 fill-emerald-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">WhatsApp Italy (+39)</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 truncate">
                      +39 348 8184787
                    </div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-surface-subtle hover:bg-surface-base border border-surface-border flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center shrink-0">
                    <LinkedInIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase">LinkedIn Practice</div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] truncate">
                      linkedin.com/company/eaglecomply
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Operating Presence Overview */}
            <div className="p-6 rounded-3xl bg-surface-raised border border-surface-border glass-panel space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
                OPERATIONAL DESKS & PRESENCE
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                Our practice operates across active operational presence desks in London (United Kingdom), Milan (Italy), and Islamabad / Lahore (Pakistan), serving institutional clients across the EU, GCC, Pakistan, Australia and the United States.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* World Map Component */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <ContactWorldMap />
      </div>

    </div>
  );
}
