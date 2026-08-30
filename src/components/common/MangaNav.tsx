import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Volume2, VolumeX, BookOpenText } from 'lucide-react';
import { navItems } from '../../data/profile';
import { useAudio } from '../../hooks/useAudio';
import { useReadingDirection } from '../../hooks/useReadingDirection';
import { cn } from '../../lib/utils';
import stampSeal from '../../assets/stamp-seal.svg';

function findActiveSection(): string {
  const sections = Array.from(document.querySelectorAll<HTMLElement>('section[id]'));
  const probe = window.scrollY + window.innerHeight * 0.35;
  let current = 'hero';
  for (const section of sections) {
    if (section.offsetTop <= probe) current = section.id;
  }
  return current;
}

export function MangaNav() {
  const { play, muted, toggleMuted } = useAudio();
  const { isRtl, toggle, modeLabel } = useReadingDirection();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const onScroll = () => setActive(findActiveSection());
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const go = (anchor: string) => {
    play('click');
    setOpen(false);
    window.location.hash = anchor;
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 border-b-4 border-ink bg-bone/95 backdrop-blur no-print">
      {/* Reading progress — the volume's page gauge */}
      <motion.div className="absolute inset-x-0 top-0 h-1.5 origin-left bg-blood" style={{ scaleX: progress }} aria-hidden="true" />

      <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6" aria-label="Volume chapters">
        <button onClick={() => go('#hero')} className="flex items-center gap-2" aria-label="Back to cover" data-ink-hover>
          <img src={stampSeal} alt="" aria-hidden="true" className="h-9 w-9 -rotate-6" />
          <span className="font-comic text-xl tracking-widest text-ink" style={{ transform: 'skew(-4deg)' }}>
            <span className="text-blood">REN</span>◤武◢
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => go(item.anchor)}
                data-ink-hover
                aria-current={active === item.id ? 'page' : undefined}
                className={cn(
                  'group relative px-3 py-1 font-comic text-sm tracking-[0.18em] transition-colors',
                  active === item.id ? 'text-blood' : 'text-ink hover:text-blood',
                )}
              >
                <span className="mr-1 text-[10px] text-ink/40">{item.chapter}</span>
                {item.label}
                <span
                  className={cn(
                    'absolute -bottom-0.5 left-1/2 h-1 w-0 -translate-x-1/2 bg-blood transition-all duration-200',
                    active === item.id ? 'w-full' : 'group-hover:w-2/3',
                  )}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggle()}
            data-ink-hover
            aria-label={`Toggle reading direction (${modeLabel})`}
            className="hidden border-2 border-ink bg-sunny px-2 py-1 font-pop text-[10px] font-bold text-ink hover:bg-yellow-300 sm:block"
            title={modeLabel}
          >
            {isRtl ? 'R→L' : 'L→R'}
          </button>
          <button
            onClick={() => { toggleMuted(); play('click'); }}
            data-ink-hover
            aria-label={muted ? 'Unmute sound effects' : 'Mute sound effects'}
            className="border-2 border-ink bg-paper p-2 text-ink hover:bg-parchment"
          >
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setOpen((value) => !value)}
            data-ink-hover
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="border-4 border-ink bg-ink p-2 text-bone shadow-manga-xs lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile chapter sheet */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden border-t-4 border-ink bg-bone lg:hidden"
        >
          <ul className="space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.anchor)}
                  className={cn(
                    'flex w-full items-center gap-3 border-b-2 border-dashed border-ink/20 px-3 py-2.5 text-left',
                    active === item.id ? 'bg-sunny' : 'bg-bone',
                  )}
                >
                  <span className="font-pop text-[10px] text-ink/50">{item.chapter}</span>
                  <span className="font-comic text-lg tracking-widest text-ink">{item.label}</span>
                  <BookOpenText className="ml-auto h-4 w-4 text-blood" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </header>
  );
}