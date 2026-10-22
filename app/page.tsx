import LinkCircles from '@/components/LinkCircles';
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
        <div className="mt-4">
          <LinkCircles />
        </div>
      </section>
    </div>
  );
}
