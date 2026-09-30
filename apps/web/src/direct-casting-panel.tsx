import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
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
    <Card
      className="w-full border-0 shadow-none bg-white text-neutral-900"
      aria-label="Nhập giá trị hào, bắt đầu từ hào sáu"
    >
      <CardHeader className="flex flex-wrap items-center justify-between gap-4 p-0 pb-4">
        <div>
          <CardTitle className="text-lg font-medium">Chọn sáu hào</CardTitle>
          <p className="mt-1 text-sm text-neutral-500">
            Chọn một giá trị cho từng hào. Bắt đầu từ hào sáu.
          </p>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3 p-0">
        {[5, 4, 3, 2, 1, 0].map(index => (
          <div
            className="flex flex-col sm:flex-row sm:items-center gap-3 py-4 border-b border-neutral-100"
            key={index}
          >
            <span className="text-sm font-semibold text-neutral-500 w-20">Hào {index + 1}</span>
            <ToggleGroup
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full"
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
                    className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-2 h-auto p-2 w-full hover:bg-neutral-100 data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-none border-0"
                  >
                    <YaoSymbol
                      polarity={value === 7 || value === 9 ? 'yang' : 'yin'}
                      changing={value === 6 || value === 9}
                    />
                    <span className="flex flex-col items-center sm:items-start gap-1 min-w-0">
                      <strong className="text-sm leading-tight font-medium">
                        {presentation.name}
                      </strong>
                      <small className="text-xs leading-tight opacity-70">
                        {value === 6 || value === 9 ? 'Hào động' : 'Hào tĩnh'}
                      </small>
                    </span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        ))}
        <Button
          type="button"
          className="w-full min-h-[46px] rounded-none bg-neutral-900 text-white hover:bg-neutral-800 border-0"
          disabled={!canCalculate}
          onClick={onFinish}
        >
          Tính quẻ
        </Button>
        {!canCalculate && (
          <p className="text-sm text-neutral-500 text-center" role="status">
            Hãy chọn đủ sáu hào trước khi tính quẻ.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
