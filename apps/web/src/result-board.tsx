import type { ReadingResult } from '@liuyao/core';
import { YaoSymbol } from './components/yao-symbol';
import { Link } from 'react-router-dom';
import { FactButton, type FactSelection } from './result-facts';
import { ROUTES } from './route-paths';
import {
  branchName,
  elementName,
  hexagramLabel,
  relativeName,
  stemName,
  trigramLabel,
} from './result-labels';

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
      aria-label={changed ? 'Quẻ biến' : 'Quẻ chính'}
    >
      <div className="hexagram-heading">
        <div>
          <p className="result-kicker">{changed ? 'Sau khi đổi hào động' : 'Quẻ chính'}</p>
          <h2>
            {changed
              ? changedId
                ? hexagramLabel(changedId)
                : 'Không có thông tin quẻ biến'
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
        {changed ? (
          <>
            <Link
              className="fact-link"
              to={ROUTES.libraryDetail('trigram', trigramIds?.upper ?? result.upperTrigramId)}
            >
              <span>Ngoại quái</span>
              <strong>{trigramLabel(trigramIds?.upper ?? result.upperTrigramId)}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
            <Link
              className="fact-link"
              to={ROUTES.libraryDetail('trigram', trigramIds?.lower ?? result.lowerTrigramId)}
            >
              <span>Nội quái</span>
              <strong>{trigramLabel(trigramIds?.lower ?? result.lowerTrigramId)}</strong>
              <span aria-hidden="true">↗</span>
            </Link>
          </>
        ) : (
          <>
            <FactButton
              fact={{
                id: 'result.upperTrigramId',
                label: 'Ngoại quái',
                value: trigramLabel(trigramIds?.upper ?? result.upperTrigramId),
                libraryTarget: { kind: 'trigram', id: trigramIds?.upper ?? result.upperTrigramId },
              }}
              onSelect={select}
            />
            <FactButton
              fact={{
                id: 'result.lowerTrigramId',
                label: 'Nội quái',
                value: trigramLabel(trigramIds?.lower ?? result.lowerTrigramId),
                libraryTarget: { kind: 'trigram', id: trigramIds?.lower ?? result.lowerTrigramId },
              }}
              onSelect={select}
            />
          </>
        )}
      </div>
      {changed && changedId && (
        <FactButton
          fact={{
            id: 'result.changedHexagramId',
            label: 'Quẻ biến',
            value: hexagramLabel(changedId),
            libraryTarget: { kind: 'hexagram', id: changedId },
          }}
          onSelect={select}
        />
      )}
      {changed ? (
        <ol
          className="hexagram-lines"
          aria-label="Tính âm dương sau biến đổi; hào sáu ở trên, hào một ở dưới"
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
                <YaoSymbol polarity={polarity} />
                <span className="line-note">{line.changing ? 'Đã đổi âm dương' : ''}</span>
              </li>
            );
          })}
        </ol>
      ) : (
        <ol className="hexagram-lines" aria-label="Các hào, hào sáu ở trên và hào một ở dưới">
          {lines.map(line => {
            const branch = branchName(line.naJiaBranch);
            const stem = stemName(line.naJiaStem);
            return (
              <li key={line.position}>
                <span className="line-marker">
                  {line.position === result.shiPosition
                    ? 'Thế'
                    : line.position === result.yingPosition
                      ? 'Ứng'
                      : ''}
                </span>
                <YaoSymbol polarity={line.polarity} changing={line.changing} />
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
              label: 'Cung',
              value:
                (
                  {
                    'palace-heaven': 'Càn',
                    'palace-lake': 'Đoài',
                    'palace-fire': 'Ly',
                    'palace-thunder': 'Chấn',
                    'palace-wind': 'Tốn',
                    'palace-water': 'Khảm',
                    'palace-mountain': 'Cấn',
                    'palace-earth': 'Khôn',
                  } as const
                )[result.palaceId] ?? 'Không xác định',
            }}
            onSelect={select}
          />
          <FactButton
            fact={{
              id: 'result.palaceElement',
              label: 'Ngũ hành của cung',
              value: elementName(result.palaceElement),
            }}
            onSelect={select}
          />
        </div>
      )}
    </section>
  );
}
