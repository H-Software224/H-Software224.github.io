import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  description: string;
};

export type Post = PostMeta & { contentHtml: string };

function filenameToSlug(filename: string): string {
  return filename.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
}

function listPostFilenames(): string[] {
  try {
    return readdirSync(POSTS_DIR).filter((name) => name.endsWith('.md'));
  } catch {
    return [];
  }
}

function loadPost(filename: string): (PostMeta & { body: string }) | null {
  const raw = readFileSync(path.join(POSTS_DIR, filename), 'utf-8');
  const { data, content } = matter(raw);

  if (data.draft) return null;

  return {
    slug: filenameToSlug(filename),
    title: data.title,
    date: data.date,
    tags: data.tags ?? [],
    description: data.description ?? '',
    body: content,
  };
}

export function getAllPostsMeta(): PostMeta[] {
  return listPostFilenames()
    .map(loadPost)
    .filter((post): post is PostMeta & { body: string } => post !== null)
    .map(({ body, ...meta }) => meta)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPostsMeta()) {
    for (const tag of post.tags) tags.add(tag);
  }
  return [...tags].sort();
}

export function getPostsByTag(tag: string): PostMeta[] {
  return getAllPostsMeta().filter((post) => post.tags.includes(tag));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const filename = listPostFilenames().find((name) => filenameToSlug(name) === slug);
  if (!filename) return null;

  const loaded = loadPost(filename);
  if (!loaded) return null;

  const { body, ...meta } = loaded;

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(body);

  return { ...meta, contentHtml: String(file) };
}
