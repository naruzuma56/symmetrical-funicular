import * as React from 'react';
import { cn } from '../../lib/utils';
import { useAudio, type SfxName } from '../../hooks/useAudio';

export type MangaButtonVariant = 'blood' | 'ink' | 'sunny' | 'paper' | 'ghost';

interface MangaButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  variant?: MangaButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  /** Sound to fire on press. */
  sound?: SfxName;
  ariaLabel?: string;
}

const variantClasses: Record<MangaButtonVariant, string> = {
  blood: 'bg-blood text-bone border-ink',
  ink: 'bg-ink text-bone border-ink',
  sunny: 'bg-sunny text-ink border-ink',
  paper: 'bg-paper text-ink border-ink',
  ghost: 'bg-transparent text-ink border-ink',
};

const sizeClasses: Record<NonNullable<MangaButtonProps['size']>, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

/**
 * Loud comic CTA. Skewed, hard-shadowed, and audibly satisfying.
 */
export function MangaButton({
  children,
  href,
  type = 'button',
  onClick,
  variant = 'blood',
  size = 'md',
  className,
  disabled = false,
  sound = 'click',
  ariaLabel,
}: MangaButtonProps) {
  const { play } = useAudio();

  const handlePress = (event: React.MouseEvent) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    play(sound);
    onClick?.();
  };

  const classes = cn(
    'pressable -skew-x-3 font-comic uppercase tracking-[0.12em] border-4 manga-shadow-sm inline-flex items-center justify-center gap-2',
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'pointer-events-none opacity-50 saturate-0',
    className,
  );

  if (href) {
    return (
      <a href={href} onClick={handlePress} aria-label={ariaLabel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={handlePress} disabled={disabled} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}