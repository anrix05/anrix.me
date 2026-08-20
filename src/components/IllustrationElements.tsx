import React from 'react';
import { motion } from 'framer-motion';

// --- DOODLE: RAYS ABOVE TITLE ---
export const TitleRays: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 80 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 32L5 8" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M40 30V4" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M65 32L75 8" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// --- DOODLE: LEFT SQUIGGLE ---
export const LeftSquiggle: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.svg
    animate={{ rotate: [-4, 4, -4], y: [0, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    viewBox="0 0 60 80"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M40 10C20 15 10 30 25 45C40 60 10 65 15 75"
      stroke="#1A1A1A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

// --- DOODLE: RIGHT SQUIGGLE ---
export const RightSquiggle: React.FC<{ className?: string }> = ({ className = "" }) => (
  <motion.svg
    animate={{ rotate: [4, -4, 4], y: [0, 5, 0] }}
    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    viewBox="0 0 60 80"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 10C35 15 45 35 25 50C10 65 40 70 35 78"
      stroke="#1A1A1A"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </motion.svg>
);

// --- HANGING PENDANT LAMP DOODLE (ABOVE MIDDLE MONITOR) ---
export const HangingLamp: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    <div className="w-[2.5px] bg-[#1A1A1A] h-14 sm:h-20" />
    <div className="relative z-10">
      <svg width="52" height="32" viewBox="0 0 52 32" fill="none">
        <path d="M26 2L4 30H48L26 2Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
        <ellipse cx="26" cy="30" rx="22" ry="3.5" fill="#1A1A1A" />
      </svg>
    </div>
    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" className="mt-1">
      <path d="M10 5C20 15 40 5 50 15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </div>
);

// --- CHARACTER 1: TOP LEFT (Orange Curly Afro Hair, Green Sweater, Holding Tablet) ---
export const CharacterTopLeft: React.FC = () => (
  <motion.div 
    initial={{ y: -8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="absolute -top-[95px] left-3 sm:left-6 z-20 pointer-events-none"
  >
    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100C20 70 42 58 75 58C108 58 130 70 130 100H20Z" fill="#27AE60" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <rect x="65" y="46" width="20" height="14" rx="4" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="75" cy="36" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="69" cy="34" r="2" fill="#1A1A1A" />
      <circle cx="81" cy="34" r="2" fill="#1A1A1A" />
      <path d="M66 28C68 26 71 26 73 28" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M77 28C79 26 82 26 84 28" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M70 41C73 44 77 44 80 41" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <circle cx="64" cy="37" r="3" fill="#F87171" opacity="0.6" />
      <circle cx="86" cy="37" r="3" fill="#F87171" opacity="0.6" />
      <path d="M46 26C36 26 28 18 32 8C36 -2 48 -2 54 5C60 -3 74 -4 82 3C90 -3 100 4 102 14C108 8 118 14 114 24C122 30 116 42 106 40C100 40 96 36 94 32C86 40 60 40 46 26Z" fill="#E07A5F" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M42 90C42 84 52 84 52 90V100H42V90Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="45" y1="90" x2="45" y2="100" stroke="#1A1A1A" strokeWidth="1.5" />
      <line x1="48" y1="90" x2="48" y2="100" stroke="#1A1A1A" strokeWidth="1.5" />
      <path d="M112 100C112 82 124 74 115 62" stroke="#27AE60" strokeWidth="12" strokeLinecap="round" />
      <path d="M112 100C112 82 124 74 115 62" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <rect x="108" y="52" width="22" height="32" rx="4" fill="#2C3E50" stroke="#1A1A1A" strokeWidth="2.5" transform="rotate(-15 108 52)" />
      <circle cx="115" cy="74" r="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
    </svg>
  </motion.div>
);

// --- CHARACTER 2: TOP CENTER (Brown Curly Hair, Purple Sweater, Pointing Down) ---
export const CharacterTopCenter: React.FC = () => (
  <motion.div 
    initial={{ y: -8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="absolute -top-[100px] right-2 sm:right-6 z-20 pointer-events-none"
  >
    <svg width="150" height="115" viewBox="0 0 150 115" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 100C25 70 48 58 80 58C112 58 135 70 135 100H25Z" fill="#8E44AD" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <rect x="70" y="46" width="20" height="14" rx="4" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="80" cy="36" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <circle cx="74" cy="34" r="2" fill="#1A1A1A" />
      <circle cx="86" cy="34" r="2" fill="#1A1A1A" />
      <path d="M75 41C78 44 82 44 85 41" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M56 26C48 26 42 16 48 8C54 0 64 2 70 7C76 0 90 0 96 7C104 1 114 9 110 19C116 26 108 34 100 32C90 38 68 36 56 26Z" fill="#A04000" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 90C48 84 58 84 58 90V100H48V90Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M120 100C120 84 132 78 126 95L124 112" stroke="#8E44AD" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M120 100C120 84 132 78 126 95L124 112" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="124" cy="104" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <path d="M124 104V116" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
      <path d="M124 104V116" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  </motion.div>
);

// --- CHARACTER 3: TOP RIGHT (Orange Curly Hair, Teal Sweater, Chin on Hand) ---
export const CharacterTopRight: React.FC = () => (
  <motion.div 
    initial={{ y: -8, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="absolute -top-[95px] right-3 sm:right-6 z-20 pointer-events-none"
  >
    <svg width="150" height="100" viewBox="0 0 150 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 100C20 70 42 58 75 58C108 58 130 70 130 100H20Z" fill="#16A085" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <rect x="65" y="46" width="20" height="14" rx="4" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="73" cy="36" r="18" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M67 34C69 32 72 32 74 34" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M77 34C79 32 82 32 84 34" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" />
      <path d="M69 41C72 44 76 44 79 41" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M46 26C36 26 28 18 32 8C36 -2 48 -2 54 5C60 -3 74 -4 82 3C90 -3 100 4 102 14C108 8 118 14 114 24C122 30 116 42 106 40C100 40 96 36 94 32C86 40 60 40 46 26Z" fill="#E07A5F" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
      <path d="M106 100C106 82 92 72 82 52" stroke="#16A085" strokeWidth="12" strokeLinecap="round" />
      <path d="M106 100C106 82 92 72 82 52" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="80" cy="50" r="6" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <path d="M36 90C36 84 46 84 46 90V100H36V90Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  </motion.div>
);

// --- CHARACTER 4: SITTING AT DESK (Clean vector design matching reference image) ---
export const CharacterSittingAtDesk: React.FC = () => (
  <div className="relative flex flex-col items-center z-30 pointer-events-none">
    <svg width="240" height="150" viewBox="0 0 240 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      
      {/* White Ergonomic Chair Backrest */}
      <rect x="70" y="55" width="100" height="80" rx="26" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      <rect x="80" y="65" width="80" height="60" rx="16" fill="#F1F5F9" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="3 3" />
      
      {/* Torso - Royal Blue Sweater */}
      <path d="M55 105C55 70 80 62 120 62C160 62 185 70 185 105V150H55V105Z" fill="#2980B9" stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round" />
      
      {/* Neck & Head */}
      <rect x="110" y="38" width="20" height="12" rx="3" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <circle cx="120" cy="28" r="20" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="3.5" />
      
      {/* Brown Hair */}
      <path d="M102 24C102 10 110 4 120 4C130 4 138 10 138 24C138 28 134 32 130 32C126 32 122 28 118 28C114 28 110 32 106 32C104 32 102 28 102 24Z" fill="#A04000" stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round" />

      {/* Left Arm holding Coffee Mug */}
      <path d="M72 90L40 78L36 94" stroke="#2980B9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M72 90L40 78L36 94" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Left Hand & Coffee Mug */}
      <circle cx="36" cy="94" r="7" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <rect x="16" y="82" width="22" height="26" rx="4" fill="#1C2833" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M16 88H8C6 88 5 90 5 92V96C5 98 6 100 8 100H16" stroke="#1A1A1A" strokeWidth="3" fill="none" />

      {/* Steam Lines from Mug */}
      <motion.g
        animate={{ y: [-2, -6, -2], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M20 74C18 70 22 66 20 62" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M27 74C25 70 29 66 27 62" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M34 74C32 70 36 66 34 62" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" fill="none" />
      </motion.g>

      {/* Right Arm Outstretched & Pointing up/right toward right monitor */}
      <path d="M168 90L202 54L218 32" stroke="#2980B9" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M168 90L202 54L218 32" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      
      {/* Right Hand & Index Finger Pointing Right */}
      <circle cx="218" cy="32" r="7" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
      <path d="M218 32L232 14" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
      <path d="M218 32L232 14" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

      {/* Chair Base Stem & Wheel Star Base */}
      <rect x="116" y="132" width="8" height="12" fill="#1A1A1A" />
      <path d="M80 146L120 138L160 146" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
      <circle cx="80" cy="148" r="3" fill="#1A1A1A" />
      <circle cx="120" cy="140" r="3" fill="#1A1A1A" />
      <circle cx="160" cy="148" r="3" fill="#1A1A1A" />
    </svg>
  </div>
);

// --- DESK CLUTTER LEFT: STACK OF BOOKS & STAPLER ---
export const DeskClutterLeft: React.FC = () => (
  <div className="relative flex items-end">
    <svg width="85" height="55" viewBox="0 0 85 55" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="38" width="75" height="14" rx="3" fill="#0D9488" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M15 38V52" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
      <rect x="10" y="22" width="66" height="14" rx="3" fill="#DC2626" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M20 22V36" stroke="#FFFFFF" strokeWidth="2" opacity="0.7" />
      <rect x="7" y="6" width="58" height="14" rx="3" fill="#FEF08A" stroke="#1A1A1A" strokeWidth="3" />
      <path d="M16 6V20" stroke="#1A1A1A" strokeWidth="2" opacity="0.5" />
    </svg>

    <svg width="35" height="25" viewBox="0 0 35 25" fill="none" className="ml-1" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="16" width="30" height="7" rx="2" fill="#1E293B" stroke="#1A1A1A" strokeWidth="2.5" />
      <path d="M4 16L12 6H30V16" fill="#0284C7" stroke="#1A1A1A" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  </div>
);

// --- DESK CLUTTER RIGHT: PEN CUP & TWO POTTED PLANTS ---
export const DeskClutterRight: React.FC = () => (
  <div className="relative flex items-end gap-2">
    <svg width="45" height="50" viewBox="0 0 45 50" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 20L8 5" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M22 20L28 5" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="7" cy="5" r="4" fill="#EF4444" stroke="#1A1A1A" strokeWidth="2" />
      <circle cx="29" cy="5" r="4" fill="#EF4444" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="18" y="8" width="4" height="25" fill="#3B82F6" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="25" y="12" width="5" height="20" fill="#EAB308" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="10" y="24" width="26" height="24" rx="4" fill="#F8FAFC" stroke="#1A1A1A" strokeWidth="3" />
    </svg>

    <div className="relative flex items-end">
      <svg width="130" height="120" viewBox="0 0 130 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M65 85C55 55 35 35 20 25" stroke="#1A1A1A" strokeWidth="3" fill="none" />
        <path d="M65 85C65 50 65 28 65 14" stroke="#1A1A1A" strokeWidth="3" fill="none" />
        <path d="M65 85C75 55 98 40 112 30" stroke="#1A1A1A" strokeWidth="3" fill="none" />
        <path d="M20 25C5 15 0 35 15 48C30 62 44 42 20 25Z" fill="#15803D" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M65 14C45 0 45 28 60 42C75 56 85 28 65 14Z" fill="#16A34A" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M112 30C126 20 118 44 98 54C78 64 92 40 112 30Z" fill="#22C55E" stroke="#1A1A1A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M40 80H90L83 118H47L40 80Z" fill="#D97706" stroke="#1A1A1A" strokeWidth="3.5" strokeLinejoin="round" />
        <rect x="37" y="75" width="56" height="9" rx="3" fill="#B45309" stroke="#1A1A1A" strokeWidth="3" />
      </svg>

      <svg width="55" height="60" viewBox="0 0 55 60" fill="none" className="-ml-6 z-10" xmlns="http://www.w3.org/2000/svg">
        <path d="M28 38C18 24 13 19 8 21C3 23 8 30 18 33C28 36 28 38 28 38Z" fill="#4ADE80" stroke="#1A1A1A" strokeWidth="2.5" />
        <path d="M28 38C38 24 43 19 48 21C53 23 48 30 38 33C28 36 28 38 28 38Z" fill="#22C55E" stroke="#1A1A1A" strokeWidth="2.5" />
        <path d="M28 38C28 19 28 9 28 9C33 14 33 24 28 38Z" fill="#15803D" stroke="#1A1A1A" strokeWidth="2.5" />
        <path d="M16 38H40L36 58H20L16 38Z" fill="#F59E0B" stroke="#1A1A1A" strokeWidth="3" />
      </svg>
    </div>
  </div>
);
