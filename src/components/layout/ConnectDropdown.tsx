import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ExternalLink } from 'lucide-react';

interface ConnectDropdownProps {
  onOpenContact?: () => void;
}

interface SocialLink {
  name: string;
  href: string;
  category: 'primary' | 'social';
  description?: string;
  isExternal?: boolean;
}

export const ConnectDropdown: React.FC<ConnectDropdownProps> = ({ onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      href: 'https://github.com/nawaz-sharif-codes',
      category: 'primary',
      description: 'Repositories & OSS blueprints',
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nawazsharif/',
      category: 'primary',
      description: 'Career record & recommendations',
      isExternal: true,
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/life.with.nawazzz',
      category: 'social',
      description: '@life.with.nawazzz',
      isExternal: true,
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/919063656763?text=Hi%20Nawaz,%20I%20saw%20your%20portfolio!',
      category: 'social',
      description: '+91 9063656763',
      isExternal: true,
    },
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
      className="connect-combo-wrap"
    >
      {/* Anthropic Split-Action Combo Button */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#141413',
          borderRadius: '8px',
          overflow: 'hidden',
          transition: 'background-color 0.2s ease, transform 0.15s ease',
          boxShadow: isOpen
            ? '0 4px 14px rgba(0, 0, 0, 0.25)'
            : '0 2px 6px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Left Action Button (Connect text) */}
        <button
          type="button"
          onClick={() => {
            if (onOpenContact) {
              onOpenContact();
            } else {
              toggleDropdown();
            }
          }}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: '7px 14px 7px 16px',
            color: '#faf9f5',
            fontFamily: 'var(--font-anthropic-sans)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '-0.01em',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'opacity 0.2s ease',
          }}
          className="connect-main-btn"
        >
          Connect
        </button>

        {/* Hairline Divider */}
        <span
          style={{
            width: '1px',
            height: '18px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            display: 'inline-block',
          }}
        />

        {/* Right Dropdown Arrow Trigger */}
        <button
          type="button"
          onClick={toggleDropdown}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="Toggle Connect Channels Dropdown"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            cursor: 'pointer',
            padding: '7px 11px',
            color: '#faf9f5',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          className="connect-arrow-btn"
        >
          <ChevronDown
            size={14}
            strokeWidth={2.2}
            style={{
              transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
      </div>

      {/* Anthropic-Style Dropdown Menu Card (Attachment 2) */}
      <div
        style={{
          position: 'absolute',
          top: 'calc(100% + 8px)',
          right: 0,
          width: '260px',
          backgroundColor: '#faf9f5',
          border: '1px solid var(--color-stone)',
          borderRadius: '16px',
          boxShadow: '0 16px 36px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04)',
          padding: '16px 14px',
          zIndex: 1000,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? 'visible' : 'hidden',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.98)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.2s',
        }}
        role="menu"
      >
        {/* Section 1: Professional Profiles */}
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-cloud-dark)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              paddingLeft: '8px',
              marginBottom: '6px',
            }}
          >
            Professional
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {socialLinks
              .filter((item) => item.category === 'primary')
              .map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--color-slate-dark)',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                  }}
                  className="connect-item-link"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--color-slate-dark)',
                    }}
                  >
                    {link.name}
                  </span>
                  <ExternalLink size={13} color="var(--color-cloud-dark)" strokeWidth={1.75} />
                </a>
              ))}
          </div>
        </div>

        {/* Hairline Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            margin: '8px 4px 12px 4px',
          }}
        />

        {/* Section 2: Instant & Social */}
        <div style={{ marginBottom: '12px' }}>
          <div
            style={{
              fontFamily: 'var(--font-anthropic-sans)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--color-cloud-dark)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              paddingLeft: '8px',
              marginBottom: '6px',
            }}
          >
            Instant & Social
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {socialLinks
              .filter((item) => item.category === 'social')
              .map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    color: 'var(--color-slate-dark)',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                  }}
                  className="connect-item-link"
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-anthropic-serif)',
                      fontSize: '15px',
                      fontWeight: 500,
                      color: 'var(--color-slate-dark)',
                    }}
                  >
                    {link.name}
                  </span>
                  <ExternalLink size={13} color="var(--color-cloud-dark)" strokeWidth={1.75} />
                </a>
              ))}
          </div>
        </div>

        {/* Hairline Divider */}
        <div
          style={{
            height: '1px',
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
            margin: '8px 4px 10px 4px',
          }}
        />

        {/* Section 3: Direct Message Form CTA */}
        <div>
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              if (onOpenContact) onOpenContact();
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '8px 10px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--color-clay)',
              transition: 'background-color 0.15s ease',
            }}
            className="connect-item-link"
          >
            <span
              style={{
                fontFamily: 'var(--font-anthropic-serif)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-clay)',
              }}
            >
              Send Direct Message →
            </span>
          </button>
        </div>
      </div>

      <style>{`
        .connect-main-btn:hover,
        .connect-arrow-btn:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .connect-item-link:hover {
          background-color: rgba(0, 0, 0, 0.05) !important;
        }
        .connect-item-link:hover span {
          color: var(--color-clay) !important;
        }
      `}</style>
    </div>
  );
};
