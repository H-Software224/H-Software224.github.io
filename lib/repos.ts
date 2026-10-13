import { readFileSync } from 'node:fs';
import path from 'node:path';

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  html_url: string;
  homepage: string | null;
  pushed_at: string;
  created_at: string;
};

const EXCLUDED_NAMES = new Set(['H-Software224.github.io', 'H-Software224']);

function readJson(filePath: string): Repo[] | null {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}

export function getRepos(): Repo[] {
  const generatedPath = path.join(process.cwd(), 'data', 'generated', 'repos.json');
  const fallbackPath = path.join(process.cwd(), 'data', 'repos.fallback.json');

  const repos = readJson(generatedPath) ?? readJson(fallbackPath) ?? [];

  return repos
    .filter((repo) => !EXCLUDED_NAMES.has(repo.name))
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
}
