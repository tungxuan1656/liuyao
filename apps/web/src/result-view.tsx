import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { PrimaryLineResult, ReadingResult } from '@liuyao/core';
import {
  getHexagram,
  getSource,
  getRulesForFact,
  getTrigram,
  listSourceReferences,
} from '@liuyao/knowledge';
import type { KnowledgeFactId } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import './result-view.css';

type FactSelection = { id: KnowledgeFactId; label: string; value: string };

const elementNames: Record<string, string> = {
  wood: 'Wood',
  fire: 'Fire',
  earth: 'Earth',
  metal: 'Metal',
  water: 'Water',
};
const relativeNames: Record<string, string> = {
  sibling: 'Sibling',
  child: 'Child',
  wealth: 'Wealth',
  'official-ghost': 'Official Ghost',
  parent: 'Parent',
};
const stemNames: Record<string, string> = {
  jia: 'Jia',
  yi: 'Yi',
  bing: 'Bing',
  ding: 'Ding',
  wu: 'Wu',
  ji: 'Ji',
  geng: 'Geng',
  xin: 'Xin',
  ren: 'Ren',
  gui: 'Gui',
};
const branchNames: Record<string, string> = {
  zi: 'Zi',
  chou: 'Chou',
  yin: 'Yin',
  mao: 'Mao',
  chen: 'Chen',
  si: 'Si',
  wu: 'Wu',
  wei: 'Wei',
  shen: 'Shen',
  you: 'You',
  xu: 'Xu',
  hai: 'Hai',
};
const stemName = (value: string) => stemNames[value] ?? value;
const branchName = (value: string) => branchNames[value] ?? value;
const elementName = (value: string) => elementNames[value] ?? value;
const relativeName = (value: string) => relativeNames[value] ?? value;

function hexagramLabel(id: string) {
  const entity = getHexagram(id as Parameters<typeof getHexagram>[0]);
  return entity ? `${entity.han} ${entity.name}` : id;
}

function trigramLabel(id: ReadingResult['lowerTrigramId']) {
  const entity = getTrigram(id);
  return entity ? `${entity.han} ${entity.name}` : id;
}

function FactButton({
  fact,
  onSelect,
}: {
  fact: FactSelection;
  onSelect: (fact: FactSelection) => void;
}) {
  return (
    <button
      className="fact-link"
      type="button"
      onClick={() => onSelect(fact)}
      aria-label={`${fact.label}: ${fact.value}. Explain this fact`}
    >
      <span>{fact.label}</span>
      <strong>{fact.value}</strong>
      <span aria-hidden="true">↗</span>
    </button>
  );
}

