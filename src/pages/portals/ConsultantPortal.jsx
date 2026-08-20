import React, { useState } from 'react';
import { Shield, CheckCircle2, FileText, Calendar, Clock, AlertTriangle, User, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function ConsultantPortal({ onNavigate }) {
  const { user } = useAuth();
  const { projects, documents, consultations, updateMilestone } = useData();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Consultant Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'} 
            alt="Consultant Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#334DAF] dark:border-[#7096D1] shadow-md shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans tracking-tight text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {user?.name || 'Dr. Elena Vance'}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">
                Accredited Lead Auditor
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              {user?.title || 'Managing Director, AI Governance'}
            </p>
          </div>
        </div>

        <div className="bg-surface-subtle p-3.5 rounded-xl border border-surface-border font-mono text-xs flex items-center gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-[#334DAF] dark:text-[#7096D1]">2 Active</div>
            <div className="text-[10px] text-slate-400">Assigned Clients</div>
          </div>
          <div className="w-px h-8 bg-surface-border" />
          <div>
            <div className="text-lg font-bold text-emerald-400">100%</div>
            <div className="text-[10px] text-slate-400">Approval Velocity</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Client Portfolios */}
        <div className="lg:col-span-8 space-y-6">
          <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#334DAF] dark:text-[#7096D1]" /> Client Engagement Portfolios
          </h3>

          <div className="space-y-6">
            {projects.map(prj => (
              <div key={prj.id} className="p-6 rounded-2xl glass-panel border border-surface-border shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#334DAF] dark:text-[#7096D1] font-bold">{prj.id} ? {prj.client}</span>
                    <h4 className="font-sans tracking-tight font-bold text-lg text-slate-900 dark:text-white">{prj.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                    Score: {prj.complianceScore}%
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-slate-400 uppercase">Audit Milestone Review:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {prj.milestones.map(m => (
                      <div key={m.id} className="p-3 rounded-lg bg-surface-subtle border border-surface-border flex items-center justify-between text-xs">
                        <span className="font-medium text-slate-300">{m.name}</span>
                        <button
                          onClick={() => updateMilestone(prj.id, m.id, m.status === 'Completed' ? 'In Progress' : 'Completed')}
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer ${
                            m.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {m.status}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Consultation Queue & Fast Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-surface-raised border border-surface-border shadow-md">
            <h3 className="font-sans tracking-tight font-bold text-base text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#334DAF] dark:text-[#7096D1]" /> Upcoming Client Queue
            </h3>
            <div className="space-y-3">
              {consultations.map(c => (
                <div key={c.id} className="p-3.5 rounded-xl bg-surface-subtle border border-surface-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#334DAF] dark:text-[#7096D1] font-bold">{c.id}</span>
                    <span className="text-slate-400">{c.date}</span>
                  </div>
                  <div className="font-bold text-slate-200">{c.title}</div>
                  <div className="text-[11px] text-slate-400">{c.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
