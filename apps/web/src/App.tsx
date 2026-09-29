import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { getLinePresentation } from './line-value-presentation';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';

const methods = [
  {
    value: 'automatic',
    label: 'Gieo tự động',
    detail: 'Để ứng dụng gieo ba đồng xu mỗi lần.',
  },
  {
    value: 'manual',
    label: 'Gieo thủ công',
    detail: 'Tự gieo và ghi lại kết quả từng hào.',
  },
  {
    value: 'direct',
    label: 'Nhập trực tiếp',
    detail: 'Nhập sáu hào nếu đã có sẵn.',
  },
] as const;

export default function App() {
  const navigate = useNavigate();
  const { draft, reading, question, method, setDraft, setQuestion, setMethod, clearSession } =
    useReadingSession();
  const [replaceReading, setReplaceReading] = useState(false);

  const entryQuestion = draft?.question ?? question;
  const entryMethod = draft?.method ?? method;

  function begin() {
    if (draft) {
      navigate(ROUTES.casting);
      return;
    }
    setDraft({ question, method, coinMethod: 'three-coin', lines: [], step: 0 });
    navigate(ROUTES.casting);
  }

  function confirmReplacement() {
    clearSession();
    setReplaceReading(false);
  }

  return (
    <main className="mx-auto max-w-lg px-5 py-12 flex flex-col gap-10">
      {/* Hero header */}
      <header className="flex flex-col gap-2">
        <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-medium">
          Lục Hào
        </p>
        <h1 className="text-[2.75rem] font-serif font-medium tracking-tight leading-[1.05] text-neutral-900">
          Gieo quẻ
        </h1>
        <p className="text-neutral-500 text-sm leading-relaxed">
          Lập quẻ sáu hào, từng bước rõ ràng và riêng tư.
        </p>
      </header>

      {/* Content */}
      {reading ? (
        <div className="flex flex-col gap-5" aria-labelledby="completed-reading-heading">
          <div className="flex flex-col gap-1 pb-4 border-b border-border">
            <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-medium">
              Quẻ hiện tại
            </p>
            <h2
              id="completed-reading-heading"
              className="text-xl font-serif font-medium text-neutral-900 mt-0.5"
            >
              {reading.question || 'Quẻ chưa đặt tên'}
            </h2>
            <p className="text-sm text-neutral-400 mt-0.5">
              {reading.method === 'automatic'
                ? 'Gieo tự động'
                : reading.method === 'manual'
                  ? 'Gieo thủ công'
                  : 'Nhập trực tiếp'}
            </p>
          </div>

          <div className="flex flex-col gap-1 pb-4 border-b border-border">
            <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-medium mb-1.5">
              Các hào, từ hào một đến hào sáu
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {reading.lines.map(l => getLinePresentation(l).name).join(' · ')}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Link
              to={ROUTES.result}
              className="flex items-center justify-center w-full h-11 bg-neutral-900 text-white text-sm font-medium no-underline hover:bg-neutral-800 transition-colors"
            >
              Xem kết quả
            </Link>
            <div className="grid grid-cols-3 gap-2">
              <Link
                to={ROUTES.library}
                className="flex items-center justify-center h-10 border border-border text-neutral-700 text-sm font-medium no-underline hover:bg-neutral-50 transition-colors"
              >
                Thư viện
              </Link>
              <Link
                to={ROUTES.settings}
                className="flex items-center justify-center h-10 border border-border text-neutral-700 text-sm font-medium no-underline hover:bg-neutral-50 transition-colors"
              >
                Cài đặt
              </Link>
              <button
                type="button"
                onClick={() => setReplaceReading(true)}
                className="flex items-center justify-center h-10 border border-border text-neutral-700 text-sm font-medium cursor-pointer hover:bg-neutral-50 transition-colors bg-white"
              >
                Lập mới
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 text-center">
            Quẻ chỉ được giữ trong bộ nhớ phiên này.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-7">
          {/* Question */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reading-question" className="text-sm font-medium text-neutral-700">
              Câu hỏi <span className="text-neutral-400 font-normal text-xs">không bắt buộc</span>
            </label>
            <textarea
              id="reading-question"
              rows={3}
              value={entryQuestion}
              onChange={event =>
                draft
                  ? setDraft({ ...draft, question: event.target.value })
                  : setQuestion(event.target.value)
              }
              placeholder="Bạn muốn suy ngẫm về điều gì?"
              className="w-full resize-none bg-white border border-border px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-300 outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
            />
            <p className="text-xs text-neutral-400">
              Câu hỏi chỉ tồn tại trong phiên này, không được lưu hoặc sao lưu.
            </p>
          </div>

          {/* Method selector */}
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-neutral-700">Phương pháp</p>
            <RadioGroup
              aria-label="Phương pháp lập quẻ"
              value={entryMethod}
              onValueChange={value => {
                const nextMethod = value as (typeof methods)[number]['value'];
                if (draft) {
                  setDraft({ ...draft, method: nextMethod });
                } else {
                  setMethod(nextMethod);
                }
              }}
              className="flex flex-col border border-border"
            >
              {methods.map(({ value, label, detail }) => {
                const selected = entryMethod === value;
                return (
                  <label
                    key={value}
                    className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-border last:border-b-0 transition-colors ${
                      selected ? 'bg-neutral-900' : 'bg-white hover:bg-neutral-50'
                    }`}
                  >
                    <RadioGroupItem id={`method-${value}`} value={value} className="sr-only" />
                    {/* Custom radio dot */}
                    <span
                      className={`flex-shrink-0 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        selected ? 'border-white' : 'border-neutral-300'
                      }`}
                      aria-hidden="true"
                    >
                      {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <span className="flex flex-col flex-1 min-w-0 py-0.5">
                      <span
                        className={`text-sm font-medium leading-snug ${selected ? 'text-white' : 'text-neutral-900'}`}
                      >
                        {label}
                      </span>
                      <span
                        className={`text-xs mt-0.5 leading-relaxed ${selected ? 'text-neutral-400' : 'text-neutral-400'}`}
                      >
                        {detail}
                      </span>
                    </span>
                  </label>
                );
              })}
            </RadioGroup>
          </div>

          {draft && (
            <p
              className="text-sm text-neutral-500 border-l-2 border-neutral-300 pl-3 py-0.5"
              role="status"
            >
              Bạn đang có bản gieo quẻ chưa hoàn tất.
            </p>
          )}

          {/* CTA */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={begin}
              className="w-full h-11 bg-neutral-900 text-white text-sm font-medium cursor-pointer hover:bg-neutral-800 transition-colors"
            >
              {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}
            </button>
            <p className="text-xs text-neutral-400 text-center leading-relaxed">
              Tải lại ứng dụng có thể làm mất dữ liệu chưa hoàn tất.
            </p>
          </div>
        </div>
      )}

      {replaceReading && (
        <ConfirmationDialog
          title="Lập quẻ mới?"
          confirmLabel="Thay quẻ hiện tại"
          cancelLabel="Giữ quẻ hiện tại"
          onCancel={() => setReplaceReading(false)}
          onConfirm={confirmReplacement}
        >
          Bắt đầu quẻ mới sẽ thay thế quẻ đã hoàn tất đang được giữ trong bộ nhớ.
        </ConfirmationDialog>
      )}
    </main>
  );
}
