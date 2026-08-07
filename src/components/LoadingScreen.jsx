import React, { useState, useEffect } from 'react';
import { Radar, Sparkles, ShieldCheck, Activity, Cpu, CheckCircle2 } from 'lucide-react';
import { playCyberSound } from '../utils/audio';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('BOOTING_SYSTEM');

  const steps = [
    { threshold: 15, text: 'INITIALIZING QUANTUM IRCC TELEMETRY...', icon: Cpu },
    { threshold: 40, text: 'SYNCHRONIZING GCKEY & BIOMETRICS MATRIX...', icon: Radar },
    { threshold: 70, text: 'FETCHING 50+ COUNTRY BACKLOG ALGORITHMS...', icon: Activity },
    { threshold: 90, text: 'CALIBRATING AI ETA PREDICTOR & OCR VAULT...', icon: Sparkles },
    { threshold: 100, text: 'SYSTEM ONLINE // WELCOME TO IRCC AURA', icon: ShieldCheck }
  ];

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setCurrentStep('SYSTEM ONLINE // WELCOME TO IRCC AURA');
        clearInterval(interval);
        playCyberSound('success');
        setTimeout(() => {
          onComplete();
        }, 700);
      } else {
        setProgress(currentProgress);
        const match = steps.find(s => currentProgress <= s.threshold);
        if (match) {
          setCurrentStep(match.text);
        }
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#02050e] text-cyan-300 font-mono select-none overflow-hidden">
      {/* Background cyber grid & pulsing glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#030714] to-[#010309] pointer-events-none" />
      
      {/* Scanning laser beam */}
      <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f0ff] animate-scanline opacity-60 pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg p-8 mx-4 rounded-3xl bg-[#060b1d]/90 border border-cyan-500/40 shadow-[0_0_60px_rgba(0,240,255,0.25)] backdrop-blur-2xl text-center space-y-6">
        
        {/* Holographic Logo Reticle */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-500/40 animate-spin" style={{ animationDuration: '8s' }} />
          
          {/* Middle pulsing ring */}
          <div className="absolute inset-2 rounded-full border border-purple-500/50 animate-ping" style={{ animationDuration: '3s' }} />
          
          {/* Inner core */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[2px] shadow-glow-cyan">
            <div className="w-full h-full bg-[#040817] rounded-[14px] flex items-center justify-center">
              <Radar className="w-8 h-8 text-cyan-300 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>IRCC // AURA HUD v3.4</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300">
            FUTURISTIC VISA INTELLIGENCE
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            ESTIMATED TIMES &bull; DEFECT DETECTOR &bull; ACTION MATRIX
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono font-bold">
            <span className="text-cyan-400 truncate max-w-[280px]">{currentStep}</span>
            <span className="text-white">{progress}%</span>
          </div>

          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-purple-500 rounded-full transition-all duration-100 shadow-[0_0_12px_#00f0ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Terminal Telemetry Lines */}
        <div className="p-3 rounded-xl bg-[#030612] border border-slate-800 text-[11px] text-left text-slate-400 space-y-1 font-mono">
          <div className="flex items-center justify-between text-slate-500">
            <span>NODE_ID: CA-IRCC-OTTAWA-09</span>
            <span>STATUS: {progress === 100 ? 'ONLINE' : 'SYNCING'}</span>
          </div>
          <div className="text-cyan-400/90 truncate">
            &gt; {currentStep}
          </div>
        </div>

        {/* Skip button if user wants to bypass immediately */}
        <button
          onClick={onComplete}
          className="text-[11px] font-mono text-slate-500 hover:text-cyan-400 transition-colors uppercase tracking-wider underline underline-offset-4"
        >
          [ Skip Initialization Sequence &rarr; ]
        </button>
      </div>
    </div>
  );
};
