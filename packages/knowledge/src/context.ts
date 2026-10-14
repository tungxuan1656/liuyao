import { getHexagram } from './catalog.js';
import type { HexagramId } from './schema.js';

export type ReadingContextType = 'primary' | 'changed';

export interface ReadingReferenceContext {
  readonly contextType: ReadingContextType;
  readonly hexagramId: HexagramId;
  readonly position?: number;
}

export interface ResolvedReadingReference {
  readonly contextType: ReadingContextType;
  readonly hexagramId: HexagramId;
  readonly position?: number;
  readonly anchor?: `#line-${number}`;
  readonly canonicalPath: string;
}

/**
 * Resolves a reading context (primary or changed hexagram, optional line position 1..6)
 * to its canonical library reference with anchor.
 */
export function resolveReadingReferenceContext(
  context: ReadingReferenceContext,
): ResolvedReadingReference | undefined {
  const entity = getHexagram(context.hexagramId);
  if (!entity) return undefined;

  if (context.position !== undefined) {
    if (!Number.isInteger(context.position) || context.position < 1 || context.position > 6) {
      return undefined;
    }
    const anchor = `#line-${context.position}` as const;
    return Object.freeze({
      contextType: context.contextType,
      hexagramId: context.hexagramId,
      position: context.position,
      anchor,
      canonicalPath: `/library/hexagram/${context.hexagramId}${anchor}`,
    });
  }

  return Object.freeze({
    contextType: context.contextType,
    hexagramId: context.hexagramId,
    canonicalPath: `/library/hexagram/${context.hexagramId}`,
  });
}
