import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  ShieldCheck, 
  Clock, 
  Calendar,
  Sparkles, 
  Building2,
  Lock,
  Check,
  Globe2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ContactWorldMap, { WhatsAppIcon, LinkedInIcon } from '../../components/common/ContactWorldMap';
import { sendInquiryToCompanyEmail, COMPANY_EMAIL } from '../../utils/contactDispatcher';

export default function ContactPage({ onNavigate }) {
  const { t, countries, solutions, industries } = useLanguage();
  const c = t.contactPage;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    jurisdiction: 'United Kingdom',
    industry: 'FinTech & Digital Challengers',
    service: 'AML/CFT & Financial Crime Compliance',
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formDataPayload = new FormData();
    formDataPayload.append("access_key", "82d704f5-ba44-4790-b41d-55dd4cd644c4");
    formDataPayload.append("name", formData.name);
    formDataPayload.append("email", formData.email);
    formDataPayload.append("subject", `[EagleComply Inquiry] ${formData.name} (${formData.company || 'Direct'}) — ${formData.service}`);
    formDataPayload.append("from_name", "EagleComply Client Portal");
    formDataPayload.append("replyto", formData.email);
    formDataPayload.append("company", formData.company || "N/A");
    formDataPayload.append("jurisdiction", formData.jurisdiction || "N/A");
    formDataPayload.append("industry", formData.industry || "N/A");
    formDataPayload.append("service", formData.service || "General Compliance Advisory");
    formDataPayload.append("message", `• Service: ${formData.service}\n• Industry: ${formData.industry}\n• Jurisdiction: ${formData.jurisdiction}\n• Company: ${formData.company || 'N/A'}\n\nClient Requirements / Message:\n${formData.description}`);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataPayload
      });
      const data = await response.json();
      console.log("Web3Forms Response:", data);

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.message || "Submission failed. Please check your Web3Forms settings.");
      }
    } catch (err) {
      console.error("Submission network error:", err);
      setErrorMessage("Network error connecting to email service. Please email us directly at info@eaglecomply.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const industryOptions = (industries || []).length > 0 
    ? industries.map(i => i.name) 
    : [
        'Banks & Credit Institutions',
        'FinTech Companies',
        'Payment Service Providers',
        'Money Service Businesses & Remittance',
        'Crypto & Digital Asset Businesses',
        'Financial Institutions & Asset Managers',
        'Startups & Regulated Entrants'
      ];

  const serviceOptions = (solutions || []).length > 0 
    ? solutions.map(s => s.name) 
    : [
        'AML/CFT & Financial Crime Compliance',
        'Regulatory Compliance & Licensing Readiness',
        'Enterprise Risk Management & Governance',
        'Legal & Compliance Advisory',
        'Institutional Compliance & AML Training',
        'Independent Reviews & Gap Assessments'
      ];

  const jurisdictionOptions = (countries || []).length > 0
    ? countries.map(c => c.name)
    : [
        'United Kingdom',
        'European Union',
        'United States',
        'United Arab Emirates',
        'Pakistan',
        'Australia'
      ];

  return (
    <div className="w-full py-12 lg:py-16 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>{c.tag || 'EAGLECOMPLY CONSULTATION & ADVISORY'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {c.title || 'Discuss Your Compliance Requirements'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {c.subtitle || 'Connect directly with our senior compliance practitioners to build, review, or scale your regulatory compliance and AML/CFT frameworks.'}
        </p>
      </div>

      {/* Form & Info Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Professional Enquiry Form */}
          <div className="lg:col-span-8 p-8 rounded-3xl glass-panel border border-surface-border shadow-xl">
            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {c.successTitle || 'Email Sent Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  {c.successDesc || 'Thank you for reaching out. Your message has been received and our compliance advisory team will contact you soon.'}
                </p>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
                  <div className="flex justify-between"><span className="text-slate-500">{c.fullName || 'Sender'}:</span><strong>{formData.name}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">{c.businessEmail || 'Email'}:</span><strong>{formData.email}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">{c.companyOrg || 'Company'}:</span><strong>{formData.company || '—'}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">{c.serviceRequired || 'Service'}:</span><strong className="truncate max-w-[200px]">{formData.service}</strong></div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        jurisdiction: jurisdictionOptions[0] || 'United Kingdom',
                        industry: industryOptions[0] || 'FinTech & Digital Challengers',
                        service: serviceOptions[0] || 'AML/CFT & Financial Crime Compliance',
                        description: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-[#091F5C] dark:bg-[#334DAF] text-xs font-bold text-white hover:opacity-90 shadow-sm transition-all cursor-pointer"
                  >
                    {c.sendAnother || 'Send Another Message'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <input type="hidden" name="access_key" value="82d704f5-ba44-4790-b41d-55dd4cd644c4" />
                <input type="hidden" name="from_name" value="EagleComply Advisory Inquiries" />

                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2 animate-shake">
                    <span>⚠️ {errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.fullName} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      placeholder={c.placeholders?.name || "e.g. Alexander Vance"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.businessEmail} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      placeholder={c.placeholders?.email || "name@company.com"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.companyOrg} *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      placeholder={c.placeholders?.company || "e.g. Apex Global Payments Ltd"}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.countryJurisdiction} *
                    </label>
                    <input
                      type="text"
                      name="jurisdiction"
                      required
                      value={formData.jurisdiction}
                      onChange={(e) => setFormData({ ...formData, jurisdiction: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                      placeholder={c.placeholders?.jurisdiction || "e.g. United Kingdom, UAE, Australia"}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.industrySector} *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {industryOptions.map((ind, i) => (
                        <option key={i} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.serviceRequired} *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    >
                      {serviceOptions.map((srv, i) => (
                        <option key={i} value={srv}>{srv}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {c.briefDescription} *
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    placeholder={c.placeholders?.description || "Please outline your entity's compliance scope, target regulatory objectives, licensing timelines, or specific financial crime challenges..."}
                  />
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                    <Lock className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                    <span>{t.contactPageSide?.confidentialNote || 'Protected by bilateral mutual confidentiality and anti-spam verification.'}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.contactPageSide?.sending || 'Sending Message...'}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{c.requestConsultation || 'Send Message / Query'}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Engagement & Advisory Protocols */}
          <div className="lg:col-span-4 space-y-6 text-left rtl:text-right">
            <div className="p-6 rounded-3xl bg-[#091F5C] text-white space-y-4 shadow-xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">
                {t.contactPageSide?.protocolTag || 'Advisory Protocol'}
              </div>
              <h3 className="text-base font-bold text-white">
                {t.contactPageSide?.protocolTitle || 'How Our Engagement Works'}
              </h3>
              <ul className="space-y-2.5 text-xs text-blue-100/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>{t.contactPageSide?.step1Title || 'Initial Scoping:'}</strong> {t.contactPageSide?.step1Desc || 'Confidential discussion to assess your specific regulatory and risk perimeter.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>{t.contactPageSide?.step2Title || 'Bilateral NDA:'}</strong> {t.contactPageSide?.step2Desc || 'Mutual confidentiality protection before detailed documentation review.'}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>{t.contactPageSide?.step3Title || 'Tailored SOW:'}</strong> {t.contactPageSide?.step3Desc || 'Transparent scope of work, milestone timelines, and actionable deliverables.'}</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-surface-border space-y-4 shadow-sm">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                {c.directContacts || "Direct Contacts"}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                {t.contactPageSide?.reachDirect || 'You may also reach our global compliance practice directly:'}
              </p>
              
              <div className="space-y-3 text-xs font-mono text-slate-700 dark:text-slate-300 pt-1">
                {/* WhatsApp UK */}
                <a
                  href="https://wa.me/447706413233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.01] transition-all group cursor-pointer"
                  title="Direct WhatsApp Contact UK"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>{t.contactPageSide?.whatsappUK || 'WhatsApp (UK)'}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
                </a>

                {/* WhatsApp Italy */}
                <a
                  href="https://wa.me/393488184787"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.01] transition-all group cursor-pointer"
                  title="Direct WhatsApp Contact Italy"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>{t.contactPageSide?.whatsappIT || 'WhatsApp (Italy)'}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform rtl:rotate-180" />
                </a>

                {/* Email */}
                <div className="flex items-center gap-2 px-1 pt-1">
                  <Mail className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <a href="mailto:info@eaglecomply.com" className="hover:underline font-bold">info@eaglecomply.com</a>
                </div>
                
                {/* LinkedIn */}
                <div className="flex items-center gap-2 px-1">
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <a href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">{t.contactPageSide?.linkedin || 'LinkedIn: EagleComply'}</a>
                </div>
              </div>

              {/* Locations summary list */}
              <div className="pt-3 border-t border-surface-border text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-2">
                  {t.contactPageSide?.locationsTitle || 'Operational Hubs & Locations:'}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                  <div className="flex items-center gap-1.5"><span>🇬🇧</span> {t.common?.uk || 'United Kingdom'}</div>
                  <div className="flex items-center gap-1.5"><span>🇮🇹</span> {t.common?.italy || 'Italy'}</div>
                  <div className="flex items-center gap-1.5"><span>🇵🇰</span> {t.common?.pakistan || 'Pakistan'}</div>
                  <div className="flex items-center gap-1.5"><span>🇪🇺</span> {t.common?.eu || 'European Union'}</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Interactive Global Map marking UK, Italy, and Pakistan */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ContactWorldMap />
      </div>

    </div>
  );
}
