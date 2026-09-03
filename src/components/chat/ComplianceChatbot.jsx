import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, ArrowRight, RotateCcw, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

function FormattedMessage({ text }) {
  if (!text) return null;
  const lines = text.split('\n');
  return (
    <div className="space-y-1.5 leading-relaxed text-xs">
      {lines.map((line, idx) => {
        if (!line.trim()) return <div key={idx} className="h-1" />;
        
        // If line starts with bullet
        if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
          const content = line.trim().replace(/^[•\-]\s*/, '');
          const bulletParts = content.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-bold text-black dark:text-white dark:text-amber-300">{part.slice(2, -2)}</strong>;
            }
            return part;
          });
          return (
            <div key={idx} className="flex items-start gap-1.5 pl-1.5">
              <span className="text-[#E31F1F] dark:text-amber-400 font-bold shrink-0 mt-0.5">•</span>
              <span className="flex-1">{bulletParts}</span>
            </div>
          );
        }

        // Standard line with potential **bold** markers
        const parts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={pIdx} className="font-bold text-black dark:text-white dark:text-amber-300">{part.slice(2, -2)}</strong>;
          }
          return part;
        });

        return <p key={idx}>{parts}</p>;
      })}
    </div>
  );
}

export default function ComplianceChatbot({ onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, language, solutions = [], industries = [], regulations = [], countries = [], experts = [] } = useLanguage();
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  const initialGreeting = "Hello! I am your AI Assistant. How can I help you today?\n\nYou can ask me about our compliance services, regulatory requirements (such as MiCA, DORA, EU AI Act, AML/CFT, ESG), or about our expert team members and who specializes in each area.";

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: initialGreeting
      }
    ]);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open]);

  const generateAnswer = (rawQuery) => {
    const q = rawQuery.trim().toLowerCase();

    // 1. Greetings & Casual Messages
    if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening|day)|salam|hola|howdy|sup|yo)\b/i.test(q) || q === 'hi' || q === 'hello') {
      return {
        text: "Hello! I'm your AI Assistant at EagleComply. How can I assist you today?\n\nYou can ask me about our compliance services, regulatory advisory, licensing solutions, or introduce you to our expert team members and who specializes in each service."
      };
    }

    if (/how\s*are\s*you|how\s*r\s*u|how\s*do\s*you\s*do/i.test(q)) {
      return {
        text: "I am doing great, thank you! I am here and ready to help you navigate compliance, licensing, financial crime risk, and regulatory matters. How can I help you today?"
      };
    }

    if (/who\s*are\s*you|what\s*are\s*you|what\s*is\s*your\s*name/i.test(q)) {
      return {
        text: "I am EagleComply's AI Compliance & Regulatory Assistant. I have complete knowledge of our resident experts, practice areas, compliance services, and global regulatory frameworks. How can I assist you?"
      };
    }

    if (/^(thanks|thank\s*you|thx|cheers|appreciated|great\s*thanks|ok\s*thanks)/i.test(q)) {
      return {
        text: "You're very welcome! If you have any other questions about compliance, our team, or need to schedule a consultation with our experts, just let me know.",
        actions: [{ label: 'Book a Consultation', action: 'consultation' }]
      };
    }

    // 2. Specific Team Member Inquiries
    // Shan Ali
    if (/shan|shan\s*ali/i.test(q)) {
      return {
        text: "**Shan Ali** is our **Legal, Regulatory and Commercial Advisor** with over 8 years of international experience in the UK, EU (Italy, Switzerland, Finland), and Pakistan.\n\n**Core Practice Areas & Specialisms:**\n• FinTech & Financial Services Regulation\n• Crypto, Blockchain, DeFi & DAO Regulation\n• EU Digital Regulations (MiCA, DORA, EU AI Act)\n• Corporate & Commercial Law, Contract Drafting & Negotiation\n• Regulatory Strategy, Licensing & Market Entry\n• Corporate Governance & Risk Management\n• Cross-Border Advisory\n\n**Credentials:** PhD Candidate in Law (EU Blockchain Finance), LL.M. with Distinction & Gold Medal, Licensed Advocate.",
        actions: [{ label: 'Book Consultation with Shan Ali', action: 'consultation' }]
      };
    }

    // Muhammad Shahid
    if (/shahid|muhammad\s*shahid/i.test(q)) {
      return {
        text: "**Muhammad Shahid** is our **Compliance & Financial Crime Professional** with 17+ years of extensive experience across banking, fintech, digital finance, and financial services.\n\n**Core Practice Areas & Specialisms:**\n• AML/CFT Compliance & Program Development\n• KYC, CDD & Enhanced Due Diligence (EDD)\n• Enterprise AML/CTF Risk Assessments (EWRA)\n• Sanctions & PEP Compliance\n• Transaction Monitoring & Suspicious Activity Reviews (SAR/STR)\n• Regulatory Compliance & Advisory\n• Compliance Policies, Procedures & Control Frameworks\n• Compliance Gap Assessments & Remediation\n• Fintech, Payments & Digital Finance Compliance\n• AML/CFT & Regulatory Compliance Training\n\n**Credentials:** Globally Certified KYC Specialist (GO-AKS), Associate Chartered Banker (ACBI UK), Associate of the Institute of Bankers Pakistan (AIBP).",
        actions: [{ label: 'Book Consultation with Muhammad Shahid', action: 'consultation' }]
      };
    }

    // Zahid Munir
    if (/zahid|zahid\s*munir/i.test(q)) {
      return {
        text: "**Zahid Munir** is our **Chartered Accountant, ESG & Sustainability Advisor** with extensive experience in accounting, audit, taxation, financial advisory, corporate governance, and sustainability, including Big Four experience at EY (Ernst & Young).\n\n**Core Practice Areas & Specialisms:**\n• Accounting, Audit and Assurance\n• Financial Advisory & Business Consulting\n• Taxation & Tax Advisory\n• ESG & Sustainability Reporting (CSRD, ISSB)\n• Green Finance & Climate Action\n• Corporate Governance & Risk Management\n• Sustainability & ESG Disclosures\n• Financial Reporting & IFRS\n• Accounting & Finance Research\n• Professional Mentoring & Education\n\n**Credentials:** FCA (ICAEW), FCCA (UK), FCPA Australia, Doctoral Researcher at Aston University.",
        actions: [{ label: 'Book Consultation with Zahid Munir', action: 'consultation' }]
      };
    }

    // Syed Anvar Hussain
    if (/anvar|syed\s*anvar|hussain/i.test(q)) {
      return {
        text: "**Syed Anvar Hussain** is our **Director Regulatory Compliance** leading cross-border regulatory structuring and multi-jurisdictional licensing.\n\n**Core Practice Areas & Specialisms:**\n• Multi-Jurisdictional Licensing (UK FCA, EU, DIFC/ADGM, APAC)\n• Regulatory Compliance Frameworks & Governance\n• Supervisory Audit Readiness & Defense\n• Cross-Border Financial Services Compliance Architecture",
        actions: [{ label: 'Book Consultation with Syed Anvar', action: 'consultation' }]
      };
    }

    // 3. Team Overview Query ("Who is in your team?", "Tell me about the team")
    if (/team|who\s*works|directors|partners|advisors|practitioners|staff|who\s*is\s*on\s*the\s*team|leaders/i.test(q)) {
      return {
        text: "EagleComply's practice is led by experienced resident directors and specialists:\n\n• **Shan Ali** — Legal, Regulatory and Commercial Advisor (FinTech/Crypto/DeFi/DAOs, EU MiCA/DORA/AI Act, Contracts, Market Entry)\n• **Muhammad Shahid** — Compliance & Financial Crime Professional (17+ yrs in AML/CFT, KYC/CDD/EDD, Sanctions, EWRA, Transaction Monitoring, AML Training)\n• **Zahid Munir** — Chartered Accountant, ESG & Sustainability Advisor (FCA, FCCA, FCPA, Aston PhD Researcher; Accounting, Audit, Tax, ESG/Sustainability Reporting, Green Finance, IFRS)\n• **Syed Anvar Hussain** — Director Regulatory Compliance (Multi-jurisdictional licensing in UK FCA/EU/MENA, supervisory audits, compliance frameworks)\n\nWhich team member or practice area would you like to know more about?",
        actions: [
          { label: 'Explore Services', action: 'services' },
          { label: 'Book a Consultation', action: 'consultation' }
        ]
      };
    }

    // 4. "Who is professional in which service?" / "Who handles [Topic]?"
    // Crypto / Blockchain / Web3 / DAOs / Smart Contracts / AI Act / MiCA / DORA
    if (/(who.*(crypto|blockchain|web3|defi|dao|smart\s*contract|mica|token|ai\s*act|dora))|((crypto|blockchain|defi|dao|token|ai\s*act|dora).*(expert|professional|specialist|handle|lead|advisor))/i.test(q)) {
      return {
        text: "For **Crypto, Blockchain, DeFi, DAOs, Web3, and EU Tech Regulations (MiCA, DORA, EU AI Act)**, your dedicated lead advisor is **Shan Ali** (Legal, Regulatory and Commercial Advisor).\n\nShan advises digital asset founders, FinTechs, and regulated firms on regulatory structuring, CASP licensing under MiCA, DORA digital resilience compliance, smart contract legal terms, and cross-border market entry.",
        actions: [{ label: 'Book Consultation with Shan Ali', action: 'consultation' }]
      };
    }

    // AML / CFT / KYC / Sanctions / Financial Crime / EWRA / Transaction Monitoring
    if (/(who.*(aml|cft|kyc|cdd|edd|sanction|financial\s*crime|transaction\s*monitoring|ewra|pep))|((aml|cft|kyc|cdd|edd|sanction|financial\s*crime|transaction\s*monitoring|ewra).*(expert|professional|specialist|handle|lead|advisor))/i.test(q)) {
      return {
        text: "For **AML/CFT Compliance, KYC/CDD/EDD, Sanctions Screening, Transaction Monitoring, and Financial Crime Risk**, your dedicated lead professional is **Muhammad Shahid** (Compliance & Financial Crime Professional).\n\nWith 17+ years of experience across banking and fintech, Shahid designs bespoke AML/CFT programs, performs Enterprise ML/TF Risk Assessments (EWRA), transaction monitoring calibration, and regulatory gap remediation.",
        actions: [{ label: 'Book Consultation with Muhammad Shahid', action: 'consultation' }]
      };
    }

    // ESG / Sustainability / Accounting / Audit / Tax / Green Finance / IFRS
    if (/(who.*(esg|sustainability|green\s*finance|accounting|audit|tax|ifrs|climate))|((esg|sustainability|green\s*finance|accounting|audit|tax|ifrs|climate).*(expert|professional|specialist|handle|lead|advisor))/i.test(q)) {
      return {
        text: "For **Accounting, Audit, Corporate Tax, ESG, Sustainability Reporting, Green Finance, and IFRS Disclosures**, your dedicated advisor is **Zahid Munir** (Chartered Accountant, ESG & Sustainability Advisor).\n\nZahid (FCA ICAEW, FCCA UK, FCPA Australia, Aston University PhD Researcher) combines extensive accounting and Big Four (EY) experience with cutting-edge ESG/CSRD disclosure frameworks and green finance advisory.",
        actions: [{ label: 'Book Consultation with Zahid Munir', action: 'consultation' }]
      };
    }

    // Licensing / Market Entry
    if (/(who.*(license|licensing|authorization|market\s*entry|fca|fsa))|((license|licensing|market\s*entry).*(expert|professional|specialist|handle|lead|advisor))/i.test(q)) {
      return {
        text: "For **Regulatory Licensing & Market Entry** (UK FCA authorization, EU MiCA/PSD2 licensing, DIFC/ADGM setups), our practice is co-led by **Syed Anvar Hussain** (Director Regulatory Compliance) and **Shan Ali** (Legal & Regulatory Advisor).\n\nThey prepare complete authorization packs, supervisory business plans, threshold condition evidence, and manage direct regulatory liaison.",
        actions: [{ label: 'Book a Consultation', action: 'consultation' }]
      };
    }

    // 5. Specific Regulatory Framework Inquiries
    // EU AI Act
    if (/ai\s*act|artificial\s*intelligence\s*act|eu\s*ai/i.test(q)) {
      return {
        text: "The **EU AI Act** establishes a comprehensive, risk-based framework for artificial intelligence across the European Union:\n\n• **Prohibited AI**: Systems posing unacceptable risk (e.g. social scoring, manipulative AI) are banned.\n• **High-Risk AI**: Requires rigorous risk management, data governance, comprehensive technical documentation, continuous logging, human oversight, and conformity assessments.\n• **General-Purpose AI (GPAI)**: Mandates transparency, copyright policy compliance, and systemic risk evaluations.\n\nOur legal and tech governance lead, **Shan Ali**, guides AI developers and deployers through compliance classifications, impact assessments, and technical conformity.",
        actions: [{ label: 'Consult on EU AI Act', action: 'consultation' }]
      };
    }

    // MiCA
    if (/mica|markets\s*in\s*crypto/i.test(q)) {
      return {
        text: "**MiCA (Markets in Crypto-Assets)** provides a harmonized regulatory framework across the European Union for digital assets:\n\n• **Crypto-Asset Service Providers (CASPs)**: Requires EU authorization, minimum capital reserves, client fund segregation, and governance standards.\n• **Asset-Referenced Tokens (ARTs) & E-Money Tokens (EMTs)**: Strict reserve asset backing, liquidity requirements, and supervisory oversight.\n• **Standardized White Papers**: Mandatory pre-issuance disclosure documents with legal liability.\n\nOur digital asset lead, **Shan Ali**, assists crypto platforms, token issuers, and FinTechs with MiCA licensing packs, white paper legal reviews, and EU market passporting.",
        actions: [{ label: 'Consult on MiCA', action: 'consultation' }]
      };
    }

    // DORA
    if (/dora|digital\s*operational\s*resilience/i.test(q)) {
      return {
        text: "**DORA (Digital Operational Resilience Act)** sets binding ICT security and operational resilience rules for EU financial institutions:\n\n• **ICT Risk Management Framework**: Governance rules, threat detection, and continuous backup/recovery testing.\n• **Major Incident Reporting**: Fast-track classification and mandatory reporting to financial regulators.\n• **Digital Resilience Testing**: Routine vulnerability assessments and Threat-Led Penetration Testing (TLPT).\n• **Third-Party ICT Risk**: Strict contractual safeguards and oversight for cloud providers and critical software vendors.\n\nOur regulatory advisor, **Shan Ali**, leads DORA readiness gap assessments, ICT policy drafting, and third-party risk management frameworks.",
        actions: [{ label: 'Consult on DORA', action: 'consultation' }]
      };
    }

    // GDPR
    if (/gdpr|data\s*protection|privacy/i.test(q)) {
      return {
        text: "**GDPR & Data Protection Compliance** requires organizations processing personal data to maintain robust safeguards:\n\n• **Lawful Basis & Consent Management**: Valid processing justifications and clear consumer consent records.\n• **Data Protection Impact Assessments (DPIA)**: Mandatory for high-risk data processing operations.\n• **Data Processing Agreements (DPAs)**: Binding contractual standards between data controllers and processors.\n• **Cross-Border Transfers**: Standard Contractual Clauses (SCCs) and transfer impact assessments.\n\nOur legal team prepares complete data protection frameworks, DPA agreements, and privacy compliance architectures.",
        actions: [{ label: 'Consult on GDPR', action: 'consultation' }]
      };
    }

    // AML / CFT General Guidance
    if (/aml|cft|anti\s*money\s*laundering|counter\s*terrorist|kyc|cdd|edd|sanctions|pep|transaction\s*monitoring|ewra/i.test(q)) {
      return {
        text: "**Financial Crime Compliance (AML/CFT)** is essential for financial institutions, FinTechs, and regulated entities:\n\n• **Enterprise ML/TF Risk Assessments (EWRA)**: Quantifying inherent risks and control effectiveness.\n• **Customer Due Diligence (KYC/CDD/EDD)**: Risk-based onboarding, identity verification, and source of funds checks.\n• **Sanctions & PEP Screening**: Automated real-time screening against OFAC, UK OFSI, EU, and UN lists.\n• **Transaction Monitoring & SAR Reporting**: Rule calibration, false positive suppression, and suspicious activity reporting.\n\nOur AML/CFT practice is led by **Muhammad Shahid** (Compliance & Financial Crime Professional, 17+ yrs experience).",
        actions: [{ label: 'Consult on AML/CFT', action: 'consultation' }]
      };
    }

    // ESG / CSRD / Sustainability Guidance
    if (/esg|csrd|issb|sustainability|green\s*finance|climate|carbon/i.test(q)) {
      return {
        text: "**ESG & Sustainability Governance** integrates environmental, social, and corporate governance standards with financial strategy:\n\n• **Corporate Sustainability Reporting (CSRD & ISSB)**: Double materiality assessments, Scope 1-3 carbon accounting, and disclosure packs.\n• **Green Finance & Climate Action**: Aligning financing structures with green taxonomies and climate commitments.\n• **Governance & Board Oversight**: Establishing sustainable risk governance and ethical business practices.\n\nOur ESG and financial reporting practice is led by **Zahid Munir** (Chartered Accountant, FCA, FCCA, FCPA, Aston PhD Researcher).",
        actions: [{ label: 'Consult on ESG & Sustainability', action: 'consultation' }]
      };
    }

    // 6. Services & Practice Areas Inquiries
    if (/services|what\s*do\s*you\s*offer|what\s*do\s*you\s*do|solutions|help\s*my\s*business|how\s*can\s*you\s*help/i.test(q)) {
      return {
        text: "EagleComply provides regulator-grade compliance and advisory services across 8 core pillars:\n\n1. **Financial Crime Compliance & AML/CFT** — EWRA risk assessments, KYC/EDD frameworks, transaction monitoring (Lead: Muhammad Shahid)\n2. **Regulatory Licensing & Market Entry** — UK FCA, EU, and MENA authorization packs (Lead: Syed Anvar Hussain & Shan Ali)\n3. **Legal, Regulatory & Commercial Advisory** — Commercial agreements, FinTech structuring, tech governance (Lead: Shan Ali)\n4. **Accounting, Audit, ESG & Sustainability** — ESG strategy, CSRD/ISSB disclosures, taxation, IFRS (Lead: Zahid Munir)\n5. **Digital Asset, Crypto & Web3 Regulation** — MiCA licensing, token classification, DeFi compliance (Lead: Shan Ali)\n6. **Enterprise Risk Management & Governance** — Three Lines of Defense, risk appetite, board oversight\n7. **Independent Compliance Reviews & Health-Checks** — Mock supervisory audits, gap remediation\n8. **Compliance & AML Training** — Bespoke staff masterclasses and certifications (Lead: Muhammad Shahid & Shan Ali)\n\nWhich service area would you like to explore?",
        actions: [
          { label: 'Explore Services', action: 'services' },
          { label: 'Book a Consultation', action: 'consultation' }
        ]
      };
    }

    // 7. Contact & Consultation Inquiries
    if (/contact|email|phone|whatsapp|book|meeting|consultation|call|reach|talk/i.test(q)) {
      return {
        text: "You can easily connect directly with EagleComply:\n\n• **Email**: info@eaglecomply.com\n• **UK & Global (WhatsApp)**: +44 7706 413233\n• **Italy & EU (WhatsApp)**: +39 348 818 4787\n• **Direct Video Consultation**: You can book a consultation with our resident directors and counsel right here.",
        actions: [
          { label: 'Book a Consultation', action: 'consultation' }
        ]
      };
    }

    // 8. Dynamic Matching fallback based on site dataset
    const matchedService = solutions.find(s => q.includes(s.name.toLowerCase()) || (s.id && q.includes(s.id.toLowerCase())));
    if (matchedService) {
      return {
        text: `**${matchedService.name}** is one of EagleComply's core practice areas.\n\n${matchedService.valueProp || matchedService.shortDesc || 'Our practice provides regulator-grade framework development, statutory compliance reviews, and operational implementation.'}\n\nWould you like to discuss this service with our resident advisory team?`,
        actions: [
          { label: 'Explore Services', action: 'services' },
          { label: 'Book a Consultation', action: 'consultation' }
        ]
      };
    }

    // 9. Polite, intelligent fallback
    return {
      text: "I can help you with EagleComply's compliance services, regulatory requirements (such as MiCA, DORA, EU AI Act, AML/CFT, ESG, Licensing), or introduce you to our expert team members (**Shan Ali**, **Muhammad Shahid**, **Zahid Munir**, **Syed Anvar Hussain**).\n\nPlease let me know what topic you are interested in, or book a direct consultation with our advisory team.",
      actions: [
        { label: 'Explore Services', action: 'services' },
        { label: 'Book a Consultation', action: 'consultation' }
      ]
    };
  };

  const send = () => {
    if (!input.trim() || typing) return;
    const question = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: question }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = generateAnswer(question);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', ...reply }]);
      setTyping(false);
    }, 400);
  };

  const action = (a) => {
    if (a.action === 'consultation') onOpenConsultation?.();
    if (a.action === 'services') onNavigate?.('solutions');
  };

  return (
    <>
      {/* Brand Aligned AI Assistant Floating Button */}
      <button 
        onClick={() => setOpen(v => !v)} 
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-40 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-[#E31F1F] hover:bg-[#8F1524] dark:bg-[#030303] dark:hover:bg-[#70101C] text-white font-bold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border-2 border-[#E31F1F]/60 dark:border-[#FF3333]/50 cursor-pointer group select-none backdrop-blur-sm" 
        title={t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}
        aria-label="Open AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E31F1F] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E31F1F]"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-[#FF3333] group-hover:scale-110 transition-transform shrink-0" />
        <span className="font-bold tracking-wide text-white whitespace-nowrap">
          {t.modals?.chatButtonText || 'Ask AI Assistant'}
        </span>
      </button>

      {open && (
        <div className="fixed bottom-20 sm:bottom-22 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-100px)] bg-surface-raised border border-surface-border rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Chat Header with Company Logo */}
          <div className="p-3.5 sm:p-4 bg-surface-subtle border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-surface-base p-1 flex items-center justify-center border border-surface-border shrink-0 overflow-hidden shadow-xs">
                <img 
                  src={`${import.meta.env.BASE_URL}logo-light.png`}
                  alt="EagleComply" 
                  className="w-full h-full object-contain block dark:hidden"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}logo-dark.png`}
                  alt="EagleComply" 
                  className="w-full h-full object-contain hidden dark:block"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-black dark:text-white dark:text-white">{t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}</h4>
                <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  {t.common?.status || 'Online'} · AI Compliance Advisory
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setMessages([{ id: Date.now(), sender: 'bot', text: initialGreeting }])} 
                className="p-1.5 rounded-lg text-[#7D797A] hover:text-slate-700 dark:hover:text-white transition-colors" 
                title="Reset Conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setOpen(false)} 
                className="p-1.5 rounded-lg text-[#7D797A] hover:text-slate-700 dark:hover:text-white transition-colors" 
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-[#7D797A]">
                    <img 
                      src={`${import.meta.env.BASE_URL}logo-light.png`}
                      alt="Eagle" 
                      className="w-3.5 h-3.5 object-contain block dark:hidden inline-block shrink-0"
                    />
                    <img 
                      src={`${import.meta.env.BASE_URL}logo-dark.png`}
                      alt="Eagle" 
                      className="w-3.5 h-3.5 object-contain hidden dark:block inline-block shrink-0"
                    />
                    <span>EagleComply AI</span>
                  </div>
                )}
                <div className={`p-3 rounded-2xl max-w-[90%] ${msg.sender === 'user' ? 'bg-[#E31F1F] text-white rounded-br-none shadow-sm' : 'bg-surface-subtle border border-surface-border text-slate-800 dark:text-slate-200 rounded-bl-none shadow-xs'}`}>
                  <FormattedMessage text={msg.text} />
                </div>
                {msg.actions?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {msg.actions.map((a, i) => (
                      <button 
                        key={i} 
                        onClick={() => action(a)} 
                        className="px-2.5 py-1 rounded-lg bg-surface-base border border-surface-border hover:border-[#E31F1F] text-[11px] text-[#E31F1F] dark:text-[#FF3333] font-semibold flex items-center gap-1 shadow-2xs hover:scale-102 active:scale-98 transition-all cursor-pointer"
                      >
                        {a.label}
                        <ArrowRight className="inline w-3 h-3 rtl:rotate-180" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-[11px] text-[#7D797A] font-mono animate-pulse">
                <img 
                  src={`${import.meta.env.BASE_URL}logo-light.png`}
                  alt="Eagle" 
                  className="w-3.5 h-3.5 object-contain block dark:hidden inline-block shrink-0"
                />
                <img 
                  src={`${import.meta.env.BASE_URL}logo-dark.png`}
                  alt="Eagle" 
                  className="w-3.5 h-3.5 object-contain hidden dark:block inline-block shrink-0"
                />
                <span>Thinking...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-surface-border bg-surface-subtle flex items-center gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && send()} 
              placeholder={t.modals?.chatbotPlaceholder || 'Ask about Shan Ali, Shahid, Zahid, AML, MiCA, DORA, services...'} 
              className="flex-1 p-2.5 rounded-xl bg-surface-base border border-surface-border text-xs text-black dark:text-white dark:text-white outline-none focus:border-[#E31F1F]" 
            />
            <button 
              onClick={send} 
              className="p-2.5 rounded-xl bg-[#E31F1F] text-white hover:bg-[#B42318] transition-colors cursor-pointer"
              title="Send message"
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
