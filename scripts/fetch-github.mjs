// GitHub REST API로 H-Software224의 공개 저장소 전체를 수집해 data/generated/repos.json에 저장한다.
// 실패해도 빌드가 멈추지 않도록 에러만 로그로 남기고 종료 코드 0을 반환한다 (fallback은 data/repos.fallback.json).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const USERNAME = 'H-Software224';
const OUT_DIR = path.join(process.cwd(), 'data', 'generated');
const OUT_FILE = path.join(OUT_DIR, 'repos.json');

const FIELDS = [
  'name',
  'description',
  'language',
  'stargazers_count',
  'fork',
  'html_url',
  'homepage',
  'pushed_at',
  'created_at',
];

function pick(repo) {
  const result = {};
  for (const field of FIELDS) result[field] = repo[field];
  return result;
}

async function fetchAllRepos() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const repos = [];
  let page = 1;

  while (true) {
    const url = `https://api.github.com/users/${USERNAME}/repos?per_page=100&page=${page}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      throw new Error(`GitHub API ${res.status} ${res.statusText} (page ${page})`);
    }

    const batch = await res.json();
    if (batch.length === 0) break;

    repos.push(...batch.map(pick));
    page += 1;
  }

  return repos;
}

async function main() {
  try {
    const repos = await fetchAllRepos();
    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, JSON.stringify(repos, null, 2));
    console.log(`[fetch-github] 저장소 ${repos.length}개 수집 완료 → data/generated/repos.json`);
  } catch (error) {
    console.error('[fetch-github] 저장소 수집 실패, fallback(data/repos.fallback.json) 사용:', error.message);
  }
}

main();
