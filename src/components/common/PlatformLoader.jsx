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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FFFFFF] dark:bg-[#030303] transition-opacity duration-300 pointer-events-none select-none ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs w-full px-6 text-center space-y-4">
        
        {/* Animated Eagle Logo */}
        <div className="relative flex items-center justify-center p-3 rounded-2xl bg-white dark:bg-[#131313] border border-[#E4E4E4] dark:border-[#2A2E35] shadow-xl">
          <EagleLogo className="h-16 w-auto animate-pulse" />
        </div>

        {/* Brand Title */}
        <div className="space-y-0.5">
          <h2 className="text-sm font-bold tracking-tight text-black dark:text-white dark:text-white">
            EAGLE COMPLIANCE
          </h2>
          <p className="text-[10px] font-mono text-[#E31F1F] dark:text-[#FF3333] uppercase tracking-widest font-semibold">
            Global Regulatory Platform
          </p>
        </div>

        {/* Clean Progress Bar */}
        <div className="w-48 h-1 bg-[#F5F3F2] dark:bg-[#1E1E1E] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#E31F1F] dark:bg-[#FF3333] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>
    </div>
  );
}
