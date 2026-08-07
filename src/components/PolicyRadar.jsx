import React from 'react';
import { 
  Bell, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  ExternalLink, 
  TrendingUp, 
  Globe, 
  ShieldCheck, 
  PlaneTakeoff,
  Clock
} from 'lucide-react';
import { IRCC_NEWS_FEED, PRE_ARRIVAL_CHECKLIST } from '../data/irccNews';
import { playCyberSound } from '../utils/audio';

export const PolicyRadar = () => {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            POLICY FEED & ARRIVAL READINESS RADAR
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
            2026 LIVE STREAM
          </span>
        </div>
        <h2 className="text-2xl font-bold font-display text-white mt-1">
          IRCC Policy Updates, Express Entry Draws & Arrival Checklist
        </h2>
        <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
          Real-time immigration policy alerts, Express Entry category cutoffs, and post-approval landing roadmap for newcomers.
        </p>
      </div>

      {/* Grid: News on left, Pre-Arrival checklist on right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* IRCC News & Policy Feed */}
        <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-cyan-400" />
              <h3 className="font-bold text-white font-display text-base">
                Latest IRCC Policy & Draw Announcements
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">Live Wire</span>
          </div>

          <div className="space-y-3">
            {IRCC_NEWS_FEED.map((news) => (
              <div
                key={news.id}
                className="p-4 rounded-xl bg-[#050b1d] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    news.badgeType === 'cyan' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' :
                    news.badgeType === 'amber' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    news.badgeType === 'purple' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                    'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {news.badge}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{news.date}</span>
                </div>

                <h4 className="font-bold text-slate-200 font-sans text-xs">
                  {news.title}
                </h4>

                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {news.summary}
                </p>

                <div className="text-[10px] font-mono text-emerald-400/90 border-t border-slate-800/80 pt-1.5">
                  <strong>Impact:</strong> {news.impact}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pre-Arrival & Landing Checklist */}
        <div className="rounded-2xl bg-[#080e21]/90 border border-purple-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <PlaneTakeoff className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white font-display text-base">
                Pre-Arrival & Port of Entry (POE) Roadmap
              </h3>
            </div>
            <span className="text-xs font-mono text-purple-400">Post-PPR Checklist</span>
          </div>

          <div className="space-y-3">
            {PRE_ARRIVAL_CHECKLIST.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#050b1d] border border-slate-800 hover:border-purple-500/40 transition-all space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-mono text-amber-300 font-semibold">{item.timeline}</span>
                </div>

                <h4 className="font-bold text-slate-200 font-sans text-xs">
                  {item.title}
                </h4>

                <p className="text-xs text-slate-300 font-sans">
                  {item.desc}
                </p>

                <div className="text-[10px] font-mono text-cyan-400 pt-1">
                  Portal: <span className="underline">{item.linkText}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
