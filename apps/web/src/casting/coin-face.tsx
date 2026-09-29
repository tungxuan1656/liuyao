import { coinNames } from './coin-names';

export function CoinFace({ value, name }: { value: number; name?: string }) {
  const emblems: Record<string, string> = { Đất: '◇', Nước: '≈', Lửa: '△', Gió: '〰' };
  return (
    <span className={`coin-face ${value ? 'is-heads' : 'is-tails'}`}>
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
