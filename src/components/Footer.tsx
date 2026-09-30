import React from 'react';
import { SITE_CONFIG } from '../data/subdomains';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-inner">
        <span className="footer-copyright muted-text">
          &copy; {SITE_CONFIG.brand}
        </span>
        <span className="footer-domain mono-text">
          {SITE_CONFIG.domain.toUpperCase()}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
