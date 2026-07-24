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
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-sky-500" />;
      case 'Skull': return <Skull className="w-4 h-4 text-emerald-500" />;
      default: return <Zap className="w-4 h-4 text-purple-500" />;
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
    <div className="relative flex-1 flex flex-col justify-between items-center px-3 sm:px-6 py-2 overflow-hidden z-20">
      
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

      {/* Floating Subdomain Nodes (Desktop Only) */}
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

      {/* Reel Trigger Button */}
      <div className="relative z-30 mb-1 mt-1">
        <button
          onClick={onOpenDemoVideo}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full glass-header-capsule flex items-center justify-center text-slate-700 hover:text-slate-950 hover:scale-110 shadow-md transition-all group"
          title="Play Reel"
        >
          <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-slate-900 group-hover:scale-110 transition-transform ml-0.5" />
        </button>
      </div>

      {/* Main Center Headline & Subtitle */}
      <div className="relative z-30 max-w-xl sm:max-w-2xl text-center flex flex-col items-center my-auto px-2">
        
        {/* Announcement Badge */}
        <a
          href="https://portfolio.anrix.me"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1 rounded-full glass-header-capsule text-[11px] sm:text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 cursor-pointer transition-all duration-300 hover:scale-105 mb-3 shadow-sm max-w-full truncate"
        >
          <Globe className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          <span className="truncate">{PERSONAL_INFO.badge}</span>
        </a>

        {/* Clean Headline */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 mb-3 leading-[1.1] font-heading title-minimal">
          One-click for <span className="underline decoration-slate-300 underline-offset-4 sm:underline-offset-8">Anrix Network.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4">
          {PERSONAL_INFO.subtitle}
        </p>

        {/* Subdomain Cards (Mobile & Tablet Viewport: Full Width Stacked Cards) */}
        <div className="w-full max-w-md lg:hidden my-2 flex flex-col sm:grid sm:grid-cols-3 gap-2">
          {SUBDOMAIN_NODES.map((node) => (
            <a
              key={node.id}
              href={node.url}
              target="_blank"
              rel="noreferrer"
              className="glass-node-pill p-3 rounded-2xl flex items-center justify-between text-left border border-slate-200 hover:border-slate-400 transition-colors shadow-sm"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  {renderNodeIcon(node.icon)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 tracking-tight font-heading truncate">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate">{node.subdomain}</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
            </a>
          ))}
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="relative z-30 w-full max-w-6xl flex items-center justify-between mt-auto pt-2">
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-header-capsule text-xs text-slate-600 hover:text-slate-950 transition-colors"
        >
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-slate-200 flex items-center justify-center">
            <ChevronDown className="w-3 h-3 text-slate-700" />
          </div>
          <span className="font-mono text-[10px] sm:text-[11px] font-medium">01/01 . Network Active</span>
        </button>

        <div className="flex flex-col items-end gap-1 text-right">
          <span className="text-[10px] sm:text-xs font-bold text-slate-900 tracking-wide font-mono">
            3 Subdomains • anrix.me
          </span>
          <div className="flex items-center gap-1">
            <div className="w-4 sm:w-6 h-1 rounded-full bg-sky-500" />
            <div className="w-4 sm:w-6 h-1 rounded-full bg-emerald-500" />
            <div className="w-4 sm:w-6 h-1 rounded-full bg-purple-500" />
          </div>
        </div>
      </div>

      {/* Bottom Marquee Navigation Ticker */}
      <div className="relative z-30 w-full pt-2 sm:pt-3 border-t border-slate-200/80 overflow-hidden">
        <div className="flex overflow-hidden select-none">
          <div className="animate-marquee flex items-center gap-6 sm:gap-8">
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
