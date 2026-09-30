import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { getLinePresentation } from './line-value-presentation';
import { ConfirmationDialog } from './components/confirmation-dialog';
import './components/route-layout.css';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from './components/ui/card';
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
    <main className="route-page route-page--reading route-sections text-foreground">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-serif text-3xl font-medium tracking-tight sm:text-4xl">Lục Hào</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Lập quẻ sáu hào, từng bước rõ ràng và riêng tư.
        </p>
      </div>

      {/* Content */}
      {reading ? (
        <Card className="rounded-none shadow-none ring-1 ring-border">
          <CardHeader className="border-b">
            <CardTitle>Quẻ hiện tại</CardTitle>
            <CardDescription>
              {reading.question || 'Quẻ chưa đặt tên'} ·{' '}
              {reading.method === 'automatic'
                ? 'Gieo tự động'
                : reading.method === 'manual'
                  ? 'Gieo thủ công'
                  : 'Nhập trực tiếp'}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex flex-col gap-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Các hào, từ hào một đến sáu
              </p>
              <p className="text-sm text-foreground leading-relaxed font-medium">
                {reading.lines.map(l => getLinePresentation(l).name).join(' · ')}
              </p>
            </div>
          </CardContent>
          <CardFooter className="border-t flex-col items-stretch gap-2 pt-6">
            <Button className="w-full" size="lg" render={<Link to={ROUTES.result} />}>
              Xem kết quả
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" render={<Link to={ROUTES.library} />}>
                Thư viện
              </Button>
              <Button variant="outline" render={<Link to={ROUTES.settings} />}>
                Cài đặt
              </Button>
              <Button variant="outline" onClick={() => setReplaceReading(true)}>
                Lập mới
              </Button>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Card className="rounded-none shadow-none ring-1 ring-border">
          <CardHeader className="border-b">
            <CardTitle>Gieo quẻ mới</CardTitle>
            <CardDescription>Đặt câu hỏi và chọn cách lập quẻ.</CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              {/* Question field */}
              <Field>
                <FieldLabel htmlFor="reading-question">
                  Câu hỏi
                  <span className="font-normal normal-case tracking-normal text-muted-foreground ml-1 text-xs">
                    không bắt buộc
                  </span>
                </FieldLabel>
                <Textarea
                  id="reading-question"
                  value={entryQuestion}
                  onChange={event =>
                    draft
                      ? setDraft({ ...draft, question: event.target.value })
                      : setQuestion(event.target.value)
                  }
                  placeholder="Bạn muốn suy ngẫm về điều gì?"
                  className="px-3 border border-border border-b-border focus-visible:border-b-ring"
                />
                <FieldDescription>
                  Câu hỏi chỉ tồn tại trong phiên này, không được lưu hoặc sao lưu.
                </FieldDescription>
              </Field>

              {/* Method selector */}
              <FieldSet>
                <FieldLegend>Phương pháp</FieldLegend>
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
                  className="gap-0"
                >
                  {methods.map(({ value, label, detail }) => (
                    <FieldLabel
                      key={value}
                      className={`flex-row items-center gap-3 px-4 border-b-0! last:border-b! cursor-pointer transition-colors w-full ${
                        entryMethod === value ? 'bg-secondary text-foreground' : 'hover:bg-muted/60'
                      }`}
                    >
                      <Field orientation="horizontal" className="gap-3 w-full">
                        <RadioGroupItem
                          value={value}
                          className={entryMethod === value ? 'border-foreground' : ''}
                        />
                        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                          <span className={`text-sm font-medium normal-case tracking-normal`}>
                            {label}
                          </span>
                          <span className={`text-xs normal-case tracking-normal font-normal`}>
                            {detail}
                          </span>
                        </div>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </FieldSet>

              {draft && (
                <p
                  className="text-sm text-muted-foreground border-l-2 border-border pl-3"
                  role="status"
                >
                  Bạn đang có bản gieo quẻ chưa hoàn tất.
                </p>
              )}
            </FieldGroup>
          </CardContent>
          <CardFooter className="border-t flex-col items-stretch gap-2 pt-6">
            <Button size="lg" className="w-full" onClick={begin}>
              {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Tải lại ứng dụng có thể làm mất dữ liệu chưa hoàn tất.
            </p>
          </CardFooter>
        </Card>
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
