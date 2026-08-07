import React, { useState, useEffect, useRef } from 'react';
import { 
  Radar, 
  Volume2, 
  VolumeX, 
  Plus, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Bell, 
  Clock, 
  Layers, 
  ChevronDown,
  RefreshCw,
  KeyRound
} from 'lucide-react';
import { playCyberSound, toggleAudioSound } from '../utils/audio';

export const Navbar = ({ 
  currentProfile, 
  profiles, 
  onSelectProfile, 
  onOpenNewModal, 
  onOpenSyncModal,
  onOpenDossier, 
  onScanUpdates,
  isScanning,
  activeTab,
  setActiveTab
}) => {
  const [soundOn, setSoundOn] = useState(true);
  const [ottawaTime, setOttawaTime] = useState('');
  const [utcTime, setUtcTime] = useState('');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setUtcTime(now.toUTCString().slice(17, 25) + ' UTC');
      
      const ottawa = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Toronto',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setOttawaTime(ottawa + ' EDT');
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSoundToggle = () => {
    const next = !soundOn;
    setSoundOn(next);
    toggleAudioSound(next);
  };

  const handleTabChange = (tabId) => {
    playCyberSound('click');
    setActiveTab(tabId);
  };

  const handleProfileSelect = (p) => {
    playCyberSound('click');
    onSelectProfile(p);
    setProfileDropdownOpen(false);
  };

  const navTabs = [
    { id: 'dashboard', label: 'HUD DASHBOARD', icon: Layers },
    { id: 'estimator', label: 'COUNTRY PROCESSING & DECISION DATES', icon: Radar },
    { id: 'actions', label: 'ACTION CENTER & MISSING ITEMS', icon: ShieldCheck, badge: currentProfile?.actionItems?.filter(a => a.status === 'needs_action').length || 0 },
    { id: 'documents', label: 'DOCUMENTS & PORTAL COMPLIANCE', icon: FileText },
    { id: 'tools', label: 'WEBFORM & GCMS DECODER', icon: Sparkles },
    { id: 'radar', label: 'POLICY RADAR & PRE-ARRIVAL', icon: Bell },
  ];

  const getCountryFlag = (code) => {
    switch (code) {
      case 'NG': return '🇳🇬';
      case 'IN': return '🇮🇳';
      case 'PH': return '🇵🇭';
      case 'PK': return '🇵🇰';
      case 'CN': return '🇨🇳';
      case 'GB': return '🇬🇧';
      case 'US': return '🇺🇸';
      case 'BR': return '🇧🇷';
      case 'GH': return '🇬🇭';
      default: return '🇨🇦';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#040817]/95 backdrop-blur-xl border-b border-cyan-500/25 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
      {/* Top telemetry bar */}
      <div className="border-b border-slate-800/80 px-3 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-semibold tracking-wider uppercase text-[10px] sm:text-[11px]">IRCC TELEMETRY: ONLINE</span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>IRCC OTTAWA: <strong className="text-cyan-300 font-bold">{ottawaTime || '14:25 EDT'}</strong></span>
          </div>
          <span className="hidden md:inline text-slate-700">|</span>
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <span>{utcTime}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => {
              playCyberSound('click');
              onOpenSyncModal();
            }}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded text-xs bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 transition-colors font-mono font-bold"
          >
            <KeyRound className="w-3 h-3 text-cyan-400" />
            <span>SYNC MY CASE</span>
          </button>

          <button
            onClick={handleSoundToggle}
            title={soundOn ? 'Disable Cyber Audio' : 'Enable Cyber Audio'}
            className="flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-slate-900/90 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-300 transition-colors"
          >
            {soundOn ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="text-[10px] font-mono">{soundOn ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={() => handleTabChange('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-glow-cyan hover:shadow-cyan-500/60 transition-shadow">
              <div className="w-full h-full bg-[#060b1d] rounded-[9px] flex items-center justify-center relative overflow-hidden">
                <Radar className="w-5 h-5 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" />
                <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg sm:text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-purple-400">
                IRCC // AURA
              </span>
              <span className="px-1.5 py-0.2 rounded text-[9px] sm:text-[10px] font-mono font-bold bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                HUD v3.4
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-400 tracking-tight hidden sm:block">
              CANADIAN IMMIGRATION INTELLIGENCE & TRACKING
            </p>
          </div>
        </div>

        {/* Profile Switcher Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 bg-[#0c1433] hover:bg-[#131f47] border border-cyan-500/30 hover:border-cyan-400/60 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono transition-all text-slate-200 shadow-sm"
          >
            <span className="text-base">{getCountryFlag(currentProfile?.countryCode)}</span>
            <div className="text-left hidden md:block">
              <div className="font-bold text-cyan-300 truncate max-w-[130px]">
                {currentProfile?.applicantName || 'Select Profile'}
              </div>
              <div className="text-[10px] text-slate-400 truncate max-w-[130px]">
                {currentProfile?.applicationNumber}
              </div>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-[#070d24] border border-cyan-500/50 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.9)] z-50 p-2 font-mono backdrop-blur-2xl animate-fadeIn">
              <div className="text-[10px] uppercase text-cyan-400 px-2 py-1.5 border-b border-slate-800 flex justify-between items-center font-bold">
                <span>Select Application File</span>
                <span className="text-slate-400">{profiles.length} Active</span>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-1 py-1 pr-1">
                {profiles.map((prof) => (
                  <button
                    key={prof.id}
                    onClick={() => handleProfileSelect(prof)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      prof.id === currentProfile?.id 
                        ? 'bg-cyan-500/20 border border-cyan-400/60 text-cyan-200 shadow-[0_0_12px_rgba(0,240,255,0.15)]' 
                        : 'hover:bg-slate-800/80 text-slate-300 border border-transparent'
                    }`}
                  >
                    <span className="text-xl">{getCountryFlag(prof.countryCode)}</span>
                    <div className="flex-1 overflow-hidden">
                      <div className="font-bold text-slate-200 truncate">{prof.applicantName}</div>
                      <div className="text-[10px] text-cyan-400/90 truncate">{prof.streamName}</div>
                      <div className="text-[10px] text-slate-500 font-mono mt-0.5">App: {prof.applicationNumber}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    onOpenNewModal();
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-gradient-to-r from-cyan-600/40 to-blue-600/40 hover:from-cyan-600/60 hover:to-blue-600/60 text-cyan-200 border border-cyan-500/50 rounded-xl text-xs transition-colors font-sans font-bold shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-cyan-300" />
                  <span>New Application</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Scan Updates Button */}
          <button
            onClick={onScanUpdates}
            disabled={isScanning}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
              isScanning 
                ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400 animate-pulse' 
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-glow-cyan hover:shadow-cyan-500/60'
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isScanning ? 'CHECKING GCKEY...' : 'CHECK STATUS'}</span>
            <span className="sm:hidden">{isScanning ? '...' : 'STATUS'}</span>
          </button>

          {/* Export / Printable Dossier Button */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-mono bg-[#0c1433] hover:bg-purple-950/60 border border-purple-500/40 hover:border-purple-400 text-purple-300 transition-colors"
            title="Generate Holographic Status Dossier"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">DOSSIER</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tab Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 border-t border-slate-800/80 py-1 font-mono text-xs">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 font-bold border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400 animate-pulse' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white animate-bounce">
                    {tab.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
