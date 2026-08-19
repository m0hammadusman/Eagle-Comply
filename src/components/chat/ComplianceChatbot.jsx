import React, { useEffect, useMemo, useRef, useState } from 'react';
import { X, Send, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
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
    countries.forEach(c => items.push({ type: 'jurisdiction', name: c.name, id: c.id, text: `${c.name} ${c.region || ''} ${c.overview || ''} ${(c.keySectors || []).join(' ')}` }));
    return items;
  }, [solutions, industries, regulations, countries]);

  useEffect(() => {
    setMessages([{
      id: 1,
      sender: 'bot',
      text: chat.greet || 'Hello! I’m the EagleComply Assistant.',
      actions: [
        { label: chat.consult || 'Book a Consultation', action: 'consultation' },
        { label: chat.services || 'Explore Services', action: 'services' }
      ]
    }]);
  }, [language]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, open]);

  const answer = (question) => {
    const q = normalize(question);
    const qSet = new Set(q);

    let best = null, bestScore = 0;
    for (const item of knowledge) {
      const words = normalize(item.text);
      const score = words.reduce((sum, w) => sum + (qSet.has(w) ? 1 : 0), 0);
      if (score > bestScore) { bestScore = score; best = item; }
    }

    const topic = q.join(' ');
    const wantsRisk = /risk|governance|fraud|control|three lines|appetite/.test(topic);
    const wantsLegal = /legal|contract|privacy|law|advisory|document/.test(topic);
    const wantsTraining = /training|train|board|staff|education/.test(topic);
    const wantsReview = /review|audit|testing|assurance|gap|assessment/.test(topic);
    const wantsLicence = /licen|license|authorization|registration|regulator|permit|readiness/.test(topic);
    const wantsAml = /aml|cft|kyc|cdd|edd|sanction|pep|transaction|monitor|suspicious|financial crime|fraud/.test(topic);

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
      <button onClick={() => setOpen(v => !v)} className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-2xl hover:scale-105 transition-all border border-slate-200 overflow-hidden" title={t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}>
        <img src={isDark ? '/logo-light.png' : '/logo-dark.png'} alt="EagleComply AI Assistant" className="w-full h-full object-cover" />
      </button>

      {open && (
        <div className="fixed bottom-[88px] right-6 rtl:right-auto rtl:left-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-110px)] bg-surface-raised border border-surface-border rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          <div className="p-4 bg-surface-subtle border-b border-surface-border flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center"><Sparkles className="w-4 h-4" /></div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">{t.modals?.chatbotTitle || 'Eagle Regulatory Assistant'}</h4>
                <span className="text-[10px] text-emerald-500 font-mono">● {t.common?.status || 'Online'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setMessages([{ id: Date.now(), sender: 'bot', text: chat.greet || 'Hello!' }])} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"><RotateCcw className="w-4 h-4" /></button>
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"><X className="w-4 h-4" /></button>
            </div>
          </div>

          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${msg.sender === 'user' ? 'bg-[#334DAF] text-white rounded-br-none' : 'bg-surface-subtle border border-surface-border text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>{msg.text}</div>
                {msg.actions?.length > 0 && <div className="flex flex-wrap gap-1.5 mt-2">{msg.actions.map((a,i) => <button key={i} onClick={() => action(a)} className="px-2.5 py-1 rounded-lg bg-surface-base border border-surface-border hover:border-[#334DAF] text-[11px] text-[#334DAF] dark:text-[#7096D1] font-semibold">{a.label}<ArrowRight className="inline w-3 h-3 ml-1 rtl:rotate-180" /></button>)}</div>}
              </div>
            ))}
            {typing && <div className="text-[11px] text-slate-400 font-mono animate-pulse">Analyzing EagleComply knowledge base…</div>}
            <div ref={endRef} />
          </div>

          <div className="p-3 border-t border-surface-border bg-surface-subtle flex items-center gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder={t.modals?.chatbotPlaceholder || 'Ask about a compliance issue, service, regulation or jurisdiction…'} className="flex-1 p-2.5 rounded-xl bg-surface-base border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]" />
            <button onClick={send} className="p-2.5 rounded-xl bg-[#334DAF] text-white hover:bg-[#253982]"><Send className="w-4 h-4 rtl:rotate-180" /></button>
          </div>
        </div>
      )}
    </>
  );
}
