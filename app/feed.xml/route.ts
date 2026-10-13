import { getAllPostsMeta } from '@/lib/posts';

export const dynamic = 'force-static';

const SITE_URL = 'https://H-Software224.github.io';

export async function GET() {
  const posts = getAllPostsMeta();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}/</link>
      <guid>${SITE_URL}/blog/${post.slug}/</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.description}]]></description>
    </item>`,
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>H-Software224</title>
    <link>${SITE_URL}</link>
    <description>한주상(Han, Ju-Sang)의 개발 블로그</description>
    <language>ko-KR</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
