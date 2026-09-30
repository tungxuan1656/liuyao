import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, LockKeyhole, Sparkles } from 'lucide-react';
import { useReadingSession } from './reading-session';
import { ROUTES } from './route-paths';
import { getLinePresentation } from './line-value-presentation';
import { hexagramLabel } from './result-labels';
import { ConfirmationDialog } from './components/confirmation-dialog';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardAction,
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
import './components/route-layout.css';

const methods = [
  { value: 'automatic', label: 'Gieo tự động', detail: 'Ứng dụng gieo từng hào bằng đồng xu.' },
  { value: 'manual', label: 'Gieo thủ công', detail: 'Ghi lại từng đồng xu bạn đã gieo.' },
  { value: 'direct', label: 'Nhập trực tiếp', detail: 'Nhập sáu hào khi đã có kết quả.' },
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
        <Badge variant="secondary">Không gian suy ngẫm</Badge>
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
          Một câu hỏi. Sáu hào.
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Lập quẻ, xem từng dữ kiện và tra cứu nguồn tri thức ngay trên thiết bị của bạn.
        </p>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        {reading ? (
          <Card className="min-w-0 lg:col-span-7">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Quẻ hiện tại
              </CardTitle>
              <CardDescription>{reading.question || 'Quẻ chưa đặt tên'}</CardDescription>
              <CardAction>
                <Badge variant="secondary">Trong phiên này</Badge>
              </CardAction>
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
          <Card className="min-w-0 lg:col-span-7">
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Gieo quẻ mới
              </CardTitle>
              <CardDescription>
                Đặt câu hỏi nếu muốn, rồi chọn cách lập quẻ phù hợp.
              </CardDescription>
              <CardAction>
                <Sparkles aria-hidden="true" className="size-5 text-muted-foreground" />
              </CardAction>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="reading-question">Câu hỏi (không bắt buộc)</FieldLabel>
                  <Textarea
                    id="reading-question"
                    value={entryQuestion}
                    onChange={event =>
                      draft
                        ? setDraft({ ...draft, question: event.target.value })
                        : setQuestion(event.target.value)
                    }
                    placeholder="Bạn muốn suy ngẫm về điều gì?"
                  />
                  <FieldDescription>
                    Câu hỏi chỉ tồn tại trong phiên trình duyệt này.
                  </FieldDescription>
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
              <p className="text-xs text-muted-foreground">
                Dữ liệu chưa hoàn tất có thể mất khi tải lại trang.
              </p>
            </CardFooter>
          </Card>
        )}

        <div className="grid min-w-0 gap-6 lg:col-span-5">
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Quy trình
              </CardTitle>
              <CardDescription>Ba bước để xem một quẻ Lục Hào.</CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="flex flex-col gap-4">
                <li className="flex gap-3">
                  <Badge variant="outline">01</Badge>
                  <span>Chọn cách gieo hoặc nhập sáu hào.</span>
                </li>
                <li className="flex gap-3">
                  <Badge variant="outline">02</Badge>
                  <span>Xem quẻ chính, quẻ biến và từng hào.</span>
                </li>
                <li className="flex gap-3">
                  <Badge variant="outline">03</Badge>
                  <span>Chạm vào dữ kiện để tra cứu quy tắc và nguồn.</span>
                </li>
              </ol>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Thư viện tri thức
              </CardTitle>
              <CardDescription>
                Quẻ, quái, thuật ngữ và quy tắc được tổ chức để tra cứu.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button variant="outline" size="lg" render={<Link to={ROUTES.library} />}>
                <BookOpen data-icon="inline-start" /> Mở thư viện
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <Card size="sm">
        <CardContent className="flex items-start gap-3">
          <LockKeyhole aria-hidden="true" className="size-5 shrink-0 text-muted-foreground" />
          <p className="text-muted-foreground">
            Quẻ và câu hỏi chỉ được giữ trong bộ nhớ của phiên hiện tại. Ứng dụng có thể hoạt động
            ngoại tuyến sau khi tải xong.
          </p>
        </CardContent>
      </Card>

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
          Bắt đầu quẻ mới sẽ thay thế quẻ đã hoàn tất đang được giữ trong bộ nhớ.
        </ConfirmationDialog>
      )}
    </main>
  );
}
