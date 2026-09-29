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
    <section
      className="reading-card line-entry-list direct-entry"
      aria-label="Nhập giá trị hào, bắt đầu từ hào sáu"
    >
      {[5, 4, 3, 2, 1, 0].map(index => (
        <label key={index}>
          Hào {index + 1}
          <div className="line-choices" role="group" aria-label={`Chọn hào ${index + 1}`}>
            {validValues.map(value => (
              <button
                type="button"
                key={value}
                aria-pressed={lines[index] === value}
                onClick={() => onChange(index, String(value))}
              >
                <span className="choice-line">
                  {value === 7 || value === 9 ? '━━━━━━' : '━━  ━━'}
                </span>
                <span>{['Âm động', 'Dương', 'Âm', 'Dương động'][value - 6]}</span>
                <small>{value}</small>
              </button>
            ))}
          </div>
        </label>
      ))}
      <button type="button" disabled={!canCalculate} onClick={onFinish}>
        Tính quẻ
      </button>
      {!canCalculate && (
        <p role="status">Hãy nhập giá trị hợp lệ cho cả sáu hào trước khi tính quẻ.</p>
      )}
    </section>
  );
}
