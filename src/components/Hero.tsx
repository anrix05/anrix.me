import React, { useState } from 'react';
import { PERSONAL_INFO, SUBDOMAIN_NODES, SubdomainNode, TECH_MARQUEE } from '../data/portfolioData';
import { 
  Play, 
  ArrowUpRight, 
  ChevronDown, 
  Briefcase, 
  Skull, 
  Zap, 
  Globe,
  Triangle,
  Command
} from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenDemoVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal, onOpenDemoVideo }) => {
  const [activeNode, setActiveNode] = useState<SubdomainNode | null>(null);

  const renderNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-4 h-4" />;
      case 'Skull': return <Skull className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Briefcase': return <Briefcase className="w-3.5 h-3.5 text-slate-700" />;
      case 'Skull': return <Skull className="w-3.5 h-3.5 text-slate-700" />;
      case 'Zap': return <Zap className="w-3.5 h-3.5 text-slate-700" />;
      case 'Triangle': return <Triangle className="w-3.5 h-3.5 text-slate-500" />;
      default: return <Command className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  const marqueeList = [...TECH_MARQUEE, ...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div className="relative flex-1 flex flex-col justify-between items-center px-4 sm:px-6 py-2 overflow-hidden z-20">
      
      {/* Light Streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="light-streak left-[32%] top-0 h-44" style={{ animationDuration: '5.5s', animationDelay: '0s' }} />
        <div className="light-streak left-[49%] top-0 h-60" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }} />
        <div className="light-streak left-[51%] top-0 h-52" style={{ animationDuration: '4.8s', animationDelay: '0.6s' }} />
        <div className="light-streak left-[68%] top-0 h-40" style={{ animationDuration: '6.2s', animationDelay: '2.1s' }} />
      </div>

      {/* SVG Connecting Curved Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block opacity-70">
        {SUBDOMAIN_NODES.map((node) => {
          const isLeft = node.position.x < 50;
          const isTop = node.position.y < 50;
          
          const startX = `${node.position.x}%`;
          const startY = `${node.position.y}%`;
          const midX = isLeft ? `${node.position.x + 10}%` : `${node.position.x - 10}%`;
          const midY = isTop ? `${node.position.y + 6}%` : `${node.position.y - 6}%`;
          const endX = "50%";
          const endY = "50%";

          const isActive = activeNode?.id === node.id;

          return (
            <g key={node.id}>
              <path
                d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                fill="none"
                stroke={isActive ? "#0f172a" : "rgba(15, 23, 42, 0.12)"}
                strokeWidth={isActive ? "2" : "1.2"}
                strokeDasharray={isActive ? "none" : "3 3"}
                className="transition-all duration-300"
              />
              <circle r={isActive ? "4" : "2.5"} fill={isActive ? "#0f172a" : "#64748b"}>
                <animateMotion
                  path={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
                  dur={`${4 + (node.position.x % 3)}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Floating Subdomain Nodes (Portfolio, Graveyard, Zeroblur) */}
      <div className="absolute inset-0 max-w-[1400px] mx-auto pointer-events-none z-30 hidden lg:block">
        {SUBDOMAIN_NODES.map((node) => {
          const isActive = activeNode?.id === node.id;
          return (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noreferrer"
              style={{ left: `${node.position.x}%`, top: `${node.position.y}%` }}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              className={`absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
                isActive ? 'scale-105 z-40' : 'scale-100 opacity-95 hover:opacity-100'
              }`}
            >
              {/* Floating Node Card Pill */}
              <div 
                className="glass-node-pill px-4 py-2.5 rounded-2xl flex items-center gap-3 transition-all duration-300"
                style={{
                  borderColor: isActive ? '#0f172a' : 'rgba(226, 232, 240, 1)'
                }}
              >
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${node.color}15`, color: node.color }}
                >
                  {renderNodeIcon(node.icon)}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                    <span className="text-xs font-bold text-slate-900 tracking-tight font-heading">{node.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono -mt-0.5">{node.subdomain}</span>
                </div>
              </div>

              {/* Hover Tooltip Details */}
              {isActive && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 p-3 rounded-xl glass-header-capsule border border-slate-300 text-xs shadow-2xl text-left animate-fadeIn">
                  <div className="flex items-center justify-between text-slate-900 font-mono text-[11px] mb-1 font-bold">
                    <span>{node.category}</span>
                    <span className="text-slate-600 font-normal">{node.stat}</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-tight">{node.description}</p>
                </div>
              )}
            </a>
          );
        })}
      </div>

      {/* Play Reel Trigger Button */}
      <div className="relative z-30 mb-2 mt-1">
        <button
          onClick={onOpenDemoVideo}
          className="w-10 h-10 rounded-full glass-header-capsule flex items-center justify-center text-slate-700 hover:text-slate-950 hover:scale-110 shadow-md transition-all group"
          title="Play Reel"
        >
          <Play className="w-3.5 h-3.5 fill-current text-slate-900 group-hover:scale-110 transition-transform ml-0.5" />
        </button>
      </div>

      {/* Main Center Headline & Subtitle Block */}
      <div className="relative z-30 max-w-xl sm:max-w-2xl text-center flex flex-col items-center my-auto px-2">
        
        {/* Top Badge */}
        <a
          href="https://portfolio.anrix.me"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full glass-header-capsule text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-all duration-300 hover:scale-105 mb-4 shadow-sm"
        >
          <Globe className="w-3.5 h-3.5 text-slate-950" />
          <span>{PERSONAL_INFO.badge}</span>
        </a>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-950 mb-4 leading-[1.05] font-heading title-minimal">
          One-click for <span className="underline decoration-slate-300 underline-offset-8">Anrix Network.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
          {PERSONAL_INFO.subtitle}
        </p>

        {/* Mobile Subdomain Card Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-md lg:hidden my-4">
          {SUBDOMAIN_NODES.map((node) => (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noreferrer"
              className="glass-node-pill p-2.5 rounded-xl flex flex-col items-center text-center border border-slate-200 hover:border-slate-400 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 mb-1">
                {renderNodeIcon(node.icon)}
              </div>
              <div className="text-[11px] font-bold text-slate-900 flex items-center gap-0.5">
                <span>{node.name}</span>
                <ArrowUpRight className="w-2.5 h-2.5 text-slate-400" />
              </div>
              <div className="text-[9px] text-slate-500 font-mono truncate max-w-full">{node.subdomain}</div>
            </a>
          ))}
        </div>

      </div>

      {/* Bottom Bar Controls */}
      <div className="relative z-30 w-full max-w-6xl flex items-center justify-between mt-auto pt-2">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-header-capsule text-xs text-slate-600 hover:text-slate-950 transition-colors"
        >
          <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center">
            <ChevronDown className="w-3 h-3 text-slate-700" />
          </div>
          <span className="font-mono text-[11px] font-medium">01/01 . Minimalist Hub Active</span>
        </button>

        <div className="hidden sm:flex flex-col items-end gap-1 text-right">
          <span className="text-xs font-bold text-slate-900 tracking-wide font-mono">
            3 Active Subdomains • anrix.me
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-1 rounded-full bg-sky-500" />
            <div className="w-6 h-1 rounded-full bg-emerald-500" />
            <div className="w-6 h-1 rounded-full bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Bottom Marquee Navigation Ticker */}
      <div className="relative z-30 w-full pt-3 border-t border-slate-200/80 overflow-hidden">
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-8">
            {marqueeList.map((item, index) => (
              <a
                key={`${item.name}-${index}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 hover:text-slate-950 transition-colors cursor-pointer text-decoration-none"
              >
                {getTechIcon(item.icon)}
                <span className="text-xs font-bold tracking-tight font-heading whitespace-nowrap">
                  {item.name}
                </span>
                {item.url !== '#' && <ArrowUpRight className="w-3 h-3 text-slate-400" />}
              </a>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
