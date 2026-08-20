import React, { useState } from 'react';
import { Sliders, Shield, Database, Users, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import { useAuth, ROLES } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function AdminPlatform({ onNavigate }) {
  const { switchRole } = useAuth();
  const { 
    solutions, 
    regulations, 
    quotes, 
    consultations, 
    experienceConfig, 
    setExperienceConfig,
    setSolutions 
  } = useData();

  const [activeTab, setActiveTab] = useState('experience');
  const [newSolName, setNewSolName] = useState('');
  const [newSolCategory, setNewSolCategory] = useState('AI & Emerging Tech');
  const [newSolDesc, setNewSolDesc] = useState('');

  const handleCreateSolution = (e) => {
    e.preventDefault();
    if (!newSolName) return;
    const newEntry = {
      id: newSolName.toLowerCase().replace(/\s+/g, '-'),
      name: newSolName,
      category: newSolCategory,
      badge: 'New Practice',
      icon: 'BrainCircuit',
      shortDesc: newSolDesc || 'Comprehensive advisory and regulatory certification service.',
      valueProp: 'Accelerated market clearance and compliance assurance.',
      challenges: ['Supervisory pre-audit readiness', 'Technical file assembly'],
      scope: ['Risk tiering', 'Auditor assurance'],
      deliverables: ['Compliance Report', 'Eagle Verification Seal'],
      process: [
        { step: 1, title: 'Discovery', desc: 'Scope audit.' },
        { step: 2, title: 'Execution', desc: 'Deliverables drafting.' }
      ]
    };
    setSolutions(prev => [newEntry, ...prev]);
    setNewSolName('');
    setNewSolDesc('');
    alert(`Practice "${newSolName}" successfully deployed to live public catalog!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#334DAF] dark:text-[#7096D1]">
            Super Administrator Workspace
          </span>
          <h1 className="font-sans tracking-tight text-3xl md:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mt-1">
            Eagle Compliance Control & Experience Engine
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-1">
            System Operations &bull; Live 3D Experience Tuning &bull; Dynamic Knowledge Graph CMS
          </p>
        </div>

        {/* Persona quick switch */}
        <div className="flex items-center gap-2 bg-surface-subtle p-2 rounded-xl border border-surface-border text-xs font-mono">
          <span className="text-slate-400 pl-2">View as:</span>
          <button onClick={() => switchRole(ROLES.VISITOR)} className="px-2.5 py-1 rounded hover:bg-white/10 text-slate-300">Visitor</button>
          <button onClick={() => { switchRole(ROLES.CUSTOMER); onNavigate('portal'); }} className="px-2.5 py-1 rounded hover:bg-white/10 text-slate-300">Customer</button>
          <button onClick={() => { switchRole(ROLES.CONSULTANT); onNavigate('consultant'); }} className="px-2.5 py-1 rounded hover:bg-white/10 text-slate-300">Consultant</button>
          <span className="px-2.5 py-1 rounded bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] font-bold">Admin</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border mb-8 text-xs font-semibold">
        {[
          { id: 'experience', label: '3D Experience & Motion Engine', icon: Sparkles },
          { id: 'cms', label: 'Knowledge Graph CMS (Solutions)', icon: Database },
          { id: 'leads', label: 'Inbound Quotes & RFQ Registry', icon: Users }
        ].map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                activeTab === t.id ? 'border-[#334DAF] text-[#334DAF] dark:border-[#7096D1] dark:text-[#7096D1] bg-surface-subtle/60' : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab: 3D Experience Engine */}
      {activeTab === 'experience' && (
        <div className="max-w-2xl bg-surface-raised p-6 rounded-2xl border border-surface-border shadow-md space-y-6 animate-fade-in">
          <div>
            <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white">
              Governance Lattice 3D Engine Parameters
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Live particle physics, node proximity thresholds, and kinetic animation parameters.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Particle Node Density:</span>
                <span className="text-[#334DAF] dark:text-[#7096D1] font-bold">{experienceConfig.latticeNodes} Nodes</span>
              </div>
              <input
                type="range"
                min="20"
                max="120"
                value={experienceConfig.latticeNodes}
                onChange={e => setExperienceConfig({ ...experienceConfig, latticeNodes: Number(e.target.value) })}
                className="w-full accent-[#334DAF]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Connection Distance:</span>
                <span className="text-[#334DAF] dark:text-[#7096D1] font-bold">{experienceConfig.connectionDistance}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="220"
                value={experienceConfig.connectionDistance}
                onChange={e => setExperienceConfig({ ...experienceConfig, connectionDistance: Number(e.target.value) })}
                className="w-full accent-[#334DAF]"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1.5">
                <span className="text-slate-300">Kinetic Velocity Multiplier:</span>
                <span className="text-[#334DAF] dark:text-[#7096D1] font-bold">{experienceConfig.motionSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={experienceConfig.motionSpeed}
                onChange={e => setExperienceConfig({ ...experienceConfig, motionSpeed: Number(e.target.value) })}
                className="w-full accent-[#334DAF]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-subtle border border-surface-border text-xs text-emerald-400 font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Parameters update real-time canvas render loop immediately.</span>
          </div>
        </div>
      )}

      {/* Tab: CMS */}
      {activeTab === 'cms' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
          <div className="lg:col-span-5 bg-surface-raised p-6 rounded-2xl border border-surface-border shadow-md">
            <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white mb-4">
              Deploy New Practice Solution
            </h3>
            <form onSubmit={handleCreateSolution} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold text-slate-400 mb-1">Practice Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EU Cyber Resilience Act (CRA) Certification"
                  value={newSolName}
                  onChange={e => setNewSolName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-surface-border text-white outline-none"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-400 mb-1">Category</label>
                <select
                  value={newSolCategory}
                  onChange={e => setNewSolCategory(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-surface-border text-white outline-none"
                >
                  <option>AI & Emerging Tech</option>
                  <option>Financial Regulatory</option>
                  <option>Data Protection</option>
                  <option>Corporate Governance</option>
                  <option>Cybersecurity & Tech</option>
                </select>
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-400 mb-1">Scope & Description</label>
                <textarea
                  rows={3}
                  placeholder="Summary description of regulatory deliverables..."
                  value={newSolDesc}
                  onChange={e => setNewSolDesc(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-surface-subtle border border-surface-border text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] font-bold shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Deploy Practice to Live Site</span>
              </button>
            </form>
          </div>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white mb-2">
              Active Practice Directory ({solutions.length})
            </h3>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {solutions.map(s => (
                <div key={s.id} className="p-3.5 rounded-xl bg-surface-raised border border-surface-border flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200">{s.name}</div>
                    <div className="text-slate-500 font-mono">{s.category} ? {s.id}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1]">
                    Live
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Leads */}
      {activeTab === 'leads' && (
        <div className="space-y-4 animate-fade-in max-w-4xl">
          <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white">
            Inbound Quotes & RFQs ({quotes.length})
          </h3>
          <div className="space-y-3">
            {quotes.map(q => (
              <div key={q.id} className="p-4 rounded-xl bg-surface-raised border border-surface-border flex items-center justify-between text-xs shadow-sm">
                <div>
                  <div className="font-mono font-bold text-[#334DAF] dark:text-[#7096D1]">{q.id} ? {q.submittedAt}</div>
                  <div className="font-bold text-sm text-slate-200 mt-0.5">{q.company} ({q.clientName})</div>
                  <div className="text-slate-400 font-mono mt-1">Email: {q.email} ? Budget: {q.scopeBudget} ? Timeline: {q.timeline}</div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">
                  {q.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
