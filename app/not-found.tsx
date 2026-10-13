import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        요청하신 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link href="/" className="mt-6 text-sm hover:underline">
        홈으로 돌아가기 →
      </Link>
    </div>
  );
}
