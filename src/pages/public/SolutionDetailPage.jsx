import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Globe2, 
  Check,
  Scale,
  Landmark,
  Layers,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Breadcrumbs from '../../components/common/Breadcrumbs';
import { servicePillars, solutions as fallbackSolutions } from '../../data/complianceData';

export default function SolutionDetailPage({ params, onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  const requestedId = params?.id || 'compliance-frameworks';

  // 1. Check if ID matches a core service pillar
  const matchedPillar = servicePillars.find(p => p.id === requestedId);

  // 2. Check if ID matches one of the detailed subservices inside pillars
  let matchedSubservice = null;
  let parentPillar = null;

  for (const pillar of servicePillars) {
    const found = pillar.detailedSections?.find(sec => sec.id === requestedId);
    if (found) {
      matchedSubservice = found;
      parentPillar = pillar;
      break;
    }
  }

  // 3. Fallback to existing solutions in complianceData
  const legacySolution = fallbackSolutions.find(s => s.id === requestedId) || fallbackSolutions[0];

  // Resolve active entity data
  const title = matchedSubservice?.title || matchedPillar?.name || legacySolution?.name;
  const category = parentPillar?.name || matchedPillar?.name || legacySolution?.category || 'Regulatory Practice';
  const heading = matchedPillar?.heading || parentPillar?.heading || legacySolution?.valueProp;
  const description = matchedSubservice?.desc || matchedPillar?.overview || legacySolution?.shortDesc;
  const jurisdictions = parentPillar?.jurisdictions || matchedPillar?.jurisdictions || ['Australia', 'United Kingdom', 'Pakistan', 'European Union'];
  const bulletItems = matchedSubservice?.items || legacySolution?.scope || [];
  const frameworks = matchedSubservice?.frameworks || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      <Breadcrumbs 
        items={[
          { label: 'Services', route: 'solutions' },
          { label: title }
        ]} 
        onNavigate={onNavigate} 
      />

      {/* Hero Header */}
      <div className="py-8 border-b border-surface-border mb-12 text-left rtl:text-right">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
            {category}
          </span>
          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/30">
            {jurisdictions.join(' · ')}
          </span>
        </div>

        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white max-w-4xl">
          {title}
        </h1>

        {heading && (
          <p className="text-base sm:text-lg text-[#334DAF] dark:text-[#7096D1] font-sans font-medium mt-3 max-w-4xl">
            {heading}
          </p>
        )}

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 max-w-4xl leading-relaxed whitespace-pre-line font-normal">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button
            onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
            className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-lg hover:shadow-[#334DAF]/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Partner Consultation</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3 rounded-xl border border-surface-border text-slate-800 dark:text-slate-200 font-semibold text-xs hover:bg-surface-subtle transition-all cursor-pointer"
          >
            Enquire About This Service
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Detailed Service Scope & Bullets */}
        <div className="lg:col-span-8 space-y-10 text-left rtl:text-right">
          
          {/* Detailed Bullet Points / Service Items */}
          {bulletItems.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Detailed Scope of Services & Deliverables
              </h2>
              <div className="space-y-3">
                {bulletItems.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-surface-raised border border-surface-border flex items-start gap-3 shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* International Standards & Frameworks if applicable */}
          {frameworks.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-surface-border">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Applicable International Standards & National Legislation
              </h2>
              <div className="space-y-4">
                {frameworks.map((fw, fIdx) => (
                  <div key={fIdx} className="p-5 rounded-2xl bg-surface-subtle border border-surface-border space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#334DAF]" />
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {fw.jurisdiction}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
                      {fw.details}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* If viewing a high-level Pillar, show its detailed subsections */}
          {matchedPillar?.detailedSections && (
            <div className="space-y-6 pt-4 border-t border-surface-border">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Detailed Subsections & Offerings
              </h2>
              <div className="space-y-6">
                {matchedPillar.detailedSections.map((sec) => (
                  <div key={sec.id} className="p-6 rounded-2xl glass-panel border border-surface-border space-y-3 bg-surface-raised">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {sec.desc}
                    </p>
                    {sec.items && (
                      <ul className="space-y-1.5 pt-2">
                        {sec.items.map((it, iIdx) => (
                          <li key={iIdx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Sidebar: Jurisdictions & Consultation Intake Card */}
        <div className="lg:col-span-4 space-y-6 text-left rtl:text-right">
          
          <div className="p-6 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4 bg-surface-raised">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] block">
              Supported Jurisdictions
            </span>
            <div className="space-y-2">
              {jurisdictions.map((jur, jIdx) => (
                <div key={jIdx} className="p-3 rounded-xl bg-surface-subtle border border-surface-border flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{jur}</span>
                  <Globe2 className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" />
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Cross-border engagements are scoped around your activity, customer base, regulatory perimeter and professional requirements.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white shadow-xl space-y-4">
            <h3 className="text-lg font-bold">
              Book a Consultation
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Start with the business model, jurisdiction and outcome you need to achieve. An initial consultation is used to understand the issue and define the scope of specialist support required.
            </p>
            <button
              onClick={() => onOpenConsultation ? onOpenConsultation() : onNavigate('contact')}
              className="w-full py-3 rounded-xl bg-white text-[#091F5C] hover:bg-slate-100 font-bold text-xs shadow-md transition-all cursor-pointer text-center"
            >
              Book a Consultation
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
