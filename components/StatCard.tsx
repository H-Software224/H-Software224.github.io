'use client';

import { useState } from 'react';
import type { StatImageCard } from '@/data/stats';
import { githubProfileUrl } from '@/data/stats';

export default function StatCard({ card }: { card: StatImageCard }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="rounded-lg border border-neutral-200 p-4 text-sm dark:border-neutral-800">
        <p className="font-medium text-neutral-500 dark:text-neutral-400">{card.title}</p>
        <a href={card.href ?? githubProfileUrl} className="mt-1 inline-block hover:underline">
          GitHub 프로필에서 보기 →
        </a>
      </div>
    );
  }

  const image = (
    <img
      src={card.src}
      alt={card.alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="max-w-full"
    />
  );

  return (
    <div className="rounded-lg border border-neutral-200 p-4 dark:border-neutral-800">
      <p className="mb-2 text-sm font-medium text-neutral-500 dark:text-neutral-400">{card.title}</p>
      {card.href ? <a href={card.href}>{image}</a> : image}
    </div>
  );
}
