import type { Tech } from '@/data/tech-stack';

export default function TechIcon({ tech }: { tech: Tech }) {
  if (tech.icon.source === 'none') {
    return (
      <span className="flex h-16 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-neutral-200 px-2 py-2 text-center dark:border-neutral-800">
        <span className="text-xs font-medium">{tech.name}</span>
      </span>
    );
  }

  const src =
    tech.icon.source === 'simple-icons'
      ? `/icons/${tech.icon.slug}.svg`
      : `/icons/${tech.icon.file}`;

  return (
    <span className="flex h-16 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-neutral-200 px-2 py-2 text-center dark:border-neutral-800">
      <span className="flex h-7 w-7 items-center justify-center rounded-sm bg-white p-0.5">
        <img src={src} alt={`${tech.name} 아이콘`} width={24} height={24} loading="lazy" className="h-full w-full object-contain" />
      </span>
      <span className="text-xs">{tech.name}</span>
    </span>
  );
}
