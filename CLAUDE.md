# CLAUDE.md

이 저장소는 GitHub Pages로 배포되는 개인 페이지 & 블로그 **`H-Software224.github.io`** 입니다.
요구사항과 콘텐츠 원본은 `PRD.md`를 기준으로 합니다.

## 프로젝트 개요

| 항목 | 값 |
|---|---|
| 종류 | 정적 사이트 (개인 소개 + 프로젝트 + 통계 + 블로그) |
| 프레임워크 | Next.js (App Router) + React + TypeScript + Tailwind CSS |
| 빌드 결과 | `output: 'export'` → `out/` 폴더의 순수 정적 파일 |
| 배포 | `main` push → GitHub Actions(`.github/workflows/deploy.yml`) → GitHub Pages |
| 주소 | `https://H-Software224.github.io` (사용자 사이트이므로 `basePath` 없음) |
| GitHub 계정 | `H-Software224` |
| 언어 | 콘텐츠·주석·커밋 메시지 모두 한국어 |

## 기술 스택 & 제약

- Next.js App Router, React, TypeScript(strict), Tailwind CSS — 설치 시점의 최신 안정 버전
- **정적 내보내기 전용**. 아래 기능은 사용 금지 (빌드 실패 또는 GitHub Pages에서 동작 안 함)
  - SSR(`dynamic = 'force-dynamic'`, `cookies()`, `headers()`), ISR(`revalidate`), 서버 액션, `middleware.ts`
  - 요청 시점에 동작하는 API Route (빌드 시 정적으로 생성되는 `force-static` route만 허용)
  - `next/image` 최적화 → `images.unoptimized: true`, 외부 통계 이미지는 일반 `<img>`
- 동적 경로(`/blog/[slug]`, `/tags/[tag]`)는 반드시 `generateStaticParams` 로 전부 생성
- 외부 데이터(GitHub API)는 **빌드 전 스크립트에서만** 호출. 브라우저에서 GitHub API 호출 금지
- 서버·DB·로그인 기능 구현 금지

## `next.config.ts`

```ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

## 디렉터리 구조

```
.
├── .github/workflows/deploy.yml   # 빌드·배포 (push + 매일 1회 스케줄)
├── next.config.ts
├── package.json
├── tsconfig.json
├── tailwind / postcss 설정
├── app/
│   ├── layout.tsx                 # 공통 레이아웃, metadata, 헤더/푸터
│   ├── page.tsx                   # 홈
│   ├── about/page.tsx
│   ├── projects/page.tsx
│   ├── stats/page.tsx
│   ├── blog/page.tsx
│   ├── blog/[slug]/page.tsx       # generateStaticParams
│   ├── tags/[tag]/page.tsx        # (P1) generateStaticParams
│   ├── feed.xml/route.ts          # (P1) force-static
│   ├── sitemap.ts                 # (P1)
│   ├── robots.ts                  # (P1)
│   └── not-found.tsx
├── components/
│   ├── Header.tsx, Footer.tsx, ThemeToggle.tsx
│   ├── ProjectCard.tsx, ProjectFilter.tsx   # 필터는 'use client'
│   ├── RepoList.tsx
│   ├── StatCard.tsx               # 외부 이미지 + 실패 시 숨김 ('use client')
│   ├── LangBars.tsx
│   └── TechIcon.tsx               # 아이콘 or 텍스트 배지
├── data/
│   ├── profile.ts                 # PRD 5.1~5.6 (인적사항·수상·자격증)
│   ├── tech-stack.ts              # PRD 5.4 (분류 → 기술 → 아이콘 경로)
│   ├── projects.ts                # PRD 5.7
│   ├── stats.ts                   # PRD 6.1·6.2 이미지 URL
│   ├── repos.fallback.json        # 저장소 목록 마지막 성공본 (커밋함)
│   └── generated/repos.json       # 빌드 시 생성 (커밋 안 함)
├── content/posts/                 # 블로그 Markdown
├── lib/
│   ├── posts.ts                   # gray-matter + remark/rehype
│   └── repos.ts                   # generated → fallback 순으로 읽기
├── scripts/
│   ├── fetch-github.mjs           # GitHub API 저장소 전체 수집 + 최근 30일 기여 수(GraphQL)
│   ├── fetch-badge.mjs            # solved.ac 배지 SVG 다운로드
│   └── copy-icons.mjs             # simple-icons → public/icons
├── public/
│   ├── icons/                     # 기술 스택 아이콘 SVG/PNG
│   ├── images/solvedac-badge.svg  # fetch-badge.mjs 가 갱신, 마지막 성공본 커밋
│   └── .nojekyll
├── PRD.md
├── CLAUDE.md
└── README.md
```

## npm 스크립트

```json
{
  "scripts": {
    "dev": "next dev",
    "prebuild": "node scripts/fetch-github.mjs && node scripts/fetch-badge.mjs && node scripts/copy-icons.mjs",
    "build": "next build",
    "preview": "npx serve out"
  }
}
```

| 목적 | 명령 |
|---|---|
| 의존성 설치 | `npm install` |
| 개발 서버 | `npm run dev` → http://localhost:3000 |
| 정적 빌드 | `npm run build` → `out/` 생성 |
| 빌드 결과 미리보기 | `npm run preview` |

## 배포 워크플로 (`.github/workflows/deploy.yml`)

- 트리거: `push`(main), `workflow_dispatch`, `schedule`(매일 1회, KST 새벽 시간대)
- 권한: `contents: read`, `pages: write`, `id-token: write`
- 단계: checkout → setup-node(LTS, npm 캐시) → `npm ci` → `npm run build`(env `GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}`, `GH_PAT: ${{ secrets.GH_PAT }}`) → `actions/configure-pages` → `actions/upload-pages-artifact`(path: `out`) → `actions/deploy-pages`
- 각 action은 공식 최신 메이저 버전 사용
- 동시 실행 제한: `concurrency: { group: pages, cancel-in-progress: false }`

## 데이터 규칙

### `scripts/fetch-github.mjs`

- `GET https://api.github.com/users/H-Software224/repos?per_page=100&page=N` 을 빈 배열이 나올 때까지 반복
- `GITHUB_TOKEN` 환경변수가 있으면 `Authorization: Bearer` 헤더 사용, 없으면 비인증 호출
- 필요한 필드만 저장: `name, description, language, stargazers_count, fork, html_url, homepage, pushed_at, created_at`
- 성공 시 `data/generated/repos.json` 저장. 실패 시 에러를 로그로 남기고 **종료 코드 0** (빌드는 fallback으로 계속)
- `data/repos.fallback.json` 은 로컬에서 성공했을 때 사용자가 갱신·커밋

