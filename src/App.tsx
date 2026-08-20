import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#F9B844] text-[#1A1A1A] flex flex-col justify-between overflow-x-hidden font-body selection:bg-[#1A1A1A] selection:text-[#F9B844]">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Playful Illustrated Hero */}
      <main className="flex-1 flex flex-col justify-center pb-8 sm:pb-12">
        <Hero />
      </main>
      
    </div>
  );
};

export default App;
