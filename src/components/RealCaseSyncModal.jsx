import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Calendar, 
  Globe, 
  CheckCircle2, 
  FileText, 
  Clock, 
  KeyRound,
  UserCheck
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countryProcessingData';
import { VISA_STREAMS } from '../data/visaStreams';
import { playCyberSound } from '../utils/audio';

export const RealCaseSyncModal = ({ isOpen, onClose, currentProfile, onSaveProfile }) => {
  const [applicantName, setApplicantName] = useState(currentProfile?.applicantName || '');
  const [applicationNumber, setApplicationNumber] = useState(currentProfile?.applicationNumber || '');
  const [uci, setUci] = useState(currentProfile?.uci || '');
  const [streamId, setStreamId] = useState(currentProfile?.streamId || 'study_permit');
  const [countryCode, setCountryCode] = useState(currentProfile?.countryCode || 'NG');
  const [submissionDate, setSubmissionDate] = useState(currentProfile?.submissionDate || '2026-06-20');
  const [targetDestination, setTargetDestination] = useState(currentProfile?.institution || 'University of Toronto / Canadian Employer');
  
  // Real GCKey status checkboxes
  const [biometricsStatus, setBiometricsStatus] = useState('completed'); // 'exempt', 'required', 'completed'
  const [medicalStatus, setMedicalStatus] = useState('passed'); // 'not_required', 'required', 'passed'
  const [bgcStatus, setBgcStatus] = useState('in_progress'); // 'not_started', 'in_progress', 'completed'
  const [eligibilityStatus, setEligibilityStatus] = useState('in_progress'); // 'not_started', 'in_progress', 'passed'
  const [decisionStatus, setDecisionStatus] = useState('in_progress'); // 'in_progress', 'approved', 'refused'
  const [notes, setNotes] = useState(currentProfile?.notes || '');

  if (!isOpen) return null;

  const selectedStreamObj = VISA_STREAMS.find(s => s.id === streamId) || VISA_STREAMS[0];
  const selectedCountryObj = COUNTRIES_DATA.find(c => c.code === countryCode) || COUNTRIES_DATA[0];

  const handleSyncSubmit = (e) => {
    e.preventDefault();
    if (!applicationNumber.trim() || !applicantName.trim()) return;

    playCyberSound('success');

    // Determine current stage index based on exact GCKey statuses
    let calculatedStageIdx = 1; // Default AOR
    if (decisionStatus === 'approved') calculatedStageIdx = 6;
    else if (decisionStatus === 'ppr' || bgcStatus === 'completed') calculatedStageIdx = 5;
    else if (eligibilityStatus === 'in_progress' || bgcStatus === 'in_progress') calculatedStageIdx = 4;
    else if (medicalStatus === 'passed') calculatedStageIdx = 3;
    else if (biometricsStatus === 'completed') calculatedStageIdx = 2;

    // Real mathematical decision date
    const subDate = new Date(submissionDate);
    const standardDays = selectedCountryObj.processingTimes?.[streamId]?.days || (selectedStreamObj.officialStandardWeeks * 7);
    const targetDate = new Date(subDate.getTime() + standardDays * 24 * 60 * 60 * 1000);
    const etaFormatted = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const updatedProfile = {
      id: currentProfile?.id || ('my_case_' + Date.now()),
      title: `${selectedStreamObj.name} - ${applicantName.trim()}`,
      applicantName: applicantName.trim(),
      streamId: selectedStreamObj.id,
      streamName: `${selectedStreamObj.name} (${selectedStreamObj.officialForm})`,
      countryCode: selectedCountryObj.code,
      countryName: selectedCountryObj.name,
      applicationNumber: applicationNumber.trim().toUpperCase(),
      uci: uci.trim(),
      submissionDate: submissionDate,
      currentStageIndex: calculatedStageIdx,
      statusTitle: calculatedStageIdx === 6 ? 'Port of Entry (POE) Letter / e-CoPR Approved' :
                   calculatedStageIdx === 5 ? 'Original Passport Request (PPR / OPR) Ready' :
                   calculatedStageIdx === 4 ? 'Section 11.2 / R216 Eligibility & Background Check Active' :
                   calculatedStageIdx === 3 ? 'Medical Exam (IME) Passed // Eligibility Under Review' :
                   calculatedStageIdx === 2 ? 'Biometrics Enrolled // Medical & Background Check In Queue' :
                   calculatedStageIdx === 1 ? 'AOR Issued // Primary Visa Office Assigned' :
                   'Application Submitted & Fees Paid',
      statusBadge: calculatedStageIdx >= 5 ? 'NEAR DECISION' : 'IN PROGRESS',
      statusTheme: 'cyan',
      intakeTerm: 'Active Case File',
      institution: targetDestination.trim() || 'Canadian Destination',
      fieldOfStudy: `${selectedStreamObj.governingAct} (${selectedCountryObj.visaOffice})`,
      estimatedCompletionDate: etaFormatted,
      lastUpdated: 'Synchronized with your real GCKey status entries',
      timeline: selectedStreamObj.typicalSteps.map((step, idx) => ({
        stageId: step.id,
        title: step.title,
        date: idx < calculatedStageIdx ? 'Completed' : idx === calculatedStageIdx ? 'Current Stage' : 'Pending',
        status: idx < calculatedStageIdx ? 'completed' : idx === calculatedStageIdx ? 'active' : 'pending',
        details: step.desc
      })),
      actionItems: currentProfile?.actionItems || selectedStreamObj.mandatoryDocuments.slice(0, 3).map((doc, idx) => ({
        id: `act_${Date.now()}_${idx}`,
        type: idx === 0 ? 'critical' : 'warning',
        title: `Verify ${doc.name}`,
        desc: doc.requirement,
        deadline: new Date(Date.now() + (idx + 1) * 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        daysLeft: (idx + 1) * 14,
        actionLink: 'Document Checklist',
        status: 'needs_action'
      })),
      documents: currentProfile?.documents || selectedStreamObj.mandatoryDocuments.map((doc, idx) => ({
        id: `doc_${Date.now()}_${idx}`,
        name: doc.name,
        type: 'PDF',
        status: 'verified',
        size: '1.8 MB',
        uploadedDate: submissionDate
      })),
      notes: notes.trim() || `Real application record synchronized for ${applicantName.trim()}. Visa Office: ${selectedCountryObj.visaOffice}.`
    };

    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="w-full max-w-3xl rounded-3xl bg-[#060b1d] border border-cyan-400/80 p-5 sm:p-7 shadow-[0_0_70px_rgba(0,240,255,0.35)] text-slate-100 font-sans relative my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Sync & Load Your Real IRCC Application Status
            </h2>
            <p className="text-xs text-cyan-300 font-mono">
              Match your exact GCKey & IRCC Application Status Tracker details to power your live HUD
            </p>
          </div>
        </div>

        {/* Official IRCC Portal Quick Links */}
        <div className="my-4 p-3 rounded-2xl bg-[#030612] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="text-slate-300 text-center sm:text-left">
            <span>Verify your current GCKey status directly on official portals:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="https://ircc-tracker-suivi.cic.gc.ca/en/login"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 text-cyan-200 flex items-center gap-1.5 font-bold transition-colors"
            >
              <span>IRCC STATUS TRACKER</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.canada.ca/en/immigration-refugees-citizenship/services/application/account.html"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 flex items-center gap-1.5 font-bold transition-colors"
            >
              <span>GCKEY PORTAL</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSyncSubmit} className="space-y-4 font-mono text-xs">
          {/* Row 1: Identification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Your Full Legal Name (As in Passport):
              </label>
              <input
                type="text"
                required
                placeholder="e.g. John Doe"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white font-sans outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Your IRCC Application Number (App #):
              </label>
              <input
                type="text"
                required
                placeholder="e.g. S304918204, V392810294, E003819201"
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 font-bold uppercase outline-none text-sm"
              />
            </div>
          </div>

          {/* Row 2: UCI, Visa Category & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                10-Digit UCI Number:
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 11-4820-9184"
                value={uci}
                onChange={(e) => setUci(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-purple-300 font-bold outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Visa Stream:
              </label>
              <select
                value={streamId}
                onChange={(e) => setStreamId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 font-sans outline-none text-sm"
              >
                {VISA_STREAMS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Country of Application:
              </label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-cyan-300 font-sans outline-none text-sm"
              >
                {COUNTRIES_DATA.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Submission Date & Destination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Date You Submitted Application:
              </label>
              <input
                type="date"
                required
                value={submissionDate}
                onChange={(e) => setSubmissionDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white outline-none text-sm"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-bold">
                Target Institution / Employer / Canadian City:
              </label>
              <input
                type="text"
                placeholder="e.g. University of Toronto, Vancouver, Montreal"
                value={targetDestination}
                onChange={(e) => setTargetDestination(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-slate-700 focus:border-cyan-400 text-white font-sans outline-none text-sm"
              />
            </div>
          </div>

          {/* Row 4: Exact GCKey Status Checkboxes */}
          <div className="p-4 rounded-2xl bg-[#030612] border border-cyan-500/30 space-y-3">
            <div className="font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Enter What Your Actual GCKey / Tracker Displays Right Now:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="block text-slate-400 mb-1">Biometrics Status:</span>
                <select
                  value={biometricsStatus}
                  onChange={(e) => setBiometricsStatus(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#060b1d] border border-slate-700 text-slate-200"
                >
                  <option value="completed">Completed / Enrolled (Valid for 10 Yrs)</option>
                  <option value="required">We need your fingerprints (BIL Issued)</option>
                  <option value="exempt">Exempt</option>
                </select>
              </div>

              <div>
                <span className="block text-slate-400 mb-1">Medical Exam Status:</span>
                <select
                  value={medicalStatus}
                  onChange={(e) => setMedicalStatus(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#060b1d] border border-slate-700 text-slate-200"
                >
                  <option value="passed">You passed the medical exam (M1)</option>
                  <option value="required">We sent you a medical exam instruction</option>
                  <option value="not_required">You do not need a medical exam</option>
                </select>
              </div>

              <div>
                <span className="block text-slate-400 mb-1">Background Check (BGC):</span>
                <select
                  value={bgcStatus}
                  onChange={(e) => setBgcStatus(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#060b1d] border border-slate-700 text-slate-200"
                >
                  <option value="in_progress">We are processing your background check</option>
                  <option value="not_started">Not started / Not applicable</option>
                  <option value="completed">Background check completed</option>
                </select>
              </div>

              <div>
                <span className="block text-slate-400 mb-1">Final Decision:</span>
                <select
                  value={decisionStatus}
                  onChange={(e) => setDecisionStatus(e.target.value)}
                  className="w-full p-2 rounded-lg bg-[#060b1d] border border-slate-700 text-slate-200"
                >
                  <option value="in_progress">Your application is in progress</option>
                  <option value="ppr">Passport Request (PPR / OPR) Received</option>
                  <option value="approved">Your application was approved</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex justify-end gap-3 font-sans border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-glow-cyan transition-all"
            >
              Save & Power My Live Application HUD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
