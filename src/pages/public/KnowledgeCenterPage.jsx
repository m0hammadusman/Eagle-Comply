import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Mail,
  Lock
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function KnowledgeCenterPage({ onNavigate, onOpenConsultation }) {
  const { t, resources } = useLanguage();
  const kc = t.knowledgeCenter || {};
  const [downloadModal, setDownloadModal] = useState(null);
  const [emailInput, setEmailInput] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadSubmit = (e) => {
    e.preventDefault();
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
      setDownloadModal(null);
      setEmailInput('');
    }, 2500);
  };

  return (
    <div className="w-full py-12 lg:py-16 space-y-12 animate-fade-in text-left rtl:text-right">
      {/* Header */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] text-xs font-mono font-bold tracking-wider uppercase border border-[#334DAF]/20 dark:border-[#7096D1]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>{kc.tag || 'EAGLECOMPLY RESOURCE CENTRE'}</span>
        </div>
        <h1 className="font-sans tracking-tight text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
          {kc.title || 'Practical Compliance Toolkits & Guides'}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {kc.subtitle || 'Download our expert checklists, policy templates, and regulatory readiness guides developed by experienced compliance practitioners.'}
        </p>
      </div>

      {/* Resources Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(resources || []).map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-2xl glass-panel border border-surface-border shadow-sm space-y-4 flex flex-col justify-between hover:border-[#334DAF] dark:hover:border-[#7096D1] transition-all text-left rtl:text-right"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                    {res.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-subtle text-slate-600 dark:text-slate-300 border border-surface-border font-bold">
                    {res.format}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-border flex items-center justify-between">
                <button
                  onClick={() => setDownloadModal(res)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] text-xs font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{kc.downloadBtn || 'Download Resource'}</span>
                </button>
                <button
                  onClick={onOpenConsultation}
                  className="text-xs font-bold text-[#334DAF] dark:text-[#7096D1] hover:underline cursor-pointer"
                >
                  {kc.requestAdvisory || 'Request Advisory'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lead Capture Modal for Resources */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-surface-raised border border-surface-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 text-left rtl:text-right">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#334DAF] dark:text-[#7096D1]">
                {kc.modalTitle || 'Download Resource'}
              </span>
              <button 
                onClick={() => setDownloadModal(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {downloadModal.title}
            </h3>

            {downloadSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold text-center space-y-1">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-1" />
                <div>{kc.modalSuccess || 'Thank you! Your download link has been dispatched to'} {emailInput}.</div>
              </div>
            ) : (
              <form onSubmit={handleDownloadSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {kc.modalPrompt || 'Please enter your business email to receive the direct download link and periodic regulatory updates.'}
                </p>
                <div>
                  <input
                    type="email"
                    required
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl glass-panel border border-surface-border text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#334DAF]"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                  <Lock className="w-3 h-3 text-[#334DAF] dark:text-[#7096D1]" />
                  <span>{kc.modalPrivacy || 'We respect your privacy. No spam. Unsubscribe anytime.'}</span>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#091F5C] dark:bg-[#334DAF] text-white text-xs font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{kc.modalSubmit || 'Get Instant Download'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
