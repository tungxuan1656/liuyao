import { ArrowRight, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { Badge } from './components/ui/badge';
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
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from './components/ui/field';
import { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { getLinePresentation } from './line-value-presentation';
import { useReadingSession } from './reading-session';
import { hexagramLabel } from './result-labels';
import { ROUTES } from './route-paths';
import './components/route-layout.css';

const methods = [
  { value: 'automatic', label: 'Gieo tự động', detail: 'Ứng dụng gieo đồng xu cho từng hào.' },
  { value: 'manual', label: 'Gieo thủ công', detail: 'Ghi lại mặt xu từ lần gieo của bạn.' },
  { value: 'direct', label: 'Nhập trực tiếp', detail: 'Chọn sáu hào từ kết quả đã có.' },
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

  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">Gieo quẻ</h1>
      </header>

      <div className="flex min-w-0 max-w-3xl flex-col gap-6">
        {reading ? (
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Quẻ hiện tại
              </CardTitle>
              {reading.question && <CardDescription>{reading.question}</CardDescription>}
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="font-serif text-3xl font-semibold">
                  {hexagramLabel(reading.result.primaryHexagramId)}
                </p>
                <p className="text-muted-foreground">
                  {reading.method === 'automatic'
                    ? 'Gieo tự động'
                    : reading.method === 'manual'
                      ? 'Gieo thủ công'
                      : 'Nhập trực tiếp'}
                </p>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold">Sáu hào đã lập</h2>
                <p className="leading-relaxed">
                  {reading.lines.map(line => getLinePresentation(line).name).join(' · ')}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex-wrap gap-3">
              <Button size="lg" render={<Link to={ROUTES.result} />}>
                Xem kết quả <ArrowRight data-icon="inline-end" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => setReplaceReading(true)}>
                Lập quẻ mới
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="reading-question">Câu hỏi (không bắt buộc)</FieldLabel>
                  <Textarea
                    id="reading-question"
                    placeholder="Bạn muốn hỏi về điều gì?"
                    value={entryQuestion}
                    onChange={event =>
                      draft
                        ? setDraft({ ...draft, question: event.target.value })
                        : setQuestion(event.target.value)
                    }
                  />
                </Field>
                <FieldSet>
                  <FieldLegend>Phương pháp lập quẻ</FieldLegend>
                  <RadioGroup
                    aria-label="Phương pháp lập quẻ"
                    value={entryMethod}
                    onValueChange={value => {
                      const nextMethod = value as (typeof methods)[number]['value'];
                      if (draft) setDraft({ ...draft, method: nextMethod });
                      else setMethod(nextMethod);
                    }}
                  >
                    {methods.map(({ value, label, detail }) => (
                      <FieldLabel key={value}>
                        <Field orientation="horizontal">
                          <RadioGroupItem value={value} />
                          <FieldContent>
                            <FieldTitle>{label}</FieldTitle>
                            <FieldDescription>{detail}</FieldDescription>
                          </FieldContent>
                        </Field>
                      </FieldLabel>
                    ))}
                  </RadioGroup>
                </FieldSet>
                {draft && (
                  <Badge variant="secondary" role="status">
                    Có quẻ đang gieo dở
                  </Badge>
                )}
              </FieldGroup>
            </CardContent>
            <CardFooter className="flex-col items-stretch gap-3 sm:flex-row sm:items-center">
              <Button size="lg" onClick={begin}>
                {draft ? 'Tiếp tục gieo quẻ' : 'Bắt đầu gieo quẻ'}{' '}
                <ArrowRight data-icon="inline-end" />
              </Button>
            </CardFooter>
          </Card>
        )}
        <Card>
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Các bước xem quẻ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <Badge variant="outline">1</Badge>
                <span>Chọn phương pháp và lập sáu hào.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline">2</Badge>
                <span>Xem quẻ chính, quẻ biến và dữ kiện từng hào.</span>
              </li>
              <li className="flex items-start gap-3">
                <Badge variant="outline">3</Badge>
                <span>Mở dữ kiện để xem giải thích và nguồn tham khảo.</span>
              </li>
            </ol>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="lg" render={<Link to={ROUTES.library} />}>
              <BookOpen data-icon="inline-start" /> Mở thư viện
              <ArrowRight data-icon="inline-end" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {replaceReading && (
        <ConfirmationDialog
          title="Lập quẻ mới?"
          confirmLabel="Thay quẻ hiện tại"
          cancelLabel="Giữ quẻ hiện tại"
          onCancel={() => setReplaceReading(false)}
          onConfirm={() => {
            clearSession();
            setReplaceReading(false);
          }}
        >
          Quẻ hiện tại sẽ bị xóa.
        </ConfirmationDialog>
      )}
    </main>
  );
}
