import React, { useState, useEffect } from 'react';
import EagleLogo from './EagleLogo';

export default function PlatformLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Fast, smooth, deterministic preloader transition (max 650ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsFadingOut(true);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return prev + 25;
      });
    }, 90);

    // Hard fallback to ensure loader NEVER gets stuck
    const safetyTimeout = setTimeout(() => {
      clearInterval(interval);
      setIsFadingOut(true);
      setTimeout(() => {
        if (onFinish) onFinish();
      }, 200);
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F9FBFF] dark:bg-[#101E42] transition-opacity duration-300 pointer-events-none select-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center space-y-4">
        
        {/* Animated Eagle Logo */}
        <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#16295C] border border-[#D0E4FE] dark:border-[#2B4E9E] shadow-xl">
          <EagleLogo className="h-16 w-auto animate-pulse" />
        </div>

        {/* Brand Title */}
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
            EAGLE COMPLIANCE
          </h2>
          <p className="text-[10px] font-mono text-[#334DAF] dark:text-[#7096D1] uppercase tracking-widest font-semibold">
            Global Regulatory Platform
          </p>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-48 h-1 bg-[#E8F2FE] dark:bg-[#1E3778] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#334DAF] dark:bg-[#7096D1] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}