function YaoSymbol({ line }: { line: PrimaryLineResult }) {
  const yang = line.polarity === 'yang';
  return (
    <span
      className={`yao-symbol${yang ? ' is-yang' : ''}`}
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

function HexagramBoard({
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
          <h2>{hexagramLabel(changedId ?? result.primaryHexagramId)}</h2>
        </div>
        <span className="hexagram-number">
          {(changedId ?? result.primaryHexagramId).replace('hexagram-', '')}
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
      <ol className="hexagram-lines" aria-label="Lines, sixth at top and first at bottom">
        {lines.map(line => {
          const polarity =
            changed && line.changing ? (line.polarity === 'yin' ? 'yang' : 'yin') : line.polarity;
          const shownLine = {
            ...line,
            polarity,
            changing: changed ? false : line.changing,
          };
          const branch = branchName(line.naJiaBranch);
          const stem = stemName(line.naJiaStem);
          return (
            <li className={line.changing ? 'is-moving' : ''} key={line.position}>
              <span className="line-marker">
                {line.position === result.shiPosition
                  ? 'Shi'
                  : line.position === result.yingPosition
                    ? 'Ying'
                    : ''}
              </span>
              <YaoSymbol line={shownLine} />
              <span className="line-note">
                {stem} {branch} · {elementName(line.element)} · {relativeName(line.relative)}
              </span>
            </li>
          );
        })}
      </ol>
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

function FactInspector({
  fact,
  close,
  closeRef,
}: {
  fact: FactSelection;
  close: () => void;
  closeRef?: RefObject<HTMLButtonElement | null>;
}) {
  const rules = getRulesForFact(fact.id);
  const references = listSourceReferences().filter(reference =>
    rules.some(rule => reference.targetIds.includes(rule.id)),
  );
  return (
    <div className="inspector-content">
      <div className="inspector-topline">
        <p className="result-kicker">Fact inspector</p>
        <button
          ref={closeRef}
          className="inspector-close"
          onClick={close}
          type="button"
          aria-label="Close fact inspector"
        >
          Close
        </button>
      </div>
      <h2>{fact.label}</h2>
      <p className="inspector-value">{fact.value}</p>
      <section className="inspector-section">
        <h3>Rule</h3>
        {rules.length ? (
          rules.map(rule => (
            <article className="rule-entry" key={rule.id}>
              <h4>{rule.title}</h4>
              <p>{rule.explanation}</p>
              <code>{rule.id}</code>
            </article>
          ))
        ) : (
          <p>No rule is mapped to this fact.</p>
        )}
      </section>
      <section className="inspector-section">
        <h3>Sources</h3>
        {references.length ? (
          references.map(reference => {
            const source = getSource(reference.sourceId);
            if (!source) return null;
            return (
              <article className="source-entry" key={reference.id}>
                <h4>{source.title}</h4>
                {reference.location && <p>{reference.location}</p>}
                <small>{source.author}</small>
                {sourceUrl(source.provenance) ? (
                  <a
                    href={sourceUrl(source.provenance) ?? undefined}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source
                  </a>
                ) : (
                  <span>Source details only</span>
                )}
              </article>
            );
          })
        ) : (
          <p>No source reference is recorded for this rule.</p>
        )}
      </section>
    </div>
  );
}

function sourceUrl(provenance: string) {
  return provenance.match(/https?:\/\/[^\s]+/)?.[0]?.replace(/[),.;]+$/, '') ?? null;
}

export function ResultView() {
  const { reading } = useReadingSession();
  const [selectedFact, setSelectedFact] = useState<FactSelection | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const closeInspector = () => {
    setSelectedFact(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };

  useEffect(() => {
    if (!selectedFact) return;
    const compact = window.matchMedia('(max-width: 767px)').matches;
    const previousOverflow = document.body.style.overflow;
    if (compact) {
      document.body.style.overflow = 'hidden';
      closeButton.current?.focus();
    }
    const getFocusable = () => {
      const drawer = document.querySelector<HTMLElement>('.fact-drawer');
      return Array.from(
        drawer?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter(element => element.getClientRects().length > 0);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeInspector();
      }
      if (event.key === 'Tab') {
        if (!window.matchMedia('(max-width: 767px)').matches) return;
        const focusable = getFocusable();
        if (!focusable.length) return;
        const last = focusable[focusable.length - 1]!;
        const first = focusable[0]!;
        const activeIndex = focusable.indexOf(document.activeElement as HTMLElement);
        if (event.shiftKey && activeIndex <= 0) {
          event.preventDefault();
          last.focus();
        } else if (
          !event.shiftKey &&
          (activeIndex === focusable.length - 1 || activeIndex === -1)
        ) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    const onFocusIn = (event: FocusEvent) => {
      if (
        compact &&
        event.target instanceof Node &&
        !document.querySelector('.fact-drawer')?.contains(event.target)
      ) {
        closeButton.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    if (compact) document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      if (compact) document.body.style.overflow = previousOverflow;
    };
  }, [selectedFact]);

  if (!reading)
    return (
      <main className="result-empty">
        <p className="result-kicker">No active result</p>
        <h1>Start with a reading</h1>
        <p>Your completed reading is held in memory for this browser session.</p>
        <Link className="result-primary-link" to={ROUTES.home}>
          Return to Reading
        </Link>
      </main>
    );

  function selectFact(fact: FactSelection) {
    const active = document.activeElement;
    returnFocus.current = active instanceof HTMLElement ? active : null;
    setSelectedFact(fact);
  }

  const changedHexagram = reading.result.changedHexagramId
    ? getHexagram(reading.result.changedHexagramId)
    : undefined;

  return (
    <main className="result-page">
      <header className="result-header">
        <div>
          <p className="result-kicker">Reading result · {reading.result.ruleset}</p>
          <h1>{reading.question || 'Untitled reading'}</h1>
          <p className="result-session-note">
            Facts calculated from your six lines. This reading stays in memory for this session
            only.
          </p>
        </div>
        <Link to={ROUTES.home} className="result-back-link">
          Reading setup
        </Link>
      </header>
      <div className="result-layout">
        <div className="result-board-column">
          <FactButton
            fact={{
              id: 'result.primaryHexagramId',
              label: 'Primary hexagram',
              value: hexagramLabel(reading.result.primaryHexagramId),
            }}
            onSelect={selectFact}
          />
          <div className="boards-grid">
            <HexagramBoard result={reading.result} select={selectFact} />
            {changedHexagram ? (
              <HexagramBoard
                result={reading.result}
                changed
                trigramIds={{
                  upper: changedHexagram.upperTrigramId,
                  lower: changedHexagram.lowerTrigramId,
                }}
                select={selectFact}
              />
            ) : (
              <p className="no-change-note">
                No moving lines. This reading has no changed hexagram.
              </p>
            )}
          </div>
          <section className="line-facts" aria-labelledby="line-facts-heading">
            <div className="line-facts-heading">
              <h2 id="line-facts-heading">Line facts</h2>
              <span>Sixth line at top</span>
            </div>
            {[...reading.result.lines].reverse().map(line => (
              <div className="line-fact-row" key={line.position}>
                <span className="line-fact-position">
                  {line.position}
                  <small>
                    {line.position === reading.result.shiPosition
                      ? 'Shi'
                      : line.position === reading.result.yingPosition
                        ? 'Ying'
                        : ''}
                  </small>
                </span>
                <YaoSymbol line={line} />
                <FactButton
                  fact={{
                    id: 'line.naJiaStem',
                    label: 'Na Jia',
                    value: `${stemName(line.naJiaStem)} ${branchName(line.naJiaBranch)}`,
                  }}
                  onSelect={selectFact}
                />
                <FactButton
                  fact={{ id: 'line.element', label: 'Element', value: elementName(line.element) }}
                  onSelect={selectFact}
                />
                <FactButton
                  fact={{
                    id: 'line.relative',
                    label: 'Relative',
                    value: relativeName(line.relative),
                  }}
                  onSelect={selectFact}
                />
                <span className="line-input-value">
                  {line.inputValue}
                  {line.changing ? ' · moving' : ''}
                  {line.changing && <small> → {line.polarity === 'yin' ? 'Yang' : 'Yin'}</small>}
                </span>
              </div>
            ))}
          </section>
        </div>
        <aside className="wide-inspector" aria-label="Fact inspector">
          {selectedFact ? (
            <FactInspector fact={selectedFact} close={closeInspector} />
          ) : (
            <div className="inspector-prompt">
              <p className="result-kicker">Fact inspector</p>
              <h2>Explore a result fact</h2>
              <p>Select any underlined fact to see its rule and source references.</p>
              <FactButton
                fact={{ id: 'result.ruleset', label: 'Ruleset', value: reading.result.ruleset }}
                onSelect={selectFact}
              />
            </div>
          )}
        </aside>
      </div>
      {selectedFact && (
        <div
          className="drawer-layer"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeInspector();
          }}
        >
          <button
            className="drawer-scrim"
            type="button"
            aria-label="Close fact inspector"
            onClick={closeInspector}
          />
          <aside
            className="fact-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedFact.label} fact details`}
          >
            <FactInspector fact={selectedFact} close={closeInspector} closeRef={closeButton} />
          </aside>
        </div>
      )}
    </main>
  );
}
