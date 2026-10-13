import Link from 'next/link';
import { basicInfo, oneLiner, personalMessage } from '@/data/profile';

export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <h1 className="text-2xl font-bold">{basicInfo.nameKo} (Han, Ju-Sang)</h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">{oneLiner}</p>
      </section>

      <section className="space-y-4 border-l-2 border-neutral-200 pl-4 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
        {personalMessage.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">Links</h2>
        <ul className="mt-2 flex flex-wrap gap-4 text-sm">
          <li>
            <a href={basicInfo.github.url} className="hover:underline">
              GitHub
            </a>
          </li>
          <li>
            <a href={basicInfo.linkedin.url} className="hover:underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={basicInfo.instagram.url} className="hover:underline">
              Instagram
            </a>
          </li>
          <li>
            <a href={basicInfo.portfolioPdf.url} className="hover:underline">
              포트폴리오 PDF
            </a>
          </li>
          <li>
            <a href={basicInfo.baekjoon.url} className="hover:underline">
              백준
            </a>
          </li>
          <li>
            <Link href="/about/" className="hover:underline">
              About 자세히 보기 →
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
}
