import React from 'react';
import { VisualPDFCarousel } from '../ui/VisualPDFCarousel';

export const ArchitectureDeckSection: React.FC = () => {
  return (
    <section
      id="architecture-decks"
      aria-label="Visual Architecture & System Decks"
      style={{
        scrollMarginTop: '76px',
        paddingTop: 'clamp(32px, 6vw, 64px)',
        paddingBottom: 'clamp(48px, 8vw, 96px)',
        borderBottom: '1px solid var(--color-stone)',
        backgroundColor: 'var(--color-ivory-medium)',
      }}
    >
      <div className="site-container">
        {/* Section Header */}
        <div style={{ marginBottom: 'var(--spacing-32)' }}>
          <span
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: 'var(--text-caption)',
              fontWeight: 'var(--font-weight-semibold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-cloud-dark)',
              display: 'block',
              marginBottom: 'var(--spacing-8)',
            }}
          >
            Visual Architecture Decks
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: '24px',
              fontWeight: 'var(--font-weight-bold)',
              letterSpacing: 'var(--tracking-heading)',
              color: 'var(--color-slate-dark)',
              margin: '0 0 var(--spacing-8) 0',
            }}
          >
            System Blueprints & Technical Decks
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: 'var(--text-body-sm)',
              color: 'var(--color-slate-medium)',
              margin: 0,
              maxWidth: '680px',
            }}
          >
            Interactive visual slides exploring distributed pipelines, event streaming topologies, and high-concurrency cloud architecture.
          </p>
        </div>

        {/* Visual PDF Carousel Component */}
        <VisualPDFCarousel />
      </div>
    </section>
  );
};
