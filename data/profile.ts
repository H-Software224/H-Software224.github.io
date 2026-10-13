// PRD 5.1 ~ 5.6 원본. 인적사항·소개·경력·수상·자격증은 PRD에 있는 값만 사용한다.

export type BasicInfo = {
  nameKo: string;
  nameEn: string;
  github: { label: string; url: string };
  email: string;
  location: string;
  affiliation: string;
  affiliationOrg: { label: string; url: string };
  education: string;
  careerGoal: string;
  linkedin: { label: string; url: string };
  instagram: { label: string; url: string };
  portfolioPdf: { label: string; url: string };
  baekjoon: { label: string; url: string };
};

export const basicInfo: BasicInfo = {
  nameKo: '한주상',
  nameEn: 'Han, Ju-Sang',
  github: { label: 'H-Software224', url: 'https://github.com/H-Software224' },
  email: 'hjs000528@gmail.com',
  location: 'Seoul, Korea',
  affiliation: 'adoba 제품본부 개발팀 매니저',
  affiliationOrg: { label: '@adobaai', url: 'https://github.com/adobaai' },
  education: '경희대학교 소프트웨어융합학과 (2020.03 입학 ~ 2026.02 졸업)',
  careerGoal: 'Data Analyst / Data Scientist / Machine Learning Engineer',
  linkedin: { label: 'in/h-software224', url: 'https://www.linkedin.com/in/h-software224' },
  instagram: { label: 'jusangle.h', url: 'https://www.instagram.com/jusangle.h/' },
  portfolioPdf: {
    label: 'intr.pdf',
    url: 'https://my-canvas-portfolio.s3.ap-northeast-2.amazonaws.com/intr.pdf',
  },
  baekjoon: { label: 'han05280505', url: 'https://solved.ac/han05280505' },
};

export const oneLiner =
  '지금도 계속 성장하고 있는 데이터 분석가입니다. 계속 새로운 것으로 AI의 기술로 LLM, ML, DL, MCP, Skills를 이용하여 Claude와 같은 LLM으로 Agent를 활용하여 해결하고 있는 개발자입니다.';

export const personalMessage: string[] = [
  '스무 살 이전의 저에게 컴퓨터는 문서를 만드는 도구였습니다. 코딩 동아리에서 C와 Python을 처음 배우면서, 코드로 웹과 앱을 만들고 데이터를 분석할 수 있다는 사실을 알게 되었고 그때부터 지금까지 개발을 이어오고 있습니다.',
  '학부에서는 강의 음성과 강의자료를 비교해 전공 용어를 교정하는 서비스, 스마트폰 중독 위반을 감지해 SNS로 자동 공유하는 앱, OTT 이슈 감성 분석 같은 프로젝트를 만들었습니다. 지금은 adoba에서 개발과 기획을 함께 하고 있습니다.',
  '앞으로도 데이터와 AI로 사람들에게 실제로 도움이 되고, 사회 문제를 푸는 서비스를 기획하고 만들고 싶습니다. 이 페이지는 그 과정을 기록하는 공간입니다.',
];

export type CareerItem = {
  period: string;
  org: string;
  role: string;
  duties: string;
};

export const career: CareerItem[] = [
  {
    period: '2026.05 ~ 현재',
    org: 'adoba 제품본부 개발팀',
    role: '매니저 (정규직)',
    duties: '개발·기획 겸임',
  },
  {
    period: '2026.02 ~ 2026.04',
    org: 'adoba 제품본부 개발팀',
    role: '인턴 (계약 만료)',
    duties: '동일',
  },
];

export const careerFields =
  '담당 분야: 프론트엔드 개발, 백엔드 분석, 인프라·모니터링 자동화, 사내 툴링';

export const careerNote =
  'adoba 업무는 위 경력 요약까지만 노출합니다. 회사 프로젝트명·URL·세부 내용은 Projects를 포함한 어떤 페이지에도 노출하지 않습니다.';

export type AwardItem = {
  period: string;
  title: string;
  related?: { label: string; url: string };
};

export const awards: AwardItem[] = [
  {
    period: '2025.08',
    title: 'KCC(한국컴퓨터종합학술대회) 2025 학부생논문 최우수상',
    related: { label: 'TermCorector', url: 'https://github.com/H-Software224/TermCorector' },
  },
  { period: '2025.04', title: '2025 제1회 세모톤 인기투표 1위상' },
  { period: '2024.11', title: '2024 제1회 소프트웨어융합학과 컨퍼런스 우수상' },
  { period: '2020.11', title: 'Khuthon 2020 해커톤 격려상' },
];

export type CertificateItem = {
  acquired: string;
  name: string;
};

export const certificates: CertificateItem[] = [
  { acquired: '2025.09', name: '데이터분석 준전문가(ADsP)' },
  { acquired: '2025.06', name: 'TOPCIT 3수준' },
  { acquired: '2024.06', name: 'SQL 개발자(SQLD)' },
  { acquired: '2022.12', name: '컴퓨터활용능력 1급' },
  { acquired: '2010', name: '워드프로세서 2급/3급' },
];
