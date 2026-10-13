import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { achievementsUrl, githubProfileUrl, solvedAcProfileUrl, statImageCards } from '@/data/stats';
import { getRepos } from '@/lib/repos';
import { getLanguageDistribution, getRepoSummary } from '@/lib/stats';
import { getContributions } from '@/lib/contributions';
import StatCard from '@/components/StatCard';
import LangBars from '@/components/LangBars';
import ActivityGraph from '@/components/ActivityGraph';

export const metadata: Metadata = {
  title: 'Stats — H-Software224',
  description: 'GitHub 통계, Contribution, 언어 분포, solved.ac 배지',
};

export default function StatsPage() {
  const repos = getRepos();
  const languages = getLanguageDistribution(repos);
  const summary = getRepoSummary(repos);
  const contributions = getContributions();

  const solvedBadgeExists = fs.existsSync(
    path.join(process.cwd(), 'public', 'images', 'solvedac-badge.svg'),
  );

  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold">Stats</h1>
      </section>

      <section>
        <h2 className="text-lg font-semibold">요약</h2>
        <dl className="mt-3 grid grid-cols-3 gap-4 text-center">
          <SummaryStat label="공개 저장소" value={summary.totalRepos} />
          <SummaryStat label="받은 ★" value={summary.totalStars} />
          <SummaryStat label="원본 저장소 (fork 제외)" value={summary.originalRepos} />
        </dl>
      </section>

      {contributions && contributions.length > 0 && (
        <section>
          <h2 className="text-lg font-semibold">최근 30일 활동</h2>
          <div className="mt-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
            <ActivityGraph data={contributions} />
          </div>
        </section>
      )}

      <section>
        <h2 className="text-lg font-semibold">저장소 언어 분포</h2>
        <div className="mt-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          <LangBars data={languages} />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">GitHub 통계</h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {statImageCards.map((card) => (
            <StatCard key={card.id} card={card} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">solved.ac</h2>
        <div className="mt-3 rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
          {solvedBadgeExists ? (
            <a href={solvedAcProfileUrl}>
              <img src="/images/solvedac-badge.svg" alt="solved.ac 티어 배지" loading="lazy" />
            </a>
          ) : (
            <a href={solvedAcProfileUrl} className="text-sm hover:underline">
              solved.ac 프로필 →
            </a>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Achievements</h2>
        <p className="mt-2 text-sm">
          <a href={achievementsUrl} className="hover:underline">
            GitHub Achievements 보기 →
          </a>
        </p>
      </section>

      <p className="text-xs text-neutral-400 dark:text-neutral-500">
        <a href={githubProfileUrl} className="hover:underline">
          GitHub 프로필 →
        </a>
      </p>
    </div>
  );
}

function SummaryStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <dt className="text-xs text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold">{value}</dd>
    </div>
  );
}
