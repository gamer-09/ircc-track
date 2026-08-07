import React from 'react';
import { X, Printer, Download, Sparkles, ShieldCheck, CheckCircle2, Radar } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const DossierReportModal = ({ isOpen, onClose, profile, countryData }) => {
  if (!isOpen || !profile) return null;

  const handlePrint = () => {
    playCyberSound('click');
    window.print();
  };

  const stages = profile.timeline || [];
  const activeIdx = profile.currentStageIndex;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
      <div className="w-full max-w-3xl rounded-2xl bg-[#080e21] border border-cyan-400 p-6 shadow-[0_0_50px_rgba(0,240,255,0.35)] text-slate-100 font-sans relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Printable Dossier Content */}
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b-2 border-cyan-500 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Radar className="w-6 h-6 text-cyan-400" />
                <span className="font-display font-bold text-xl tracking-wider text-cyan-300">
                  IRCC // AURA INTELLIGENCE DOSSIER
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                OFFICIAL VISA APPLICATION TELEMETRY & STATUS REPORT
              </p>
            </div>

            <div className="text-right font-mono text-xs text-slate-300">
              <div>REPORT ID: <strong className="text-cyan-300">AUR-{profile.applicationNumber}</strong></div>
              <div>ISSUED: <strong className="text-white">August 7, 2026</strong></div>
            </div>
          </div>

          {/* Applicant & Case Overview Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#050b1d] p-4 rounded-xl border border-slate-800 text-xs font-mono">
            <div>
              <span className="text-slate-400 text-[10px]">APPLICANT NAME</span>
              <div className="font-bold text-white text-sm">{profile.applicantName}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">APPLICATION #</span>
              <div className="font-bold text-cyan-300 text-sm">{profile.applicationNumber}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">UCI NUMBER</span>
              <div className="font-bold text-purple-300 text-sm">{profile.uci}</div>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">COUNTRY & VO</span>
              <div className="font-bold text-emerald-300 text-sm">{profile.countryName} ({countryData?.visaOffice || 'Primary'})</div>
            </div>
          </div>

          {/* Current Status Banner */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/50">
            <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">CURRENT STATUS MILESTONE:</div>
            <div className="text-lg font-bold font-display text-white mt-0.5">
              {profile.statusTitle}
            </div>
            <div className="text-xs text-slate-300 mt-1">
              Estimated Completion: <strong className="text-cyan-300 font-mono">{profile.estimatedCompletionDate}</strong> (~{countryData?.processingTimes?.[profile.streamId]?.weeks || 8} weeks median)
            </div>
          </div>

          {/* Timeline Milestones Table */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-bold text-cyan-400 uppercase">
              MILESTONE VERIFICATION LOG:
            </h4>
            <div className="border border-slate-800 rounded-xl overflow-hidden text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-[#050b1d] text-slate-400 border-b border-slate-800 text-[10px]">
                  <tr>
                    <th className="p-2.5">STEP</th>
                    <th className="p-2.5">STAGE TITLE</th>
                    <th className="p-2.5">DATE LOGGED</th>
                    <th className="p-2.5">STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {stages.map((stg, i) => (
                    <tr key={i} className={i === activeIdx ? 'bg-cyan-500/10' : ''}>
                      <td className="p-2.5 font-bold text-cyan-300">0{i + 1}</td>
                      <td className="p-2.5 font-sans font-medium text-slate-200">{stg.title}</td>
                      <td className="p-2.5 text-slate-400">{stg.date}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                          i < activeIdx ? 'bg-emerald-500/20 text-emerald-300' :
                          i === activeIdx ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {i < activeIdx ? 'PASSED' : i === activeIdx ? 'UNDER REVIEW' : 'PENDING'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Items List */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs font-bold text-amber-400 uppercase">
              OUTSTANDING ACTION ITEMS & CHECKLIST:
            </h4>
            <div className="space-y-1.5">
              {profile.actionItems?.map((a) => (
                <div key={a.id} className="p-2.5 rounded-lg bg-[#050b1d] border border-slate-800 text-xs font-mono flex items-center justify-between">
                  <span className="text-slate-200 font-sans">{a.title}</span>
                  <span className="text-amber-300 text-[10px] font-bold">DEADLINE: {a.deadline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="border-t border-slate-800 pt-4 flex justify-end gap-3 font-mono text-xs print:hidden">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold shadow-glow-cyan flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>PRINT / SAVE AS PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
