import { useEffect, useRef, useState } from 'react';
import { getHexagram } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import { FactButton, FactInspector, type FactSelection } from './result-facts';
import { HexagramBoard, YaoSymbol } from './result-board';
import { branchName, elementName, hexagramLabel, relativeName, stemName } from './result-labels';
import './result-view.css';

export function ResultView() {
  const { reading } = useReadingSession();
  const [selectedFact, setSelectedFact] = useState<FactSelection | null>(null);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 899px)').matches);
  const closeButton = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const overflowBeforeDrawer = useRef<string | null>(null);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)');
    const update = () => {
      if (!media.matches) {
        if (overflowBeforeDrawer.current !== null) {
          document.body.style.overflow = overflowBeforeDrawer.current;
          overflowBeforeDrawer.current = null;
        }
        requestAnimationFrame(() => returnFocus.current?.focus());
      } else if (selectedFact && overflowBeforeDrawer.current === null) {
        overflowBeforeDrawer.current = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
      setCompact(media.matches);
    };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [selectedFact]);
  const closeInspector = () => {
    setSelectedFact(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };
  useEffect(() => {
    if (!selectedFact) return;
    if (compact) {
      if (overflowBeforeDrawer.current === null) {
        overflowBeforeDrawer.current = document.body.style.overflow;
      }
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => drawerRef.current?.focus());
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
        if (!compact) return;
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
        drawerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    if (compact) document.addEventListener('focusin', onFocusIn);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('focusin', onFocusIn);
      if (overflowBeforeDrawer.current !== null) {
        document.body.style.overflow = overflowBeforeDrawer.current;
        overflowBeforeDrawer.current = null;
      }
    };
  }, [selectedFact, compact]);
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
            ) : reading.result.changedHexagramId ? (
              <p className="no-change-note" role="status">
                Changed hexagram details are unavailable.
              </p>
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
      {selectedFact && compact && (
        <div
          className="drawer-layer"
          onMouseDown={event => {
            if (event.target === event.currentTarget) closeInspector();
          }}
        >
          <div className="drawer-scrim" aria-hidden="true" onClick={closeInspector} />
          <aside
            ref={drawerRef}
            className="fact-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedFact.label} fact details`}
            tabIndex={-1}
          >
            <FactInspector
              fact={selectedFact}
              close={closeInspector}
              closeRef={compact ? closeButton : undefined}
            />
          </aside>
        </div>
      )}
    </main>
  );
}
