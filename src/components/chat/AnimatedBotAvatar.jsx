import React from 'react';

export default function AnimatedBotAvatar({ className = "", size = 70, showHello = true }) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`} style={{ width: size, height: size * 1.25 }}>
      <style>{`
        @keyframes botHoverMotion {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(-1.5deg);
          }
        }
        @keyframes botShadowMotion {
          0%, 100% {
            transform: scale(1);
            opacity: 0.35;
          }
          50% {
            transform: scale(0.72);
            opacity: 0.15;
          }
        }
        @keyframes botAntennaGlow {
          0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-2px) scale(1.15);
            opacity: 1;
          }
        }
        @keyframes botEyeBlink {
          0%, 45%, 55%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(0.1);
          }
        }
        @keyframes helloPopCycle {
          0%, 8% {
            transform: scale(0) translateY(8px);
            opacity: 0;
          }
          14% {
            transform: scale(1.12) translateY(-2px);
            opacity: 1;
          }
          18%, 68% {
            transform: scale(1) translateY(0px);
            opacity: 1;
          }
          74%, 78% {
            transform: scale(0.5) translateY(6px);
            opacity: 0;
          }
          79%, 100% {
            transform: scale(0) translateY(8px);
            opacity: 0;
          }
        }
        .bot-body-motion {
          animation: botHoverMotion 3.2s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .bot-shadow-motion {
          animation: botShadowMotion 3.2s ease-in-out infinite;
          transform-origin: center;
        }
        .bot-antenna-motion {
          animation: botAntennaGlow 2.4s ease-in-out infinite;
          transform-origin: center;
        }
        .bot-eye-motion {
          animation: botEyeBlink 4.5s ease-in-out infinite;
          transform-origin: 50% 50%;
        }
        .bot-hello-popup {
          animation: helloPopCycle 5.2s ease-in-out infinite;
          transform-origin: right center;
        }
      `}</style>

      {/* Looping Pop-up 'Hello!' Speech Bubble on Left Side */}
      {showHello && (
        <div className="absolute top-1 -left-[64px] sm:-left-[72px] bot-hello-popup z-30 pointer-events-none whitespace-nowrap">
          <div className="relative px-2.5 py-1 rounded-2xl bg-white dark:bg-[#0D182E] text-slate-900 dark:text-white border border-[#334DAF]/30 dark:border-cyan-400/50 shadow-[0_6px_20px_rgba(0,0,0,0.22)] dark:shadow-[0_6px_20px_rgba(0,210,255,0.3)] flex items-center gap-1 text-[11px] sm:text-xs font-extrabold tracking-tight">
            <span className="bg-gradient-to-r from-[#00C8FF] via-[#558BFF] to-[#8F82FF] bg-clip-text text-transparent font-black">
              Hello!
            </span>
            <span className="inline-block animate-pulse text-[10px]">✨</span>
            {/* Speech bubble right pointer arrow facing the robot */}
            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-[#0D182E] border-t border-r border-[#334DAF]/30 dark:border-cyan-400/50 transform rotate-45" />
          </div>
        </div>
      )}

      {/* SVG Vector Robot */}
      <svg
        viewBox="0 0 100 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full bot-body-motion filter drop-shadow-[0_8px_16px_rgba(0,180,255,0.25)]"
      >
        <defs>
          {/* Head & Body Main Gradient: Cyan to Purple-Blue */}
          <linearGradient id="botGradient" x1="15" y1="90" x2="85" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00C8FF" />
            <stop offset="55%" stopColor="#558BFF" />
            <stop offset="100%" stopColor="#8F82FF" />
          </linearGradient>

          {/* Torso Gradient */}
          <linearGradient id="bodyGradient" x1="30" y1="105" x2="70" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00D2FF" />
            <stop offset="60%" stopColor="#6C82FF" />
            <stop offset="100%" stopColor="#8C7DFF" />
          </linearGradient>

          {/* Visor Screen Dark Gradient */}
          <linearGradient id="visorGradient" x1="50" y1="35" x2="50" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0E1C30" />
            <stop offset="100%" stopColor="#070E1A" />
          </linearGradient>

          {/* Antenna Dot Glow */}
          <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#CBE5FF" />
            <stop offset="60%" stopColor="#5599FF" />
            <stop offset="100%" stopColor="#3B66FF" />
          </radialGradient>

          {/* Head Top Cap */}
          <linearGradient id="topCapGradient" x1="45" y1="20" x2="55" y2="26" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7E8CFF" />
            <stop offset="100%" stopColor="#4E78FF" />
          </linearGradient>
        </defs>

        {/* 1. Floating Antenna */}
        <g className="bot-antenna-motion">
          <circle cx="50" cy="11" r="3.2" fill="url(#antennaGlow)" />
          <circle cx="49" cy="10" r="1" fill="#FFFFFF" opacity="0.8" />
        </g>
        
        {/* Antenna Connector Base on Head */}
        <rect x="44.5" y="21" width="11" height="4.5" rx="2" fill="url(#topCapGradient)" />

        {/* 2. Main Robot Head */}
        <path
          d="M 23 48 C 23 29 35 22 50 22 C 65 22 77 29 77 48 C 77 64 64 68 50 68 C 36 68 23 64 23 48 Z"
          fill="url(#botGradient)"
        />

        {/* Head Top-Right Specular Highlight */}
        <ellipse cx="66" cy="30" rx="4.5" ry="3" transform="rotate(35 66 30)" fill="#FFFFFF" opacity="0.75" />
        <ellipse cx="71" cy="35" rx="2.2" ry="1.4" transform="rotate(35 71 35)" fill="#FFFFFF" opacity="0.6" />

        {/* 3. Dark Visor Face Screen */}
        <path
          d="M 29 48 C 29 40 37 36 50 36 C 63 36 71 40 71 48 C 71 55 63 58 50 58 C 37 58 29 55 29 48 Z"
          fill="url(#visorGradient)"
          stroke="#3B5998"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* Visor Top Curve Gloss Reflection */}
        <path
          d="M 33 42 C 40 38 60 38 67 42"
          stroke="#FFFFFF"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* 4. Eyes (With Blinking Animation) */}
        <g className="bot-eye-motion">
          {/* Left Eye */}
          <g transform="translate(42, 47)">
            <ellipse cx="0" cy="0" rx="5.5" ry="6.2" fill="#0A111F" />
            <ellipse cx="0" cy="0" rx="5" ry="5.8" fill="#1C385E" />
            {/* Eye Ring Glow */}
            <ellipse cx="0" cy="0" rx="4.4" ry="5.2" fill="#0A1322" stroke="#48CAE4" strokeWidth="0.8" />
            {/* White Eye Highlights */}
            <circle cx="-1.4" cy="-1.8" r="2.1" fill="#FFFFFF" />
            <circle cx="1.6" cy="2" r="1.1" fill="#FFFFFF" opacity="0.9" />
          </g>

          {/* Right Eye */}
          <g transform="translate(58, 47)">
            <ellipse cx="0" cy="0" rx="5.5" ry="6.2" fill="#0A111F" />
            <ellipse cx="0" cy="0" rx="5" ry="5.8" fill="#1C385E" />
            {/* Eye Ring Glow */}
            <ellipse cx="0" cy="0" rx="4.4" ry="5.2" fill="#0A1322" stroke="#48CAE4" strokeWidth="0.8" />
            {/* White Eye Highlights */}
            <circle cx="-1.4" cy="-1.8" r="2.1" fill="#FFFFFF" />
            <circle cx="1.6" cy="2" r="1.1" fill="#FFFFFF" opacity="0.9" />
          </g>
        </g>

        {/* 5. Smiling Mouth */}
        <path
          d="M 46.5 54.5 Q 50 57.5 53.5 54.5"
          stroke="#FFFFFF"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 47.5 54.5 Q 50 56.5 52.5 54.5 Z"
          fill="#FFFFFF"
          opacity="0.9"
        />

        {/* 6. Body / Floating Torso */}
        {/* Left Arm */}
        <path
          d="M 33 71 C 30 76 30 84 34 88 C 36 90 39 88 38 83 C 37 78 37 73 35 71 Z"
          fill="url(#bodyGradient)"
        />
        {/* Right Arm */}
        <path
          d="M 67 71 C 70 76 70 84 66 88 C 64 90 61 88 62 83 C 63 78 63 73 65 71 Z"
          fill="url(#bodyGradient)"
        />
        {/* Right Arm Highlight */}
        <path
          d="M 68 74 C 69 77 69 82 66.5 85"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* Main Torso */}
        <path
          d="M 36 69 C 36 69 35 91 50 91 C 65 91 64 69 64 69 Z"
          fill="url(#bodyGradient)"
        />
        
        {/* Bottom Soft Glow on Torso */}
        <path
          d="M 40 82 C 43 89 57 89 60 82 C 58 87 42 87 40 82 Z"
          fill="#00FFFF"
          opacity="0.3"
        />
      </svg>

      {/* Floating Ground Shadow */}
      <div 
        className="bot-shadow-motion w-8 h-2 rounded-full bg-slate-900/30 dark:bg-cyan-400/20 blur-[2px] -mt-1"
      />
    </div>
  );
}
