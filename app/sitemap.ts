import type { MetadataRoute } from 'next';
import { getAllPostsMeta, getAllTags } from '@/lib/posts';

const SITE_URL = 'https://H-Software224.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about/', '/projects/', '/stats/', '/blog/'].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPostsMeta().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.date),
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: `${SITE_URL}/tags/${tag}/`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
