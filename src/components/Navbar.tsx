import React from 'react';
import { PERSONAL_INFO } from '../data/subdomainsData';
import { Github, Mail } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <header className="relative z-40 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-2 flex items-center justify-between">
      
      {/* Left Logo */}
      <a 
        href="#" 
        className="flex items-center gap-2 group font-heading font-black text-2xl sm:text-3xl text-[#1A1A1A] tracking-tight hover:opacity-80 transition-opacity"
      >
        <span className="bg-[#1A1A1A] text-[#F9B844] px-3 py-1 rounded-xl border-[2.5px] border-[#1A1A1A] shadow-sm">
          ANRIX
        </span>
      </a>

      {/* Center Hub Pill */}
      <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF7] border-[2.5px] border-[#1A1A1A] shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-[#34D399] animate-pulse" />
        <span className="text-xs font-mono font-bold text-[#1A1A1A] tracking-wide">
          Anrix Subdomain Navigation Hub
        </span>
      </div>

      {/* Right Social Links (Removed Terminal button per user feedback) */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* GitHub Link */}
        <a
          href={PERSONAL_INFO.github}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F3EFE0] border-[2.5px] border-[#1A1A1A] text-[#1A1A1A] transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="GitHub Profile"
        >
          <Github className="w-5 h-5 stroke-[2.2]" />
        </a>

        {/* Email Link */}
        <a
          href={`mailto:${PERSONAL_INFO.email}`}
          className="p-2.5 rounded-xl bg-[#FFFDF7] hover:bg-[#F3EFE0] border-[2.5px] border-[#1A1A1A] text-[#1A1A1A] transition-all shadow-sm hover:scale-105 active:scale-95 flex items-center justify-center"
          aria-label="Contact Email"
        >
          <Mail className="w-5 h-5 stroke-[2.2]" />
        </a>
      </div>
    </header>
  );
};
