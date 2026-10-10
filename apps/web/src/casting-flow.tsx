import { calculateReading, normalizeDirectInput, normalizeSequentialInput } from '@liuyao/core';
import { useEffect, useRef, useState } from 'react';
import { useBlocker, useNavigate } from 'react-router-dom';
import { AutomaticCastingPanel } from './automatic-casting-panel';
import { CastingFlowDialogs } from './casting-flow-dialogs';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Button } from './components/ui/button';
import { Empty, EmptyContent, EmptyHeader, EmptyTitle } from './components/ui/empty';
import { DirectCastingPanel } from './direct-casting-panel';
import { ManualCastingPanel } from './manual-casting-panel';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { useAutomaticToss } from './use-automatic-toss';

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

  function discardAndLeave() {
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
      <main className="route-page">
        <Empty role="status">
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={1}>
              Lập quẻ mới
            </EmptyTitle>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="lg" onClick={() => navigate(ROUTES.home)}>
              Đến trang gieo quẻ
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    );
  }

  const direct = draft.method === 'direct';
  const step = Math.min(draft.step, 5);
  const animationGeneration = automaticToss.animationGeneration;
  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
            {direct
              ? 'Nhập sáu hào'
              : draft.method === 'automatic'
                ? 'Gieo tự động'
                : 'Gieo thủ công'}
          </h1>
          {draft.question && <p className="max-w-2xl text-muted-foreground">{draft.question}</p>}
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          aria-label="Hủy phiên gieo"
          onClick={cancelFlow}
        >
          <span className="md:hidden">Hủy</span>
          <span className="hidden md:inline">Hủy phiên gieo</span>
        </Button>
      </header>
      <div className="min-w-0 max-w-4xl">
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
          <Button type="button" variant="ghost" size="lg" onClick={resetCasting}>
            Xóa các hào
          </Button>
        )}
        {error && (
          <Alert variant="destructive" role="alert">
            <AlertTitle>Không thể tính quẻ</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
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
        onDiscardConfirm={discardAndLeave}
      />
    </main>
  );
}
