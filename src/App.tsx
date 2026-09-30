import React, { useState } from 'react';
import Header from './components/Header';
import Intro from './components/Intro';
import SubdomainIndex from './components/SubdomainIndex';
import Footer from './components/Footer';

export const App: React.FC = () => {
  const [hoveredAccent, setHoveredAccent] = useState<string | null>(null);

  return (
    <div
      className="page-wrapper"
      style={{
        '--glow-color': hoveredAccent || 'transparent'
      } as React.CSSProperties}
    >
      {/* 600px soft radial glow backdrop (8% opacity, 400ms transition) */}
      <div
        className={`bg-glow-layer ${hoveredAccent ? 'is-active' : ''}`}
        aria-hidden="true"
      />

      <div className="content-container">
        <Header />
        <main id="main-content" className="site-main" role="main">
          <Intro />
          <SubdomainIndex onHoverAccentChange={setHoveredAccent} />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
