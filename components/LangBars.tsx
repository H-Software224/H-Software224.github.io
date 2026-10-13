import type { LanguageCount } from '@/lib/stats';

export default function LangBars({ data }: { data: LanguageCount[] }) {
  if (data.length === 0) return null;

  const max = Math.max(...data.map((item) => item.count));

  return (
    <ul className="space-y-2">
      {data.map((item) => (
        <li key={item.language}>
          <div className="flex items-baseline justify-between text-sm">
            <span>{item.language}</span>
            <span className="text-neutral-500 dark:text-neutral-400">{item.count}</span>
          </div>
          <div className="mt-1 h-2 rounded bg-neutral-100 dark:bg-neutral-900">
            <div
              className="h-2 rounded bg-[#2a78d6] dark:bg-[#3987e5]"
              style={{ width: `${(item.count / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
