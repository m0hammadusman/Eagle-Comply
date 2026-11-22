import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Scale, 
  Landmark, 
  ArrowRight, 
  Calendar, 
  Check, 
  Layers, 
  FileCheck,
  CheckCircle2,
  Globe2,
  Filter
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { servicePillars } from '../../data/complianceData';
import ComplianceCard from '../../components/common/ComplianceCard';

export default function SolutionsPage({ onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  const [selectedPillarId, setSelectedPillarId] = useState('all');

  const detailedServices = [
    // Pillar 1: Financial Crime Compliance
    {
      id: 'compliance-frameworks',
      pillarId: 'financial-crime-compliance',
      category: 'Financial Crime Compliance',
      name: 'Compliance Frameworks, Policies & Procedures',
      tagline: 'Policy packs, AML/CFT frameworks, risk assessments and frontline procedures.',
      desc: 'We develop and review compliance frameworks that define responsibilities, establish controls and guide day-to-day decision-making. Our policy packs combine written policies with operating procedures, risk assessments, checklists and reporting templates.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'AML/CFT & AML/CTF frameworks (counter-terrorist & proliferation financing)',
        'Business-wide risk assessments across customer, product, and geographic channels',
        'Customer Due Diligence (KYC, KYB, CDD, EDD) & ongoing monitoring routines',
        'Beneficial ownership verification & source of funds/wealth escalation standards',
        'Sanctions & PEP screening governance and transaction monitoring procedures'
      ]
    },
    {
      id: 'travel-rule-compliance',
      pillarId: 'financial-crime-compliance',
      category: 'Financial Crime Compliance',
      name: 'Travel Rule & Transfer Compliance',
      tagline: 'Information accompanying transfers of funds and virtual assets.',
      desc: 'We advise payment and digital asset businesses on Travel Rule requirements and the information accompanying transfers of funds and virtual assets.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Originator and beneficiary information & counterparty due diligence',
        'Technical data exchange procedures & messaging protocol interoperability',
        'Self-hosted / unhosted wallet arrangements & threshold compliance',
        'Record retention, audit trails, and missing transfer information handling',
        'Connecting FATF Recommendations 15 and 16 with national transfer requirements'
      ]
    },
    {
      id: 'licensing-authorisation',
      pillarId: 'financial-crime-compliance',
      category: 'Financial Crime Compliance',
      name: 'Licensing, Authorisation & Market Entry',
      tagline: 'Regulatory perimeter analysis, application dossiers and supervisory submissions.',
      desc: 'We support businesses establishing regulated operations, launching new services and expanding into new markets. Our regulatory perimeter assessments identify the permissions, registrations and authorisations associated with the proposed business activities.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Regulatory perimeter and business-model analysis',
        'Licensing, authorisation and registration assessments & application roadmaps',
        'Regulatory business plans and operating-model documentation',
        'Governance structures, compliance arrangements & application dossiers',
        'Coordination of financial forecasts & regulatory question responses'
      ]
    },
    {
      id: 'compliance-advisory',
      pillarId: 'financial-crime-compliance',
      category: 'Financial Crime Compliance',
      name: 'Compliance Advisory & Regulatory Change',
      tagline: 'Project-based and ongoing advice on regulatory change and compliance weaknesses.',
      desc: 'We provide project-based and ongoing advice on regulatory requirements, compliance weaknesses and changes to business activities.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Regulatory obligations mapping & perimeter reviews',
        'Compliance gap assessments & regulatory change impact analysis',
        'Policy reviews, remediation planning & implementation roadmaps',
        'Assessing new products, customer segments, distribution channels and markets'
      ]
    },

    // Pillar 2: Regulatory & Commercial Advisory
    {
      id: 'legal-consultancy',
      pillarId: 'regulatory-commercial-advisory',
      category: 'Regulatory & Commercial Advisory',
      name: 'Business Legal Advice & Ongoing Support',
      tagline: 'Practical legal advice for financial services, FinTech, tech and crypto.',
      desc: 'We provide legal advice on the issues businesses encounter when establishing relationships, entering agreements and developing their operations. Our support covers individual matters and ongoing advisory engagements.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Legal consultations, written advice and advisory notes',
        'Legal risk assessments and analysis of contractual rights and obligations',
        'Review of proposed business arrangements and partnership structures',
        'Legal research and analysis for financial services, FinTech and digital assets',
        'Customer terms, business terms and commercial disclosures'
      ]
    },
    {
      id: 'commercial-contracts',
      pillarId: 'regulatory-commercial-advisory',
      category: 'Regulatory & Commercial Advisory',
      name: 'Commercial Contracts & Negotiation',
      tagline: 'Drafting, reviewing, and negotiating agreements that manage performance and risk.',
      desc: 'We draft, review and negotiate commercial agreements that define deliverables, allocate responsibilities and establish how parties manage performance and risk.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Master Services Agreements (MSAs), SOWs, and Service-Level Agreements (SLAs)',
        'Supplier, consultancy, professional services and outsourcing agreements',
        'Software, SaaS and technology licensing agreements',
        'NDAs, confidentiality, partnership, JV, and distribution agreements',
        'Contract mark-ups, issues lists, proposed amendments & alternative terms'
      ]
    },
    {
      id: 'privacy-data-protection',
      pillarId: 'regulatory-commercial-advisory',
      category: 'Regulatory & Commercial Advisory',
      name: 'Privacy, Data Protection & Website Documentation',
      tagline: 'Privacy notices, DPAs, terms of use and information handling procedures.',
      desc: 'We advise on privacy and data protection matters and prepare documentation reflecting how businesses collect information, deliver services and interact with customers.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Privacy notices, privacy policies, and cookie consent wording',
        'Website terms of use, acceptable use policies, and customer disclosures',
        'Data Processing Agreements (DPAs) & data-sharing agreements',
        'Confidentiality and international information-handling documentation'
      ]
    },
    {
      id: 'contract-templates-governance',
      pillarId: 'regulatory-commercial-advisory',
      category: 'Regulatory & Commercial Advisory',
      name: 'Contract Templates & Corporate Governance Documentation',
      tagline: 'Reusable legal documents, board resolutions and approval matrices.',
      desc: 'We develop reusable legal documents and governance materials that support consistent contracting, clear authority and documented business decisions.',
      jurisdictions: ['Australia', 'United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Standard contract templates and clause libraries',
        'Contract review checklists and approval matrices',
        'Board resolutions and delegated authority documentation',
        'Internal contracting procedures and governance documentation'
      ]
    },

    // Pillar 3: Accounting & Finance
    {
      id: 'bookkeeping-accounting',
      pillarId: 'accounting-finance',
      category: 'Accounting & Finance',
      name: 'Bookkeeping & Accounting Support',
      tagline: 'Accurate record keeping, ledgers, reconciliations and month-end closes.',
      desc: 'We record, classify and reconcile business transactions, maintaining accurate accounting records supported by clear documentation.',
      jurisdictions: ['United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Sales and purchase ledger maintenance & AP/AR records',
        'Bank, credit card, and balance sheet reconciliations',
        'Income, expenditure and transaction coding & expense documentation',
        'General ledger maintenance, month-end journals, accruals and prepayments',
        'Investigation of unreconciled items & supporting accounting schedules'
      ]
    },
    {
      id: 'financial-reporting',
      pillarId: 'accounting-finance',
      category: 'Accounting & Finance',
      name: 'Financial Reporting & Management Accounts',
      tagline: 'Management accounts, cash flow reporting, budgets and KPI packs.',
      desc: 'We prepare financial reports and management accounts that explain profitability, cash flow and financial position.',
      jurisdictions: ['United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Monthly and quarterly management accounts & reporting packs',
        'Profit and loss statements, balance sheets and supporting schedules',
        'Cash flow reporting, budget-to-actual comparisons and variance analysis',
        'Accounts receivable and accounts payable ageing reports & KPI metrics',
        'Year-end accounting schedules and financial reporting support'
      ]
    },
    {
      id: 'accounting-cleanup',
      pillarId: 'accounting-finance',
      category: 'Accounting & Finance',
      name: 'Accounting Clean-Up & Reconciliation',
      tagline: 'Resolving historical discrepancies, unreconciled balances and backlogs.',
      desc: 'We help businesses address incomplete records, unresolved balances and accumulated bookkeeping backlogs.',
      jurisdictions: ['United Kingdom', 'Pakistan', 'European Union'],
      keyPoints: [
        'Reviewing historical ledger entries and reconciling control accounts',
        'Correcting transaction classifications and preparing supporting schedules',
        'Identifying discrepancies and organising records into a consistent base',
        'Improving month-end procedures and reporting formats'
      ]
    }
  ];

  const filteredServices = detailedServices.filter(s => {
    if (selectedPillarId === 'all') return true;
    return s.pillarId === selectedPillarId;
  });

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Layers className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY PRACTICE AREAS</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Our Services & Offerings
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          EagleComply combines financial crime compliance, regulatory and commercial advisory, and accounting and finance expertise. Explore our core practice pillars and detailed service offerings below.
        </p>
      </div>

      {/* 3 Core Pillars Showcase Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicePillars.map((p) => {
            const isSelected = selectedPillarId === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPillarId(isSelected ? 'all' : p.id)}
                className={`p-6 sm:p-8 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#091F5C] dark:bg-[#0F1E38] text-white border-[#334DAF] shadow-xl' 
                    : 'glass-panel border-surface-border bg-surface-raised hover:border-[#334DAF]'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#334DAF]/10 text-[#334DAF]'}`}>
                      Pillar Focus
                    </span>
                    <span className={`text-[10px] font-mono ${isSelected ? 'text-blue-200' : 'text-slate-500'}`}>
                      {p.jurisdictions.join(' · ')}
                    </span>
                  </div>
                  <h3 className={`text-xl font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {p.name}
                  </h3>
                  <p className={`text-xs leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-600 dark:text-slate-300'}`}>
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold">
                  <span>{isSelected ? 'Viewing Filtered Services' : 'Filter by Pillar'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-2 border-b border-surface-border pb-4">
          <button
            onClick={() => setSelectedPillarId('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
              selectedPillarId === 'all'
                ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C]'
                : 'bg-surface-raised border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
            }`}
          >
            All Services ({detailedServices.length})
          </button>
          {servicePillars.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPillarId(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedPillarId === p.id
                  ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C]'
                  : 'bg-surface-raised border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Services Grid (Using New Institutional Compliance Card Design) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((serv) => {
            const IconComponent = serv.pillarId === 'accounting-finance' 
              ? Landmark 
              : serv.pillarId === 'regulatory-commercial-advisory' 
                ? Scale 
                : ShieldCheck;

            return (
              <ComplianceCard
                key={serv.id}
                uniqueId={serv.id}
                category={serv.category}
                categoryIcon={IconComponent}
                jurisdictions={serv.jurisdictions}
                title={serv.name}
                desc={serv.desc}
                deliverablesTitle="Key Scope & Deliverables"
                deliverables={serv.keyPoints.slice(0, 3)}
                onDetails={() => onNavigate('solution-detail', { id: serv.id })}
                detailsText="Detailed Specifications"
                onConsult={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
                consultText="Consult"
              />
            );
          })}
        </div>
      </div>

      {/* Consultation Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Need Tailored Compliance, Regulatory or Accounting Support?
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Share your business model, operating jurisdictions, and immediate goals. We scope custom engagements across framework design, licensing preparation, file remediation, contract negotiation and ongoing finance support.
          </p>
          <div className="pt-3">
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="px-8 py-3.5 rounded-xl bg-white text-[#091F5C] hover:bg-slate-100 font-bold text-xs shadow-md cursor-pointer transition-all"
            >
              Book an Initial Consultation
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
