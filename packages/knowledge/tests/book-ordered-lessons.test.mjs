import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { checkCorpus } from '../scripts/corpus-checks.mjs';
import { createReleaseProjection } from '../scripts/release-projection.mjs';

const readJson = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const manifest = readJson('../data/manifest.json');
const records = manifest.recordFiles.map(file => readJson(`../data/${file}`));
const citations = manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations);
const sources = readJson('../data/sources.json').sources;
const legacy = readJson('../data/legacy/catalog.json');
const repositoryRoot = new URL('../../../', import.meta.url).pathname;
const baseline = { manifest, records, citations, sources, legacy, repositoryRoot };
const graph = [
  ['lesson-foundations', []],
  ['lesson-classical-reading', ['lesson-foundations']],
  ['lesson-liuyao-board', ['lesson-foundations']],
  ['lesson-worked-readings', ['lesson-classical-reading', 'lesson-liuyao-board']],
];
const lessons = records.filter(record => record.type === 'lesson');
const allClaims = record => [
  ...record.claims,
  ...(record.lines ?? []).flatMap(line => line.claims),
  ...(record.specialPassages ?? []).flatMap(passage => passage.claims),
];
const owners = new Map(records.flatMap(record => allClaims(record).map(c => [c.id, record])));

// Share the immutable corpus baseline; clone only the lesson under mutation.
function mutateLesson(id, mutate) {
  const lesson = structuredClone(lessons.find(record => record.id === id));
  mutate(lesson);
  return { ...baseline, records: records.map(record => (record.id === id ? lesson : record)) };
}

describe('feat-065 ordered released lesson evidence', () => {
  it('persists exactly the approved four records, sequence, and prerequisite order', () => {
    expect(lessons.map(lesson => [lesson.id, lesson.prerequisiteLessonIds])).toEqual(graph);
    expect(lessons.map(lesson => lesson.sequence)).toEqual([1, 2, 3, 4]);
    for (const lesson of lessons) {
      expect(lesson.schemaVersion).toBe(2);
      expect(lesson.claims).toEqual([]);
      expect(lesson.review.status).toBe('reviewed');
      expect(manifest.releaseIds.filter(id => id === lesson.id)).toHaveLength(1);
      for (const id of lesson.prerequisiteLessonIds) {
        const prerequisite = lessons.find(record => record.id === id);
        expect(prerequisite.sequence).toBeLessThan(lesson.sequence);
        expect(manifest.releaseIds).toContain(id);
      }
    }
  });

  it('covers every ordered block with existing selected reviewed claim owners and citations', () => {
    for (const lesson of lessons) {
      expect(lesson.blocks.map(block => block.position)).toEqual(
        lesson.blocks.map((_, index) => index + 1),
      );
      const support = [...new Set(lesson.blocks.flatMap(block => block.supportingClaimIds))];
      expect(new Set(lesson.review.evidenceClaimIds)).toEqual(new Set(support));
      for (const block of lesson.blocks) {
        expect(block.supportingClaimIds.length).toBeGreaterThan(0);
        for (const id of block.supportingClaimIds) {
          const owner = owners.get(id);
          expect(owner, id).toBeDefined();
          expect(owner.type).not.toBe('lesson');
          expect(owner.review.status).toBe('reviewed');
          expect(manifest.releaseIds).toContain(owner.id);
          const claim = allClaims(owner).find(claim => claim.id === id);
          for (const citation of claim.citationIds) {
            expect(lesson.review.evidenceCitationIds).toContain(citation);
            expect(citations.some(candidate => candidate.id === citation)).toBe(true);
          }
        }
      }
    }
    expect(() => checkCorpus(baseline)).not.toThrow();
    const release = createReleaseProjection(baseline);
    expect(release.records.filter(record => record.type === 'lesson')).toEqual(lessons);
  });

  it.each([
    [
      'duplicate sequence',
      'lesson-liuyao-board',
      lesson => {
        lesson.sequence = 2;
      },
      /duplicate lesson sequence/,
    ],
    [
      'missing prerequisite',
      'lesson-worked-readings',
      lesson => {
        lesson.prerequisiteLessonIds = ['lesson-missing'];
      },
      /missing prerequisite/,
    ],
    [
      'prerequisite cycle',
      'lesson-foundations',
      lesson => {
        lesson.prerequisiteLessonIds = ['lesson-worked-readings'];
      },
      /prerequisite lesson cycle/,
    ],
    [
      'missing block evidence',
      'lesson-foundations',
      lesson => {
        lesson.review.evidenceClaimIds = ['term-yin-definition'];
      },
      /review evidence omits block support claim/,
    ],
    [
      'unknown support',
      'lesson-foundations',
      lesson => {
        lesson.blocks[0].supportingClaimIds = ['claim-missing'];
      },
      /unknown claim/,
    ],
  ])('rejects %s without weakening existing integrity checks', (_label, id, mutate, error) => {
    expect(() => checkCorpus(mutateLesson(id, mutate))).toThrow(error);
  });

  it('rejects an unselected prerequisite while keeping all support available', () => {
    const data = {
      ...baseline,
      manifest: {
        ...manifest,
        releaseIds: manifest.releaseIds.filter(id => id !== 'lesson-classical-reading'),
      },
    };
    expect(() => checkCorpus(data)).toThrow(
      /prerequisite lesson lesson-classical-reading is not selected/,
    );
  });

  it('rejects an unselected support owner rather than silently adding it to release', () => {
    const data = {
      ...baseline,
      manifest: {
        ...manifest,
        releaseIds: manifest.releaseIds.filter(id => id !== 'article-tung-to-ly'),
      },
    };
    expect(() => checkCorpus(data)).toThrow(/unselected claim claim-tung-to-ly/);
    expect(data.manifest.releaseIds).not.toContain('article-tung-to-ly');
  });
});
