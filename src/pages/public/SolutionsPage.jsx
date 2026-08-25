import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Scale, 
  FileText, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  Sparkles, 
  Layers, 
  Check, 
  Clock, 
  ChevronRight, 
  BookOpen, 
  Filter, 
  Shield, 
  FileCheck,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function SolutionsPage({ onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, solutions } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const iconMap = {
    ShieldCheck,
    Building2,
    Scale,
    FileText,
    Award,
    CheckCircle2,
    Lock,
    BookOpen,
    FileCheck,
    Shield
  };

  const solutionImages = {
    'financial-crime-compliance': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
    'enterprise-risk-assessments': `${import.meta.env.BASE_URL}assets/images/cyber-resilience.jpg`,
    'kyc-cdd-edd-frameworks': `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`,
    'customer-risk-rating-models': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
    'sanctions-compliance': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'transaction-monitoring': `${import.meta.env.BASE_URL}assets/images/blockchain-crypto.jpg`,
    'aml-audits-reviews': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'financial-crime-training': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'correspondent-banking-compliance': `${import.meta.env.BASE_URL}assets/images/fintech-banking.jpg`,
    'remittance-msb-compliance': `${import.meta.env.BASE_URL}assets/images/fintech-banking.jpg`,
    'fintech-crypto-compliance': `${import.meta.env.BASE_URL}assets/images/blockchain-nodes.jpg`,
    'regulatory-gap-assessments': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'regulatory-compliance': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'compliance-monitoring-programmes': `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`,
    'regulatory-change-management': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'risk-governance': `${import.meta.env.BASE_URL}assets/images/cyber-resilience.jpg`,
    'licensing-regulatory-applications': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'regulatory-research': `${import.meta.env.BASE_URL}assets/images/legal-library.jpg`,
    'compliance-manuals-sops': `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`,
    'outsourced-compliance-advisory': `${import.meta.env.BASE_URL}assets/images/team-boardroom.jpg`,
    'contract-compliance-review': `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`,
    'corporate-governance-documentation': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'legal-compliance': `${import.meta.env.BASE_URL}assets/images/legal-library.jpg`,
    'policy-drafting-manuals': `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`,
    'legal-regulatory-gap-analysis': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'corporate-compliance-frameworks': `${import.meta.env.BASE_URL}assets/images/team-boardroom.jpg`,
    'compliance-obligations-mapping': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
    'privacy-compliance-support': `${import.meta.env.BASE_URL}assets/images/cyber-resilience.jpg`
  };

  const getSolutionImage = (sol) => {
    if (solutionImages[sol.id]) return solutionImages[sol.id];
    if (sol.category === 'AML & Financial Crime') return `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`;
    if (sol.category === 'Regulatory Compliance') return `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`;
    if (sol.category === 'Legal & Corporate') return `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`;
    return `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`;
  };

  const sp = t.solutionsPage || {};

  const categories = [
    { id: 'all', label: `All Services (${(solutions || []).length})` },
    { id: 'financial-crime', label: `AML & Financial Crime (${(solutions || []).filter(s => s.category === 'AML & Financial Crime' || s.category?.includes('AML')).length})` },
    { id: 'regulatory', label: `Regulatory Compliance (${(solutions || []).filter(s => s.category === 'Regulatory Compliance' || s.category?.includes('Regulatory')).length})` },
    { id: 'legal', label: `Legal & Corporate (${(solutions || []).filter(s => s.category === 'Legal & Corporate' || s.category?.includes('Legal')).length})` }
  ];

  const filteredSolutions = (solutions || []).filter(s => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'financial-crime') return s.category === 'AML & Financial Crime' || s.id === 'financial-crime-compliance';
    if (selectedCategory === 'regulatory') return s.category === 'Regulatory Compliance' || s.id === 'regulatory-compliance' || s.id === 'risk-governance';
    if (selectedCategory === 'legal') return s.category === 'Legal & Corporate' || s.id === 'legal-compliance';
    return true;
  });

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{sp.tag || 'EAGLECOMPLY PRACTICE AREAS'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {sp.title || 'End-to-End Compliance & Advisory Services'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {sp.subtitle || 'From full AML/CFT program builds and licensing readiness dossiers to independent reviews and legal advisory, explore our structured practice areas.'}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#334DAF] text-white shadow-md'
                  : 'glass-panel border border-surface-border text-slate-700 dark:text-slate-300 hover:bg-surface-subtle'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Solutions Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((sol) => {
            const Icon = iconMap[sol.icon] || ShieldCheck;
            const imgUrl = getSolutionImage(sol);

            return (
              <div
                key={sol.id}
                onClick={() => onNavigate('solution-detail', { id: sol.id })}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-2xl text-left rtl:text-right"
              >
                {/* Visual Header Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={sol.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[#334DAF] dark:text-[#D0E4FE] border border-surface-border font-bold">
                      {sol.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 rtl:right-auto rtl:left-4 w-10 h-10 rounded-2xl bg-surface-raised/90 backdrop-blur-md text-[#334DAF] dark:text-[#7096D1] border border-surface-border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                      {sol.category}
                    </span>
                    <h3 className="font-sans text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] transition-colors line-clamp-1">
                      {sol.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
                    {sol.valueProp}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-surface-border/70">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                      <span>{sp.coreDeliverables || 'Core Deliverables:'}</span>
                      <span className="text-[10px] text-sky-500 font-normal">{(sol.deliverables || sol.scope || []).length} modules</span>
                    </div>
                    <ul className="space-y-1">
                      {(sol.deliverables || sol.scope || []).slice(0, 4).map((sc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-bold text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {sp.explorePractice || 'Explore Practice Area'} <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Consultation CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#132759] text-white border border-[#1E3778] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-left rtl:text-right">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
              {sp.tailoredTag || 'TAILORED PRACTICE ENGAGEMENT'}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              {sp.tailoredTitle || 'Require a Multi-Jurisdiction Compliance Consultation or Practice Advisory?'}
            </h2>
            <p className="text-xs sm:text-sm text-blue-100/90 max-w-2xl leading-relaxed">
              {sp.tailoredDesc || 'Our Senior Directors and Compliance Counsel structure customized compliance architectures across AML, licensing, risk governance, and regulatory legal defense.'}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <button
              onClick={onOpenConsultation}
              className="px-6 py-3 rounded-full bg-[#334DAF] hover:bg-[#253982] text-white font-bold text-xs shadow-lg transition-all cursor-pointer"
            >
              {sp.bookConsultation || 'Book Partner Consultation'}
            </button>
          </div>
        </div>
      </section>

      {/* Detailed Service Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl glass-panel border border-surface-border shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              {sp.compareTitle || 'Service Comparison'}
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {sp.compareSubtitle || 'Institutional Deliverables by Practice Area'}
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left rtl:text-right text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-border text-slate-400 font-mono">
                  <th className="pb-3 font-bold uppercase">{sp.thPractice || 'Practice Area'}</th>
                  <th className="pb-3 font-bold uppercase">{sp.thStandards || 'Target Regulatory Standards'}</th>
                  <th className="pb-3 font-bold uppercase">{sp.thDeliverables || 'Key Deliverables'}</th>
                  <th className="pb-3 font-bold uppercase">{sp.thTimeline || 'Typical Lead Time'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-slate-700 dark:text-slate-300">
                {(sp.rows || [
                  { name: "AML & Financial Crime", standards: "FATF, EU 6AMLD, UK MLR, US BSA", deliverables: "AML Policy Manual, ML/TF Matrix, Screening Rules", timeline: "3–6 Weeks" },
                  { name: "Regulatory Licensing Readiness", standards: "FCA, PRA, CBUAE, DFSA, FSRA, BaFin, SBP", deliverables: "Complete Authorization Dossier, CMP, Governance Pack", timeline: "6–12 Weeks" },
                  { name: "Enterprise Risk & Governance", standards: "COSO ERM, ISO 31000, Basel Principles", deliverables: "Risk Appetite Statement, KRI Dashboard, Vendor Oversight", timeline: "4–8 Weeks" },
                  { name: "Legal & Corporate Regulatory", standards: "Cross-Border Directives, GDPR, MiCA, Consumer Rules", deliverables: "Legal Opinions, Terms of Service, DPA Addenda", timeline: "2–4 Weeks" },
                  { name: "Compliance & AML Training", standards: "FATF Rec 18, Supervisory Training Mandates", deliverables: "Role-Based Modules, Case Studies, Audit Logs", timeline: "1–2 Weeks" },
                  { name: "Independent AML/CFT Reviews", standards: "Supervisory Mandated Independent Audits", deliverables: "Assurance Report, Risk-Rated Findings, Roadmap", timeline: "3–5 Weeks" }
                ]).map((row, rIdx) => (
                  <tr key={rIdx}>
                    <td className="py-3.5 font-bold text-slate-900 dark:text-white">{row.name}</td>
                    <td className="py-3.5">{row.standards}</td>
                    <td className="py-3.5">{row.deliverables}</td>
                    <td className="py-3.5 font-mono">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
