import { useEffect } from 'react';
import { useMotionValue, type MotionValue } from 'framer-motion';

export interface MousePosition {
  /** Window X of the pointer. */
  x: MotionValue<number>;
  /** Window Y of the pointer. */
  y: MotionValue<number>;
}

/**
 * Tracks the pointer position as framer-motion MotionValues so the ink cursor
 * can trail behind it without re-rendering the tree on every mousemove.
 */
export function useMousePosition(): MousePosition {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return { x, y };
}