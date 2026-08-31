import React, { useState, useEffect, useCallback } from 'react';

interface GreetingItem {
  text: string;
  lang: string;
  code: string;
  isName?: boolean;
}

const GREETINGS: GreetingItem[] = [
  { text: 'Hello', lang: 'English', code: 'EN' },
  { text: 'नमस्ते', lang: 'Hindi', code: 'HI' },
  { text: 'నమస్తే', lang: 'Telugu', code: 'TE' },
  { text: 'Bonjour', lang: 'French', code: 'FR' },
  { text: 'Hola', lang: 'Spanish', code: 'ES' },
  { text: 'こんにちは', lang: 'Japanese', code: 'JA' },
  { text: 'مرحباً', lang: 'Arabic', code: 'AR' },
  { text: 'NAWAZ SHARIF', lang: 'Software Engineer @ DAZN', code: 'DAZN', isName: true },
];

interface GreetingScreenProps {
  onComplete?: () => void;
}

export const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isNetflixZooming, setIsNetflixZooming] = useState(false);
  const [shouldRender, setShouldRender] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('greet')) return true;
      return sessionStorage.getItem('hasSeenGreeting') !== 'true';
    } catch {
      return false;
    }
  });

  const completeGreeting = useCallback(() => {
    try {
      sessionStorage.setItem('hasSeenGreeting', 'true');
    } catch {}
    setIsNetflixZooming(true);
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 900);
  }, [onComplete]);

  useEffect(() => {
    // Check if greeting has already run in this window session
    const urlParams = new URLSearchParams(window.location.search);
    const forceGreeting = urlParams.has('greet');
    
    let hasSeen = false;
    try {
      hasSeen = sessionStorage.getItem('hasSeenGreeting') === 'true';
    } catch {}

    if (hasSeen && !forceGreeting) {
      setShouldRender(false);
      return;
    }

    setShouldRender(true);

    // Keyboard listener: Press Escape to skip, ArrowRight to step during preview
    const handleKeyDown = (e: KeyboardEvent) => {
      const urlParams = new URLSearchParams(window.location.search);
      const isPreview = urlParams.get('greet') === 'preview';

      if (e.key === 'Escape') {
        completeGreeting();
      } else if (isPreview && (e.key === 'ArrowRight' || e.key === ' ')) {
        e.preventDefault();
        setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [completeGreeting]);

  // Stepping through the greeting languages
  useEffect(() => {
    if (!shouldRender || isExiting) return;

    const urlParams = new URLSearchParams(window.location.search);
    const isPreview = urlParams.get('greet') === 'preview';
    if (isPreview) {
      setShouldRender(true);
      return;
    }

    const isLastName = currentIndex === GREETINGS.length - 1;
    // Step timing: ~280ms for international greetings
    // When reaching Nawaz Sharif card: pause for 1000ms then trigger Netflix zoom
    const duration = isLastName ? 1100 : 280;

    const timer = setTimeout(() => {
      if (isLastName) {
        setIsNetflixZooming(true);
        setTimeout(() => {
          completeGreeting();
        }, 150);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, shouldRender, isExiting, completeGreeting]);

  if (!shouldRender) return null;

  const currentGreeting = GREETINGS[currentIndex];
  const isLastName = currentGreeting.isName;

  return (
    <div
      id="editorial-greeting-curtain"
      role="dialog"
      aria-label="Welcome greeting sequence"
      aria-modal="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#000000',
        color: '#faf9f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        cursor: 'pointer',
        perspective: '1200px',
        transition: 'opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: isExiting ? 0 : 1,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
      onClick={() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('greet') === 'preview') {
          setCurrentIndex((prev) => (prev + 1) % GREETINGS.length);
        } else {
          completeGreeting();
        }
      }}
    >
      {/* Background Pure Black Deep Stage with Soft Focus Light */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 50%, rgba(217, 119, 87, 0.14) 0%, rgba(0, 0, 0, 0.95) 55%, #000000 100%)',
          pointerEvents: 'none',
          transition: 'opacity 0.6s ease',
          opacity: isNetflixZooming ? 0.3 : 1,
        }}
      />

      {/* Top Bar: Editorial Index & Skip Action */}
      <div
        style={{
          position: 'absolute',
          top: '32px',
          left: '32px',
          right: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-anthropic-mono)',
          fontSize: '11px',
          color: '#87867f',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'opacity 0.3s ease',
          opacity: isNetflixZooming ? 0 : 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#d97757',
              boxShadow: '0 0 8px rgba(217, 119, 87, 0.8)',
              animation: 'beaconPulse 1.6s infinite ease-in-out',
            }}
          />
          <span style={{ color: '#cccbc8', fontWeight: 600 }}>SYSTEM BOOT</span>
          <span>/</span>
          <span>{currentGreeting.code}</span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            completeGreeting();
          }}
          aria-label="Skip introduction"
          style={{
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            color: '#faf9f5',
            fontFamily: 'var(--font-anthropic-mono)',
            fontSize: '10.5px',
            padding: '6px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            letterSpacing: '0.06em',
            transition: 'background-color 0.2s ease, border-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(217, 119, 87, 0.18)';
            e.currentTarget.style.borderColor = 'rgba(217, 119, 87, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
          }}
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Center Stage: Typographic Greeting OR Full Nawaz Signature Card */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: '900px',
          transformStyle: 'preserve-3d',
        }}
      >
        {!isLastName ? (
          /* Multilingual Text Greetings */
          <>
            <div
              key={currentIndex}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                justifyContent: 'center',
                gap: '12px',
                animation: 'wordSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              }}
            >
              <h1
                style={{
                  fontFamily: 'var(--font-anthropic-serif)',
                  fontSize: 'clamp(46px, 8vw, 88px)',
                  fontWeight: 400,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                  color: '#faf9f5',
                  margin: 0,
                  padding: 0,
                  textRendering: 'optimizeLegibility',
                }}
              >
                {currentGreeting.text}
              </h1>

              {/* Terracotta Clay Accent Dot */}
              <span
                style={{
                  display: 'inline-block',
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  backgroundColor: '#d97757',
                  boxShadow: '0 0 16px rgba(217, 119, 87, 0.8)',
                  transform: 'translateY(-2px)',
                }}
              />
            </div>

            {/* Subtitle / Language Metadata */}
            <div
              key={`sub-${currentIndex}`}
              style={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                animation: 'metaFadeIn 0.25s ease-out forwards',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '12px',
                  letterSpacing: '0.06em',
                  color: '#87867f',
                }}
              >
                {currentGreeting.lang}
              </span>
            </div>
          </>
        ) : (
          /* Final Step: Nawaz Signature Card with Netflix Zoom Motion */
          <div
            className="greeting-nawaz-card-wrapper"
            style={{
              animation: isNetflixZooming
                ? 'netflixCardZoom 0.9s cubic-bezier(0.2, 0, 0.1, 1) forwards'
                : 'cardSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d',
            }}
          >
            <div
              style={{
                position: 'relative',
                width: '320px',
                padding: '32px 24px',
                borderRadius: '24px',
                backgroundColor: 'rgba(18, 18, 17, 0.95)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 24px 60px -12px rgba(0, 0, 0, 0.8), 0 0 40px rgba(217, 119, 87, 0.2)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Card Top: Arched NAWAZ SHARIF in Header Font */}
              <div
                style={{
                  position: 'relative',
                  width: '240px',
                  height: '210px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* SVG Arched Text "NAWAZ SHARIF" in Header Display Sans Font */}
                <svg
                  viewBox="0 0 300 240"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    overflow: 'visible',
                    zIndex: 10,
                  }}
                >
                  <defs>
                    <path
                      id="greeting-card-curve"
                      d="M 30,140 A 120,120 0 0,1 270,140"
                      fill="transparent"
                    />
                  </defs>

                  <text
                    fill="#faf9f5"
                    style={{
                      fontFamily: 'var(--font-anthropic-display-sans)',
                      fontSize: '26px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      textShadow: '0 2px 12px rgba(0, 0, 0, 0.9)',
                    }}
                  >
                    <textPath
                      href="#greeting-card-curve"
                      startOffset="50%"
                      textAnchor="middle"
                    >
                      NAWAZ SHARIF
                    </textPath>
                  </text>
                </svg>

                {/* Terracotta / Coral Circle Badge */}
                <div
                  style={{
                    position: 'relative',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    backgroundColor: '#d97757',
                    boxShadow: '0 10px 30px rgba(217, 119, 87, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    marginTop: '32px',
                  }}
                >
                  <img
                    src="/nawaz-headshot.jpg"
                    alt="Nawaz Sharif"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center 20%',
                    }}
                  />
                </div>
              </div>

              {/* Subtitle / Role */}
              <div
                style={{
                  marginTop: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-anthropic-sans)',
                    fontSize: '15px',
                    fontWeight: 500,
                    color: '#faf9f5',
                    letterSpacing: '-0.01em',
                  }}
                >
                  software engineer @ DAZN
                </p>
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    color: '#d97757',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Backend & Systems Architecture
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Progress Track */}
      <div
        style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '180px',
          height: '2px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
          transition: 'opacity 0.3s ease',
          opacity: isNetflixZooming ? 0 : 1,
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: '#d97757',
            width: `${((currentIndex + 1) / GREETINGS.length) * 100}%`,
            transition: 'width 0.22s ease-out',
            boxShadow: '0 0 8px #d97757',
          }}
        />
      </div>

      {/* Embedded Motion Styles */}
      <style>{`
        @keyframes wordSlideIn {
          0% {
            opacity: 0;
            transform: translateY(22px) scale(0.96);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes cardSlideUp {
          0% {
            opacity: 0;
            transform: translateY(32px) scale(0.92);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        @keyframes netflixCardZoom {
          0% {
            transform: scale(1) translateZ(0);
            opacity: 1;
            filter: blur(0px);
          }
          25% {
            transform: scale(1.18) translateZ(80px);
            opacity: 1;
            filter: blur(0px);
          }
          65% {
            transform: scale(4.5) translateZ(450px);
            opacity: 0.85;
            filter: blur(4px);
          }
          100% {
            transform: scale(22) translateZ(950px);
            opacity: 0;
            filter: blur(16px);
          }
        }

        @keyframes metaFadeIn {
          0% {
            opacity: 0;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes beaconPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(0.85);
          }
        }
      `}</style>
    </div>
  );
};
