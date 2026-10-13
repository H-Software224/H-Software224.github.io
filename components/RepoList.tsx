import type { Repo } from '@/lib/repos';
import { projects } from '@/data/projects';

const FEATURED_REPO_URLS = new Set(projects.map((p) => p.repo).filter(Boolean));

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function RepoList({ repos }: { repos: Repo[] }) {
  return (
    <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
      {repos.map((repo) => (
        <li key={repo.name} className="py-3">
          <div className="flex flex-wrap items-center gap-2">
            <a href={repo.html_url} className="font-medium hover:underline">
              {repo.name}
            </a>
            {FEATURED_REPO_URLS.has(repo.html_url) && (
              <span className="rounded-full bg-neutral-900 px-2 py-0.5 text-xs text-white dark:bg-neutral-100 dark:text-neutral-900">
                대표 프로젝트
              </span>
            )}
            {repo.fork && (
              <span className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                fork
              </span>
            )}
          </div>

          {repo.description && (
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              {repo.description}
            </p>
          )}

          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
            {repo.language && <span>{repo.language} · </span>}
            <span>★ {repo.stargazers_count} · </span>
            <span>{formatDate(repo.pushed_at)}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}
