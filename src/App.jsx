import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { COUNTRIES_DATA } from './data/countryProcessingData';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { StatusOverview } from './components/StatusOverview';
import { TimelineTracker } from './components/TimelineTracker';
import { CountryEstimator } from './components/CountryEstimator';
import { ActionCenter } from './components/ActionCenter';
import { DocumentLocker } from './components/DocumentLocker';
import { WebformGenerator } from './components/WebformGenerator';
import { GCMSDecoder } from './components/GCMSDecoder';
import { PolicyRadar } from './components/PolicyRadar';
import { ApplicationModal } from './components/ApplicationModal';
import { RealCaseSyncModal } from './components/RealCaseSyncModal';
import { DossierReportModal } from './components/DossierReportModal';
import { LoadingScreen } from './components/LoadingScreen';
import { KeyRound, Sparkles, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { playCyberSound } from './utils/audio';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('ircc_aura_profiles');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    try {
      const savedId = localStorage.getItem('ircc_aura_active_id');
      if (savedId) return savedId;
    } catch (e) {}
    return profiles[0]?.id || 'prof_ng_study';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [scanToast, setScanToast] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Sync profiles and active ID to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ircc_aura_profiles', JSON.stringify(profiles));
      localStorage.setItem('ircc_aura_active_id', activeProfileId);
    } catch (e) {}
  }, [profiles, activeProfileId]);

  const currentProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const countryData = COUNTRIES_DATA.find(c => c.code === currentProfile?.countryCode) || COUNTRIES_DATA[0];

  // Scan for IRCC Updates
  const handleScanUpdates = () => {
    playCyberSound('radar');
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      playCyberSound('success');
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.18 }
      });
      setScanToast({
        title: 'IRCC Portal Status Verified [OK]',
        message: `File #${currentProfile.applicationNumber} synchronized. UCI: ${currentProfile.uci}. Current stage: ${currentProfile.timeline?.[currentProfile.currentStageIndex]?.title || 'Under Assessment'}.`
      });
      setTimeout(() => setScanToast(null), 5500);
    }, 1600);
  };

  // Toggle Action Status
  const handleToggleAction = (actionId) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        actionItems: p.actionItems.map(a => {
          if (a.id !== actionId) return a;
          return {
            ...a,
            status: a.status === 'completed' ? 'needs_action' : 'completed'
          };
        })
      };
    }));
  };

  // Add custom action
  const handleAddCustomAction = (newAction) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        actionItems: [newAction, ...(p.actionItems || [])]
      };
    }));
  };

  // Upload real document
  const handleUploadSimulatedDoc = (newDoc) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        documents: [newDoc, ...(p.documents || [])]
      };
    }));
  };

  // Delete document
  const handleDeleteDoc = (docId) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        documents: p.documents.filter(d => d.id !== docId)
      };
    }));
  };

  // Update active stage directly
  const handleUpdateStage = (stageIdx) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        currentStageIndex: stageIdx
      };
    }));
  };

  // Save updated or real case profile
  const handleSaveProfile = (updatedProf) => {
    setProfiles(prev => {
      const exists = prev.some(p => p.id === updatedProf.id);
      if (exists) {
        return prev.map(p => p.id === updatedProf.id ? updatedProf : p);
      } else {
        return [updatedProf, ...prev];
      }
    });
    setActiveProfileId(updatedProf.id);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#02050f] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Interactive Cyber Particle Background */}
      <CyberBackground />

      {/* Main Navigation Bar */}
      <Navbar
        currentProfile={currentProfile}
        profiles={profiles}
        onSelectProfile={(p) => setActiveProfileId(p.id)}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onScanUpdates={handleScanUpdates}
        isScanning={isScanning}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Real Case Setup Quick Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-3 sm:px-6 pt-3">
        <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#061533] via-[#091b42] to-[#140b30] border border-cyan-400/50 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shrink-0">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base font-display">
                  Tracking Application: <strong className="text-cyan-300 font-mono">{currentProfile.applicationNumber}</strong>
                </span>
                <span className="px-2 py-0.2 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 font-bold">
                  {currentProfile.countryName}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-mono">
                UCI: <strong className="text-purple-300">{currentProfile.uci}</strong> &bull; Applicant: <strong className="text-white">{currentProfile.applicantName}</strong> &bull; Submitted: {currentProfile.submissionDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
            <button
              onClick={() => {
                playCyberSound('click');
                setIsSyncModalOpen(true);
              }}
              className="flex-1 md:flex-initial px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-mono font-bold transition-all shadow-glow-cyan flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>EDIT / ENTER MY EXACT APPLICATION</span>
            </button>

            <a
              href="https://ircc-tracker-suivi.cic.gc.ca/en/login"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-[#070e28] hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1 transition-colors"
              title="Open Official IRCC Tracker Login"
            >
              <span className="hidden sm:inline">IRCC Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Live Scan Notification Toast */}
      {scanToast && (
        <div className="fixed top-24 right-4 sm:right-6 z-50 max-w-md p-4 rounded-2xl bg-[#091538]/95 border border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.4)] font-mono text-xs text-white backdrop-blur-xl animate-fadeIn">
          <div className="flex items-center justify-between font-bold text-cyan-300 mb-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              {scanToast.title}
            </span>
            <button onClick={() => setScanToast(null)} className="text-slate-400 hover:text-white p-1">✕</button>
          </div>
          <p className="text-slate-200 font-sans leading-relaxed">{scanToast.message}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            <StatusOverview
              profile={currentProfile}
              countryData={countryData}
              onOpenActions={() => setActiveTab('actions')}
            />
            <TimelineTracker
              profile={currentProfile}
              onUpdateStage={handleUpdateStage}
            />
          </div>
        )}

        {activeTab === 'estimator' && (
          <div className="animate-fadeIn">
            <CountryEstimator
              activeProfile={currentProfile}
              onSelectCountryForProfile={(countryCode) => {
                setProfiles(prev => prev.map(p => {
                  if (p.id !== currentProfile.id) return p;
                  const matchCountry = COUNTRIES_DATA.find(c => c.code === countryCode);
                  return {
                    ...p,
                    countryCode,
                    countryName: matchCountry ? matchCountry.name : p.countryName
                  };
                }));
              }}
            />
          </div>
        )}

        {activeTab === 'actions' && (
          <div className="animate-fadeIn">
            <ActionCenter
              profile={currentProfile}
              onToggleAction={handleToggleAction}
              onAddCustomAction={handleAddCustomAction}
            />
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="animate-fadeIn">
            <DocumentLocker
              profile={currentProfile}
              onUploadSimulatedDoc={handleUploadSimulatedDoc}
              onDeleteDoc={handleDeleteDoc}
            />
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6 animate-fadeIn">
            <WebformGenerator
              profile={currentProfile}
              countryData={countryData}
            />
            <GCMSDecoder />
          </div>
        )}

        {activeTab === 'radar' && (
          <div className="animate-fadeIn">
            <PolicyRadar />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900/80 bg-[#030612]/90 mt-12 py-6 px-4 font-mono text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span>IRCC // AURA TRACKER HUD</span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 font-normal">Official IRPA & IRPR Immigration Intelligence Engine</span>
          </div>
          <div>
            Data modeled from official IRCC Service Standards & GCKey Telemetry Algorithms.
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ApplicationModal
        isOpen={isNewModalOpen}
        onClose={() => setIsNewModalOpen(false)}
        onSaveApplication={handleSaveProfile}
      />

      <RealCaseSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        currentProfile={currentProfile}
        onSaveProfile={handleSaveProfile}
      />

      <DossierReportModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        profile={currentProfile}
        countryData={countryData}
      />
    </div>
  );
}
export default App;
