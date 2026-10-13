// solved.ac 배지 SVG를 받아 응답이 image/svg+xml이고 <svg로 시작할 때만 덮어쓴다.
// 실패 시 경고만 남기고 기존 파일을 유지한다 (종료 코드 0).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BADGE_URL = 'https://mazassumnida.wtf/api/generate_badge?boj=han05280505';
const OUT_DIR = path.join(process.cwd(), 'public', 'images');
const OUT_FILE = path.join(OUT_DIR, 'solvedac-badge.svg');

async function main() {
  try {
    const res = await fetch(BADGE_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }

    const contentType = res.headers.get('content-type') ?? '';
    const body = await res.text();

    if (!contentType.includes('image/svg+xml') || !body.includes('<svg')) {
      throw new Error(`예상치 못한 응답 형식 (content-type: ${contentType})`);
    }

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, body);
    console.log('[fetch-badge] solved.ac 배지 갱신 완료 → public/images/solvedac-badge.svg');
  } catch (error) {
    console.warn('[fetch-badge] solved.ac 배지 갱신 실패, 기존 파일 유지:', error.message);
  }
}

main();
