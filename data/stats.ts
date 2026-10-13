// PRD 6.1 · 6.2 원본 URL. 외부 통계 이미지는 StatCard로 반복 렌더링한다.

export type StatImageCard = {
  id: string;
  title: string;
  alt: string;
  src: string;
  href?: string;
};

export const githubProfileUrl = 'https://github.com/H-Software224';
export const achievementsUrl = 'https://github.com/H-Software224?tab=achievements';
export const solvedAcProfileUrl = 'https://solved.ac/han05280505';

export const statImageCards: StatImageCard[] = [
  {
    id: 'github-stats',
    title: 'GitHub Stats',
    alt: 'H-Software224 GitHub 통계 카드',
    src: 'https://github-readme-stats-deb20.vercel.app/api?show_icons=true&theme=radical&username=H-Software224',
    href: githubProfileUrl,
  },
  {
    id: 's01-contribution-calendar',
    title: 'Contribution 캘린더',
    alt: 'H-Software224 GitHub Contribution 캘린더',
    src: 'https://ghchart.rshah.org/H-Software224',
    href: githubProfileUrl,
  },
  {
    id: 's02-top-langs',
    title: '사용 언어 비율 (GitHub)',
    alt: 'H-Software224 사용 언어 비율 카드',
    src: 'https://github-readme-stats-deb20.vercel.app/api/top-langs/?username=H-Software224&layout=compact&theme=radical',
    href: githubProfileUrl,
  },
  {
    id: 's03-streak',
    title: 'Streak',
    alt: 'H-Software224 GitHub Streak 통계',
    src: 'https://streak-stats.demolab.com?user=H-Software224&theme=radical',
    href: githubProfileUrl,
  },
];
