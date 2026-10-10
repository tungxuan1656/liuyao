import { readFile } from 'node:fs/promises';
import { createContentLoader } from './content.js';

export { getContentMetadata, listContent } from './content.js';
export const loadContent = createContentLoader(async item => {
  return JSON.parse(
    await readFile(
      new URL(
        (import.meta.url.endsWith('.ts') ? '../dist/content/' : '../content/') + item.id + '.json',
        import.meta.url,
      ),
      'utf8',
    ),
  );
});
