import React from 'react';
import { TECH_MARQUEE } from '../data/portfolioData';
import { 
  Code2, 
  FileCode, 
  Server, 
  Terminal, 
  Globe, 
  Zap, 
  Box, 
  Palette, 
  Triangle, 
  Database, 
  Cpu, 
  Sparkles, 
  Command, 
  GitBranch 
} from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-4 h-4 text-sky-400" />;
      case 'FileCode': return <FileCode className="w-4 h-4 text-cyan-400" />;
      case 'Server': return <Server className="w-4 h-4 text-emerald-400" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-amber-400" />;
      case 'Globe': return <Globe className="w-4 h-4 text-indigo-400" />;
      case 'Zap': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'Box': return <Box className="w-4 h-4 text-purple-400" />;
      case 'Palette': return <Palette className="w-4 h-4 text-pink-400" />;
      case 'Triangle': return <Triangle className="w-4 h-4 text-slate-200" />;
      case 'Database': return <Database className="w-4 h-4 text-blue-400" />;
      case 'Cpu': return <Cpu className="w-4 h-4 text-rose-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-teal-400" />;
      case 'Command': return <Command className="w-4 h-4 text-fuchsia-400" />;
      default: return <GitBranch className="w-4 h-4 text-orange-400" />;
    }
  };

  // Duplicate items for continuous seamless loop
  const marqueeList = [...TECH_MARQUEE, ...TECH_MARQUEE];

  return (
    <div className="relative z-20 w-full py-8 bg-slate-950/60 border-y border-white/5 overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-slate-500 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
        <span>Ecosystem & Technology Stack</span>
        <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
      </div>

      <div className="flex overflow-hidden select-none mask-gradient">
        <div className="animate-marquee flex items-center gap-8 py-2">
          {marqueeList.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-white/5 text-slate-300 hover:text-white hover:border-sky-500/40 hover:bg-slate-900 transition-all duration-200 cursor-default"
            >
              {getTechIcon(item.icon)}
              <span className="text-xs font-semibold tracking-wide font-mono whitespace-nowrap">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
