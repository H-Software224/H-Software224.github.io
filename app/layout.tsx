import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';

const SITE_URL = 'https://H-Software224.github.io';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'H-Software224',
    template: '%s',
  },
  description: '한주상(Han, Ju-Sang) 개인 페이지 & 블로그',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'H-Software224',
    url: '/',
  },
  twitter: {
    card: 'summary',
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
};

const THEME_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.classList.toggle('dark', isDark);
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col">
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <Header />
        <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
