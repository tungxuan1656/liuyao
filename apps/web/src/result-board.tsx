import type { PrimaryLineResult, ReadingResult } from '@liuyao/core';
import { FactButton, type FactSelection } from './result-facts';
import {
  branchName,
  elementName,
  hexagramLabel,
  relativeName,
  stemName,
  trigramLabel,
} from './result-labels';

export function YaoSymbol({ line }: { line: PrimaryLineResult }) {
  const yang = line.polarity === 'yang';
  return (
    <span
      className={`yao-symbol${yang ? ' is-yang' : ''}`}
      role="img"
      aria-label={`${yang ? 'Yang' : 'Yin'}${line.changing ? ', moving' : ''}`}
    >
      {yang ? (
        <i />
      ) : (
        <>
          <i />
          <i />
        </>
      )}
      {line.changing && <b aria-hidden="true">{line.inputValue === 6 ? '✕' : '○'}</b>}
    </span>
  );
}
export function HexagramBoard({
  result,
  changed = false,
  trigramIds,
  select,
}: {
  result: ReadingResult;
  changed?: boolean;
  trigramIds?: { upper: ReadingResult['upperTrigramId']; lower: ReadingResult['lowerTrigramId'] };
  select: (fact: FactSelection) => void;
}) {
  const lines = [...result.lines].reverse();
  const changedId = changed ? result.changedHexagramId : null;
  return (
    <section
      className={`hexagram-panel${changed ? ' changed-panel' : ''}`}
      aria-label={changed ? 'Changed hexagram' : 'Primary hexagram'}
    >
      <div className="hexagram-heading">
        <div>
          <p className="result-kicker">{changed ? 'After moving lines' : 'Primary figure'}</p>
          <h2>
            {changed
              ? changedId
                ? hexagramLabel(changedId)
                : 'Changed hexagram unavailable'
              : hexagramLabel(result.primaryHexagramId)}
          </h2>
        </div>
        <span className="hexagram-number">
          {changed
            ? (changedId?.replace('hexagram-', '') ?? '—')
            : result.primaryHexagramId.replace('hexagram-', '')}
        </span>
      </div>
      <div className="trigram-pair">
        <FactButton
          fact={{
            id: 'result.upperTrigramId',
            label: 'Upper trigram',
            value: trigramLabel(trigramIds?.upper ?? result.upperTrigramId),
          }}
          onSelect={select}
        />
        <FactButton
          fact={{
            id: 'result.lowerTrigramId',
            label: 'Lower trigram',
            value: trigramLabel(trigramIds?.lower ?? result.lowerTrigramId),
          }}
          onSelect={select}
        />
      </div>
      {changed ? (
        <ol
          className="hexagram-lines"
          aria-label="Changed polarity, sixth line at top and first at bottom"
        >
          {lines.map(line => {
            const polarity = line.changing
              ? line.polarity === 'yin'
                ? 'yang'
                : 'yin'
              : line.polarity;
            return (
              <li key={line.position}>
                <span className="line-marker" aria-hidden="true" />
                <YaoSymbol line={{ ...line, polarity, changing: false }} />
                <span className="line-note">Changed polarity</span>
              </li>
            );
          })}
        </ol>
      ) : (
        <ol className="hexagram-lines" aria-label="Lines, sixth at top and first at bottom">
          {lines.map(line => {
            const branch = branchName(line.naJiaBranch);
            const stem = stemName(line.naJiaStem);
            return (
              <li key={line.position}>
                <span className="line-marker">
                  {line.position === result.shiPosition
                    ? 'Shi'
                    : line.position === result.yingPosition
                      ? 'Ying'
                      : ''}
                </span>
                <YaoSymbol line={line} />
                <span className="line-note">
                  {stem} {branch} · {elementName(line.element)} · {relativeName(line.relative)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
      {!changed && (
        <div className="palace-facts">
          <FactButton
            fact={{
              id: 'result.palaceId',
              label: 'Palace',
              value: result.palaceId.replace('palace-', '').replace(/-/g, ' '),
            }}
            onSelect={select}
          />
          <FactButton
            fact={{
              id: 'result.palaceElement',
              label: 'Palace element',
              value: elementName(result.palaceElement),
            }}
            onSelect={select}
          />
        </div>
      )}
    </section>
  );
}
