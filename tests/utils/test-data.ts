import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/** Loads a JSON fixture from tests/data and gives the caller its expected type. */
export function loadJsonTestData<T>(fileName: string): T {
  const filePath = join(__dirname, '..', 'data', fileName);
  const json = readFileSync(filePath, 'utf-8');
  return JSON.parse(json) as T;
}
