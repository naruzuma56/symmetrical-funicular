import type { Skill, SkillCategory } from '../types';

const languages: Skill[] = [
  { id: 'ts', name: 'TypeScript', katakana: 'タイプスクリプト', category: 'language', powerLevel: 94, years: 7 },
  { id: 'go', name: 'Go', katakana: 'ゴー', category: 'language', powerLevel: 84, years: 5 },
  { id: 'py', name: 'Python', katakana: 'パイソン', category: 'language', powerLevel: 78, years: 6 },
  { id: 'rust', name: 'Rust', katakana: 'ラスト', category: 'language', powerLevel: 68, years: 3 },
  { id: 'sql', name: 'SQL', katakana: 'エスキューエル', category: 'language', powerLevel: 88, years: 8 },
];

const frameworks: Skill[] = [
  { id: 'react', name: 'React', katakana: 'リアクト', category: 'framework', powerLevel: 96, years: 8 },
  { id: 'node', name: 'Node.js', katakana: 'ノード', category: 'framework', powerLevel: 92, years: 8 },
  { id: 'next', name: 'Next.js', katakana: 'ネクスト', category: 'framework', powerLevel: 88, years: 4 },
  { id: 'vite', name: 'Vite', katakana: 'ビート', category: 'framework', powerLevel: 86, years: 4 },
  { id: 'tailwind', name: 'Tailwind CSS', katakana: 'テイルウィンド', category: 'framework', powerLevel: 92, years: 5 },
];

const databases: Skill[] = [
  { id: 'pg', name: 'PostgreSQL', katakana: 'ポストグレ', category: 'database', powerLevel: 90, years: 7 },
  { id: 'redis', name: 'Redis', katakana: 'レディス', category: 'database', powerLevel: 84, years: 5 },
  { id: 'mongo', name: 'MongoDB', katakana: 'モンゴ', category: 'database', powerLevel: 74, years: 6 },
  { id: 'clickhouse', name: 'ClickHouse', katakana: 'クリックハウス', category: 'database', powerLevel: 70, years: 2 },
];

const cloud: Skill[] = [
  { id: 'aws', name: 'AWS', katakana: 'エイダブリューエス', category: 'cloud', powerLevel: 88, years: 6 },
  { id: 'docker', name: 'Docker', katakana: 'ドッカー', category: 'cloud', powerLevel: 92, years: 7 },
  { id: 'k8s', name: 'Kubernetes', katakana: 'クーバネティス', category: 'cloud', powerLevel: 78, years: 4 },
  { id: 'terraform', name: 'Terraform', katakana: 'テラフォーム', category: 'cloud', powerLevel: 80, years: 4 },
  { id: 'cicd', name: 'CI/CD', katakana: 'シーアイシーディー', category: 'cloud', powerLevel: 88, years: 6 },
];

const design: Skill[] = [
  { id: 'figma', name: 'Figma', katakana: 'フィグマ', category: 'design', powerLevel: 82, years: 5 },
  { id: 'motion', name: 'Motion Design', katakana: 'モーション', category: 'design', powerLevel: 85, years: 4 },
  { id: 'design-system', name: 'Design Systems', katakana: 'デザインシステム', category: 'design', powerLevel: 80, years: 4 },
  { id: 'a11y', name: 'Accessibility', katakana: 'アクセシビリティ', category: 'design', powerLevel: 82, years: 5 },
];

export const skillGroups: { category: SkillCategory; label: string; katakana: string; skills: Skill[] }[] = [
  { category: 'language', label: 'LANGUAGES', katakana: '言語', skills: languages },
  { category: 'framework', label: 'FRAMEWORKS', katakana: '武器', skills: frameworks },
  { category: 'database', label: 'DATABASES', katakana: '貯蔵庫', skills: databases },
  { category: 'cloud', label: 'CLOUD & DEV-OPS', katakana: '天空', skills: cloud },
  { category: 'design', label: 'DESIGN', katakana: '設計', skills: design },
];

export const allSkills: Skill[] = Object.values(skillGroups).flatMap((g) => g.skills);