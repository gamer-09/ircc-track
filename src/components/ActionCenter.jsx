import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Trash2, 
  Calculator, 
  DollarSign, 
  Info, 
  Sparkles, 
  ExternalLink,
  HelpCircle,
  FileCheck2
} from 'lucide-react';
import { STUDY_PERMIT_FUNDS, EXPRESS_ENTRY_FUNDS, ACCEPTABLE_FINANCIAL_DOCS } from '../data/fundsRequirements';
import { playCyberSound } from '../utils/audio';

export const ActionCenter = ({ profile, onToggleAction, onAddCustomAction }) => {
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionDesc, setNewActionDesc] = useState('');
  const [newActionDeadline, setNewActionDeadline] = useState('2026-08-25');
  const [familySize, setFamilySize] = useState(1);
  const [tuitionFeeCAD, setTuitionFeeCAD] = useState(16500);
  const [currentSavingsCAD, setCurrentSavingsCAD] = useState(38000);
  const [isStudyStream, setIsStudyStream] = useState(profile?.streamId === 'study_permit');

  if (!profile) return null;

  const actions = profile.actionItems || [];
  const urgentCount = actions.filter(a => a.status === 'needs_action').length;

  // Calculate required settlement funds
  let requiredFundsCAD = 0;
  if (isStudyStream) {
    // 2024-2026 IRCC updated student cost of living $20,635
    const livingCost = STUDY_PERMIT_FUNDS.singleStudentCostOfLiving + 
      (familySize > 1 ? STUDY_PERMIT_FUNDS.firstDependentCostOfLiving : 0) +
      (familySize > 2 ? (familySize - 2) * STUDY_PERMIT_FUNDS.additionalDependentCostOfLiving : 0);
    requiredFundsCAD = livingCost + Number(tuitionFeeCAD);
  } else {
    // Express Entry 2024-2026 threshold
    const match = EXPRESS_ENTRY_FUNDS.find(f => f.familySize === familySize) || EXPRESS_ENTRY_FUNDS[0];
    requiredFundsCAD = match.requiredCAD;
  }

  const fundsSurplus = currentSavingsCAD - requiredFundsCAD;
  const isFundsSufficient = fundsSurplus >= 0;

  // Refusal / Delay Risk Score calculation
  let baseRisk = 12; // Base baseline risk
  if (urgentCount > 0) baseRisk += urgentCount * 22;
  if (!isFundsSufficient) baseRisk += 35;
  const riskScore = Math.min(95, baseRisk);

  const handleAddAction = (e) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    playCyberSound('click');
    const newAction = {
      id: 'custom_' + Date.now(),
      type: 'critical',
      title: newActionTitle.trim(),
      desc: newActionDesc.trim() || 'Custom user action item',
      deadline: newActionDeadline,
      daysLeft: 14,
      actionLink: 'User Added Item',
      status: 'needs_action'
    };

    onAddCustomAction(newAction);
    setNewActionTitle('');
    setNewActionDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Refusal Risk Gauge */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-amber-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                CRITICAL ACTION ENGINE & DEFECT DETECTOR
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-300 border border-amber-500/30">
                AI AUDIT ACTIVE
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Urgent Next Steps & What to Do Next
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Real-time radar for mandatory IRCC deadlines, Biometrics collection windows (BIL), DLI verification, and Additional Document Requests (ADR).
            </p>
          </div>

          {/* Dynamic Risk Gauge */}
          <div className="flex items-center gap-4 bg-[#050b1d] p-3.5 rounded-xl border border-slate-800 shrink-0">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">REFUSAL / DELAY RISK:</div>
              <div className={`text-2xl font-bold font-display ${
                riskScore > 50 ? 'text-rose-400' : riskScore > 25 ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {riskScore}% ({riskScore > 50 ? 'HIGH RISK' : riskScore > 25 ? 'MODERATE' : 'LOW RISK'})
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {urgentCount} critical actions pending
              </div>
            </div>

            <div className="w-12 h-12 rounded-full border-2 border-slate-700 flex items-center justify-center relative">
              <div 
                className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs ${
                  riskScore > 50 ? 'bg-rose-500/20 text-rose-300 border border-rose-500' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                }`}
              >
                {riskScore}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Checklist Items */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-display text-lg">
              Active Action Matrix ({actions.length} Total / {urgentCount} Urgent)
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Click checkbox to mark resolved
          </span>
        </div>

        <div className="space-y-3">
          {actions.map((act) => {
            const isResolved = act.status === 'completed';
            const isCritical = act.type === 'critical';

            return (
              <div
                key={act.id}
                className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isResolved
                    ? 'bg-[#050b1d]/50 border-slate-800/80 opacity-60'
                    : isCritical
                    ? 'bg-amber-950/20 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                    : 'bg-[#090f26] border-cyan-500/30'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => {
                      playCyberSound(isResolved ? 'click' : 'success');
                      onToggleAction(act.id);
                    }}
                    className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-colors border ${
                      isResolved
                        ? 'bg-emerald-500 border-emerald-400 text-black'
                        : 'border-slate-600 hover:border-cyan-400 bg-slate-900'
                    }`}
                  >
                    {isResolved && <CheckCircle2 className="w-4 h-4 text-slate-950" />}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isCritical
                          ? 'bg-rose-500/20 border border-rose-500/50 text-rose-300'
                          : 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                      }`}>
                        {act.type?.toUpperCase()}
                      </span>
                      <h4 className={`font-sans font-bold text-sm ${isResolved ? 'line-through text-slate-400' : 'text-white'}`}>
                        {act.title}
                      </h4>
                    </div>

                    <p className="text-xs text-slate-300 font-sans max-w-2xl">
                      {act.desc}
                    </p>
                  </div>
                </div>

                {/* Deadline countdown & action link */}
                <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>DEADLINE: {act.deadline}</span>
                    </div>
                    <div className={`text-xs font-mono font-bold ${
                      act.daysLeft <= 10 ? 'text-rose-400 animate-pulse' : 'text-amber-300'
                    }`}>
                      {isResolved ? 'RESOLVED' : `${act.daysLeft} DAYS REMAINING`}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded bg-[#050b1d] border border-cyan-500/30 text-xs font-mono text-cyan-300">
                    {act.actionLink || 'Portal'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Custom Task Form */}
        <form onSubmit={handleAddAction} className="pt-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input
            type="text"
            placeholder="Add new action or missing document..."
            value={newActionTitle}
            onChange={(e) => setNewActionTitle(e.target.value)}
            className="sm:col-span-2 px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-white font-mono focus:border-cyan-400 outline-none"
          />
          <input
            type="date"
            value={newActionDeadline}
            onChange={(e) => setNewActionDeadline(e.target.value)}
            className="px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-cyan-300 font-mono focus:border-cyan-400 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>ADD ACTION</span>
          </button>
        </form>
      </div>

      {/* Proof of Funds & Cost of Living Settlement Calculator (2024-2026 IRCC baseline) */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-white font-display text-lg">
                Proof of Funds (Settlement & Living Expenses) Calculator
              </h3>
              <div className="text-[10px] font-mono text-cyan-400">
                2024 - 2026 IRCC MANDATORY SETTLEMENT BASELINE
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => {
                playCyberSound('click');
                setIsStudyStream(true);
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                isStudyStream ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 font-bold' : 'text-slate-400'
              }`}
            >
              Study Permit Rules
            </button>
            <button
              onClick={() => {
                playCyberSound('click');
                setIsStudyStream(false);
              }}
              className={`px-3 py-1 rounded-lg transition-colors ${
                !isStudyStream ? 'bg-purple-500/30 border border-purple-400 text-purple-200 font-bold' : 'text-slate-400'
              }`}
            >
              Express Entry PR Rules
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#050b1d] p-4 rounded-xl border border-slate-800 space-y-3">
            <label className="block text-xs font-mono text-slate-300">
              <span>Family / Accompanying Size:</span>
              <select
                value={familySize}
                onChange={(e) => setFamilySize(Number(e.target.value))}
                className="mt-1 w-full bg-[#080e21] border border-slate-700 rounded-lg p-2 text-xs font-mono text-cyan-300"
              >
                <option value={1}>1 (Single Applicant)</option>
                <option value={2}>2 (Applicant + Spouse / 1 Child)</option>
                <option value={3}>3 (Applicant + Spouse + 1 Child)</option>
                <option value={4}>4 (Family of 4)</option>
                <option value={5}>5 (Family of 5)</option>
              </select>
            </label>

            {isStudyStream && (
              <label className="block text-xs font-mono text-slate-300">
                <span>First-Year Tuition Fee (CAD $):</span>
                <input
                  type="number"
                  value={tuitionFeeCAD}
                  onChange={(e) => setTuitionFeeCAD(e.target.value)}
                  className="mt-1 w-full bg-[#080e21] border border-slate-700 rounded-lg p-2 text-xs font-mono text-white"
                />
              </label>
            )}

            <label className="block text-xs font-mono text-slate-300">
              <span>Your Liquid Savings / GIC Funds (CAD $):</span>
              <input
                type="number"
                value={currentSavingsCAD}
                onChange={(e) => setCurrentSavingsCAD(e.target.value)}
                className="mt-1 w-full bg-[#080e21] border border-slate-700 rounded-lg p-2 text-xs font-mono text-emerald-300 font-bold"
              />
            </label>
          </div>

          {/* Calculator Output */}
          <div className="md:col-span-2 bg-[#050b1d] p-4 rounded-xl border border-cyan-500/30 flex flex-col justify-between space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">OFFICIAL REQUIRED MINIMUM</div>
                <div className="text-2xl font-bold font-display text-white mt-0.5">
                  ${requiredFundsCAD.toLocaleString()} CAD
                </div>
                <div className="text-[10px] font-mono text-cyan-300 mt-1">
                  {isStudyStream 
                    ? `$20,635 CAD Living Cost + $${Number(tuitionFeeCAD).toLocaleString()} Tuition`
                    : `Express Entry Table for ${familySize} person(s)`}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-slate-400 uppercase">PROOF STATUS & BALANCE</div>
                <div className={`text-2xl font-bold font-display mt-0.5 ${
                  isFundsSufficient ? 'text-emerald-400' : 'text-rose-400'
                }`}>
                  {isFundsSufficient ? 'SUFFICIENT FUNDS' : 'DEFICIT DETECTED'}
                </div>
                <div className="text-xs font-mono text-slate-300 mt-1">
                  {isFundsSufficient 
                    ? `+$${fundsSurplus.toLocaleString()} CAD Safety Buffer`
                    : `Short by -$${Math.abs(fundsSurplus).toLocaleString()} CAD`}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#080e21] border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-mono text-[10px] text-cyan-400 font-bold uppercase flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> CRITICAL IRCC PROOF OF FUNDS RULE:
              </div>
              <p className="text-[11px] leading-relaxed">
                Bank statements must show a stable 4 to 6-month average balance. Sudden large deposits without a proven paper trail (e.g. sale of land, bonus receipt) trigger immediate refusal under IRPA R205/R216.
              </p>
            </div>
          </div>
        </div>

        {/* Acceptable Financial Documents Guide Table */}
        <div className="border-t border-slate-800 pt-4 space-y-2">
          <div className="text-xs font-mono font-bold text-cyan-400 uppercase">
            ACCEPTABLE VS HIGH-RISK FINANCIAL DOCUMENTS:
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
            {ACCEPTABLE_FINANCIAL_DOCS.slice(0, 4).map((doc, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-[#050b1d] border border-slate-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-slate-200">{doc.name}</div>
                  <div className="text-[10px] text-slate-400">{doc.tip}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
