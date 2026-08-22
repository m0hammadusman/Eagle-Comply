import React, { useMemo, useState } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronDown, ShieldCheck, Scale, Landmark,
  FileSearch, GraduationCap, BadgeCheck, Globe2
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import ComplianceShield3D from '../canvas/ComplianceShield3D';

const SERVICE_IMAGES = {
  aml: `${import.meta.env.BASE_URL}assets/images/case-study-bank.jpg`,
  regulatory: `${import.meta.env.BASE_URL}assets/images/governance-boardroom.jpg`,
  risk: `${import.meta.env.BASE_URL}assets/images/ai-governance.jpg`,
  legal: `${import.meta.env.BASE_URL}assets/images/law-statute.jpg`,
  training: `${import.meta.env.BASE_URL}assets/images/expert-thorne.jpg`,
  reviews: `${import.meta.env.BASE_URL}assets/images/legal-library.jpg`
};

export default function PageEnhancements({ route, onNavigate, onOpenConsultation }) {
  const { t, solutions, industries } = useLanguage();
  const e = t.experience || {};
  const [activeService, setActiveService] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const services = useMemo(() => (solutions || []).slice(0, 6).map((s, i) => ({
    ...s,
    image: SERVICE_IMAGES[['aml','regulatory','risk','legal','training','reviews'][i] || 'aml'],
    icon: [ShieldCheck, Landmark, Scale, FileSearch, GraduationCap, BadgeCheck][i] || ShieldCheck
  })), [solutions]);

  const faqs = [
    [e.faq1q, e.faq1a],
    [e.faq2q, e.faq2a],
    [e.faq3q, e.faq3a],
    [e.faq4q, e.faq4a]
  ].filter(([q, a]) => q && a);

  return (
    <div className="w-full overflow-hidden">
      <section className="py-16 lg:py-24 bg-surface-subtle border-y border-surface-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#334DAF] dark:text-[#7096D1]">
                {e.tag || 'ADVISORY EXPERIENCE'}
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
                {e.title || 'From Regulatory Complexity to Practical Action'}
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-7 text-slate-600 dark:text-slate-300 max-w-2xl">
                {e.subtitle || 'Explore the service architecture, delivery process, and common compliance questions that shape an effective engagement.'}
              </p>
              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {(e.steps || []).map((step, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-surface-raised border border-surface-border hover:-translate-y-1 transition-transform">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center text-[10px] font-bold">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-bold text-sm text-slate-900 dark:text-white">{step.title}</span>
                    </div>
                    <p className="mt-2 text-xs leading-5 text-slate-500 dark:text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative min-h-[340px] rounded-3xl eagle-pulse overflow-hidden border border-surface-border bg-[#091F5C] shadow-2xl">
                <img src={`${import.meta.env.BASE_URL}assets/images/global-earth.jpg`} alt="Global compliance advisory" className="absolute inset-0 w-full h-full object-cover opacity-45" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[#091F5C] via-[#091F5C]/70 to-transparent" />
                <div className="relative h-full min-h-[340px] flex items-center justify-center">
                  <div className="absolute top-5 right-5 text-white/50"><Globe2 className="w-10 h-10" /></div>
                  <div className="eagle-float"><ComplianceShield3D size={210} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#334DAF] dark:text-[#7096D1]">{e.servicesTag || 'SERVICE ARCHITECTURE'}</span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{e.servicesTitle || 'Integrated Compliance Services'}</h2>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{e.servicesSubtitle || 'Select a practice area to inspect its scope, typical deliverables and business value.'}</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 space-y-2">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <button key={service.id || i} onClick={() => setActiveService(i)}
                  className={`w-full text-left rtl:text-right p-4 rounded-2xl border transition-all flex items-center gap-3 ${activeService === i ? 'bg-[#334DAF] text-white border-[#334DAF] shadow-lg' : 'bg-surface-raised border-surface-border hover:border-[#334DAF]/50'}`}>
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeService === i ? 'bg-white/15' : 'bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1]'}`}><Icon className="w-5 h-5" /></span>
                  <span className="flex-1">
                    <span className="block font-bold text-sm">{service.name}</span>
                    <span className={`block mt-0.5 text-[11px] ${activeService === i ? 'text-white/75' : 'text-slate-500'}`}>{service.category || service.shortDesc}</span>
                  </span>
                  <ArrowRight className={`w-4 h-4 ${activeService === i ? 'text-white' : 'text-slate-400'} rtl:rotate-180`} />
                </button>
              );
            })}
          </div>

          {services[activeService] && (
            <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-surface-border bg-surface-raised shadow-xl">
              <div className="grid md:grid-cols-2 min-h-[330px]">
                <img src={(services[activeService].image||"").startsWith("/") ? import.meta.env.BASE_URL+(services[activeService].image||"").slice(1) : (services[activeService].image||"")} alt={services[activeService].name} className="w-full h-full min-h-[240px] object-cover" />
                <div className="p-7 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">{e.selected || 'SELECTED PRACTICE'}</span>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{services[activeService].name}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{services[activeService].valueProp || services[activeService].shortDesc}</p>
                  <div className="mt-5 space-y-2">
                    {(services[activeService].deliverables || ['Policies & procedures', 'Risk assessment framework', 'Testing and assurance', 'Management reporting']).slice(0, 4).map((x, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1] shrink-0" /> {x}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => onNavigate?.('solution-detail', { id: services[activeService].id })} className="mt-6 inline-flex items-center gap-2 text-xs font-bold text-[#334DAF] dark:text-[#7096D1]">
                    {e.explore || 'Explore Practice'} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-surface-subtle border-y border-surface-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#334DAF] dark:text-[#7096D1]">{e.faqTag || 'COMPLIANCE GUIDANCE'}</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">{e.faqTitle || 'Common Compliance Questions'}</h2>
          </div>
          <div className="mt-10 space-y-3">
            {faqs.map(([q, a], i) => (
              <div key={i} className="rounded-2xl border border-surface-border bg-surface-raised overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full p-5 text-left rtl:text-right flex items-center justify-between gap-4">
                  <span className="font-bold text-sm text-slate-900 dark:text-white">{q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#334DAF] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-sm leading-6 text-slate-600 dark:text-slate-300">{a}</div>}
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 rounded-3xl bg-[#091F5C] text-white flex flex-col md:flex-row items-center justify-between gap-5">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#D0E4FE]">{e.ctaTag || 'NEXT STEP'}</div>
              <h3 className="mt-1 text-xl font-bold">{e.ctaTitle || 'Need guidance on a compliance issue?'}</h3>
              <p className="mt-1 text-xs text-blue-100/75">{e.ctaDesc || 'Share your situation and discuss practical options with EagleComply.'}</p>
            </div>
            <button onClick={onOpenConsultation} className="px-5 py-3 rounded-xl bg-white text-[#091F5C] font-bold text-xs hover:scale-[1.02] transition-transform">
              {e.ctaBtn || 'Book a Consultation'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
