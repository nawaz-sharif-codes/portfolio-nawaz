import React from 'react';

interface HeroSectionProps {
  onScaleClick?: (e: React.MouseEvent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScaleClick,
}) => {
  const handleScaleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onScaleClick) {
      onScaleClick(e);
      return;
    }
    e.preventDefault();
    const provenanceEl = document.getElementById('provenance');
    if (provenanceEl) {
      provenanceEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      aria-label="Introduction"
      style={{
        paddingTop: 'clamp(64px, 8vw, 112px)',
        paddingBottom: 'clamp(56px, 7vw, 96px)',
        borderBottom: '1px solid var(--color-stone)',
      }}
    >
      <div className="site-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(32px, 5vw, 88px)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left Column: Anthropic Display Sans Bold Headline */}
          <div style={{ maxWidth: '620px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-anthropic-display-sans)',
                fontSize: 'clamp(38px, 5.2vw, 62px)',
                fontWeight: 'var(--font-weight-bold)',
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--color-slate-dark)',
              }}
            >
              I build{' '}
              <span
                style={{
                  textDecoration: 'underline',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}
              >
                backend
              </span>{' '}
              systems that don't fall over at any{' '}
              <a
                href="#provenance"
                onClick={handleScaleClick}
                className="inline-link"
                style={{
                  color: 'var(--color-slate-dark)',
                  textDecoration: 'underline',
                  textDecorationThickness: '3px',
                  textUnderlineOffset: '6px',
                }}
              >
                scale
              </a>
              .
            </h1>
          </div>

          {/* Right Column: Anthropic Serif Supporting Narrative (Vertically Centered) */}
          <div
            style={{
              maxWidth: '480px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(18px, 1.7vw, 21px)',
                lineHeight: 1.48,
                fontWeight: 'var(--font-weight-regular)',
                color: 'var(--color-slate-dark)',
              }}
            >
              Backend Engineer specialized in architecting scalable, distributed systems for high-concurrency environments, delivering real-time streaming solutions to millions of global users.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .hero-grid {
            grid-template-columns: 1.22fr 0.78fr !important;
            align-items: center !important;
          }
        }
      `}</style>
    </section>
  );
};
