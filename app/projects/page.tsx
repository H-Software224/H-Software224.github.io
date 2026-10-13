import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { getRepos } from '@/lib/repos';
import ProjectFilter from '@/components/ProjectFilter';
import RepoList from '@/components/RepoList';

export const metadata: Metadata = {
  title: 'Projects — H-Software224',
  description: '대표 프로젝트와 공개 저장소 전체 목록',
};

export default function ProjectsPage() {
  const repos = getRepos();

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          대표 프로젝트 {projects.length}개 (카테고리로 필터링할 수 있습니다)
        </p>
        <div className="mt-4">
          <ProjectFilter projects={projects} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">전체 저장소</h2>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          GitHub 공개 저장소 {repos.length}개 (최근 push 순)
        </p>
        <div className="mt-4">
          <RepoList repos={repos} />
        </div>
      </section>
    </div>
  );
}
