export type Accent = 'crimson' | 'yellow' | 'black' | 'paper' | 'white';

export type ProjectStatus = 'complete' | 'in-progress' | 'archived';

export type PanelKind = 'narration' | 'dialogue' | 'action' | 'stats' | 'quote';

export interface MangaPanel {
  kind: PanelKind;
  text: string;
  speaker?: string;
  katakana?: string;
  align?: 'left' | 'right' | 'center';
}

export interface MangaPage {
  id: string;
  panels: MangaPanel[];
  background?: 'paper' | 'bone' | 'ink' | 'crimson' | 'sunny';
  speedLines?: boolean;
  halftone?: boolean;
  pageNumber: number;
}

export interface MangaChapter {
  id: string;
  title: string;
  chapterNumber: string;
  pages: MangaPage[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  katakana: string;
  onomatopoeia: string;
  description: string;
  bullets: string[];
  tech: string[];
  tags: string[];
  status: ProjectStatus;
  year: number;
  coverAccent: Accent;
  links: ProjectLink[];
  chapters: MangaChapter[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  arc: string;
  period: string;
  startYear: number;
  endYear: number | null;
  location: string;
  summary: string;
  achievements: string[];
  tech: string[];
  onomatopoeia: string;
  accent: Accent;
}

export type SkillCategory = 'language' | 'framework' | 'database' | 'cloud' | 'design';

export interface Skill {
  id: string;
  name: string;
  katakana: string;
  category: SkillCategory;
  powerLevel: number; // 0 - 100, rendered as a manga "power gauge"
  years: number;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: number;
  rank: 'S' | 'A' | 'B' | 'C';
  title: string; // e.g. "Certified Cloud Sorcerer"
  accent: Accent;
  description: string;
  credentialUrl?: string;
}

export interface ProfileLink {
  id: string;
  label: string;
  value: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
  chapter: string;
  katakana: string;
  anchor: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  href: string;
}