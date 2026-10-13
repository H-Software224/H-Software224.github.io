import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPostsMeta, getPostBySlug } from '@/lib/posts';

export function generateStaticParams() {
  return getAllPostsMeta().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} — H-Software224`,
    description: post.description,
  };
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const metas = getAllPostsMeta(); // 최신순
  const index = metas.findIndex((p) => p.slug === slug);
  const newer = index > 0 ? metas[index - 1] : null;
  const older = index >= 0 && index < metas.length - 1 ? metas[index + 1] : null;

  return (
    <article>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
        {formatDate(post.date)}
        {post.tags.length > 0 && <> · {post.tags.join(', ')}</>}
      </p>

      <div
        className="prose prose-neutral mt-8 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      <nav className="mt-10 flex items-start justify-between gap-4 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-800">
        <div>
          {older && (
            <Link href={`/blog/${older.slug}/`} className="hover:underline">
              ← {older.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {newer && (
            <Link href={`/blog/${newer.slug}/`} className="hover:underline">
              {newer.title} →
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
