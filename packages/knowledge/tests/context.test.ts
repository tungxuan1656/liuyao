import { describe, expect, it } from 'vitest';
import { resolveReadingReferenceContext } from '../src/context.js';

describe('resolveReadingReferenceContext', () => {
  it('resolves primary hexagram overview without position', () => {
    const resolved = resolveReadingReferenceContext({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
    });
    expect(resolved).toEqual({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
      canonicalPath: '/library/hexagram/hexagram-01',
    });
  });

  it('resolves changed hexagram overview without position', () => {
    const resolved = resolveReadingReferenceContext({
      contextType: 'changed',
      hexagramId: 'hexagram-44',
    });
    expect(resolved).toEqual({
      contextType: 'changed',
      hexagramId: 'hexagram-44',
      canonicalPath: '/library/hexagram/hexagram-44',
    });
  });

  it('resolves primary line 1 and line 6 with explicit anchors', () => {
    const line1 = resolveReadingReferenceContext({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
      position: 1,
    });
    expect(line1).toEqual({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
      position: 1,
      anchor: '#line-1',
      canonicalPath: '/library/hexagram/hexagram-01#line-1',
    });

    const line6 = resolveReadingReferenceContext({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
      position: 6,
    });
    expect(line6).toEqual({
      contextType: 'primary',
      hexagramId: 'hexagram-01',
      position: 6,
      anchor: '#line-6',
      canonicalPath: '/library/hexagram/hexagram-01#line-6',
    });
  });

  it('resolves changed line with explicit anchor and distinct context', () => {
    const resolved = resolveReadingReferenceContext({
      contextType: 'changed',
      hexagramId: 'hexagram-44',
      position: 3,
    });
    expect(resolved).toEqual({
      contextType: 'changed',
      hexagramId: 'hexagram-44',
      position: 3,
      anchor: '#line-3',
      canonicalPath: '/library/hexagram/hexagram-44#line-3',
    });
  });

  it('rejects invalid hexagram IDs or out-of-range positions', () => {
    expect(
      resolveReadingReferenceContext({
        contextType: 'primary',
        hexagramId: 'hexagram-99' as 'hexagram-01',
      }),
    ).toBeUndefined();

    expect(
      resolveReadingReferenceContext({
        contextType: 'primary',
        hexagramId: 'hexagram-01',
        position: 0,
      }),
    ).toBeUndefined();

    expect(
      resolveReadingReferenceContext({
        contextType: 'primary',
        hexagramId: 'hexagram-01',
        position: 7,
      }),
    ).toBeUndefined();

    expect(
      resolveReadingReferenceContext({
        contextType: 'primary',
        hexagramId: 'hexagram-01',
        position: 2.5,
      }),
    ).toBeUndefined();
  });
});
