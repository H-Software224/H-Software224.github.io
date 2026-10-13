import type { Project } from '@/data/projects';
import { categoryLabels } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold">{project.title}</h3>
        <span className="shrink-0 rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
          {categoryLabels[project.category]}
        </span>
      </div>
      <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{project.period}</p>

      {project.summary && (
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{project.summary}</p>
      )}

      {project.award && (
        <p className="mt-2 text-sm font-medium text-amber-600 dark:text-amber-400">
          🏆 {project.award}
        </p>
      )}

      {project.stack.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-neutral-200 px-2 py-0.5 text-xs text-neutral-600 dark:border-neutral-800 dark:text-neutral-400"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      {(project.repo || project.demo) && (
        <div className="mt-3 flex gap-3 text-sm">
          {project.repo && (
            <a href={project.repo} className="hover:underline">
              저장소 →
            </a>
          )}
          {project.demo && (
            <a href={project.demo} className="hover:underline">
              데모 →
            </a>
          )}
        </div>
      )}
    </article>
  );
}
