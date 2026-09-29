import { useEffect, useRef, useState } from 'react';
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
import { Card } from './components/ui/card';

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
  const tossAnimationTimer = useRef<number | null>(null);
  const lines = draft?.lines ?? [];
  const hasInput =
    lines.length > 0 || (draft?.tosses?.length ?? 0) > 0 || (draft?.manualTosses?.length ?? 0) > 0;
  const blocker = useBlocker(
    () => hasInput && !isCompleting.current && !isLeavingAfterDiscard.current,
  );

  function clearTossAnimation() {
    if (tossAnimationTimer.current !== null) {
      window.clearTimeout(tossAnimationTimer.current);
      tossAnimationTimer.current = null;
    }
    isTossing.current = false;
    setIsTossAnimating(false);
  }

  useEffect(
    () => () => {
      if (tossAnimationTimer.current !== null) window.clearTimeout(tossAnimationTimer.current);
    },
    [],
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
      setError('Không thể tính quẻ. Hãy kiểm tra đủ sáu giá trị hào từ 6 đến 9 rồi thử lại.');
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
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsTossAnimating(true);
        tossAnimationTimer.current = window.setTimeout(() => {
          tossAnimationTimer.current = null;
          setIsTossAnimating(false);
          isTossing.current = false;
        }, 1250);
      } else {
        isTossing.current = false;
      }
    } catch {
      setError('Không thể gieo tự động an toàn trên trình duyệt này. Hãy chọn phương pháp khác.');
    } finally {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) isTossing.current = false;
    }
  }

  if (!draft) {
    return (
      <main className="reading-page">
        <h1>Lập quẻ mới</h1>
        <p role="status">Chọn một phương pháp để bắt đầu.</p>
        <Button type="button" onClick={() => navigate(ROUTES.home)}>
          Quay lại trang gieo quẻ
        </Button>
      </main>
    );
  }

  const direct = draft.method === 'direct';
  const step = Math.min(draft.step, 5);
  return (
    <main className="reading-page casting-page">
      <header className="flow-header">
        <Button type="button" variant="ghost" className="casting-cancel-action" onClick={cancelFlow}>
          Hủy
        </Button>
        <p>
          {direct
            ? 'Nhập trực tiếp'
            : draft.method === 'automatic'
              ? 'Gieo tự động'
              : 'Gieo thủ công'}
        </p>
      </header>
      <h1>
        {direct
          ? 'Nhập sáu hào'
          : draft.method === 'automatic'
            ? 'Gieo quẻ'
            : `Hào ${step + 1} trên 6`}
      </h1>
      {draft.question && (
        <p className="question-summary">Câu hỏi (chỉ trong phiên này): {draft.question}</p>
      )}
      {draft.method === 'automatic' ? (
        <AutomaticCastingPanel
          step={step}
          tosses={draft.tosses ?? []}
          method={draft.coinMethod}
          busy={isTossAnimating}
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
          <ManualCastingPanel draft={draft} step={step} setDraft={setDraft} />
          <Card className="manual-actions">
            <div className="flow-actions">
              <Button
                type="button"
                variant="outline"
                className="casting-back-action"
                disabled={step === 0}
                onClick={() => setDraft({ ...draft, step: step - 1 })}
              >
                Quay lại
              </Button>
              {step < 5 ? (
                <Button
                  type="button"
                  className="casting-primary-action"
                  disabled={lines[step] === undefined}
                  onClick={() => setDraft({ ...draft, step: step + 1 })}
                >
                  Hào tiếp theo
                </Button>
              ) : (
                <Button
                  type="button"
                  className="casting-primary-action"
                  disabled={lines.length < 6 || lines.some(line => line === undefined)}
                  onClick={() => finish(lines)}
                >
                  Tính quẻ
                </Button>
              )}
            </div>
          </Card>
        </>
      )}
      <Button
        type="button"
        variant="outline"
        className="secondary-action casting-reset-action"
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
        <p className="error-message" role="alert">
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
