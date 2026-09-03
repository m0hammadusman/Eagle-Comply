import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function InteractivePillarCard({ 
  title, 
  subtitle, 
  badge, 
  category, 
  image, 
  stats, 
  icon: Icon,
  onClick 
}) {
  return (
    <div 
      onClick={onClick}
      className="group relative rounded-3xl overflow-hidden glass-panel border border-surface-border hover:border-[#DD2A40] dark:hover:border-[#FF3333] shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[340px]"
    >
      {/* Background Image with Dynamic Gradient & Hover Zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-35 dark:opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-raised via-surface-raised/70 to-transparent" />
      </div>

      {/* Top Header Cluster */}
      <div className="relative z-10 p-6 flex items-start justify-between gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#DD2A40] dark:text-[#FF3333] block">
            {category}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-surface-subtle border border-surface-border text-slate-700 dark:text-slate-300 font-semibold mt-1 inline-block">
            {badge}
          </span>
        </div>

        <div className="w-8 h-8 rounded-full bg-surface-subtle border border-surface-border flex items-center justify-center text-[#667085] group-hover:bg-[#DD2A40] group-hover:text-white dark:group-hover:bg-[#FF3333] dark:group-hover:text-[#000000] transition-colors">
          <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Bottom Content Cluster */}
      <div className="relative z-10 p-6 pt-0 space-y-3">
        <h3 className="text-xl font-bold text-black dark:text-white dark:text-white group-hover:text-[#DD2A40] dark:group-hover:text-[#FF3333] transition-colors">
          {title}
        </h3>
        
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
          {subtitle}
        </p>

        {/* Live Metric / Capability Pill */}
        {stats && (
          <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#667085]">{stats.label}</span>
            <span className="font-bold text-[#DD2A40] dark:text-[#FF3333]">{stats.value}</span>
          </div>
        )}
      </div>
    </div>
  );
}
