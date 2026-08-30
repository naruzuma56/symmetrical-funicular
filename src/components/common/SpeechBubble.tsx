import * as React from 'react';
import { cn } from '../../lib/utils';

export type BubbleVariant = 'manga' | 'shout' | 'thought';
export type BubbleTone = 'paper' | 'bone' | 'ink' | 'sunny';

const clipClass: Record<BubbleVariant, string> = {
  manga: 'bubble-manga',
  shout: 'bubble-shout',
  thought: 'bubble-thought',
};

const toneClasses: Record<BubbleTone, string> = {
  paper: 'bg-paper text-ink',
  bone: 'bg-bone text-ink',
  ink: 'bg-ink text-bone',
  sunny: 'bg-sunny text-ink',
};

interface SpeechBubbleProps {
  children: React.ReactNode;
  variant?: BubbleVariant;
  tone?: BubbleTone;
  className?: string;
  /** Compress the surrounding whitespace via padding. */
  padded?: boolean;
}

/**
 * A comic speech / shout / thought bubble.
 * The black wrapper and inner body share a clip-path so the
 * jagged outline keeps a ~4px ink rim.
 */
export function SpeechBubble({ children, variant = 'manga', tone = 'paper', className, padded = true }: SpeechBubbleProps) {
  return (
    <div className={cn('relative', className)}>
      <div className={cn(clipClass[variant], 'bg-ink')}>
        <div className={cn(clipClass[variant], padded && 'p-3 sm:p-4')}>
          <div className={cn('flex flex-col gap-2', toneClasses[tone].split(' ').length && toneClasses[tone])}>
            {children}
          </div>
        </div>
      </div>
      {variant === 'thought' && (
        <>
          <span aria-hidden="true" className="absolute -bottom-2.5 left-8 h-3 w-3 rounded-full bg-ink" />
          <span aria-hidden="true" className="absolute -bottom-6 left-3 h-2 w-2 rounded-full bg-ink/70" />
        </>
      )}
    </div>
  );
}