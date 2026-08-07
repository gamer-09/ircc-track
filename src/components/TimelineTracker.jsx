import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Info, 
  Calendar,
  Lock,
  Compass,
  FileCheck,
  ChevronDown
} from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const TimelineTracker = ({ profile, onUpdateStage }) => {
  const [selectedStageIndex, setSelectedStageIndex] = useState(profile?.currentStageIndex || 0);

  if (!profile) return null;

  const stages = profile.timeline || [];
  const currentActive = profile.currentStageIndex;

  const handleStageClick = (idx) => {
    playCyberSound('click');
    setSelectedStageIndex(idx);
  };

  const selectedStage = stages[selectedStageIndex] || stages[0];

  const getStageIcon = (idx, status) => {
    if (idx < currentActive || status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    } else if (idx === currentActive) {
      return (
        <div className="relative">
          <div className="w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          </div>
        </div>
      );
    } else {
      return <Circle className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              OFFICIAL 7-STAGE PIPELINE RADAR
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              IRCC WORKFLOW
            </span>
          </div>
          <h2 className="text-xl font-bold font-display text-white mt-1">
            Application Milestone Progression & Logs
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" /> Completed ({currentActive})
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5 text-cyan-400">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Active Stage
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5 text-slate-500">
            <span className="w-2 h-2 rounded-full bg-slate-600" /> Pending ({stages.length - currentActive - 1})
          </span>
        </div>
      </div>

      {/* Futuristic Horizontal / Grid Interactive Step Navigator */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {stages.map((stage, idx) => {
          const isSelected = selectedStageIndex === idx;
          const isDone = idx < currentActive;
          const isActive = idx === currentActive;
          
          return (
            <button
              key={stage.stageId || idx}
              onClick={() => handleStageClick(idx)}
              className={`p-3 rounded-xl text-left transition-all relative overflow-hidden border ${
                isSelected
                  ? 'bg-cyan-950/60 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] text-cyan-200'
                  : isActive
                  ? 'bg-[#0e193c] border-cyan-500/50 text-slate-200'
                  : isDone
                  ? 'bg-[#09122a]/80 border-emerald-500/30 text-slate-300 hover:border-emerald-400/50'
                  : 'bg-[#060b18]/60 border-slate-800 text-slate-500 hover:border-slate-700'
              }`}
            >
              {/* Active top neon indicator */}
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
              )}

              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold">
                  STEP 0{idx + 1}
                </span>
                {getStageIcon(idx, stage.status)}
              </div>

              <div className="font-sans font-bold text-xs line-clamp-1">
                {stage.title}
              </div>

              <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                {stage.date || 'Pending'}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Stage Deep-Dive Inspector Card */}
      {selectedStage && (
        <div className="rounded-xl bg-[#050b1d] border border-cyan-500/40 p-5 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  STAGE {selectedStageIndex + 1}: {selectedStage.stageId?.toUpperCase()}
                </span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded border ${
                  selectedStageIndex < currentActive 
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' 
                    : selectedStageIndex === currentActive 
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse'
                    : 'bg-slate-800 border-slate-700 text-slate-400'
                }`}>
                  STATUS: {selectedStageIndex < currentActive ? 'VERIFIED COMPLETED' : selectedStageIndex === currentActive ? 'CURRENTLY UNDER ASSESSMENT' : 'UPCOMING STEP'}
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-cyan-400" />
                  {selectedStage.date}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-display">
                {selectedStage.title}
              </h3>

              <p className="text-sm text-slate-300 font-sans leading-relaxed">
                {selectedStage.details}
              </p>
            </div>

            {/* Stage Quick Controls */}
            <div className="shrink-0 flex flex-col gap-2">
              {selectedStageIndex === currentActive && (
                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                  <div className="font-bold flex items-center gap-1 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> GCMS RADAR
                  </div>
                  <div>Sub-status: <strong className="text-white">Active Queue Tray</strong></div>
                  <div>Estimated transition: <strong className="text-emerald-400">~6-10 days</strong></div>
                </div>
              )}

              {onUpdateStage && (
                <button
                  onClick={() => {
                    playCyberSound('success');
                    onUpdateStage(selectedStageIndex);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 transition-colors"
                >
                  Set as Current Active Stage
                </button>
              )}
            </div>
          </div>

          {/* IRCC Standard Verification Criteria for this stage */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
            <div className="bg-[#090f24] p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1 font-bold">
                <FileCheck className="w-3.5 h-3.5 text-cyan-400" /> OFFICER CHECKLIST
              </div>
              <div className="text-slate-300 font-sans">
                {selectedStageIndex === 0 && 'Validation of IRCC Portal fee receipt, digital signatures, and barcode generation.'}
                {selectedStageIndex === 1 && 'Creation of GCKey / tracker file and assignment to Primary Processing Center.'}
                {selectedStageIndex === 2 && 'VFS Global biometrics upload, NIST 10-print biographic matching, 10-year validity stamp.'}
                {selectedStageIndex === 3 && 'eMedical IME sheet grading: M1 (Passed), M2 (Surveillance), or M3 (Excessive demand review).'}
                {selectedStageIndex === 4 && 'IRPA A11.2 Eligibility check, Criminality screening, and CSIS/CBSA national security clearance.'}
                {selectedStageIndex === 5 && 'Two-way courier dispatch request for physical passport or Canadian PR portal declaration invite.'}
                {selectedStageIndex === 6 && 'Port of Entry (POE) letter generation or e-CoPR issuance for Canadian arrival.'}
              </div>
            </div>

            <div className="bg-[#090f24] p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1 font-bold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> TIPS TO AVOID DELAYS
              </div>
              <div className="text-slate-300 font-sans">
                {selectedStageIndex === 0 && 'Double-check all names match your passport biographical page character-for-character.'}
                {selectedStageIndex === 1 && 'Link your paper or portal application to GCKey immediately to receive real-time email alerts.'}
                {selectedStageIndex === 2 && 'Attend VAC appointment with printed BIL letter and original valid passport.'}
                {selectedStageIndex === 3 && 'Always use an authorized IRCC Panel Physician with upfront eMedical tracking.'}
                {selectedStageIndex === 4 && 'Ensure all employer reference letters specify exact weekly hours, wage, and lead statements.'}
                {selectedStageIndex === 5 && 'Submit passport with 2 IRCC-spec photos within the 30-day deadline without delay.'}
                {selectedStageIndex === 6 && 'Carry your original Letter of Acceptance, GIC proof, and POE letter in your carry-on bag.'}
              </div>
            </div>

            <div className="bg-[#090f24] p-3 rounded-lg border border-slate-800">
              <div className="text-slate-400 mb-1 flex items-center gap-1 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> "GHOST UPDATE" SIGNAL
              </div>
              <div className="text-slate-300 font-sans">
                {selectedStageIndex <= 2 && 'Status often shows "Application Updated" before an official BIL or AOR email appears.'}
                {selectedStageIndex === 3 && 'Medical status changes to "You passed the medical exam" ~3 to 5 days before file movement.'}
                {selectedStageIndex >= 4 && 'When Background Check status switches from "Not applicable" to "In progress", PPR usually follows in 7-14 days.'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
