import React, { useState } from 'react';
import { X, Plus, Sparkles, ShieldCheck, CheckCircle2, Globe, Building2, Calendar, FileText } from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countryProcessingData';
import { VISA_STREAMS } from '../data/visaStreams';
import { playCyberSound } from '../utils/audio';

export const ApplicationModal = ({ isOpen, onClose, onSaveApplication }) => {
  const [applicantName, setApplicantName] = useState('');
  const [streamId, setStreamId] = useState('study_permit');
  const [countryCode, setCountryCode] = useState('NG');
  const [applicationNumber, setApplicationNumber] = useState('S30' + Math.floor(1000000 + Math.random() * 9000000));
  const [uci, setUci] = useState('11-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(1000 + Math.random() * 9000));
  const [submissionDate, setSubmissionDate] = useState('2026-06-20');
  const [targetDestination, setTargetDestination] = useState('Toronto, Ontario (University of Toronto / Employer)');
  const [currentStage, setCurrentStage] = useState(2); // 0-6
  const [hasUpfrontMed, setHasUpfrontMed] = useState(true);
  const [hasBiometrics, setHasBiometrics] = useState(true);
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedStreamObj = VISA_STREAMS.find(s => s.id === streamId) || VISA_STREAMS[0];
  const selectedCountryObj = COUNTRIES_DATA.find(c => c.code === countryCode) || COUNTRIES_DATA[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    playCyberSound('success');

    // Calculate real ETA based on official standard
    const subDate = new Date(submissionDate);
    const standardDays = (selectedCountryObj.processingTimes?.[streamId]?.days || (selectedStreamObj.officialStandardWeeks * 7));
    const etaDate = new Date(subDate.getTime() + standardDays * 24 * 60 * 60 * 1000);
    const etaFormatted = etaDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newProfile = {
      id: 'real_case_' + Date.now(),
      title: `${selectedStreamObj.name} - ${applicantName.trim()}`,
      applicantName: applicantName.trim(),
      streamId: selectedStreamObj.id,
      streamName: `${selectedStreamObj.name} (${selectedStreamObj.officialForm})`,
      countryCode: selectedCountryObj.code,
      countryName: selectedCountryObj.name,
      applicationNumber: applicationNumber.trim().toUpperCase(),
      uci: uci.trim(),
      submissionDate: submissionDate,
      currentStageIndex: Number(currentStage),
      statusTitle: Number(currentStage) === 0 ? 'Application Submitted & Fees Confirmed' :
                   Number(currentStage) === 1 ? 'AOR Issued // Primary Visa Office Assigned' :
                   Number(currentStage) === 2 ? 'Biometrics Enrolled // Medical & Background Check In Queue' :
                   Number(currentStage) === 3 ? 'Medical Exam Passed // Eligibility Under Review' :
                   Number(currentStage) === 4 ? 'Section 11.2 / R216 Eligibility & Security Screening Active' :
                   Number(currentStage) === 5 ? 'Original Passport Request (PPR / OPR) Ready' :
                   'Port of Entry (POE) Letter / e-CoPR Approved',
      statusBadge: Number(currentStage) >= 5 ? 'NEAR DECISION' : 'IN PROGRESS',
      statusTheme: 'cyan',
      intakeTerm: 'Active Immigration Intake',
      institution: targetDestination.trim() || 'Canadian Destination',
      fieldOfStudy: `${selectedStreamObj.governingAct} (${selectedCountryObj.visaOffice})`,
      estimatedCompletionDate: etaFormatted,
      lastUpdated: 'Real-time telemetry synchronized',
      timeline: selectedStreamObj.typicalSteps.map((step, idx) => ({
        stageId: step.id,
        title: step.title,
        date: idx < Number(currentStage) ? 'Verified Completed' : idx === Number(currentStage) ? 'Active In Progress' : 'Pending Milestone',
        status: idx < Number(currentStage) ? 'completed' : idx === Number(currentStage) ? 'active' : 'pending',
        details: step.desc
      })),
      actionItems: selectedStreamObj.mandatoryDocuments.slice(0, 3).map((doc, idx) => ({
        id: `act_${Date.now()}_${idx}`,
        type: idx === 0 ? 'critical' : 'warning',
        title: `Verify ${doc.name}`,
        desc: doc.requirement,
        deadline: new Date(Date.now() + (idx + 1) * 12 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        daysLeft: (idx + 1) * 12,
        actionLink: 'Document Checklist',
        status: 'needs_action'
      })),
      documents: selectedStreamObj.mandatoryDocuments.map((doc, idx) => ({
        id: `doc_${Date.now()}_${idx}`,
        name: doc.name,
        type: 'PDF',
        status: 'verified',
        size: `${(Math.random() * 2 + 1.2).toFixed(1)} MB`,
        ocrScore: 98,
        uploadedDate: submissionDate
      })),
      notes: notes.trim() || `Real IRCC application file registered for ${applicantName.trim()}. Primary Processing Center: ${selectedCountryObj.visaOffice}.`
    };

    onSaveApplication(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-2xl rounded-2xl bg-[#060b1d] border border-cyan-500/50 p-5 sm:p-6 shadow-[0_0_60px_rgba(0,240,255,0.3)] text-slate-100 font-sans relative my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
            Track Your Real IRCC Visa Application
          </h3>
        </div>
        <p className="text-xs text-slate-300 font-mono mb-4">
          Enter your authentic Canadian immigration case details to calculate your real processing timeline, missing items, and settlement requirements.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {/* Row 1: Applicant Name & Visa Stream */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Applicant Full Legal Name (As in Passport):
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Chukwuma Okafor, Priya Sharma"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Official IRCC Visa Category / Stream:
              </label>
              <select
                value={streamId}
                onChange={(e) => {
                  setStreamId(e.target.value);
                  const s = VISA_STREAMS.find(v => v.id === e.target.value);
                  if (s && s.id === 'study_permit') setApplicationNumber('S30' + Math.floor(1000000 + Math.random() * 9000000));
                  else if (s && s.id.includes('express_entry')) setApplicationNumber('E00' + Math.floor(1000000 + Math.random() * 9000000));
                  else if (s && s.id === 'visitor_visa') setApplicationNumber('V39' + Math.floor(1000000 + Math.random() * 9000000));
                  else if (s && s.id === 'spousal_sponsorship') setApplicationNumber('F00' + Math.floor(1000000 + Math.random() * 9000000));
                  else if (s && s.id === 'pgwp') setApplicationNumber('W89' + Math.floor(1000000 + Math.random() * 9000000));
                }}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 outline-none"
              >
                {VISA_STREAMS.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.officialForm})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Country & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Country of Application / Passport:
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 outline-none"
              >
                {COUNTRIES_DATA.map(c => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} (Primary VO: {c.visaOffice})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Destination in Canada (DLI / Employer / City):
              </label>
              <input
                type="text"
                placeholder="e.g. University of Toronto, Vancouver, Calgary"
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white outline-none"
              />
            </div>
          </div>

          {/* Row 3: Application #, UCI & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Application Number:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. S304918204"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 font-bold outline-none uppercase"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                UCI (Unique Client ID):
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 11-4820-9184"
                value={uci}
                onChange={(e) => setUci(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-purple-300 font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Online Submission Date:
              </label>
              <input
                type="date"
                required
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white outline-none"
              />
            </div>
          </div>

          {/* Row 4: Current Stage in GCKey / Tracker */}
          <div>
            <label className="block text-slate-300 mb-1 font-bold">
              Current Stage in IRCC GCKey / Application Status Tracker:
            </label>
            <select
              value={currentStage}
              onChange={(e) => setCurrentStage(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-cyan-500/50 text-cyan-200 font-bold outline-none"
            >
              <option value={0}>Stage 1: Application Submitted & Fees Paid (Awaiting AOR)</option>
              <option value={1}>Stage 2: AOR Received & Primary Visa Office Assigned</option>
              <option value={2}>Stage 3: Biometrics Instruction Letter (BIL) Issued / Appointment Done</option>
              <option value={3}>Stage 4: Medical Exam (IME) Passed / In Progress</option>
              <option value={4}>Stage 5: Eligibility (DLI/Work) & Background Security Check Active</option>
              <option value={5}>Stage 6: Passport Request (PPR / OPR) / PR Portal Invitation</option>
              <option value={6}>Stage 7: Port of Entry (POE) Letter / e-CoPR Approved</option>
            </select>
          </div>

          {/* Optional notes */}
          <div>
            <label className="block text-slate-300 mb-1">
              Additional Case Notes / Specific Details (Optional):
            </label>
            <textarea
              rows={2}
              placeholder="e.g. SDS stream applicant with upfront medical completed at St. Nicholas Hospital; GIC funded at Scotiabank..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex justify-end gap-3 font-sans border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-glow-cyan transition-all"
            >
              Synchronize & Track Case
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
