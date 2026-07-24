import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Terminal } from 'lucide-react';

interface HeaderProps {
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTerminal }) => {
  return (
    <header className="relative z-40 w-full px-6 pt-5 pb-2 flex items-center justify-between">
      
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2.5 group text-decoration-none">
        <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
          A
        </div>
        <div className="flex flex-col">
          <span className="font-extrabold text-slate-950 text-base tracking-tight font-heading leading-none">
            {PERSONAL_INFO.name}.
          </span>
          <span className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mt-0.5">
            {PERSONAL_INFO.domain}
          </span>
        </div>
      </a>

      {/* Capsule Navigation */}
      <nav className="glass-header-capsule px-4 py-1.5 rounded-full flex items-center gap-1 sm:gap-2 text-xs font-semibold text-slate-700">
        <a 
          href={`https://${PERSONAL_INFO.domain}`} 
          className="px-3.5 py-1 rounded-full text-slate-950 bg-slate-100 hover:bg-slate-200 transition-all font-bold"
        >
          Home
        </a>
        <a 
          href="https://portfolio.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3.5 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Portfolio</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
        <a 
          href="https://graveyard.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3.5 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Graveyard</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
        <a 
          href="https://zeroblur.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3.5 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Zeroblur</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
      </nav>

      {/* Right Action Button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-mono transition-all hover:scale-105 shadow-md shadow-slate-950/15"
          title="Open Terminal CLI (Cmd+K)"
        >
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">⌘K CLI</span>
        </button>
      </div>

    </header>
  );
};
