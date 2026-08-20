import React, { useState } from 'react';
import { X, ShoppingBag, CheckCircle2, ShieldCheck, Download, CreditCard, Mail } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { sendInquiryToCompanyEmail, COMPANY_EMAIL } from '../../utils/contactDispatcher';

export default function OrderServiceModal({ isOpen, onClose, preselectedResource }) {
  const { t, resources } = useLanguage();
  const [selectedRes, setSelectedRes] = useState(preselectedResource || resources[0]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    sendInquiryToCompanyEmail({
      type: 'Compliance Toolkit & Dossier Order',
      email: orderDetails.email,
      company: orderDetails.company,
      service: selectedRes?.title,
      notes: `Tier: ${orderDetails.licenseTier}, Delivery: ${orderDetails.deliveryMethod}`
    });
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div 
        className="w-full max-w-xl bg-surface-raised border border-surface-border rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 bg-surface-subtle border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#334DAF]/10 dark:bg-[#7096D1]/15 border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center text-[#334DAF] dark:text-[#7096D1]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-sans tracking-tight text-lg font-bold text-slate-900 dark:text-white">
                {m.orderTitle || 'Compliance Toolkit & Dossier Ordering'}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {m.orderSubtitle || 'Instant delivery of audit-tested regulatory packages'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-slate-200">
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
                {m.orderSuccessTitle || 'Dossier Ready For Download'}
              </h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                {m.orderSuccessDesc || 'Your license key and authenticated SHA-256 verification hash have been generated and dispatched to your corporate inbox.'}
              </p>
              <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border max-w-md mx-auto text-left rtl:text-right text-xs font-mono">
                <div className="text-[#334DAF] dark:text-[#7096D1] font-bold mb-1">{selectedRes?.title}</div>
                <div className="text-slate-500">Tier: {orderDetails.licenseTier}</div>
                <div className="text-slate-500">Hash: 8f9b2c4e1a0d7f3e8b4a...</div>
              </div>
              <div className="pt-4 flex justify-center">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md"
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <span>{comm.confirm || 'Authorize & Dispatch Package'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
