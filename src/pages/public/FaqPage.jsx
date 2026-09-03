import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  Search, 
  Mail, 
  MessageSquare, 
  Calendar, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Layers,
  FileText
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ALL_FAQS = [
  {
    category: "General & Institutional Advisory",
    items: [
      {
        q: "What types of institutions does EagleComply advise?",
        a: "EagleComply advises regulated financial institutions, tier-1/tier-2 banks, FinTech challengers, electronic money institutions (EMIs), payment service providers (PSPs), crypto asset service providers (CASPs), asset managers, and cross-border money service businesses (MSBs)."
      },
      {
        q: "Which regulatory jurisdictions do your practice directors cover?",
        a: "Our senior practitioners cover regulatory frameworks across the United Kingdom (FCA/PRA), European Union (BaFin, ACPR, CSSF, Bank of Italy under MiFID II, MiCA, and DORA), the Middle East (ADGM, DIFC/DFSA, CBUAE), and South Asia (SECP, SBP)."
      },
      {
        q: "How quickly can an advisory team be deployed to our firm?",
        a: "For urgent regulatory remediation, Section 166 reviews, or supervisory inquiries, our executive practice directors can deploy within 24 to 48 hours for immediate triage and regulatory liaison."
      },
      {
        q: "What is the difference between an independent review and a statutory audit?",
        a: "A statutory audit focuses primarily on financial statement veracity. An EagleComply independent compliance review specifically audits operational systems, AML/CFT controls, KYC/EDD workflows, regulatory reporting accuracy, and board governance against statutory regulations."
      }
    ]
  },
  {
    category: "AML/CFT & Financial Crime",
    items: [
      {
        q: "How do you evaluate and test AML/CFT compliance systems?",
        a: "We perform end-to-end testing of customer risk assessment (CRA) models, automated transaction monitoring rules, adverse media screening, PEP/Sanctions screening thresholds, and SAR/STR escalation workflows against FATF standards and local regulatory handbooks."
      },
      {
        q: "Can EagleComply calibrate transaction monitoring scenarios?",
        a: "Yes. We conduct quantitative tuning of transaction monitoring algorithms to reduce false positives by up to 65% while ensuring zero blind spots for typologies including layering, smurfing, and trade-based money laundering."
      },
      {
        q: "How do you handle Enhanced Due Diligence (EDD) on High-Risk Customers?",
        a: "We design bespoke EDD protocols that verify ultimate beneficial ownership (UBO) structures, establish documented Source of Wealth (SoW) and Source of Funds (SoF), and conduct multi-tier open-source intelligence (OSINT) investigations."
      },
      {
        q: "Do you assist with Section 166 (Skilled Person) remediation?",
        a: "Yes. We assist firms in addressing supervisory intervention notices, drafting comprehensive root-cause analysis reports, establishing remediation project management offices (PMO), and restoring regulator confidence."
      }
    ]
  },
  {
    category: "Regulatory Licensing & Authorizations",
    items: [
      {
        q: "What is the typical timeframe for acquiring an EMI, PI, or CASP license?",
        a: "Timeframes vary by jurisdiction. In the UK and EU, complete regulatory authorization typically requires between 6 and 12 months. EagleComply accelerates preparation by authoring all regulatory business plans, compliance manuals, and prudential capital forecasts."
      },
      {
        q: "Do you assist with Variation of Permission (VoP) applications?",
        a: "Yes. When expanding into new regulated activities, custody services, or product lines, we prepare the complete VoP dossier, risk assessments, and supplementary compliance policies required by regulators."
      },
      {
        q: "How do you prepare executive directors for regulatory interviews?",
        a: "We run simulated supervisory interview sessions with prospective SMF holders, MLROs, and Board Directors, assessing their technical comprehension of prudential requirements, regulatory conduct rules, and AML responsibilities."
      }
    ]
  },
  {
    category: "Digital Assets, MiCA & FinTech",
    items: [
      {
        q: "How does EagleComply help Crypto Asset Service Providers (CASPs) with MiCA?",
        a: "We assist CASPs with the Markets in Crypto-Assets (MiCA) regulation, authoring White Papers, establishing custody safeguards, implementing crypto travel rule compliance, and setting up token classification procedures."
      },
      {
        q: "What safeguarding audit services do you provide for PSPs and EMIs?",
        a: "We conduct statutory safeguarding reviews verifying that customer funds are segregated in designated accounts, reconciliation procedures meet statutory requirements, and wind-down plans are legally robust."
      }
    ]
  },
  {
    category: "Operational Resilience, DORA & Governance",
    items: [
      {
        q: "How do you prepare financial institutions for the EU DORA framework?",
        a: "We establish digital operational resilience frameworks, including ICT risk management architectures, third-party vendor risk management registers, incident reporting workflows, and threat-led penetration testing protocols."
      },
      {
        q: "Can EagleComply provide Outsourced MLRO or Senior Compliance Officers?",
        a: "Yes. We provide interim and secondment compliance leadership to bridge operational vacancies or provide executive oversight during major regulatory transitions."
      },
      {
        q: "How often should an institution update its Enterprise-Wide Risk Assessment (EWRA)?",
        a: "Regulators require EWRAs to be reviewed at least annually or immediately following material changes in business model, product rollouts, geographic expansion, or major regulatory amendments."
      }
    ]
  }
];

