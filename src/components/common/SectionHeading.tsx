import { cn } from '../../lib/utils';
import { KatakanaText } from './KatakanaText';
import type { Accent } from '../../types';

interface SectionHeadingProps {
  /** e.g. "第3話" */
  chapter: string;
  /** e.g. "BATTLE RECORD" */
  title: string;
  /** Watermark kana behind the title. */
  katakana: string;
  accent?: Accent;
  align?: 'left' | 'center';
  className?: string;
  /** Optional strapline below the title. */
  subtitle?: string;
}

const titleTone: Record<Accent, string> = {
  crimson: 'text-blood text-shadow-harsh',
  yellow: 'text-sunny text-shadow-harsh',
  black: 'text-ink text-shadow-harsh',
  paper: 'text-ink text-shadow-harsh',
  white: 'text-ink text-shadow-harsh',
};

/**
 * Chapter heading used to open every portfolio section.
 * Reads like a volume's table of contents.
 */
export function SectionHeading({
  chapter,
  title,
  katakana,
  accent = 'crimson',
  align = 'left',
  className,
  subtitle,
}: SectionHeadingProps) {
  const centered = align === 'center';

  return (
    <div className={cn('relative mb-10 md:mb-14', centered && 'text-center', className)}>
      <KatakanaText
        outline="none"
        className={cn(
          'pointer-events-none absolute -top-6 select-none text-6xl opacity-[0.12] sm:text-8xl',
          centered ? 'left-1/2 -translate-x-1/2' : 'right-0',
        )}
        rotate={centered ? 0 : 5}
      >
        {katakana}
      </KatakanaText>

      <div className={cn('relative flex items-center gap-3', centered && 'justify-center')}>
        <span className="inline-block -skew-x-6 border-2 border-ink bg-ink px-3 py-1 font-comic text-sm tracking-[0.2em] text-bone shadow-manga-xs">
          {chapter}
        </span>
        <span aria-hidden="true" className={cn('h-1.5 bg-ink', centered ? 'w-10 flex-initial' : 'flex-1')} />
      </div>

      <h2
        className={cn(
          'relative mt-4 font-comic text-5xl leading-none tracking-wide sm:text-6xl lg:text-7xl',
          titleTone[accent],
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p className={cn('relative mt-3 max-w-xl font-body text-base font-semibold text-ink/80', centered && 'mx-auto')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}