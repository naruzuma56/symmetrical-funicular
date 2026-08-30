import { motion } from 'framer-motion';
import { BookOpen, ExternalLink, Github, Clock } from 'lucide-react';
import { projects } from '../../data/projects';
import { SectionHeading } from '../common/SectionHeading';
import { KatakanaText } from '../common/KatakanaText';
import { useAudio } from '../../hooks/useAudio';
import { cn } from '../../lib/utils';
import type { Accent, Project, ProjectStatus } from '../../types';

const coverStyles: Record<Accent, { bg: string; text: string; chip: string }> = {
  crimson: { bg: 'bg-blood', text: 'text-bone', chip: 'bg-bone text-ink' },
  yellow: { bg: 'bg-sunny', text: 'text-ink', chip: 'bg-ink text-bone' },
  black: { bg: 'bg-ink', text: 'text-bone', chip: 'bg-bone text-ink' },
  paper: { bg: 'bg-paper', text: 'text-ink', chip: 'bg-ink text-bone' },
  white: { bg: 'bg-bone', text: 'text-ink', chip: 'bg-ink text-bone' },
};

const statusBadge: Record<ProjectStatus, { label: string; klass: string }> = {
  complete: { label: 'COMPLETE', klass: 'bg-blood text-bone' },
  'in-progress': { label: 'IN PROGRESS', klass: 'bg-sunny text-ink animate-blink' },
  archived: { label: 'ARCHIVED', klass: 'bg-paper text-ink' },
};

interface ProjectCoverProps {
  project: Project;
  onOpen: (project: Project) => void;
}

function ProjectCover({ project, onOpen }: ProjectCoverProps) {
  const { play } = useAudio();
  const cover = coverStyles[project.coverAccent];
  const badge = statusBadge[project.status];

  const open = () => {
    play('page', { volume: 0.9 });
    onOpen(project);
  };

  return (
    <motion.article
      whileHover={{ rotate: -1.5, y: -10 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative group"
      data-ink-hover
    >
      <button type="button" onClick={open} className="block w-full text-left focus:outline-none" aria-label={`Read the volume for ${project.title}`}>
        <div className={cn('relative overflow-hidden border-4 border-ink manga-shadow-lg', cover.bg)}>
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.14]" aria-hidden="true" />
          <div className="crosshatch pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true" />

          {/* Header spine */}
          <div className="relative flex items-center justify-between border-b-4 border-ink px-4 py-2">
            <span className={cn('font-comic text-sm tracking-[0.3em]', cover.text)}>VOL.{project.year}</span>
            <span
              className={cn('rotate-3 font-comic text-sm tracking-[0.25em] shadow-manga-xs', badge.klass)}
            >
              {badge.label}
            </span>
          </div>

          {/* Body */}
          <div className="relative px-4 pb-12 pt-8 sm:px-5">
            <KatakanaText
              outline="none"
              className={cn('pointer-events-none absolute -right-1 top-2 text-6xl sm:text-7xl', project.coverAccent === 'black' || project.coverAccent === 'crimson' ? 'text-bone/20' : 'text-ink/20')}
              rotate={-9}
            >
              {project.onomatopoeia}
            </KatakanaText>

            <span className={cn('font-pop text-xs tracking-[0.25em]', cover.text)}>{project.katakana}</span>
            <h3 className={cn('mt-2 font-comic text-4xl leading-[0.95] tracking-wide sm:text-[2.75rem]', cover.text)}>
              {project.title}
            </h3>
            <p className={cn('mt-3 max-w-[26ch] font-body text-sm font-semibold leading-snug', cover.text)}>
              {project.subtitle}
            </p>
          </div>

          {/* Footer strip */}
          <div className={cn('relative flex items-center justify-between border-t-4 border-ink px-4 py-2', cover.chip)}>
            <span className="flex gap-1.5">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="border-2 border-current px-1.5 py-0.5 font-pop text-[10px]">
                  {tag}
                </span>
              ))}
            </span>
            <span className="inline-flex items-center gap-1.5 font-comic text-sm tracking-widest">
              <BookOpen className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              READ VOL
            </span>
          </div>

          {/* Hover read overlay */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-ink px-4 py-2 font-comic text-sm tracking-[0.3em] text-bone transition-transform duration-300 group-hover:translate-y-0">
            ▶ OPEN THE MAD LIBRARY ...
          </div>
        </div>
      </button>

      <div className="mt-3 flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => play('click')}
              data-ink-hover
              className="inline-flex items-center gap-1 font-pop text-xs font-bold text-ink/70 underline decoration-blood decoration-2 underline-offset-2 hover:text-ink"
            >
              {link.label === 'SOURCE' || link.label === 'GITHUB' || link.label === 'NPM' ? (
                <Github className="h-3.5 w-3.5" />
              ) : (
                <ExternalLink className="h-3.5 w-3.5" />
              )}
              {link.label}
            </a>
          ))}
        </div>
        {project.status === 'in-progress' && (
          <span className="inline-flex items-center gap-1 font-pop text-[10px] text-ink/60">
            <Clock className="h-3 w-3" /> DRAWN DAILY
          </span>
        )}
      </div>
    </motion.article>
  );
}

export function Projects({ onOpen }: { onOpen: (project: Project) => void }) {
  return (
    <section id="projects" className="relative overflow-hidden bg-paper py-20 lg:py-28">
      <div className="speed-lines-bg pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          chapter="第4話"
          title="WORKS"
          katakana="作品"
          subtitle="Six volumes, hand-drawn serverside. Every cover opens into a readable chapter."
        />

        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCover key={project.id} project={project} onOpen={onOpen} />
          ))}
        </div>

        <p className="mt-14 text-center font-pop text-xs tracking-[0.3em] text-ink/50">
          ◤ CLICK A COVER TO START READING ITS CHAPTERS ◢
        </p>
      </div>
    </section>
  );
}