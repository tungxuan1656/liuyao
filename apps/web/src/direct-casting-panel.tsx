import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Separator } from './components/ui/separator';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { getLinePresentation } from './line-value-presentation';
import { YaoSymbol } from './components/yao-symbol';

const validValues = [6, 7, 8, 9] as const;

type Props = {
  lines: number[];
  onChange: (index: number, value: string) => void;
  onFinish: () => void;
};

export function DirectCastingPanel({ lines, onChange, onFinish }: Props) {
  const canCalculate = Array.from({ length: 6 }, (_, index) =>
    validValues.includes(lines[index] as (typeof validValues)[number]),
  ).every(Boolean);

  return (
    <Card aria-label="Nhập giá trị hào, bắt đầu từ hào sáu">
      <CardHeader>
        <CardTitle>Chọn sáu hào</CardTitle>
        <CardDescription>Chọn một giá trị cho từng hào. Bắt đầu từ hào sáu.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {[5, 4, 3, 2, 1, 0].map(index => (
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex flex-col gap-3">
              <Badge variant="secondary">Hào {index + 1}</Badge>
              <ToggleGroup
                variant="outline"
                size="lg"
                className="grid w-full grid-cols-2 gap-2 sm:grid-cols-4"
                aria-label={`Chọn hào ${index + 1}`}
                value={
                  validValues.includes(lines[index] as (typeof validValues)[number])
                    ? [String(lines[index])]
                    : []
                }
                onValueChange={value => {
                  if (!value[0] || Number(value[0]) === lines[index]) return;
                  onChange(index, value[0]);
                }}
              >
                {validValues.map(value => {
                  const presentation = getLinePresentation(value);
                  return (
                    <ToggleGroupItem
                      key={value}
                      value={String(value)}
                      aria-label={`${presentation.name}, ${presentation.polarity}, ${presentation.motion}${presentation.changesTo ? `, biến thành ${presentation.changesTo}` : ''}`}
                      // The yao symbol and two lines of text need more height than a standard toggle.
                      className="h-auto min-h-16 min-w-0 flex-col gap-1 px-2 py-2"
                    >
                      <YaoSymbol
                        polarity={value === 7 || value === 9 ? 'yang' : 'yin'}
                        changing={value === 6 || value === 9}
                      />
                      <span>{presentation.name}</span>
                      <span className="text-muted-foreground">
                        {value === 6 || value === 9 ? 'Hào động' : 'Hào tĩnh'}
                      </span>
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </div>
            {index > 0 && <Separator />}
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-2 sm:items-start">
        <Button type="button" size="lg" disabled={!canCalculate} onClick={onFinish}>
          Tính quẻ
        </Button>
        {!canCalculate && (
          <p className="text-muted-foreground" role="status">
            Hãy chọn đủ sáu hào trước khi tính quẻ.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