### `scripts/fetch-badge.mjs`

- `https://mazassumnida.wtf/api/generate_badge?boj=han05280505` 를 받아 응답이 `image/svg+xml` 이고 `<svg` 로 시작할 때만 `public/images/solvedac-badge.svg` 덮어쓰기
- 실패 시 경고만 출력하고 종료 코드 0 (기존 파일 유지)

### 최근 30일 기여 수 (`fetch-github.mjs` 안)

- 토큰 우선순위: `GH_PAT`(사용자가 등록한 Secret, 있을 때) → `GITHUB_TOKEN`. 둘 다 없으면 호출하지 않음
- GraphQL `user(login: "H-Software224") { contributionsCollection(from, to) { contributionCalendar { weeks { contributionDays { date contributionCount } } } } }` 호출
- 최근 30일만 잘라 `data/generated/contributions.json` 저장, 실패 시 S-04 카드 숨김
- `GH_PAT` 은 Fine-grained 토큰, Repository access = Public repositories (read-only), 추가 권한 없음. 값은 코드·로그에 절대 출력하지 않음

### `data/projects.ts`

PRD 5.7을 그대로 옮긴다. 카테고리 키는 아래 6개만 사용.

| category | 의미 |
|---|---|
| `personal` | 개인 프로젝트 |
| `capstone` | 캡스톤 · 학술 |
| `hackathon` | 해커톤 · 공모전 · 팀 |
| `data-ai` | 데이터 분석 · AI |
| `study` | 학부 · 학습 |

```ts
export type Project = {
  title: string;
  category: 'personal' | 'capstone' | 'hackathon' | 'data-ai' | 'study';
  period: string;          // '2024.11', '2025.01 ~ 2025.02', '2026'
  stack: string[];
  summary?: string;        // PRD에서 빈칸이면 생략 → 카드에서 요약 줄 미표시
  repo?: string;
  demo?: string;
  award?: string;          // 예: 'KCC 2025 학부생논문 최우수상'
  featured?: boolean;      // 홈 노출 (최대 3개)
};
```

- 링크 없는 항목(private 저장소)은 `repo` 생략 → 링크 버튼 미표시
- **adoba 회사 업무 프로젝트는 어떤 페이지에도 넣지 않음.** adoba는 About·홈의 경력 요약(PRD 5.3)에서만 언급

### 저장소 자동 목록 (`RepoList.tsx`)

