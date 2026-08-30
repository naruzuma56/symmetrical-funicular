import { Heart, Keyboard, Layers } from 'lucide-react';
import { profile } from '../../data/profile';
import { useReadingDirection } from '../../hooks/useReadingDirection';
import { useAudio } from '../../hooks/useAudio';
import stampSeal from '../../assets/stamp-seal.svg';

export function Footer() {
  const { direction } = useReadingDirection();
  const { muted, toggleMuted } = useAudio();

  return (
    <footer className="relative overflow-hidden border-t-4 border-ink bg-ink text-bone">
      <div className="crosshatch pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center md:flex-row md:items-start md:justify-between md:text-left">
          <div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              <img src={stampSeal} alt="" aria-hidden="true" className="h-10 w-10 -rotate-6" />
              <p className="font-comic text-2xl tracking-widest">
                <span className="text-blood">REN</span> TAKAHASHI
              </p>
            </div>
            <p className="mt-2 font-pop text-xs tracking-[0.25em] text-bone/60">
              {profile.volume} · THE FULLSTACK PHANTOM · {profile.location}
            </p>
          </div>

          <div className="max-w-md space-y-2 font-body text-sm text-bone/70">
            <p className="flex items-center justify-center gap-2 md:justify-start">
              <Keyboard className="h-4 w-4 text-sunny" /> Navigate with scroll, keys, or the chapters above.
            </p>
            <p className="flex items-center justify-center gap-2 md:justify-start">
              <Layers className="h-4 w-4 text-sunny" /> Reading direction: <span className="font-bold text-bone">{direction.toUpperCase()}</span> — toggle it in the About section.
            </p>
            <p className="flex items-center justify-center gap-2 md:justify-start">
              <Heart className="h-4 w-4 text-blood" /> Hand-drawn with ink, React, and unreasonable deadlines.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t-2 border-dashed border-bone/25 pt-6 font-pop text-[11px] tracking-[0.2em] text-bone/50 md:flex-row">
          <p>© {new Date().getFullYear()} {profile.name}. ALL PANEL RIGHTS RESERVED.</p>
          <p className="inline-flex items-center gap-2">
            SOUND FX <span className={muted ? 'text-blood' : 'text-sunny'}>{muted ? 'OFF' : 'ON'}</span>
            <button
              onClick={toggleMuted}
              data-ink-hover
              className="border border-bone/40 px-2 py-0.5 font-bold text-bone/70 hover:border-sunny hover:text-sunny"
            >
              TOGGLE
            </button>
          </p>
          <p className="font-comic tracking-[0.25em]">TO BE CONTINUED… → VOL.2</p>
        </div>
      </div>
    </footer>
  );
}