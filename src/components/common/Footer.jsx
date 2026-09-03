import React from 'react';
import { 
  Shield, 
  ShieldCheck,
  ArrowRight, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink,
  Globe2, 
  Lock,
  Sparkles,
  Scale
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import EagleLogo from './EagleLogo';

function LinkedInIcon({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg 
      className={className} 
      fill="currentColor" 
      viewBox="0 0 24 24" 
      aria-hidden="true"
      {...props}
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.66 1.66 0 0 0-1.67 1.66 1.67 1.67 0 0 0 1.67 1.67 1.67 1.67 0 0 0 1.67-1.67 1.66 1.66 0 0 0-1.67-1.66Z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-3.5 h-3.5", ...props }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...props}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.484-8.402" />
    </svg>
  );
}

export default function Footer({ onNavigate }) {
  const { t, solutions, industries } = useLanguage();
  const f = t.footer || {};

  return (
    <footer className="w-full bg-[#0A0A0A] dark:bg-[#030303] text-slate-300 border-t border-[#1E1E1E] pt-12 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Practice Locations Bar */}
        <div className="mb-8 pb-6 border-b border-[#1E1E1E] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-[#E31F1F] shrink-0" />
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-slate-200">
              {f.practiceDesks || 'Operational Locations & Presence:'}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium text-white">
            <button 
              onClick={() => onNavigate('contact')} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] hover:bg-[#1E1E1E] hover:border-[#E31F1F]/60 border border-white/10 shadow-xs transition-all text-left cursor-pointer"
            >
              <span>🇬🇧</span>
              <span><strong>{t.common?.uk || 'United Kingdom'}</strong></span>
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] hover:bg-[#1E1E1E] hover:border-[#E31F1F]/60 border border-white/10 shadow-xs transition-all text-left cursor-pointer"
            >
              <span>🇮🇹</span>
              <span><strong>{t.common?.italy || 'Italy'}</strong></span>
            </button>
            <button 
              onClick={() => onNavigate('contact')} 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141414] hover:bg-[#1E1E1E] hover:border-[#E31F1F]/60 border border-white/10 shadow-xs transition-all text-left cursor-pointer"
            >
              <span>🇵🇰</span>
              <span><strong>{t.common?.pakistan || 'Pakistan'}</strong></span>
            </button>
          </div>
        </div>

        {/* 5-Column High-Density Balanced Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-5 pb-8 border-b border-[#1E1E1E] items-start">
          
          {/* Col 1: Brand & Identity (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <EagleLogo forceWhite={true} className="h-9 md:h-10 w-auto" />
            </div>
            <div className="text-xs font-mono text-slate-200 font-bold tracking-wide">
              {t.brand?.subphrase || 'AML, Regulatory, Risk & Legal Compliance'}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {t.brand?.tagline || 'Complex Regulations. Clear Solutions. Confident Growth.'}
            </p>
            
            {/* Direct Contact Action Chips */}
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href="https://wa.me/447706413233"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-medium shadow-xs transition-all"
                title="Direct WhatsApp Contact UK"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp UK</span>
              </a>
              <a
                href="https://wa.me/393488184787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-medium shadow-xs transition-all"
                title="Direct WhatsApp Contact Italy"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 fill-white" />
                <span>WhatsApp IT</span>
              </a>
              <a
                href="mailto:info@eaglecomply.com"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#1E1E1E] text-slate-200 hover:text-white text-xs font-medium border border-white/10 hover:border-[#E31F1F]/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#E31F1F]" />
                <span>{f.emailDirect || 'Email Us'}</span>
              </a>
              <a
                href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#141414] hover:bg-[#1E1E1E] text-slate-200 hover:text-white text-xs font-medium border border-white/10 hover:border-[#E31F1F]/40 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-[#E31F1F]" />
                <span>LinkedIn</span>
              </a>
            </div>
            <div className="pt-1 text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.common?.uk || 'United Kingdom'} • {t.common?.italy || 'Italy'} • {t.common?.pakistan || 'Pakistan'}</span>
            </div>
          </div>

          {/* Col 2: Services & Solutions (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              {f.solutions || 'Our Services'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {(solutions || []).slice(0, 6).map((s) => (
                <li key={s.id}>
                  <button 
                    onClick={() => onNavigate('solution-detail', { id: s.id })} 
                    className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries & Insights (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              {f.industriesInsights || 'Industries & Insights'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              {(industries || []).slice(0, 5).map((ind) => (
                <li key={ind.id}>
                  <button 
                    onClick={() => onNavigate('industry-detail', { id: ind.id })} 
                    className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer"
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onNavigate('blogs')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  {t.nav?.insights || 'Compliance Insights'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Institutional Governance Policies (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              {f.governancePolicies || 'Governance & Policies'}
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-2 gap-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('legal', { section: 'dpa' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Data Processing (DPA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'idta' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Data Transfer (IDTA)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'data-protection' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Data Protection Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'privacy' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Privacy Notice
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'data-retention' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Data Retention
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'infosec' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Information Security
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'access-control' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Access Control
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'breach-response' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Incident Response
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'remote-working' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Remote Working
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal', { section: 'nda' })} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Confidentiality NDA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-2.5">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              {f.company || 'Company & Legal'}
            </h3>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  {f.about || 'About Us'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  Compliance FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer">
                  {f.contact || 'Contact Us'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors text-left truncate block max-w-full cursor-pointer text-slate-300">
                  Legal & Disclaimers
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Streamlined Disclaimers Note in Natural Sequence */}
        <div className="py-4 border-b border-[#1E1E1E]/50 text-xs text-slate-300 leading-relaxed space-y-1.5">
          <p>
            <strong className="text-amber-300 font-semibold">Statutory Disclaimers:</strong> We do not provide financial promotion in the UK. We do not provide accountancy and tax services.
          </p>
          <p>
            <strong className="text-slate-200">Professional Advisory Notice:</strong> EagleComply is an independent regulatory compliance, risk management, and legal advisory consultancy. Materials on eaglecomply.com are provided for informational and educational purposes only and do not constitute formal legal or financial advice without an executed bilateral engagement agreement.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
          <div>
            © 2026 EagleComply. All rights reserved. {f.website || 'www.eaglecomply.com'}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a 
              href="https://wa.me/447706413233" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title="Chat on WhatsApp (UK)"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp UK</span>
            </a>
            <a 
              href="https://wa.me/393488184787" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title="Chat on WhatsApp (Italy)"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Italy</span>
            </a>
            <a 
              href="mailto:info@eaglecomply.com" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFBEBE]" />
              <span>info@eaglecomply.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-[#FFBEBE]" />
              <span>{f.linkedin || 'LinkedIn'}</span>
            </a>
            <span className="flex items-center gap-1.5 text-xs text-slate-300">
              <Lock className="w-3.5 h-3.5 text-emerald-400" /> {f.secureComms || '256-Bit Encrypted'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
