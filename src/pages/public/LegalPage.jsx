import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Lock, Scale, FileText, AlertTriangle, CheckCircle2, ChevronRight, Download, ArrowRight } from 'lucide-react';
import Breadcrumbs from '../../components/common/Breadcrumbs';

export default function LegalPage({ onNavigate, params }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState(params?.section || 'all');

  const policies = [
    {
      id: 'dpa',
      title: 'Data Processing Agreement (DPA)',
      category: 'Data Governance',
      icon: Lock,
      summary: 'Institutional GDPR & UK GDPR compliant processing terms governing client data handling, security safeguards, sub-processor controls, and audit rights.',
      content: [
        'EagleComply acts as a Data Processor and/or independent Data Controller strictly in accordance with Article 28 of the UK GDPR and EU GDPR.',
        'All client confidential data, regulatory filings, and customer due diligence records processed during advisory engagements are subject to strict technical and organizational measures (TOMs).',
        'Sub-processors are engaged exclusively under written agreements imposing equivalent data protection standards. Clients retain audit and inspection rights under executed engagement contracts.'
      ]
    },
    {
      id: 'idta',
      title: 'International Data Transfer Agreement (IDTA) / Addendum',
      category: 'Cross-Border Privacy',
      icon: Shield,
      summary: 'Standard contractual clauses and UK IDTA transfer mechanisms for cross-border regulatory advisory, scoping UK, EU, and international corridors.',
      content: [
        'Cross-border transfers of regulatory documentation and personal data between UK, European Union, and international desks are safeguarded using approved transfer mechanisms.',
        'Transfers utilize the UK International Data Transfer Addendum to the EU Standard Contractual Clauses (SCCs) and UK IDTA frameworks.',
        'Transfer Risk Assessments (TRAs) are conducted to ensure destination jurisdiction legal protections are adequate and compatible with UK and EU data privacy regimes.'
      ]
    },
    {
      id: 'data-protection',
      title: 'Data Protection Policy',
      category: 'Institutional Compliance',
      icon: Shield,
      summary: 'Principles-based organizational policy enforcing lawfulness, fairness, transparency, data minimization, and accuracy across all practice workflows.',
      content: [
        'Strict adherence to international data protection principles: Lawfulness, Fairness, Transparency, Purpose Limitation, Data Minimisation, Accuracy, Storage Limitation, and Integrity/Confidentiality.',
        'All compliance consultants undergo mandatory data protection and cyber hygiene onboarding certification.',
        'Data protection by design and default is integrated into all client document management systems.'
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy Notice',
      category: 'Transparency & Rights',
      icon: FileText,
      summary: 'Transparent disclosures regarding the collection, lawful basis, processing, and retention of business inquiries and client information.',
      content: [
        'We collect business contact information (name, business email, corporate role, company name, jurisdiction, project scope) exclusively for responding to inquiries, delivering requested toolkits, and delivering agreed advisory services.',
        'We never sell, rent, or commercialize contact or regulatory data to third-party brokers or advertisers.',
        'Data subjects may exercise statutory rights of access, rectification, erasure, restriction, and portability by contacting info@eaglecomply.com.'
      ]
    },
    {
      id: 'data-retention',
      title: 'Data Retention Policy',
      category: 'Data Governance',
      icon: Scale,
      summary: 'Defined statutory retention periods and secure cryptographic disposal schedules for compliance dossiers and audit working papers.',
      content: [
        'Advisory working papers, gap analysis matrices, and engagement correspondence are retained in encrypted repositories for statutory limitation periods (typically 5 to 7 years in alignment with UK/EU anti-money laundering and corporate record-keeping mandates).',
        'Upon expiry of statutory retention schedules, records are securely shredded or cryptographically erased in accordance with NIST SP 800-88 standards.',
        'Clients may request certified data return or destruction upon formal engagement conclusion.'
      ]
    },
    {
      id: 'infosec',
      title: 'Information Security Policy',
      category: 'Cyber Resilience',
      icon: Lock,
      summary: 'Enterprise information security architecture aligned with ISO/IEC 27001 standards, SOC 2 controls, and encryption in transit and at rest.',
      content: [
        'End-to-end TLS 1.3 encryption in transit and AES-256 encryption at rest for all client repositories, advisory deliverables, and communication channels.',
        'Mandatory multi-factor authentication (MFA/2FA) enforced across all internal platforms, document vaults, and email infrastructure.',
        'Continuous vulnerability scanning, endpoint detection and response (EDR), and annual third-party penetration testing.'
      ]
    },
    {
      id: 'access-control',
      title: 'Access Control Policy',
      category: 'Security Architecture',
      icon: Lock,
      summary: 'Role-Based Access Control (RBAC), principle of least privilege, and zero-trust authentication protocols for all practice data stores.',
      content: [
        'Strict enforcement of the Principle of Least Privilege: consultants are granted access strictly to client matters they are actively assigned to.',
        'Automated user de-provisioning upon project completion and quarterly access privilege audits.',
        'Immutable audit logging of document access, export, and administrative modifications.'
      ]
    },
    {
      id: 'breach-response',
      title: 'Incident & Breach Response Procedure',
      category: 'Operational Resilience',
      icon: AlertTriangle,
      summary: 'Structured 72-hour incident escalation, containment, forensic investigation, and regulatory notification protocol.',
      content: [
        'Formal 4-phase incident management protocol: (1) Detection & Triage, (2) Containment & Eradication, (3) Investigation & Recovery, (4) Post-Incident Remediation.',
        'Commitment to notify affected clients and competent supervisory authorities (e.g. UK ICO) within 72 hours of confirming any qualifying data breach.',
        'Dedicated Incident Response Team with pre-arranged digital forensics escalation.'
      ]
    },
    {
      id: 'remote-working',
      title: 'Remote Working Policy',
      category: 'Workplace Security',
      icon: Shield,
      summary: 'Security protocols for distributed compliance teams, secure VPN tunnels, encrypted endpoints, and confidential physical workspace standards.',
      content: [
        'Mandatory use of hardened corporate devices with full-disk encryption (BitLocker / FileVault) and centralized remote wipe capability.',
        'Prohibition of public Wi-Fi usage without verified corporate VPN encapsulation and DNS filtering.',
        'Clean screen and clean desk protocols during confidential regulatory advisory sessions.'
      ]
    },
    {
      id: 'nda',
      title: 'Confidentiality & Bilateral NDA Agreements',
      category: 'Legal Safeguards',
      icon: Scale,
      summary: 'Mutual bilateral non-disclosure agreements protecting proprietary source code, internal compliance records, and business disclosures.',
      content: [
        'Prior to reviewing confidential compliance records, proprietary algorithms, or statutory filings, EagleComply executes an institutional mutual NDA.',
        'All consultants, researchers, and partners are bound by perpetual professional secrecy obligations.',
        'Scoping inquiries and consultation sessions are treated as strictly confidential under professional privilege standards.'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-fade-in">
      <Breadcrumbs items={[{ label: 'Institutional Governance & Legal Disclaimers' }]} onNavigate={onNavigate} />

      {/* Header Banner */}
      <div className="py-6 border-b border-surface-border space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold uppercase tracking-widest border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          INSTITUTIONAL GOVERNANCE & STATUTORY FRAMEWORK
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          Policies, Governance Architecture & Disclaimers
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          EagleComply maintains institutional-grade data privacy, cyber resilience, and governance policies aligned with UK GDPR, EU GDPR, and global regulatory standards.
        </p>
      </div>

      {/* Primary Statutory Disclaimers Banner */}
      <div className="p-6 rounded-3xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 text-amber-950 dark:text-amber-200 space-y-3 shadow-md">
        <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base text-amber-900 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>Statutory Disclaimers & Professional Mandate</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-amber-500/20 space-y-1">
            <strong className="block text-slate-900 dark:text-white">1. UK Financial Promotions:</strong>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              We do not provide financial promotions in the UK. Nothing on eaglecomply.com or in our advisory services constitutes an invitation or inducement to engage in investment activity.
            </p>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/60 dark:bg-slate-900/60 border border-amber-500/20 space-y-1">
            <strong className="block text-slate-900 dark:text-white">2. Accountancy & Tax Services:</strong>
            <p className="text-slate-700 dark:text-slate-300 text-xs leading-relaxed">
              We do not provide accountancy and tax services. EagleComply focuses exclusively on regulatory compliance, AML/CFT risk management, licensing readiness, and legal compliance advisory.
            </p>
          </div>
        </div>
        <p className="text-[11px] text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
          <strong>Professional Services Notice:</strong> The materials, checklists, guides, and commentary on this website are provided for general informational and educational purposes only and do not constitute formal legal or statutory financial advice without an executed bilateral engagement agreement.
        </p>
      </div>

      {/* Policy Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] shadow-md'
              : 'bg-surface-subtle hover:bg-surface-raised text-slate-700 dark:text-slate-300 border border-surface-border'
          }`}
        >
          All Policies (10)
        </button>
        {policies.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === p.id
                ? 'bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] shadow-md'
                : 'bg-surface-subtle hover:bg-surface-raised text-slate-700 dark:text-slate-300 border border-surface-border'
            }`}
          >
            <p.icon className="w-3.5 h-3.5 shrink-0" />
            <span>{p.title.split('(')[0]}</span>
          </button>
        ))}
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies
          .filter((p) => activeTab === 'all' || activeTab === p.id)
          .map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.id}
                id={p.id}
                className="p-6 rounded-3xl glass-panel border border-surface-border space-y-4 hover:border-[#334DAF]/40 transition-all shadow-sm flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] uppercase tracking-wider">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-500 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active Policy
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-[#091F5C]/10 dark:bg-[#7096D1]/15 flex items-center justify-center shrink-0 border border-surface-border text-[#334DAF] dark:text-[#7096D1]">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {p.title}
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                        {p.summary}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-surface-border">
                    {p.content.map((point, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        <ChevronRight className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                  <span className="text-[11px] font-mono text-slate-400">Standard Baseline: ISO 27001 / GDPR</span>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-1 text-[#334DAF] dark:text-[#7096D1] font-bold hover:underline"
                  >
                    <span>Request Copy</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {/* Engagement & Mutual NDA Desk */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#132759] text-white border border-[#1E3778] space-y-4 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
            BILATERAL CONFIDENTIALITY & GOVERNANCE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold">
            Execute a Mutual Bilateral NDA Before Engagement
          </h2>
          <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
            All prospective client consultations and compliance scoping sessions are protected by standard mutual confidentiality protocols. Request our standard bilateral NDA or provide your institutional format.
          </p>
        </div>
        <button
          onClick={() => onNavigate('contact')}
          className="px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all whitespace-nowrap shrink-0"
        >
          Request Bilateral NDA & Scope
        </button>
      </div>

    </div>
  );
}
