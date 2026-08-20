import React, { useState } from 'react';
import { X, Calculator, ShieldCheck, CheckCircle2, ArrowRight, ArrowLeft, Building2, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { sendInquiryToCompanyEmail, generateMailtoLink, COMPANY_EMAIL } from '../../utils/contactDispatcher';

export default function RequestQuoteModal({ isOpen, onClose }) {
  const { t, solutions, industries, countries } = useLanguage();
  const { requestQuote } = useData();
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdQuote, setCreatedQuote] = useState(null);

  const [quoteForm, setQuoteForm] = useState({
    serviceId: solutions[0]?.id || 'ai-governance-advisory',
    industryId: industries[0]?.id || 'financial-services',
    jurisdictions: ['european-union'],
    entityCount: '1-5 Regulated Entities',
    timeline: '3-6 Months',
    budgetRange: '€30,000 - €60,000',
    contactName: '',
    workEmail: '',
    company: '',
    phone: '',
    projectScopeSummary: ''
  });

  if (!isOpen) return null;

  const m = t.modals || {};
  const comm = t.common || {};

  const toggleJurisdiction = (id) => {
    setQuoteForm(prev => ({
      ...prev,
      jurisdictions: prev.jurisdictions.includes(id)
        ? prev.jurisdictions.filter(j => j !== id)
        : [...prev.jurisdictions, id]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const q = requestQuote({
      clientName: quoteForm.contactName || 'Corporate Client',
      company: quoteForm.company || 'Enterprise Entity',
      email: quoteForm.workEmail,
      phone: quoteForm.phone,
      service: quoteForm.serviceId,
      industry: quoteForm.industryId,
      jurisdictions: quoteForm.jurisdictions,
      scopeBudget: quoteForm.budgetRange,
      timeline: quoteForm.timeline,
      scopeNotes: quoteForm.projectScopeSummary
    });
    sendInquiryToCompanyEmail({
      type: 'Statement of Work (SOW) Quote Request',
      clientName: quoteForm.contactName,
      email: quoteForm.workEmail,
      company: quoteForm.company,
      phone: quoteForm.phone,
      service: quoteForm.serviceId,
      budget: quoteForm.budgetRange,
      timeline: quoteForm.timeline,
      notes: quoteForm.projectScopeSummary
    });
    setCreatedQuote(q);
    setIsSuccess(true);
  };

  const resetAndClose = () => {
    setStep(1);
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-surface-raised border border-surface-border rounded-3xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 bg-surface-subtle border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center text-[#334DAF] dark:text-[#7096D1]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans tracking-tight text-lg font-bold text-slate-900 dark:text-white">
                {m.quoteTitle || 'Instant Statement of Work (SOW) Estimator'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {m.quoteSubtitle || 'Configure your institutional compliance scope and receive a verified engagement estimate.'}
              </p>
            </div>
          </div>
          <button onClick={resetAndClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-sans tracking-tight text-2xl font-bold text-slate-900 dark:text-white">
                {m.quoteGenerated || 'Statement of Work (SOW) Estimate Generated'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {m.quoteDesc || 'Your preliminary scope estimate has been logged with reference'}: <span className="font-mono font-bold text-[#334DAF] dark:text-[#7096D1]">{createdQuote?.id}</span>
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md"
                >
                  {comm.close || 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-surface-border pb-4 text-xs font-mono">
                {[
                  m.quoteStep1 || '1. Practice & Industry',
                  m.quoteStep2 || '2. Jurisdiction & Entities',
                  m.quoteStep3 || '3. Scope & Contact'
                ].map((st, i) => (
                  <span key={i} className={`font-semibold ${step === i + 1 ? 'text-[#334DAF] dark:text-[#7096D1] font-bold' : 'text-slate-400'}`}>
                    {st}
                  </span>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                      {m.selectPractice || 'Select Practice Area'}
                    </label>
                    <select
                      value={quoteForm.serviceId}
                      onChange={e => setQuoteForm({ ...quoteForm, serviceId: e.target.value })}
                      className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                    >
                      {(solutions || []).map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                      {m.selectIndustry || 'Select Primary Industry Vertical'}
                    </label>
                    <select
                      value={quoteForm.industryId}
                      onChange={e => setQuoteForm({ ...quoteForm, industryId: e.target.value })}
                      className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                    >
                      {(industries || []).map(ind => (
                        <option key={ind.id} value={ind.id}>{ind.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                      {m.targetJurisdictions || 'Target Jurisdictions'}
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {(countries || []).map(c => {
                        const isSelected = quoteForm.jurisdictions.includes(c.id);
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => toggleJurisdiction(c.id)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${isSelected ? 'bg-[#334DAF]/10 border-[#334DAF] text-[#334DAF] dark:text-[#7096D1]' : 'bg-surface-subtle border-surface-border text-slate-600 dark:text-slate-400'}`}
                          >
                            <span>{c.flag}</span>
                            <span className="truncate">{c.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                        {m.name || 'Full Legal Name'}
                      </label>
                      <input
                        type="text"
                        value={quoteForm.contactName}
                        onChange={e => setQuoteForm({ ...quoteForm, contactName: e.target.value })}
                        className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                        {m.email || 'Corporate Email'}
                      </label>
                      <input
                        type="email"
                        value={quoteForm.workEmail}
                        onChange={e => setQuoteForm({ ...quoteForm, workEmail: e.target.value })}
                        className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-surface-border">
                {step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-xl bg-surface-subtle border border-surface-border text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                    <span>{comm.back || 'Back'}</span>
                  </button>
                ) : <div />}

                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center gap-2"
                >
                  <span>{step === 3 ? (comm.confirm || 'Generate Estimate') : (comm.next || 'Next Step')}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
