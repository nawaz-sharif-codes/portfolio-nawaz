import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'slate' | 'cloud';
  className?: string;
  style?: React.CSSProperties;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  className = '',
  style,
}) => {
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        backgroundColor: 'transparent',
        color: variant === 'cloud' ? 'var(--color-cloud-dark)' : 'var(--color-slate-dark)',
        fontFamily: 'var(--font-anthropic-sans)',
        fontSize: 'var(--text-caption)',
        fontWeight: 'var(--font-weight-semibold)',
        letterSpacing: '-0.24px',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-none)',
        padding: 0,
        ...style,
      }}
    >
      {children}
    </span>
  );
};
