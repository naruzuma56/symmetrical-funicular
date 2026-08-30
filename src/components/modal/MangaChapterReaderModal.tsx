import * as React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Volume2, VolumeX, MousePointerClick } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAudio } from '../../hooks/useAudio';
import { useReadingDirection } from '../../hooks/useReadingDirection';
import { KatakanaText } from '../common/KatakanaText';
import { MangaButton } from '../common/MangaButton';
import { SpeedLines } from '../common/SpeedLines';
import type { MangaPage, Project } from '../../types';

/** Flat, player-friendly representation of everything the reader shows. */
type ReaderEntry =
  | { kind: 'cover' }
  | { kind: 'chapter'; title: string; number: string; katakana: string }
  | { kind: 'manga'; page: MangaPage };

const pageBackgrounds: Record<NonNullable<MangaPage['background']>, string> = {
  paper: 'bg-paper',
  bone: 'bg-bone',
  ink: 'bg-ink',
  crimson: 'bg-blood',
  sunny: 'bg-sunny',
};

function buildReaderEntries(project: Project): ReaderEntry[] {
  return [
    { kind: 'cover' },
    ...project.chapters.flatMap<ReaderEntry>((chapter) => [
      { kind: 'chapter', title: chapter.title, number: chapter.chapterNumber, katakana: project.katakana },
      ...chapter.pages.map((page) => ({ kind: 'manga' as const, page })),
    ]),
  ];
}

/* ------------------------------------------------------------------ */
/*  Panel renderers                                                    */
/* ------------------------------------------------------------------ */

function PanelGlyph({ katakana }: { katakana?: string }) {
  if (!katakana) return null;
  return (
    <KatakanaText
      outline="none"
      className="pointer-events-none absolute -right-1 -bottom-2 text-5xl text-ink/25 md:text-7xl"
      rotate={-8}
    >
      {katakana}
    </KatakanaText>
  );
}

function StatPanel({ text }: { text: string }) {
  return (
    <div className="relative flex h-full min-h-28 items-center justify-center border-4 border-ink bg-sunny p-4">
      <PanelGlyph katakana="データ" />
      <p className="relative font-comic text-lg leading-tight tracking-wide text-ink md:text-2xl">{text}</p>
    </div>
  );
}

function PanelView({ panel, tone }: { panel: MangaPage['panels'][number]; tone: 'dark' | 'light' }) {
  const dark = tone === 'dark';

  if (panel.kind === 'stats') return <StatPanel text={panel.text} />;

  if (panel.kind === 'quote' || panel.kind === 'dialogue') {
    return (
      <div className="relative flex h-full min-h-28 items-center justify-center p-3">
        <PanelGlyph katakana={panel.katakana} />
        <div
          className={cn(
            'relative w-full border-4 border-ink p-4',
            panel.kind === 'dialogue' ? 'bg-paper text-ink' : 'bg-bone text-ink',
          )}
          style={{ transform: 'skew(-2deg)' }}
        >
          <p className={cn('font-body text-sm leading-snug font-semibold sm:text-base', panel.align === 'right' && 'text-right')}>
            {panel.text}
          </p>
          {panel.speaker && (
            <span className="mt-2 block font-comic text-xs tracking-widest text-blood">{panel.speaker}</span>
          )}
        </div>
      </div>
    );
  }

  // narration / action
  return (
    <div
      className={cn(
        'relative flex h-full min-h-28 items-center justify-center border-4 border-ink p-4',
        dark ? 'bg-ink text-bone' : 'bg-bone text-ink',
      )}
    >
      <PanelGlyph katakana={panel.katakana} />
      <p
        className={cn(
          'relative font-body text-sm leading-snug font-semibold sm:text-base',
          panel.align === 'right' && 'text-right',
        )}
      >
        {panel.kind === 'action' && <span className="mr-1 font-pop text-blood">ACTION ▶ </span>}
        {panel.text}
      </p>
    </div>
  );
}

