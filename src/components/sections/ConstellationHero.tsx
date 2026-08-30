import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  Key,
  Layers,
  Radio,
  Globe,
  Lock,
  Database,
  UserCheck,
  FileCode,
  ShieldCheck,
  KeyRound,
  RotateCcw,
  Cpu,
  BookmarkCheck,
  Users,
  CheckCheck,
  Webhook,
  RefreshCw,
  Zap,
  Network,
  LucideIcon,
} from 'lucide-react';
import { Button } from '../ui/Button';

interface ConstellationHeroProps {
  onViewCaseStudy?: (slug: string) => void;
}

interface NodeItem {
  id: string;
  label: string;
  sublabel?: string;
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
  hubId: string;
  type: 'hub' | 'satellite';
  tag?: string;
  icon: LucideIcon;
}

interface HubItem {
  id: string;
  title: string;
  x: number;
  y: number;
  icon: LucideIcon;
}

export const ConstellationHero: React.FC<ConstellationHeroProps> = ({
  onViewCaseStudy,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [animTime, setAnimTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // System Hubs positioned around the perimeter of the central content with comfortable inner padding
  const hubs: HubItem[] = [
    { id: 'legacy', title: 'Legacy IAM Platform', x: 18, y: 32, icon: ShieldAlert },
    { id: 'oauth', title: 'OAuth2 / OIDC Engine', x: 82, y: 32, icon: Key },
    { id: 'pipeline', title: 'Zero-Downtime Pipeline', x: 18, y: 78, icon: Layers },
    { id: 'event', title: 'Event-Driven Sync', x: 82, y: 78, icon: Radio },
    { id: 'edge', title: 'Distributed Auth Edge', x: 50, y: 14, icon: Globe },
  ];

  // Satellite Nodes connected to Hubs (calibrated coordinates with generous edge margins)
  const nodes: NodeItem[] = [
    // Legacy IAM Satellites (Foxtel)
    { id: 'forgerock', label: 'ForgeRock AM', sublabel: 'Auth Realm', x: 10, y: 18, hubId: 'legacy', type: 'satellite', tag: 'Legacy', icon: Lock },
    { id: 'directory', label: 'Sun Directory Server', sublabel: 'LDAP Schema', x: 25, y: 18, hubId: 'legacy', type: 'satellite', tag: 'Directory', icon: Database },
    { id: 'openidm', label: 'OpenIDM', sublabel: 'Identity Store', x: 9, y: 48, hubId: 'legacy', type: 'satellite', tag: 'IAM', icon: UserCheck },
    { id: 'saml', label: 'Legacy SAML 2.0', sublabel: 'B2B Federation', x: 23, y: 48, hubId: 'legacy', type: 'satellite', tag: 'Protocol', icon: FileCode },

    // OAuth2 / OIDC Satellites (DAZN Core)
    { id: 'pkce', label: 'PKCE Authorization', sublabel: 'RFC 7636', x: 75, y: 18, hubId: 'oauth', type: 'satellite', tag: 'Security', icon: ShieldCheck },
    { id: 'jwt', label: 'JWT Token Issuer', sublabel: 'RS256 Signer', x: 90, y: 18, hubId: 'oauth', type: 'satellite', tag: 'Tokens', icon: KeyRound },
    { id: 'jwks', label: 'JWKS Key Rotation', sublabel: 'Zero Cache Miss', x: 76, y: 48, hubId: 'oauth', type: 'satellite', tag: 'Keys', icon: RefreshCw },
    { id: 'refresh', label: 'Refresh Rotation', sublabel: 'Sliding Session', x: 91, y: 48, hubId: 'oauth', type: 'satellite', tag: 'Session', icon: RotateCcw },

    // Zero-Downtime Pipeline Satellites
    { id: 'extractor', label: 'Resumable Extractor', sublabel: '10k Batch/s', x: 10, y: 66, hubId: 'pipeline', type: 'satellite', tag: 'ETL', icon: Cpu },
    { id: 'checkpoint', label: 'Checkpoint State', sublabel: 'WAL Storage', x: 24, y: 66, hubId: 'pipeline', type: 'satellite', tag: 'State', icon: BookmarkCheck },
    { id: 'records', label: '1.4M User Records', sublabel: 'Zero Data Loss', x: 11, y: 92, hubId: 'pipeline', type: 'satellite', tag: 'Scale', icon: Users },
    { id: 'idempotent', label: 'Idempotent Ingestion', sublabel: 'Hash Deduplication', x: 25, y: 92, hubId: 'pipeline', type: 'satellite', tag: 'Sync', icon: CheckCheck },

    // Event-Driven Sync Satellites
    { id: 'kafka', label: 'Kafka Event Stream', sublabel: 'Partitioned Bus', x: 76, y: 66, hubId: 'event', type: 'satellite', tag: 'Events', icon: Radio },
    { id: 'dualwrite', label: 'Dual-Write Webhooks', sublabel: 'Async Dispatch', x: 90, y: 66, hubId: 'event', type: 'satellite', tag: 'Hooks', icon: Webhook },
    { id: 'cdc', label: 'CDC Replication', sublabel: 'Delta Stream', x: 75, y: 92, hubId: 'event', type: 'satellite', tag: 'Replication', icon: RefreshCw },
    { id: 'cutover', label: '0 Downtime Cutover', sublabel: 'Live Switch', x: 89, y: 92, hubId: 'event', type: 'satellite', tag: 'Migration', icon: Zap },

    // Distributed Auth Edge Satellites
    { id: 'gateway', label: 'AWS API Gateway', sublabel: 'Route PDP', x: 32, y: 12, hubId: 'edge', type: 'satellite', tag: 'Gateway', icon: Network },
    { id: 'multiregion', label: 'Multi-Region Cache', sublabel: 'Sub-15ms Auth', x: 68, y: 12, hubId: 'edge', type: 'satellite', tag: 'Latency', icon: Globe },
  ];

  // Scroll reveal trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Smooth scroll-driven card expansion from 75% to 100%
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setScrollProgress(1);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset || 0;
          // Progress goes from 0 (at top) to 1 (when scrolled 300px)
          const progress = Math.min(Math.max(scrollY / 300, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Continuous subtle trigonometric float physics
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) return;

    let startTime = performance.now();
    const tick = (now: number) => {
      setAnimTime((now - startTime) / 1000);
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Parallax on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xRatio = (e.clientX - rect.left) / rect.width - 0.5;
    const yRatio = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: xRatio * 20, y: yRatio * 20 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  const getNodePosition = (xPct: number, yPct: number, seed: number) => {
    const driftX = Math.sin(animTime * 0.9 + seed * 1.5) * 5 + mouseOffset.x * (0.8 + (seed % 3) * 0.2);
    const driftY = Math.cos(animTime * 0.7 + seed * 2.1) * 5 + mouseOffset.y * (0.8 + (seed % 3) * 0.2);
    return {
      left: `calc(${xPct}% + ${driftX.toFixed(1)}px)`,
      top: `calc(${yPct}% + ${driftY.toFixed(1)}px)`,
    };
  };

  const handleCaseStudyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onViewCaseStudy) {
      onViewCaseStudy('identity-migration');
    } else {
      window.location.href = '/work/identity-migration';
    }
  };

  // Compute smooth scale and translation
  const baseScaleX = 0.75 + scrollProgress * 0.25;
  const baseScaleY = 0.90 + scrollProgress * 0.10;
  const computedScaleX = isCardHovered && scrollProgress > 0.7
    ? (baseScaleX * 1.018).toFixed(4)
    : baseScaleX.toFixed(4);
  const computedScaleY = isCardHovered && scrollProgress > 0.7
    ? (baseScaleY * 1.012).toFixed(4)
    : baseScaleY.toFixed(4);
  const computedTranslateY = isCardHovered && scrollProgress > 0.7
    ? -10
    : Math.round((1 - scrollProgress) * 16);

  return (
    <section
      id="work"
      aria-label="Flagship Engineering Project: Foxtel to DAZN"
      style={{
        paddingTop: 'clamp(40px, 6vw, 64px)',
        paddingBottom: 'clamp(48px, 8vw, 80px)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          paddingLeft: 'clamp(16px, 2.5vw, 32px)',
          paddingRight: 'clamp(16px, 2.5vw, 32px)',
        }}
        className="constellation-hero-wrapper"
      >
        {/* Dark Themed Hero Stage inspired by Anthropic ktve-stage with smooth scroll-driven X-scaling growth */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => {
            setIsCardHovered(false);
            handleMouseLeave();
          }}
          style={{
            position: 'relative',
            backgroundColor: '#000000',
            borderRadius: '24px',
            overflow: 'hidden',
            minHeight: '780px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 72px) clamp(24px, 4vw, 48px)',
            transformOrigin: 'center top',
            transform: isVisible
              ? `scaleX(${computedScaleX}) scaleY(${computedScaleY}) translateY(${computedTranslateY}px)`
              : 'scaleX(0.75) scaleY(0.90) translateY(32px)',
            opacity: isVisible ? 1 : 0,
            transition: isCardHovered
              ? 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.45s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease'
              : 'transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease',
            border: isCardHovered
              ? '1px solid rgba(217, 119, 87, 0.45)'
              : '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: isCardHovered
              ? '0 36px 72px -16px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(217, 119, 87, 0.25), 0 0 35px rgba(217, 119, 87, 0.1)'
              : '0 24px 48px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.06)',
            willChange: 'transform',
          }}
          className="constellation-container"
        >
          {/* Top Illuminated Accent Line on Card Hover */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(217, 119, 87, 0.9) 50%, transparent 100%)',
              opacity: isCardHovered ? 1 : 0,
              transform: isCardHovered ? 'scaleX(1)' : 'scaleX(0.4)',
              transformOrigin: 'center',
              transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />

          {/* Subtle Background Radial Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: isCardHovered
                ? 'radial-gradient(ellipse at 50% 50%, rgba(217, 119, 87, 0.14) 0%, rgba(0, 0, 0, 0) 75%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(217, 119, 87, 0.08) 0%, rgba(0, 0, 0, 0) 70%)',
              transition: 'background 0.5s ease',
              zIndex: 0,
            }}
          />

          {/* SVG Connection Lines Canvas */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <defs>
              <linearGradient id="line-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d97757" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#faf9f5" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Connecting Lines from Hubs to Satellites */}
            {nodes.map((node) => {
              const parentHub = hubs.find((h) => h.id === node.hubId);
              if (!parentHub) return null;

              const isHighlighted =
                hoveredNode === node.id || hoveredNode === parentHub.id;

              return (
                <line
                  key={`${node.id}-${parentHub.id}`}
                  x1={`${parentHub.x}%`}
                  y1={`${parentHub.y}%`}
                  x2={`${node.x}%`}
                  y2={`${node.y}%`}
                  stroke={isHighlighted ? 'url(#line-glow)' : '#b0aea5'}
                  strokeWidth={isHighlighted ? 1.5 : 1}
                  strokeOpacity={isHighlighted ? 0.8 : 0.22}
                  strokeDasharray={isHighlighted ? '4 2' : 'none'}
                  style={{
                    transition: 'stroke 0.3s ease, stroke-opacity 0.3s ease, stroke-width 0.3s ease',
                  }}
                />
              );
            })}

            {/* Hub Interconnect Lines */}
            <line x1="18%" y1="28%" x2="50%" y2="10%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="50%" y1="10%" x2="82%" y2="28%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="18%" y1="28%" x2="18%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="82%" y1="28%" x2="82%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="18%" y1="76%" x2="82%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
          </svg>

          {/* Hub & Satellite Nodes (DOM elements with hover & physics) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 2,
              pointerEvents: 'none',
            }}
            className="constellation-nodes-layer"
          >
            {/* System Hub Markers with Glowing Vector Icons */}
            {hubs.map((hub, idx) => {
              const pos = getNodePosition(hub.x, hub.y, idx);
              const isHovered = hoveredNode === hub.id;
              const HubIcon = hub.icon;

              return (
                <div
                  key={hub.id}
                  onMouseEnter={() => setHoveredNode(hub.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'absolute',
                    left: pos.left,
                    top: pos.top,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'auto',
                    cursor: 'crosshair',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '6px',
                    zIndex: 3,
                  }}
                  className="constellation-hub"
                >
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? 'var(--color-clay)' : 'rgba(255, 255, 255, 0.12)',
                      border: isHovered ? '1px solid var(--color-clay)' : '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: isHovered
                        ? '0 0 16px var(--color-clay)'
                        : '0 0 8px rgba(0, 0, 0, 0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? '#faf9f5' : '#faf9f5',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <HubIcon size={14} strokeWidth={2} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: '12.5px',
                      fontWeight: isHovered ? 600 : 400,
                      color: isHovered ? '#faf9f5' : '#b0aea5',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.01em',
                      transition: 'color 0.25s ease',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
                    }}
                  >
                    {hub.title}
                  </span>
                </div>
              );
            })}

            {/* Satellite Technical Nodes with Semantic Micro-Icons */}
            {nodes.map((node, idx) => {
              const pos = getNodePosition(node.x, node.y, idx + 5);
              const isHovered = hoveredNode === node.id;
              const NodeIcon = node.icon;

              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  style={{
                    position: 'absolute',
                    left: pos.left,
                    top: pos.top,
                    transform: isHovered ? 'translate(-50%, -50%) scale(1.08)' : 'translate(-50%, -50%)',
                    pointerEvents: 'auto',
                    cursor: 'pointer',
                    padding: '6px 12px',
                    backgroundColor: isHovered ? 'rgba(32, 32, 32, 0.95)' : 'rgba(18, 18, 18, 0.9)',
                    border: isHovered ? '1px solid var(--color-clay)' : '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backdropFilter: 'blur(8px)',
                    boxShadow: isHovered ? '0 8px 24px rgba(217, 119, 87, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="constellation-satellite"
                >
                  <div
                    style={{
                      width: '22px',
                      height: '22px',
                      borderRadius: '5px',
                      backgroundColor: isHovered ? 'rgba(217, 119, 87, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isHovered ? 'var(--color-clay)' : '#87867f',
                      flexShrink: 0,
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <NodeIcon size={12} strokeWidth={1.8} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: isHovered ? '#faf9f5' : '#e0ded6',
                        letterSpacing: '0.02em',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {node.label}
                    </span>
                    {node.sublabel && (
                      <span
                        style={{
                          fontFamily: 'var(--font-anthropic-sans)',
                          fontSize: '9.5px',
                          color: isHovered ? '#b0aea5' : '#87867f',
                          letterSpacing: '0.02em',
                          lineHeight: 1.1,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {node.sublabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Central Hero Editorial Content Block */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '620px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-16)',
            }}
          >
            {/* Top Metric Feature Badges with Icons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: '#faf9f5',
                }}
              >
                <Users size={12} color="var(--color-clay)" strokeWidth={2} />
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  1.4M Migrated
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: '#faf9f5',
                }}
              >
                <Zap size={12} color="var(--color-clay)" strokeWidth={2} />
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  0 Downtime
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '999px',
                  color: '#faf9f5',
                }}
              >
                <ShieldCheck size={12} color="var(--color-clay)" strokeWidth={2} />
                <span
                  style={{
                    fontFamily: 'var(--font-anthropic-mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    textTransform: 'uppercase',
                  }}
                >
                  OAuth2 / OIDC
                </span>
              </div>
            </div>

            {/* Central Serif Heading (Anthropic Display Role) */}
            <h2
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(36px, 4.5vw, 52px)',
                fontWeight: 600,
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                color: '#faf9f5',
                margin: 0,
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
              }}
            >
              Foxtel → DAZN
            </h2>

            {/* Tagline / Subtitle */}
            <p
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(17px, 2vw, 21px)',
                fontStyle: 'italic',
                color: '#e0ded6',
                margin: 0,
                lineHeight: 1.4,
              }}
            >
              "Scaling and securing identity for 1.4M users on the fly."
            </p>

            {/* Narrative Body Description */}
            <p
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-body-sm)',
                lineHeight: '1.6',
                color: '#b0aea5',
                maxWidth: '560px',
                margin: 0,
              }}
            >
              Leading a zero-downtime migration of Foxtel's ~1.4M-user identity platform ForgeRock onto DAZN's IAM systems. Built on resumable, checkpointed data extraction and live event-driven directory sync to keep both platforms consistent throughout the transition.
            </p>

            {/* Primary Action Button with Attachment Styling */}
            <div style={{ paddingTop: 'var(--spacing-8)' }}>
              <Button
                variant="light-pill"
                asAnchor
                href="/work/identity-migration"
                onClick={handleCaseStudyClick}
              >
                View Case Study →
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .constellation-satellite {
            display: none !important;
          }
          .constellation-hub {
            opacity: 0.7;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .constellation-satellite,
          .constellation-hub {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
};
