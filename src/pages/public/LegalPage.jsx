import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Lock, Scale, FileText } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function LegalPage({ onNavigate }) {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Legal & Disclaimers' }]} onNavigate={onNavigate} />

      <div className="py-6 border-b border-surface-border space-y-2">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
          EAGLECOMPLY LEGAL FRAMEWORK
        </span>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Privacy Policy, Terms of Use & Disclaimers
        </h1>
        <p className="text-xs font-mono text-slate-500">
          Last Updated: August 2026 | eaglecomply.com
        </p>
      </div>

      <div className="space-y-8 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
        
        {/* Section 1 */}
        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-surface-border">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Scale className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <h2>1. Professional Services Disclaimer</h2>
          </div>
          <p>
            EagleComply is an independent regulatory compliance, risk management, and legal advisory practice. The materials, insights, guides, checklists, and commentary published on <strong>eaglecomply.com</strong> are provided for general informational and educational purposes only.
          </p>
          <p>
            Nothing on this website constitutes formal, jurisdiction-specific legal counsel, statutory financial advice, or an attorney-client relationship. Prior to acting upon any regulatory information, institutions should seek formal engagement with EagleComply or qualified local legal counsel under an executed engagement agreement.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-surface-border">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Lock className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <h2>2. Privacy Policy & Data Protection</h2>
          </div>
          <p>
            EagleComply is committed to protecting your privacy in compliance with international data protection principles (including the General Data Protection Regulation / GDPR, UK GDPR, and applicable local data privacy laws).
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>Information Collected:</strong> When you request a consultation, download a resource, or submit an enquiry, we collect your name, business email, company name, jurisdiction, and project brief.</li>
            <li><strong>Purpose of Processing:</strong> Data is used solely to respond to your inquiry, deliver requested toolkits, conduct conflict checks, and provide relevant regulatory updates.</li>
            <li><strong>No Third-Party Sale:</strong> We never sell, rent, or trade your contact details to third parties.</li>
            <li><strong>Confidentiality:</strong> Client communications and scoping documents are protected by strict institutional confidentiality and mutual bilateral NDA protocols.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-surface-border">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <FileText className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <h2>3. Terms of Use & Intellectual Property</h2>
          </div>
          <p>
            All intellectual property, proprietary methodologies, frameworks, checklists, branding, and content on <strong>eaglecomply.com</strong> belong to EagleComply and are protected by applicable copyright and trademark laws.
          </p>
          <p>
            Users may download published guides for internal organizational use. You may not reproduce, redistribute, republish, or commercialize EagleComply proprietary materials without prior written consent.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 p-6 rounded-2xl glass-panel border border-surface-border">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Shield className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
            <h2>4. Cookie Policy</h2>
          </div>
          <p>
            eaglecomply.com utilizes essential technical cookies to ensure website performance, navigation preferences, and secure form submissions. We do not deploy intrusive third-party cross-site advertising trackers.
          </p>
        </section>

      </div>
    </div>
  );
}
