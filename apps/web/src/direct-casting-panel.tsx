import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { getLinePresentation } from './line-value-presentation';
import { YaoSymbol } from './components/yao-symbol';
import './casting/input-workspace.css';

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
      className="line-entry-list direct-entry input-workspace"
      aria-label="Nhập giá trị hào, bắt đầu từ hào sáu"
    >
      <CardHeader className="input-workspace-header">
        <div>
          <CardTitle>Chọn sáu hào</CardTitle>
          <p>Chọn một giá trị cho từng hào. Bắt đầu từ hào sáu.</p>
        </div>
      </CardHeader>
      <CardContent className="direct-entry-content">
        {[5, 4, 3, 2, 1, 0].map(index => (
          <div className="direct-line-row" key={index}>
            <span className="direct-line-position">Hào {index + 1}</span>
            <ToggleGroup
              className="line-choices"
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
                    className="line-choice-button"
                  >
                    <YaoSymbol
                      polarity={value === 7 || value === 9 ? 'yang' : 'yin'}
                      changing={value === 6 || value === 9}
                    />
                    <span className="line-choice-copy">
                      <strong>{presentation.name}</strong>
                      <small>{value === 6 || value === 9 ? 'Hào động' : 'Hào tĩnh'}</small>
                    </span>
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        ))}
        <Button
          type="button"
          className="direct-calculate"
          disabled={!canCalculate}
          onClick={onFinish}
        >
          Tính quẻ
        </Button>
        {!canCalculate && <p role="status">Hãy chọn đủ sáu hào trước khi tính quẻ.</p>}
      </CardContent>
    </Card>
  );
}
