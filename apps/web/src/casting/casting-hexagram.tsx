import type { LineValue } from '@liuyao/core';
import { getLinePresentation } from '../line-value-presentation';
import { YaoSymbol } from '../components/yao-symbol';
import { cn } from '../lib/utils';

export function CastingHexagram({
  lines,
  step,
}: {
  lines: readonly (LineValue | undefined)[];
  step: number;
}) {
  return (
    <section aria-label="Quẻ đang hình thành">
      <ol
        className="forming-hexagram flex flex-col-reverse gap-1"
        aria-label="Hào sáu ở trên, hào một ở dưới"
      >
        {[0, 1, 2, 3, 4, 5].map(index => {
          const value = lines[index];
          const yang = value === 7 || value === 9;
          const isCurrent = index === step;
          return (
            <li
              key={index}
              className={cn(
                'forming-hexagram-row grid grid-cols-[12px_minmax(0,100px)] items-center gap-1 transition-opacity',
                value === undefined && !isCurrent ? 'opacity-30' : 'opacity-100',
                isCurrent && 'bg-muted',
              )}
              aria-current={isCurrent ? 'step' : undefined}
              aria-label={`Hào ${index + 1}: ${value === undefined ? 'Chờ gieo' : getLinePresentation(value).name}`}
            >
              <span
                className={cn(
                  'text-center text-xs font-medium',
                  isCurrent ? 'text-foreground' : 'text-muted-foreground',
                )}
                aria-hidden="true"
              >
                {index + 1}
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
                    className={cn(
                      'forming-hexagram-placeholder block h-1',
                      isCurrent ? 'bg-muted-foreground/50' : 'bg-muted',
                    )}
                    aria-hidden="true"
                  />
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
