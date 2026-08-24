import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, ArrowRight, RotateCcw, MessageSquare } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

const STOP = new Set(['the','and','for','with','what','how','does','can','help','about','your','from','into','this','that','are','is','to','of','a','an','in','on','do','i','we','me','my','please']);

function normalize(text) {
  return text.toLowerCase().replace(/[^\p{L}\p{N}\s/-]/gu, ' ').split(/\s+/).filter(x => x && !STOP.has(x));
}

export default function ComplianceChatbot({ onNavigate, onOpenConsultation, onOpenQuote }) {
  const { t, language, solutions = [], industries = [], regulations = [], countries = [] } = useLanguage();
  const { isDark } = useTheme();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);
  const chat = t.chatbot || {};

  const knowledge = useMemo(() => {
    const items = [];
    solutions.forEach(s => items.push({
      type: 'service', name: s.name, id: s.id,
      text: `${s.name} ${s.category || ''} ${s.shortDesc || ''} ${s.valueProp || ''} ${(s.scope || []).join(' ')}`
    }));
    industries.forEach(i => items.push({ type: 'industry', name: i.name, id: i.id, text: `${i.name} ${i.heroTag || ''} ${i.overview || ''}` }));
    regulations.forEach(r => items.push({ type: 'regulation', name: r.name, id: r.id, text: `${r.name} ${r.jurisdiction || ''} ${r.shortDesc || ''} ${r.penalties || ''}` }));
    countries.forEach(c => items.push({ type: 'jurisdiction', name: c.name, id: c.id, text: `${c.name} ${c.overview || ''} ${(c.authorities || []).join(' ')}` }));
    return items;
  }, [solutions, industries, regulations, countries]);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'bot',
        text: chat.greet || 'Hello! I am EagleComply’s AI Regulatory Assistant. How can I assist you with financial crime, licensing, or corporate compliance today?'
      }
    ]);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, typing, open]);

  const answer = (query) => {
    const words = normalize(query);
    if (!words.length) {
      return { text: chat.clarify || 'Please specify a jurisdiction, regulation, or compliance topic so I can guide you.' };
    }

    const scored = knowledge.map(k => {
      const targetWords = normalize(k.text);
      let score = 0;
      words.forEach(w => {
        if (targetWords.includes(w)) score += 2;
        else if (targetWords.some(tw => tw.includes(w) || w.includes(tw))) score += 1;
      });
      return { ...k, score };
    }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

    let best = scored[0];

    const qLower = query.toLowerCase();
    const wantsAml = /aml|cft|money laundering|terrorist|kyc|cdd|edd|sanction|transaction monitor/i.test(qLower);
    const wantsLicence = /license|licensing|authorisation|authorization|application|sandbox/i.test(qLower);
    const wantsRisk = /risk|governance|three lines|framework|appetite|operational risk/i.test(qLower);
    const wantsLegal = /legal|contract|dpa|gdpr|corporate|opinion|memorandum|dispute/i.test(qLower);
    const wantsTraining = /training|course|workshop|staff|masterclass|certification/i.test(qLower);
    const wantsReview = /review|audit|health-check|healthcheck|gap analysis|independent/i.test(qLower);

    if (!best && (wantsRisk || wantsLegal || wantsTraining || wantsReview || wantsLicence || wantsAml)) {
      best = { type: 'service', name:
        wantsAml ? (solutions.find(s => /financial|aml|crime/i.test(s.name))?.name) :
        wantsLicence ? (solutions.find(s => /regulatory/i.test(s.name))?.name) :
        wantsRisk ? (solutions.find(s => /risk|governance/i.test(s.name))?.name) :
        wantsLegal ? (solutions.find(s => /legal/i.test(s.name))?.name) :
        wantsTraining ? (solutions.find(s => /training/i.test(s.name))?.name) :
        wantsReview ? (solutions.find(s => /review/i.test(s.name))?.name) : null
      };
    }

    if (!best) {
      return { text: `${chat.noMatch || 'I can help with EagleComply services and compliance guidance.'} ${chat.disclaimer || ''}`, actions: [
        { label: chat.consult || 'Book a Consultation', action: 'consultation' }
      ]};
    }

    let text = `${chat.service || 'The most relevant EagleComply practice is'} ${best.name}.`;
    if (best.text) {
      const source = knowledge.find(x => x.name === best.name);
      if (source?.type === 'service') {
        const s = solutions.find(x => x.id === source.id);
        if (s?.valueProp || s?.shortDesc) text += ` ${s.valueProp || s.shortDesc}`;
      } else if (source?.type === 'industry') {
        const i = industries.find(x => x.id === source.id);
        if (i?.overview) text += ` ${i.overview}`;
      } else if (source?.type === 'regulation') {
        const r = regulations.find(x => x.id === source.id);
        if (r?.shortDesc) text += ` ${r.shortDesc}`;
      } else if (source?.type === 'jurisdiction') {
        const c = countries.find(x => x.id === source.id);
        if (c?.overview) text += ` ${c.overview}`;
      }
    }
    text += ` ${chat.guidance || ''} ${chat.disclaimer || ''}`;

    return {
      text,
      actions: [
        ...(best.type === 'service' ? [{ label: chat.services || 'Explore Services', action: 'services' }] : []),
        { label: chat.consult || 'Book a Consultation', action: 'consultation' }
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
      const reply = answer(question);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', ...reply }]);
      setTyping(false);
    }, 450);
  };

  const action = (a) => {
    if (a.action === 'consultation') onOpenConsultation?.();
    if (a.action === 'quote') onOpenQuote?.();
    if (a.action === 'services') onNavigate?.('solutions');
  };

  return (
    <>
      {/* Horizontal Golden AI Assistant Floating Button - Lower Side */}
      <button 
        onClick={() => setOpen(v => !v)} 
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-40 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-gradient-to-r from-[#FDE68A] via-[#D4AF37] to-[#B8860B] text-[#091F5C] font-extrabold text-xs sm:text-sm shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2.5 border-2 border-white/40 dark:border-amber-200/60 cursor-pointer group select-none backdrop-blur-sm" 
        title={t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}
        aria-label="Open AI Assistant"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#091F5C] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#091F5C]"></span>
        </span>
        <MessageSquare className="w-4 h-4 text-[#091F5C] group-hover:scale-110 transition-transform shrink-0" />
        <span className="font-extrabold tracking-wide text-[#091F5C] whitespace-nowrap">
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
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}</h4>
                <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  {t.common?.status || 'Online'} · AI Compliance Advisory
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMessages([{ id: Date.now(), sender: 'bot', text: chat.greet || 'Hello! I am EagleComply’s AI Regulatory Assistant. How can I assist you with financial crime, licensing, or corporate compliance today?' }])} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors" title="Reset Conversation"><RotateCcw className="w-4 h-4" /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors" title="Close"><X className="w-4 h-4" /></button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {msg.sender === 'bot' && (
                  <div className="flex items-center gap-1.5 mb-1 text-[10px] font-mono text-slate-400">
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
                <div className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${msg.sender === 'user' ? 'bg-[#334DAF] text-white rounded-br-none shadow-sm' : 'bg-surface-subtle border border-surface-border text-slate-800 dark:text-slate-200 rounded-bl-none shadow-xs'}`}>{msg.text}</div>
                {msg.actions?.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">{msg.actions.map((a,i) => <button key={i} onClick={() => action(a)} className="px-2.5 py-1 rounded-lg bg-surface-base border border-surface-border hover:border-[#334DAF] text-[11px] text-[#334DAF] dark:text-[#7096D1] font-semibold">{a.label}<ArrowRight className="inline w-3 h-3 ml-1 rtl:rotate-180" /></button>)}</div>}
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono animate-pulse">
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
                <span>Analyzing EagleComply regulatory knowledge base…</span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input Bar */}
          <div className="p-3 border-t border-surface-border bg-surface-subtle flex items-center gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t.modals?.chatbotPlaceholder || 'Ask about a compliance issue, service, regulation or jurisdiction…'} className="flex-1 p-2.5 rounded-xl bg-surface-base border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]" />
            <button onClick={send} className="p-2.5 rounded-xl bg-[#334DAF] text-white hover:bg-[#253982] transition-colors"><Send className="w-4 h-4 rtl:rotate-180" /></button>
          </div>
        </div>
      )}
    </>
  );
}
