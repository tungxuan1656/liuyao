import './yao-symbol.css';

type Props = {
  polarity: 'yin' | 'yang';
  changing?: boolean;
  className?: string;
};

/** Shared line geometry and a fixed-size moving marker, independent of font metrics. */
export function YaoSymbol({ polarity, changing = false, className = '' }: Props) {
  const yang = polarity === 'yang';
  return (
    <span
      className={`yao-glyph${changing ? ' is-moving' : ''}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={`${yang ? 'Dương' : 'Âm'}${changing ? ', động' : ''}`}
    >
      <span className="yao-strokes" aria-hidden="true">
        <i />
        {!yang && <i />}
      </span>
      <span className="yao-marker" aria-hidden="true">
        {changing && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          >
            {yang ? <circle cx="12" cy="12" r="7" /> : <path d="m6 6 12 12M18 6 6 18" />}
          </svg>
        )}
      </span>
    </span>
  );
}
