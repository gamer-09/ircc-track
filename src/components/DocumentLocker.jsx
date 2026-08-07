import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  Trash2, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  FileCheck2,
  Download
} from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const DocumentLocker = ({ profile, onUploadSimulatedDoc, onDeleteDoc }) => {
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('PDF');
  const [isSimulatingOCR, setIsSimulatingOCR] = useState(false);
  const [selectedPreviewDoc, setSelectedPreviewDoc] = useState(null);

  if (!profile) return null;

  const docs = profile.documents || [];

  const handleSimulateUpload = (e) => {
    e.preventDefault();
    if (!docName.trim()) return;

    playCyberSound('scan');
    setIsSimulatingOCR(true);

    setTimeout(() => {
      const newDoc = {
        id: 'doc_' + Date.now(),
        name: docName.trim(),
        type: docType,
        status: 'verified',
        size: `${(Math.random() * 3 + 0.8).toFixed(1)} MB`,
        ocrScore: Math.floor(Math.random() * 6 + 94),
        uploadedDate: '2026-08-07'
      };

      onUploadSimulatedDoc(newDoc);
      setIsSimulatingOCR(false);
      setDocName('');
      playCyberSound('success');
    }, 1200);
  };

  const avgOcrScore = docs.length > 0 
    ? Math.round(docs.reduce((acc, d) => acc + (d.ocrScore || 98), 0) / docs.length)
    : 100;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                CYBER VAULT // OCR AUDIT REPOSITORY
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                ENCRYPTED AES-256
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Document Locker & AI Completeness Inspector
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Automatic validation of resolution, barcode integrity, expiry date warnings, and IRCC document specifications.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#050b1d] p-3 rounded-xl border border-slate-800 shrink-0">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase">AI OCR READINESS SCORE</div>
              <div className="text-2xl font-bold font-display text-emerald-400">
                {avgOcrScore}% VERIFIED
              </div>
              <div className="text-[10px] font-mono text-slate-400">
                {docs.length} files in biometric vault
              </div>
            </div>
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
          </div>
        </div>
      </div>

      {/* Upload Box & File List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload Form Box */}
        <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Upload className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-display text-base">
              Add / Inspect Document
            </h3>
          </div>

          <form onSubmit={handleSimulateUpload} className="space-y-3">
            <label className="block text-xs font-mono text-slate-300">
              <span>Document Name / Title:</span>
              <input
                type="text"
                placeholder="e.g. Updated Bank Statement, Police Certificate"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-white font-mono focus:border-cyan-400 outline-none"
              />
            </label>

            <label className="block text-xs font-mono text-slate-300">
              <span>Format:</span>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="mt-1 w-full px-3 py-2 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-cyan-300 font-mono"
              >
                <option value="PDF">PDF (IRCC Standard &lt; 4.0 MB)</option>
                <option value="JPG">JPG / JPEG (Digital Photo Specs)</option>
                <option value="DOCX">Word Document</option>
              </select>
            </label>

            <button
              type="submit"
              disabled={isSimulatingOCR}
              className={`w-full py-2.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                isSimulatingOCR
                  ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 animate-pulse'
                  : 'bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSimulatingOCR ? 'RUNNING AI OCR AUDIT...' : 'SIMULATE UPLOAD & VALIDATE'}</span>
            </button>
          </form>

          <div className="p-3 rounded-lg bg-[#050b1d] border border-slate-800 text-xs text-slate-300 space-y-1.5">
            <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
              IRCC DOCUMENT RULES:
            </div>
            <ul className="text-[11px] space-y-1 list-disc pl-4 text-slate-400">
              <li>Individual files must not exceed 4.0 MB in size.</li>
              <li>Only 1 file per document upload slot in IRCC portal. Combine multi-page PDFs.</li>
              <li>Passports must show bio-page + all stamped travel pages.</li>
            </ul>
          </div>
        </div>

        {/* Vault Document Table */}
        <div className="lg:col-span-2 rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white font-display text-base">
                Verified Document Repository ({docs.length} Files)
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Status & OCR Completeness
            </span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
            {docs.map((doc) => (
              <div
                key={doc.id}
                className="p-3.5 rounded-xl bg-[#050b1d] border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs text-white">
                      {doc.name}
                    </h4>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 mt-0.5">
                      <span className="text-cyan-300 font-semibold">{doc.type}</span>
                      <span>&bull;</span>
                      <span>{doc.size}</span>
                      <span>&bull;</span>
                      <span className="text-emerald-400">AI Score: {doc.ocrScore || 98}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => {
                      playCyberSound('click');
                      setSelectedPreviewDoc(doc);
                    }}
                    className="p-1.5 rounded-lg bg-[#08112d] hover:bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 transition-colors"
                    title="Inspect OCR Summary"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      playCyberSound('click');
                      onDeleteDoc(doc.id);
                    }}
                    className="p-1.5 rounded-lg bg-[#08112d] hover:bg-rose-950/80 border border-slate-800 hover:border-rose-500 text-slate-400 hover:text-rose-300 transition-colors"
                    title="Remove Document"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Preview Modal / Box if open */}
      {selectedPreviewDoc && (
        <div className="p-4 rounded-xl bg-[#050b1d] border border-cyan-400 shadow-glow-cyan text-xs font-mono space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-cyan-300 font-bold uppercase">DOCUMENT OCR AUDIT: {selectedPreviewDoc.name}</span>
            <button
              onClick={() => setSelectedPreviewDoc(null)}
              className="text-slate-400 hover:text-white px-2 py-0.5"
            >
              ✕ Close
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-300 pt-2 border-t border-slate-800">
            <div>Format: <strong className="text-white">{selectedPreviewDoc.type}</strong></div>
            <div>File Size: <strong className="text-white">{selectedPreviewDoc.size}</strong></div>
            <div>Readability: <strong className="text-emerald-400">{selectedPreviewDoc.ocrScore}%</strong></div>
            <div>IRCC Validated: <strong className="text-emerald-400">PASSED</strong></div>
          </div>
        </div>
      )}
    </div>
  );
};
