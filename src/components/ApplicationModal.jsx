import React, { useState } from 'react';
import { X, Plus, Sparkles, ShieldCheck } from 'lucide-react';
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
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!applicantName.trim()) return;

    playCyberSound('success');
    const selectedStreamObj = VISA_STREAMS.find(s => s.id === streamId) || VISA_STREAMS[0];
    const selectedCountryObj = COUNTRIES_DATA.find(c => c.code === countryCode) || COUNTRIES_DATA[0];

    const newProfile = {
      id: 'custom_prof_' + Date.now(),
      title: `${selectedStreamObj.name} - ${applicantName.trim()}`,
      applicantName: applicantName.trim(),
      streamId: selectedStreamObj.id,
      streamName: selectedStreamObj.name,
      countryCode: selectedCountryObj.code,
      countryName: selectedCountryObj.name,
      applicationNumber: applicationNumber.trim(),
      uci: uci.trim(),
      submissionDate: submissionDate,
      currentStageIndex: 1,
      statusTitle: 'Acknowledgement of Receipt (AOR) Verified',
      statusBadge: 'IN PROGRESS',
      statusTheme: 'cyan',
      intakeTerm: 'Fall 2026',
      institution: 'General Applicant',
      fieldOfStudy: 'Custom Visa Profile',
      estimatedCompletionDate: '2026-09-15',
      lastUpdated: 'Just now (Created by user)',
      timeline: selectedStreamObj.typicalSteps.map((step, idx) => ({
        stageId: step.id,
        title: step.title,
        date: idx === 0 ? submissionDate : idx === 1 ? 'Current Stage' : 'Scheduled',
        status: idx <= 1 ? 'completed' : idx === 1 ? 'active' : 'pending',
        details: step.desc
      })),
      actionItems: [
        {
          id: 'act_c_1',
          type: 'critical',
          title: 'Complete Biometrics at nearest VFS Global VAC',
          desc: 'Ensure you have printed Biometrics Instruction Letter (BIL).',
          deadline: '2026-08-30',
          daysLeft: 23,
          actionLink: 'VFS Appointment',
          status: 'needs_action'
        }
      ],
      documents: [
        { id: 'cdoc_1', name: 'Primary Application Form IMM 1294 / IMM 0008', type: 'PDF', status: 'verified', size: '2.1 MB', ocrScore: 99 },
        { id: 'cdoc_2', name: 'Valid International Passport Bio Page', type: 'PDF', status: 'verified', size: '1.4 MB', ocrScore: 100 }
      ],
      notes: notes || 'New application synchronized into IRCC AURA tracker.'
    };

    onSaveApplication(newProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-xl rounded-2xl bg-[#080e21] border border-cyan-500/50 p-6 shadow-[0_0_50px_rgba(0,240,255,0.2)] text-slate-100 font-sans relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-bold font-display text-white">
            Register New IRCC Application File
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-300 mb-1">Applicant Full Name:</label>
            <input
              type="text"
              required
              placeholder="e.g. Chukwuma Obi, Priyanshu Patel"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-white outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Visa Category / Stream:</label>
              <select
                value={streamId}
                onChange={(e) => setStreamId(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-cyan-300"
              >
                {VISA_STREAMS.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1">Country of Application:</label>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-cyan-300"
              >
                {COUNTRIES_DATA.map(c => (
                  <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1">Application Number (App #):</label>
              <input
                type="text"
                required
                value={applicationNumber}
                onChange={(e) => setApplicationNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1">UCI (Unique Client ID):</label>
              <input
                type="text"
                required
                value={uci}
                onChange={(e) => setUci(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-white outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Submission Date:</label>
            <input
              type="date"
              value={submissionDate}
              onChange={(e) => setSubmissionDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-cyan-300 outline-none"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3 font-sans">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 hover:border-slate-500 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold shadow-glow-cyan"
            >
              Save Application File
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
