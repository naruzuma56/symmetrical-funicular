import type { NavItem, ProfileLink, SocialLink } from '../types';

export const profile = {
  name: 'Ren Takahashi',
  nameKatakana: 'タカハシ・レン',
  epithet: 'The Fullstack Phantom',
  volume: 'VOL.1',
  location: 'Tokyo, JP · UTC+9',
  availability: 'OPEN FOR WORK',
  email: 'ren@takahashi.dev',
  tagline:
    'I turn raw pixels and wild ideas into battle-ready products that load fast, scale hard, and never go down without a fight.',
  heroStats: [
    { label: 'YEARS IN COMBAT', value: '10+' },
    { label: 'PROJECTS DELIVERED', value: '40+' },
    { label: 'COFFEE DEPLETED', value: '∞' },
  ],
} as const;

export const navItems: NavItem[] = [
  { id: 'hero', label: 'COVER', chapter: '第1話', katakana: '表紙', anchor: '#hero' },
  { id: 'about', label: 'ABOUT', chapter: '第2話', katakana: '自己紹介', anchor: '#about' },
  { id: 'experience', label: 'RECORD', chapter: '第3話', katakana: '戦歴', anchor: '#experience' },
  { id: 'projects', label: 'WORKS', chapter: '第4話', katakana: '作品', anchor: '#projects' },
  { id: 'skills', label: 'SKILLS', chapter: '第5話', katakana: '技', anchor: '#skills' },
  { id: 'certifications', label: 'TITLES', chapter: '第6話', katakana: '称号', anchor: '#certifications' },
  { id: 'contact', label: 'CONTACT', chapter: '第7話', katakana: '連絡', anchor: '#contact' },
] as const;

export const socials: SocialLink[] = [
  { id: 'github', label: 'GitHub', handle: '@rentakahashi', href: 'https://github.com' },
  { id: 'linkedin', label: 'LinkedIn', handle: 'in/rentakahashi', href: 'https://linkedin.com' },
  { id: 'x', label: 'X / Twitter', handle: '@ren_dev', href: 'https://x.com' },
  { id: 'discord', label: 'Discord', handle: 'ren.kojo#0001', href: 'https://discord.com' },
] as const;

export const profileLinks: ProfileLink[] = [
  { id: 'resume', label: 'RESUME (PDF)', value: 'download', href: '#contact' },
  { id: 'email', label: 'EMAIL', value: profile.email, href: `mailto:${profile.email}` },
] as const;