function MangaPageView({ page }: { page: MangaPage }) {
  const tone: 'dark' | 'light' =
    page.background === 'ink' || page.background === 'crimson' ? 'dark' : 'light';

  const layout =
    page.panels.length === 1
      ? 'grid grid-rows-1'
      : page.panels.length === 2
        ? 'grid grid-cols-1 gap-2 md:grid-cols-2'
        : 'grid grid-cols-1 gap-2';

  return (
    <div
      className={cn(
        'relative flex h-full flex-col overflow-hidden',
        pageBackgrounds[page.background ?? 'paper'],
      )}
    >
      {page.speedLines && (
        <SpeedLines color={tone === 'dark' ? 'white' : 'black'} innerRadius={52} rays={30} className="absolute" />
      )}
      {page.halftone && (
        <div aria-hidden="true" className={cn('pointer-events-none absolute inset-0 opacity-[0.14]', tone === 'dark' ? 'halftone-white' : 'halftone')} />
      )}

      <div className={cn('relative z-10 grid flex-1 gap-2 p-3 sm:p-4', layout)}>
        {page.panels.map((panel, i) => (
          <PanelView key={i} panel={panel} tone={tone} />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-between border-t-4 border-ink bg-bone px-4 py-1.5">
        <span className="font-pop text-[11px] tracking-widest text-ink/60">◇</span>
        <span className="font-comic text-sm tracking-[0.3em] text-ink">P.{String(page.pageNumber).padStart(3, '0')}</span>
        <span className="font-pop text-[11px] tracking-widest text-ink/60">◇</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

interface MangaChapterReaderModalProps {
  project: Project | null;
  onClose: () => void;
}

export function MangaChapterReaderModal({ project, onClose }: MangaChapterReaderModalProps) {
  const { play } = useAudio();
  const { isRtl } = useReadingDirection();
  const [index, setIndex] = React.useState(0);
  const [mutedLocal, setMutedLocal] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const entries = React.useMemo(() => (project ? buildReaderEntries(project) : []), [project]);
  const total = entries.length;
  const entry = entries[index];

  React.useEffect(() => {
    setIndex(0);
    if (project) closeRef.current?.focus();
  }, [project]);

  // Lock body scroll + keyboard controls while open.
  React.useEffect(() => {
    if (!project) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
      if (event.key === 'Enter' && index === 0) go(1);
    };

    const go = (delta: number) => {
      const next = Math.min(Math.max(index + delta, 0), total - 1);
      if (next !== index) {
        setIndex(next);
        play('page');
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [project, onClose, total, index, play]);

  const advance = React.useCallback(
    (delta: number) => {
      setIndex((current) => {
        const next = Math.min(Math.max(current + delta, 0), total - 1);
        play('page');
        return next;
      });
    },
    [play, total],
  );

  const slide = {
    initial: { x: isRtl ? '-100%' : '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: isRtl ? '100%' : '-100%', opacity: 0 },
    transition: { duration: 0.35, ease: [0.32, 0.72, 0, 1] as const },
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-ink text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`Reading: ${project.title}`}
        >
          {/* Header chrome */}
          <div className="flex items-center justify-between gap-3 border-b-4 border-ink bg-bone px-4 py-3 text-ink">
            <button
              ref={closeRef}
              onClick={() => {
                play('thud');
                onClose();
              }}
              className="pressable -skew-x-3 border-4 border-ink bg-ink px-3 py-2 font-comic text-sm tracking-widest text-bone shadow-manga-xs"
              aria-label="Close reader"
            >
              <X className="inline h-4 w-4" /> CLOSE
            </button>
            <p className="hidden font-comic text-lg tracking-widest md:block">{project.title}</p>
            <div className="flex items-center gap-2">
              <span className="hidden border-2 border-ink bg-sunny px-2 py-1 font-pop text-xs text-ink sm:block">
                {isRtl ? 'RIGHT→LEFT' : 'LEFT→RIGHT'}
              </span>
              <button
                onClick={() => {
                  setMutedLocal((m) => !m);
                  play('click');
                }}
                className="pressable border-4 border-ink bg-paper p-2 text-ink shadow-manga-xs"
                aria-label="Toggle reader sound"
              >
                {mutedLocal ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Page stage */}
          <div className="relative flex flex-1 items-center justify-center overflow-hidden px-2 py-3 sm:px-6 md:py-6">
            <div className="relative h-full max-h-full w-full max-w-2xl">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div key={index} {...slide} className="absolute inset-0 border-4 border-bone shadow-[10px_10px_0_0_rgba(255,255,255,0.15)]">
                  {entry?.kind === 'cover' && (
                    <div className="relative flex h-full flex-col items-center justify-center gap-6 overflow-hidden bg-bone p-6 text-center text-ink">
                      <SpeedLines color="black" innerRadius={120} rays={40} className="opacity-40" />
                      <div className="halftone-fade halftone pointer-events-none absolute inset-0 opacity-[0.25]" aria-hidden="true" />
                      <div className="relative">
                        <span className="rounded-full border-4 border-ink bg-blood px-4 py-1 font-comic text-xs tracking-[0.3em] text-bone">
                          VOL.{project.year} · NEW RELEASE
                        </span>
                      </div>
                      <KatakanaText rotate={-8} className="text-6xl text-blood text-shadow-harsh md:text-8xl">
                        {project.katakana}
                      </KatakanaText>
                      <h3 className="font-comic text-5xl leading-none tracking-wide text-ink md:text-7xl">{project.title}</h3>
                      <p className="max-w-md font-body text-base font-semibold text-ink/80">{project.subtitle}</p>
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {project.tags.map((tag) => (
                          <span key={tag} className="border-2 border-ink bg-sunny px-2 py-0.5 font-pop text-xs text-ink">
                            {tag}
                          </span>
                        ))}
                        <span className="border-2 border-ink bg-paper px-2 py-0.5 font-pop text-xs text-ink">{project.year}</span>
                      </div>
                      <MangaButton
                        variant="blood"
                        size="lg"
                        sound="stamp"
                        onClick={() => { setIndex(1); play('page'); }}
                      >
                        <BookOpen className="h-5 w-5" /> START READING
                      </MangaButton>
                      <p className="flex items-center gap-1 font-pop text-[11px] text-ink/60">
                        <MousePointerClick className="h-3.5 w-3.5" /> arrows / ←→ keys / click canvas
                      </p>
                    </div>
                  )}

                  {entry?.kind === 'chapter' && (
                    <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-paper p-6 text-center text-ink">
                      <div className="crosshatch absolute inset-0 opacity-[0.07]" aria-hidden="true" />
                      <span className="font-comic text-sm tracking-[0.4em] text-blood">{entry.number}</span>
                      <KatakanaText outline="none" rotate={-6} className="text-7xl text-ink/15 md:text-9xl">
                        {entry.katakana}
                      </KatakanaText>
                      <h4 className="font-comic text-4xl leading-tight text-ink md:text-6xl">{entry.title}</h4>
                      <span className="panel-line mt-2 w-40" aria-hidden="true" />
                    </div>
                  )}

                  {entry?.kind === 'manga' && <MangaPageView page={entry.page} />}
                </motion.div>
              </AnimatePresence>

              {/* Overlaid ink panel sides (comic page gutters) */}
              {entry?.kind !== 'manga' && (
                <div className="pointer-events-none absolute inset-y-0 left-2 w-4 bg-ink/10" aria-hidden="true" />
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 border-t-4 border-ink bg-paper px-4 py-3 text-ink md:px-8">
            <button
              onClick={() => advance(-1)}
              disabled={index === 0}
              className="pressable border-4 border-ink bg-bone px-4 py-2 font-comic tracking-widest shadow-manga-xs disabled:pointer-events-none disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3">
              <span className="hidden font-pop text-xs text-ink/70 sm:block">{project.title}</span>
              <span className="border-2 border-ink bg-bone px-3 py-1 font-comic text-sm tracking-widest">
                {String(Math.min(index + 1, total)).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            {index === total - 1 ? (
              <button
                onClick={() => {
                  play('powerup');
                  onClose();
                }}
                className="pressable -skew-x-3 border-4 border-ink bg-blood px-4 py-2 font-comic tracking-widest text-bone shadow-manga-xs"
              >
                TO BE CONTINUED ▸
              </button>
            ) : (
              <button
                onClick={() => advance(1)}
                disabled={index === 0 && total === 0}
                className="pressable border-4 border-ink bg-ink px-4 py-2 font-comic tracking-widest text-bone shadow-manga-xs disabled:pointer-events-none disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}