import * as React from 'react';
import { cn } from '../../lib/utils';
import { KatakanaText } from './KatakanaText';
import { SpeedLines } from './SpeedLines';
import type { Accent } from '../../types';

const accentBorder: Record<Accent, string> = {
  crimson: 'border-blood',
  yellow: 'border-sunny',
  black: 'border-ink',
  paper: 'border-ink',
  white: 'border-ink',
};

const accentDim: Record<Accent, { bg: string }> = {
  crimson: { bg: 'bg-blood' },
  yellow: { bg: 'bg-sunny' },
  black: { bg: 'bg-ink' },
  paper: { bg: 'bg-paper' },
  white: { bg: 'bg-bone' },
};

interface MangaPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  accent?: Accent;
  /** Hard drop shadow under the panel. */
  shadow?: boolean;
  /** Halftone dot shading over the panel face. */
  halftone?: boolean;
  /** Radiating action lines over the panel face. */
  speedLines?: boolean;
  /** Katakana sound-effect stamped on the panel. */
  onomatopoeia?: string;
  /** How aggressively the frame is angled. */
  skew?: 'none' | 'subtle' | 'hard';
  children?: React.ReactNode;
}

/**
 * A comic-book frame: heavy ink border, hard shadow, optional texture
 * overlays and a katakana sound-effect stamp.
 */
export function MangaPanel({
  accent = 'black',
  shadow = true,
  halftone = false,
  speedLines = false,
  onomatopoeia,
  skew = 'subtle',
  className,
  children,
  style,
  ...rest
}: MangaPanelProps) {
  return (
    <div
      {...rest}
      style={style}
      className={cn(
        'relative overflow-hidden bg-bone border-4',
        accentBorder[accent],
        shadow && 'manga-shadow',
        skew === 'subtle' && '-skew-x-1',
        skew === 'hard' && 'md:-skew-x-3',
        className,
      )}
    >
      {halftone && (
        <div aria-hidden="true" className="halftone pointer-events-none absolute inset-0 opacity-[0.16]" />
      )}
      {speedLines && <SpeedLines color="black" className="opacity-70" innerRadius={60} rays={32} />}
      {onomatopoeia && (
        <KatakanaText
          outline="none"
          className={cn(
            'pointer-events-none absolute bottom-1 right-2 text-4xl sm:text-6xl',
            accentDim[accent].bg,
            'text-ink',
          )}
          rotate={-6}
        >
          {onomatopoeia}
        </KatakanaText>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}