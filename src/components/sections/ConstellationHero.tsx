import React, { useState, useEffect, useRef } from 'react';
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
}

interface HubItem {
  id: string;
  title: string;
  x: number;
  y: number;
}

export const ConstellationHero: React.FC<ConstellationHeroProps> = ({
  onViewCaseStudy,
}) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [animTime, setAnimTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // System Hubs positioned around the perimeter of the central content
  const hubs: HubItem[] = [
    { id: 'legacy', title: 'Legacy IAM Platform', x: 14, y: 32 },
    { id: 'oauth', title: 'OAuth2 / OIDC Engine', x: 86, y: 32 },
    { id: 'pipeline', title: 'Zero-Downtime Pipeline', x: 14, y: 78 },
    { id: 'event', title: 'Event-Driven Sync', x: 86, y: 78 },
    { id: 'edge', title: 'Distributed Auth Edge', x: 50, y: 14 },
  ];

  // Satellite Nodes connected to Hubs
  const nodes: NodeItem[] = [
    // Legacy IAM Satellites (Foxtel)
    { id: 'forgerock', label: 'ForgeRock AM', sublabel: 'Auth Realm', x: 5, y: 18, hubId: 'legacy', type: 'satellite', tag: 'Legacy' },
    { id: 'directory', label: 'Sun Directory Server', sublabel: 'LDAP Schema', x: 22, y: 18, hubId: 'legacy', type: 'satellite', tag: 'Directory' },
    { id: 'openidm', label: 'OpenIDM', sublabel: 'Identity Store', x: 4, y: 48, hubId: 'legacy', type: 'satellite', tag: 'IAM' },
    { id: 'saml', label: 'Legacy SAML 2.0', sublabel: 'B2B Federation', x: 18, y: 48, hubId: 'legacy', type: 'satellite', tag: 'Protocol' },

    // OAuth2 / OIDC Satellites (DAZN Core)
    { id: 'pkce', label: 'PKCE Authorization', sublabel: 'RFC 7636', x: 80, y: 18, hubId: 'oauth', type: 'satellite', tag: 'Security' },
    { id: 'jwt', label: 'JWT Token Issuer', sublabel: 'RS256 Signer', x: 96, y: 18, hubId: 'oauth', type: 'satellite', tag: 'Tokens' },
    { id: 'jwks', label: 'JWKS Key Rotation', sublabel: 'Zero Cache Miss', x: 82, y: 48, hubId: 'oauth', type: 'satellite', tag: 'Keys' },
    { id: 'refresh', label: 'Refresh Rotation', sublabel: 'Sliding Session', x: 96, y: 48, hubId: 'oauth', type: 'satellite', tag: 'Session' },

    // Zero-Downtime Pipeline Satellites
    { id: 'extractor', label: 'Resumable Extractor', sublabel: '10k Batch/s', x: 4, y: 66, hubId: 'pipeline', type: 'satellite', tag: 'ETL' },
    { id: 'checkpoint', label: 'Checkpoint State', sublabel: 'WAL Storage', x: 18, y: 66, hubId: 'pipeline', type: 'satellite', tag: 'State' },
    { id: 'records', label: '1.4M User Records', sublabel: 'Zero Data Loss', x: 6, y: 92, hubId: 'pipeline', type: 'satellite', tag: 'Scale' },
    { id: 'idempotent', label: 'Idempotent Ingestion', sublabel: 'Hash Deduplication', x: 22, y: 92, hubId: 'pipeline', type: 'satellite', tag: 'Sync' },

    // Event-Driven Sync Satellites
    { id: 'kafka', label: 'Kafka Event Stream', sublabel: 'Partitioned Bus', x: 82, y: 66, hubId: 'event', type: 'satellite', tag: 'Events' },
    { id: 'dualwrite', label: 'Dual-Write Webhooks', sublabel: 'Async Dispatch', x: 96, y: 66, hubId: 'event', type: 'satellite', tag: 'Hooks' },
    { id: 'cdc', label: 'CDC Replication', sublabel: 'Delta Stream', x: 78, y: 92, hubId: 'event', type: 'satellite', tag: 'Replication' },
    { id: 'cutover', label: '0 Downtime Cutover', sublabel: 'Live Switch', x: 94, y: 92, hubId: 'event', type: 'satellite', tag: 'Migration' },

    // Distributed Auth Edge Satellites
    { id: 'gateway', label: 'AWS API Gateway', sublabel: 'Route PDP', x: 30, y: 12, hubId: 'edge', type: 'satellite', tag: 'Gateway' },
    { id: 'multiregion', label: 'Multi-Region Cache', sublabel: 'Sub-15ms Auth', x: 70, y: 12, hubId: 'edge', type: 'satellite', tag: 'Latency' },
  ];

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

  return (
    <section
      id="work"
      aria-label="Flagship Engineering Project — Foxtel to DAZN Identity Migration"
      style={{
        paddingTop: 'clamp(40px, 6vw, 64px)',
        paddingBottom: 'clamp(48px, 8vw, 80px)',
      }}
    >
      <div className="site-container">
        {/* Dark Themed Hero Stage inspired by Anthropic ktve-stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            position: 'relative',
            backgroundColor: 'var(--color-slate-dark)',
            borderRadius: '24px',
            overflow: 'hidden',
            minHeight: '780px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.25)',
            padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 40px)',
          }}
          className="constellation-container"
        >
          {/* Subtle Background Radial Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(217, 119, 87, 0.09) 0%, rgba(20, 20, 19, 0) 70%)',
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
            <line x1="12%" y1="28%" x2="50%" y2="10%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="50%" y1="10%" x2="88%" y2="28%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="12%" y1="28%" x2="14%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="88%" y1="28%" x2="86%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
            <line x1="14%" y1="76%" x2="86%" y2="76%" stroke="#b0aea5" strokeOpacity="0.18" strokeWidth="1" />
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
            {/* System Hub Markers */}
            {hubs.map((hub, idx) => {
              const pos = getNodePosition(hub.x, hub.y, idx);
              const isHovered = hoveredNode === hub.id;

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
                    gap: '4px',
                    zIndex: 3,
                  }}
                  className="constellation-hub"
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: isHovered ? 'var(--color-clay)' : '#faf9f5',
                      boxShadow: isHovered
                        ? '0 0 14px var(--color-clay)'
                        : '0 0 8px rgba(250, 249, 245, 0.5)',
                      transition: 'all 0.25s ease',
                      display: 'inline-block',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: '13px',
                      color: isHovered ? '#faf9f5' : '#b0aea5',
                      whiteSpace: 'nowrap',
                      letterSpacing: '0.01em',
                      transition: 'color 0.25s ease',
                    }}
                  >
                    {hub.title}
                  </span>
                </div>
              );
            })}

            {/* Satellite Technical Nodes */}
            {nodes.map((node, idx) => {
              const pos = getNodePosition(node.x, node.y, idx + 5);
              const isHovered = hoveredNode === node.id;

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
                    backgroundColor: isHovered ? 'rgba(42, 42, 39, 0.95)' : 'rgba(28, 28, 26, 0.85)',
                    border: isHovered ? '1px solid var(--color-clay)' : '1px solid rgba(176, 174, 165, 0.25)',
                    borderRadius: '6px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    backdropFilter: 'blur(4px)',
                    boxShadow: isHovered ? '0 6px 20px rgba(0, 0, 0, 0.6)' : 'none',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="constellation-satellite"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: isHovered ? 'var(--color-clay)' : '#87867f',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-mono)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: isHovered ? '#faf9f5' : '#e0ded6',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {node.label}
                    </span>
                  </div>
                  {node.sublabel && (
                    <span
                      style={{
                        fontFamily: 'var(--font-anthropic-sans)',
                        fontSize: '9.5px',
                        color: isHovered ? '#b0aea5' : '#87867f',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {node.sublabel}
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Central Hero Editorial Content Block */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              maxWidth: '600px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--spacing-20)',
              backgroundColor: 'rgba(20, 20, 19, 0.88)',
              backdropFilter: 'blur(12px)',
              padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3.5vw, 36px)',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Top Badge & Metric Snippet */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--spacing-12)',
                padding: '5px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '999px',
              }}
            >
              <span
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-clay)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-anthropic-mono)',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#faf9f5',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                1.4M Users Migrated • 0 Downtime • OAuth2 / OIDC
              </span>
            </div>

            {/* Central Serif Heading (Anthropic Display Role) */}
            <h2
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: 'clamp(32px, 4.5vw, 52px)',
                fontWeight: 'var(--font-weight-regular)',
                lineHeight: 1.15,
                color: '#faf9f5',
                letterSpacing: '-0.02em',
                margin: 0,
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
              "Re-architecting identity for 1.4 million users, live."
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

            {/* Primary Action Button with Signature Bottom-Only Radius */}
            <div style={{ paddingTop: 'var(--spacing-8)' }}>
              <Button
                variant="clay-filled"
                asAnchor
                href="/work/identity-migration"
                onClick={handleCaseStudyClick}
                style={{
                  padding: '13px 34px',
                  fontSize: 'var(--text-body-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--spacing-8)',
                }}
              >
                Explore Architecture Case Study →
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
