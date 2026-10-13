import type { Metadata } from 'next';
import {
  awards,
  basicInfo,
  career,
  careerFields,
  careerNote,
  certificates,
  personalMessage,
} from '@/data/profile';
import { techStack } from '@/data/tech-stack';
import TechIcon from '@/components/TechIcon';

export const metadata: Metadata = {
  title: 'About — H-Software224',
  description: `${basicInfo.nameKo}(Han, Ju-Sang)의 인적사항, 경력, 기술 스택, 수상, 자격증`,
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-2xl font-bold">About</h1>
        <div className="mt-4 space-y-4 border-l-2 border-neutral-200 pl-4 text-neutral-600 dark:border-neutral-800 dark:text-neutral-400">
          {personalMessage.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">인적사항</h2>
        <dl className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <Row label="이름">
            {basicInfo.nameKo} / {basicInfo.nameEn}
          </Row>
          <Row label="GitHub">
            <a href={basicInfo.github.url} className="hover:underline">
              {basicInfo.github.label}
            </a>
          </Row>
          <Row label="이메일">{basicInfo.email}</Row>
          <Row label="위치">{basicInfo.location}</Row>
          <Row label="소속">
            {basicInfo.affiliation} (GitHub 조직{' '}
            <a href={basicInfo.affiliationOrg.url} className="hover:underline">
              {basicInfo.affiliationOrg.label}
            </a>
            )
          </Row>
          <Row label="학력">{basicInfo.education}</Row>
          <Row label="커리어 목표">{basicInfo.careerGoal}</Row>
          <Row label="LinkedIn">
            <a href={basicInfo.linkedin.url} className="hover:underline">
              {basicInfo.linkedin.label}
            </a>
          </Row>
          <Row label="Instagram">
            <a href={basicInfo.instagram.url} className="hover:underline">
              {basicInfo.instagram.label}
            </a>
          </Row>
          <Row label="포트폴리오">
            <a href={basicInfo.portfolioPdf.url} className="hover:underline">
              {basicInfo.portfolioPdf.label}
            </a>
          </Row>
          <Row label="백준">
            <a href={basicInfo.baekjoon.url} className="hover:underline">
              {basicInfo.baekjoon.label}
            </a>
          </Row>
        </dl>
      </section>

      <section>
        <h2 className="text-lg font-semibold">경력</h2>
        <ul className="mt-3 space-y-3 text-sm">
          {career.map((item) => (
            <li key={item.period} className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
              <p className="font-medium">
                {item.period} · {item.org}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400">
                {item.role} — {item.duties}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">{careerFields}</p>
        <p className="mt-2 text-xs text-neutral-400 dark:text-neutral-500">{careerNote}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">기술 스택</h2>
        <div className="mt-3 space-y-6">
          {techStack.map((category) => (
            <div key={category.category}>
              <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400">
                {category.category}
              </h3>
              <div className="mt-2 flex flex-wrap gap-3">
                {category.items.map((tech) => (
                  <TechIcon key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold">수상</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {awards.map((award) => (
            <li key={award.title}>
              <span className="text-neutral-500 dark:text-neutral-400">{award.period}</span>{' '}
              {award.title}
              {award.related && (
                <>
                  {' '}
                  (
                  <a href={award.related.url} className="hover:underline">
                    {award.related.label}
                  </a>
                  )
                </>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">자격증</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {certificates.map((cert) => (
            <li key={cert.name}>
              <span className="text-neutral-500 dark:text-neutral-400">{cert.acquired}</span>{' '}
              {cert.name}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold">연락처</h2>
        <p className="mt-3 text-sm">
          <a href={`mailto:${basicInfo.email}`} className="hover:underline">
            {basicInfo.email}
          </a>
        </p>
      </section>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-2">
      <dt className="w-24 shrink-0 text-neutral-500 dark:text-neutral-400">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
