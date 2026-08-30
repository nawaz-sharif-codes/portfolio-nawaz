import React from 'react';

export type ButtonVariant = 'ivory-filled' | 'clay-filled' | 'dark-outlined' | 'text-link' | 'light-pill';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
  asAnchor?: boolean;
  href?: string;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'ivory-filled',
  children,
  asAnchor = false,
  href,
  className = '',
  style,
  ...props
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'light-pill':
        return {
          backgroundColor: isHovered ? 'var(--color-ivory-medium)' : '#ffffff',
          color: 'var(--color-slate-dark)',
          border: 'none',
          borderRadius: '10px',
          padding: '9px 18px',
          fontFamily: 'var(--font-anthropic-sans)',
          fontSize: '14px',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '-0.01em',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          textDecoration: 'none',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
          transition: 'background-color var(--duration-fast) var(--ease-editorial), transform var(--duration-fast) var(--ease-editorial)',
          transform: isActive ? 'scale(0.98)' : 'none',
        };
      case 'ivory-filled':
        return {
          backgroundColor: isHovered ? 'var(--color-oat-warm)' : 'var(--color-ivory-light)',
          color: 'var(--color-slate-dark)',
          border: 'none',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderRadius: '0px 0px 8px 8px',
          padding: '12px 31px',
          fontFamily: 'var(--font-anthropic-sans)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '-0.08px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: 'none',
          transition: 'background-color var(--duration-fast) var(--ease-editorial)',
          opacity: isActive ? 0.9 : 1,
        };

      case 'clay-filled':
        return {
          backgroundColor: isHovered ? 'var(--color-clay-deep)' : 'var(--color-clay)',
          color: '#ffffff',
          border: 'none',
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderRadius: '0px 0px 8px 8px',
          padding: '12px 31px',
          fontFamily: 'var(--font-anthropic-sans)',
          fontSize: 'var(--text-body-sm)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '-0.08px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: 'none',
          transition: 'background-color var(--duration-fast) var(--ease-editorial)',
          opacity: isActive ? 0.9 : 1,
        };

      case 'dark-outlined':
        return {
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
          color: 'var(--color-ivory-light)',
          border: '1px solid var(--color-cloud-dark)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--spacing-8) var(--spacing-16)',
          fontFamily: 'var(--font-anthropic-sans)',
          fontSize: 'var(--text-caption)',
          fontWeight: 'var(--font-weight-medium)',
          letterSpacing: '-0.24px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: 'none',
          transition: 'border-color var(--duration-fast) var(--ease-editorial), background-color var(--duration-fast) var(--ease-editorial)',
        };

      case 'text-link':
        return {
          backgroundColor: 'transparent',
          color: 'var(--color-slate-dark)',
          border: 'none',
          borderRadius: 'var(--radius-none)',
          padding: 'var(--spacing-8) var(--spacing-12)',
          fontFamily: 'var(--font-anthropic-sans)',
          fontSize: 'var(--text-caption)',
          fontWeight: 'var(--font-weight-regular)',
          letterSpacing: '-0.24px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          textDecoration: isHovered ? 'underline' : 'none',
          textUnderlineOffset: '3px',
          boxShadow: 'none',
          transition: 'color var(--duration-fast) var(--ease-editorial)',
        };
    }
  };

  // Ensure bottom-only radius is preserved for filled variants even when custom styles (like padding/border) are merged
  const combinedStyles: React.CSSProperties = {
    ...getVariantStyles(),
    ...style,
    ...(variant === 'ivory-filled' || variant === 'clay-filled'
      ? {
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomRightRadius: '8px',
          borderBottomLeftRadius: '8px',
          borderRadius: '0px 0px 8px 8px',
        }
      : {}),
  };

  if (asAnchor && href) {
    return (
      <a
        href={href}
        className={className}
        style={combinedStyles}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsActive(false);
        }}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={className}
      style={combinedStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      {...props}
    >
      {children}
    </button>
  );
};
