import React, { useState, useRef } from 'react';

interface NawazProfileCardProps {
  className?: string;
  style?: React.CSSProperties;
  showStatus?: boolean;
}

export const NawazProfileCard: React.FC<NawazProfileCardProps> = ({
  className = '',
  style = {},
  showStatus = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -10;
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      className={`nawaz-signature-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        margin: '0 auto',
        borderRadius: '24px',
        backgroundColor: '#0d0d0c',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isHovered
          ? '0 28px 60px -16px rgba(0, 0, 0, 0.8), 0 0 30px rgba(217, 119, 87, 0.15)'
          : '0 20px 40px -16px rgba(0, 0, 0, 0.6)',
        padding: '36px 28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered
          ? 'transform 0.1s ease-out, box-shadow 0.25s ease'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
        transformStyle: 'preserve-3d',
        ...style,
      }}
    >
      {/* Ambient Glare Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.08) 0%, rgba(217, 119, 87, 0.04) 40%, transparent 70%)`,
          pointerEvents: 'none',
          borderRadius: '24px',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Top Status Pill */}
      {showStatus && (
        <div
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '12px',
            backgroundColor: 'rgba(217, 119, 87, 0.12)',
            border: '1px solid rgba(217, 119, 87, 0.25)',
            fontFamily: 'var(--font-anthropic-mono)',
            fontSize: '10px',
            color: '#d97757',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#d97757',
              boxShadow: '0 0 6px #d97757',
            }}
          />
          DAZN
        </div>
      )}

      {/* Card Visual Hero: Arched Curved Text + Terracotta Circle Badge + Nawaz Portrait */}
      <div
        style={{
          position: 'relative',
          width: '240px',
          height: '240px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '12px',
          marginBottom: '20px',
        }}
      >
        {/* SVG Arched Text "NAWAZ SHARIF" curving neatly over the circular badge */}
        <svg
          viewBox="0 0 300 300"
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
            {/* Smooth Upper Semi-Circle Arch Path */}
            <path
              id="nawaz-arch-curve"
              d="M 35,160 A 115,115 0 0,1 265,160"
              fill="transparent"
            />
          </defs>

          <text
            fill="#faf9f5"
            style={{
              fontFamily: 'var(--font-anthropic-serif)',
              fontSize: '34px',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)',
            }}
          >
            <textPath
              href="#nawaz-arch-curve"
              startOffset="50%"
              textAnchor="middle"
            >
              Nawaz Sharif
            </textPath>
          </text>
        </svg>

        {/* Terracotta/Coral Circle Badge */}
        <div
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            backgroundColor: '#d97757',
            boxShadow: '0 10px 30px rgba(217, 119, 87, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginTop: '28px',
          }}
        >
          {/* Subtle Inner Glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.25)',
              zIndex: 2,
              pointerEvents: 'none',
            }}
          />

          {/* Nawaz Portrait Headshot */}
          <img
            src="/nawaz-headshot.jpg"
            alt="Nawaz Sharif Portrait"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              transform: isHovered ? 'scale(1.08)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      </div>

      {/* Subtitle / Role */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-anthropic-sans)',
            fontSize: '17px',
            fontWeight: 500,
            color: '#faf9f5',
            letterSpacing: '-0.01em',
          }}
        >
          software engineer @ DAZN
        </p>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-anthropic-mono)',
            fontSize: '11.5px',
            color: '#87867f',
            letterSpacing: '0.04em',
          }}
        >
          Distributed Systems & Event Streaming
        </p>
      </div>

      {/* Card Footer Micro Badges */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          width: '100%',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-anthropic-mono)',
            fontSize: '11px',
            color: '#b0afa9',
          }}
        >
          1.4M IAM Migration
        </span>
        <span style={{ color: '#444' }}>•</span>
        <span
          style={{
            fontFamily: 'var(--font-anthropic-mono)',
            fontSize: '11px',
            color: '#b0afa9',
          }}
        >
          Kafka / Node / AWS
        </span>
      </div>
    </div>
  );
};
