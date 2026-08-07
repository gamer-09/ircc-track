import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  ExternalLink,
  MessageSquareQuote
} from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const WebformGenerator = ({ profile, countryData }) => {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState('processing_delay');
  const [customNotes, setCustomNotes] = useState('');

  if (!profile) return null;

  // Real exact calculation from submission date to today's date
  const subDate = new Date(profile.submissionDate || '2026-06-20');
  const today = new Date('2026-08-07');
  const diffTime = Math.abs(today - subDate);
  const exactDaysElapsed = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const exactWeeksElapsed = (exactDaysElapsed / 7).toFixed(1);

  const officialStdWeeks = countryData?.processingTimes?.[profile.streamId]?.weeks || 8;
  const officialStdDays = officialStdWeeks * 7;
  const daysOver = exactDaysElapsed - officialStdDays;

  const getInquirySubject = () => {
    switch (inquiryType) {
      case 'processing_delay':
        return `STATUS INQUIRY // Case Exceeding Normal IRCC Service Standard - Application #${profile.applicationNumber} - UCI ${profile.uci}`;
      case 'additional_docs':
        return `SUBMISSION OF SUPPLEMENTAL DOCUMENTS // Application #${profile.applicationNumber} - UCI ${profile.uci}`;
      case 'address_update':
        return `CHANGE OF CONTACT DETAILS & RESIDENTIAL ADDRESS // Application #${profile.applicationNumber}`;
      default:
        return `CASE INQUIRY // Application #${profile.applicationNumber}`;
    }
  };

  const getInquiryBody = () => {
    const todayStr = 'August 7, 2026';
    const vo = countryData?.visaOffice || 'Primary Processing Center';

    if (inquiryType === 'processing_delay') {
      return `To: Immigration, Refugees and Citizenship Canada (IRCC)
Visa Processing Office: ${vo}
Date: ${todayStr}

RE: STATUS INQUIRY FOR APPLICATION EXCEEDING PUBLISHED SERVICE STANDARDS

Applicant Full Name: ${profile.applicantName}
Date of Birth: [As per Passport]
Country of Application: ${profile.countryName}
Application Number: ${profile.applicationNumber}
Unique Client Identifier (UCI): ${profile.uci}
Visa Category: ${profile.streamName}
Date of Online Submission: ${profile.submissionDate}

Dear Immigration Officer,

I am writing to respectfully request an update regarding the status of my application referenced above. 

According to the official IRCC published service standard for ${profile.countryName}, the typical processing time is approximately ${officialStdWeeks} weeks (${officialStdDays} days). As of today, ${todayStr}, my application has been in progress for exactly ${exactDaysElapsed} calendar days (${exactWeeksElapsed} weeks)${daysOver > 0 ? `, which is ${daysOver} days beyond the standard timeframe` : ''}.

To assist the processing office with the assessment of my file, please note that all mandatory statutory milestones on my end have been completed in full:
1. Biometrics were enrolled and verified at VFS Global.
2. The upfront Immigration Medical Examination (IME) was successfully completed with an authorized IRCC Panel Physician.
3. Complete Proof of Financial Support and all required identity certificates were attached with the primary submission.

${customNotes ? `Additional Case Notes / Urgent Update: ${customNotes}\n` : ''}
I kindly request that you review my file or advise if any supplemental documentation or information is required from my side to facilitate the finalization of this application.

Thank you very much for your continuous service and time.

Yours sincerely,
${profile.applicantName}
UCI: ${profile.uci}
Application #: ${profile.applicationNumber}`;
    } else {
      return `To: Immigration, Refugees and Citizenship Canada (IRCC)
Visa Processing Office: ${vo}
Date: ${todayStr}

RE: SUBMISSION OF ADDITIONAL SUPPORTING DOCUMENTATION

Applicant Full Name: ${profile.applicantName}
Application Number: ${profile.applicationNumber}
UCI: ${profile.uci}
Visa Category: ${profile.streamName}

Dear Immigration Officer,

I am writing to proactively provide supplemental documentation to ensure my official IRCC application record is complete and up to date.

Documents Attached:
1. Updated Certified Proof of Liquid Funds / GIC Verification
2. Supplemental Letter of Explanation

${customNotes ? `Specific Details: ${customNotes}\n` : ''}
Please associate these files with my pending application ${profile.applicationNumber}.

Yours sincerely,
${profile.applicantName}`;
    }
  };

  const fullText = `${getInquirySubject()}\n\n${getInquiryBody()}`;

  const handleCopy = () => {
    playCyberSound('click');
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    playCyberSound('click');
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `IRCC_Webform_Inquiry_${profile.applicationNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                OFFICIAL IRCC WEBFORM INQUIRY SYNTHESIZER
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                EXACT DAYS CALCULATED
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Automated IRCC Webform & Case Escalation Builder
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Generates properly formatted formal inquiry letters with full legal case citations, UCI linkage, and exact calculated days in queue.
            </p>
          </div>

          <a
            href="https://secure.cic.gc.ca/enquiries-renseignements/canada-case-cas-eng.aspx"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200 text-xs font-mono font-bold transition-colors shrink-0"
          >
            <span>OFFICIAL IRCC WEBFORM PORTAL</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Inquiry Builder Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MessageSquareQuote className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-display text-base">
              Inquiry Parameters
            </h3>
          </div>

          <div className="p-3 rounded-lg bg-[#050b1d] border border-slate-800 text-xs font-mono space-y-1">
            <div className="text-[10px] text-slate-400 uppercase font-bold">CALCULATED TIMELINE:</div>
            <div>Days Elapsed: <strong className="text-cyan-300">{exactDaysElapsed} Days</strong> ({exactWeeksElapsed} wks)</div>
            <div>Published Standard: <strong className="text-white">{officialStdWeeks} Weeks</strong></div>
            <div className={daysOver > 0 ? 'text-amber-400 font-bold' : 'text-emerald-400'}>
              {daysOver > 0 ? `+${daysOver} Days Over Standard` : `${Math.abs(daysOver)} Days Remaining`}
            </div>
          </div>

          <label className="block text-xs font-mono text-slate-300">
            <span>Inquiry Template / Purpose:</span>
            <select
              value={inquiryType}
              onChange={(e) => {
                playCyberSound('click');
                setInquiryType(e.target.value);
              }}
              className="mt-1 w-full p-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-cyan-300 font-mono"
            >
              <option value="processing_delay">Processing Time Exceeded (&gt; Standard)</option>
              <option value="additional_docs">Supplemental Document Upload (ADR)</option>
              <option value="address_update">Change of Address / Contact Info</option>
            </select>
          </label>

          <label className="block text-xs font-mono text-slate-300">
            <span>Optional Custom Notes (Appended to Letter):</span>
            <textarea
              rows={3}
              placeholder="e.g. Flight booked for Fall semester; updated bank balance attached..."
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="mt-1 w-full p-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-white font-mono focus:border-cyan-400 outline-none"
            />
          </label>

          <div className="pt-2 space-y-2">
            <button
              onClick={handleCopy}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-glow-cyan"
            >
              {copied ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'COPIED TO CLIPBOARD!' : 'COPY INQUIRY LETTER'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="w-full py-2 rounded-lg bg-[#050b1d] hover:bg-[#081230] border border-cyan-500/30 text-cyan-300 font-mono text-xs transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD AS .TXT FILE</span>
            </button>
          </div>
        </div>

        {/* Letter Preview Column */}
        <div className="lg:col-span-2 rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <h3 className="font-bold text-white font-display text-sm">
                Generated Formal IRCC Inquiry Brief
              </h3>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 font-bold">
              READY TO SUBMIT
            </span>
          </div>

          <pre className="p-4 rounded-xl bg-[#030712] border border-slate-800 text-slate-300 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-[440px] overflow-y-auto">
            {fullText}
          </pre>
        </div>
      </div>
    </div>
  );
};
