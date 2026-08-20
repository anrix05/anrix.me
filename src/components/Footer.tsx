import React from 'react';
import { PERSONAL_INFO } from '../data/subdomainsData';
import { Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-30 w-full border-t-[3px] border-[#1A1A1A] bg-[#FFFDF7] py-6 px-4 sm:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs sm:text-sm text-[#1A1A1A] font-bold">
        
        {/* Left Info */}
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#1D70B8]" />
          <span>© {new Date().getFullYear()} {PERSONAL_INFO.domain}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 font-normal">All 3 Subdomains Connected</span>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a 
            href="https://portfolio.anrix.me" 
            target="_blank" 
            rel="noreferrer"
            className="hover:underline hover:text-[#1D70B8] transition-colors"
          >
            Portfolio
          </a>
          <a 
            href="https://graveyard.anrix.me" 
            target="_blank" 
            rel="noreferrer"
            className="hover:underline hover:text-[#2E7D32] transition-colors"
          >
            Graveyard
          </a>
          <a 
            href="https://zeroblur.anrix.me" 
            target="_blank" 
            rel="noreferrer"
            className="hover:underline hover:text-[#7E22CE] transition-colors"
          >
            Zeroblur
          </a>
        </div>

      </div>
    </footer>
  );
};
