import * as React from 'react';

export type SfxName =
  | 'page' // paper flip
  | 'click' // UI nav zap
  | 'pop' // bubble pop
  | 'stamp' // ink stamp thump
  | 'whoosh' // panel crash
  | 'powerup' // level-up jingle
  | 'thud'; // heavy landing

export interface PlayOptions {
  volume?: number;
}

interface AudioBusValue {
  play: (name: SfxName, options?: PlayOptions) => void;
  muted: boolean;
  toggleMuted: () => void;
}

const AudioBusContext = React.createContext<AudioBusValue>({
  play: () => {},
  muted: false,
  toggleMuted: () => {},
});

const MUTE_KEY = 'manga-portfolio:muted';

/* ------------------------------------------------------------------ */
/*  Tiny Web-Audio synth engine — no audio assets shipped.            */
/* ------------------------------------------------------------------ */

function createContext(): AudioContext {
  return new AudioContext();
}

function noiseBuffer(ctx: AudioContext, duration: number): AudioBuffer {
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function bell(ctx: AudioContext, master: GainNode, frequency: number, when = 0, duration = 0.15, type: OscillatorType = 'square', volume = 0.5) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(frequency, ctx.currentTime + when);
  osc.detune.setValueAtTime(Math.random() * 8, ctx.currentTime + when);
  gain.gain.setValueAtTime(volume, ctx.currentTime + when);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + when + duration);
  osc.connect(gain).connect(master);
  osc.start(ctx.currentTime + when);
  osc.stop(ctx.currentTime + when + duration);
}

function noiseSweep(ctx: AudioContext, master: GainNode, duration: number, fromHz: number, toHz: number, type: BiquadFilterType, volume = 0.4) {
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx, duration);
  const filter = ctx.createBiquadFilter();
  filter.type = type;
  filter.frequency.setValueAtTime(fromHz, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(Math.max(40, toHz), ctx.currentTime + duration);
  filter.Q.value = 0.8;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(volume, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  src.connect(filter).connect(gain).connect(master);
  src.start();
  src.stop(ctx.currentTime + duration);
}

function writeSfx(ctx: AudioContext, master: GainNode, name: SfxName) {
  switch (name) {
    case 'click':
      bell(ctx, master, 320, 0, 0.07, 'square', 0.4);
      bell(ctx, master, 200, 0.04, 0.09, 'square', 0.35);
      break;
    case 'pop':
      bell(ctx, master, 480, 0, 0.08, 'sine', 0.5);
      bell(ctx, master, 900, 0.02, 0.1, 'sine', 0.4);
      break;
    case 'page':
      noiseSweep(ctx, master, 0.24, 2200, 350, 'bandpass', 0.6);
      bell(ctx, master, 140, 0.18, 0.1, 'triangle', 0.3);
      break;
    case 'whoosh':
      noiseSweep(ctx, master, 0.45, 1200, 120, 'lowpass', 1);
      bell(ctx, master, 90, 0.3, 0.25, 'triangle', 0.5);
      break;
    case 'stamp': {
      bell(ctx, master, 120, 0, 0.16, 'sine', 0.9);
      bell(ctx, master, 84, 0.01, 0.22, 'sine', 0.9);
      noiseSweep(ctx, master, 0.08, 3000, 800, 'highpass', 0.6);
      break;
    }
    case 'powerup':
      bell(ctx, master, 392, 0, 0.14, 'square', 0.4);
      bell(ctx, master, 523, 0.09, 0.14, 'square', 0.4);
      bell(ctx, master, 659, 0.18, 0.2, 'square', 0.45);
      bell(ctx, master, 784, 0.27, 0.32, 'square', 0.45);
      break;
    case 'thud':
      bell(ctx, master, 70, 0, 0.3, 'sine', 0.9);
      noiseSweep(ctx, master, 0.12, 900, 120, 'lowpass', 0.5);
      break;
    default: {
      const exhaustive: never = name;
      throw new Error(`Unknown SFX: ${exhaustive}`);
    }
  }
}

/* ------------------------------------------------------------------ */

export function AudioBusProvider({ children }: { children: React.ReactNode }) {
  const audioRef = React.useRef<AudioContext | null>(null);
  const masterRef = React.useRef<GainNode | null>(null);
  const [muted, setMuted] = React.useState<boolean>(() => {
    try {
      return window.localStorage.getItem(MUTE_KEY) === 'true';
    } catch {
      return false;
    }
  });

  React.useEffect(() => {
    try {
      window.localStorage.setItem(MUTE_KEY, String(muted));
    } catch {
      /* private mode */
    }
  }, [muted]);

  const play = React.useCallback(
    (name: SfxName, options: PlayOptions = {}) => {
      if (muted) return;
      const AudioCtor = window.AudioContext ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtor) return;

      const ctx = audioRef.current ?? createContext();
      audioRef.current = ctx;

      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const master = masterRef.current ?? ctx.createGain();
      masterRef.current = master;
      master.gain.value = options.volume ?? 0.7;
      master.connect(ctx.destination);

      writeSfx(ctx, master, name);
    },
    [muted],
  );

  const toggleMuted = React.useCallback(() => setMuted((m) => !m), []);
  const value = React.useMemo<AudioBusValue>(() => ({ play, muted, toggleMuted }), [play, muted, toggleMuted]);

  return <AudioBusContext.Provider value={value}>{children}</AudioBusContext.Provider>;
}

export function useAudio(): AudioBusValue {
  return React.useContext(AudioBusContext);
}