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
    <section className="flex flex-col gap-3" aria-label="Quẻ đang hình thành">
      <h2 className="text-xs font-medium text-neutral-500 tracking-wide uppercase">
        Quẻ đang hình thành
      </h2>
      <ol
        className="forming-hexagram flex flex-col-reverse gap-1.5"
        aria-label="Hào sáu ở trên, hào một ở dưới"
      >
        {[0, 1, 2, 3, 4, 5].map(index => {
          const value = lines[index];
          const yang = value === 7 || value === 9;
          const isCurrent = index === step;
          return (
            <li
              key={index}
              className={`forming-hexagram-row grid grid-cols-[24px_100px_minmax(0,1fr)] items-center gap-3 py-1 transition-opacity ${
                value === undefined && !isCurrent ? 'opacity-30' : 'opacity-100'
              }`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span
                className={`w-6 text-center text-[11px] shrink-0 font-medium ${
                  isCurrent ? 'text-neutral-900' : 'text-neutral-400'
                }`}
                aria-hidden="true"
              >
                {index + 1}
                <span className="sr-only">. Hào {index + 1}</span>
              </span>
              <div className="forming-hexagram-symbol">
                {value !== undefined ? (
                  <YaoSymbol
                    key={value}
                    polarity={yang ? 'yang' : 'yin'}
                    changing={value === 6 || value === 9}
                  />
                ) : (
                  <span
                    className={`block h-2 w-[72px] rounded-full ${isCurrent ? 'bg-neutral-300' : 'bg-neutral-100'}`}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span
                className={`text-xs leading-none ${
                  value !== undefined
                    ? 'text-neutral-700'
                    : isCurrent
                      ? 'text-neutral-400'
                      : 'text-neutral-200'
                }`}
              >
                {value !== undefined
                  ? getLinePresentation(value).name
                  : isCurrent
                    ? 'Chờ gieo'
                    : '—'}
              </span>
            </li>
          );
        })}
      </ol>
      <p className="text-[11px] text-neutral-400 leading-relaxed border-t border-neutral-100 pt-3 mt-1">
        Gieo từ hào dưới cùng ·{' '}
        <strong className="font-medium text-neutral-600">○ Dương động · × Âm động</strong>
      </p>
    </section>
  );
}
