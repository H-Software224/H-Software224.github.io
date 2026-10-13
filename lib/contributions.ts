import { readFileSync } from 'node:fs';
import path from 'node:path';

export type ContributionDay = { date: string; count: number };

export function getContributions(): ContributionDay[] | null {
  const filePath = path.join(process.cwd(), 'data', 'generated', 'contributions.json');
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    return null;
  }
}
