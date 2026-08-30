import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { KatakanaText } from './KatakanaText';
import { profile } from '../../data/profile';

/**
 * Cover-loading intro. Slides away like the first page of a volume.
 */
export function IntroSplash({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onDone, 2800);
    const skip = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') onDone();
    };
    window.addEventListener('keydown', skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 bg-ink px-6 text-center text-bone"
      exit={{ x: '-100%', transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="halftone-white pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <div className="speed-lines-bg-light pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

      <div className="relative grid h-24 w-24 place-items-center border-4 border-bone bg-blood shadow-[6px_6px_0_0_rgba(255,255,255,1)]">
        <span className="animate-spin-slow font-pop text-5xl leading-none">忍</span>
      </div>

      <KatakanaText outline="white" className="text-6xl md:text-8xl" rotate={-4}>
        ジ・ポートフォリオ
      </KatakanaText>

      <p className="font-comic text-3xl tracking-[0.2em] md:text-4xl">
        {profile.volume} · IS BEING PRINTED
      </p>

      <div className="mt-2 h-4 w-64 max-w-[80vw] border-2 border-bone bg-ink">
        <motion.div
          className="diagonal-stripes-white h-full"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
        />
      </div>

      <p className="font-pop text-[11px] tracking-[0.35em] text-bone/50">
        DRYING THE INK ... DO NOT CLOSE THIS VOLUME
      </p>
    </motion.div>
  );
}