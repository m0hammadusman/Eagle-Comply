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
import { sendInquiryToCompanyEmail, generateMailtoLink, COMPANY_EMAIL, UK_WHATSAPP_LINK } from '../../utils/contactDispatcher';

export default function ContactPage({ onNavigate }) {
  const { t, countries, solutions, industries } = useLanguage();
  const c = t.contactPage;
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    await sendInquiryToCompanyEmail({
      type: 'Consultation & Advisory Request',
      clientName: formData.name,
      email: formData.email,
      company: formData.company,
      jurisdiction: formData.jurisdiction,
      service: formData.service,
      requirement: formData.description
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const industryOptions = [
    'Banks & Credit Institutions',
    'FinTech Companies',
    'Payment Service Providers',
    'Money Service Businesses & Remittance',
    'Crypto & Digital Asset Businesses',
    'Financial Institutions & Asset Managers',
    'Startups & Regulated Entrants',
    'Professional Service Firms',
    'Other Regulated Entity'
  ];

  const serviceOptions = [
    'AML/CFT & Financial Crime Compliance',
    'Regulatory Compliance & Licensing Readiness',
    'Enterprise Risk Management & Governance',
    'Legal & Compliance Advisory',
    'Institutional Compliance & AML Training',
    'Independent Reviews & Gap Assessments'
  ];

  return (
    <div className="w-full py-12 lg:py-16 space-y-12 animate-fade-in">
      {/* Header */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY CONSULTATION & ADVISORY</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Discuss Your Compliance Requirements
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Connect directly with our senior compliance practitioners to build, review, or scale your regulatory compliance and AML/CFT frameworks.
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
                  Consultation Request Dispatched
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your engagement requirements have been formatted and dispatched directly to EagleComply Counsel at <strong className="text-[#334DAF] dark:text-[#7096D1]">{COMPANY_EMAIL}</strong>. A senior compliance specialist will respond within 1 business day under confidential bilateral terms.
                </p>

                <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-xs text-left max-w-md mx-auto space-y-1.5 font-mono">
                  <div className="flex justify-between"><span className="text-slate-500">Recipient:</span><strong>{COMPANY_EMAIL}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Client / Company:</span><strong>{formData.company || formData.name}</strong></div>
                  <div className="flex justify-between"><span className="text-slate-500">Selected Service:</span><strong className="truncate max-w-[200px]">{formData.service}</strong></div>
                </div>

                <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={generateMailtoLink({
                      type: 'Consultation & Advisory Request',
                      clientName: formData.name,
                      email: formData.email,
                      company: formData.company,
                      jurisdiction: formData.jurisdiction,
                      service: formData.service,
                      requirement: formData.description
                    })}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] text-white font-bold text-xs shadow-md transition-all"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open Email Draft ({COMPANY_EMAIL})</span>
                  </a>
                  <a
                    href={UK_WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>Direct WhatsApp Chat</span>
                  </a>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-surface-subtle text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-surface-raised border border-surface-border transition-all"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {c.fullName} *
                    </label>
                    <input
                      type="text"
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
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                    placeholder={c.placeholders?.description || "Please outline your entity's compliance scope, target regulatory objectives, licensing timelines, or specific financial crime challenges..."}
                  />
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <span>Protected by bilateral mutual confidentiality and anti-spam verification.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting Consultation Request to Counsel...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>{c.requestConsultation}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Direct Engagement & Advisory Protocols */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-[#091F5C] text-white space-y-4 shadow-xl">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-200">
                Advisory Protocol
              </div>
              <h3 className="text-base font-bold text-white">
                How Our Engagement Works
              </h3>
              <ul className="space-y-2.5 text-xs text-blue-100/90 leading-relaxed">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Initial Scoping:</strong> Confidential discussion to assess your specific regulatory and risk perimeter.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Bilateral NDA:</strong> Mutual confidentiality protection before detailed documentation review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Tailored SOW:</strong> Transparent scope of work, milestone timelines, and actionable deliverables.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl glass-panel border border-surface-border space-y-4 shadow-sm">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                {c.directContacts || "Direct Contacts"}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                You may also reach our global compliance practice directly:
              </p>
              
              <div className="space-y-3 text-xs font-mono text-slate-700 dark:text-slate-300 pt-1">
                {/* WhatsApp UK */}
                <a
                  href="https://wa.me/447706413233"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.01] transition-all group"
                  title="Direct WhatsApp Contact UK"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp (UK) <strong></strong></span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* WhatsApp Italy */}
                <a
                  href="https://wa.me/393488184787"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.01] transition-all group"
                  title="Direct WhatsApp Contact Italy"
                >
                  <div className="flex items-center gap-2.5">
                    <WhatsAppIcon className="w-4 h-4 fill-white" />
                    <span>WhatsApp (Italy) <strong></strong></span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
                </a>

                {/* Email */}
                <div className="flex items-center gap-2 px-1 pt-1">
                  <Mail className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <a href="mailto:info@eaglecomply.com" className="hover:underline font-bold">info@eaglecomply.com</a>
                </div>
                
                {/* LinkedIn */}
                <div className="flex items-center gap-2 px-1">
                  <LinkedInIcon className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1]" />
                  <a href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">LinkedIn: EagleComply</a>
                </div>
              </div>

              {/* Locations summary list */}
              <div className="pt-3 border-t border-surface-border text-xs text-slate-600 dark:text-slate-400 space-y-1.5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold">
                  Operational Hubs & Locations:
                </div>
                <div className="flex items-center gap-2">
                  <span>🇬🇧</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">United Kingdom</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🇮🇹</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Italy</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🇵🇰</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">Pakistan</span>
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
