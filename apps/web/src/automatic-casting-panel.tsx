import type { CSSProperties } from 'react';
import type { CastingMethod, CoinTossResult } from '@liuyao/core';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { describeLineValue, getLinePresentation } from './line-value-presentation';

type Props = {
  step: number;
  tosses: readonly CoinTossResult[];
  method: CastingMethod;
  busy: boolean;
  onMethodChange: (method: CastingMethod) => void;
  onBack: () => void;
  onNext: () => void;
  onToss: () => void;
  onFinish: () => void;
};

export const coinNames = ['Đất', 'Nước', 'Lửa', 'Gió'] as const;

export function CoinFace({
  value,
  name,
  compact = false,
}: {
  value: number;
  name?: string;
  compact?: boolean;
}) {
  const emblems: Record<string, string> = {
    Đất: '◇',
    Nước: '≈',
    Lửa: '△',
    Gió: '〰',
  };
  return (
    <span className={`coin-face ${value ? 'is-heads' : 'is-tails'}${compact ? ' is-compact' : ''}`}>
      {name && (
        <span
          className={`coin-emblem emblem-${coinNames.indexOf(name as (typeof coinNames)[number])}`}
          aria-hidden="true"
        >
          {emblems[name]}
        </span>
      )}
      <svg className="coin-sun" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="5" />
        <path d="M16 3v5m0 16v5M3 16h5m16 0h5M6.8 6.8l3.7 3.7m11 11 3.7 3.7m0-18.4-3.7 3.7m-11 11-3.7 3.7" />
      </svg>
      <svg className="coin-moon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M23.5 23.7A12.5 12.5 0 0 1 8.3 8.5 12.6 12.6 0 1 0 23.5 23.7Z" />
      </svg>
      <span className="sr-only">
        {name ? `${name}, ` : ''}
        {value ? 'mặt trời' : 'mặt trăng'}
      </span>
    </span>
  );
}

function TurtleShell() {
  return (
    <svg
      className="shell-art"
      viewBox="0 0 160 96"
      role="img"
      aria-label="Mai rùa cách điệu dùng trong thao tác gieo quẻ"
    >
      <path
        className="shell-fill"
        d="M30 65c4-25 22-43 50-43s46 18 50 43c-10 9-27 14-50 14S40 74 30 65Z"
      />
      <path className="shell-outline" d="M30 65c4-25 22-43 50-43s46 18 50 43" />
      <path className="shell-grid" d="M80 24v49M47 48l33 25 33-25M58 31l-7 33m51-33 7 33M39 63h82" />
      <path className="shell-base" d="M27 66c14 8 32 12 53 12s39-4 53-12" />
      <path className="shell-feet" d="M51 76l-4 9m24-6-2 10m40-13 4 9M89 79l2 10" />
    </svg>
  );
}

function CoinArt({ value, name }: { value: number; name?: string }) {
  return (
    <div
      className={`casting-coin ${value ? 'is-heads' : 'is-tails'} ${name ? `element-${coinNames.indexOf(name as (typeof coinNames)[number])}` : ''}`}
    >
      <CoinFace value={value} name={name} />
    </div>
  );
}

export function AutomaticCastingPanel({
  step,
  tosses,
  method,
  busy,
  onMethodChange,
  onBack,
  onNext,
  onToss,
  onFinish,
}: Props) {
  const toss = tosses[step];
  const count = method === 'three-coin' ? 3 : 4;
  const names: readonly (string | undefined)[] =
    method === 'four-coin' ? coinNames : [undefined, undefined, undefined];

  const isCompletedLine = step < tosses.length;
  const isFinalCompletedLine = isCompletedLine && step === 5 && tosses.length === 6;
  const primaryLabel = isFinalCompletedLine ? 'Tính quẻ' : isCompletedLine ? 'Tiếp theo' : 'Gieo hào';
  const primaryAction = isFinalCompletedLine ? onFinish : isCompletedLine ? onNext : onToss;
  const presentation = toss ? getLinePresentation(toss.line) : null;

  return (
    <Card className="automatic-casting" aria-labelledby="automatic-line-title">
      <div className="casting-method-switch" role="group" aria-label="Số lượng đồng xu">
        {(['three-coin', 'four-coin'] as const).map(value => (
          <Button
            key={value}
            type="button"
            size="sm"
            variant={method === value ? 'secondary' : 'ghost'}
            className="casting-method-button"
            aria-pressed={method === value}
            onClick={() => onMethodChange(value)}
            disabled={busy || tosses.length > 0}
          >
            {value === 'three-coin' ? 'Ba đồng xu' : 'Bốn đồng xu'}
          </Button>
        ))}
      </div>

      <div className="toss-progress" aria-label={`${tosses.length} trên 6 hào đã gieo`}>
        {Array.from({ length: 6 }, (_, index) => (
          <span
            key={index}
            className={index < tosses.length ? 'is-cast' : index === step ? 'is-current' : ''}
          >
            {index + 1}
          </span>
        ))}
      </div>

      <div className={`casting-stage ${busy ? 'is-casting' : ''}`} aria-hidden="true">
        <TurtleShell />
        <div className="coin-dish">
          <span />
        </div>
        {toss &&
          Array.from({ length: count }, (_, index) => (
            <div
              key={index}
              className={`falling-coin coin-${index + 1}${busy ? '' : ' is-settled'}`}
              style={
                {
                  '--coin-index': index,
                  '--coin-x': `${(index - (count - 1) / 2) * (method === 'four-coin' ? 72 : 84)}px`,
                  '--coin-tilt': `${index % 2 ? 18 : -20}deg`,
                  '--coin-delay': `${0.28 + index * 0.08}s`,
                } as CSSProperties
              }
            >
              <CoinArt value={toss.coins[index] ?? 0} name={names[index]} />
            </div>
          ))}
      </div>

      <div className="casting-copy" aria-live="polite">
        <h2 id="automatic-line-title">Hào {step + 1} trên 6</h2>
        {toss && !busy && presentation ? (
          <div className="toss-result" role="status">
            <div className="toss-result-heading">
              <strong data-line-value={toss.line}>{presentation.name}</strong>
              <span>
                {describeLineValue(toss.line)} · giá trị {toss.line}
              </span>
            </div>
            <span className="coin-evidence">
              {toss.coins
                .map(
                  (coin, index) =>
                    `${names[index] ? `${names[index]}: ` : ''}${coin ? 'mặt trời' : 'mặt trăng'}`,
                )
                .join(' · ')}
            </span>
          </div>
        ) : (
          <div className="casting-status-placeholder" role={busy ? 'status' : undefined}>
            {busy ? 'Đồng xu đang rơi và lắng xuống…' : 'Gieo từng hào, bắt đầu từ dưới cùng.'}
          </div>
        )}
      </div>

      <div className="casting-action-bar">
        <Button
          type="button"
          variant="outline"
          className="casting-back-action"
          disabled={step === 0 || busy}
          onClick={onBack}
        >
          Quay lại
        </Button>
        <Button
          type="button"
          className="casting-primary-action"
          disabled={busy}
          onClick={primaryAction}
        >
          {busy ? 'Đang gieo…' : primaryLabel}
        </Button>
      </div>
    </Card>
  );
}
