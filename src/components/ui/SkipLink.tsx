import React from 'react';

interface SkipLinkProps {
  targetId?: string;
  label?: string;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  label = 'Skip to main content',
}) => {
  return (
    <a
      href={`#${targetId}`}
      style={{
        position: 'absolute',
        top: '-9999px',
        left: 'var(--spacing-16)',
        zIndex: 9999,
        backgroundColor: 'var(--color-ivory-light)',
        color: 'var(--color-slate-dark)',
        padding: 'var(--spacing-8) var(--spacing-16)',
        fontFamily: 'var(--font-anthropic-sans)',
        fontSize: 'var(--text-caption)',
        fontWeight: 'var(--font-weight-medium)',
        textDecoration: 'none',
        border: '1px solid var(--color-stone)',
        borderRadius: 'var(--radius-none)',
        transition: 'top var(--duration-fast) var(--ease-editorial)',
      }}
      onFocus={(e) => {
        e.currentTarget.style.top = 'var(--spacing-16)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.top = '-9999px';
      }}
    >
      {label}
    </a>
  );
};
