import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/projects/', label: 'Projects' },
  { href: '/stats/', label: 'Stats' },
  { href: '/blog/', label: 'Blog' },
];

export default function Header() {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-lg font-semibold">
          H-Software224
        </Link>
        <div className="flex items-center gap-4">
          <nav aria-label="주요 메뉴">
            <ul className="flex gap-4 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
