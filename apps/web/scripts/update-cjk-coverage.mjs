import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { knowledgeCatalog } from '@liuyao/knowledge';

const CJK_CHARACTER = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;
const fontDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/fonts');

function catalogText(value) {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(catalogText);
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(catalogText);
  return [];
}

const characters = [
  ...new Set(
    catalogText(knowledgeCatalog).flatMap(text =>
      [...text].filter(char => CJK_CHARACTER.test(char)),
    ),
  ),
].sort((left, right) => left.codePointAt(0) - right.codePointAt(0));

writeFileSync(path.join(fontDirectory, 'cjk-coverage.txt'), characters.join(''), 'utf8');
console.log(`Wrote ${characters.length} unique CJK characters to cjk-coverage.txt.`);
