---
title: "GitHub Pages 블로그를 시작하며"
date: "2026-10-13T21:00:00+09:00"
tags: [블로그, Next.js]
description: "Next.js 정적 내보내기로 GitHub Pages 개인 페이지와 블로그를 만든 이유와 과정"
draft: false
---

오랫동안 GitHub 프로필 README에 소개와 통계 카드만 올려두고 지내다가, 이번에 제대로 된 개인 페이지를 만들었습니다. 이름도 `H-Software224.github.io`로, GitHub 계정과 그대로 묶여 있는 주소입니다.

## 왜 지금 블로그를 시작했나

학부에서 강의 음성과 강의자료를 비교해 전공 용어를 교정하는 서비스(TermCorrector), 스마트폰 사용 습관을 감지해 SNS로 공유하는 앱(ShareAddict), OTT 이슈 감성 분석 같은 프로젝트를 해왔고, 지금은 adoba에서 개발과 기획을 함께 하고 있습니다. 문제는 이 과정이 GitHub 저장소 여기저기에 흩어져 있었다는 점입니다. 포트폴리오로 보여주기도, 제가 다시 돌아보기도 불편했습니다.

그래서 인적사항·경력·대표 프로젝트·GitHub 통계를 한 곳에 모으고, 그 옆에 기록을 남길 수 있는 블로그를 붙이기로 했습니다.

## 기술적으로 고른 것들

Jekyll 대신 **Next.js(App Router) + TypeScript + Tailwind CSS**를 골랐습니다. 결과물은 똑같이 정적 HTML이지만, 평소 쓰는 스택으로 컴포넌트 단위로 작성할 수 있다는 점이 컸습니다. 빌드 설정은 이렇게 간단합니다.

```ts
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

`output: 'export'`로 빌드하면 `out/` 폴더에 순수 정적 파일만 남고, GitHub Actions가 그걸 그대로 GitHub Pages에 올려줍니다. 서버도, DB도, 로그인도 없습니다. 그만큼 유지보수에 신경 쓸 일이 줄어듭니다.

## 지금 사이트에 있는 것들

- **About** — 인적사항, 경력, 기술 스택(아이콘), 수상, 자격증
- **Projects** — 직접 정리한 대표 프로젝트와, 빌드 시 GitHub API로 긁어온 공개 저장소 전체 목록
- **Stats** — GitHub 통계 카드, 최근 30일 기여 그래프, 저장소 언어 분포, solved.ac 배지
- **Blog** — 지금 쓰고 있는 이 글이 첫 번째 포스트입니다

## 앞으로 쓸 내용

거창한 각오보다는, 프로젝트를 만들면서 막혔던 부분과 풀어낸 방법, 데이터 분석·AI 쪽으로 공부하면서 정리한 내용을 가볍게 남겨보려 합니다. 다음 글부터는 조금 더 기술적인 내용으로 채워보겠습니다.
