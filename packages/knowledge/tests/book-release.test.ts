import { afterEach, describe, expect, it, vi } from 'vitest';
import manifest from '../data/manifest.json';
import draft from '../data/casting/three-coins.json';

afterEach(() => {
  vi.doUnmock('../src/book-data.generated.js');
  vi.resetModules();
});

async function release(
  status: string,
  selected: boolean,
): Promise<typeof import('../src/book-catalog')> {
  vi.resetModules();
  vi.doMock('../src/book-data.generated.js', () => ({
    BOOK_RECORDS: [{ ...draft, review: { ...draft.review, status } }],
    BOOK_MANIFEST: { ...manifest, releaseIds: selected ? [draft.id] : [] },
    BOOK_CITATIONS: [],
    BOOK_SOURCES: [],
  }));
  return import('../src/book-catalog');
}

describe('book API release selection', () => {
  it('withholds unselected draft and reviewed records', async () => {
    for (const status of ['draft', 'reviewed']) {
      const api = await release(status, false);
      expect(api.listBookRecords()).toEqual([]);
      expect(api.getBookRecord(draft.id)).toBeUndefined();
    }
  });

  it.each(['draft', 'disputed', 'superseded'])(
    'rejects selected %s content at runtime',
    async status => {
      await expect(release(status, true)).rejects.toThrow('Ineligible book release');
    },
  );
});