export default function FaqPage({ onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  const fq = t.faqPage || {};
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openItems, setOpenItems] = useState({});

  const categories = ['All', ...ALL_FAQS.map(c => c.category)];

  const toggleItem = (catIdx, itemIdx) => {
    const key = `${catIdx}-${itemIdx}`;
    setOpenItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = ALL_FAQS.map((cat, catIdx) => {
    if (selectedCategory !== 'All' && cat.category !== selectedCategory) {
      return null;
    }
    const matchingItems = cat.items.filter(item => {
      const matchSearch = searchTerm.toLowerCase();
      return (
        item.q.toLowerCase().includes(matchSearch) ||
        item.a.toLowerCase().includes(matchSearch)
      );
    });

    if (matchingItems.length === 0) return null;

    return {
      ...cat,
      catIdx,
      items: matchingItems
    };
  }).filter(Boolean);

  return (
    <div className="w-full py-12 lg:py-16 space-y-12 animate-fade-in">
      
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E31F1F]/10 dark:bg-[#FF3333]/15 text-[#E31F1F] dark:text-[#FF3333] text-xs font-mono font-bold tracking-wider uppercase border border-[#E31F1F]/20 dark:border-[#FF3333]/30">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{fq.tag || 'COMPLIANCE KNOWLEDGEBASE'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white dark:text-white">
          {fq.title || 'Frequently Asked Questions'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {fq.subtitle || 'Comprehensive answers to common regulatory, AML/CFT, statutory licensing, operational resilience, and institutional advisory questions.'}
        </p>

        {/* Search Input */}
        <div className="pt-4 max-w-xl mx-auto relative">
          <Search className="w-4 h-4 text-[#7D797A] absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={fq.searchPlaceholder || "Search compliance topics, AML, MiCA, Licensing, DORA..."}
            className="w-full pl-11 pr-4 rtl:pl-4 rtl:pr-11 py-3 rounded-2xl bg-surface-subtle border border-surface-border text-sm text-black dark:text-white dark:text-white placeholder-slate-400 focus:outline-none focus:border-[#E31F1F] transition-all shadow-sm"
          />
        </div>

        {/* Category Pills */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#E31F1F] text-white dark:bg-[#FF3333] dark:text-[#030303] shadow-sm'
                  : 'bg-surface-subtle text-slate-600 dark:text-slate-300 hover:bg-surface-raised border border-surface-border'
              }`}
            >
              {cat === 'All' ? (fq.allCategories || 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQs List Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-surface-border space-y-3">
            <HelpCircle className="w-8 h-8 text-[#7D797A] mx-auto" />
            <p className="text-sm font-bold text-black dark:text-white dark:text-white">{fq.noResults || 'No matching questions found'}</p>
            <p className="text-xs text-[#7D797A]">{fq.noResultsDesc || 'Try searching for a different keyword or view all categories.'}</p>
          </div>
        ) : (
          filteredCategories.map((catSection, cIndex) => (
            <div key={cIndex} className="space-y-4">
              <div className="flex items-center gap-2 border-b border-surface-border pb-2">
                <ShieldCheck className="w-4 h-4 text-[#E31F1F] dark:text-[#FF3333]" />
                <h2 className="text-base font-bold text-black dark:text-white dark:text-white uppercase tracking-wide font-mono text-xs">
                  {catSection.category}
                </h2>
              </div>

              <div className="space-y-3">
                {catSection.items.map((item, itemIdx) => {
                  const key = `${catSection.catIdx}-${itemIdx}`;
                  const isOpen = !!openItems[key];

                  return (
                    <div
                      key={itemIdx}
                      className="rounded-2xl border border-surface-border bg-surface-raised transition-all shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(catSection.catIdx, itemIdx)}
                        className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                      >
                        <span className="font-bold text-sm text-black dark:text-white dark:text-white">
                          {item.q}
                        </span>
                        <ChevronDown
                          className={`w-4 h-4 text-[#E31F1F] dark:text-[#FF3333] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {isOpen && (
                        <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 border-t border-surface-border/50 bg-surface-subtle/30 text-left rtl:text-right">
                          {item.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Query & Consultation Footer Prompt */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#E31F1F] via-[#131313] to-[#E31F1F] text-white shadow-2xl text-center space-y-5">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20">
              {fq.inquiryTag || 'DIRECT INQUIRY & SUPPORT'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold">
              {fq.inquiryTitle || 'If you have any other questions, send us your query.'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
              {fq.inquiryDesc || "Our practice directors and regulatory counsel are ready to review your firm's specific regulatory challenges, audit requirements, or license applications."}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#E31F1F] hover:bg-[#F5F3F2] font-bold text-xs shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>{fq.sendQuery || 'Send Query & Book Session'}</span>
            </button>

            <a
              href="mailto:info@eaglecomply.com"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-white hover:bg-white/25 font-bold text-xs transition-all shadow-md"
            >
              <Mail className="w-4 h-4" />
              <span>{fq.sendEmail || 'Send Us an Email'}</span>
            </a>

            <button
              onClick={() => onNavigate('contact')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 font-bold text-xs transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{fq.contactPage || 'Contact Page'}</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
