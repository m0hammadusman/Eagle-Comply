import React from 'react';
import { 
  Building2, 
  Landmark, 
  Coins, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  Globe2, 
  CreditCard,
  Briefcase
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { industries as officialIndustries } from '../../data/complianceData';
import ComplianceCard from '../../components/common/ComplianceCard';

export default function IndustriesPage({ onNavigate }) {
  const { t } = useLanguage();

  const iconMap = {
    'fintech-payments': Zap,
    'banks-financial-institutions': Landmark,
    'remittance-money-services': Globe2,
    'digital-assets-crypto': Coins,
    'lending-credit': CreditCard,
    'professional-services': Briefcase
  };

  const primaryIndustries = officialIndustries.filter(ind => !ind.isAlias);

  return (
    <div className="w-full py-12 lg:py-16 space-y-16 animate-fade-in">
      
      {/* Header Banner */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <Building2 className="w-3.5 h-3.5" />
          <span>REGULATED INDUSTRY VERTICALS</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          Sectors We Support
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
          EagleComply works with sectors where financial crime controls, regulation, commercial relationships and finance operations are closely connected. Our sector approach reflects how the business makes money, serves customers, moves funds, uses third parties and meets its regulatory responsibilities.
        </p>
      </div>

      {/* Industries Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {primaryIndustries.map((ind) => {
            const Icon = iconMap[ind.id] || Building2;

            return (
              <ComplianceCard
                key={ind.id}
                uniqueId={`ind-${ind.id}`}
                category={ind.badge || 'Regulated Sector'}
                categoryIcon={Icon}
                jurisdictions="Global Practice Coverage"
                title={ind.name}
                desc={ind.desc}
                deliverablesTitle="Key Deliverables"
                deliverables={(ind.deliverables || []).slice(0, 3)}
                onDetails={() => onNavigate('industry-detail', { id: ind.id })}
                detailsText="Explore Sector Architecture"
                onConsult={() => onNavigate('contact')}
                consultText="Consult"
              />
            );
          })}
        </div>
      </div>

    </div>
  );
}
