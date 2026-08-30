import { motion } from 'framer-motion';
import { MapPin, Coffee, HeartHandshake, Crosshair } from 'lucide-react';
import { profile } from '../../data/profile';
import { SectionHeading } from '../common/SectionHeading';
import { SpeechBubble } from '../common/SpeechBubble';
import { MangaPanel } from '../common/MangaPanel';
import { KatakanaText } from '../common/KatakanaText';
import { useAudio } from '../../hooks/useAudio';
import { useReadingDirection } from '../../hooks/useReadingDirection';

const facts = [
  'Likes: TypeScript, tonkotsu ramen, and a git history that reads like poetry.',
  'Dislikes: vague bug reports, and deploy windows after midnight.',
  'Believes: accessibility is a superpower, not a checkbox.',
];

const fightStats = [
  { label: 'BASE OF OPERATIONS', value: profile.location },
  { label: 'COMBAT CLASS', value: 'FULL-STACK · A-RANK' },
  { label: 'CHI PATTERN', value: 'CLEAN COMMITS / 0 WARNINGS' },
  { label: 'WEAKNESS', value: 'FREE KRISPY KREME' },
];

export function About() {
  const { play } = useAudio();
  const { toggle, modeLabel } = useReadingDirection();

  return (
    <section id="about" className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading chapter="第2話" title="WHO AM I" katakana="自己紹介" subtitle="A few panels from the author's own autobiography." />

        <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <SpeechBubble variant="manga" tone="bone" className="mb-6">
              <span className="font-comic text-sm tracking-widest text-blood">NARRATION</span>
              <p className="font-body text-base leading-relaxed font-semibold text-ink sm:text-lg">
                A kid from Osaka who taught himself to type before he learned to ride a bike.
                Ten years later he ships software from Tokyo that a few million people use every day — without breaking a sweat.
              </p>
            </SpeechBubble>

            <SpeechBubble variant="manga" tone="paper">
              <span className="font-comic text-sm tracking-widest text-blood">NARRATION · CONT.</span>
              <p className="font-body text-base leading-relaxed font-semibold text-ink sm:text-lg">
                By day he wrangles distributed systems and realtime feeds.
                By night he draws panels just like these — because a portfolio that can't make you smile is just a CV with extra steps.
              </p>
            </SpeechBubble>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {facts.map((fact, i) => (
                <SpeechBubble key={fact} variant="thought" tone="paper" padded={false} className={i % 2 === 1 ? 'sm:translate-y-4' : ''}>
                  <p className="px-3 py-2 font-body text-sm font-semibold leading-snug text-ink">{fact}</p>
                </SpeechBubble>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative"
          >
            <MangaPanel accent="yellow" halftone className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-comic text-2xl tracking-wide text-ink">COMBAT DOSSIER</h3>
                <KatakanaText outline="none" className="text-2xl text-blood" rotate={-8}>
                  闇夜
                </KatakanaText>
              </div>

              <dl className="mt-5 space-y-4">
                {fightStats.map((stat) => (
                  <div key={stat.label} className="border-b-2 border-dashed border-ink/40 pb-3 last:border-0">
                    <dt className="font-pop text-[11px] tracking-[0.2em] text-ink/60">{stat.label}</dt>
                    <dd className="font-comic text-lg tracking-wide text-ink">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </MangaPanel>

            <MangaPanel accent="black" className="mt-6 bg-ink p-6 text-bone" shadow>
              <p className="font-pop text-sm leading-relaxed tracking-wide">
                <span className="text-sunny">EDITOR'S NOTE:</span> Reading this volume from right to left is how the author
                first learned — legends read manga before they read specs, after all.
              </p>
              <button
                onClick={() => {
                  play('whoosh');
                  toggle();
                }}
                className="pressable mt-4 border-4 border-bone bg-bone px-4 py-2 font-comic text-sm tracking-widest text-ink"
                aria-label={`Switch reading direction. Currently ${modeLabel}`}
              >
                SWITCH ORDER: {modeLabel}
              </button>
            </MangaPanel>

            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: MapPin, text: 'Based in Tokyo' },
                { icon: Coffee, text: 'Brew ratio 1:16' },
                { icon: HeartHandshake, text: 'Pairs well' },
                { icon: Crosshair, text: 'Zero-drama' },
              ].map(({ icon: Icon, text }) => (
                <MangaPanel key={text} accent="paper" shadow={false} className="p-3" skew="none">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-blood" />
                    <span className="font-body text-xs font-bold text-ink">{text}</span>
                  </div>
                </MangaPanel>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}