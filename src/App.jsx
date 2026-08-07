import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { SAMPLE_PROFILES } from './data/sampleProfiles';
import { COUNTRIES_DATA } from './data/countryProcessingData';
import { VISA_STREAMS } from './data/visaStreams';
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
import { DossierReportModal } from './components/DossierReportModal';
import { playCyberSound } from './utils/audio';

export function App() {
  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem('ircc_aura_profiles');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SAMPLE_PROFILES;
  });

  const [activeProfileId, setActiveProfileId] = useState(() => {
    return profiles[0]?.id || 'prof_ng_study';
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isScanning, setIsScanning] = useState(false);
  const [scanToast, setScanToast] = useState(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('ircc_aura_profiles', JSON.stringify(profiles));
    } catch (e) {}
  }, [profiles]);

  const currentProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];
  const countryData = COUNTRIES_DATA.find(c => c.code === currentProfile?.countryCode) || COUNTRIES_DATA[0];

  // Scan for IRCC Updates Simulation
  const handleScanUpdates = () => {
    playCyberSound('radar');
    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      playCyberSound('success');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.15 }
      });
      setScanToast({
        title: 'IRCC GCKey & Tracker Synchronized',
        message: 'No new adverse requests. Medical: Passed. Background Check (BGC IP2) is progressing smoothly in active queue.'
      });
      setTimeout(() => setScanToast(null), 5000);
    }, 2000);
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

  // Upload simulated document
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

  // Update active stage
  const handleUpdateStage = (stageIdx) => {
    setProfiles(prev => prev.map(p => {
      if (p.id !== currentProfile.id) return p;
      return {
        ...p,
        currentStageIndex: stageIdx
      };
    }));
  };

  // Save new application
  const handleSaveApplication = (newProf) => {
    setProfiles(prev => [newProf, ...prev]);
    setActiveProfileId(newProf.id);
  };

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black">
      {/* Interactive Cyber Particle Background */}
      <CyberBackground />

      {/* Main Navigation Bar */}
      <Navbar
        currentProfile={currentProfile}
        profiles={profiles}
        onSelectProfile={(p) => setActiveProfileId(p.id)}
        onOpenNewModal={() => setIsNewModalOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        onScanUpdates={handleScanUpdates}
        isScanning={isScanning}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Live Scan Notification Toast */}
      {scanToast && (
        <div className="fixed top-20 right-6 z-50 max-w-md p-4 rounded-xl bg-[#091538] border border-cyan-400 shadow-glow-cyan font-mono text-xs text-white animate-bounce">
          <div className="flex items-center justify-between font-bold text-cyan-300 mb-1">
            <span>{scanToast.title}</span>
            <button onClick={() => setScanToast(null)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <p className="text-slate-300 font-sans">{scanToast.message}</p>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Render Tab Contents */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
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
        )}

        {activeTab === 'actions' && (
          <ActionCenter
            profile={currentProfile}
            onToggleAction={handleToggleAction}
            onAddCustomAction={handleAddCustomAction}
          />
        )}

        {activeTab === 'documents' && (
          <DocumentLocker
            profile={currentProfile}
            onUploadSimulatedDoc={handleUploadSimulatedDoc}
            onDeleteDoc={handleDeleteDoc}
          />
        )}

        {activeTab === 'tools' && (
          <div className="space-y-6">
            <WebformGenerator
              profile={currentProfile}
              countryData={countryData}
            />
            <GCMSDecoder />
          </div>
        )}

        {activeTab === 'radar' && (
          <PolicyRadar />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-[#030611]/90 mt-12 py-6 px-4 font-mono text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <span>IRCC // AURA TRACKER HUD</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-normal">Modern Futuristic Visa Intelligence Platform</span>
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
        onSaveApplication={handleSaveApplication}
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
