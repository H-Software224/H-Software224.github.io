// data/tech-stack.ts 의 simple-icons slug를 public/icons/<slug>.svg 로 복사한다.
// simple-icons에 없는 slug는 콘솔에 목록으로 출력한다 (README 이미지/텍스트 배지는 빌드 중 건드리지 않음).
import { mkdir, copyFile } from 'node:fs/promises';
import path from 'node:path';
import icons from 'simple-icons/icons.json' with { type: 'json' };
import { techStack } from '../data/tech-stack.ts';

const ICON_DIR = path.join(process.cwd(), 'public', 'icons');
const SIMPLE_ICONS_PKG_DIR = path.join(process.cwd(), 'node_modules', 'simple-icons', 'icons');

const slugSet = new Set(icons.map((icon) => icon.slug));

async function main() {
  await mkdir(ICON_DIR, { recursive: true });

  const missing = [];
  let copied = 0;

  for (const category of techStack) {
    for (const tech of category.items) {
      if (tech.icon.source !== 'simple-icons') continue;

      const { slug } = tech.icon;
      if (!slugSet.has(slug)) {
        missing.push(`${tech.name} (slug: ${slug})`);
        continue;
      }

      const src = path.join(SIMPLE_ICONS_PKG_DIR, `${slug}.svg`);
      const dest = path.join(ICON_DIR, `${slug}.svg`);
      await copyFile(src, dest);
      copied += 1;
    }
  }

  console.log(`[copy-icons] simple-icons ${copied}개 복사 완료 (public/icons/)`);

  if (missing.length > 0) {
    console.log('[copy-icons] simple-icons에 없는 slug (텍스트 배지/README 이미지로 대체됨):');
    missing.forEach((item) => console.log(`  - ${item}`));
  }
}

main();
