// PRD 5.4 기술 스택 원본. 숙련도 표시 없음.
// 아이콘 우선순위: ① simple-icons → ② 기존 README 이미지(public/icons/에 수동 저장) → ③ 텍스트 배지

export type TechIcon =
  | { source: 'simple-icons'; slug: string }
  | { source: 'local'; file: string }
  | { source: 'none' };

export type Tech = {
  name: string;
  icon: TechIcon;
};

export type TechCategory = {
  category: string;
  items: Tech[];
};

export const techStack: TechCategory[] = [
  {
    category: 'Language',
    items: [
      { name: 'Python', icon: { source: 'simple-icons', slug: 'python' } },
      { name: 'TypeScript', icon: { source: 'simple-icons', slug: 'typescript' } },
      { name: 'JavaScript', icon: { source: 'simple-icons', slug: 'javascript' } },
      { name: 'Java', icon: { source: 'simple-icons', slug: 'openjdk' } },
      { name: 'Kotlin', icon: { source: 'simple-icons', slug: 'kotlin' } },
      { name: 'Go', icon: { source: 'simple-icons', slug: 'go' } },
      { name: 'Swift', icon: { source: 'simple-icons', slug: 'swift' } },
      { name: 'C++', icon: { source: 'simple-icons', slug: 'cplusplus' } },
      { name: 'SQL', icon: { source: 'none' } },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: { source: 'simple-icons', slug: 'react' } },
      { name: 'Vite', icon: { source: 'simple-icons', slug: 'vite' } },
      { name: 'React Router', icon: { source: 'simple-icons', slug: 'reactrouter' } },
      { name: 'Tailwind CSS', icon: { source: 'simple-icons', slug: 'tailwindcss' } },
      { name: 'Next.js', icon: { source: 'simple-icons', slug: 'nextdotjs' } },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'FastAPI', icon: { source: 'simple-icons', slug: 'fastapi' } },
      { name: 'Flask', icon: { source: 'simple-icons', slug: 'flask' } },
      { name: 'Node.js', icon: { source: 'simple-icons', slug: 'nodedotjs' } },
      { name: 'Express', icon: { source: 'simple-icons', slug: 'express' } },
      { name: 'NestJS', icon: { source: 'simple-icons', slug: 'nestjs' } },
      { name: 'Spring Boot', icon: { source: 'simple-icons', slug: 'springboot' } },
    ],
  },
  {
    category: 'Data / AI',
    items: [
      { name: 'pandas', icon: { source: 'simple-icons', slug: 'pandas' } },
      { name: 'NumPy', icon: { source: 'simple-icons', slug: 'numpy' } },
      { name: 'scikit-learn', icon: { source: 'simple-icons', slug: 'scikitlearn' } },
      { name: 'SciPy', icon: { source: 'simple-icons', slug: 'scipy' } },
      { name: 'PyTorch', icon: { source: 'simple-icons', slug: 'pytorch' } },
      { name: 'OpenCV', icon: { source: 'simple-icons', slug: 'opencv' } },
      { name: 'LangChain', icon: { source: 'simple-icons', slug: 'langchain' } },
      { name: 'LangGraph', icon: { source: 'simple-icons', slug: 'langgraph' } },
      { name: 'Streamlit', icon: { source: 'simple-icons', slug: 'streamlit' } },
      { name: 'Claude', icon: { source: 'simple-icons', slug: 'claude' } },
    ],
  },
  {
    category: 'Visualization',
    items: [
      { name: 'Matplotlib', icon: { source: 'local', file: 'matplotlib.png' } },
      { name: 'Seaborn', icon: { source: 'none' } },
      { name: 'Power BI', icon: { source: 'local', file: 'power-bi.svg' } },
    ],
  },
  {
    category: 'Database',
    items: [
      { name: 'MySQL', icon: { source: 'simple-icons', slug: 'mysql' } },
      { name: 'MongoDB', icon: { source: 'simple-icons', slug: 'mongodb' } },
    ],
  },
  {
    category: 'Cloud / DevOps',
    items: [
      { name: 'AWS', icon: { source: 'local', file: 'aws.svg' } },
      { name: 'Docker', icon: { source: 'simple-icons', slug: 'docker' } },
      { name: 'Kubernetes', icon: { source: 'simple-icons', slug: 'kubernetes' } },
      { name: 'Cloudflare Workers', icon: { source: 'simple-icons', slug: 'cloudflareworkers' } },
      { name: 'Vercel', icon: { source: 'simple-icons', slug: 'vercel' } },
    ],
  },
  {
    category: 'Monitoring',
    items: [
      { name: 'Checkly', icon: { source: 'none' } },
      { name: 'Lighthouse', icon: { source: 'simple-icons', slug: 'lighthouse' } },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'Flutter', icon: { source: 'simple-icons', slug: 'flutter' } },
      { name: 'Android Studio', icon: { source: 'simple-icons', slug: 'androidstudio' } },
      { name: 'SwiftUI', icon: { source: 'none' } },
    ],
  },
  {
    category: 'Tools',
    items: [
      { name: 'Git', icon: { source: 'simple-icons', slug: 'git' } },
      { name: 'GitHub', icon: { source: 'simple-icons', slug: 'github' } },
      { name: 'VS Code', icon: { source: 'none' } },
      { name: 'Claude Code', icon: { source: 'simple-icons', slug: 'claudecode' } },
      { name: 'Figma', icon: { source: 'simple-icons', slug: 'figma' } },
      { name: 'Notion', icon: { source: 'simple-icons', slug: 'notion' } },
      { name: 'Slack', icon: { source: 'none' } },
      { name: 'Discord', icon: { source: 'simple-icons', slug: 'discord' } },
      { name: 'Anaconda', icon: { source: 'simple-icons', slug: 'anaconda' } },
      { name: 'Google Colab', icon: { source: 'simple-icons', slug: 'googlecolab' } },
      { name: 'Microsoft Office', icon: { source: 'local', file: 'office-365.svg' } },
      { name: 'Ayrshare', icon: { source: 'local', file: 'ayrshare.jpeg' } },
    ],
  },
];
