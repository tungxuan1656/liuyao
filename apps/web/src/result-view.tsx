import { useEffect, useRef, useState } from 'react';
import { getHexagram } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import { FactButton, FactInspector, type FactSelection } from './result-facts';
import { HexagramBoard } from './result-board';
import { YaoSymbol } from './components/yao-symbol';
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
        <p className="result-kicker">Chưa có kết quả</p>
        <h1>Bắt đầu bằng cách gieo quẻ</h1>
        <p>Quẻ đã hoàn tất chỉ được giữ trong bộ nhớ của phiên trình duyệt này.</p>
        <Link className="result-primary-link" to={ROUTES.home}>
          Quay lại trang gieo quẻ
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
          <p className="result-kicker">
            Kết quả gieo quẻ · Mã quy ước tính: {reading.result.ruleset}
          </p>
          <h1>{reading.question || 'Quẻ chưa đặt tên'}</h1>
          <p className="result-session-note">
            Các dữ kiện được tính từ sáu hào. Quẻ này chỉ được giữ trong bộ nhớ của phiên hiện tại.
          </p>
        </div>
        <Link to={ROUTES.home} className="result-back-link">
          Trang gieo quẻ
        </Link>
      </header>
      <div className="result-layout">
        <div className="result-board-column">
          <FactButton
            fact={{
              id: 'result.primaryHexagramId',
              label: 'Quẻ chính',
              value: hexagramLabel(reading.result.primaryHexagramId),
              libraryTarget: { kind: 'hexagram', id: reading.result.primaryHexagramId },
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
                Không có thông tin về quẻ biến.
              </p>
            ) : (
              <p className="no-change-note">Không có hào động nên quẻ này không có quẻ biến.</p>
            )}
          </div>
          <section className="line-facts" aria-labelledby="line-facts-heading">
            <div className="line-facts-heading">
              <h2 id="line-facts-heading">Thông tin các hào</h2>
              <span>Hào sáu ở trên</span>
            </div>
            {[...reading.result.lines].reverse().map(line => (
              <div className="line-fact-row" key={line.position}>
                <span className="line-fact-position">
                  {line.position}
                  <small>
                    {line.position === reading.result.shiPosition
                      ? 'Thế'
                      : line.position === reading.result.yingPosition
                        ? 'Ứng'
                        : ''}
                  </small>
                </span>
                <YaoSymbol polarity={line.polarity} changing={line.changing} />
                <FactButton
                  fact={{
                    id: 'line.naJiaStem',
                    label: 'Nạp Giáp',
                    value: `${stemName(line.naJiaStem)} ${branchName(line.naJiaBranch)}`,
                  }}
                  onSelect={selectFact}
                />
                <FactButton
                  fact={{ id: 'line.element', label: 'Ngũ hành', value: elementName(line.element) }}
                  onSelect={selectFact}
                />
                <FactButton
                  fact={{
                    id: 'line.relative',
                    label: 'Lục thân',
                    value: relativeName(line.relative),
                  }}
                  onSelect={selectFact}
                />
                <span className="line-input-value">
                  {line.inputValue}
                  {line.changing ? ' · động' : ''}
                  {line.changing && <small> → {line.polarity === 'yin' ? 'Dương' : 'Âm'}</small>}
                </span>
              </div>
            ))}
          </section>
        </div>
        <aside className="wide-inspector" aria-label="Giải thích dữ kiện">
          {selectedFact ? (
            <FactInspector fact={selectedFact} close={closeInspector} />
          ) : (
            <div className="inspector-prompt">
              <p className="result-kicker">Giải thích dữ kiện</p>
              <h2>Khám phá dữ kiện của kết quả</h2>
              <p>Chọn dữ kiện được gạch chân để xem quy tắc và nguồn tham khảo.</p>
              <FactButton
                fact={{
                  id: 'result.ruleset',
                  label: 'Quy ước tính',
                  value: reading.result.ruleset,
                }}
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
            aria-label={`Chi tiết dữ kiện: ${selectedFact.label}`}
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
