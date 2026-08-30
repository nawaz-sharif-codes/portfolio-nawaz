import React, { useState, useEffect } from 'react';
import { ConnectDropdown } from './ConnectDropdown';

interface NavbarProps {
  onNavigate?: (path: string) => void;
  onOpenContact?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Smoothly morph logo when user scrolls down beyond 40px
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Projects', href: '/projects' },
    { label: 'Docs', href: '/docs' },
    { label: 'Experience', href: '/experience' },
    { label: 'Skills', href: '/skills' },
    { label: 'Contact', href: '/contact' },
  ];

  const externalLinks = [
    { label: 'GitHub', href: 'https://github.com/nawaz-sharif-codes' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nawazsharif/' },
    { label: 'Instagram', href: 'https://www.instagram.com/life.with.nawazzz' },
    { label: 'WhatsApp', href: 'https://wa.me/919063656763?text=Hi%20Nawaz,%20I%20saw%20your%20portfolio!' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (onNavigate) {
      onNavigate(href);
    } else if (href === '/contact' && onOpenContact) {
      onOpenContact();
    }
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--color-ivory-medium)',
        borderBottom: '1px solid var(--color-stone)',
        boxShadow: 'none',
        transition: 'background-color var(--duration-fast) var(--ease-editorial)',
      }}
    >
      <div
        className="site-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '76px',
        }}
      >
        {/* Editorial Wordmark Logo with Smooth Scroll Morph (NAWAZ SHARIF -> NS) */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) {
              onNavigate('/');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Nawaz Sharif Home"
          style={{
            fontFamily: 'var(--font-anthropic-display-sans)',
            fontSize: '20px',
            fontWeight: 'var(--font-weight-bold)',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-slate-dark)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <span>N</span>
          <span
            style={{
              display: 'inline-block',
              maxWidth: isScrolled ? '0px' : '95px',
              opacity: isScrolled ? 0 : 1,
              overflow: 'hidden',
              whiteSpace: 'pre',
              transition: 'max-width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              verticalAlign: 'bottom',
            }}
          >
            AWAZ{' '}
          </span>
          <span>S</span>
          <span
            style={{
              display: 'inline-block',
              maxWidth: isScrolled ? '0px' : '85px',
              opacity: isScrolled ? 0 : 1,
              overflow: 'hidden',
              whiteSpace: 'pre',
              transition: 'max-width 0.38s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
              verticalAlign: 'bottom',
            }}
          >
            HARIF
          </span>
        </a>

        {/* Desktop Navigation & External Utility Links */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 'var(--spacing-32)',
          }}
          className="desktop-nav"
        >
          {/* Main Section Links */}
          <nav
            aria-label="Main Navigation"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-32)',
            }}
          >
            {navLinks.map((link) => (
              <NavLinkItem
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              />
            ))}
          </nav>

          {/* Hairline Divider between internal and external links */}
          <span
            style={{
              width: '1px',
              height: '16px',
              backgroundColor: 'var(--color-stone)',
              display: 'inline-block',
            }}
          />

          {/* Connect Combo Dropdown (Anthropic Style Split-Action Button) */}
          <ConnectDropdown onOpenContact={onOpenContact} />
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '5px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 'var(--spacing-8)',
          }}
          className="mobile-hamburger"
        >
          <span
            style={{
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--color-slate-dark)',
              transition: 'transform var(--duration-fast) var(--ease-editorial)',
              transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 5px)' : 'none',
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--color-slate-dark)',
              opacity: mobileMenuOpen ? 0 : 1,
              transition: 'opacity var(--duration-fast) var(--ease-editorial)',
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1.5px',
              backgroundColor: 'var(--color-slate-dark)',
              transition: 'transform var(--duration-fast) var(--ease-editorial)',
              transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -5px)' : 'none',
            }}
          />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--color-ivory-medium)',
            borderBottom: '1px solid var(--color-stone)',
            padding: 'var(--spacing-16) var(--spacing-24)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing-16)',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{
                fontFamily: 'var(--font-anthropic-sans)',
                fontSize: 'var(--text-body-sm)',
                fontWeight: 'var(--font-weight-medium)',
                color: 'var(--color-slate-dark)',
                textDecoration: 'none',
                padding: 'var(--spacing-8) 0',
                borderBottom: '1px solid var(--color-stone)',
              }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 'var(--spacing-16)', paddingTop: 'var(--spacing-8)' }}>
            {externalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-anthropic-sans)',
                  fontSize: 'var(--text-caption)',
                  fontWeight: 'var(--font-weight-medium)',
                  color: 'var(--color-slate-medium)',
                  textDecoration: 'none',
                }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Media Query Styles for Desktop/Mobile responsive toggle */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-hamburger {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};

interface NavLinkItemProps {
  label: string;
  href: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ label, href, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        fontFamily: 'var(--font-anthropic-sans)',
        fontSize: '15px',
        fontWeight: 'var(--font-weight-medium)',
        letterSpacing: '-0.005em',
        color: isHovered ? 'var(--color-slate-dark)' : 'var(--color-slate-medium)',
        textDecoration: 'none',
        transition: 'color var(--duration-fast) var(--ease-editorial)',
        padding: 'var(--spacing-4) 0',
      }}
    >
      {label}
    </a>
  );
};
