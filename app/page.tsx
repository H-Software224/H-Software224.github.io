import LinkCircles from '@/components/LinkCircles';
import { basicInfo, oneLiner, personalMessage } from '@/data/profile';

export default function Home() {
  return (
    <div className="space-y-10">
      <section>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">{basicInfo.nameKo} (Han, Ju-Sang)</h1>
          <img
            src="/images/profile_photo.jpg"
            alt={`${basicInfo.nameKo} 프로필 사진`}
            width={144}
            height={192}
            className="h-36 w-28 shrink-0 rounded-lg border border-neutral-200 object-cover object-top sm:h-48 sm:w-36 dark:border-neutral-800"
          />
        </div>
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
