import { useCallback, useEffect, useRef, useState } from 'react';
import {
  appendAutomaticToss,
  calculateReading,
  normalizeDirectInput,
  normalizeSequentialInput,
} from '@liuyao/core';
import { useBlocker, useNavigate } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { createBrowserCastingService } from './lib/browser-coin-source';
import { useReadingSession } from './reading-session';
import { AutomaticCastingPanel } from './automatic-casting-panel';
import { DirectCastingPanel } from './direct-casting-panel';
import { ManualCastingPanel } from './manual-casting-panel';
import { CastingFlowDialogs } from './casting-flow-dialogs';
import { Button } from './components/ui/button';
import { ManualCastingActions } from './manual-casting-actions';

export function CastingFlow() {
  const navigate = useNavigate();
  const { draft, setDraft, completeReading, isUpdateAccepted, clearUpdateAccepted } =
    useReadingSession();
  const [error, setError] = useState('');
  const isCompleting = useRef(false);
  const isLeavingAfterDiscard = useRef(false);
  const [resetLines, setResetLines] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [isTossAnimating, setIsTossAnimating] = useState(false);
  const isTossing = useRef(false);
  const lines = draft?.lines ?? [];
  const hasInput =
    lines.length > 0 || (draft?.tosses?.length ?? 0) > 0 || (draft?.manualTosses?.length ?? 0) > 0;
  const blocker = useBlocker(
    () => hasInput && !isCompleting.current && !isLeavingAfterDiscard.current,
  );

  const clearTossAnimation = useCallback(() => {
    isTossing.current = false;
    setIsTossAnimating(false);
  }, []);

  useEffect(() => {
    if (!hasInput) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isUpdateAccepted()) {
        clearUpdateAccepted();
        return;
      }
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, [hasInput, isUpdateAccepted, clearUpdateAccepted]);

  function finish(values: number[]) {
    try {
      const input =
        draft?.method === 'direct'
          ? normalizeDirectInput(values)
          : normalizeSequentialInput(values);
      completeReading({
        question: draft?.question ?? '',
        method: draft?.method ?? 'manual',
        lines: input.lines,
        result: calculateReading(input),
        ...(draft?.method === 'automatic' ? { tosses: draft.tosses } : {}),
      });
      isCompleting.current = true;
      setError('');
      navigate(ROUTES.result);
    } catch {
      // Keep the entered values in the draft so the user can correct and retry.
      if (draft) setDraft({ ...draft, lines: [...values] });
      setError('Không thể tính quẻ. Hãy kiểm tra đủ sáu hào rồi thử lại.');
    }
  }

  function updateLine(index: number, value: string) {
    if (!draft) return;
    const next = [...draft.lines];
    if (value === '') delete next[index];
    else next[index] = Number(value);
    setDraft({ ...draft, lines: next });
    setError('');
  }

  function cancelFlow() {
    if (hasInput || draft?.question.trim()) setDiscard(true);
    else {
      setDraft(null);
      navigate(ROUTES.home);
    }
  }

  function discardAndGoHome() {
    clearTossAnimation();
    setDraft(null);
    setDiscard(false);
    if (blocker.state === 'blocked') blocker.proceed();
    else {
      isLeavingAfterDiscard.current = true;
      navigate(ROUTES.home);
    }
  }

  function castAutomaticLine() {
    if (
      isTossing.current ||
      !draft ||
      draft.method !== 'automatic' ||
      draft.step !== (draft.tosses?.length ?? 0) ||
      (draft.tosses?.length ?? 0) >= 6
    ) {
      return;
    }
    isTossing.current = true;
    try {
      const toss = createBrowserCastingService().toss(draft.coinMethod);
      const tosses = appendAutomaticToss(draft.tosses ?? [], toss);
      setDraft({
        ...draft,
        tosses,
        lines: [...lines, toss.line],
        step: Math.min(tosses.length - 1, 5),
      });
      setError('');
      setIsTossAnimating(true);
    } catch {
      clearTossAnimation();
      setError('Không thể gieo tự động an toàn trên trình duyệt này. Hãy chọn phương pháp khác.');
    }
  }

  if (!draft) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
        <h1 className="text-3xl font-medium text-neutral-900 tracking-tight">Lập quẻ mới</h1>
        <p className="text-neutral-500" role="status">
          Chọn một phương pháp để bắt đầu.
        </p>
        <Button
          type="button"
          variant="outline"
          className="rounded-none border-neutral-200 hover:bg-neutral-100"
          onClick={() => navigate(ROUTES.home)}
        >
          Quay lại trang gieo quẻ
        </Button>
      </main>
    );
  }

  const direct = draft.method === 'direct';
  const step = Math.min(draft.step, 5);
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-3 p-4 text-foreground sm:gap-4 sm:p-6 md:p-8">
      <header className="flex items-center gap-2 text-neutral-500 mb-2">
        <Button
          type="button"
          variant="ghost"
          className="p-0 h-auto font-normal text-neutral-900 bg-transparent border-0 hover:bg-transparent"
          onClick={cancelFlow}
        >
          Hủy
        </Button>
        <span>/</span>
        <p className="text-sm">
          {direct
            ? 'Nhập trực tiếp'
            : draft.method === 'automatic'
              ? 'Gieo tự động'
              : 'Gieo thủ công'}
        </p>
      </header>
      <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-medium tracking-tight mb-2 md:mb-4">
        {direct
          ? 'Nhập sáu hào'
          : draft.method === 'automatic'
            ? 'Gieo quẻ'
            : `Hào ${step + 1} trên 6`}
      </h1>
      {draft.question && (
        <p className="text-sm md:text-base text-neutral-600 mb-4">
          Câu hỏi (chỉ trong phiên này): {draft.question}
        </p>
      )}
      {draft.method === 'automatic' ? (
        <AutomaticCastingPanel
          step={step}
          tosses={draft.tosses ?? []}
          method={draft.coinMethod}
          busy={isTossAnimating}
          onAnimationComplete={clearTossAnimation}
          onMethodChange={coinMethod => setDraft({ ...draft, coinMethod })}
          onBack={() => setDraft({ ...draft, step: step - 1 })}
          onNext={() => setDraft({ ...draft, step: step + 1 })}
          onToss={castAutomaticLine}
          onFinish={() => finish(lines)}
        />
      ) : direct ? (
        <DirectCastingPanel lines={lines} onChange={updateLine} onFinish={() => finish(lines)} />
      ) : (
        <>
          <section className="grid gap-3" aria-label="Gieo thủ công">
            <ManualCastingPanel draft={draft} step={step} setDraft={setDraft} />
            <ManualCastingActions
              step={step}
              lines={lines}
              onBack={() => setDraft({ ...draft, step: step - 1 })}
              onNext={() => setDraft({ ...draft, step: step + 1 })}
              onFinish={() => finish(lines)}
            />
          </section>
        </>
      )}
      <Button
        type="button"
        variant="ghost"
        className="self-center w-auto mt-4 text-sm text-neutral-500 hover:text-neutral-900 border-0 bg-transparent hover:bg-transparent"
        onClick={() => {
          if (hasInput) setResetLines(true);
          else if (draft) {
            clearTossAnimation();
            setDraft({
              ...draft,
              lines: [],
              step: 0,
              tosses: [],
              manualTosses: [],
              manualConfirmed: [],
              manualPreviewLines: [],
            });
          }
          setError('');
        }}
      >
        Xóa các hào
      </Button>
      {error && (
        <p className="text-red-500 text-center mt-4" role="alert">
          {error}
        </p>
      )}
      <CastingFlowDialogs
        resetLines={resetLines}
        discard={discard}
        hasInput={hasInput}
        isBlocked={blocker.state === 'blocked'}
        onResetCancel={() => setResetLines(false)}
        onResetConfirm={() => {
          clearTossAnimation();
          if (draft)
            setDraft({
              ...draft,
              lines: [],
              step: 0,
              tosses: [],
              manualTosses: [],
              manualConfirmed: [],
              manualPreviewLines: [],
            });
          setResetLines(false);
        }}
        onDiscardCancel={() => {
          if (blocker.state === 'blocked') blocker.reset();
          setDiscard(false);
        }}
        onDiscardConfirm={discardAndGoHome}
      />
    </main>
  );
}
