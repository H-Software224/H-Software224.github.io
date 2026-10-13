import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllTags, getPostsByTag } from '@/lib/posts';

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `#${tag} — H-Software224`,
    description: `#${tag} 태그가 달린 글 목록`,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <div>
      <h1 className="text-2xl font-bold">#{tag}</h1>

      <ul className="mt-6 space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-neutral-200 pb-6 dark:border-neutral-800">
            <Link href={`/blog/${post.slug}/`} className="text-lg font-semibold hover:underline">
              {post.title}
            </Link>
            <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
              {formatDate(post.date)}
            </p>
            {post.description && (
              <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                {post.description}
              </p>
            )}
          </li>
        ))}
      </ul>

      <Link href="/blog/" className="mt-6 inline-block text-sm hover:underline">
        ← 전체 글 보기
      </Link>
    </div>
  );
}
