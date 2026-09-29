import type { CastingMethod, CoinTossResult } from '@liuyao/core';

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
    Đất: '⬡',
    Nước: '≈',
    Lửa: '♨',
    Gió: '⌁',
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
        <path d="M16 2v6m0 16v6M2 16h6m16 0h6M6.1 6.1l4.3 4.3m11.2 11.2 4.3 4.3m0-19.8-4.3 4.3m-11.2 11.2-4.3 4.3" />
      </svg>
      <svg className="coin-moon" viewBox="0 0 32 32" aria-hidden="true">
        <path d="M23.5 23.7A12.5 12.5 0 0 1 8.3 8.5 12.6 12.6 0 1 0 23.5 23.7Z" />
        <circle cx="23.5" cy="8.5" r="1" />
        <circle cx="27" cy="13" r=".7" />
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
      viewBox="0 0 180 128"
      role="img"
      aria-label="Mai rùa đang rung nhẹ trước khi nghiêng đổ đồng xu"
    >
      <defs>
        <radialGradient id="shell-base" cx="42%" cy="28%" r="75%">
          <stop stopColor="#b8a77b" />
          <stop offset=".56" stopColor="#786b4a" />
          <stop offset="1" stopColor="#454632" />
        </radialGradient>
        <linearGradient id="shell-rim" x2="0" y2="1">
          <stop stopColor="#d1c092" />
          <stop offset="1" stopColor="#5a513b" />
        </linearGradient>
        <filter id="shell-shadow" x="-30%" y="-30%" width="160%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <ellipse
        cx="90"
        cy="111"
        rx="57"
        ry="8"
        fill="#34372c"
        opacity=".23"
        filter="url(#shell-shadow)"
      />
      <g className="shell-body">
        <path
          d="M24 75c2-12 9-20 21-24 9-23 27-35 45-35s36 12 45 35c12 4 19 12 21 24-2 10-10 17-22 20H46C34 92 26 85 24 75Z"
          fill="url(#shell-base)"
          stroke="#4a4835"
          strokeWidth="3"
        />
        <path
          d="M45 52c7-20 22-30 45-30s38 10 45 30c-12 11-28 17-45 17S57 63 45 52Z"
          fill="none"
          stroke="#d1c092"
          strokeWidth="2"
          opacity=".82"
        />
        <path
          d="M90 23v45M47 51l43 17 43-17M64 31l-3 32m55-32 3 32"
          fill="none"
          stroke="#d1c092"
          strokeWidth="1.5"
          opacity=".7"
        />
        <path
          d="M29 73c17-7 38-10 61-10s44 3 61 10"
          fill="none"
          stroke="url(#shell-rim)"
          strokeWidth="5"
        />
        <path
          d="M49 91 43 104m88-13 6 13M71 94l-3 13m41-13 3 13"
          stroke="#797051"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path d="M82 96c1 8 6 11 10 11s9-3 10-11" fill="#55503b" stroke="#d1c092" strokeWidth="2" />
      </g>
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
  return (
    <section className="reading-card automatic-casting" aria-labelledby="automatic-line-title">
      <div className="casting-method-switch" role="group" aria-label="Số lượng đồng xu">
        {(['three-coin', 'four-coin'] as const).map(value => (
          <button
            key={value}
            type="button"
            aria-pressed={method === value}
            onClick={() => onMethodChange(value)}
            disabled={busy || tosses.length > 0}
          >
            {value === 'three-coin' ? 'Ba đồng xu' : 'Bốn đồng xu'}
          </button>
        ))}
      </div>
      <div className="toss-progress" aria-label={`${tosses.length} trên 6 hào đã gieo`}>
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className={index < tosses.length ? 'is-cast' : ''}>
            {index + 1}
          </span>
        ))}
      </div>
      <div className={`casting-stage ${busy ? 'is-casting' : ''}`} aria-hidden="true">
        <TurtleShell />
        <div className="dish-shadow" />
        <div className="coin-flight-path" />
        <div className="coin-dish">
          <div className="dish-interior" />
          <div className="coin-resting-place" aria-hidden="true" />
          {toss &&
            Array.from({ length: count }, (_, index) => (
              <div
                key={index}
                className={`falling-coin coin-${index + 1}${busy ? '' : ' is-settled'}`}
                style={
                  {
                    '--coin-index': index,
                    '--coin-x': `${(index - (count - 1) / 2) * (method === 'four-coin' ? 84 : 96)}px`,
                    '--coin-arc': `${-22 - (index % 2) * 9}px`,
                    '--coin-tilt': `${index % 2 ? 24 : -28}deg`,
                  } as React.CSSProperties
                }
              >
                <CoinArt value={toss.coins[index] ?? 0} name={names[index]} />
              </div>
            ))}
        </div>
      </div>
      <div className="casting-copy" aria-live="polite">
        <h2 id="automatic-line-title">Hào {step + 1} trên 6</h2>
        {toss && !busy ? (
          <div className="toss-result" role="status">
            <strong>Hào {toss.line}</strong>
            <span>
              {toss.coins
                .map(
                  (coin, index) =>
                    `${names[index] ? `${names[index]}: ` : ''}${coin ? 'mặt trời' : 'mặt trăng'}`,
                )
                .join(' · ')}
            </span>
          </div>
        ) : (
          <p>{busy ? 'Đồng xu đang lắng xuống…' : 'Gieo từng hào, bắt đầu từ dưới cùng.'}</p>
        )}
      </div>
      <div className="flow-actions">
        <button type="button" disabled={step === 0 || busy} onClick={onBack}>
          Quay lại
        </button>
        {step < tosses.length && step === 5 && tosses.length === 6 ? (
          <button type="button" disabled={busy} onClick={onFinish}>
            Tính quẻ
          </button>
        ) : step < tosses.length ? (
          <button type="button" disabled={busy} onClick={onNext}>
            Tiếp theo
          </button>
        ) : (
          <button type="button" disabled={busy} onClick={onToss}>
            {busy ? 'Đang gieo…' : 'Gieo hào'}
          </button>
        )}
      </div>
    </section>
  );
}
