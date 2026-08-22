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
  Filter
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
    CheckCircle2
  };

  const solutionImages = {
    'financial-crime-compliance': `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`,
    'regulatory-compliance': `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
    'risk-governance': `${import.meta.env.BASE_URL}assets/images/cyber-resilience.jpg`,
    'legal-compliance': `${import.meta.env.BASE_URL}assets/images/law-justice.jpg`,
    'compliance-training': `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
    'compliance-reviews': `${import.meta.env.BASE_URL}assets/images/global-earth.jpg`
  };

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'financial-crime', label: 'AML/CFT & Financial Crime' },
    { id: 'regulatory', label: 'Regulatory Compliance' },
    { id: 'risk', label: 'Risk & Governance' },
    { id: 'legal', label: 'Legal Advisory' }
  ];

  const filteredSolutions = (solutions || []).filter(s => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'financial-crime') return s.id.includes('financial') || s.id.includes('training') || s.id.includes('reviews');
    if (selectedCategory === 'regulatory') return s.id.includes('regulatory');
    if (selectedCategory === 'risk') return s.id.includes('risk');
    if (selectedCategory === 'legal') return s.id.includes('legal');
    return true;
  });

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY PRACTICE AREAS</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          End-to-End Compliance & Advisory Services
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From full AML/CFT program builds and licensing readiness dossiers to independent reviews and legal advisory, explore our structured practice areas.
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
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

      {/* Solutions Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((sol) => {
            const Icon = iconMap[sol.icon] || ShieldCheck;
            const imgUrl = solutionImages[sol.id] || `${import.meta.env.BASE_URL}assets/images/ai-matrix.jpg`;

            return (
              <div
                key={sol.id}
                onClick={() => onNavigate('solution-detail', { id: sol.id })}
                className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-md hover:shadow-2xl"
              >
                {/* Visual Header Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={sol.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-surface-raised/90 backdrop-blur-md text-[#334DAF] dark:text-[#D0E4FE] border border-surface-border font-bold">
                      {sol.badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-4 w-10 h-10 rounded-2xl bg-surface-raised/90 backdrop-blur-md text-[#334DAF] dark:text-[#7096D1] border border-surface-border flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
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
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      Core Scope Elements:
                    </div>
                    <ul className="space-y-1">
                      {sol.scope.slice(0, 3).map((sc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{sc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                    <span className="text-xs font-bold text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {t.solutionsPage.inspect} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Service Comparison Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="p-8 rounded-3xl glass-panel border border-surface-border shadow-xl space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
              Service Comparison
            </span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Institutional Deliverables by Practice Area
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-surface-border text-slate-400 font-mono">
                  <th className="pb-3 font-bold uppercase">Practice Area</th>
                  <th className="pb-3 font-bold uppercase">Target Regulatory Standards</th>
                  <th className="pb-3 font-bold uppercase">Key Deliverables</th>
                  <th className="pb-3 font-bold uppercase">Typical Lead Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{t.pillars.p1_title}</td>
                  <td className="py-3.5">FATF Recommendations, 6AMLD, UK MLR, US BSA</td>
                  <td className="py-3.5">AML Policy Manual, ML/TF Matrix, Screening Rules</td>
                  <td className="py-3.5 font-mono">3–6 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">Regulatory Licensing Readiness</td>
                  <td className="py-3.5">FCA, CBUAE, DFSA, FSRA, MAS, SBP</td>
                  <td className="py-3.5">Complete Authorization Dossier, CMP, Governance Pack</td>
                  <td className="py-3.5 font-mono">6–12 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">Enterprise Risk & Governance</td>
                  <td className="py-3.5">COSO ERM, ISO 31000, Basel Principles</td>
                  <td className="py-3.5">Risk Appetite Statement, KRI Dashboard, Vendor Oversight</td>
                  <td className="py-3.5 font-mono">4–8 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{t.pillars.p4_title}</td>
                  <td className="py-3.5">Cross-Border Directives, GDPR, MiCA, Consumer Rules</td>
                  <td className="py-3.5">Legal Opinions, Terms of Service, DPA Addenda</td>
                  <td className="py-3.5 font-mono">2–4 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">Compliance & AML Training</td>
                  <td className="py-3.5">FATF Rec 18, Supervisory Training Mandates</td>
                  <td className="py-3.5">Role-Based Modules, Case Studies, Audit Logs</td>
                  <td className="py-3.5 font-mono">1–2 Weeks</td>
                </tr>
                <tr>
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">Independent AML/CFT Reviews</td>
                  <td className="py-3.5">Supervisory Mandated Independent Audits</td>
                  <td className="py-3.5">Assurance Report, Risk-Rated Findings, Roadmap</td>
                  <td className="py-3.5 font-mono">3–5 Weeks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
