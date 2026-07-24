import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TerminalModal } from './components/TerminalModal';
import { DemoVideoModal } from './components/DemoVideoModal';
import { MatrixRainCanvas } from './components/MatrixRainCanvas';

export const App: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [matrixActive, setMatrixActive] = useState(false);

  // Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative w-screen h-screen max-h-screen overflow-hidden p-3 sm:p-6 bg-[#f4f4f6] flex items-center justify-center">
      
      {/* Background Outer Ambient Glows */}
      <div className="minimal-ambient-tr" />
      <div className="minimal-ambient-bl" />

      {/* Main Single Page Kleanity Frame */}
      <div className="relative w-full h-full max-w-7xl rounded-[24px] sm:rounded-[36px] bg-white border border-slate-200/90 shadow-2xl shadow-slate-400/20 flex flex-col justify-between overflow-hidden">
        
        {/* Minimal Grid Pattern */}
        <div className="bg-minimal-grid" />

        {/* Matrix Digital Rain Canvas Overlay */}
        <MatrixRainCanvas active={matrixActive} />

        {/* Capsule Navigation Header */}
        <Header onOpenTerminal={() => setTerminalOpen(true)} />

        {/* Centerpiece Hero View with Subdomain Nodes */}
        <Hero 
          onOpenTerminal={() => setTerminalOpen(true)}
          onOpenDemoVideo={() => setVideoModalOpen(true)}
        />
      </div>

      {/* Interactive CLI Terminal Drawer */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
      />

      {/* Reel Preview Modal */}
      <DemoVideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />
    </div>
  );
};

export default App;
