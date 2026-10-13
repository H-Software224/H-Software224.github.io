// GitHub REST API로 공개 저장소 전체를 수집하고, GraphQL로 최근 30일 기여 수를 수집한다.
// 실패해도 빌드가 멈추지 않도록 에러만 로그로 남기고 종료 코드 0을 반환한다.
// 저장소: 실패 시 fallback(data/repos.fallback.json) 사용. 기여 수: 실패 시 S-04 카드 숨김.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const USERNAME = 'H-Software224';
const OUT_DIR = path.join(process.cwd(), 'data', 'generated');
const REPOS_FILE = path.join(OUT_DIR, 'repos.json');
const CONTRIBUTIONS_FILE = path.join(OUT_DIR, 'contributions.json');

const REPO_FIELDS = [
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

function pickRepoFields(repo) {
  const result = {};
  for (const field of REPO_FIELDS) result[field] = repo[field];
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

    repos.push(...batch.map(pickRepoFields));
    page += 1;
  }

  return repos;
}

async function fetchRecentContributions() {
  // 토큰 우선순위: GH_PAT(저장소 Secret) → GITHUB_TOKEN. 둘 다 없으면 호출하지 않는다.
  const token = process.env.GH_PAT || process.env.GITHUB_TOKEN;
  if (!token) {
    console.log('[fetch-github] GH_PAT/GITHUB_TOKEN 없음 — 최근 30일 기여 수 조회 생략 (S-04 카드 숨김)');
    return null;
  }

  const to = new Date();
  const from = new Date(to.getTime() - 30 * 24 * 60 * 60 * 1000);

  const query = `
    query ($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { login: USERNAME, from: from.toISOString(), to: to.toISOString() },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GitHub GraphQL errors: ${json.errors.map((e) => e.message).join('; ')}`);
  }

  const days = json.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .map((day) => ({ date: day.date, count: day.contributionCount }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30);

  return days;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  try {
    const repos = await fetchAllRepos();
    await writeFile(REPOS_FILE, JSON.stringify(repos, null, 2));
    console.log(`[fetch-github] 저장소 ${repos.length}개 수집 완료 → data/generated/repos.json`);
  } catch (error) {
    console.error('[fetch-github] 저장소 수집 실패, fallback(data/repos.fallback.json) 사용:', error.message);
  }

  try {
    const days = await fetchRecentContributions();
    if (days) {
      await writeFile(CONTRIBUTIONS_FILE, JSON.stringify(days, null, 2));
      console.log(`[fetch-github] 최근 30일 기여 수 ${days.length}일 수집 완료 → data/generated/contributions.json`);
    }
  } catch (error) {
    console.error('[fetch-github] 최근 30일 기여 수 수집 실패, S-04 카드 숨김:', error.message);
  }
}

main();
