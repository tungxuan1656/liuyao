import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { describeLineValue, getLinePresentation } from './line-value-presentation';

const validValues = [6, 7, 8, 9] as const;

type Props = {
  lines: number[];
  onChange: (index: number, value: string) => void;
  onFinish: () => void;
};

function DirectYaoSymbol({ value }: { value: (typeof validValues)[number] }) {
  const yang = value === 7 || value === 9;
  const moving = value === 6 || value === 9;
  return (
    <span className={`direct-yao-symbol ${yang ? 'is-yang' : 'is-yin'}`} aria-hidden="true">
      {yang ? (
        <i />
      ) : (
        <>
          <i />
          <i />
        </>
      )}
      {moving && <b>{value === 6 ? '✕' : '○'}</b>}
    </span>
  );
}

export function DirectCastingPanel({ lines, onChange, onFinish }: Props) {
  const canCalculate = Array.from({ length: 6 }, (_, index) =>
    validValues.includes(lines[index] as (typeof validValues)[number]),
  ).every(Boolean);

  return (
    <Card
      className="line-entry-list direct-entry"
      aria-label="Nhập giá trị hào, bắt đầu từ hào sáu"
    >
      {[5, 4, 3, 2, 1, 0].map(index => (
        <div className="direct-line-row" key={index}>
          <span className="direct-line-position">Hào {index + 1}</span>
          <div className="line-choices" role="group" aria-label={`Chọn hào ${index + 1}`}>
            {validValues.map(value => {
              const presentation = getLinePresentation(value);
              const selected = lines[index] === value;
              return (
                <Button
                  type="button"
                  key={value}
                  variant={selected ? 'secondary' : 'outline'}
                  className="line-choice-button"
                  aria-pressed={selected}
                  aria-label={`${presentation.name}, ${describeLineValue(value)}`}
                  onClick={() => onChange(index, String(value))}
                >
                  <DirectYaoSymbol value={value} />
                  <span className="line-choice-copy">
                    <strong>{presentation.name}</strong>
                    <small>{describeLineValue(value)}</small>
                  </span>
                </Button>
              );
            })}
          </div>
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
    </Card>
  );
}
