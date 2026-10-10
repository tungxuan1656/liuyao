import { appendAutomaticToss } from '@liuyao/core';
import { useCallback, useRef, useState } from 'react';
import { createBrowserCastingService } from './lib/browser-coin-source';
import type { useReadingSession } from './reading-session';

type Draft = NonNullable<ReturnType<typeof useReadingSession>['draft']>;
type SetDraft = ReturnType<typeof useReadingSession>['setDraft'];

export function useAutomaticToss(
  draft: Draft | null,
  setDraft: SetDraft,
  setError: (error: string) => void,
) {
  const draftRef = useRef(draft);
  draftRef.current = draft;
  const [isTossAnimating, setIsTossAnimating] = useState(false);
  const isTossing = useRef(false);
  const generation = useRef(0);

  const clearAnimation = useCallback((expectedGeneration = generation.current) => {
    if (expectedGeneration !== generation.current) return;
    isTossing.current = false;
    setIsTossAnimating(false);
  }, []);

  const cancelAnimation = useCallback(() => {
    generation.current += 1;
    isTossing.current = false;
    setIsTossAnimating(false);
  }, []);

  function castDraft(targetDraft: Draft | null) {
    if (
      isTossing.current ||
      !targetDraft ||
      targetDraft.method !== 'automatic' ||
      targetDraft.step !== (targetDraft.tosses?.length ?? 0) ||
      (targetDraft.tosses?.length ?? 0) >= 6
    )
      return;

    isTossing.current = true;
    try {
      const toss = createBrowserCastingService().toss(targetDraft.coinMethod);
      const tosses = appendAutomaticToss(targetDraft.tosses ?? [], toss);
      const nextDraft = {
        ...targetDraft,
        tosses,
        lines: [...targetDraft.lines, toss.line],
        step: Math.min(tosses.length - 1, 5),
      };
      draftRef.current = nextDraft;
      setDraft(nextDraft);
      setError('');
      generation.current += 1;
      setIsTossAnimating(true);
    } catch {
      clearAnimation();
      setError('Không thể gieo tự động an toàn trên trình duyệt này. Hãy chọn phương pháp khác.');
    }
  }

  function cast() {
    castDraft(draftRef.current);
  }

  function advance() {
    const current = draftRef.current;
    if (isTossing.current || !current || current.method !== 'automatic' || current.step >= 5)
      return;

    const nextStep = current.step + 1;
    const nextDraft = { ...current, step: nextStep };
    if (nextStep < (current.tosses?.length ?? 0)) {
      draftRef.current = nextDraft;
      setDraft(nextDraft);
      return;
    }
    if (nextStep !== (current.tosses?.length ?? 0)) return;
    // Use the advanced snapshot so the toss starts in this same activation.
    castDraft(nextDraft);
  }

  return {
    isTossAnimating,
    clearAnimation,
    cancelAnimation,
    cast,
    advance,
    animationGeneration: generation.current,
  };
}
