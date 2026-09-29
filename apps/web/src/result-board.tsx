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
      className={`min-w-0 border border-border bg-card p-4 ${changed ? 'bg-muted/40' : ''}`}
      aria-label={changed ? 'Quẻ biến' : 'Quẻ chính'}
    >
      <div className="mb-2 flex items-start justify-between gap-2 border-b border-border pb-2">
        <div>
          <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-1">
            {changed ? 'Sau khi đổi hào động' : 'Quẻ chính'}
          </p>
          <h2 className="text-lg font-medium m-0">
            {changed
              ? changedId
                ? hexagramLabel(changedId)
                : 'Không có thông tin quẻ biến'
              : hexagramLabel(result.primaryHexagramId)}
          </h2>
        </div>
        <span className="text-xl text-neutral-400 font-serif">
          {changed
            ? (changedId?.replace('hexagram-', '') ?? '—')
            : result.primaryHexagramId.replace('hexagram-', '')}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 py-1 mb-2">
        {changed ? (
          <>
            <Link
              className="flex-1 min-w-[130px] min-h-[44px] inline-flex items-center justify-between gap-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 border-b border-dotted border-neutral-300 hover:border-solid hover:border-neutral-900 transition-all"
              to={ROUTES.libraryDetail('trigram', trigramIds?.upper ?? result.upperTrigramId)}
            >
              <span>Ngoại quái</span>
              <strong className="text-neutral-900 text-right font-semibold">
                {trigramLabel(trigramIds?.upper ?? result.upperTrigramId)}
              </strong>
              <span aria-hidden="true" className="text-[0.7rem] text-neutral-400">
                ↗
              </span>
            </Link>
            <Link
              className="flex-1 min-w-[130px] min-h-[44px] inline-flex items-center justify-between gap-1 px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 border-b border-dotted border-neutral-300 hover:border-solid hover:border-neutral-900 transition-all"
              to={ROUTES.libraryDetail('trigram', trigramIds?.lower ?? result.lowerTrigramId)}
            >
              <span>Nội quái</span>
              <strong className="text-neutral-900 text-right font-semibold">
                {trigramLabel(trigramIds?.lower ?? result.lowerTrigramId)}
              </strong>
              <span aria-hidden="true" className="text-[0.7rem] text-neutral-400">
                ↗
              </span>
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
        <div className="mb-2">
          <FactButton
            fact={{
              id: 'result.changedHexagramId',
              label: 'Quẻ biến',
              value: hexagramLabel(changedId),
              libraryTarget: { kind: 'hexagram', id: changedId },
            }}
            onSelect={select}
          />
        </div>
      )}
      {changed ? (
        <ol
          className="flex flex-col gap-1 my-2 p-0 list-none"
          aria-label="Tính âm dương sau biến đổi; hào sáu ở trên, hào một ở dưới"
        >
          {lines.map(line => {
            const polarity = line.changing
              ? line.polarity === 'yin'
                ? 'yang'
                : 'yin'
              : line.polarity;
            return (
              <li
                key={line.position}
                className="min-h-[25px] grid grid-cols-[24px_72px_1fr] items-center gap-2"
              >
                <span
                  className="text-[0.6rem] font-bold text-neutral-900 text-right"
                  aria-hidden="true"
                />
                <div className="text-neutral-900 flex justify-center">
                  <YaoSymbol polarity={polarity} />
                </div>
                <span className="overflow-hidden text-[0.65rem] text-neutral-500 whitespace-nowrap text-ellipsis">
                  {line.changing ? 'Đã đổi âm dương' : ''}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <ol
          className="flex flex-col gap-1 my-2 p-0 list-none"
          aria-label="Các hào, hào sáu ở trên và hào một ở dưới"
        >
          {lines.map(line => {
            const branch = branchName(line.naJiaBranch);
            const stem = stemName(line.naJiaStem);
            return (
              <li
                key={line.position}
                className="min-h-[25px] grid grid-cols-[24px_72px_1fr] items-center gap-2"
              >
                <span className="text-[0.6rem] font-bold text-neutral-900 text-right">
                  {line.position === result.shiPosition
                    ? 'Thế'
                    : line.position === result.yingPosition
                      ? 'Ứng'
                      : ''}
                </span>
                <div className="flex justify-center">
                  <YaoSymbol polarity={line.polarity} changing={line.changing} />
                </div>
                <span className="overflow-hidden text-[0.65rem] text-neutral-500 whitespace-nowrap text-ellipsis">
                  {stem} {branch} · {elementName(line.element)} · {relativeName(line.relative)}
                </span>
              </li>
            );
          })}
        </ol>
      )}
      {!changed && (
        <div className="grid grid-cols-1 gap-2 mt-4 pt-4 border-t border-neutral-200">
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
