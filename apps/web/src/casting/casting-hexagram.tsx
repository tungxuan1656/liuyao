import type { CoinTossResult } from '@liuyao/core';
import { getLinePresentation } from '../line-value-presentation';

export function CastingHexagram({
  tosses,
  step,
  busy,
}: {
  tosses: readonly CoinTossResult[];
  step: number;
  busy: boolean;
}) {
  return (
    <section className="forming-hexagram" aria-label="Quẻ đang hình thành">
      <h2>Quẻ đang hình thành</h2>
      <ol className="forming-lines" aria-label="Hào sáu ở trên, hào một ở dưới">
        {[5, 4, 3, 2, 1, 0].map(index => {
          const toss = busy && index === step ? undefined : tosses[index];
          const value = toss?.line;
          const yang = value === 7 || value === 9;
          return (
            <li
              key={index}
              className={`${index === step ? 'is-current' : ''}${toss ? ' is-filled' : ''}`}
              aria-current={index === step ? 'step' : undefined}
            >
              <span className="forming-position">
                {index + 1}
                <span className="sr-only">. Hào {index + 1}</span>
              </span>
              <span
                key={value ?? 'empty'}
                className={`forming-symbol${toss ? (yang ? ' is-yang' : ' is-yin') : ' is-empty'}`}
                aria-hidden="true"
              >
                {toss ? (
                  <>
                    <i />
                    {!yang && <i />}
                    {(value === 6 || value === 9) && <b>{value === 6 ? '×' : '○'}</b>}
                  </>
                ) : (
                  <span />
                )}
              </span>
              <span className="forming-name">
                {value
                  ? getLinePresentation(value).name
                  : index === step
                    ? busy
                      ? 'Đang gieo…'
                      : 'Chờ gieo'
                    : '—'}
              </span>
            </li>
          );
        })}
      </ol>
      <p>Gieo từ hào dưới cùng</p>
    </section>
  );
}
