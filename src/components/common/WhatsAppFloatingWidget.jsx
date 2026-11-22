import React, { useState } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { WhatsAppIcon } from './ContactWorldMap';

export default function WhatsAppFloatingWidget({ isChatOpen = false }) {
  const [isOpen, setIsOpen] = useState(false);

  // If AI Regulatory Assistant chat is open, hide WhatsApp trigger to prevent any collision
  if (isChatOpen) return null;

  return (
    <div className="fixed bottom-[68px] sm:bottom-[76px] right-4 sm:right-6 rtl:right-auto rtl:left-4 sm:rtl:left-6 z-40 flex flex-col items-end rtl:items-start gap-2">
      {isOpen && (
        <div className="w-80 max-w-xs bg-[#0B132B] text-white rounded-3xl border border-[#1E3778] p-5 shadow-2xl space-y-4 animate-fade-in mb-2 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-[#1E3778]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-md">
                <WhatsAppIcon className="w-4 h-4 fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">EagleComply WhatsApp</h4>
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Counsel Online
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-blue-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-blue-100/90 leading-relaxed">
            Directly message our resident regulatory and AML/CFT compliance team on WhatsApp:
          </p>

          <div className="space-y-2.5">
            <a
              href="https://wa.me/447706413233"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🇬🇧</span>
                <div className="text-left">
                  <div className="text-xs font-bold">UK & Global Practice</div>
                  <div className="text-[10px] font-mono opacity-90">+44 7706 413233</div>
                </div>
              </div>
              <WhatsAppIcon className="w-4 h-4 fill-white opacity-90 group-hover:scale-110 transition-transform mr-1" />
            </a>

            <a
              href="https://wa.me/393488184787"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:scale-[1.02] transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">🇮🇹</span>
                <div className="text-left">
                  <div className="text-xs font-bold">Italy & EU Practice</div>
                  <div className="text-[10px] font-mono opacity-90">+39 348 818 4787</div>
                </div>
              </div>
              <WhatsAppIcon className="w-4 h-4 fill-white opacity-90 group-hover:scale-110 transition-transform mr-1" />
            </a>
          </div>

          <div className="pt-2 border-t border-[#1E3778] flex items-center justify-between text-[10px] font-mono text-blue-200/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Bilateral NDA Protected
            </span>
            <span>Instant 1-to-1 Chat</span>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(v => !v)}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center border-2 border-white/30 relative group focus:outline-none cursor-pointer"
        title="Chat on WhatsApp (UK and Italy)"
        aria-label="WhatsApp Contact"
      >
        <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-300 border-2 border-[#091F5C] rounded-full animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#091F5C] rounded-full" />
      </button>
    </div>
  );
}
