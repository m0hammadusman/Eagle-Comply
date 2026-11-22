import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  User, 
  Search,
  Calendar,
  Layers,
  Radio,
  Download
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { insightsCategories, insights as rawInsights, resources as rawResources } from '../../data/complianceData';

export default function InsightsPage({ params, onNavigate, onOpenConsultation }) {
  const { t } = useLanguage();
  
  // Active Category: 'all' | 'regulatory-updates' | 'articles-analysis' | 'guides-resources' | 'news-events'
  const [activeCategory, setActiveCategory] = useState(params?.category || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (params?.category) {
      setActiveCategory(params.category);
    }
  }, [params]);

  // Map authentic publications into the 4 scalable categories
  const publications = [
    {
      id: 'mastering-enterprise-mltf-risk-assessments',
      category: 'articles-analysis',
      categoryLabel: 'Articles & Analysis',
      title: 'Mastering Enterprise ML/TF Risk Assessments: A Practical Step-by-Step Guide',
      summary: 'How regulated financial institutions and fintechs can build defensible, risk-proportionate ML/TF risk assessment methodologies that satisfy supervisory inspections.',
      date: 'Specialist Commentary',
      readTime: '7 min read',
      tag: 'Financial Crime & AML'
    },
    {
      id: 'navigating-fintech-licensing-readiness',
      category: 'regulatory-updates',
      categoryLabel: 'Regulatory Updates',
      title: 'Navigating FinTech Licensing: Essential Steps to Regulatory Authorization',
      summary: 'From governance structures to operational resilience narratives, understand the core pillars required for a successful regulatory license application.',
      date: 'Supervisory Horizon',
      readTime: '9 min read',
      tag: 'FinTech Regulation'
    },
    {
      id: 'crypto-travel-rule-compliance-guide',
      category: 'regulatory-updates',
      categoryLabel: 'Regulatory Updates',
      title: 'Crypto Travel Rule Compliance: Practical Implementation for Digital Asset Businesses',
      summary: 'A deep dive into cross-border crypto payment transparency, VASP counterparty verification, and technical messaging protocol integration.',
      date: 'FATF Rec 16 & Transfer Regs',
      readTime: '8 min read',
      tag: 'Digital Assets & Crypto'
    },
    {
      id: 'building-effective-compliance-monitoring-programs',
      category: 'articles-analysis',
      categoryLabel: 'Articles & Analysis',
      title: 'Building an Effective Compliance Monitoring Program (CMP) for Regulated Entities',
      summary: 'How to move beyond static checklists to establish risk-weighted, continuous compliance testing that alerts management to emerging risks early.',
      date: 'Governance & Assurance',
      readTime: '6 min read',
      tag: 'Internal Controls'
    },
    {
      id: 'aml-risk-assessment-checklist',
      category: 'guides-resources',
      categoryLabel: 'Guides & Resources',
      title: 'Enterprise AML/CFT Risk Assessment Checklist & Control Matrix',
      summary: 'A comprehensive, practical checklist for evaluating institutional ML/TF risk across customers, products, delivery channels, and geographical jurisdictions.',
      date: 'Practical Toolkit',
      readTime: 'Downloadable Guide',
      tag: 'AML/CFT Readiness'
    },
    {
      id: 'regulatory-licensing-readiness-guide',
      category: 'guides-resources',
      categoryLabel: 'Guides & Resources',
      title: 'Payment Institution & FinTech Regulatory Perimeter Scoping Dossier',
      summary: 'Structured guidance on mapping business activities against authorization perimeters across the UK, EU, Australia, and GCC markets.',
      date: 'Implementation Resource',
      readTime: 'Practice Blueprint',
      tag: 'Licensing Preparation'
    },
    {
      id: 'firm-webinar-cross-border-transfers',
      category: 'news-events',
      categoryLabel: 'News & Events',
      title: 'EagleComply Professional Briefing: Navigating Cross-Border Regulatory Divergence',
      summary: 'Our practice leaders discuss supervisory expectations for cross-border payments, AML/CTF reforms in Australia, and the rollout of the EU Anti-Money Laundering Regulation.',
      date: 'Practice Dispatch',
      readTime: 'Webinar Briefing',
      tag: 'Speaking & Events'
    }
  ];

  const filteredPublications = publications.filter(pub => {
    const matchesCategory = activeCategory === 'all' || pub.category === activeCategory;
    const matchesSearch = !searchQuery || 
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedCategoryMeta = insightsCategories.find(c => c.id === activeCategory);

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>EAGLECOMPLY INSIGHTS</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Analysis, Guidance & Practice Updates
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          EagleComply Insights provides clear, practical analysis of developments affecting financial crime compliance, financial services, FinTech, digital assets, commercial arrangements and finance operations. The focus is on the business impact of regulatory change and the actions that management, compliance and finance teams need to understand.
        </p>
      </div>

      {/* 4 Category Descriptions Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {insightsCategories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(isSelected ? 'all' : cat.id)}
                className={`p-5 rounded-2xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#091F5C] dark:bg-[#0F1E38] text-white border-[#334DAF] shadow-lg'
                    : 'bg-surface-raised border-surface-border hover:border-[#334DAF]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${isSelected ? 'text-blue-200' : 'text-[#334DAF] dark:text-[#7096D1]'}`}>
                    {cat.badge}
                  </span>
                  <h3 className={`text-base font-bold ${isSelected ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {cat.name}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-3 leading-relaxed ${isSelected ? 'text-blue-100' : 'text-slate-600 dark:text-slate-400'}`}>
                    {cat.tagline}
                  </p>
                </div>
                <div className={`pt-3 mt-3 border-t text-[11px] font-semibold flex items-center justify-between ${isSelected ? 'border-white/20 text-white' : 'border-surface-border text-slate-500'}`}>
                  <span>{isSelected ? 'Selected' : 'Filter by category'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Category Description Banner (if selected) */}
      {selectedCategoryMeta && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 rounded-2xl bg-surface-subtle border border-surface-border text-left rtl:text-right space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#334DAF]" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                About {selectedCategoryMeta.name}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
              {selectedCategoryMeta.description}
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-surface-border pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                activeCategory === 'all'
                  ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C]'
                  : 'bg-surface-raised border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
              }`}
            >
              All Insights ({publications.length})
            </button>
            {insightsCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  activeCategory === c.id
                    ? 'bg-[#091F5C] dark:bg-[#7096D1] text-white dark:text-[#091F5C] border-[#091F5C]'
                    : 'bg-surface-raised border-surface-border text-slate-700 dark:text-slate-300 hover:border-[#334DAF]'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insights & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 rtl:pl-3 rtl:pr-9 pr-3 py-2 rounded-xl bg-surface-raised border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
            />
          </div>
        </div>
      </div>

      {/* Publications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredPublications.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No publications found matching your query.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPublications.map((pub) => (
              <div
                key={pub.id}
                onClick={() => onNavigate('article-detail', { id: pub.id })}
                className="p-6 sm:p-8 rounded-3xl glass-panel border border-surface-border shadow-md space-y-4 flex flex-col justify-between hover:border-[#334DAF] cursor-pointer transition-all bg-surface-raised text-left rtl:text-right group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1] px-2.5 py-0.5 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15">
                      {pub.categoryLabel}
                    </span>
                    <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {pub.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug group-hover:text-[#334DAF] dark:group-hover:text-[#7096D1] transition-colors">
                    {pub.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pub.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-surface-border flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500">
                    {pub.tag}
                  </span>
                  <span className="font-bold text-[#334DAF] dark:text-[#7096D1] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Read Briefing</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Consultation Banner */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#091F5C] to-[#1E3778] text-white space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold">
            Stay Ahead of Supervisory & Regulatory Horizons
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Discuss how pending regulatory updates across the UK, EU, Australia, or Pakistan will impact your business model, customer journeys, and compliance controls.
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
