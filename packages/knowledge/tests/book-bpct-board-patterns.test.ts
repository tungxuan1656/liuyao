import { describe, expect, it } from 'vitest';
import { getBookRecord, getBookCitation, getBookSource } from '../src/index';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';

// Independent image-read bottom-to-top polarities, not output of the core calculator.
const palacePatterns = [
  ['can', ['111111', '011111', '001111', '000111', '000011', '000001', '000101', '111101']],
  ['kham', ['010010', '110010', '100010', '101010', '101110', '101100', '101000', '010000']],
  [
    'can-mountain',
    ['001001', '101001', '111001', '110001', '110101', '110111', '110011', '001011'],
  ],
  ['chan', ['100100', '000100', '010100', '011100', '011000', '011010', '011110', '100110']],
  ['ton', ['011011', '111011', '101011', '100011', '100111', '100101', '100001', '011001']],
  ['ly', ['101101', '001101', '011101', '010101', '010001', '010011', '010111', '101111']],
  ['khon', ['000000', '100000', '110000', '111000', '111100', '111110', '111010', '000010']],
  ['doai', ['110110', '010110', '000110', '001110', '001010', '001000', '001100', '110100']],
] as const;

describe('BPCT chapter-four independent observed board patterns', () => {
  it.each(palacePatterns)('preserves all eight image-read patterns in %s', (slug, patterns) => {
    const record = getBookRecord(`article-bpct-boards-${slug}`);
    if (!record || !('figures' in record)) throw new Error(`Missing V2 board ${slug}`);
    expect(record.figures).toHaveLength(8);
    for (const [index, figure] of (record.figures ?? []).entries()) {
      expect(figure.kind).toBe('board');
      const imagePattern = [...figure.labels]
        .reverse()
        .map(label => (label.text.includes(': dương;') ? '1' : '0'))
        .join('');
      expect(imagePattern).toBe(patterns[index]);
      for (const label of figure.labels) {
        const claim = record.claims.find(c => c.id === label.claimIds[0])!;
        expect(claim.kind).toBe('structural-fact');
        expect(claim.text).toMatch(/không hiệu chỉnh/);
        expect(getBookCitation(claim.citationIds[0]!)?.textLayer).toBe('supplement');
      }
    }
  });
  it('maps every assigned group, preserves exact edition identity and advances only the authoring queue', () => {
    const assigned = registry.groups.filter(g => g.authorFeatureId === 'feat-051');
    expect(assigned).toHaveLength(196);
    for (const unit of assigned) {
      expect(unit.recordIds?.length).toBeGreaterThan(0);
      expect(unit.auditFeatureId).toBe('feat-084');
      expect(unit.discoveryStatus).toBe('unresolved');
      for (const id of unit.recordIds ?? []) expect(getBookRecord(id)).toBeDefined();
    }
    expect(registry.counts.groups).toBe(1924);
    expect(registry.counts.exclusions).toBe(17);
    expect(manifest.nextBatch.note).toMatch(/feat-056/);
    const source = getBookSource('source-book-bpct')!;
    expect(source.editions[0]?.sha256).toBe(
      '713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a',
    );
    expect(JSON.stringify(source)).not.toMatch(/localInputPath|docs\/books/);
  });
});
