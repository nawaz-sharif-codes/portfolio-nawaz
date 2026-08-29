import React from 'react';

export type CardSurface = 'ivory' | 'manilla' | 'oat' | 'canvas';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  surface?: CardSurface;
  bordered?: boolean;
  padding?: 'standard' | 'large' | 'hero';
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  surface = 'ivory',
  bordered = true,
  padding = 'standard',
  children,
  className = '',
  style,
  ...props
}) => {
  const getBackgroundColor = (): string => {
    switch (surface) {
      case 'ivory':
        return 'var(--color-ivory-light)';
      case 'manilla':
        return 'var(--color-manilla)';
      case 'oat':
        return 'var(--color-oat-warm)';
      case 'canvas':
        return 'var(--color-ivory-medium)';
    }
  };

  const getPadding = (): string => {
    switch (padding) {
      case 'standard':
        return 'var(--spacing-24)';
      case 'large':
        return 'var(--spacing-32)';
      case 'hero':
        return 'clamp(32px, 5vw, 64px)';
    }
  };

  return (
    <div
      className={className}
      style={{
        backgroundColor: getBackgroundColor(),
        borderRadius: 'var(--radius-cards)',
        border: bordered ? '1px solid var(--color-stone)' : 'none',
        padding: getPadding(),
        boxShadow: 'none',
        transition: 'border-color var(--duration-fast) var(--ease-editorial)',
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
