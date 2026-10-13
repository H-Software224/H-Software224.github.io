# PRD — H-Software224.github.io (개인 페이지 & 블로그)

## 0. 요약 (결론)

| 항목 | 결정 |
|---|---|
| 목적 | 인적사항·경력·프로젝트 소개 + 개인 메시지/기술 블로그 + GitHub 활동 시각화 |
| 저장소 | `H-Software224/H-Software224.github.io` (Public) |
| 주소 | `https://H-Software224.github.io` |
| 기술 스택 | **Next.js (App Router) + React + TypeScript + Tailwind CSS**, `output: 'export'` 정적 내보내기 |
| 결과물 | 빌드 시 `out/` 폴더에 순수 정적 HTML·CSS·JS 생성 → GitHub Pages가 그대로 서빙 (서버 없음) |
| 배포 | Settings → Pages → Source **`GitHub Actions`** (push 시 자동 빌드·배포) |
| 블로그 | `content/posts/*.md` Markdown 파일 → 빌드 시 HTML로 변환 |
| 프로젝트 노출 | ① 직접 정리한 대표 프로젝트(`data/projects.ts`) + ② **빌드 시 GitHub API로 공개 저장소 전체 자동 수집** |
| 통계 | 기존 README GitHub Stats 카드, Contribution 캘린더, 언어 비율, Streak, 최근 활동 그래프(빌드 시 직접 생성), solved.ac 배지(빌드 시 정적 저장), 언어 분포 막대 |
| 기술 스택 표시 | 모든 기술을 아이콘 이미지로 노출, 숙련도 표기 없음 |

> **Jekyll과 차이:** Jekyll도 결과물은 정적 HTML입니다. Next.js로 바꾸면 React 컴포넌트로 개발하고, 빌드를 GitHub Actions가 맡는다는 점이 달라집니다. 배포 Source가 `Deploy from a branch` → `GitHub Actions`로 바뀝니다.

---

## 1. 배경 및 목적

| 구분 | 내용 |
|---|---|
| 배경 | GitHub 계정과 연결된 개인 공간에 인적사항, 개인 메시지, 블로그 글을 남기고자 함 |
| 목적 1 | 포트폴리오·이력서에 첨부할 단일 링크 확보 |
| 목적 2 | 개인·학부·대외활동 프로젝트를 한곳에 정리 (회사 업무 프로젝트는 노출하지 않음) |
| 목적 3 | 기존 프로필 README의 통계 시각화를 보존하고 확장 |
| 목적 4 | 비용 0원, 서버 운영 부담 0으로 유지 |

## 2. 대상 사용자

| 사용자 | 기대 행동 |
|---|---|
| 채용 담당자 / 면접관 | About·Projects·Stats에서 경력, 스택, 대표 프로젝트, 활동량 확인 |
| 동료 개발자 | 블로그 포스트 열람, 저장소로 이동 |
| 본인(운영자) | Markdown 파일 추가 → push 만으로 글 발행 |

## 3. 범위 (Scope)

### 3.1 기능 목록

| ID | 페이지/기능 | 설명 | 우선순위 |
|---|---|---|---|
| F-01 | 홈 (`/`) | 이름, 한 줄 소개, 개인 메시지, 대표 프로젝트 3개, 최근 포스트 3~5개, 외부 링크 | P0 |
| F-02 | About (`/about/`) | 인적사항·학력·경력·기술 스택(아이콘)·수상·자격증·연락처 | P0 |
| F-03 | Projects (`/projects/`) | 대표 프로젝트 카드(카테고리 필터) + 공개 저장소 전체 자동 목록 | P0 |
| F-04 | Stats (`/stats/`) | GitHub 통계·Contribution 캘린더·언어 비율·solved.ac (6절) | P0 |
| F-05 | Blog 목록 (`/blog/`) | 포스트 최신순, 날짜·태그 표시 | P0 |
| F-06 | Blog 상세 (`/blog/[slug]/`) | Markdown 렌더링, 코드 하이라이트, 이전/다음 글 | P0 |
| F-07 | 404 | 홈 링크 | P0 |
| F-08 | 반응형 | 모바일(≤ 640px) / 데스크톱 | P0 |
| F-09 | SEO 기본 | title/description/OG, `sitemap.xml`, `robots.txt` | P1 |
| F-10 | RSS | `/feed.xml` (빌드 시 정적 생성) | P1 |
| F-11 | 태그 페이지 | `/tags/[tag]/` | P1 |
| F-12 | 다크 모드 | `prefers-color-scheme` + 토글 | P2 |
| F-13 | Contribution Snake | 프로필 저장소에서 생성한 SVG 임베드 (6.3절) | P2 |
| F-14 | 저장소 목록 자동 갱신 | Actions 스케줄로 하루 1회 재빌드 | P2 |

