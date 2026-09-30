import React from 'react';
import { SubdomainItem } from '../data/subdomains';

interface SubdomainRowProps {
  item: SubdomainItem;
  staggerIndex: number;
  isHovered: boolean;
  hasActiveHover: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  rowRef: (el: HTMLAnchorElement | null) => void;
}

export const SubdomainRow: React.FC<SubdomainRowProps> = ({
  item,
  staggerIndex,
  isHovered,
  hasActiveHover,
  onHoverStart,
  onHoverEnd,
  rowRef
}) => {
  const cleanUrl = item.url.replace(/^https?:\/\//, '');
  const isDimmed = hasActiveHover && !isHovered;

  return (
    <li className="subdomain-item" role="listitem">
      <a
        ref={rowRef}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`subdomain-row ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
        style={{
          '--accent-color': item.accent,
          '--stagger-delay': `${staggerIndex * 80}ms`
        } as React.CSSProperties}
        aria-label={`Open ${item.name} at ${cleanUrl}, new tab`}
        onMouseEnter={onHoverStart}
        onMouseOver={onHoverStart}
        onMouseLeave={onHoverEnd}
        onMouseOut={onHoverEnd}
        onFocus={onHoverStart}
        onBlur={onHoverEnd}
      >
        {/* Top metadata line: 01, Category, Status with 6px dot */}
        <div className="row-top mono-text">
          <div className="row-meta-left">
            <span className="row-index">{item.index || String(staggerIndex + 1).padStart(2, '0')}</span>
            <span className="row-category">{item.category}</span>
          </div>

          <div className="row-status">
            <span
              className={`status-dot ${item.isActive ? 'pulse' : ''}`}
              style={{ backgroundColor: item.accent }}
              aria-hidden="true"
            />
            <span className="status-label">{item.status}</span>
          </div>
        </div>

        {/* Monumental Name & Thin Stroke 48px Arrow sharing baseline */}
        <div className="row-middle">
          <span className="row-name display-font">{item.name}</span>
          <span className="row-arrow" aria-hidden="true">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow-svg"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>

        {/* Bottom line: Description on left, mono URL on right */}
        <div className="row-bottom">
          <p className="row-description muted-text">{item.description}</p>
          <span className="row-url mono-text">{cleanUrl}</span>
        </div>
      </a>
    </li>
  );
};

export default SubdomainRow;
