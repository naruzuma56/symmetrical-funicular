import { motion, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], input, textarea, select, label, [data-ink-hover]';

/**
 * A brush-and-ink pointer replacement.
 * Rendered with mix-blend-difference so it stays visible on any panel,
 * and trails the cursor with a soft after-stroke of "ink".
 */
export function InkCursor() {
  const { x, y } = useMousePosition();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const tipX = useSpring(x, { stiffness: 1600, damping: 70, mass: 0.25 });
  const tipY = useSpring(y, { stiffness: 1600, damping: 70, mass: 0.25 });
  const trailX = useSpring(x, { stiffness: 160, damping: 24 });
  const trailY = useSpring(y, { stiffness: 160, damping: 24 });
  const haloScale = useSpring(hovering ? 2.2 : 1, { stiffness: 260, damping: 22 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const handleOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      setHovering(Boolean(target && typeof target.closest === 'function' && target.closest(INTERACTIVE_SELECTOR)));
    };

    setEnabled(true);
    window.addEventListener('pointerover', handleOver, { passive: true });
    return () => {
      window.removeEventListener('pointerover', handleOver);
      document.body.classList.remove('ink-cursor-on');
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('ink-cursor-on', enabled);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="no-print pointer-events-none fixed inset-0 z-[9999]">
      <motion.div
        className="absolute left-0 top-0"
        style={{ x: trailX, y: trailY }}
      >
        <motion.div
          className="h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/30"
          style={{ mixBlendMode: 'difference', scale: haloScale, x: '-50%', y: '-50%' }}
        />
      </motion.div>
      <motion.div className="absolute left-0 top-0" style={{ x: tipX, y: tipY }}>
        <div className="h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone" style={{ mixBlendMode: 'difference' }} />
        <div className="absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/90" />
      </motion.div>
    </div>
  );
}