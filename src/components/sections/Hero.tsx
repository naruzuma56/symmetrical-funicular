import { motion } from 'framer-motion';
import { ArrowDown, Sparkles, Zap } from 'lucide-react';
import { profile } from '../../data/profile';
import { KatakanaText } from '../common/KatakanaText';
import { MangaButton } from '../common/MangaButton';
import { SpeedLines } from '../common/SpeedLines';
import inkSplash from '../../assets/ink-splash.svg';
import stampSeal from '../../assets/stamp-seal.svg';
import { cn } from '../../lib/utils';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

function CoverCard() {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: -8, y: 30 }}
      animate={{ opacity: 1, rotate: -2.5, y: 0 }}
      transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-sm"
    >
      <div
        className="relative border-4 border-ink bg-bone manga-shadow-lg"
        style={{ transform: 'rotate(-2.5deg)' }}
      >
        <div className="crosshatch pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden="true" />

        <div className="flex items-center justify-between border-b-4 border-ink px-4 py-2">
          <span className="font-comic tracking-[0.3em] text-ink">VOL.1</span>
          <KatakanaText outline="none" className="text-lg text-blood" rotate={-4}>
            新刊
          </KatakanaText>
        </div>

        <div className="halftone-soft relative mx-5 mt-5 flex h-52 items-center justify-center border-4 border-ink bg-paper">
          <div className="halftone pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
          <SpeedLines color="black" innerRadius={74} rays={30} className="opacity-60" />
          <img src={inkSplash} alt="" aria-hidden="true" className="relative h-40 w-auto" />
          <KatakanaText outline="white" className="absolute bottom-1 right-2 text-4xl" rotate={-10}>
            ムサシ
          </KatakanaText>
        </div>

        <div className="relative px-5 py-4">
          <p className="font-comic text-2xl leading-none tracking-wide text-ink text-shadow-harsh">
            CODE NAME: THE FULLSTACK PHANTOM
          </p>
          <p className="mt-2 font-pop text-xs tracking-[0.25em] text-ink/70">
            {profile.name} · EST. 2016 · {profile.location}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span className="inline-block h-3 w-3 animate-blink rounded-full bg-blood" />
            <span className="font-comic text-sm tracking-[0.3em] text-blood">{profile.availability}</span>
          </div>
        </div>

        <img
          src={stampSeal}
          alt=""
          aria-hidden="true"
          className="no-print absolute -bottom-7 -right-6 h-20 w-20 animate-wiggle drop-shadow-[2px_2px_0_rgba(0,0,0,1)]"
        />
        <span className="no-print absolute -left-3 -top-3 animate-wiggle rounded-full border-4 border-ink bg-sunny px-2 py-1 font-comic text-xs tracking-widest text-ink shadow-manga-xs">
          NEW!
        </span>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-paper">
      {/* Background texture stack */}
      <div className="halftone pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden="true" />
      <SpeedLines color="black" innerRadius={170} rays={60} className="no-print opacity-[0.12]" />

      {/* Watermark name */}
      <KatakanaText
        outline="none"
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[22vw] leading-none text-ink/[0.04]"
      >
        タカハシレン
      </KatakanaText>

      {/* Floating onomatopoeia */}
      <KatakanaText
        outline="black"
        className="no-print pointer-events-none absolute right-4 top-28 animate-float text-5xl opacity-80 sm:right-16 sm:text-7xl"
        rotate={10}
      >
        ゴゴゴ
      </KatakanaText>
      <KatakanaText
        outline="none"
        className="no-print pointer-events-none absolute left-4 top-1/2 animate-float-slow text-4xl text-blood opacity-80 sm:left-10 sm:text-6xl"
        rotate={-14}
      >
        ドドド
      </KatakanaText>
      <KatakanaText
        outline="black"
        className="no-print pointer-events-none absolute bottom-36 right-8 animate-float text-5xl opacity-60 sm:text-7xl"
        rotate={-8}
      >
        ズバッ
      </KatakanaText>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-24 pt-24 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:pb-32 lg:pt-32">
        <motion.div variants={container} initial="hidden" animate="show" className="relative">
          <motion.div variants={item} className="mb-5 flex items-center gap-3">
            <span className="inline-block bg-ink px-3 py-1 font-comic text-sm tracking-[0.25em] text-bone shadow-manga-xs">
              VOL.1 · 第1話
            </span>
            <span className="inline-block border-2 border-ink bg-bone px-3 py-1 font-pop text-sm text-ink">
              {profile.nameKatakana}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-comic text-6xl leading-[0.9] tracking-wide text-ink text-shadow-harsh sm:text-8xl lg:text-[8rem]"
          >
            REN
            <span className="block text-blood text-shadow-harsh">TAKAHASHI</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-lg font-body text-lg font-semibold leading-snug text-ink/90 sm:text-xl">
            {profile.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <MangaButton href="#projects" variant="blood" size="lg" sound="stamp">
              <Sparkles className="h-5 w-5" /> VIEW WORKS
            </MangaButton>
            <MangaButton href="#contact" variant="ink" size="lg">
              <Zap className="h-5 w-5" /> HIRE ME
            </MangaButton>
          </motion.div>

          <motion.dl variants={item} className="mt-10 flex flex-wrap gap-8">
            {profile.heroStats.map((stat) => (
              <div key={stat.label}>
                <dt className="order-2 font-pop text-xs tracking-[0.2em] text-ink/60">{stat.label}</dt>
                <dd className="font-comic text-4xl text-ink">{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <CoverCard />

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className={cn(
            'no-print absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1',
            'font-pop text-xs tracking-[0.3em] text-ink/70 hover:text-ink lg:flex',
          )}
        >
          <span>READ ON</span>
          <ArrowDown className="icon-bounce h-5 w-5" />
        </motion.a>
      </div>
    </section>
  );
}