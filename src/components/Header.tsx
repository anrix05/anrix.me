import React from 'react';
import { SITE_CONFIG } from '../data/subdomains';

export const Header: React.FC = () => {
  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <a href="/" className="header-brand" aria-label="Anrix home">
          {/* Visually hidden text for copy/paste & SEO */}
          <span className="sr-only">ANRIX</span>

          {/* Visual lockup: 5x5 pixel monogram 'A' + 'NRIX' forming one unified word */}
          <span className="brand-wordmark-lockup font-pixel" aria-hidden="true">
            <svg
              className="brand-mark"
              viewBox="0 0 5 5"
              fill="currentColor"
              shapeRendering="crispEdges"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M1 0h3v1h1v4h-1v-2h-3v2h-1v-4h1v-1zm0 1h3v1h-3z"
              />
            </svg>
            <span className="brand-wordmark-suffix">NRIX</span>
          </span>
        </a>

        <div className="header-actions">
          <a
            href={SITE_CONFIG.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-link"
            aria-label="GitHub profile (opens in a new tab)"
          >
            <span>GITHUB</span>
            <span className="mono-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
