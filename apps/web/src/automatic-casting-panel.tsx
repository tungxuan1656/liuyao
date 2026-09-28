import type { CoinTossResult } from '@liuyao/core';

type AutomaticCastingPanelProps = {
  step: number;
  lines: number[];
  tosses: readonly CoinTossResult[];
  onBack: () => void;
  onNext: () => void;
  onToss: () => void;
  onFinish: () => void;
};

export function AutomaticCastingPanel({
  step,
  lines,
  tosses,
  onBack,
  onNext,
  onToss,
  onFinish,
}: AutomaticCastingPanelProps) {
  return (
    <section className="reading-card automatic-casting" aria-labelledby="automatic-line-title">
      <p className="eyebrow">Từng hào · từ dưới lên</p>
      <h2 id="automatic-line-title">Hào {step + 1} trên 6</h2>
      <div className="toss-progress" aria-label={`${tosses.length} trên 6 hào đã gieo`}>
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className={index < tosses.length ? 'is-cast' : ''}>
            {index + 1}
          </span>
        ))}
      </div>
      {lines[step] !== undefined && (
        <div className="toss-result" role="status" aria-live="polite">
          <span>
            Hào {step + 1}
            {step === tosses.length - 1 ? ' vừa gieo' : ''}
          </span>
          <strong>{lines[step]}</strong>
          <span>Đồng xu: {tosses[step]?.coins.join(' · ')}</span>
        </div>
      )}
      <p>
        {tosses.length < 6
          ? 'Mỗi lần gieo tạo một hào bằng nguồn ngẫu nhiên an toàn của trình duyệt.'
          : 'Đã đủ sáu hào. Kiểm tra kết quả rồi tính quẻ.'}
      </p>
      <div className="flow-actions">
        <button type="button" disabled={step === 0} onClick={onBack}>
          Quay lại
        </button>
        {step < tosses.length && step === 5 && tosses.length === 6 ? (
          <button type="button" onClick={onFinish}>
            Tính quẻ
          </button>
        ) : step < tosses.length ? (
          <button type="button" onClick={onNext}>
            Tiếp theo
          </button>
        ) : (
          <button type="button" onClick={onToss}>
            Gieo hào
          </button>
        )}
      </div>
    </section>
  );
}
