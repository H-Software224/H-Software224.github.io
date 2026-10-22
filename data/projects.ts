// PRD 5.7 원본. adoba 회사 업무 프로젝트는 어떤 항목에도 포함하지 않는다.

export type Project = {
  title: string;
  category: 'personal' | 'capstone' | 'hackathon' | 'data-ai' | 'study';
  period: string;
  stack: string[];
  summary?: string;
  repo?: string;
  demo?: string;
  award?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  // A. 개인 프로젝트
  {
    title: 'URL 네트워크 지연 모니터링 다중 에이전트',
    category: 'personal',
    period: '2026',
    stack: ['Go', 'MongoDB', 'LangChain/LangGraph', 'AWS EKS·Lambda·SQS', 'KEDA', 'Vite+React'],
    summary: 'URL별 5가지 방식 병렬 측정, 이상 시 AI 에이전트 원인 분석 보고서, Lark 알림, 대시보드',
    demo: 'https://www.urlnetworkmonitoring.app/',
  },
  {
    title: 'Git Messenger Bot',
    category: 'personal',
    period: '2026.08',
    stack: ['TypeScript(Next.js) → Kakao 챗봇', 'SwiftUI', 'Spring Boot', 'Python Claude 에이전트'],
    summary: '메신저로 Git/GitHub 작업을 수행하는 자동화 서비스',
    repo: 'https://github.com/H-Software224/git_message_bot_web',
  },
  {
    title: '보드게임/방탈출 바코드 인식',
    category: 'personal',
    period: '2026.09',
    stack: ['React(Vite)', 'Node.js(Express)', 'html5-qrcode'],
    summary: '게임 아이템 바코드를 스캔해 게임명·설명·제작사 조회',
    repo: 'https://github.com/H-Software224/game_image_detection',
  },

  // B. 캡스톤 · 학술
  {
    title: 'TermCorrector',
    category: 'capstone',
    period: '2024.11',
    stack: ['Flask', 'TTS', 'PDF 추출'],
    summary: '2024-2 캡스톤. 강의 음성과 강의자료 PDF 텍스트를 발음 유사도로 비교해 전공 용어 교정.',
    repo: 'https://github.com/H-Software224/TermCorector',
    award: 'KCC 2025 학부생논문 최우수상',
  },
  {
    title: 'ShareAddict',
    category: 'capstone',
    period: '2025.05',
    stack: ['Kotlin', 'Ayrshare'],
    summary: '2025 캡스톤. 앱 사용 규칙 위반 감지 시 DB 저장 후 SNS 자동 공유',
    repo: 'https://github.com/H-Software224/ShareAddict',
  },

  // C. 해커톤 · 공모전 · 팀 프로젝트
  {
    title: 'Khuthon 2025 농업 챗봇',
    category: 'hackathon',
    period: '2025.05',
    stack: ['JavaScript', 'Prompt Engineering'],
    summary: '사용자 위치가 농업에 적합한지 설명해 주는 챗봇',
    repo: 'https://github.com/H-Software224/khuthon_2025',
  },
  {
    title: 'VibeStreet (Walking City)',
    category: 'hackathon',
    period: '2025.08',
    stack: [],
    summary: '2025 K-HTML 해커톤. 1인 가구 보행 활성화·녹지 이용 증진 서비스',
    repo: 'https://github.com/H-Software224/VibeStreet_Walking_City',
  },
  {
    title: 'illum-AI',
    category: 'hackathon',
    period: '2025.01',
    stack: ['Python', 'ARIMA', '추천 시스템'],
    summary: 'GDGoC 백야해커톤 5팀 AI 파트',
    repo: 'https://github.com/H-Software224/illum-AI',
  },
  {
    title: '2025 TEAM 1 Frontend',
    category: 'hackathon',
    period: '2025.04',
    stack: [],
    summary: '팀 프로젝트 프론트엔드 (fork)',
    repo: 'https://github.com/H-Software224/2025_TEAM_1_FE',
  },
  {
    title: '2025 KHU Project Team2',
    category: 'hackathon',
    period: '2025.05',
    stack: ['Java'],
    summary: '팀 프로젝트 (fork)',
    repo: 'https://github.com/H-Software224/2025-khu-project-team2',
  },

  // D. 데이터 분석 · AI
  {
    title: '난임 환자 임신 성공 예측',
    category: 'data-ai',
    period: '2025.01 ~ 2025.02',
    stack: ['Python'],
    summary: 'LG Aimers 6기. 시각화·전처리·모델링으로 성공 여부 예측',
    repo: 'https://github.com/H-Software224/LGAimers_6th',
  },
  {
    title: 'OTT 이슈 감성 분석',
    category: 'data-ai',
    period: '2025.06',
    stack: ['Python'],
    summary: '시간·제목·내용을 직접 라벨링해 긍정/부정 지도학습',
    repo: 'https://github.com/H-Software224/OTT_Sentiment_Analysis',
  },
  {
    title: '강의계획서 질문 챗봇',
    category: 'data-ai',
    period: '2025.07',
    stack: ['LangChain', 'Chroma DB', 'Streamlit'],
    summary: 'DB 저장·검색기·히스토리를 합친 Chain, 대화 요약 프롬프트',
    repo: 'https://github.com/H-Software224/Langchain_Streamlit_demo',
  },
  {
    title: '제주 특산물 분석',
    category: 'data-ai',
    period: '2023.12',
    stack: ['Jupyter', '시계열'],
    summary: '제주 특산물 데이터 분석 (RMSE 평가) — ★7',
    repo: 'https://github.com/H-Software224/experience_Jeju_together',
  },
  {
    title: '광진구 빅데이터',
    category: 'data-ai',
    period: '2024.05',
    stack: ['Jupyter'],
    summary: '군집화·회귀 분석·시각화',
    repo: 'https://github.com/H-Software224/Gwangjingu_bigdata',
  },
  {
    title: '빅데이터 키워드 추출',
    category: 'data-ai',
    period: '2023.02',
    stack: ['Jupyter', 'TF-IDF'],
    summary: '텍스트 마이닝 키워드 추출 및 시각화 (fork)',
    repo: 'https://github.com/H-Software224/bigdata_thunder',
  },
  {
    title: 'RFM 고객 분석',
    category: 'data-ai',
    period: '2025.07',
    stack: ['SQL'],
    summary: '데이터리안 SQL 43기 입문반 프로젝트',
    repo: 'https://github.com/H-Software224/datarian_sql_beginner_project',
  },
  {
    title: '증권 데이터 분석 시스템',
    category: 'data-ai',
    period: '2025.11',
    stack: ['Python'],
    summary: 'BDA 데이터분석 실전반 9조 대표 프로젝트',
    repo: 'https://github.com/H-Software224/data_9haejo',
  },
  {
    title: 'DeepAuto AI 과제',
    category: 'data-ai',
    period: '2025.08',
    stack: ['Python'],
    summary: '과제 테스트',
    repo: 'https://github.com/H-Software224/deepauto_ai_assignment',
  },

  // E. 학부 · 학습
  {
    title: '코로나19 확진자 크롤링',
    category: 'study',
    period: '2020.09',
    stack: ['Jupyter', '웹 크롤링'],
    summary: '2020-1 텀 프로젝트',
    repo: 'https://github.com/H-Software224/2020_1semester-Term-project---CORONA19-DATA-Analysis',
  },
  {
    title: '주식 정보 검색',
    category: 'study',
    period: '2020.10',
    stack: ['Jupyter', '키움 OpenAPI'],
    summary: '2020-2 소프트웨어융합 텀 프로젝트',
    repo: 'https://github.com/H-Software224/2020-2-Kyung-Hee-University-Software-Convergence-Term-Project',
  },
  {
    title: 'Cloud Computing Stress Test',
    category: 'study',
    period: '2025.05',
    stack: [],
    summary: '2025 클라우드 컴퓨팅 프로젝트',
    repo: 'https://github.com/H-Software224/Cloud_computing_final',
  },
  {
    title: 'Docker & Kubernetes 실습',
    category: 'study',
    period: '2024.01',
    stack: ['Docker', 'Compose', 'Kubernetes'],
    summary: '컨테이너 실습',
    repo: 'https://github.com/H-Software224/hello_docker_kubernetes',
  },
  {
    title: 'CI/CD 실습',
    category: 'study',
    period: '2025.03',
    stack: ['Dockerfile'],
    summary: 'CI/CD 실습',
    repo: 'https://github.com/H-Software224/acc-cicd',
  },
  {
    title: 'KHUDA 알고리즘 스터디',
    category: 'study',
    period: '2023.10',
    stack: [],
    summary: '코딩테스트 풀이 기록 (fork)',
    repo: 'https://github.com/H-Software224/KHUDA-Algorithm-Study',
  },
];

export const categoryLabels: Record<Project['category'], string> = {
  personal: '개인 프로젝트',
  capstone: '캡스톤 · 학술',
  hackathon: '해커톤 · 공모전 · 팀',
  'data-ai': '데이터 분석 · AI',
  study: '학부 · 학습',
};
