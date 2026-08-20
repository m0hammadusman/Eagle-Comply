import React, { useMemo, useState } from 'react';
import { X, CalendarDays, Clock3, User, Building2, Mail, Globe2, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { sendInquiryToCompanyEmail, generateMailtoLink, COMPANY_EMAIL, UK_WHATSAPP_LINK } from '../../utils/contactDispatcher';

export default function ConsultationModal({ isOpen, onClose }) {
  const { t, solutions } = useLanguage();
  const { bookConsultation } = useData();
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(null);
  const [form, setForm] = useState({
    serviceId: solutions?.[0]?.id || 'financial-crime-compliance',
    date: '',
    time: '09:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    fullName: '',
    workEmail: '',
    company: '',
    country: '',
    requirement: ''
  });

  const m = t.modals || {};
  const comm = t.common || {};
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const slots = ['09:00','10:30','12:00','14:00','15:30','17:00'];

  if (!isOpen) return null;

  const update = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const next = () => {
    if (step === 1 && !form.serviceId) return;
    if (step === 2 && !form.date) return;
    if (step === 3) {
      if (!form.fullName || !form.workEmail || !form.company) return;
      const service = solutions.find(s => s.id === form.serviceId);
      const booking = bookConsultation({
        title: service?.name || 'Compliance Consultation',
        date: form.date,
        time: form.time,
        timezone: form.timezone,
        clientName: form.fullName,
        organization: form.company,
        email: form.workEmail,
        country: form.country,
        requirement: form.requirement,
        status: 'Consultation Requested'
      });
      sendInquiryToCompanyEmail({
        type: 'Consultation Booking',
        clientName: form.fullName,
        email: form.workEmail,
        company: form.company,
        jurisdiction: form.country,
        service: service?.name || form.serviceId,
        date: form.date,
        time: `${form.time} (${form.timezone})`,
        requirement: form.requirement
      });
      setSuccess(booking);
      return;
    }
    setStep(s => Math.min(3, s + 1));
  };

  const back = () => setStep(s => Math.max(1, s - 1));
  const close = () => {
    setStep(1);
    setSuccess(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto" onClick={close}>
      <div className="w-full max-w-xl bg-surface-raised border border-surface-border rounded-3xl shadow-2xl overflow-hidden my-8" onClick={e => e.stopPropagation()}>
        <div className="p-5 sm:p-6 bg-surface-subtle border-b border-surface-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#334DAF]/10 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center"><CalendarDays className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">{m.consultationTitle || 'Book a Consultation'}</h3>
              <p className="text-xs text-slate-500">{m.consultationSubtitle || 'Select a service, time and share your business details.'}</p>
            </div>
          </div>
          <button onClick={close} className="p-2 rounded-xl hover:bg-surface-base"><X className="w-5 h-5 text-slate-400" /></button>
        </div>

        <div className="p-5 sm:p-6">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center"><CheckCircle2 className="w-9 h-9" /></div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">{m.confirmedTitle || 'Consultation Request Dispatched'}</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your consultation booking details have been transmitted directly to EagleComply Counsel at <strong className="text-[#334DAF] dark:text-[#7096D1]">{COMPANY_EMAIL}</strong>.
              </p>
              
              <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border text-left rtl:text-right text-xs space-y-1.5 font-mono">
                <div className="flex justify-between"><span className="text-slate-500">Target Counsel Email:</span><strong>{COMPANY_EMAIL}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">{m.bookingRef || 'Reference'}:</span><strong>{success.id}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">{m.selectDate || 'Date'}:</span><strong>{success.date}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">{m.selectTime || 'Time'}:</span><strong>{success.time} ({success.timezone})</strong></div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={generateMailtoLink({
                    type: 'Consultation Booking',
                    clientName: form.fullName,
                    email: form.workEmail,
                    company: form.company,
                    jurisdiction: form.country,
                    service: solutions.find(s => s.id === form.serviceId)?.name || form.serviceId,
                    date: form.date,
                    time: `${form.time} (${form.timezone})`,
                    requirement: form.requirement
                  })}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] text-white font-bold text-xs shadow-md"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open Email Draft ({COMPANY_EMAIL})</span>
                </a>
              </div>

              <div>
                <button onClick={close} className="mt-2 px-6 py-2 rounded-full bg-surface-subtle text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-surface-raised border border-surface-border">{comm.close || 'Close'}</button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                {[m.step1 || '1. Service', m.step2 || '2. Date & Time', m.step3 || '3. Your Details'].map((label, i) => (
                  <div key={i} className={`flex-1 rounded-xl px-2 py-2 text-center text-[10px] font-bold border ${step === i + 1 ? 'bg-[#334DAF] text-white border-[#334DAF]' : 'bg-surface-subtle text-slate-400 border-surface-border'}`}>{label}</div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">{m.selectPractice || 'Select Service'}</label>
                    <select value={form.serviceId} onChange={e => update('serviceId', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white">
                      {solutions.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div className="p-4 rounded-2xl bg-surface-subtle border border-surface-border flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-300">Choose the practice area that best matches your requirement. You can explain the specific issue in the final step.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold mb-2"><CalendarDays className="inline w-3.5 h-3.5 mr-1" />{m.selectDate || 'Select Date'}</label>
                      <input type="date" min={minDate} value={form.date} onChange={e => update('date', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold mb-2"><Clock3 className="inline w-3.5 h-3.5 mr-1" />{m.selectTime || 'Select Time'}</label>
                      <select value={form.time} onChange={e => update('time', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white">
                        {slots.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2"><Globe2 className="inline w-3.5 h-3.5 mr-1" />{m.selectTimezone || 'Timezone'}</label>
                    <input value={form.timezone} onChange={e => update('timezone', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field icon={User} label={m.name || 'Full Name'} value={form.fullName} onChange={v => update('fullName', v)} required />
                    <Field icon={Mail} label={m.email || 'Business Email'} type="email" value={form.workEmail} onChange={v => update('workEmail', v)} required />
                    <Field icon={Building2} label={m.organization || 'Company'} value={form.company} onChange={v => update('company', v)} required />
                    <Field icon={Globe2} label={m.jurisdiction || 'Country / Jurisdiction'} value={form.country} onChange={v => update('country', v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2">{m.background || 'Brief Description of Requirement'}</label>
                    <textarea rows="4" value={form.requirement} onChange={e => update('requirement', e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white resize-none" placeholder="What compliance issue or objective would you like to discuss?" />
                  </div>
                </div>
              )}

              <div className="mt-7 pt-5 border-t border-surface-border flex items-center justify-between">
                {step > 1 ? <button onClick={back} className="px-4 py-2.5 rounded-xl border border-surface-border text-xs font-bold flex items-center gap-2"><ArrowLeft className="w-4 h-4 rtl:rotate-180" />{comm.back || 'Back'}</button> : <span />}
                <button onClick={next} className="px-5 py-2.5 rounded-xl bg-[#091F5C] dark:bg-[#334DAF] text-white font-bold text-xs flex items-center gap-2">
                  {step === 3 ? (comm.confirm || 'Request Consultation') : (comm.next || 'Continue')} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
              <div className="mt-4 text-center text-[10px] text-slate-400">Your information is used only to process the consultation request and coordinate follow-up.</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="block text-xs font-bold mb-2"><Icon className="inline w-3.5 h-3.5 mr-1" />{label}{required ? ' *' : ''}</label>
      <input type={type} required={required} value={value} onChange={e => onChange(e.target.value)} className="w-full p-3 rounded-xl bg-surface-subtle border border-surface-border text-sm text-slate-900 dark:text-white" />
    </div>
  );
}
