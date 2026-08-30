import { motion } from 'framer-motion';
import { CalendarDays, MapPin, ShieldCheck } from 'lucide-react';
import { experience } from '../../data/experience';
import { SectionHeading } from '../common/SectionHeading';
import { MangaPanel } from '../common/MangaPanel';
import { KatakanaText } from '../common/KatakanaText';
import { cn } from '../../lib/utils';
import type { Experience as ExperienceData } from '../../types';

const accentText: Record<ExperienceData['accent'], string> = {
  crimson: 'text-blood',
  yellow: 'text-ink',
  paper: 'text-ink',
  white: 'text-ink',
  black: 'text-ink',
};

function ExperienceRow({ entry, index }: { entry: ExperienceData; index: number }) {
  const onLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
      className="relative lg:grid lg:grid-cols-2 lg:gap-16"
    >
      {/* Centre marker */}
      <div className="absolute left-4 top-6 z-10 hidden h-5 w-5 rotate-45 border-4 border-ink bg-sunny lg:left-1/2 lg:block lg:-translate-x-1/2 lg:bg-blood" aria-hidden="true" />

      <div
        className={cn(
          'mb-8 pl-12 lg:mb-16 lg:pl-0',
          onLeft ? 'lg:col-start-1 lg:pr-4' : 'lg:col-start-2 lg:pl-4',
        )}
      >
        <MangaPanel
          accent={entry.accent}
          halftone={onLeft}
          onomatopoeia={entry.onomatopoeia}
          className="p-5 sm:p-6"
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="border-2 border-ink bg-bone px-2 py-0.5 font-pop text-[11px] tracking-[0.2em] text-ink">
              BATTLE DISK {String(index + 1).padStart(2, '0')}
            </span>
            <span className={cn('font-comic text-sm tracking-widest', accentText[entry.accent])}>{entry.arc}</span>
            {entry.endYear === null && (
              <span className="animate-blink ml-auto border-2 border-ink bg-blood px-2 py-0.5 font-comic text-xs text-bone">
                ACTIVE
              </span>
            )}
          </div>

          <h3 className="mt-3 font-comic text-3xl leading-none tracking-wide text-ink">{entry.role}</h3>
          <p className="mt-1 font-body text-base font-extrabold text-ink/80">{entry.company}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-pop text-xs text-ink/70">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" /> {entry.period}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {entry.location}
            </span>
          </div>

          <p className="mt-4 font-body text-sm font-semibold leading-relaxed text-ink/85">{entry.summary}</p>

          <ul className="mt-4 space-y-2">
            {entry.achievements.map((achievement) => (
              <li key={achievement} className="flex gap-2 font-body text-sm font-medium text-ink/90">
                <span className="shrink-0 font-comic text-blood">▸</span>
                <span>{achievement}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {entry.tech.map((tech) => (
              <span key={tech} className="border-2 border-ink bg-sunny px-2 py-0.5 font-pop text-[11px] text-ink">
                {tech}
              </span>
            ))}
          </div>
        </MangaPanel>
      </div>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="第3話"
          title="BATTLE RECORD"
          katakana="戦歴"
          subtitle="Four story arcs. Four chapters of shipping things that refused to break."
        />

        <div className="relative">
          <div className="absolute left-[23px] top-0 hidden h-full w-1 bg-ink lg:left-1/2 lg:-translate-x-1/2 lg:block" aria-hidden="true" />
          {experience.map((entry, index) => (
            <ExperienceRow key={entry.id} entry={entry} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-2 flex items-center justify-center gap-2"
        >
          <KatakanaText outline="none" className="text-2xl text-ink/30" rotate={-6}>
            つづく
          </KatakanaText>
          <span className="inline-flex items-center gap-1.5 font-pop text-xs tracking-[0.25em] text-ink/50">
            <ShieldCheck className="h-4 w-4 text-blood" /> VERIFIED BY EVERY FORMER BOSS (CHIEFLY RELUCTANTLY)
          </span>
        </motion.div>
      </div>
    </section>
  );
}