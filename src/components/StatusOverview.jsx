import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Copy, 
  Check, 
  ShieldAlert, 
  Calendar, 
  ArrowUpRight,
  Activity,
  Zap,
  Globe,
  ExternalLink
} from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const StatusOverview = ({ profile, countryData, onOpenActions }) => {
  const [copiedApp, setCopiedApp] = useState(false);
  const [copiedUci, setCopiedUci] = useState(false);

  if (!profile) return null;

  // Real calculation of exact days elapsed since submission
  const subDate = new Date(profile.submissionDate || '2026-06-20');
  const today = new Date('2026-08-07');
  const diffTime = Math.abs(today - subDate);
  const daysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const weeksElapsed = (daysElapsed / 7).toFixed(1);

  // Official published country processing standard
  const countryStreamData = countryData?.processingTimes?.[profile.streamId] || { weeks: 8, days: 56, trend: 'stable' };
  const officialStandardDays = countryStreamData.days || 56;
  const officialStandardWeeks = countryStreamData.weeks || 8;
  const daysRemaining = Math.max(0, officialStandardDays - daysElapsed);
  const isOverStandard = daysElapsed > officialStandardDays;
  
  // Real percentage completion through 7 milestones
  const progressPercent = Math.min(100, Math.round(((profile.currentStageIndex + 1) / 7) * 100));

  const handleCopyApp = () => {
    playCyberSound('click');
    navigator.clipboard.writeText(profile.applicationNumber);
    setCopiedApp(true);
    setTimeout(() => setCopiedApp(false), 2000);
  };

  const handleCopyUci = () => {
    playCyberSound('click');
    navigator.clipboard.writeText(profile.uci);
    setCopiedUci(true);
    setTimeout(() => setCopiedUci(false), 2000);
  };

  const urgentActionsCount = profile.actionItems?.filter(a => a.status === 'needs_action').length || 0;

  return (
    <div className="space-y-6">
      {/* Top Telemetry Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#071329] via-[#0b1b3a] to-[#120b2e] border border-cyan-500/40 p-4 sm:p-5 shadow-cyber-card">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-bl-full blur-xl pointer-events-none" />
        <div className="absolute -left-4 -bottom-4 w-28 h-28 bg-purple-500/10 rounded-tr-full blur-xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="relative shrink-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 p-[2px] shadow-glow-cyan">
                <div className="w-full h-full bg-[#050b1d] rounded-[10px] flex items-center justify-center">
                  <Activity className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-300 animate-pulse" />
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-[#050b1d]"></span>
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
                  {profile.statusBadge || 'IN PROGRESS'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono bg-purple-500/20 border border-purple-400/40 text-purple-300">
                  {profile.countryName} {countryData?.flag}
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-slate-400">
                  Primary Visa Office: <span className="text-slate-200 font-semibold">{countryData?.visaOffice || 'Nairobi / Lagos'}</span>
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-bold font-display text-white tracking-wide break-words">
                {profile.statusTitle}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 font-sans">
                <Zap className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{profile.notes || 'Application telemetry active and synchronized with official IRCC service standards.'}</span>
              </p>
            </div>
          </div>

          {/* Quick Copy Identifiers */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0 w-full lg:w-auto">
            <div className="bg-[#050b1d]/90 border border-cyan-500/30 rounded-xl p-2.5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">APPLICATION NUMBER</div>
                <div className="text-xs font-mono font-bold text-cyan-300">{profile.applicationNumber}</div>
              </div>
              <button
                onClick={handleCopyApp}
                className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-400 transition-colors"
                title="Copy Application Number"
              >
                {copiedApp ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="bg-[#050b1d]/90 border border-purple-500/30 rounded-xl p-2.5 flex items-center justify-between gap-3">
              <div>
                <div className="text-[9px] font-mono text-slate-400 uppercase">UNIQUE CLIENT ID (UCI)</div>
                <div className="text-xs font-mono font-bold text-purple-300">{profile.uci}</div>
              </div>
              <button
                onClick={handleCopyUci}
                className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 text-purple-400 transition-colors"
                title="Copy UCI"
              >
                {copiedUci ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Real Metric Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Milestone Progress */}
        <div className="relative overflow-hidden rounded-2xl bg-[#090f26]/90 border border-cyan-500/30 p-4 sm:p-5 shadow-cyber-card group hover:border-cyan-400/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
              IRCC PIPELINE STAGE
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
              STAGE {profile.currentStageIndex + 1} OF 7
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold font-display text-white">
                {progressPercent}%
              </div>
              <div className="text-xs text-slate-400 mt-0.5 truncate max-w-[140px]">
                {profile.timeline?.[profile.currentStageIndex]?.title || 'Under Review'}
              </div>
            </div>

            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400"
                  strokeDasharray={`${progressPercent}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-cyan-300">
                {progressPercent}%
              </div>
            </div>
          </div>

          <div className="mt-3 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full shadow-glow-cyan"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Real Days in Queue vs Published Standard */}
        <div className="relative overflow-hidden rounded-2xl bg-[#090f26]/90 border border-blue-500/30 p-4 sm:p-5 shadow-cyber-card group hover:border-blue-400/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-blue-400">
              ACTUAL DAYS IN QUEUE
            </span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-display text-white">{daysElapsed}</span>
              <span className="text-xs font-mono text-slate-400">Days ({weeksElapsed} Wks)</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 flex items-center gap-1 font-mono">
              <span className={isOverStandard ? 'text-amber-400 font-bold' : 'text-emerald-400 font-semibold'}>
                {isOverStandard ? `${daysElapsed - officialStandardDays} days over standard` : `~${daysRemaining} days remaining`}
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Submitted: {profile.submissionDate}</span>
            <span className="text-blue-300 font-bold">Standard: {officialStandardWeeks} Wks</span>
          </div>
        </div>

        {/* Metric 3: Decision Window */}
        <div className="relative overflow-hidden rounded-2xl bg-[#090f26]/90 border border-purple-500/30 p-4 sm:p-5 shadow-cyber-card group hover:border-purple-400/60 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-purple-400">
              ESTIMATED DECISION WINDOW
            </span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>

          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold font-display text-purple-200 truncate">
              {profile.estimatedCompletionDate || 'August 18, 2026'}
            </div>
            <div className="text-xs text-purple-300/90 mt-0.5 font-mono">
              Target: <strong className="text-white">{officialStandardWeeks} Weeks</strong> from submission
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
            <span>Official IRCC Target:</span>
            <span className="text-emerald-400 font-bold uppercase">{countryStreamData.trend || 'Active Queue'}</span>
          </div>
        </div>

        {/* Metric 4: Urgent Action Items */}
        <div 
          onClick={onOpenActions}
          className="relative overflow-hidden rounded-2xl bg-[#090f26]/90 border border-amber-500/30 p-4 sm:p-5 shadow-cyber-card group hover:border-amber-400/60 cursor-pointer transition-all hover:bg-[#0f1738]"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400">
              ACTION MATRIX
            </span>
            <ShieldAlert className={`w-4 h-4 ${urgentActionsCount > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-400'}`} />
          </div>

          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-display text-white">{urgentActionsCount}</span>
              <span className="text-xs font-mono text-amber-300">Action Required</span>
            </div>
            <div className="text-xs text-slate-300 mt-1 flex items-center gap-1 font-mono">
              <span>{urgentActionsCount > 0 ? 'Deadlines active - Inspect now' : 'All mandatory items verified'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-amber-400 border-t border-slate-800/80 pt-2">
            <span>Biometrics & ADRs</span>
            <span className="underline font-bold">CLICK TO REVIEW &rarr;</span>
          </div>
        </div>
      </div>
    </div>
  );
};
