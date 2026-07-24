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
    <div className="relative w-screen min-h-screen h-auto lg:h-screen lg:max-h-screen overflow-y-auto lg:overflow-hidden p-2 sm:p-4 md:p-6 bg-[#f4f4f6] flex items-center justify-center">
      
      {/* Background Outer Ambient Glows */}
      <div className="minimal-ambient-tr" />
      <div className="minimal-ambient-bl" />

      {/* Main Container Frame */}
      <div className="relative w-full min-h-full h-auto lg:h-full max-w-7xl rounded-2xl sm:rounded-[28px] lg:rounded-[36px] bg-white border border-slate-200/90 shadow-2xl shadow-slate-400/20 flex flex-col justify-between overflow-hidden">
        
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
