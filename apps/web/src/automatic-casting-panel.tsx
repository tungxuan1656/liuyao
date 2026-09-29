import type { CastingMethod, CoinTossResult } from '@liuyao/core';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { getLinePresentation, describeLineValue } from './line-value-presentation';
import { CoinStage } from './casting/coin-stage';
import { coinNames } from './casting/coin-names';
import { CastingHexagram } from './casting/casting-hexagram';
import './casting/casting-workspace.css';

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
  onAnimationComplete: () => void;
};

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
  onAnimationComplete,
}: Props) {
  const toss = tosses[step];
  const count = method === 'three-coin' ? 3 : 4;
  const completed = Boolean(toss) && !busy;
  const final = completed && step === 5;
  const revealedCount = tosses.length - (busy ? 1 : 0);
  return (
    <Card className="automatic-casting" aria-label="Gieo từng hào">
      <header className="casting-workspace-header">
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
        <span className="casting-count">{revealedCount} / 6 hào</span>
      </header>
      <div className="casting-workspace-body">
        <CastingHexagram tosses={tosses} step={step} busy={busy} />
        <section className="casting-theater" aria-label="Sân khấu gieo đồng xu">
          <CoinStage count={count} toss={toss} busy={busy} onComplete={onAnimationComplete} />
          <div className="casting-copy" aria-live="polite">
            {completed && toss ? (
              <div className="toss-result" role="status">
                <div className="toss-result-heading">
                  <span>Hào {step + 1}</span>
                  <strong data-line-value={toss.line}>{getLinePresentation(toss.line).name}</strong>
                </div>
                <span className="sr-only">{describeLineValue(toss.line)}</span>
                <span className="coin-evidence">
                  {toss.coins
                    .map(
                      (coin, index) =>
                        `${count === 4 ? `${coinNames[index]}: ` : ''}${coin ? 'mặt trời' : 'mặt trăng'}`,
                    )
                    .join(' · ')}
                </span>
              </div>
            ) : (
              <div className="casting-status-placeholder" role="status">
                <span>Hào {step + 1}</span>
                <p>{busy ? 'Đồng xu đang rơi…' : 'Tĩnh tâm, rồi gieo một hào.'}</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <footer className="casting-action-bar">
        <Button
          type="button"
          variant="ghost"
          className="casting-back-action"
          disabled={step === 0 || busy}
          onClick={onBack}
        >
          Quay lại
        </Button>
        <span className="casting-action-hint">
          {final ? 'Sáu hào đã đủ' : 'Mỗi lần gieo, một hào thành hình'}
        </span>
        <Button
          type="button"
          className="casting-primary-action"
          disabled={busy}
          onClick={final ? onFinish : completed ? onNext : onToss}
        >
          {busy ? 'Đang gieo…' : final ? 'Tính quẻ' : completed ? 'Tiếp theo' : 'Gieo hào'}
        </Button>
      </footer>
    </Card>
  );
}
