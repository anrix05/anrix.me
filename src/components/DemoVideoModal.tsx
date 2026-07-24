import React from 'react';
import { X, Play, Sparkles, Shield, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface DemoVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoVideoModal: React.FC<DemoVideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl rounded-3xl glass-pill bg-slate-950/95 border border-sky-500/30 p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Play className="w-5 h-5 fill-current" />
          </div>
          <div>
            <span className="text-xs font-mono text-sky-400">Interactive Preview Reel</span>
            <h3 className="text-2xl font-extrabold text-white font-heading">{PERSONAL_INFO.name} Architecture Reel</h3>
          </div>
        </div>

        {/* Simulated Video Player Screen */}
        <div className="relative aspect-video rounded-2xl bg-slate-900 border border-white/10 overflow-hidden flex flex-col items-center justify-center text-center p-6 mb-6">
          
          {/* Animated Glow Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40" />
          
          <div className="relative z-10 space-y-3">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400/50 flex items-center justify-center mx-auto text-sky-400 animate-pulse">
              <Sparkles className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white font-heading">60 FPS Interactive System Demo</h4>
            <p className="text-xs text-slate-300 font-mono max-w-md">
              Real-time multi-agent execution canvas, live node graph telemetry, and glassmorphic micro-interactions powered by React & Vite.
            </p>
            <div className="flex items-center justify-center gap-4 pt-2">
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] text-sky-400 font-mono border border-white/5 flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>Zero Latency</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] text-emerald-400 font-mono border border-white/5 flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>100% Operational</span>
              </span>
            </div>
          </div>

        </div>

        <p className="text-xs text-slate-400 font-mono text-center">
          Press <kbd className="px-2 py-0.5 rounded bg-slate-800 text-sky-400">ESC</kbd> or click close to return to main landing page.
        </p>

      </div>
    </div>
  );
};
