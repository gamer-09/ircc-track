import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  BookOpen, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { GCMS_STATUS_CODES, GCMS_ORDERING_GUIDE } from '../data/gcmsDictionary';
import { playCyberSound } from '../utils/audio';

export const GCMSDecoder = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCodes = GCMS_STATUS_CODES.filter(item => 
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.meaning.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-purple-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
                GCMS / ATIP INTELLIGENCE DECODER
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/15 text-purple-300 border border-purple-500/30">
                GLOBAL CASE MANAGEMENT SYSTEM
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              IRCC Internal Officer Code Translator & Guide
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Decode the hidden acronyms in your GCMS notes (A11.2, BGC IP1/IP2, PUM, M1, CSIS screening) and learn how to order official ATIP case files.
            </p>
          </div>

          <a
            href={GCMS_ORDERING_GUIDE.officialPortal}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 text-purple-200 text-xs font-mono font-bold transition-colors shrink-0"
          >
            <span>ORDER $5 CAD ATIP GCMS NOTES</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Search Bar & Code Directory */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-display text-base">
              GCMS Code Dictionary ({filteredCodes.length} Definitions)
            </h3>
          </div>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code (e.g. A11.2, BGC, IP2)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-xs text-slate-200 font-mono outline-none w-64"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredCodes.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#050b1d] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {item.code}
                </span>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  item.status === 'Positive' ? 'bg-emerald-500/20 text-emerald-300' :
                  item.status === 'Warning' ? 'bg-amber-500/20 text-amber-300' :
                  item.status === 'Milestone' ? 'bg-purple-500/20 text-purple-300' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-300 font-sans leading-relaxed">
                {item.meaning}
              </p>

              <div className="text-[10px] font-mono text-cyan-400/90 border-t border-slate-800/80 pt-1.5">
                <strong>Recommended Action:</strong> {item.actionRequired}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
