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
  const f = t.footer;

  return (
    <footer className="w-full bg-[#091F5C] dark:bg-[#101E42] text-slate-300 border-t border-[#1E3778] pt-14 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Practice Locations Bar */}
        <div className="mb-10 pb-6 border-b border-[#1E3778] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Globe2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-blue-200">
              Operational Locations & Desks:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-medium text-white">
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3778]/80 hover:bg-[#1E3778] border border-blue-400/25 shadow-sm transition-all text-left">
              <span>🇬🇧</span>
              <span><strong>United Kingdom</strong></span>
            </button>
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3778]/80 hover:bg-[#1E3778] border border-blue-400/25 shadow-sm transition-all text-left">
              <span>🇮🇹</span>
              <span><strong>Italy</strong></span>
            </button>
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E3778]/80 hover:bg-[#1E3778] border border-blue-400/25 shadow-sm transition-all text-left">
              <span>🇵🇰</span>
              <span><strong>Pakistan</strong></span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-[#1E3778]">
          
          {/* Col 1 & 2: Brand & Identity */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <EagleLogo forceWhite={true} className="h-10 md:h-12 lg:h-14 w-auto" />
            </div>
            <div className="text-xs font-mono text-[#D0E4FE] font-bold tracking-wide">
              {t.brand.subphrase}
            </div>
            <p className="text-xs text-blue-100/80 leading-relaxed max-w-sm">
              {t.brand.tagline}
            </p>
            <p className="text-[11px] text-blue-200/70 leading-relaxed max-w-sm">
              {f.footerBody}
            </p>
            
            {/* Direct Contact Action Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://wa.me/447706413233"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md hover:scale-[1.02] transition-all"
                title="Direct WhatsApp Contact UK"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp (UK)</span>
              </a>
              <a
                href="https://wa.me/393488184787"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium shadow-md hover:scale-[1.02] transition-all"
                title="Direct WhatsApp Contact Italy"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white" />
                <span>WhatsApp (Italy)</span>
              </a>
              <a
                href="mailto:info@eaglecomply.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3778]/80 hover:bg-[#1E3778] text-white text-xs font-medium border border-blue-400/25 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-blue-300" />
                <span>info@eaglecomply.com</span>
              </a>
              <a
                href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1E3778]/80 hover:bg-[#1E3778] text-white text-xs font-medium border border-blue-400/25 transition-colors"
              >
                <LinkedInIcon className="w-3.5 h-3.5 text-blue-300" />
                <span>LinkedIn</span>
              </a>
            </div>
            <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              UK • Italy • Pakistan
            </div>
          </div>

          {/* Col 3: Services / Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {f.solutions}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'financial-crime-compliance' })} className="hover:text-white transition-colors text-left">
                  AML & Financial Crime
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'regulatory-compliance' })} className="hover:text-white transition-colors text-left">
                  Regulatory Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'risk-governance' })} className="hover:text-white transition-colors text-left">
                  Enterprise Risk & Governance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'legal-compliance' })} className="hover:text-white transition-colors text-left">
                  Legal & Corporate Compliance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'compliance-training' })} className="hover:text-white transition-colors text-left">
                  Compliance & AML Training
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solution-detail', { id: 'compliance-reviews' })} className="hover:text-white transition-colors text-left">
                  Independent Reviews & Audits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Industries & Insights */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {f.industriesInsights}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('industry-detail', { id: 'banking' })} className="hover:text-white transition-colors text-left">
                  Banking & Credit Institutions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry-detail', { id: 'fintech' })} className="hover:text-white transition-colors text-left">
                  FinTech & Digital Challengers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry-detail', { id: 'payments' })} className="hover:text-white transition-colors text-left">
                  Payment Service Providers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry-detail', { id: 'remittance-msb' })} className="hover:text-white transition-colors text-left">
                  Remittance & MSBs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('industry-detail', { id: 'digital-assets' })} className="hover:text-white transition-colors text-left">
                  Crypto & Blockchain
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blogs')} className="hover:text-white transition-colors text-left">
                  Compliance Blogs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              {f.company}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors text-left">
                  {f.about}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('team')} className="hover:text-white transition-colors text-left">
                  Compliance Leadership
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('faqs')} className="hover:text-white transition-colors text-left">
                  Compliance FAQs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors text-left">
                  {f.contact}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors text-left">
                  Privacy & Data Governance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-white transition-colors text-left">
                  Terms & Disclaimers
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Streamlined Disclaimers Note in Natural Sequence */}
        <div className="py-4 border-b border-[#1E3778]/50 text-[10px] sm:text-[11px] text-blue-200/60 leading-relaxed space-y-1">
          <p>
            <strong className="text-amber-300 font-semibold">Statutory Disclaimers:</strong> We do not provide financial promotion in the UK. We do not provide accountancy and tax services.
          </p>
          <p>
            <strong>Professional Advisory Notice:</strong> EagleComply is an independent regulatory compliance, risk management, and legal advisory consultancy. Materials on eaglecomply.com are provided for informational and educational purposes only and do not constitute formal legal or financial advice without an executed bilateral engagement agreement.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/60">
          <div>
            © 2026 EagleComply. All rights reserved. {f.website}
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
              <span>WhatsApp UK <strong></strong></span>
            </a>
            <a 
              href="https://wa.me/393488184787" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              title="Chat on WhatsApp (Italy)"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Italy <strong></strong></span>
            </a>
            <a 
              href="mailto:info@eaglecomply.com" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-blue-300" />
              <span>info@eaglecomply.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/company/eaglecomply/?viewAsMember=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <LinkedInIcon className="w-3.5 h-3.5 text-blue-300" />
              <span>{f.linkedin || 'LinkedIn'}</span>
            </a>
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-blue-200">
              <Lock className="w-3.5 h-3.5" /> {f.secureComms}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
