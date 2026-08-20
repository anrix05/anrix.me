import React from 'react';
import { motion } from 'framer-motion';
import { SubdomainData } from '../data/subdomainsData';
import { Briefcase, Skull, Zap, ArrowUpRight } from 'lucide-react';

interface MonitorCardProps {
  subdomain: SubdomainData;
  index: number;
  CharacterComponent?: React.ReactNode;
}

export const MonitorCard: React.FC<MonitorCardProps> = ({ subdomain, index, CharacterComponent }) => {
  const renderIcon = () => {
    switch (subdomain.iconType) {
      case 'briefcase':
        return <Briefcase className="w-6 h-6 text-white stroke-[2.5]" />;
      case 'ghost':
        return <Skull className="w-6 h-6 text-white stroke-[2.5]" />;
      case 'zap':
        return <Zap className="w-6 h-6 text-white fill-current stroke-[2]" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 * index }}
      className="relative flex flex-col items-center group w-full max-w-[360px] sm:max-w-[380px] lg:max-w-[390px] mx-auto z-10"
    >
      {/* Character illustration sitting behind monitor top bar */}
      {CharacterComponent}

      {/* Monitor Browser Window */}
      <a
        href={subdomain.url}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 block w-full text-left transition-all duration-300 transform group-hover:-translate-y-2 focus:outline-none"
      >
        <div 
          className="relative rounded-[22px] border-[3.5px] border-[#1A1A1A] bg-[#1A1A1A] shadow-2xl overflow-hidden transition-all duration-300"
          style={{
            boxShadow: `0 20px 30px -10px rgba(0,0,0,0.18)`
          }}
        >
          {/* Top Window Header Bar */}
          <div className="bg-[#E8E6DF] px-4 py-2 border-b-[3px] border-[#1A1A1A] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#1A1A1A]/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#1A1A1A]/40 inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1A1A1A]/40 inline-block" />
            </div>
            <div className="w-10" />
          </div>

          {/* Monitor Screen Body (Warm Off-White / Cream Card `#FFFDF7`) */}
          <div className="bg-[#FFFDF7] p-6 sm:p-7 flex flex-col justify-between min-h-[290px] sm:min-h-[310px]">
            <div>
              {/* Header Row: Colored Circular Icon + Title & Subdomain URL */}
              <div className="flex items-center gap-4 mb-4">
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 border-[3px] border-[#1A1A1A] shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundColor: subdomain.badgeBg }}
                >
                  {renderIcon()}
                </div>

                <div className="flex flex-col">
                  <h3 
                    className="text-2xl sm:text-3xl font-extrabold font-heading tracking-tight"
                    style={{ color: subdomain.color }}
                  >
                    {subdomain.name}
                  </h3>
                  <span className="text-sm font-semibold font-mono text-slate-500 -mt-0.5">
                    {subdomain.subdomain}
                  </span>
                </div>
              </div>

              {/* Thin Accent Color Divider Line */}
              <div 
                className="w-full h-[2px] rounded-full mb-4 opacity-80"
                style={{ backgroundColor: subdomain.color }}
              />

              {/* 2-3 lines of Gray Descriptive Body Text */}
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium mb-6">
                {subdomain.description}
              </p>
            </div>

            {/* Full-Width Rounded Pill Button in Accent Color with Hover State */}
            <div className="mt-auto">
              <div 
                className="w-full py-3 px-5 rounded-full text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 border-[2.5px] border-[#1A1A1A] transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:brightness-95 transform group-hover:scale-[1.02]"
                style={{ backgroundColor: subdomain.buttonBg }}
              >
                <span>Visit {subdomain.name}</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </a>

      {/* Monitor Stand Base */}
      <div className="relative z-10 flex flex-col items-center pointer-events-none -mt-0.5">
        {/* Monitor Neck */}
        <div className="w-12 h-7 bg-[#1A1A1A] border-x-[3px] border-[#1A1A1A]" />
        {/* Monitor Stand Base */}
        <div className="w-32 h-3.5 bg-[#1A1A1A] rounded-t-lg rounded-b-sm border-t border-slate-700 shadow-md" />
      </div>
    </motion.div>
  );
};
