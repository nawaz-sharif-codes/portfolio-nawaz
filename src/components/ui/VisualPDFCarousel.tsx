import React, { useState, useEffect, useRef } from 'react';
import { ARCHITECTURE_DECK_SLIDES, DeckSlide } from '../../data/architectureDeckSlides';

interface VisualPDFCarouselProps {
  slides?: DeckSlide[];
}

export const VisualPDFCarousel: React.FC<VisualPDFCarouselProps> = ({
  slides = ARCHITECTURE_DECK_SLIDES,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[currentIndex];
  const totalSlides = slides.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  };

  // Keyboard navigation when focused or fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, totalSlides]);

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    setTouchStartX(null);
  };

  // Print / Export PDF Handler
  const handleExportPDF = () => {
    window.print();
  };

  // Render Vector Diagram per Slide Type
  const renderSlideDiagram = (type: DeckSlide['diagramType']) => {
    switch (type) {
      case 'pipeline':
        return (
          <svg
            viewBox="0 0 760 260"
            className="w-full h-auto"
            style={{ width: '100%', height: 'auto', maxHeight: '240px' }}
            aria-label="Identity Migration Architecture Flow"
          >
            <rect width="760" height="260" rx="12" fill="#141413" />
            {/* Grid Pattern */}
            <defs>
              <pattern id="diag-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="760" height="260" fill="url(#diag-grid)" rx="12" />

            {/* Stage 1: Legacy Realm */}
            <g transform="translate(40, 45)">
              <rect width="160" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="14" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">SOURCE STORE</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Sun Directory LDAP</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">ForgeRock AM Realm</text>
            </g>

            {/* Connection Arrow 1 */}
            <line x1="200" y1="82" x2="285" y2="82" stroke="#d97757" strokeWidth="2" strokeDasharray="4 4" />
            <polygon points="285,82 277,77 277,87" fill="#d97757" />
            <text x="242" y="72" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="9.5" textAnchor="middle">1.4M ETL</text>

            {/* Stage 2: Resumable Pipeline */}
            <g transform="translate(285, 45)">
              <rect width="180" height="75" rx="8" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="14" y="24" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">CORE PIPELINE</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Resumable Extractor</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">WAL Checkpointing</text>
            </g>

            {/* Connection Arrow 2 */}
            <line x1="465" y1="82" x2="550" y2="82" stroke="#faf9f5" strokeWidth="2" />
            <polygon points="550,82 542,77 542,87" fill="#faf9f5" />
            <text x="507" y="72" fill="#faf9f5" fontFamily="var(--font-anthropic-mono)" fontSize="9.5" textAnchor="middle">OIDC Bridge</text>

            {/* Stage 3: Live Sync & Target Realm */}
            <g transform="translate(550, 45)">
              <rect width="170" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="14" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">TARGET REALM</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">DAZN IAM Edge</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">OAuth2 & PKCE 7636</text>
            </g>

            {/* Lower Parallel Track: Dual-Write CDC Sync */}
            <g transform="translate(40, 155)">
              <rect width="680" height="65" rx="8" fill="rgba(217, 119, 87, 0.08)" stroke="#d97757" strokeWidth="1" />
              <text x="24" y="26" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">PARALLEL CDC DIRECTORY HOOK</text>
              <text x="24" y="46" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="11.5">
                Live event-driven directory sync hooks forward real-time updates to preserve 100% data consistency
              </text>
            </g>

            {/* Vertical Sync Connectors */}
            <line x1="120" y1="120" x2="120" y2="155" stroke="#87867f" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="635" y1="120" x2="635" y2="155" stroke="#87867f" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
        );

      case 'event-stream':
        return (
          <svg viewBox="0 0 760 260" className="w-full h-auto" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
            <rect width="760" height="260" rx="12" fill="#141413" />
            <g transform="translate(35, 45)">
              <rect width="135" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="12" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">EVENT SOURCE</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Kafka MSK</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Partition Stream</text>
            </g>
            <line x1="170" y1="82" x2="225" y2="82" stroke="#d97757" strokeWidth="2" />
            <polygon points="225,82 217,77 217,87" fill="#d97757" />

            <g transform="translate(225, 45)">
              <rect width="165" height="75" rx="8" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="12" y="24" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10">AWS LAMBDA</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Protobuf Parser</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Idempotent Router</text>
            </g>
            <line x1="390" y1="82" x2="445" y2="82" stroke="#faf9f5" strokeWidth="2" />
            <polygon points="445,82 437,77 437,87" fill="#faf9f5" />

            <g transform="translate(445, 45)">
              <rect width="145" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="12" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">SYNC TARGETS</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">B2B CRM & Ledger</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">DynamoDB Store</text>
            </g>

            {/* DLQ Handler */}
            <g transform="translate(605, 45)">
              <rect width="120" height="75" rx="8" fill="#1e1e1d" stroke="#87867f" strokeWidth="1" strokeDasharray="3 3" />
              <text x="12" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">ISOLATION</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">SQS DLQ</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Alert Telemetry</text>
            </g>

            <g transform="translate(35, 155)">
              <rect width="690" height="65" rx="8" fill="rgba(217, 119, 87, 0.08)" stroke="#d97757" strokeWidth="1" />
              <text x="24" y="26" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">FAILURE ISOLATION & RETRY</text>
              <text x="24" y="46" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="11.5">
                Automated DLQ routing with exponential backoff retries and Coralogix distributed tracing
              </text>
            </g>
          </svg>
        );

      case 'rules-engine':
        return (
          <svg viewBox="0 0 760 260" className="w-full h-auto" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
            <rect width="760" height="260" rx="12" fill="#141413" />
            <g transform="translate(40, 45)">
              <rect width="160" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="12" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">INPUT EVENT</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Soft-Cancel Flow</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">B2B Account Event</text>
            </g>
            <line x1="200" y1="82" x2="285" y2="82" stroke="#d97757" strokeWidth="2" />
            <polygon points="285,82 277,77 277,87" fill="#d97757" />
            <text x="242" y="72" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="9.5" textAnchor="middle">EVALUATE</text>

            <g transform="translate(285, 45)">
              <rect width="190" height="75" rx="8" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="12" y="24" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10">NESTJS EVALUATION</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Segment Rule Engine</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Dynamic Weights Matrix</text>
            </g>
            <line x1="475" y1="82" x2="560" y2="82" stroke="#faf9f5" strokeWidth="2" />
            <polygon points="560,82 552,77 552,87" fill="#faf9f5" />
            <text x="517" y="72" fill="#faf9f5" fontFamily="var(--font-anthropic-mono)" fontSize="9.5" textAnchor="middle">PERSIST</text>

            <g transform="translate(560, 45)">
              <rect width="160" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="12" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">PERSISTENCE</text>
              <text x="12" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">DynamoDB Rules</text>
              <text x="12" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Hot-Reload Policy</text>
            </g>

            <g transform="translate(40, 155)">
              <rect width="680" height="65" rx="8" fill="rgba(217, 119, 87, 0.08)" stroke="#d97757" strokeWidth="1" />
              <text x="24" y="26" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">DYNAMIC CONFIGURATION</text>
              <text x="24" y="46" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="11.5">
                Offers and segmentation rules matched dynamically without requiring redeployment or downtime
              </text>
            </g>
          </svg>
        );

      case 'multi-agent':
        return (
          <svg viewBox="0 0 760 260" className="w-full h-auto" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
            <rect width="760" height="260" rx="12" fill="#141413" />
            <g transform="translate(30, 45)">
              <rect width="114" height="65" rx="6" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="10" y="22" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="9">AGENT 1</text>
              <text x="10" y="40" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="12" fontWeight="600">Doc Parser</text>
              <text x="10" y="54" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="10">PDF/DOCX Extr.</text>
            </g>
            <line x1="144" y1="77" x2="174" y2="77" stroke="#d97757" strokeWidth="1.5" />

            <g transform="translate(174, 45)">
              <rect width="114" height="65" rx="6" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="10" y="22" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="9">AGENT 2</text>
              <text x="10" y="40" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="12" fontWeight="600">Gap Analyzer</text>
              <text x="10" y="54" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="10">JD Match Score</text>
            </g>
            <line x1="288" y1="77" x2="318" y2="77" stroke="#d97757" strokeWidth="1.5" />

            <g transform="translate(318, 45)">
              <rect width="114" height="65" rx="6" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="10" y="22" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="9">AGENT 3</text>
              <text x="10" y="40" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="12" fontWeight="600">Bullet Rewriter</text>
              <text x="10" y="54" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="10">LLM Router</text>
            </g>
            <line x1="432" y1="77" x2="462" y2="77" stroke="#faf9f5" strokeWidth="1.5" />

            <g transform="translate(462, 45)">
              <rect width="114" height="65" rx="6" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="10" y="22" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="9">AGENT 4 & 5</text>
              <text x="10" y="40" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="12" fontWeight="600">Prep & Letters</text>
              <text x="10" y="54" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="10">Tailored Out</text>
            </g>
            <line x1="576" y1="77" x2="606" y2="77" stroke="#d97757" strokeWidth="1.5" />

            <g transform="translate(606, 45)">
              <rect width="124" height="65" rx="6" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="10" y="22" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="9">DELIVERY</text>
              <text x="10" y="40" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="12" fontWeight="600">SSE Stream</text>
              <text x="10" y="54" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="10">Sub-sec Latency</text>
            </g>

            <g transform="translate(40, 155)">
              <rect width="680" height="65" rx="8" fill="rgba(217, 119, 87, 0.08)" stroke="#d97757" strokeWidth="1" />
              <text x="24" y="26" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">COST & QUALITY OPTIMIZER</text>
              <text x="24" y="46" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="11.5">
                Dynamic load routing balances high-capability and low-cost provider tiers per request stage
              </text>
            </g>
          </svg>
        );

      case 'distributed-mesh':
      default:
        return (
          <svg viewBox="0 0 760 260" className="w-full h-auto" style={{ width: '100%', height: 'auto', maxHeight: '240px' }}>
            <rect width="760" height="260" rx="12" fill="#141413" />
            <g transform="translate(40, 45)">
              <rect width="160" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="14" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">EDGE LAYER</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">API Gateway</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Token Rate Limiting</text>
            </g>
            <line x1="200" y1="82" x2="285" y2="82" stroke="#d97757" strokeWidth="2" />
            <polygon points="285,82 277,77 277,87" fill="#d97757" />

            <g transform="translate(285, 45)">
              <rect width="190" height="75" rx="8" fill="#1e1e1d" stroke="#d97757" strokeWidth="1.5" />
              <text x="14" y="24" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10">CORE SERVICES</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Microservice Mesh</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">Circuit Breakers & Retries</text>
            </g>
            <line x1="475" y1="82" x2="560" y2="82" stroke="#faf9f5" strokeWidth="2" />
            <polygon points="560,82 552,77 552,87" fill="#faf9f5" />

            <g transform="translate(560, 45)">
              <rect width="160" height="75" rx="8" fill="#1e1e1d" stroke="#3d3d3a" strokeWidth="1" />
              <text x="14" y="24" fill="#87867f" fontFamily="var(--font-anthropic-mono)" fontSize="10">OBSERVABILITY</text>
              <text x="14" y="44" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="13" fontWeight="600">Coralogix & Traces</text>
              <text x="14" y="60" fill="#b0aea5" fontFamily="var(--font-anthropic-sans)" fontSize="11">CloudWatch Telemetry</text>
            </g>

            <g transform="translate(40, 155)">
              <rect width="680" height="65" rx="8" fill="rgba(217, 119, 87, 0.08)" stroke="#d97757" strokeWidth="1" />
              <text x="24" y="26" fill="#d97757" fontFamily="var(--font-anthropic-mono)" fontSize="10" fontWeight="600">DISTRIBUTED CONTEXT PROPAGATION</text>
              <text x="24" y="46" fill="#faf9f5" fontFamily="var(--font-anthropic-sans)" fontSize="11.5">
                Standardized correlation IDs injected at API Gateway propagate across the full microservice mesh
              </text>
            </g>
          </svg>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Visual PDF Architecture Carousel"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
        outline: 'none',
      }}
    >
      {/* Editorial Slide Stage Card */}
      <div
        style={{
          backgroundColor: 'var(--color-ivory-light)',
          borderRadius: 'var(--radius-3xl)',
          border: '1px solid var(--color-stone)',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(20, 20, 19, 0.04)',
          transition: 'box-shadow var(--duration-normal) var(--ease-editorial)',
        }}
      >
        {/* Slide Header Toolbar */}
        <div
          style={{
            padding: 'var(--spacing-16) var(--spacing-24)',
            borderBottom: '1px solid var(--color-stone)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--spacing-12)',
            backgroundColor: 'var(--color-ivory-medium)',
          }}
        >
          {/* Slide metadata & category badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)' }}>
            <span
              style={{
                fontFamily: 'var(--font-anthropic-mono)',
                fontSize: 'var(--text-caption)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-slate-dark)',
                backgroundColor: 'var(--color-ivory-light)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid var(--color-stone)',
              }}
            >
              SLIDE {currentSlide.slideNumber} / 0{totalSlides}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-caption)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-cloud-dark)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {currentSlide.category}
            </span>
          </div>

          {/* Controls: Fullscreen Inspection & PDF Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
            <button
              onClick={() => setIsFullscreen(true)}
              aria-label="Inspect Slide in Fullscreen"
              style={{
                background: 'transparent',
                border: '1px solid var(--color-cloud-dark)',
                borderRadius: '8px',
                padding: '6px 12px',
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: '12px',
                color: 'var(--color-slate-dark)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color var(--duration-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-oat-warm)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              Fullscreen
            </button>
            <button
              onClick={handleExportPDF}
              aria-label="Export Architecture Slides as PDF"
              style={{
                background: 'var(--color-clay)',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 14px',
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: '12px',
                fontWeight: 'var(--font-weight-medium)',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background-color var(--duration-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-clay-deep)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-clay)')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
              </svg>
              PDF Deck
            </button>
          </div>
        </div>

        {/* Main Slide Presentation Viewport */}
        <div style={{ padding: 'clamp(24px, 4vw, 40px)' }}>
          {/* Slide Heading & Narrative */}
          <div style={{ marginBottom: 'var(--spacing-24)' }}>
            <h3
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 'var(--font-weight-bold)',
                color: 'var(--color-slate-dark)',
                letterSpacing: 'var(--tracking-heading)',
                margin: '0 0 var(--spacing-8) 0',
                lineHeight: 1.2,
              }}
            >
              {currentSlide.title}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-body-sm)',
                color: 'var(--color-slate-medium)',
                lineHeight: 1.5,
                margin: 0,
                maxWidth: '780px',
              }}
            >
              {currentSlide.subtitle}
            </p>
          </div>

          {/* Architectural Vector Canvas */}
          <div
            style={{
              backgroundColor: '#141413',
              borderRadius: '16px',
              padding: 'var(--spacing-16)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: 'inset 0 2px 10px rgba(0, 0, 0, 0.5)',
              marginBottom: 'var(--spacing-24)',
            }}
          >
            {renderSlideDiagram(currentSlide.diagramType)}
          </div>

          {/* Slide Architectural Takeaways & Highlights */}
          <div
            className="carousel-takeaways-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--spacing-24)',
              backgroundColor: 'var(--color-oat-warm)',
              padding: 'var(--spacing-24)',
              borderRadius: '16px',
              border: '1px solid var(--color-stone)',
            }}
          >
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-slate-dark)',
                  letterSpacing: '0.05em',
                  margin: '0 0 var(--spacing-12) 0',
                }}
              >
                Engineering Highlights
              </h4>
              <ul style={{ margin: 0, paddingLeft: 'var(--spacing-16)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {currentSlide.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-anthropic-sans)',
                      fontSize: '13px',
                      color: 'var(--color-slate-dark)',
                      lineHeight: 1.4,
                    }}
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--color-clay)',
                  letterSpacing: '0.05em',
                  margin: '0 0 var(--spacing-12) 0',
                }}
              >
                Architectural Takeaway
              </h4>
              <p
                style={{
                  fontFamily: 'var(--font-anthropic-serif)',
                  fontSize: '15px',
                  lineHeight: 1.5,
                  color: 'var(--color-slate-dark)',
                  margin: 0,
                }}
              >
                "{currentSlide.takeaway}"
              </p>
            </div>
          </div>
        </div>

        {/* Carousel Bottom Controls & Pagination Track */}
        <div
          style={{
            padding: 'var(--spacing-16) var(--spacing-24)',
            borderTop: '1px solid var(--color-stone)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--spacing-16)',
            backgroundColor: 'var(--color-ivory-medium)',
          }}
        >
          {/* Previous / Next Arrow Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-8)' }}>
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-stone)',
                color: 'var(--color-slate-dark)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color var(--duration-fast) var(--ease-editorial), transform var(--duration-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-oat-warm)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-ivory-light)')}
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-ivory-light)',
                border: '1px solid var(--color-stone)',
                color: 'var(--color-slate-dark)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color var(--duration-fast) var(--ease-editorial), transform var(--duration-fast) var(--ease-editorial)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-oat-warm)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-ivory-light)')}
            >
              →
            </button>
          </div>

          {/* Slide Quick-Jump Pill Tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {slides.map((s, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}: ${s.title}`}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-clay)' : 'var(--color-stone)',
                    backgroundColor: isActive ? 'var(--color-clay)' : 'var(--color-ivory-light)',
                    color: isActive ? '#ffffff' : 'var(--color-slate-dark)',
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '12px',
                    fontWeight: isActive ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all var(--duration-fast) var(--ease-editorial)',
                  }}
                >
                  {s.slideNumber}
                </button>
              );
            })}
          </div>

          {/* Keyboard Hint */}
          <div
            style={{
              fontFamily: 'var(--font-anthropic-mono)',
              fontSize: '11px',
              color: 'var(--color-cloud-dark)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>Use keys:</span>
            <kbd style={{ padding: '2px 6px', background: 'var(--color-ivory-light)', border: '1px solid var(--color-stone)', borderRadius: '4px' }}>←</kbd>
            <kbd style={{ padding: '2px 6px', background: 'var(--color-ivory-light)', border: '1px solid var(--color-stone)', borderRadius: '4px' }}>→</kbd>
          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Inspection Modal */}
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            backgroundColor: 'rgba(20, 20, 19, 0.96)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--spacing-24)',
            overflowY: 'auto',
          }}
          onClick={() => setIsFullscreen(false)}
        >
          {/* Modal Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--spacing-24)',
              color: '#ffffff',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span style={{ fontFamily: 'var(--font-anthropic-mono)', fontSize: '12px', color: 'var(--color-clay)', textTransform: 'uppercase' }}>
                FULLSCREEN ARCHITECTURE INSPECTION • SLIDE {currentSlide.slideNumber} / 0{totalSlides}
              </span>
              <h2 style={{ fontFamily: 'var(--font-anthropic-serif)', fontSize: '24px', margin: '4px 0 0 0', color: '#ffffff' }}>
                {currentSlide.title}
              </h2>
            </div>
            <button
              onClick={() => setIsFullscreen(false)}
              aria-label="Close Fullscreen View"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: '13px',
              }}
            >
              Close ✕
            </button>
          </div>

          {/* Modal Big Diagram Stage */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#141413',
              borderRadius: '20px',
              padding: 'var(--spacing-32)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {renderSlideDiagram(currentSlide.diagramType)}
          </div>

          {/* Modal Bottom Controls */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'var(--spacing-16)',
              marginTop: 'var(--spacing-24)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevSlide}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              ← Previous Slide
            </button>
            <button
              onClick={nextSlide}
              style={{
                padding: '10px 24px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-clay)',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
              }}
            >
              Next Slide →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
