import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { getLinePresentation } from './line-value-presentation';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { Button } from './components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
  { value: 'automatic', label: 'Gieo tự động', detail: 'Để ứng dụng gieo ba đồng xu.' },
  { value: 'manual', label: 'Gieo thủ công', detail: 'Tự ghi lại kết quả từng lần gieo.' },
  { value: 'direct', label: 'Nhập trực tiếp', detail: 'Nhập sáu hào đã có sẵn.' },
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
    <main className="mx-auto max-w-xl p-6 flex flex-col gap-10">
      <header className="text-center flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Không gian chiêm nghiệm
        </p>
        <h1 className="text-4xl font-serif font-bold">Lục Hào</h1>
        <p className="text-muted-foreground">Lập quẻ sáu hào, từng bước rõ ràng và riêng tư.</p>
      </header>

      {reading ? (
        <Card className="border-0 shadow-none" aria-labelledby="completed-reading-heading">
          <CardHeader>
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
              Đã lập quẻ
            </p>
            <CardTitle id="completed-reading-heading">
              {reading.question || 'Quẻ chưa đặt tên'}
            </CardTitle>
            <CardDescription>
              {reading.method === 'automatic'
                ? 'Gieo tự động'
                : reading.method === 'manual'
                  ? 'Gieo thủ công'
                  : 'Nhập trực tiếp'}
              {' · '}Mã quẻ chính {reading.result.primaryHexagramId}
              {reading.result.changedHexagramId &&
                ` · Quẻ biến ${reading.result.changedHexagramId}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm flex flex-col gap-2">
            <p>
              Các hào, từ hào một đến hào sáu:{' '}
              {reading.lines.map(l => getLinePresentation(l).name).join(', ')}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Quẻ này chỉ được giữ trong bộ nhớ và sẽ bị xóa nếu bạn tải lại ứng dụng.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button render={<Link to={ROUTES.result} />}>Xem kết quả</Button>
            <Button variant="outline" render={<Link to={ROUTES.library} />}>
              Thư viện
            </Button>
            <Button variant="outline" render={<Link to={ROUTES.settings} />}>
              Cài đặt
            </Button>
            <Button variant="outline" onClick={() => setReplaceReading(true)}>
              Lập quẻ mới
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className="border-0 shadow-none" aria-labelledby="new-reading-heading">
          <CardHeader>
            <CardTitle id="new-reading-heading">Lập quẻ mới</CardTitle>
            <CardDescription>
              Chọn cách lập quẻ phù hợp. Bạn có thể thay đổi lựa chọn trước khi bắt đầu.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup className="flex flex-col gap-6">
              <Field>
                <FieldLabel htmlFor="reading-question">Câu hỏi (không bắt buộc)</FieldLabel>
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
                />
                <FieldDescription>
                  Câu hỏi chỉ tồn tại trong phiên này, không được lưu hoặc sao lưu.
                </FieldDescription>
              </Field>
              <FieldSet className="flex flex-col gap-3">
                <FieldLegend>Phương pháp lập quẻ</FieldLegend>
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
                  className="flex flex-col gap-3"
                >
                  {methods.map(({ value, label, detail }) => (
                    <FieldLabel
                      key={value}
                      className="flex items-center gap-2 p-3 bg-muted/50 cursor-pointer hover:bg-muted"
                    >
                      <Field orientation="horizontal" className="flex gap-3 items-start">
                        <RadioGroupItem id={`method-${value}`} value={value} />
                        <span className="flex flex-col">
                          <strong>{label}</strong>
                          <small>{detail}</small>
                        </span>
                      </Field>
                    </FieldLabel>
                  ))}
                </RadioGroup>
              </FieldSet>
            </FieldGroup>
            {draft && (
              <p
                className="text-sm font-medium text-muted-foreground mt-4 text-center"
                role="status"
              >
                Bạn đang có bản gieo quẻ chưa hoàn tất. Tiếp tục để giữ lại tiến trình.
              </p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col gap-4 mt-6">
            <Button className="w-full h-12 text-base" type="button" onClick={begin}>
              {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Bản gieo chỉ tồn tại trong bộ nhớ phiên này. Tải lại ứng dụng có thể làm mất dữ liệu.
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
