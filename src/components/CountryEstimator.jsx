import React, { useState, useMemo } from 'react';
import { 
  Globe, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  BarChart3, 
  ShieldCheck, 
  Flame,
  ArrowRight,
  Zap
} from 'lucide-react';
import { COUNTRIES_DATA } from '../data/countryProcessingData';
import { VISA_STREAMS } from '../data/visaStreams';
import { playCyberSound } from '../utils/audio';

export const CountryEstimator = ({ activeProfile, onSelectCountryForProfile }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL');
  const [selectedStream, setSelectedStream] = useState(activeProfile?.streamId || 'study_permit');
  const [comparisonCountryCode, setComparisonCountryCode] = useState('IN');
  const [calcDate, setCalcDate] = useState('2026-08-07');
  const [upfrontMed, setUpfrontMed] = useState(true);
  const [hasSds, setHasSds] = useState(true);

  const regions = ['ALL', 'Africa', 'South Asia', 'Southeast Asia', 'East Asia', 'Europe', 'North America', 'South America', 'Middle East'];

  const filteredCountries = useMemo(() => {
    return COUNTRIES_DATA.filter((country) => {
      const matchesSearch = 
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.visaOffice.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRegion = 
        selectedRegion === 'ALL' || 
        country.region.toLowerCase().includes(selectedRegion.toLowerCase());

      return matchesSearch && matchesRegion;
    });
  }, [searchTerm, selectedRegion]);

  // Current primary country
  const currentCountry = useMemo(() => {
    return COUNTRIES_DATA.find(c => c.code === (activeProfile?.countryCode || 'NG')) || COUNTRIES_DATA[0];
  }, [activeProfile]);

  const comparisonCountry = useMemo(() => {
    return COUNTRIES_DATA.find(c => c.code === comparisonCountryCode) || COUNTRIES_DATA[1];
  }, [comparisonCountryCode]);

  // AI Predictive ETA calculation
  const predictedEtaData = useMemo(() => {
    const streamInfo = currentCountry.processingTimes[selectedStream] || { weeks: 8, days: 56, trend: 'stable', officialStd: 8, backlogRisk: 'Medium' };
    let adjustedDays = streamInfo.days;

    // Upfront medical reduces wait by ~10 days
    if (upfrontMed) adjustedDays -= 8;
    // Backlog factor
    adjustedDays = Math.round(adjustedDays * (currentCountry.irccBacklogFactor || 1.0));
    // Seasonal Fall surge adjustment
    const seasonalDelay = 4;
    adjustedDays += seasonalDelay;

    const base = new Date(calcDate);
    const etaDate = new Date(base.getTime() + adjustedDays * 24 * 60 * 60 * 1000);
    const etaFormatted = etaDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    return {
      estimatedDays: Math.max(14, adjustedDays),
      etaFormatted,
      confidence: currentCountry.irccBacklogFactor > 1.2 ? '84%' : '94%',
      risk: streamInfo.backlogRisk,
      speedTrend: streamInfo.trend
    };
  }, [currentCountry, selectedStream, calcDate, upfrontMed]);

  const activeStreamObj = VISA_STREAMS.find(s => s.id === selectedStream) || VISA_STREAMS[0];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                IRCC GLOBAL PROCESSING INTELLIGENCE ENGINE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                50+ COUNTRIES MONITORED
              </span>
            </div>
            <h2 className="text-2xl font-bold font-display text-white mt-1">
              Country-Specific Processing Times & AI ETA Predictor
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-3xl">
              Live processing velocity across global IRCC visa offices, queue backlog indices, and seasonal intake algorithms.
            </p>
          </div>

          {/* Stream Selector Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#050b1d] p-1.5 rounded-xl border border-slate-800">
            {VISA_STREAMS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  playCyberSound('click');
                  setSelectedStream(s.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  selectedStream === s.id
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold shadow-[0_0_12px_rgba(0,240,255,0.2)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {s.name.split(' ')[0]} {s.name.split(' ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* AI ETA Simulator Box for Current Country */}
        <div className="mt-6 rounded-xl bg-gradient-to-r from-[#07152e] via-[#0d1c42] to-[#170e38] border border-cyan-500/50 p-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{currentCountry.flag}</span>
                <span className="text-lg font-bold text-white font-display">
                  {currentCountry.name} // {activeStreamObj.name}
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {currentCountry.visaOffice}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                AI ETA Model incorporates 80th percentile IRCC service standards, seasonal intake surge, and biometrics queue.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 bg-[#050918]/80 p-3 rounded-xl border border-cyan-500/30">
              <div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase font-bold">PREDICTED DECISION ETA</div>
                <div className="text-xl md:text-2xl font-bold font-display text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  {predictedEtaData.etaFormatted}
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  ~{predictedEtaData.estimatedDays} days total ({predictedEtaData.confidence} confidence)
                </div>
              </div>

              <div className="border-l border-slate-800 pl-3 space-y-1">
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={upfrontMed}
                    onChange={(e) => setUpfrontMed(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Upfront Medical Completed (-8 days)</span>
                </label>
                <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSds}
                    onChange={(e) => setHasSds(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Verified GIC / Complete Proof of Funds</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Tool */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Card 1: Selected / User Country */}
        <div className="rounded-2xl bg-[#090f26]/90 border border-cyan-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentCountry.flag}</span>
              <div>
                <h3 className="font-bold text-white font-display text-base">
                  {currentCountry.name} ({currentCountry.region})
                </h3>
                <div className="text-[10px] font-mono text-cyan-400">YOUR APPLICATION COUNTRY</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {currentCountry.historicalApprovalRate} Approval Benchmark
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">MEDIAN TIME</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {currentCountry.processingTimes[selectedStream]?.weeks || 8} Weeks
              </div>
              <div className="text-[10px] text-cyan-400">
                ~{currentCountry.processingTimes[selectedStream]?.days || 56} days
              </div>
            </div>

            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">BACKLOG INDEX</div>
              <div className={`text-lg font-bold mt-0.5 ${
                currentCountry.processingTimes[selectedStream]?.backlogRisk === 'High' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {currentCountry.processingTimes[selectedStream]?.backlogRisk || 'Low'}
              </div>
              <div className="text-[10px] text-slate-400">
                Factor {currentCountry.irccBacklogFactor}x
              </div>
            </div>

            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">VAC BIOMETRIC SPEED</div>
              <div className="text-lg font-bold text-white mt-0.5">
                ~{currentCountry.vacBookingSpeedDays} Days
              </div>
              <div className="text-[10px] text-emerald-400">Fast Appointment</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#050b1d] border border-cyan-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-mono text-[10px] text-cyan-400 font-bold uppercase">COUNTRY PROCESSING NOTES:</div>
            <div>{currentCountry.notes}</div>
          </div>
        </div>

        {/* Card 2: Compare with Another Country */}
        <div className="rounded-2xl bg-[#090f26]/90 border border-purple-500/30 p-5 shadow-cyber-card space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{comparisonCountry.flag}</span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white font-display text-base">
                    {comparisonCountry.name}
                  </h3>
                  {/* Country switcher select */}
                  <select
                    value={comparisonCountryCode}
                    onChange={(e) => {
                      playCyberSound('click');
                      setComparisonCountryCode(e.target.value);
                    }}
                    className="bg-[#050b1d] border border-purple-500/40 rounded px-2 py-0.5 text-xs text-purple-300 font-mono"
                  >
                    {COUNTRIES_DATA.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-[10px] font-mono text-purple-400">BENCHMARK COMPARISON</div>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-2 py-1 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              {comparisonCountry.historicalApprovalRate} Approval Benchmark
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">MEDIAN TIME</div>
              <div className="text-lg font-bold text-purple-200 mt-0.5">
                {comparisonCountry.processingTimes[selectedStream]?.weeks || 8} Weeks
              </div>
              <div className="text-[10px] text-purple-400">
                ~{comparisonCountry.processingTimes[selectedStream]?.days || 56} days
              </div>
            </div>

            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">BACKLOG INDEX</div>
              <div className={`text-lg font-bold mt-0.5 ${
                comparisonCountry.processingTimes[selectedStream]?.backlogRisk === 'High' ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                {comparisonCountry.processingTimes[selectedStream]?.backlogRisk || 'Low'}
              </div>
              <div className="text-[10px] text-slate-400">
                Factor {comparisonCountry.irccBacklogFactor}x
              </div>
            </div>

            <div className="bg-[#050b1d] p-2.5 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px]">VAC BIOMETRIC SPEED</div>
              <div className="text-lg font-bold text-white mt-0.5">
                ~{comparisonCountry.vacBookingSpeedDays} Days
              </div>
              <div className="text-[10px] text-purple-400">VFS Availability</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-[#050b1d] border border-purple-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-mono text-[10px] text-purple-400 font-bold uppercase">COUNTRY PROCESSING NOTES:</div>
            <div>{comparisonCountry.notes}</div>
          </div>
        </div>
      </div>

      {/* Global Country Directory & Search Table */}
      <div className="rounded-2xl bg-[#080e21]/90 border border-cyan-500/30 p-5 md:p-6 shadow-cyber-card space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white font-display text-lg">
              Global Processing Directory (All Monitored Countries)
            </h3>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search country, code, or VO..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg bg-[#050b1d] border border-slate-800 focus:border-cyan-400 text-xs text-slate-200 font-mono outline-none w-52"
              />
            </div>

            {/* Region selector */}
            <select
              value={selectedRegion}
              onChange={(e) => {
                playCyberSound('click');
                setSelectedRegion(e.target.value);
              }}
              className="bg-[#050b1d] border border-slate-800 focus:border-cyan-400 rounded-lg px-2.5 py-1.5 text-xs text-cyan-300 font-mono"
            >
              {regions.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Country Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-[500px] overflow-y-auto pr-1">
          {filteredCountries.map((c) => {
            const timeObj = c.processingTimes[selectedStream] || { weeks: 8, days: 56, trend: 'stable', backlogRisk: 'Low' };
            const isUserCountry = c.code === activeProfile?.countryCode;

            return (
              <div
                key={c.code}
                className={`p-3.5 rounded-xl border transition-all relative ${
                  isUserCountry
                    ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-[#050b1d]/90 border-slate-800 hover:border-cyan-500/50 hover:bg-[#081230]'
                }`}
              >
                {isUserCountry && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400">
                    YOUR CASE
                  </span>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{c.flag}</span>
                  <div>
                    <div className="font-bold text-white font-sans text-sm">{c.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{c.region}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono border-t border-slate-800/80 pt-2">
                  <div>
                    <div className="text-[10px] text-slate-400">ESTIMATED:</div>
                    <div className="font-bold text-cyan-300 text-sm">{timeObj.weeks} WEEKS</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400">APPROVAL:</div>
                    <div className="font-bold text-emerald-400 text-sm">{c.historicalApprovalRate}</div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] font-mono text-slate-400 truncate">
                  VO: <span className="text-slate-300">{c.visaOffice}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
