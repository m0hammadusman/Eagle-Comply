import React, { useState } from 'react';
import { 
  FolderKanban, 
  FileText, 
  Calendar, 
  CreditCard, 
  ShieldCheck, 
  Upload, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ExternalLink,
  Lock,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function CustomerPortal({ onNavigate, onOpenConsultation }) {
  const { user } = useAuth();
  const { projects, documents, consultations, invoices, updateMilestone, addDocument } = useData();
  const [activeTab, setActiveTab] = useState('projects');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFileName, setUploadFileName] = useState('');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!uploadFileName) return;
    addDocument({
      projectId: projects[0].id,
      name: uploadFileName.endsWith('.pdf') ? uploadFileName : `${uploadFileName}.pdf`,
      category: 'Client Evidence',
      size: '1.4 MB',
      uploadedBy: user?.name || 'Alexander Sterling'
    });
    setUploadFileName('');
    setIsUploading(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Portal Executive Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-surface-raised border border-surface-border shadow-xl mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <img 
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'} 
            alt="User Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-[#334DAF] dark:border-[#7096D1] shadow-md shrink-0" 
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-sans tracking-tight text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {user?.name || 'Alexander Sterling'}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                {user?.tier || 'Platinum Tier'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">
              {user?.title || 'Chief Compliance & Risk Officer'} ? {user?.organization || 'Apex Cognitive Systems Inc.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#091F5C] to-[#334DAF] dark:from-[#334DAF] dark:to-[#7096D1] text-white dark:text-[#101E42] font-bold text-xs shadow-md flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Schedule Partner Session</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-surface-border mb-8 overflow-x-auto text-xs pb-1">
        {[
          { id: 'projects', label: 'Active Audit Projects', count: projects.length, icon: FolderKanban },
          { id: 'documents', label: 'Encrypted Vault & Dossiers', count: documents.length, icon: FileText },
          { id: 'sessions', label: 'Consultations & Audits', count: consultations.length, icon: Calendar },
          { id: 'billing', label: 'Invoices & Statements', count: invoices.length, icon: CreditCard }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-semibold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                activeTab === tab.id 
                  ? 'border-[#334DAF] text-[#334DAF] dark:border-[#7096D1] dark:text-[#7096D1] bg-surface-subtle/60' 
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-surface-border text-[10px] font-mono">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content: Projects */}
      {activeTab === 'projects' && (
        <div className="space-y-8 animate-fade-in">
          {projects.map(prj => (
            <div key={prj.id} className="p-6 rounded-2xl glass-panel border border-surface-border shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="text-[#334DAF] dark:text-[#7096D1] font-bold">{prj.id}</span>
                    <span>?</span>
                    <span>Lead: {prj.leadConsultant}</span>
                    <span>?</span>
                    <span>Target: {prj.targetDate}</span>
                  </div>
                  <h3 className="font-sans tracking-tight text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {prj.name}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">
                    Current Phase: <strong className="text-slate-300">{prj.phase}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-surface-subtle p-3 rounded-xl border border-surface-border text-center font-mono">
                  <div>
                    <div className="text-lg font-bold text-emerald-400">{prj.complianceScore}%</div>
                    <div className="text-[9px] text-slate-400">Assurance Score</div>
                  </div>
                  <div className="w-px h-8 bg-surface-border" />
                  <div>
                    <div className="text-lg font-bold text-[#334DAF] dark:text-[#7096D1]">{prj.progress}%</div>
                    <div className="text-[9px] text-slate-400">Milestones Done</div>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-surface-base h-2.5 rounded-full overflow-hidden border border-surface-border">
                <div 
                  className="bg-gradient-to-r from-[#334DAF] to-emerald-400 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${prj.progress}%` }} 
                />
              </div>

              {/* Milestones Checklist */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Verification Milestones (Interactive Sign-Off)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {prj.milestones.map(m => (
                    <div 
                      key={m.id} 
                      className={`p-3.5 rounded-xl border flex items-start justify-between gap-3 ${
                        m.status === 'Completed' ? 'bg-emerald-500/5 border-emerald-500/20 text-slate-200' : 'bg-surface-subtle border-surface-border text-slate-400'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white">
                          {m.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 mt-1">
                          Deadline: {m.date}
                        </div>
                      </div>

                      <button
                        onClick={() => updateMilestone(prj.id, m.id, m.status === 'Completed' ? 'In Progress' : 'Completed')}
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${
                          m.status === 'Completed' 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                        title="Click to toggle status"
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
      )}

      {/* Tab Content: Documents Vault */}
      {activeTab === 'documents' && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-sans tracking-tight text-xl font-bold text-slate-900 dark:text-white">
                Encrypted Institutional Repository
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                SHA-256 cryptographic attestation & verified regulatory seals
              </p>
            </div>
            <button
              onClick={() => setIsUploading(!isUploading)}
              className="px-4 py-2 rounded-xl bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload Compliance Evidence</span>
            </button>
          </div>

          {isUploading && (
            <form onSubmit={handleUpload} className="p-4 rounded-xl bg-surface-subtle border border-surface-border flex gap-3 animate-fade-in">
              <input
                type="text"
                required
                placeholder="Enter document title (e.g. Model_Card_V2_Draft.pdf)..."
                value={uploadFileName}
                onChange={e => setUploadFileName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-surface-raised border border-surface-border text-xs text-slate-900 dark:text-white outline-none focus:border-[#334DAF] dark:border-[#7096D1]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-emerald-500 text-white font-bold text-xs"
              >
                Upload & Verify
              </button>
            </form>
          )}

          <div className="space-y-3">
            {documents.map(doc => (
              <div 
                key={doc.id}
                className="p-4 rounded-xl bg-surface-raised border border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#334DAF]/10 dark:bg-[#7096D1]/15 text-[#334DAF] dark:text-[#7096D1] flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white font-mono">
                      {doc.name}
                    </h4>
                    <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center gap-2">
                      <span>{doc.size}</span>
                      <span>?</span>
                      <span>Uploaded by {doc.uploadedBy} ({doc.uploadDate})</span>
                    </div>
                    <div className="text-[10px] text-[#334DAF] dark:text-[#7096D1] font-mono mt-1">
                      Hash: {doc.encryptionHash}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    {doc.status}
                  </span>
                  <button 
                    onClick={() => alert(`Downloading verified cryptographic dossier: ${doc.name}`)}
                    className="p-2 rounded-lg bg-surface-subtle hover:bg-surface-border text-slate-300"
                    title="Download Attested Copy"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Consultations */}
      {activeTab === 'sessions' && (
        <div className="space-y-4 animate-fade-in max-w-3xl">
          {consultations.map(apt => (
            <div key={apt.id} className="p-5 rounded-xl bg-surface-raised border border-surface-border flex items-center justify-between shadow-sm">
              <div>
                <span className="text-[10px] font-mono text-[#334DAF] dark:text-[#7096D1] uppercase tracking-wider font-bold">
                  {apt.id} ? {apt.timezone}
                </span>
                <h4 className="font-sans tracking-tight font-bold text-base text-slate-900 dark:text-white mt-0.5">
                  {apt.title}
                </h4>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Consultant: <strong className="text-white">{apt.consultant}</strong> ({apt.date} @ {apt.time})
                </div>
              </div>

              <div className="text-right space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold block">
                  {apt.status}
                </span>
                <button 
                  onClick={() => alert(`Launching encrypted video conference with ${apt.consultant}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#334DAF] text-white dark:bg-[#7096D1] dark:text-[#101E42] font-bold text-xs shadow-sm flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Join Secure Room</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab Content: Billing */}
      {activeTab === 'billing' && (
        <div className="space-y-4 animate-fade-in max-w-3xl">
          {invoices.map(inv => (
            <div key={inv.id} className="p-5 rounded-xl bg-surface-raised border border-surface-border flex items-center justify-between shadow-sm font-mono text-xs">
              <div>
                <span className="font-bold text-[#334DAF] dark:text-[#7096D1]">{inv.id}</span>
                <div className="font-sans font-bold text-sm text-slate-900 dark:text-white mt-0.5">{inv.project}</div>
                <div className="text-slate-500 mt-1">Issued: {inv.issueDate} ? Due: {inv.dueDate}</div>
              </div>

              <div className="text-right space-y-1">
                <div className="text-base font-bold text-slate-900 dark:text-white">{inv.amount}</div>
                <span className={`px-2 py-0.5 rounded font-bold inline-block text-[10px] ${
                  inv.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {inv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
