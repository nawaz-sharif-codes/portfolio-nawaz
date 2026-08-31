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
  { text: 'Nawaz Sharif', lang: 'Software Engineer @ DAZN', code: 'DAZN', isName: true },
];

interface GreetingScreenProps {
  onComplete?: () => void;
}

export const GreetingScreen: React.FC<GreetingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
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
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      onComplete?.();
    }, 750);
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

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion && !forceGreeting) {
      try {
        sessionStorage.setItem('hasSeenGreeting', 'true');
      } catch {}
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
    // Step timing: ~280ms for international greetings, ~950ms for Nawaz signature resolution
    const duration = isLastName ? 950 : 280;

    const timer = setTimeout(() => {
      if (isLastName) {
        completeGreeting();
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [currentIndex, shouldRender, isExiting, completeGreeting]);

  if (!shouldRender) return null;

  const currentGreeting = GREETINGS[currentIndex];

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
        transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
        transform: isExiting ? 'translateY(-100%)' : 'translateY(0)',
        opacity: isExiting ? 0.98 : 1,
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
            'radial-gradient(circle at 50% 50%, rgba(217, 119, 87, 0.09) 0%, rgba(0, 0, 0, 0.95) 60%, #000000 100%)',
          pointerEvents: 'none',
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

      {/* Center Stage: Typographic Greeting Reveal */}
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
        }}
      >
        {/* Animated Word Container */}
        <div
          key={currentIndex}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'center',
            gap: '12px',
            animation: currentGreeting.isName
              ? 'nameReveal 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              : 'wordSlideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <h1
            style={{
              fontFamily: currentGreeting.isName
                ? 'var(--font-anthropic-sans)'
                : 'var(--font-anthropic-serif)',
              fontSize: currentGreeting.isName
                ? 'clamp(38px, 6vw, 68px)'
                : 'clamp(46px, 8vw, 88px)',
              fontWeight: currentGreeting.isName ? 700 : 400,
              letterSpacing: currentGreeting.isName ? '-0.02em' : '-0.01em',
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
              width: currentGreeting.isName ? '12px' : '14px',
              height: currentGreeting.isName ? '12px' : '14px',
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
              color: '#87867f',
              letterSpacing: '0.04em',
            }}
          >
            {currentGreeting.lang}
          </span>
        </div>
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

        @keyframes nameReveal {
          0% {
            opacity: 0;
            transform: translateY(28px) scale(0.94);
            filter: blur(6px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
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
            transform: scale(0.75);
          }
        }
      `}</style>
    </div>
  );
};
