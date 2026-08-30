import { cn } from '../../lib/utils';

interface KatakanaTextProps {
  children: string;
  className?: string;
  /** Ink treatment for the kana. */
  outline?: 'none' | 'black' | 'white';
  /** Extra rotation applied on top of any inherited transform. */
  rotate?: number;
}

/**
 * Loud katakana used as onomatopoeia / sound-effect overlays.
 * Rendered in Mochiy Pop One so the glyphs carry authentic weight.
 */
export function KatakanaText({ children, className, outline = 'black', rotate = 0 }: KatakanaTextProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'font-pop leading-none tracking-tight select-none',
        outline === 'black' && 'text-outline-black',
        outline === 'white' && 'text-outline-white',
        className,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}