import { useEffect, useRef, useState } from 'react';
import { calculateReading, normalizeDirectInput, normalizeSequentialInput } from '@liuyao/core';
import { useBlocker, useNavigate } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import { useAutomaticToss } from './use-automatic-toss';
import { AutomaticCastingPanel } from './automatic-casting-panel';
import { DirectCastingPanel } from './direct-casting-panel';
import { ManualCastingPanel } from './manual-casting-panel';
import { CastingFlowDialogs } from './casting-flow-dialogs';
import { Button } from './components/ui/button';

export function CastingFlow() {
  const navigate = useNavigate();
  const { draft, setDraft, completeReading, isUpdateAccepted, clearUpdateAccepted } =
    useReadingSession();
  const [error, setError] = useState('');
  const isCompleting = useRef(false);
  const isLeavingAfterDiscard = useRef(false);
  const [resetLines, setResetLines] = useState(false);
  const [discard, setDiscard] = useState(false);
  const automaticToss = useAutomaticToss(draft, setDraft, setError);
  const lines = draft?.lines ?? [];
  const hasInput =
    lines.length > 0 || (draft?.tosses?.length ?? 0) > 0 || (draft?.manualTosses?.length ?? 0) > 0;
  const blocker = useBlocker(
    () => hasInput && !isCompleting.current && !isLeavingAfterDiscard.current,
  );

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

  function resetCasting() {
    if (hasInput) {
      setResetLines(true);
      return;
    }
    automaticToss.cancelAnimation();
    if (draft) {
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
  }

  function discardAndGoHome() {
    automaticToss.cancelAnimation();
    setDraft(null);
    setDiscard(false);
    if (blocker.state === 'blocked') blocker.proceed();
    else {
      isLeavingAfterDiscard.current = true;
      navigate(ROUTES.home);
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
  const animationGeneration = automaticToss.animationGeneration;
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-6 px-4 pt-4 pb-6 text-foreground md:gap-8 md:px-6 md:pt-6 md:pb-8">
      <header className="-mb-2 flex items-center gap-2 text-neutral-500">
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
      <div className="grid gap-2">
        <h1 className="text-[clamp(2rem,4vw,2.8rem)] font-medium tracking-tight">
          {direct ? 'Nhập sáu hào' : draft.method === 'automatic' ? 'Gieo quẻ' : 'Gieo quẻ'}
        </h1>
        {draft.question && (
          <p className="text-sm md:text-base text-neutral-600">
            Câu hỏi (chỉ trong phiên này): {draft.question}
          </p>
        )}
      </div>
      {draft.method === 'automatic' ? (
        <AutomaticCastingPanel
          step={step}
          tosses={draft.tosses ?? []}
          method={draft.coinMethod}
          busy={automaticToss.isTossAnimating}
          onAnimationComplete={() => automaticToss.clearAnimation(animationGeneration)}
          onMethodChange={coinMethod => setDraft({ ...draft, coinMethod })}
          onBack={() => setDraft({ ...draft, step: step - 1 })}
          onNext={automaticToss.advance}
          onToss={() => automaticToss.cast()}
          onFinish={() => finish(lines)}
          onReset={resetCasting}
        />
      ) : direct ? (
        <DirectCastingPanel lines={lines} onChange={updateLine} onFinish={() => finish(lines)} />
      ) : (
        <ManualCastingPanel
          draft={draft}
          step={step}
          setDraft={setDraft}
          onBack={() => setDraft({ ...draft, step: step - 1 })}
          onNext={() => setDraft({ ...draft, step: step + 1 })}
          onFinish={() => finish(lines)}
          onReset={resetCasting}
        />
      )}
      {direct && (
        <div className="grid justify-items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            className="text-sm text-neutral-500"
            onClick={resetCasting}
          >
            Xóa các hào
          </Button>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-center" role="alert">
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
          automaticToss.cancelAnimation();
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
