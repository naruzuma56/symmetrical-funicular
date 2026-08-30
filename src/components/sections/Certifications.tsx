import { motion } from 'framer-motion';
import { BadgeCheck, ExternalLink } from 'lucide-react';
import { certifications } from '../../data/certifications';
import { SectionHeading } from '../common/SectionHeading';
import { useAudio } from '../../hooks/useAudio';
import { cn } from '../../lib/utils';
import type { Certification, Certification as CertificationData } from '../../types';

const rankStyles: Record<CertificationData['rank'], { ring: string; fill: string; drop: string }> = {
  S: { ring: 'border-blood', fill: 'bg-blood', drop: 'text-bone' },
  A: { ring: 'border-ink', fill: 'bg-sunny', drop: 'text-ink' },
  B: { ring: 'border-ink', fill: 'bg-bone', drop: 'text-ink' },
  C: { ring: 'border-ink', fill: 'bg-ink', drop: 'text-bone' },
};

const beltBG: Record<CertificationData['accent'], string> = {
  crimson: 'bg-paper',
  yellow: 'bg-sunny',
  paper: 'bg-bone',
  white: 'bg-bone',
  black: 'bg-bone',
};

function RankStamp({ rank }: { rank: Certification['rank'] }) {
  const style = rankStyles[rank];
  return (
    <div
      className={cn(
        'relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-[5px] border-dashed',
        style.ring,
        style.fill,
      )}
    >
      <span className={cn('font-comic text-4xl leading-none', style.drop)} style={{ transform: 'rotate(-12deg)' }}>
        {rank}
      </span>
      <span className={cn('absolute -bottom-1 left-1/2 -translate-x-1/2 bg-ink px-1 font-pop text-[8px] tracking-widest text-bone')}>
        RANK
      </span>
    </div>
  );
}

function CertificationBelt({ cert, index }: { cert: CertificationData; index: number }) {
  const { play } = useAudio();

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <div className={cn('flex items-center gap-5 border-4 border-ink p-4 sm:p-5', beltBG[cert.accent])}>
        <div
          data-ink-hover
          onClick={() => play('stamp')}
          className="pressable manga-shadow-sm"
          role="img"
          aria-label={`${cert.name} — rank ${cert.rank}`}
        >
          <RankStamp rank={cert.rank} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-comic text-sm tracking-widest text-blood">{cert.title}</span>
            <span className="font-pop text-[10px] tracking-[0.2em] text-ink/50">{cert.year}</span>
          </div>
          <h3 className="mt-1 font-body text-base font-extrabold leading-tight text-ink sm:text-lg">{cert.name}</h3>
          <p className="mt-0.5 font-pop text-xs text-ink/60">{cert.issuer}</p>
          <p className="mt-2 hidden font-body text-sm font-medium leading-snug text-ink/80 sm:block">{cert.description}</p>
        </div>

        {cert.credentialUrl && (
          <a
            href={cert.credentialUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => play('click')}
            data-ink-hover
            className="no-print hidden shrink-0 flex-col items-center gap-1 border-2 border-ink bg-bone px-3 py-2 font-pop text-[10px] font-bold text-ink opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
          >
            <BadgeCheck className="h-5 w-5 text-blood" />
            VERIFY
          </a>
        )}
      </div>
    </motion.div>
  );
}

export function Certifications() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          chapter="第6話"
          title="TITLES"
          katakana="称号"
          subtitle="Seals earned from distant guilds. Hover one to inspect its provenance."
          accent="crimson"
        />
        <div className="space-y-6">
          {certifications.map((cert, i) => (
            <CertificationBelt key={cert.id} cert={cert} index={i} />
          ))}
        </div>
        <p className="mt-12 flex items-center justify-center gap-2 text-center font-pop text-xs tracking-[0.2em] text-ink/50">
          <ExternalLink className="h-3.5 w-3.5" /> SEALS ARE REAL · EGO IS FICTIONAL
        </p>
      </div>
    </section>
  );
}