- 원천: `lib/repos.ts` (generated → fallback 순)
- 제외: `H-Software224.github.io`, `H-Software224`
- 정렬: `pushed_at` 내림차순
- 표시: name, description(없으면 생략), language, ★, fork 배지, pushed_at(`YYYY.MM.DD`)
- `projects.ts` 의 `repo` URL과 일치하면 "대표 프로젝트" 배지

### 기술 스택 아이콘 (`data/tech-stack.ts`, `scripts/copy-icons.mjs`)

- 아이콘 우선순위: ① `simple-icons` npm 패키지 → ② 기존 README 이미지(`https://github.com/H-Software224/H-Software224/raw/main/images/` 의 excel, power-bi, matplotlib, Ayrshare, office-365, aws) → ③ 텍스트 배지
- `copy-icons.mjs` 는 `tech-stack.ts` 의 slug마다 simple-icons에 존재하는지 확인 후 `public/icons/<slug>.svg` 로 복사, 없는 slug는 콘솔에 목록 출력
- README 이미지는 최초 1회 수동으로 `public/icons/` 에 저장해 커밋 (빌드 중 외부 다운로드 금지)
- **숙련도 표시 금지** (막대, 별점, %, 상/중/하 모두)
- 다크 모드에서 단색 아이콘이 안 보이면 `currentColor` 또는 밝은 배경 칩으로 처리

### 통계 (`data/stats.ts`, `stats/page.tsx`)

- PRD 6.1·6.2의 URL을 `data/stats.ts` 에 정의, `StatCard` 로 반복 렌더링
- `<img loading="lazy" alt="...">`, `onError` 시 카드 숨기고 프로필 링크 표시
- GitHub Stats 카드는 **`github-readme-stats-deb20.vercel.app` 본인 인스턴스 URL 유지**
- solved.ac 배지는 `public/images/solvedac-badge.svg` 정적 파일 사용, 파일이 없으면 "solved.ac 프로필" 텍스트 링크로 대체
- S-04 최근 활동 그래프는 외부 이미지가 아니라 `data/generated/contributions.json` 으로 직접 그린 SVG (공용 activity-graph 서버 사용 금지 — 중단 상태 확인됨)
- S-05 언어 분포·S-06 요약 숫자는 빌드 시 `repos` 데이터로 계산 (language null → "기타")

## 포스트 규칙 (`content/posts/`)

- 파일명: `YYYY-MM-DD-영문-slug.md` (한글 파일명 금지). URL slug는 날짜를 뺀 부분

```yaml
---
title: "제목"
date: "2026-10-13T18:00:00+09:00"
tags: [tag1, tag2]
description: "목록과 OG에 표시될 한 줄 설명"
draft: false
---
```

- `draft: true` 는 빌드에서 제외
- 이미지: `public/images/posts/<slug>/`, 본문에서 `/images/posts/<slug>/파일명` 으로 참조

## 코딩 규칙

- 서버 컴포넌트 기본, 상호작용이 필요한 컴포넌트만 `'use client'`
- 콘텐츠는 `data/`·`content/` 에서 읽기 (컴포넌트에 인적사항 하드코딩 금지)
- 내부 링크는 `next/link`, 경로는 trailing slash 형태(`/about/`)
- 시맨틱 태그, 이미지 `alt` 필수, 반응형 기준점 640px, 모바일 우선
- 다크 모드: Tailwind `dark:` + `prefers-color-scheme` 기본값, 토글 값은 `localStorage`(try/catch)
- 외부 리소스는 `https://` 만 사용

## 작업 원칙 (Claude)

- PRD에 없는 기능은 임의로 추가하지 말고 먼저 제안
- 인적사항·연락처·프로젝트 설명은 PRD와 사용자가 준 값만 사용, 추측 금지 (PRD에서 빈칸이면 빈칸 유지)
- 변경 후 `npm run build` 로 정적 빌드 성공 확인
- `node_modules/`, `.next/`, `out/`, `data/generated/`, `.env*` 는 커밋하지 않음 (`.gitignore`)
- 커밋 메시지: `feat: ...`, `fix: ...`, `post: ...`, `style: ...`, `docs: ...`, `data: ...`, `ci: ...`

## 배포 체크리스트

1. `npm run build` 성공, `out/index.html` 존재
2. `main` 브랜치 push
3. Actions 탭의 Deploy 워크플로 성공 확인
4. `https://H-Software224.github.io` 확인
5. `/projects/` 자동 목록 개수, `/stats/` 이미지, 아이콘 표시 확인