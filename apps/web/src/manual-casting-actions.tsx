import { Button } from './components/ui/button';
import { Card, CardFooter } from './components/ui/card';
import './casting/input-workspace.css';

type Props = {
  step: number;
  lines: number[];
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export function ManualCastingActions({ step, lines, onBack, onNext, onFinish }: Props) {
  const isLastLine = step === 5;
  const currentLineReady = lines[step] !== undefined;
  const allLinesReady = lines.length >= 6 && !lines.some(line => line === undefined);

  return (
    <Card className="manual-actions input-workspace">
      <CardFooter className="flow-actions">
        <Button
          type="button"
          variant="outline"
          className="casting-back-action"
          disabled={step === 0}
          onClick={onBack}
        >
          Quay lại
        </Button>
        <Button
          type="button"
          className="casting-primary-action"
          disabled={isLastLine ? !allLinesReady : !currentLineReady}
          onClick={isLastLine ? onFinish : onNext}
        >
          {isLastLine ? 'Tính quẻ' : 'Hào tiếp theo'}
        </Button>
      </CardFooter>
    </Card>
  );
}
