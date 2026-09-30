import React from 'react';
import { SUBDOMAINS, getSubdomainsLabel } from '../data/subdomains';
import { SITE_INTRO } from '../data/site';

export const Intro: React.FC = () => {
  const metaLabel = getSubdomainsLabel(SUBDOMAINS.length);

  return (
    <section className="intro-block" aria-labelledby="intro-headline">
      <div className="intro-inner">
        <p className="intro-meta mono-text">{metaLabel}</p>

        <h1 id="intro-headline" className="intro-headline display-font">
          <span className="intro-line intro-line-1">
            <span className="intro-greeting">{SITE_INTRO.greeting}</span>{' '}
            <span className="intro-name">{SITE_INTRO.name}</span>{' '}
            <span className="intro-handle font-pixel">{SITE_INTRO.handle}</span>
          </span>{' '}
          <span className="intro-line intro-line-2">
            <span className="intro-lead">{SITE_INTRO.roleLead}</span>{' '}
            <span className="intro-role">{SITE_INTRO.role}</span>{' '}
            <span className="intro-verb">{SITE_INTRO.verb}</span>{' '}
            <span className="intro-work">{SITE_INTRO.work}</span>
          </span>
        </h1>

        <p className="intro-closing mono-text intro-line-3">
          {SITE_INTRO.closing}
        </p>
      </div>
    </section>
  );
};

export default Intro;
