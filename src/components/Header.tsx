import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ArrowUpRight, Terminal, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenTerminal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenTerminal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative z-40 w-full px-3 sm:px-6 pt-3 sm:pt-5 pb-2 flex items-center justify-between">
      
      {/* Brand Logo */}
      <a href="#" className="flex items-center gap-2 text-decoration-none shrink-0">
        <div className="w-8 h-8 rounded-xl bg-slate-950 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-slate-900/10">
          A
        </div>
        <span className="font-extrabold text-slate-950 text-base tracking-tight font-heading">
          {PERSONAL_INFO.name}.
        </span>
      </a>

      {/* Desktop Capsule Navigation (Hidden on small screens to prevent overflow) */}
      <nav className="hidden sm:flex glass-header-capsule px-3 py-1.5 rounded-full items-center gap-1.5 text-xs font-semibold text-slate-700">
        <a 
          href={`https://${PERSONAL_INFO.domain}`} 
          className="px-3 py-1 rounded-full text-slate-950 bg-slate-100 font-bold"
        >
          Home
        </a>
        <a 
          href="https://portfolio.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Portfolio</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
        <a 
          href="https://graveyard.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Graveyard</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
        <a 
          href="https://zeroblur.anrix.me" 
          target="_blank" 
          rel="noreferrer"
          className="px-3 py-1 rounded-full hover:text-slate-950 hover:bg-slate-100 transition-all flex items-center gap-0.5"
        >
          <span>Zeroblur</span>
          <ArrowUpRight className="w-3 h-3 text-slate-400" />
        </a>
      </nav>

      {/* Right Action: CLI Terminal & Mobile Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-mono transition-all shadow-md shadow-slate-950/15"
          title="Open Terminal CLI (Cmd+K)"
        >
          <Terminal className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-[11px]">⌘K</span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-1.5 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200"
        >
          {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown Popup */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-3 right-3 mt-2 p-4 rounded-2xl glass-header-capsule bg-white/95 border border-slate-200 shadow-2xl z-50 flex flex-col gap-2 text-sm">
          <a
            href="https://portfolio.anrix.me"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 font-bold text-slate-900"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            href="https://graveyard.anrix.me"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 font-bold text-slate-900"
          >
            <span>Graveyard</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </a>
          <a
            href="https://zeroblur.anrix.me"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 font-bold text-slate-900"
          >
            <span>Zeroblur</span>
            <ArrowUpRight className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      )}

    </header>
  );
};
