import type { LineValue } from '@liuyao/core';
import { describeLineValue, getLinePresentation } from '../line-value-presentation';

type Props = {
  step: number;
  value?: LineValue;
  busy?: boolean;
  manual?: boolean;
  confirmed?: boolean;
};

export function CastingOutcome({ step, value, busy, manual, confirmed }: Props) {
  return (
    <div className="casting-result-region" role="status" aria-live="polite" aria-atomic="true">
      <span className="text-sm text-muted-foreground">Hào {step + 1}</span>
      <span aria-hidden="true" className="text-muted-foreground">
        ·
      </span>
      {value === undefined ? (
        <span className="text-sm text-muted-foreground">
          {busy ? 'Đang gieo…' : manual ? 'Chọn mặt xu' : 'Chờ gieo'}
        </span>
      ) : (
        <>
          <strong data-line-value={value} className="text-lg font-medium">
            {getLinePresentation(value).name}
          </strong>
          <span className="sr-only">
            {describeLineValue(value)}
            {manual ? (confirmed ? ', đã xác nhận' : ', chưa xác nhận') : ''}
          </span>
        </>
      )}
    </div>
  );
}
