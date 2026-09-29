import type { LineValue } from '@liuyao/core';
import { getLinePresentation } from '../line-value-presentation';
import { YaoSymbol } from '../components/yao-symbol';

export function CastingHexagram({
  lines,
  step,
}: {
  lines: readonly (LineValue | undefined)[];
  step: number;
}) {
  return (
    <section className="forming-hexagram" aria-label="Quẻ đang hình thành">
      <h2>Quẻ đang hình thành</h2>
      <ol className="forming-lines" aria-label="Hào sáu ở trên, hào một ở dưới">
        {[5, 4, 3, 2, 1, 0].map(index => {
          const value = lines[index];
          const yang = value === 7 || value === 9;
          return (
            <li
              key={index}
              className={`${index === step ? 'is-current' : ''}${value !== undefined ? ' is-filled' : ''}`}
              aria-current={index === step ? 'step' : undefined}
            >
              <span className="forming-position">
                {index + 1}
                <span className="sr-only">. Hào {index + 1}</span>
              </span>
              {value !== undefined ? (
                <YaoSymbol
                  key={value}
                  className="forming-symbol"
                  polarity={yang ? 'yang' : 'yin'}
                  changing={value === 6 || value === 9}
                />
              ) : (
                <span className="forming-empty" aria-hidden="true" />
              )}
              <span className="forming-name">
                {value !== undefined
                  ? getLinePresentation(value).name
                  : index === step
                    ? 'Chờ gieo'
                    : '—'}
              </span>
            </li>
          );
        })}
      </ol>
      <p>
        Gieo từ hào dưới cùng · <strong>○ Dương động · × Âm động</strong>
      </p>
    </section>
  );
}
