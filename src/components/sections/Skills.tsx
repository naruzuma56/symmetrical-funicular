import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { skillGroups } from '../../data/skills';
import { SectionHeading } from '../common/SectionHeading';
import { MangaPanel } from '../common/MangaPanel';
import { KatakanaText } from '../common/KatakanaText';
import { cn } from '../../lib/utils';
import type { Skill } from '../../types';

function PowerGauge({ skill, delay }: { skill: Skill; delay: number }) {
  return (
    <li className="py-2">
      <div className="flex items-baseline justify-between gap-2">
        <div className="flex items-baseline gap-2">
          <span className="font-body text-base font-extrabold text-ink">{skill.name}</span>
          <span className="hidden font-pop text-[10px] tracking-widest text-ink/50 sm:inline">{skill.katakana}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-comic text-lg text-ink">{skill.powerLevel}</span>
          <span className="font-comic text-[10px] text-ink/50">/100</span>
        </div>
      </div>

      <div className="relative mt-1.5 h-5 border-4 border-ink bg-bone">
        <motion.div
          className="diagonal-stripes h-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.powerLevel}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          className="absolute top-1/2 z-10 h-3 w-3 -translate-y-1/2 border-2 border-ink bg-sunny"
          initial={{ left: 0 }}
          whileInView={{ left: `${skill.powerLevel}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ clipPath: 'polygon(0 0, 100% 25%, 100% 75%, 0 100%, 25% 50%)' }}
          aria-hidden="true"
        />
      </div>
      <div className="mt-1 flex justify-between font-pop text-[9px] tracking-widest text-ink/40">
        <span>0</span>
        <span>POWER</span>
        <span>100</span>
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-bone py-20 lg:py-28">
      <div className="crosshatch pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          chapter="第5話"
          title="TECHNIQUES"
          katakana="技"
          subtitle="The scroll of forbidden techniques. Power levels are inflated by hype, as is tradition."
          accent="black"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (groupIndex % 2) * 0.12 }}
            >
              <MangaPanel accent={groupIndex % 2 === 0 ? 'black' : 'yellow'} halftone className="p-5 sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-comic text-2xl tracking-wide text-ink">{group.label}</h3>
                  <KatakanaText outline="none" className="text-2xl text-blood" rotate={-6}>
                    {group.katakana}
                  </KatakanaText>
                </div>
                <ul className="divide-y-2 divide-dashed divide-ink/30">
                  {group.skills.map((skill, i) => (
                    <PowerGauge key={skill.id} skill={skill} delay={i * 0.08} />
                  ))}
                </ul>
              </MangaPanel>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <Zap className="h-4 w-4 text-blood" />
          {['SPEAK FLUENTLY', 'SHIP REGULARLY', 'READ SOURCE', 'WRITE TESTS', 'TEACH OTHERS', 'DELETE DEAD CODE'].map((trait) => (
            <span key={trait} className="border-2 border-ink bg-sunny px-3 py-1 font-pop text-xs text-ink shadow-manga-xs">
              {trait}
            </span>
          ))}
        </div>
        <p className={cn('mt-6 text-center font-comic text-sm tracking-[0.3em] text-ink/40')}>
          THE GAUGES ARE SHOWING OFF. THE COMMITS DO THE TALKING.
        </p>
      </div>
    </section>
  );
}