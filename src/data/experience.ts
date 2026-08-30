import type { Experience } from '../types';

export const experience: Experience[] = [
  {
    id: 'nexabyte',
    company: 'NexaByte Inc.',
    role: 'Senior Full-Stack Engineer',
    arc: 'THE OPTIMIZER ARC',
    period: '2022 — PRESENT',
    startYear: 2022,
    endYear: null,
    location: 'Tokyo, JP',
    summary:
      'Owner of the realtime platform powering a 30k-rpm feed engine and an internal design-ops studio.',
    achievements: [
      'Rebuilt the event pipeline, cutting p95 latency from 480ms → 90ms across 12 regions.',
      'Led a squad of 5; shipped a design system adopted by 3 product families.',
      'Introduced observability and chaos drills — zero P1 incidents in the last 3 quarters.',
    ],
    tech: ['TypeScript', 'React', 'Go', 'Kafka', 'Kubernetes'],
    onomatopoeia: 'ドンッ',
    accent: 'crimson',
  },
  {
    id: 'lumine',
    company: 'Lumine Robotics',
    role: 'Full-Stack Engineer',
    arc: 'ROBOT BLOOD ARC',
    period: '2020 — 2022',
    startYear: 2020,
    endYear: 2022,
    location: 'Osaka, JP',
    summary:
      'Built the control-plane dashboards and edge APIs for a fleet of warehouse robots.',
    achievements: [
      'Shipped a live telemetry view streaming 4k robot states/sec over WebSockets.',
      'Cut deploy time from 40 min to 4 min with a staged CI/CD pipeline.',
      'Designed an offline-first sync layer used by field engineers in dead-zones.',
    ],
    tech: ['React', 'Node.js', 'gRPC', 'PostgreSQL', 'AWS IoT'],
    onomatopoeia: 'ブオオ',
    accent: 'yellow',
  },
  {
    id: 'kotori',
    company: 'Studio Kotori',
    role: 'Frontend Engineer',
    arc: 'FIRST PETAL ARC',
    period: '2018 — 2020',
    startYear: 2018,
    endYear: 2020,
    location: 'Kyoto, JP',
    summary:
      'Crafted award-smelling marketing sites and web apps for a 12-person boutique studio.',
    achievements: [
      'Rebuilt the studio site with 100/100 Lighthouse scores on all four key metrics.',
      'Built a WebGL product configurator that boosted demo-to-signup by 31%.',
      'Mentored interns who now ship their own pet projects.',
    ],
    tech: ['Vue', 'TypeScript', 'WebGL', 'Sass', 'Netlify'],
    onomatopoeia: 'ササッ',
    accent: 'paper',
  },
  {
    id: 'freelance',
    company: 'Independent',
    role: 'Web Initiate',
    arc: 'ORIGIN ARC',
    period: '2016 — 2018',
    startYear: 2016,
    endYear: 2018,
    location: 'Remote',
    summary:
      'Where the story begins — freelance builds, side projects, and a thousand late-night commits.',
    achievements: [
      'Delivered 20+ client sites for local shops, cafes, and tiny publishers.',
      'Learned to talk to non-technical clients without the scrolls of jargon.',
      'Wrote the very first line of the code this portfolio calls home.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
    onomatopoeia: 'トントン',
    accent: 'white',
  },
];