'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/data/projects';
import { categoryLabels } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

const CATEGORIES: Array<{ key: Project['category'] | 'all'; label: string }> = [
  { key: 'all', label: '전체' },
  ...(Object.entries(categoryLabels) as Array<[Project['category'], string]>).map(
    ([key, label]) => ({ key, label }),
  ),
];

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project['category'] | 'all'>('all');

  const filtered = useMemo(
    () => (active === 'all' ? projects : projects.filter((p) => p.category === active)),
    [projects, active],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => setActive(category.key)}
            aria-pressed={active === category.key}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              active === category.key
                ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900'
                : 'border-neutral-200 text-neutral-600 hover:border-neutral-400 dark:border-neutral-800 dark:text-neutral-400'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
}
