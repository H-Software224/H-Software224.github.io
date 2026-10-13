import type { Repo } from './repos';

export type LanguageCount = { language: string; count: number };

export function getLanguageDistribution(repos: Repo[]): LanguageCount[] {
  const counts = new Map<string, number>();
  for (const repo of repos) {
    const lang = repo.language ?? '기타';
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => b.count - a.count);
}

export type RepoSummary = {
  totalRepos: number;
  totalStars: number;
  originalRepos: number;
};

export function getRepoSummary(repos: Repo[]): RepoSummary {
  return {
    totalRepos: repos.length,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    originalRepos: repos.filter((repo) => !repo.fork).length,
  };
}
