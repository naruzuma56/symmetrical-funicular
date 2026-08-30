import type { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'zanshin',
    slug: 'zanshin-labs',
    title: 'ZANSHIN LABS',
    subtitle: 'Your meetings, converted into battle plans.',
    katakana: 'ザンシンラボ',
    onomatopoeia: 'ズバッ',
    description:
      'An AI note-taker that listens to your calls like a kendo master reads an opponent — it captures decisions, flags risks, and hands you a strike-plan of action items before the meeting even ends.',
    bullets: [
      'Real-time transcription with speaker tagging and sentiment radar.',
      'Auto-generated action-item board with owners and deadlines.',
      'Zero-knowledge encryption — nobody reads your battle plans but you.',
    ],
    tech: ['React', 'TypeScript', 'WebSockets', 'OpenAI', 'PostgreSQL'],
    tags: ['AI', 'SaaS', 'Real-time'],
    status: 'complete',
    year: 2024,
    coverAccent: 'crimson',
    links: [
      { label: 'LIVE DEMO', url: 'https://example.com' },
      { label: 'SOURCE', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'ch1',
        title: 'THE MEETING THAT WOULDN\u2019T DIE',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'p1',
            pageNumber: 1,
            background: 'paper',
            speedLines: true,
            panels: [
              { kind: 'narration', text: 'Every monday, the executives gather. The clock runs. The meeting does not.', katakana: 'ゴゴゴ' },
              { kind: 'dialogue', text: 'Someone says the words "let\u2019s circle back". A developer somewhere flinches.', speaker: 'NARRATOR' },
              { kind: 'action', text: 'Ren sharpens the blade. He will never lose another hour to a recap.', katakana: 'ザシュッ' },
            ],
          },
          {
            id: 'p2',
            pageNumber: 2,
            background: 'bone',
            halftone: true,
            panels: [
              { kind: 'dialogue', text: 'The engine transcribes in real time. One stream. Zero lag. It hears everything.', speaker: 'SYSTEM' },
              { kind: 'stats', text: '4.2h of meetings → 11 action items → 0 follow-up emails needed.', katakana: 'データ' },
              { kind: 'quote', text: '"It\u2019s like having an archive that remembers what I refuse to."', speaker: 'CLIENT QUOTE' },
            ],
          },
        ],
      },
      {
        id: 'ch2',
        title: 'THE FINAL BLOW',
        chapterNumber: 'SEQUENCE 02',
        pages: [
          {
            id: 'p3',
            pageNumber: 3,
            background: 'ink',
            speedLines: true,
            panels: [
              { kind: 'action', text: 'Zanshin links into every calendar. It pre-reads the agenda and warns of ambushes before they begin.', katakana: 'ドドド' },
              { kind: 'narration', text: 'Friction dies. Decisions land. The meeting adjourns seventeen minutes early.' },
            ],
          },
          {
            id: 'p4',
            pageNumber: 4,
            background: 'crimson',
            panels: [
              { kind: 'stats', text: 'RESULTS: +38% decisions per meeting. 2.1h hours saved, per person, per week.' },
              { kind: 'quote', text: 'The meeting died. Long live the meeting.', speaker: 'REN', align: 'right' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'drift',
    slug: 'drift-doctor',
    title: 'DRIFT DOCTOR',
    subtitle: 'The code editor that heals your merge conflicts.',
    katakana: 'ドリフトドクター',
    onomatopoeia: 'ドドド',
    description:
      'A realtime collaborative editor with a surgical rewrite engine. Two developers in the same file stop stepping on each other with a conflict simulator that predicts collisions before they happen.',
    bullets: [
      'CRDT-based cursors that never drop a keystroke.',
      'Conflict predictor flags overlapping edits 200ms before impact.',
      'Pair-programming mode with shared test runner and diff teleport.',
    ],
    tech: ['React', 'Monaco', 'CRDT', 'WebRTC', 'Node.js'],
    tags: ['Developer Tools', 'Realtime'],
    status: 'complete',
    year: 2024,
    coverAccent: 'black',
    links: [
      { label: 'TRY IT', url: 'https://example.com' },
      { label: 'GITHUB', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'drift-ch1',
        title: 'TWO BLADES, ONE SWORD',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'd1',
            pageNumber: 1,
            background: 'paper',
            panels: [
              { kind: 'narration', text: 'A junior and a senior edit the same function. In the old world, git weeps.' },
              { kind: 'action', text: 'Drift Doctor merges their cursors in real time. Both types still compile.', katakana: 'ドドド' },
            ],
          },
          {
            id: 'd2',
            pageNumber: 2,
            background: 'sunny',
            halftone: true,
            panels: [
              { kind: 'dialogue', text: 'Wait... it knew we were about to collide?', speaker: 'JUNIOR DEV' },
              { kind: 'dialogue', text: 'It predicted the collision 200ms ago and merged it for us.', speaker: 'SENIOR DEV', align: 'right' },
            ],
          },
        ],
      },
      {
        id: 'drift-ch2',
        title: 'ZERO CONFLICT PROTOCOL',
        chapterNumber: 'SEQUENCE 02',
        pages: [
          {
            id: 'd3',
            pageNumber: 3,
            background: 'ink',
            speedLines: true,
            panels: [
              { kind: 'stats', text: '100 sessions. 4,800 concurrent edits. 0 lost keystrokes.', katakana: 'データ' },
              { kind: 'quote', text: 'I stopped dreading merge Tuesday. This is sorcery.', speaker: 'BETA USER' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'pulse',
    slug: 'pulse-paint',
    title: 'PULSE PAINT',
    subtitle: 'A canvas that runs on raw shader power.',
    katakana: 'パルスペイント',
    onomatopoeia: 'ゴゴゴ',
    description:
      'A WebGL painting app where every brush is a live shader. Paint with halftone dots, jet streams, or gravity wells — then export your masterpiece as lossless frames.',
    bullets: [
      'GPU compositing with 60fps fluid brushes.',
      'Halftone, ink-scatter, and bloom shader palettes.',
      'Timeline playback to record your whole stroke as a video.',
    ],
    tech: ['React', 'Three.js', 'WebGL 2', 'GLSL', 'Vite'],
    tags: ['Creative', 'WebGL'],
    status: 'in-progress',
    year: 2025,
    coverAccent: 'yellow',
    links: [
      { label: 'ALPHA', url: 'https://example.com' },
      { label: 'SOURCE', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'pulse-ch1',
        title: 'PAINTING WITH LIGHTNING',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'pu1',
            pageNumber: 1,
            background: 'bone',
            speedLines: true,
            panels: [
              { kind: 'narration', text: 'One stroke. Ten thousand triangles. The GPU barely sweats.', katakana: 'ゴゴゴ' },
              { kind: 'dialogue', text: 'It\u2019s not a brush. It\u2019s a particle cannon.', speaker: 'REN' },
            ],
          },
          {
            id: 'pu2',
            pageNumber: 2,
            background: 'sunny',
            halftone: true,
            panels: [
              { kind: 'stats', text: 'Brush presets today: 24. Shader-time budget: zero dropped frames at 60fps.' },
              { kind: 'quote', text: 'I made a manga page outline in 4 minutes.', speaker: 'ALPHA USER', align: 'right' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'kumo',
    slug: 'kumo-scheduler',
    title: 'KUMO SCHEDULER',
    subtitle: 'Distributed jobs that land on time, every time.',
    katakana: 'クモスケジューラー',
    onomatopoeia: 'クルッ',
    description:
      'A Go-native distributed scheduler that balances 100k jobs across a fleet with leaderless consensus. Retries, backoff, and a dashboard that reads like a weather radar for CPU.',
    bullets: [
      'Leaderless consensus — no single point to assassinate.',
      'Pause-and-resume across node reboots without losing a job.',
      'Built-in dashboard renders 100k job states on one canvas.',
    ],
    tech: ['Go', 'Raft', 'gRPC', 'ClickHouse', 'React'],
    tags: ['Infrastructure', 'Distributed'],
    status: 'complete',
    year: 2023,
    coverAccent: 'white',
    links: [
      { label: 'DOCS', url: 'https://example.com' },
      { label: 'GITHUB', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'kumo-ch1',
        title: 'THE CLOUD MUST OBEY',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'k1',
            pageNumber: 1,
            background: 'ink',
            speedLines: true,
            panels: [
              { kind: 'narration', text: 'One hundred thousand jobs circle the sky, each with a deadline.', katakana: 'クルッ' },
              { kind: 'action', text: 'A node dies. Not one job notices. They simply reroute.', katakana: 'スッ' },
            ],
          },
          {
            id: 'k2',
            pageNumber: 2,
            background: 'paper',
            panels: [
              { kind: 'stats', text: 'Fleet: 9 nodes. Jobs: 100,000. Downtime observed: 0.0s.' },
              { kind: 'quote', text: 'It survived a full zone outage during our demo. Sales team cheered.', speaker: 'PLATFORM LEAD', align: 'right' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'ramune',
    slug: 'ramune-cli',
    title: 'RAMUNE CLI',
    subtitle: 'The framework that makes CLIs taste like summer.',
    katakana: 'ラムネクリエイティブ',
    onomatopoeia: 'サクッ',
    description:
      'A batteries-included CLI framework for Node. Zero-config flags, autocomplete, playful help texts, and a plugin system that lets you ship a tool in an afternoon.',
    bullets: [
      'Self-documenting commands with terse, witty help text.',
      'Colored progress effects inspired by fizzy drinks.',
      'One-command scaffolding: `npx ramune make tool`.',
    ],
    tech: ['TypeScript', 'Node.js', 'Ora', 'Ink'],
    tags: ['Open Source', 'DX'],
    status: 'complete',
    year: 2022,
    coverAccent: 'paper',
    links: [
      { label: 'NPM', url: 'https://npmjs.com' },
      { label: 'SOURCE', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'ramune-ch1',
        title: 'FIZZ & AUTOMATION',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'r1',
            pageNumber: 1,
            background: 'paper',
            panels: [
              { kind: 'narration', text: 'Every CLI I tried made me read a manual. Ramune reads my mind instead.', katakana: 'サクッ' },
              { kind: 'dialogue', text: 'ramune make tool --sync → a new repo, tests, and CI, in 9 seconds.', speaker: 'REN' },
            ],
          },
          {
            id: 'r2',
            pageNumber: 2,
            background: 'sunny',
            halftone: true,
            panels: [
              { kind: 'stats', text: 'Downloads this month: 21k. Stars: 1.9k. Complaints: 0.' },
              { kind: 'quote', text: 'The --help text is funnier than most comedians.', speaker: 'MAINTAINER', align: 'right' },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'futayomi',
    slug: 'futa-yomi',
    title: 'FUTA YOMI',
    subtitle: 'The reading tracker for serialized obsessions.',
    katakana: 'フタヨミ',
    onomatopoeia: 'パラッ',
    description:
      'A beautiful tracker for manga, manhwa, and light novels. Track chapters, rate arcs, forecast release days, and never lose your place across a hundred ongoing series again.',
    bullets: [
      'Smart release calendar predicts chapter drops from history.',
      'Arc-level rating graphs to find exactly where a series peaked.',
      'Offline-first with cross-device sync when you\u2019re back online.',
    ],
    tech: ['React', 'PWA', 'IndexedDB', 'Leaflet', 'Express'],
    tags: ['Consumer', 'PWA'],
    status: 'archived',
    year: 2021,
    coverAccent: 'crimson',
    links: [
      { label: 'SITE', url: 'https://example.com' },
      { label: 'SOURCE', url: 'https://github.com' },
    ],
    chapters: [
      {
        id: 'fut-ch1',
        title: 'THE BOOK OF TRACKING',
        chapterNumber: 'SEQUENCE 01',
        pages: [
          {
            id: 'f1',
            pageNumber: 1,
            background: 'paper',
            speedLines: true,
            panels: [
              { kind: 'narration', text: 'Sixty-seven ongoing series. Thirty-two on a cliffhanger. Ren needed a brain for this.', katakana: 'パラッ' },
              { kind: 'action', text: 'Futa Yomi remembers every chapter number so he never has to.', katakana: 'ピッ' },
            ],
          },
          {
            id: 'f2',
            pageNumber: 2,
            background: 'crimson',
            panels: [
              { kind: 'stats', text: 'Series tracked: 67. Chapters logged: 4,301. Cliffh-anger casualties: 0.' },
              { kind: 'quote', text: 'I trust it more than my own memory.', speaker: 'USER #404' },
            ],
          },
        ],
      },
    ],
  },
];