### 3.2 Out of Scope (MVP 제외)

| 항목 | 사유 |
|---|---|
| 댓글 (giscus 등) | 2차 검토 |
| 방문자 통계 (GA 등) | 2차 검토, 개인정보 고지 필요 |
| 커스텀 도메인 | 2차 검토 |
| 검색 | 초기 포스트 수가 적음 |
| 서버 기능 (API Route 동적 처리, SSR, ISR, 미들웨어, 로그인, DB) | 정적 내보내기에서는 동작하지 않음 |

## 4. 정보 구조 (IA)

```
/                     홈
├── /about/           인적사항
├── /projects/        대표 프로젝트 + 전체 저장소
├── /stats/           GitHub·코딩 활동 시각화
├── /blog/            포스트 목록
│   └── /blog/[slug]/ 포스트 상세
├── /tags/[tag]/      (P1)
├── /feed.xml         (P1)
├── /sitemap.xml      (P1)
└── /404
```

상단 메뉴: `Home · About · Projects · Stats · Blog`

---

## 5. 콘텐츠 정의

### 5.1 기본 인적사항

| 항목 | 내용 |
|---|---|
| 이름 | 한주상 / Han, Ju-Sang |
| GitHub | [H-Software224](https://github.com/H-Software224) (Ju Sang Han) |
| 이메일 | hjs000528@gmail.com |
| 위치 | Seoul, Korea |
| 소속 | adoba 제품본부 개발팀 매니저 (GitHub 조직 [@adobaai](https://github.com/adobaai)) |
| 학력 | 경희대학교 소프트웨어융합학과 (2020.03 입학 ~ 2026.02 졸업) |
| 커리어 목표 | Data Analyst / Data Scientist / Machine Learning Engineer |
| LinkedIn | [in/h-software224](https://www.linkedin.com/in/h-software224) |
| Instagram | [jusangle.h](https://www.instagram.com/jusangle.h/) |
| 포트폴리오 PDF | [intr.pdf](https://my-canvas-portfolio.s3.ap-northeast-2.amazonaws.com/intr.pdf) |
| 백준 | [han05280505](https://solved.ac/han05280505) |

### 5.2 한 줄 소개 · 개인 메시지

| 구분 | 문구 |
|---|---|
| 한 줄 소개 | 지금도 계속 성장하고 있는 데이터 분석가입니다. 계속 새로운 것으로 AI의 기술로 LLM, ML, DL, MCP, Skills를 이용하여 Claude와 같은 LLM으로 Agent를 활용하여 해결하고 있는 개발자입니다. |

**개인 메시지 (홈 / About 상단)**

> 스무 살 이전의 저에게 컴퓨터는 문서를 만드는 도구였습니다. 코딩 동아리에서 C와 Python을 처음 배우면서, 코드로 웹과 앱을 만들고 데이터를 분석할 수 있다는 사실을 알게 되었고 그때부터 지금까지 개발을 이어오고 있습니다.
>
> 학부에서는 강의 음성과 강의자료를 비교해 전공 용어를 교정하는 서비스, 스마트폰 중독 위반을 감지해 SNS로 자동 공유하는 앱, OTT 이슈 감성 분석 같은 프로젝트를 만들었습니다. 지금은 adoba에서 개발과 기획을 함께 하고 있습니다.
>
> 앞으로도 데이터와 AI로 사람들에게 실제로 도움이 되고, 사회 문제를 푸는 서비스를 기획하고 만들고 싶습니다. 이 페이지는 그 과정을 기록하는 공간입니다.

### 5.3 경력

| 기간 | 소속 | 직급/형태 | 주요 업무 |
|---|---|---|---|
| 2026.05 ~ 현재 | adoba 제품본부 개발팀 | 매니저 (정규직) | 개발·기획 겸임 |
| 2026.02 ~ 2026.04 | adoba 제품본부 개발팀 | 인턴 (계약 만료) | 동일 |

담당 분야: 프론트엔드 개발, 백엔드 분석, 인프라·모니터링 자동화, 사내 툴링

> adoba 업무는 위 경력 요약까지만 노출합니다. 회사 프로젝트명·URL·세부 내용은 Projects를 포함한 어떤 페이지에도 노출하지 않습니다.

### 5.4 기술 스택 (아이콘 표시, 숙련도 미표기)

| 분류 | 기술 |
|---|---|
| Language | Python, TypeScript, JavaScript, Java, Kotlin, Go, Swift, C++, SQL |
| Frontend | React, Vite, React Router, Tailwind CSS, Next.js |
| Backend | FastAPI, Flask, Node.js, Express, NestJS, Spring Boot |
| Data / AI | pandas, NumPy, scikit-learn, SciPy, PyTorch, OpenCV, LangChain, LangGraph, Streamlit, Claude |
| Visualization | Matplotlib, Seaborn, Power BI |
| Database | MySQL, MongoDB |
| Cloud / DevOps | AWS, Docker, Kubernetes, Cloudflare Workers, Vercel |
| Monitoring | Checkly, Lighthouse |
| Mobile | Flutter, Android Studio, SwiftUI |
| Tools | Git, GitHub, VS Code, Claude Code, Figma, Notion, Slack, Discord, Anaconda, Google Colab, Microsoft Office, Ayrshare |

**아이콘 출처 규칙**

| 순위 | 출처 | 사용 방식 |
|---|---|---|
| 1 | [Simple Icons](https://simpleicons.org) (`simple-icons` npm 패키지) | 빌드 시 SVG를 가져와 `public/icons/`에 정적 저장 |
| 2 | 기존 프로필 README의 이미지 (`H-Software224/H-Software224/images/`) | Excel, Power BI, Matplotlib, Ayrshare, Office 365, AWS — README에서 쓰던 파일을 `public/icons/`로 복사 |
| 3 | 위 두 곳에 없는 기술 | 아이콘 없이 텍스트 배지로 표시 |

- 아이콘은 모두 **정적 파일로 저장소에 포함** (외부 CDN 실시간 호출 없음)
- 아이콘 아래 기술 이름 텍스트 표시, 숙련도·막대·별점 표시 금지

### 5.5 수상

| 시기 | 내용 | 관련 |
|---|---|---|
| 2025.08 | KCC(한국컴퓨터종합학술대회) 2025 학부생논문 최우수상 | [TermCorector](https://github.com/H-Software224/TermCorector) |
| 2025.04 | 2025 제1회 세모톤 인기투표 1위상 | — |
| 2024.11 | 2024 제1회 소프트웨어융합학과 컨퍼런스 우수상 | — |
| 2020.11 | Khuthon 2020 해커톤 격려상 | — |

### 5.6 자격증

| 취득 | 자격증 |
|---|---|
| 2025.09 | 데이터분석 준전문가(ADsP) |
| 2025.06 | TOPCIT 3수준 |
| 2024.06 | SQL 개발자(SQLD) |
| 2022.12 | 컴퓨터활용능력 1급 |
| 2010 | 워드프로세서 2급/3급 |

---

## 5.7 대표 프로젝트 (`data/projects.ts` 원본)

> 기간: 2026년 프로젝트는 2026년 기준, 그 외 확인된 기간이 없으면 GitHub 저장소 생성 월.
> 요약이 빈칸인 항목은 화면에서도 요약 없이 노출합니다.

### A. 개인 프로젝트

| 제목 | 기간 | 스택 | 요약 | 링크 |
|---|---|---|---|---|
| URL 네트워크 지연 모니터링 다중 에이전트 | 2026 | Go, MongoDB, LangChain/LangGraph, AWS EKS·Lambda·SQS, KEDA, Vite+React | URL별 5가지 방식 병렬 측정, 이상 시 AI 에이전트 원인 분석 보고서, Lark 알림, 대시보드 | [urlnetworkmonitoring.app](https://www.urlnetworkmonitoring.app/) (저장소 private) |
| Git Messenger Bot | 2026.08 | TypeScript(Next.js) → Kakao 챗봇, SwiftUI, Spring Boot, Python Claude 에이전트 | 메신저로 Git/GitHub 작업을 수행하는 자동화 서비스 | [git_message_bot_web](https://github.com/H-Software224/git_message_bot_web) |
| 보드게임/방탈출 바코드 인식 | 2026.09 | React(Vite), Node.js(Express), html5-qrcode | 게임 아이템 바코드를 스캔해 게임명·설명·제작사 조회 | [game_image_detection](https://github.com/H-Software224/game_image_detection) |
| linknamu | 2026.08 | TypeScript | | [repo](https://github.com/H-Software224/linknamu) · [demo](https://linknamu-deb20.vercel.app) |
| 포트폴리오 웹사이트 | 2026.01 | TypeScript | 웹 기반 포트폴리오 | [my_portfolio_cursor](https://github.com/H-Software224/my_portfolio_cursor) |
| railway-app | 2025.11 | Python | | [repo](https://github.com/H-Software224/railway-app) |

### B. 캡스톤 · 학술

| 제목 | 기간 | 스택 | 요약 | 링크 |
|---|---|---|---|---|
| TermCorrector | 2024.11 | Flask, TTS, PDF 추출 | 2024-2 캡스톤. 강의 음성과 강의자료 PDF 텍스트를 발음 유사도로 비교해 전공 용어 교정. **KCC 2025 학부생논문 최우수상** | [TermCorector](https://github.com/H-Software224/TermCorector) |
| ShareAddict | 2025.05 | Kotlin, Ayrshare | 2025 캡스톤. 앱 사용 규칙 위반 감지 시 DB 저장 후 SNS 자동 공유 | [ShareAddict](https://github.com/H-Software224/ShareAddict) |

### C. 해커톤 · 공모전 · 팀 프로젝트

| 제목 | 기간 | 스택 | 요약 | 링크 |
|---|---|---|---|---|
| Khuthon 2025 농업 챗봇 | 2025.05 | JavaScript, Prompt Engineering | 사용자 위치가 농업에 적합한지 설명해 주는 챗봇 | [khuthon_2025](https://github.com/H-Software224/khuthon_2025) |
| VibeStreet (Walking City) | 2025.08 | — | 2025 K-HTML 해커톤. 1인 가구 보행 활성화·녹지 이용 증진 서비스 | [VibeStreet_Walking_City](https://github.com/H-Software224/VibeStreet_Walking_City) |
| illum-AI | 2025.01 | Python, ARIMA, 추천 시스템 | GDGoC 백야해커톤 5팀 AI 파트 | [illum-AI](https://github.com/H-Software224/illum-AI) |
| WattStorming | 2025.12 | — | 2025 BDA X ANIMAION 채용연계형 공모전 | [BDA_ANIMATION_WattStorming](https://github.com/H-Software224/BDA_ANIMATION_WattStorming) |
| 2025 TEAM 1 Frontend | 2025.04 | — | 팀 프로젝트 프론트엔드 (fork) | [2025_TEAM_1_FE](https://github.com/H-Software224/2025_TEAM_1_FE) |
| 2025 KHU Project Team2 | 2025.05 | Java | 팀 프로젝트 (fork) | [2025-khu-project-team2](https://github.com/H-Software224/2025-khu-project-team2) |

### D. 데이터 분석 · AI

| 제목 | 기간 | 스택 | 요약 | 링크 |
|---|---|---|---|---|
| 난임 환자 임신 성공 예측 | 2025.01 ~ 2025.02 | Python | LG Aimers 6기. 시각화·전처리·모델링으로 성공 여부 예측 | [LGAimers_6th](https://github.com/H-Software224/LGAimers_6th) |
| OTT 이슈 감성 분석 | 2025.06 | Python | 시간·제목·내용을 직접 라벨링해 긍정/부정 지도학습 | [OTT_Sentiment_Analysis](https://github.com/H-Software224/OTT_Sentiment_Analysis) |
| 강의계획서 질문 챗봇 | 2025.07 | LangChain, Chroma DB, Streamlit | DB 저장·검색기·히스토리를 합친 Chain, 대화 요약 프롬프트 | [Langchain_Streamlit_demo](https://github.com/H-Software224/Langchain_Streamlit_demo) |
| ChecKHUMate | 2024.05 | Flask, 추천 시스템 | KHUDA 5기 심화. 기숙사 룸메이트 추천 데모 서비스 | [Demo_ChecKHUMate](https://github.com/H-Software224/Demo_ChecKHUMate) |
| 제주 특산물 분석 | 2023.12 | Jupyter, 시계열 | 제주 특산물 데이터 분석 (RMSE 평가) — ★7 | [experience_Jeju_together](https://github.com/H-Software224/experience_Jeju_together) |
| 광진구 빅데이터 | 2024.05 | Jupyter | 군집화·회귀 분석·시각화 | [Gwangjingu_bigdata](https://github.com/H-Software224/Gwangjingu_bigdata) |
| 빅데이터 키워드 추출 | 2023.02 | Jupyter, TF-IDF | 텍스트 마이닝 키워드 추출 및 시각화 (fork) | [bigdata_thunder](https://github.com/H-Software224/bigdata_thunder) |
| RFM 고객 분석 | 2025.07 | SQL | 데이터리안 SQL 43기 입문반 프로젝트 | [datarian_sql_beginner_project](https://github.com/H-Software224/datarian_sql_beginner_project) |
| 증권 데이터 분석 시스템 | 2025.11 | Python | BDA 데이터분석 실전반 9조 대표 프로젝트 | [data_9haejo](https://github.com/H-Software224/data_9haejo) |
| OP.GG 게임 데이터 분석 | 2025.09 | — | 게임 데이터 분석 자동화 | [opgg_data_api_analysis_with_app](https://github.com/H-Software224/opgg_data_api_analysis_with_app) |
| DeepAuto AI 과제 | 2025.08 | Python | 과제 테스트 | [deepauto_ai_assignment](https://github.com/H-Software224/deepauto_ai_assignment) |

### E. 학부 · 학습

| 제목 | 기간 | 스택 | 요약 | 링크 |
|---|---|---|---|---|
| 코로나19 확진자 크롤링 | 2020.09 | Jupyter, 웹 크롤링 | 2020-1 텀 프로젝트 | [repo](https://github.com/H-Software224/2020_1semester-Term-project---CORONA19-DATA-Analysis) |
| 주식 정보 검색 | 2020.10 | Jupyter, 키움 OpenAPI | 2020-2 소프트웨어융합 텀 프로젝트 | [repo](https://github.com/H-Software224/2020-2-Kyung-Hee-University-Software-Convergence-Term-Project) |
| Cloud Computing Stress Test | 2025.05 | — | 2025 클라우드 컴퓨팅 프로젝트 | [Cloud_computing_final](https://github.com/H-Software224/Cloud_computing_final) |
| Docker & Kubernetes 실습 | 2024.01 | Docker, Compose, Kubernetes | 컨테이너 실습 | [hello_docker_kubernetes](https://github.com/H-Software224/hello_docker_kubernetes) |
| CI/CD 실습 | 2025.03 | Dockerfile | CI/CD 실습 | [acc-cicd](https://github.com/H-Software224/acc-cicd) |
| KHUDA 알고리즘 스터디 | 2023.10 | — | 코딩테스트 풀이 기록 (fork) | [KHUDA-Algorithm-Study](https://github.com/H-Software224/KHUDA-Algorithm-Study) |

### 5.8 공개 저장소 자동 목록 (누락 저장소 보완)

| 항목 | 규칙 |
|---|---|
| 데이터 원천 | 빌드 시 `scripts/fetch-github.mjs` 가 GitHub REST API `GET /users/H-Software224/repos?per_page=100` 를 **모든 페이지** 호출 |
| 인증 | GitHub Actions의 `GITHUB_TOKEN` 사용 (요청 한도 확보). 로컬은 토큰 없이도 동작 |
| 저장 | `data/generated/repos.json` (빌드 산출물, 커밋하지 않음) |
| 실패 시 | 이전 성공본 `data/repos.fallback.json` 사용 → 빌드 실패하지 않도록 |
| 정렬 | `pushed_at` 최신순 |
| 표시 | 이름, 설명, 언어, ★, fork 배지, 마지막 push 일자 |
| 제외 | `H-Software224.github.io`, `H-Software224`(프로필 README) |
| 대표 프로젝트와 관계 | 5.7에 이미 있는 저장소는 "대표 프로젝트" 배지 표시. 5.7에 **없는** 저장소도 이 목록에 빠짐없이 노출 |
| 갱신 | push 시 + 매일 1회 스케줄 재빌드 (F-14) |

---

## 6. 통계 · 시각화 (`/stats/`)

### 6.1 기존 README 보존 항목

| 항목 | 표시 방식 | 출처 |
|---|---|---|
| GitHub Stats 카드 (본인 Vercel 인스턴스) | 외부 이미지 | `https://github-readme-stats-deb20.vercel.app/api?show_icons=true&theme=radical&username=H-Software224` |
| solved.ac 배지 | **정적 파일** `public/images/solvedac-badge.svg` 로 서빙 + 클릭 시 `https://solved.ac/han05280505` | 빌드 전 `scripts/fetch-badge.mjs` 가 `https://mazassumnida.wtf/api/generate_badge?boj=han05280505` 를 내려받아 저장 (매일 재빌드 시 갱신). 다운로드 실패 시 저장소에 커밋된 마지막 파일 사용 |
| Achievements | 링크 | Quickdraw, Pull Shark ×2, YOLO → [achievements 탭](https://github.com/H-Software224?tab=achievements) |

### 6.2 추가 시각화

| ID | 항목 | 무엇을 보여주나 | 방식 | 이미지/데이터 |
|---|---|---|---|---|
| S-01 | Contribution 캘린더 | GitHub 프로필의 초록 잔디 그래프와 같은 1년치 기여 칸 | 외부 이미지 (ghchart) | `https://ghchart.rshah.org/H-Software224` |
| S-02 | 사용 언어 비율 카드 | 저장소 코드 기준 언어 비율 | 외부 이미지 (본인 인스턴스) | `https://github-readme-stats-deb20.vercel.app/api/top-langs/?username=H-Software224&layout=compact&theme=radical` |
| S-03 | Streak | 총 기여 수, 현재 연속 기여 일수, 최장 연속 기여 일수 | 외부 이미지 (streak-stats) | `https://streak-stats.demolab.com?user=H-Software224&theme=radical` |
| S-04 | 최근 활동 그래프 | 최근 30일 일별 기여 수 꺾은선 그래프 | **빌드 시 직접 생성** (공용 서비스가 중단되어 교체) | 빌드 스크립트가 GitHub GraphQL `contributionsCollection` 으로 일별 기여 수를 받아 `data/generated/contributions.json` 저장 → React 컴포넌트가 SVG로 그림 |
| S-05 | 저장소 언어 분포 막대 | 공개 저장소별 주 언어 개수 | **빌드 시 직접 계산** (외부 의존 없음) | `data/generated/repos.json` 의 `language` 집계 → 가로 막대 |
| S-06 | 요약 숫자 | 공개 저장소 수, 받은 ★ 합계, fork 제외 원본 저장소 수 | 빌드 시 계산 | 동일 |

### 6.2.1 표시 확인 결과 (2026-10-13, Chrome에서 직접 로드)

| 항목 | 결과 | 크기 |
|---|---|---|
| GitHub Stats 카드 (본인 인스턴스) | 정상 | 467×195 |
| S-01 Contribution 캘린더 | 정상 | 663×104 |
| S-02 언어 비율 (본인 인스턴스) | 정상 | 300×165 |
| S-03 Streak | 정상 | 495×195 |
| S-04 activity-graph 공용 서버 | **실패** — "This deployment is temporarily paused" | — |
| solved.ac 배지 (https) | 정상 — https 주소로도 로드됨 | 350×170 |

### 6.3 Contribution Snake (P2)

| 항목 | 내용 |
|---|---|
| 생성 위치 | 프로필 저장소 `H-Software224/H-Software224` 에 GitHub Actions(Platane/snk) 추가 → `output` 브랜치에 SVG 생성 |
| 임베드 | `https://raw.githubusercontent.com/H-Software224/H-Software224/output/github-snake.svg` |

### 6.4 공통 규칙

| 규칙 | 내용 |
|---|---|
| 이미지 태그 | 외부 통계 이미지는 Next.js `<Image>` 대신 일반 `<img>` 사용 (정적 내보내기·외부 SVG 호환) |
| 지연 로딩 | `loading="lazy"`, `alt` 필수 |
| 장애 대비 | 로드 실패 시 카드를 숨기고 GitHub 프로필 링크 문구 노출 |
| 테마 | 라이트/다크 모드에서 읽히는 테마 파라미터 사용 |

---

## 7. 기술 요구사항

| 구분 | 요구사항 |
|---|---|
| 프레임워크 | Next.js (App Router), React, TypeScript — 설치 시점의 최신 안정 버전 |
| 정적 내보내기 | `next.config.ts` 에 `output: 'export'`, `trailingSlash: true`, `images: { unoptimized: true }` |
| 스타일 | Tailwind CSS |
| 블로그 | `content/posts/*.md` + `gray-matter`(front matter) + `remark`/`rehype` 계열로 HTML 변환, 코드 하이라이트 |
| 동적 경로 | `/blog/[slug]`, `/tags/[tag]` 는 `generateStaticParams` 로 빌드 시 전부 생성 |
| SEO | `metadata` API, `app/sitemap.ts`, `app/robots.ts` |
| RSS | `app/feed.xml/route.ts` + `export const dynamic = 'force-static'` |
| 금지 | SSR, ISR, 서버 액션, 미들웨어, 동적 API Route, `next/image` 최적화 (정적 내보내기 미지원) |
| 성능 | Lighthouse 4개 항목 90 이상 목표 (Stats 페이지는 외부 이미지 영향으로 Performance 예외 허용) |
| 접근성 | 시맨틱 태그, `alt`, 대비율 |

## 8. 배포 절차

| 단계 | 작업 |
|---|---|
| 1 | GitHub → `+` → New repository → `H-Software224.github.io`, Public, Add a README 체크 → Create |
| 2 | 저장소 **Settings → Pages → Build and deployment → Source: `GitHub Actions`** 선택 (드롭다운에서 고르면 즉시 저장, 별도 Save 버튼 없음) |
| 3 | 로컬 clone → PRD.md·CLAUDE.md 추가 → Claude Code로 사이트 구현 |
| 4 | `.github/workflows/deploy.yml` 포함해서 `main` push |
| 5 | Actions 탭에서 `Deploy` 워크플로 성공 확인 |
| 6 | `https://H-Software224.github.io` 접속 확인 |
| 7 | 글 발행: `content/posts/` 에 `.md` 추가 → commit → push |
| 8 | 프로필 README에 개인 페이지 링크 추가 |

## 9. 마일스톤

| 단계 | 산출물 | 완료 기준 |
|---|---|---|
| M1 | 저장소 생성 + Pages Source 설정 | Source가 GitHub Actions로 표시 |
| M2 | Next.js 골격 + 정적 내보내기 + 배포 워크플로 | `npm run build` 후 `out/` 생성, 배포 성공 |
| M3 | 홈 / About (아이콘 포함) | 5.1~5.6 반영 |
| M4 | Projects | 5.7 전체 카드 + 5.8 자동 목록 |
| M5 | Stats | 6.1·6.2 전 항목 표시 |
| M6 | Blog + 첫 포스트 | 포스트 1건 이상 배포 |
| M7 | SEO / RSS / 태그 / 다크 모드 / 스케줄 재빌드 / Snake | P1·P2 완료 |

## 10. 성공 지표

| 지표 | 목표 |
|---|---|
| 배포 | push 후 5분 이내 반영 |
| 빌드 실패 | 0건 |
| Lighthouse | Stats 제외 4개 항목 90 이상 |
| 저장소 목록 | GitHub 공개 저장소 수와 Projects 자동 목록 수 일치 (제외 2개 감안) |
| 발행 | 월 2건 이상 포스트 |

---

## 11. 검수 필요 항목

| # | 항목 | 확인 내용 |
|---|---|---|
| 1 | S-04 토큰 | 먼저 기본 `GITHUB_TOKEN` 으로 배포해 보고, S-04 카드가 숨겨지면 Fine-grained 개인 토큰(Public repositories 읽기 전용, 추가 권한 없음)을 저장소 Secret `GH_PAT` 으로 등록 |

### 확정 사항 (2026-10-13)

| 항목 | 결정 |
|---|---|
| 저장소 목록 | 5.7 대표 목록은 현재 상태로 진행, 미확인 저장소는 5.8 자동 수집으로 노출 |
| 아이콘 | Simple Icons → README 이미지 → 텍스트 배지 순서 그대로 진행 |
| solved.ac 배지 | https 주소에서 빌드 시 내려받아 정적 파일로 저장하는 방식 그대로 진행 |