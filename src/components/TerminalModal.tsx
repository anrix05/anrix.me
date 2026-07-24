import React, { useState, useEffect, useRef } from 'react';
import { SUBDOMAIN_NODES } from '../data/portfolioData';
import { Terminal as TerminalIcon, X, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleMatrix: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose, onToggleMatrix }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-xs font-mono text-slate-300">
          <p className="text-sky-400 font-bold">ANRIX NETWORK CLI [v2.4.0-hub]</p>
          <p className="text-slate-400">Type <span className="text-emerald-400 font-bold">help</span> to list available commands or subdomains.</p>
        </div>
      )
    }
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <p className="text-sky-400 font-bold">Available Commands:</p>
            <p><span className="text-emerald-400 w-28 inline-block">subdomains</span> : List all connected subdomains</p>
            <p><span className="text-emerald-400 w-28 inline-block">portfolio</span> : Navigate to portfolio.anrix.me</p>
            <p><span className="text-emerald-400 w-28 inline-block">graveyard</span> : Navigate to graveyard.anrix.me</p>
            <p><span className="text-emerald-400 w-28 inline-block">zeroblur</span> : Navigate to zeroblur.anrix.me</p>
            <p><span className="text-emerald-400 w-28 inline-block">matrix</span> : Toggle digital rain effect</p>
            <p><span className="text-emerald-400 w-28 inline-block">clear</span> : Clear terminal screen</p>
          </div>
        );
        break;

      case 'subdomains':
      case 'nodes':
        output = (
          <div className="space-y-2 text-xs font-mono">
            {SUBDOMAIN_NODES.map((node) => (
              <div key={node.id} className="p-2 rounded bg-slate-900 border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-sky-400 font-bold">{node.name}</span> — <span className="text-slate-400">{node.subdomain}</span>
                </div>
                <a href={node.url} target="_blank" rel="noreferrer" className="text-emerald-400 underline font-bold">
                  Open ↗
                </a>
              </div>
            ))}
          </div>
        );
        break;

      case 'portfolio':
        window.open('https://portfolio.anrix.me', '_blank');
        output = <div className="text-xs font-mono text-emerald-400">Opening portfolio.anrix.me...</div>;
        break;

      case 'graveyard':
        window.open('https://graveyard.anrix.me', '_blank');
        output = <div className="text-xs font-mono text-emerald-400">Opening graveyard.anrix.me...</div>;
        break;

      case 'zeroblur':
        window.open('https://zeroblur.anrix.me', '_blank');
        output = <div className="text-xs font-mono text-emerald-400">Opening zeroblur.anrix.me...</div>;
        break;

      case 'matrix':
        onToggleMatrix();
        output = <div className="text-xs font-mono text-emerald-400">[SUCCESS] Matrix digital rain effect toggled!</div>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = (
          <div className="text-xs font-mono text-rose-400">
            Command not recognized: "{cmd}". Type <span className="underline">help</span> for command list.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output }]);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl glass-header-capsule bg-slate-950/95 border border-sky-500/40 shadow-2xl overflow-hidden flex flex-col h-[460px]">
        
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1">
              <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
              anrix@anrix.me:~
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-4">
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1">
              {item.command !== 'welcome' && (
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-emerald-400">anrix@anrix.me:~$</span>
                  <span className="text-white font-bold">{item.command}</span>
                </div>
              )}
              <div>{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Form */}
        <form onSubmit={handleCommandSubmit} className="p-3 bg-slate-900/80 border-t border-white/10 flex items-center gap-2">
          <span className="text-emerald-400 font-mono text-xs font-bold pl-2">anrix@anrix.me:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'subdomains', or 'zeroblur'..."
            className="flex-1 bg-transparent text-xs font-mono text-white placeholder-slate-500 outline-none"
          />
          <button type="submit" className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 hover:bg-sky-500/30">
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
