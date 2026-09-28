import { useEffect, useRef, useState } from 'react';
import { calculateReading, normalizeDirectInput, normalizeSequentialInput } from '@liuyao/core';
import { useBlocker, useNavigate } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { createBrowserCastingService } from './lib/browser-coin-source';
import { useReadingSession } from './reading-session';
import { ConfirmationDialog } from './components/confirmation-dialog';

const validValues = [6, 7, 8, 9] as const;

export function CastingFlow() {
  const navigate = useNavigate();
  const { draft, setDraft, completeReading, isUpdateAccepted, clearUpdateAccepted } =
    useReadingSession();
  const [error, setError] = useState('');
  const isCompleting = useRef(false);
  const isLeavingAfterDiscard = useRef(false);
  const [resetLines, setResetLines] = useState(false);
  const [discard, setDiscard] = useState(false);
  const lines = draft?.lines ?? [];
  const hasInput = lines.length > 0;
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
    setDraft(null);
    setDiscard(false);
    if (blocker.state === 'blocked') blocker.proceed();
    else {
      isLeavingAfterDiscard.current = true;
      navigate(ROUTES.home);
    }
  }

  function castAutomatically() {
    try {
      const values = createBrowserCastingService().cast().input.lines;
      finish([...values]);
    } catch {
      setError('Không thể gieo tự động an toàn trên trình duyệt này. Hãy chọn phương pháp khác.');
    }
  }

  if (!draft) {
    return (
      <main className="reading-page">
        <h1>Lập quẻ mới</h1>
        <p role="status">Chọn một phương pháp để bắt đầu.</p>
        <button type="button" onClick={() => navigate(ROUTES.home)}>
          Quay lại trang gieo quẻ
        </button>
      </main>
    );
  }

  const direct = draft.method === 'direct';
  const step = Math.min(draft.step, 5);
  const canCalculate = Array.from({ length: 6 }, (_, index) =>
    validValues.includes(lines[index] as (typeof validValues)[number]),
  ).every(Boolean);
  return (
    <main className="reading-page casting-page">
      <header className="flow-header">
        <button type="button" onClick={cancelFlow}>
          Hủy
        </button>
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
        <section className="reading-card">
          <p>Sáu giá trị hào sẽ được tạo bằng bộ sinh số ngẫu nhiên an toàn của trình duyệt.</p>
          <button type="button" onClick={castAutomatically}>
            Gieo sáu hào
          </button>
        </section>
      ) : direct ? (
        <section
          className="reading-card line-entry-list"
          aria-label="Nhập giá trị hào, bắt đầu từ hào sáu"
        >
          {[5, 4, 3, 2, 1, 0].map(index => (
            <label key={index}>
              Hào {index + 1}
              <select
                aria-label={`Hào ${index + 1}`}
                value={lines[index] ?? ''}
                onChange={event => updateLine(index, event.target.value)}
              >
                <option value="">Chọn giá trị</option>
                {validValues.map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button type="button" disabled={!canCalculate} onClick={() => finish(lines)}>
            Tính quẻ
          </button>
        </section>
      ) : (
        <section className="reading-card">
          <label htmlFor="manual-line">Giá trị hào {step + 1} (bắt đầu từ hào một)</label>
          <select
            id="manual-line"
            value={lines[step] ?? ''}
            onChange={event => updateLine(step, event.target.value)}
          >
            <option value="">Chọn giá trị</option>
            {validValues.map(value => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
          <div className="flow-actions">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => setDraft({ ...draft, step: step - 1 })}
            >
              Quay lại
            </button>
            {step < 5 ? (
              <button
                type="button"
                disabled={!validValues.includes(lines[step] as (typeof validValues)[number])}
                onClick={() => setDraft({ ...draft, step: step + 1 })}
              >
                Hào tiếp theo
              </button>
            ) : (
              <button type="button" disabled={!canCalculate} onClick={() => finish(lines)}>
                Tính quẻ
              </button>
            )}
          </div>
        </section>
      )}
      <button
        type="button"
        className="secondary-action"
        onClick={() => {
          if (hasInput) setResetLines(true);
          else if (draft) setDraft({ ...draft, lines: [], step: 0 });
          setError('');
        }}
      >
        Xóa các hào
      </button>
      {!canCalculate && draft.method === 'direct' && (
        <p role="status">Hãy nhập giá trị hợp lệ cho cả sáu hào trước khi tính quẻ.</p>
      )}
      {!canCalculate && draft.method === 'manual' && step === 5 && (
        <p role="status">Hãy nhập hào sáu trước khi tính quẻ. Các hào đã nhập vẫn được giữ lại.</p>
      )}
      {blocker.state !== 'blocked' && !discard && resetLines && (
        <ConfirmationDialog
          title="Xóa toàn bộ các hào?"
          confirmLabel="Xóa các hào"
          onCancel={() => setResetLines(false)}
          onConfirm={() => {
            if (draft) setDraft({ ...draft, lines: [], step: 0 });
            setResetLines(false);
          }}
        >
          Thao tác này xóa mọi hào đã nhập nhưng vẫn giữ câu hỏi và phương pháp gieo quẻ.
        </ConfirmationDialog>
      )}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {(blocker.state === 'blocked' || discard) && (
        <ConfirmationDialog
          title={hasInput ? 'Bỏ các hào đang nhập?' : 'Bỏ thông tin lập quẻ?'}
          confirmLabel={hasInput ? 'Bỏ và rời đi' : 'Bỏ thông tin'}
          onCancel={() => {
            if (blocker.state === 'blocked') blocker.reset();
            setDiscard(false);
          }}
          onConfirm={discardAndGoHome}
        >
          {hasInput
            ? 'Bỏ các hào đang nhập và quay lại trang gieo quẻ?'
            : 'Bỏ câu hỏi và phương pháp gieo quẻ rồi quay lại trang gieo quẻ?'}
        </ConfirmationDialog>
      )}
    </main>
  );
}
