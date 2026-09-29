import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { getLinePresentation } from './line-value-presentation';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { Button } from './components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from './components/ui/field';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Textarea } from './components/ui/textarea';

const methods = [
  {
    value: 'automatic',
    label: 'Gieo tự động',
    detail: 'Để ứng dụng gieo ba đồng xu.',
    glyph: '◎',
  },
  {
    value: 'manual',
    label: 'Gieo thủ công',
    detail: 'Tự ghi lại kết quả từng lần gieo.',
    glyph: '◐',
  },
  {
    value: 'direct',
    label: 'Nhập trực tiếp',
    detail: 'Nhập sáu hào đã có sẵn.',
    glyph: '≡',
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
    <main className="mx-auto max-w-lg px-5 py-12 flex flex-col gap-12">
      {/* Hero header */}
      <header className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
          Không gian chiêm nghiệm
        </p>
        <h1 className="text-5xl font-serif font-medium tracking-tight leading-none text-neutral-900">
          Lục Hào
        </h1>
        <p className="text-neutral-500 leading-relaxed max-w-[38ch]">
          Lập quẻ sáu hào, từng bước rõ ràng và riêng tư.
        </p>
      </header>

      {/* Content area */}
      {reading ? (
        <div className="flex flex-col gap-6" aria-labelledby="completed-reading-heading">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
              Đã lập quẻ
            </p>
            <h2
              id="completed-reading-heading"
              className="text-2xl font-serif font-medium text-neutral-900"
            >
              {reading.question || 'Quẻ chưa đặt tên'}
            </h2>
            <p className="text-sm text-neutral-500">
              {reading.method === 'automatic'
                ? 'Gieo tự động'
                : reading.method === 'manual'
                  ? 'Gieo thủ công'
                  : 'Nhập trực tiếp'}
            </p>
          </div>

          <div className="text-sm text-neutral-700 leading-relaxed p-4 bg-neutral-50">
            <span className="block text-xs text-neutral-400 mb-1">
              Các hào, từ hào một đến hào sáu
            </span>
            {reading.lines.map(l => getLinePresentation(l).name).join(' · ')}
          </div>

          <div className="flex flex-col gap-2">
            <Button className="w-full h-11" render={<Link to={ROUTES.result} />}>
              Xem kết quả
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="h-10 text-sm"
                render={<Link to={ROUTES.library} />}
              >
                Thư viện
              </Button>
              <Button
                variant="outline"
                className="h-10 text-sm"
                render={<Link to={ROUTES.settings} />}
              >
                Cài đặt
              </Button>
              <Button
                variant="outline"
                className="h-10 text-sm"
                onClick={() => setReplaceReading(true)}
              >
                Lập quẻ mới
              </Button>
            </div>
          </div>

          <p className="text-xs text-neutral-400 text-center">
            Quẻ chỉ được giữ trong bộ nhớ và sẽ bị xóa nếu bạn tải lại ứng dụng.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-8" aria-labelledby="new-reading-heading">
          <FieldGroup className="flex flex-col gap-6">
            {/* Question field */}
            <Field>
              <FieldLabel
                htmlFor="reading-question"
                className="text-sm font-medium text-neutral-700"
              >
                Câu hỏi <span className="text-neutral-400 font-normal">(không bắt buộc)</span>
              </FieldLabel>
              <Textarea
                id="reading-question"
                rows={3}
                value={entryQuestion}
                onChange={event =>
                  draft
                    ? setDraft({ ...draft, question: event.target.value })
                    : setQuestion(event.target.value)
                }
                placeholder="Bạn muốn suy ngẫm về điều gì?"
                className="mt-2 resize-none bg-white border border-border focus-visible:ring-1 focus-visible:ring-neutral-900 placeholder:text-neutral-300 text-neutral-800"
              />
              <FieldDescription className="text-xs text-neutral-400 mt-1.5">
                Câu hỏi chỉ tồn tại trong phiên này, không được lưu hoặc sao lưu.
              </FieldDescription>
            </Field>

            {/* Method selection */}
            <FieldSet>
              <FieldLegend className="text-sm font-medium text-neutral-600 mb-3">
                Phương pháp lập quẻ
              </FieldLegend>
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
                className="flex flex-col"
              >
                {methods.map(({ value, label, detail, glyph }) => (
                  <FieldLabel
                    key={value}
                    className={`flex items-center gap-4 px-4 py-3.5 cursor-pointer transition-colors border-b border-border first:border-t ${
                      entryMethod === value
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-900 hover:bg-neutral-50'
                    }`}
                  >
                    <Field orientation="horizontal" className="flex gap-4 items-center w-full">
                      <span
                        className={`font-serif text-lg w-5 text-center shrink-0 ${entryMethod === value ? 'text-neutral-300' : 'text-neutral-400'}`}
                        aria-hidden="true"
                      >
                        {glyph}
                      </span>
                      <span className="flex flex-col flex-1 min-w-0">
                        <span
                          className={`font-medium text-sm ${entryMethod === value ? 'text-white' : 'text-neutral-900'}`}
                        >
                          {label}
                        </span>
                        <span
                          className={`text-xs mt-0.5 ${entryMethod === value ? 'text-neutral-400' : 'text-neutral-400'}`}
                        >
                          {detail}
                        </span>
                      </span>
                      <RadioGroupItem id={`method-${value}`} value={value} className="sr-only" />
                    </Field>
                  </FieldLabel>
                ))}
              </RadioGroup>
            </FieldSet>
          </FieldGroup>

          {draft && (
            <p className="text-sm text-neutral-500 text-center py-2 bg-neutral-50" role="status">
              Bạn đang có bản gieo quẻ chưa hoàn tất. Tiếp tục để giữ lại tiến trình.
            </p>
          )}

          <div className="flex flex-col gap-3">
            <Button className="w-full h-12 text-base" type="button" onClick={begin}>
              {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}
            </Button>
            <p className="text-xs text-neutral-400 text-center">
              Bản gieo chỉ tồn tại trong bộ nhớ phiên này. Tải lại ứng dụng có thể làm mất dữ liệu.
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
