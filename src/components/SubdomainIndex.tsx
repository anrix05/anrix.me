import React, { useState, useEffect, useRef } from 'react';
import { SUBDOMAINS } from '../data/subdomains';
import { SubdomainRow } from './SubdomainRow';

interface SubdomainIndexProps {
  onHoverAccentChange: (accent: string | null) => void;
}

export const SubdomainIndex: React.FC<SubdomainIndexProps> = ({ onHoverAccentChange }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleHoverStart = (id: string, accent: string) => {
    setHoveredId(id);
    onHoverAccentChange(accent);
  };

  const handleHoverEnd = () => {
    setHoveredId(null);
    onHoverAccentChange(null);
  };

  // Keyboard navigation: 1, 2, 3 to open; ArrowUp / ArrowDown to move focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input/textarea if any were present
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Dynamic keyboard navigation: keys 1 to 9 open matching site
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= SUBDOMAINS.length && num <= 9) {
        const index = num - 1;
        if (SUBDOMAINS[index]) {
          e.preventDefault();
          window.open(SUBDOMAINS[index].url, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      // ArrowUp / ArrowDown navigation
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const activeEl = document.activeElement;
        const currentIndex = rowRefs.current.findIndex((el) => el === activeEl);

        let nextIndex = 0;
        if (currentIndex === -1) {
          nextIndex = e.key === 'ArrowDown' ? 0 : SUBDOMAINS.length - 1;
        } else if (e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % SUBDOMAINS.length;
        } else {
          nextIndex = (currentIndex - 1 + SUBDOMAINS.length) % SUBDOMAINS.length;
        }

        e.preventDefault();
        rowRefs.current[nextIndex]?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="subdomain-index-section" aria-label="Subdomain Index">
      {/* Visually hidden h2 for proper document outline accessibility */}
      <h2 className="sr-only">Subdomains</h2>

      <ul className="subdomain-list" role="list">
        {SUBDOMAINS.map((item, idx) => (
          <SubdomainRow
            key={item.id}
            item={item}
            staggerIndex={idx}
            isHovered={hoveredId === item.id}
            hasActiveHover={hoveredId !== null}
            onHoverStart={() => handleHoverStart(item.id, item.accent)}
            onHoverEnd={handleHoverEnd}
            rowRef={(el) => {
              rowRefs.current[idx] = el;
            }}
          />
        ))}
      </ul>
    </section>
  );
};

export default SubdomainIndex;
