import React from 'react';
import { motion } from 'framer-motion';
import { SUBDOMAINS, PERSONAL_INFO } from '../data/subdomainsData';
import { MonitorCard } from './MonitorCard';
import {
  TitleRays,
  LeftSquiggle,
  RightSquiggle,
  HangingLamp,
  CharacterTopLeft,
  CharacterTopCenter,
  CharacterTopRight,
  CharacterSittingAtDesk,
  DeskClutterLeft,
  DeskClutterRight
} from './IllustrationElements';

export const Hero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden pt-3 sm:pt-6 pb-6 sm:pb-12 flex flex-col items-center justify-between min-h-[calc(100vh-70px)]">
      
      {/* Background Blobs */}
      <div 
        className="absolute -top-12 -right-16 w-64 h-64 sm:w-96 sm:h-96 rounded-full opacity-60 pointer-events-none z-0"
        style={{ backgroundColor: '#FDE08B' }}
      />
      <div 
        className="absolute -bottom-10 -left-12 w-48 h-48 sm:w-80 sm:h-80 opacity-40 pointer-events-none z-0 transform -rotate-12"
        style={{
          backgroundColor: '#E07A5F',
          clipPath: 'polygon(0% 20%, 60% 0%, 100% 40%, 80% 100%, 10% 90%)'
        }}
      />

      {/* Decorative Squiggles */}
      <LeftSquiggle className="absolute top-16 left-2 sm:left-12 w-10 sm:w-16 h-14 sm:h-20 pointer-events-none z-10 hidden sm:block" />
      <RightSquiggle className="absolute bottom-36 right-2 sm:right-10 w-10 sm:w-16 h-14 sm:h-20 pointer-events-none z-10 hidden sm:block" />

      {/* --- HERO HEADER SECTION --- */}
      <div className="relative z-20 max-w-3xl text-center px-4 mb-2 sm:mb-4 flex flex-col items-center">
        
        {/* Title Rays above Heading */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-1"
        >
          <TitleRays className="w-14 h-7 sm:w-20 sm:h-10 mx-auto" />
        </motion.div>

        {/* Main Title Heading */}
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-7xl md:text-7xl lg:text-8xl font-black font-heading text-[#1A1A1A] tracking-tight leading-none mb-2 sm:mb-4"
        >
          {PERSONAL_INFO.heading}
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-sm sm:text-lg md:text-xl lg:text-2xl text-[#1A1A1A] font-semibold max-w-2xl leading-snug px-2"
        >
          {PERSONAL_INFO.subheading}
        </motion.p>
      </div>

      {/* --- MONITOR GROUP & ILLUSTRATION SCENE --- */}
      <div className="relative z-20 w-full max-w-7xl px-3 sm:px-6 lg:px-8 mt-14 sm:mt-24 flex flex-col items-center">
        
        {/* Pendant Lamp Doodle hanging over Middle Monitor (Tablet & Desktop Only) */}
        <HangingLamp className="absolute -top-24 left-1/2 -translate-x-1/2 z-30 hidden md:flex pointer-events-none" />

        {/* Grid of 3 Desktop Monitors (Responsive Grid: 1 col on mobile, 3 cols on tablet & desktop) */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-16 sm:gap-20 md:gap-4 lg:gap-6 xl:gap-8 items-end justify-center mb-0">
          
          {/* Card 1: Portfolio (Left Monitor) */}
          <div className="relative w-full flex justify-center">
            <MonitorCard 
              subdomain={SUBDOMAINS[0]} 
              index={0} 
              CharacterComponent={<CharacterTopLeft />}
            />
          </div>

          {/* Card 2: Graveyard (Middle Monitor) */}
          <div className="relative w-full flex justify-center">
            <MonitorCard 
              subdomain={SUBDOMAINS[1]} 
              index={1} 
              CharacterComponent={<CharacterTopCenter />}
            />
          </div>

          {/* Card 3: Zeroblur (Right Monitor) */}
          <div className="relative w-full flex justify-center">
            <MonitorCard 
              subdomain={SUBDOMAINS[2]} 
              index={2} 
              CharacterComponent={<CharacterTopRight />}
            />
          </div>

        </div>
      </div>

      {/* --- DESK SCENE & FOREGROUND CHARACTERS --- */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-2 sm:px-6 mt-0 pointer-events-none">
        
        {/* Desk Top Surface Bar */}
        <div className="relative w-full h-8 sm:h-10 bg-[#D97736] border-y-[3.5px] border-[#1A1A1A] rounded-sm shadow-md flex items-center justify-between px-2 sm:px-12">
          
          {/* Desk Clutter Left: Stack of books + Stapler */}
          <div className="absolute left-2 sm:left-6 md:left-12 -top-10 sm:-top-12 z-20 pointer-events-auto origin-left transform scale-90 sm:scale-100">
            <DeskClutterLeft />
          </div>

          {/* Desk Clutter Right: Pen cup + 2 Potted plants */}
          <div className="absolute right-2 sm:right-6 md:right-12 -top-24 sm:-top-28 z-20 pointer-events-auto origin-right transform scale-90 sm:scale-100">
            <DeskClutterRight />
          </div>

          {/* Sitting Character in White Office Chair */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-20 sm:-top-24 z-30 pointer-events-none origin-bottom transform scale-90 sm:scale-100">
            <CharacterSittingAtDesk />
          </div>

        </div>

        {/* Desk Legs */}
        <div className="w-full flex justify-between px-6 sm:px-24 h-6 sm:h-8">
          <div className="w-4 sm:w-6 h-full bg-[#B45309] border-x-[3px] border-[#1A1A1A]" />
          <div className="w-4 sm:w-6 h-full bg-[#B45309] border-x-[3px] border-[#1A1A1A]" />
        </div>
      </div>

    </section>
  );
};
