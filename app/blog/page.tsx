import Link from 'next/link';
import type { Metadata } from 'next';
import { getAllPostsMeta } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Blog — H-Software224',
  description: '개발 기록과 생각을 남기는 블로그',
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function BlogPage() {
  const posts = getAllPostsMeta();

  return (
    <div>
      <h1 className="text-2xl font-bold">Blog</h1>

      {posts.length === 0 ? (
        <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
          아직 작성된 글이 없습니다.
        </p>
      ) : (
        <ul className="mt-6 space-y-6">
          {posts.map((post) => (
            <li
              key={post.slug}
              className="border-b border-neutral-200 pb-6 dark:border-neutral-800"
            >
              <Link href={`/blog/${post.slug}/`} className="text-lg font-semibold hover:underline">
                {post.title}
              </Link>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {formatDate(post.date)}
                {post.tags.length > 0 && <> · {post.tags.join(', ')}</>}
              </p>
              {post.description && (
                <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                  {post.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
