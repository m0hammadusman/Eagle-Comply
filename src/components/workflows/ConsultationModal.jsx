import React, { useMemo, useState, useEffect } from 'react';
import { 
  X, 
  CalendarDays, 
  Clock3, 
  Video,
  Globe2, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Loader2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Building2,
  Mail,
  User,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useData } from '../../context/DataContext';
import { sendInquiryToCompanyEmail, COMPANY_EMAIL, UK_WHATSAPP_LINK } from '../../utils/contactDispatcher';
import { WhatsAppIcon } from '../common/ContactWorldMap';

export default function ConsultationModal({ isOpen, onClose }) {
  const { t, solutions } = useLanguage();
  const { bookConsultation } = useData();

  // Calendar State: Default to August 2026, 25th, 9:00am (as per corporate spec)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // 0-indexed, 7 = August
  const [selectedDay, setSelectedDay] = useState(25);
  const [selectedTime, setSelectedTime] = useState('9:00am');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Karachi');

  // Multi-step booking flow (Step 1: Schedule Picker, Step 2: Attendee Details, Step 3: Success Confirmation)
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successBooking, setSuccessBooking] = useState(null);

  const [attendeeForm, setAttendeeForm] = useState({
    fullName: '',
    workEmail: '',
    company: '',
    jurisdiction: 'United Kingdom',
    requirement: ''
  });

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const monthShortNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const timeSlots = [
    '9:00am', '9:30am', '10:00am',
    '10:30am', '11:00am', '11:30am',
    '12:00pm', '12:30pm', '1:00pm'
  ];

  const timezones = [
    'Asia/Karachi',
    'Europe/London',
    'America/New_York',
    'Asia/Dubai',
    'Asia/Singapore',
    'Europe/Paris'
  ];

  // Calendar calculations
  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayIndex = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  // Selected date formatted string
  const formattedDate = useMemo(() => {
    const d = new Date(currentYear, currentMonth, selectedDay);
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()];
    return `${dayName}, ${selectedDay} ${monthShortNames[currentMonth]} ${currentYear}`;
  }, [currentYear, currentMonth, selectedDay]);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const handleClose = () => {
    setStep(1);
    setSuccessBooking(null);
    setIsSubmitting(false);
    onClose();
  };

  const handleConfirmAndContinue = () => {
    setStep(2);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!attendeeForm.fullName || !attendeeForm.workEmail || !attendeeForm.company) return;

    setIsSubmitting(true);
    const booking = bookConsultation({
      title: 'Strategic Compliance Consultation',
      date: formattedDate,
      time: selectedTime,
      timezone: selectedTimezone,
      clientName: attendeeForm.fullName,
      organization: attendeeForm.company,
      email: attendeeForm.workEmail,
      phone: '',
      notes: `Jurisdiction: ${attendeeForm.jurisdiction}, Requirement: ${attendeeForm.requirement}`
    });

    await sendInquiryToCompanyEmail({
      type: 'Strategic Partner Consultation Booking',
      clientName: attendeeForm.fullName,
      email: attendeeForm.workEmail,
      company: attendeeForm.company,
      jurisdiction: attendeeForm.jurisdiction,
      service: 'Strategic Compliance Consultation',
      date: formattedDate,
      time: selectedTime,
      timezone: selectedTimezone,
      requirement: attendeeForm.requirement || 'Standard 30-minute scoping session'
    });

    setIsSubmitting(false);
    setSuccessBooking(booking);
    setStep(3);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in" 
      onClick={handleClose}
    >
      <div 
        className="w-full max-w-[1080px] bg-white dark:bg-[#0A1224] border border-[#1E3778]/25 dark:border-[#1E3778]/60 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 font-sans" 
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: '94vh' }}
      >
        {/* ======================================================== */}
        {/* 1. HEADER (Compact ~55px)                                */}
        {/* ======================================================== */}
        <div className="shrink-0 px-5 py-3 bg-slate-50/90 dark:bg-[#0F1C36] border-b border-slate-200/80 dark:border-[#1E3778]/50 flex items-center justify-between z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] border border-[#334DAF]/20 dark:border-[#7096D1]/30 flex items-center justify-center shrink-0">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white truncate">
                  Book Partner Scoping Consultation
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold shrink-0">
                  Live Calendar
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                Direct consultation with EagleComply Senior Compliance Directors.
              </p>
            </div>
          </div>

          <button 
            onClick={handleClose} 
            className="p-1.5 rounded-xl bg-white dark:bg-[#162544] hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-[#1E3778] transition-colors cursor-pointer shrink-0 ml-2"
            title="Close modal"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 2. MAIN CONTENT                                          */}
        {/* ======================================================== */}
        <div className="flex-1 p-4 sm:p-5">
          {step === 1 && (
            /* STEP 1: COMPACT 3-COLUMN SCHEDULER */
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-stretch h-full">
              
              {/* ---------------------------------------------------- */}
              {/* LEFT COLUMN — CONSULTATION (Width ~25%)              */}
              {/* ---------------------------------------------------- */}
              <div className="md:col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-slate-50/60 dark:bg-[#0E1A33]/70 border border-slate-200/70 dark:border-[#1E3778]/40">
                <div className="space-y-3">
                  {/* Small Brand Emblem */}
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#091F5C] dark:bg-[#334DAF] flex items-center justify-center text-white shadow-xs">
                      <ShieldCheck className="w-4 h-4 text-cyan-300" />
                    </div>
                    <span className="font-mono text-[11px] font-bold tracking-wider text-slate-600 dark:text-slate-300 uppercase">
                      Eagle-Comply
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                      Strategic Compliance Consultation
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1.5">
                      Schedule a focused consultation with our compliance and regulatory experts.
                    </p>
                  </div>

                  {/* 3 Information Rows */}
                  <div className="pt-2 space-y-2 border-t border-slate-200/70 dark:border-[#1E3778]/40">
                    <div className="flex items-center gap-2.5 text-xs">
                      <Clock3 className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">30 min</span>
                        <span className="text-slate-400 text-[11px] ml-1">· Duration</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs">
                      <Video className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                      <div>
                        <span className="font-semibold text-slate-900 dark:text-white">Cal Video</span>
                        <span className="text-slate-400 text-[11px] ml-1">· Meeting Type</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 text-xs">
                      <Globe2 className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                      <div className="flex items-center gap-1 min-w-0">
                        <select 
                          value={selectedTimezone} 
                          onChange={e => setSelectedTimezone(e.target.value)}
                          className="font-semibold text-slate-900 dark:text-white bg-transparent border-none outline-none cursor-pointer text-xs p-0 truncate max-w-[130px]"
                        >
                          {timezones.map(tz => (
                            <option key={tz} value={tz} className="bg-white dark:bg-[#0A1224] text-slate-900 dark:text-white">
                              {tz}
                            </option>
                          ))}
                        </select>
                        <span className="text-slate-400 text-[11px]">· Zone</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subtle Advisory Note */}
                <div className="mt-4 pt-3 border-t border-slate-200/70 dark:border-[#1E3778]/40 text-[10px] text-slate-400 font-mono">
                  Bilateral NDA Safeguards Active
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* CENTER COLUMN — CALENDAR (Width ~42%)                */}
              {/* ---------------------------------------------------- */}
              <div className="md:col-span-5 flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-[#0E1A33]/40 border border-slate-200/80 dark:border-[#1E3778]/40">
                <div>
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 dark:border-[#1E3778]/30">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white tracking-wide">
                      {monthNames[currentMonth]} {currentYear}
                    </h4>
                    <div className="flex items-center gap-1">
                      <button 
                        onClick={prevMonth}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E3778]/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextMonth}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1E3778]/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Weekday Row */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                    {weekdays.map(day => (
                      <div key={day} className="text-[10px] font-bold text-slate-400 tracking-wider py-0.5">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Days Grid (Cells ~34-36px) */}
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {/* Empty padding slots before first day */}
                    {Array.from({ length: firstDayIndex }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8 sm:h-9" />
                    ))}

                    {/* Day Cells */}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDay === dayNum;
                      // Determine weekday index for business days styling
                      const dayOfWeek = (firstDayIndex + i) % 7;
                      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
                      const isAvailable = !isWeekend;

                      return (
                        <button
                          key={`day-${dayNum}`}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`h-8 sm:h-9 rounded-xl text-xs flex items-center justify-center transition-all cursor-pointer relative ${
                            isSelected
                              ? 'bg-[#091F5C] dark:bg-[#334DAF] text-white font-bold shadow-md scale-105 z-10'
                              : isAvailable
                              ? 'bg-blue-50/70 dark:bg-[#1E3778]/30 text-[#091F5C] dark:text-[#D0E4FE] font-semibold hover:bg-blue-100 dark:hover:bg-[#1E3778]/60 hover:border-[#334DAF]'
                              : 'text-slate-400 dark:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800/40'
                          }`}
                        >
                          <span>{dayNum}</span>
                          {/* Dot indicator for selected or active focus */}
                          {dayNum === 24 && !isSelected && (
                            <span className="w-1 h-1 rounded-full bg-[#334DAF] dark:bg-[#7096D1] absolute bottom-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Calendar Footer Info */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>● Available dates highlighted in blue</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">30 Min Window</span>
                </div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* RIGHT COLUMN — AVAILABLE TIMES (Width ~33%)          */}
              {/* ---------------------------------------------------- */}
              <div className="md:col-span-4 flex flex-col justify-between p-4 rounded-2xl bg-white dark:bg-[#0E1A33]/40 border border-slate-200/80 dark:border-[#1E3778]/40">
                <div>
                  {/* Date Heading */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-[#1E3778]/30">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      {formattedDate}
                    </h4>
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#101E42] px-2 py-0.5 rounded-lg text-[10px] font-mono text-slate-500 font-bold">
                      12h
                    </div>
                  </div>

                  {/* 3-Column Time Slot Grid (9 buttons) */}
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map(time => {
                      const isSelected = selectedTime === time;
                      return (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`h-9 rounded-xl text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#091F5C] dark:bg-[#334DAF] text-white font-bold shadow-sm'
                              : 'bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-slate-700 dark:text-slate-200 hover:border-[#334DAF] hover:bg-blue-50/60 dark:hover:bg-[#1E3778]/40'
                          }`}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selected Appointment Summary Card */}
                <div className="mt-3 p-2.5 rounded-xl bg-blue-50/80 dark:bg-[#101E42]/90 border border-blue-100 dark:border-[#1E3778]/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-[#334DAF] dark:text-[#7096D1] shrink-0" />
                    <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                      {formattedDate} · {selectedTime}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono shrink-0">
                    {selectedTimezone.split('/')[1] || selectedTimezone}
                  </span>
                </div>
              </div>

            </div>
          )}

          {step === 2 && (
            /* STEP 2: COMPACT ATTENDEE DETAILS FORM */
            <div className="max-w-2xl mx-auto py-2 space-y-4 animate-fade-in">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Confirm Consultation Details
                </h3>
                <p className="text-xs text-slate-500">
                  Scheduled for <strong className="text-[#334DAF] dark:text-[#7096D1]">{formattedDate} at {selectedTime} ({selectedTimezone})</strong>
                </p>
              </div>

              <form onSubmit={handleFinalSubmit} className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Eleanor Vance"
                        value={attendeeForm.fullName}
                        onChange={e => setAttendeeForm({ ...attendeeForm, fullName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Corporate Work Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="email"
                        required
                        placeholder="counsel@institution.com"
                        value={attendeeForm.workEmail}
                        onChange={e => setAttendeeForm({ ...attendeeForm, workEmail: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Organization / Firm *
                    </label>
                    <div className="relative">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <input 
                        type="text"
                        required
                        placeholder="e.g. Apex Global Bank"
                        value={attendeeForm.company}
                        onChange={e => setAttendeeForm({ ...attendeeForm, company: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Target Jurisdiction
                    </label>
                    <div className="relative">
                      <Globe2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                      <select 
                        value={attendeeForm.jurisdiction}
                        onChange={e => setAttendeeForm({ ...attendeeForm, jurisdiction: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF]"
                      >
                        <option value="United Kingdom">United Kingdom (FCA / PRA)</option>
                        <option value="European Union">European Union (AMLA / MiCA)</option>
                        <option value="United States">United States (FinCEN / SEC)</option>
                        <option value="United Arab Emirates">United Arab Emirates (VARA / CBUAE)</option>
                        <option value="Pakistan">Pakistan (SECP / SBP)</option>
                        <option value="International / Multi-Jurisdiction">Multi-Jurisdiction Cross-Border</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Primary Scoping Objective (Optional)
                  </label>
                  <textarea 
                    rows="2"
                    placeholder="Briefly describe your compliance review, licensing readiness, or audit scope..."
                    value={attendeeForm.requirement}
                    onChange={e => setAttendeeForm({ ...attendeeForm, requirement: e.target.value })}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#101E42] border border-slate-200 dark:border-[#1E3778] text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF] resize-none"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Calendar</span>
                  </button>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2 rounded-xl text-xs font-bold text-white bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] dark:hover:bg-[#253982] shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Transmitting to Counsel...</span>
                      </>
                    ) : (
                      <>
                        <span>Complete Booking</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {step === 3 && (
            /* STEP 3: SUCCESS CONFIRMATION SCREEN */
            <div className="text-center py-4 space-y-3 animate-scale-in max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white">
                  Consultation Confirmed & Dispatched
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                  Your appointment on <strong className="text-[#091F5C] dark:text-[#7096D1]">{formattedDate} at {selectedTime}</strong> has been transmitted directly to EagleComply Counsel.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#0E1A33] border border-slate-200 dark:border-[#1E3778] text-xs space-y-1 font-mono text-left">
                <div className="flex justify-between"><span className="text-slate-500">Attendee:</span><strong>{attendeeForm.fullName}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Email:</span><strong>{attendeeForm.workEmail}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Organization:</span><strong>{attendeeForm.company}</strong></div>
                <div className="flex justify-between"><span className="text-slate-500">Counsel Target:</span><strong className="text-[#334DAF] dark:text-[#7096D1]">{COMPANY_EMAIL}</strong></div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={UK_WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-white" />
                  <span>Direct WhatsApp Connect</span>
                </a>
                <button 
                  onClick={handleClose} 
                  className="px-5 py-2 rounded-xl bg-slate-100 dark:bg-[#162544] text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3. FOOTER (~50-55px)                                     */}
        {/* ======================================================== */}
        {step === 1 && (
          <div className="shrink-0 px-5 py-3 bg-slate-50/80 dark:bg-[#0F1C36]/80 border-t border-slate-200/80 dark:border-[#1E3778]/50 flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Your information is secure
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button 
                onClick={handleClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleConfirmAndContinue}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#091F5C] dark:bg-[#334DAF] hover:bg-[#1E3778] dark:hover:bg-[#253982] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Confirm & Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
