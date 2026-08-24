import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle2, ShieldCheck, Download, CreditCard, Mail, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { sendInquiryToCompanyEmail, generateMailtoLink, COMPANY_EMAIL, UK_WHATSAPP_LINK } from '../../utils/contactDispatcher';
import { WhatsAppIcon } from '../common/ContactWorldMap';

export default function OrderServiceModal({ isOpen, onClose, preselectedResource }) {
  const { t, resources } = useLanguage();
  const [selectedRes, setSelectedRes] = useState(preselectedResource || resources[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    email: '',
    company: '',
    deliveryMethod: 'Encrypted Vault Download',
    licenseTier: 'Single Entity Enterprise License'
  });

  if (!isOpen) return null;

  const m = t.modals || {};
  const comm = t.common || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await sendInquiryToCompanyEmail({
      type: 'Compliance Toolkit & Dossier Order',
      email: orderDetails.email,
      company: orderDetails.company,
      service: selectedRes?.title,
      notes: `Tier: ${orderDetails.licenseTier}, Delivery: ${orderDetails.deliveryMethod}`
    });
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
      <div 
        className="w-full max-w-xl max-h-[92vh] flex flex-col bg-surface-raised border border-surface-border rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="shrink-0 p-4 sm:p-5 bg-surface-subtle border-b border-surface-border flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center text-[#334DAF] dark:text-[#7096D1] shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="font-sans tracking-tight text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
                {m.orderTitle || 'Compliance Toolkit & Dossier Ordering'}
              </h3>
              <p className="text-xs text-slate-500 truncate">
                {m.orderSubtitle || 'Instant delivery of audit-tested regulatory packages'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-xl bg-surface-base hover:bg-surface-raised text-slate-500 hover:text-slate-900 dark:hover:text-white border border-surface-border transition-colors cursor-pointer shrink-0 ml-2"
            title="Close modal"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-sans tracking-tight text-2xl font-bold text-slate-900 dark:text-white">
                {m.orderSuccessTitle || 'Dossier Order Dispatched'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {m.orderSuccessDesc || 'Your request has been transmitted directly to EagleComply Counsel at'} <strong className="text-[#334DAF] dark:text-[#7096D1]">{COMPANY_EMAIL}</strong>.
              </p>
              <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border max-w-md mx-auto text-left rtl:text-right text-xs font-mono">
                <div className="text-[#334DAF] dark:text-[#7096D1] font-bold mb-1">{selectedRes?.title}</div>
                <div className="text-slate-500">Tier: {orderDetails.licenseTier}</div>
                <div className="text-slate-500">Recipient: {orderDetails.email}</div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={UK_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-full bg-surface-subtle text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-surface-raised border border-surface-border"
                >
                  {comm.close || 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                  {comm.resources || 'Selected Toolkit / Dossier'}
                </label>
                <div className="p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs font-semibold text-slate-800 dark:text-slate-200">
                  {selectedRes?.title}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 mb-2">
                  {m.email || 'Corporate Work Email'}
                </label>
                <input
                  type="email"
                  required
                  value={orderDetails.email}
                  onChange={e => setOrderDetails({ ...orderDetails, email: e.target.value })}
                  className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Order to Counsel...</span>
                  </>
                ) : (
                  <span>{comm.confirm || 'Authorize & Dispatch Package'}</span>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
