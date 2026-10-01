import { ConfirmationDialog } from './components/confirmation-dialog';

type Props = {
  resetLines: boolean;
  discard: boolean;
  hasInput: boolean;
  isBlocked: boolean;
  onResetCancel: () => void;
  onResetConfirm: () => void;
  onDiscardCancel: () => void;
  onDiscardConfirm: () => void;
};

export function CastingFlowDialogs({
  resetLines,
  discard,
  hasInput,
  isBlocked,
  onResetCancel,
  onResetConfirm,
  onDiscardCancel,
  onDiscardConfirm,
}: Props) {
  return (
    <>
      {resetLines && !discard && !isBlocked && (
        <ConfirmationDialog
          title="Xóa toàn bộ các hào?"
          confirmLabel="Xóa các hào"
          onCancel={onResetCancel}
          onConfirm={onResetConfirm}
        >
          Câu hỏi và phương pháp gieo được giữ lại.
        </ConfirmationDialog>
      )}
      {(isBlocked || discard) && (
        <ConfirmationDialog
          title={hasInput ? 'Bỏ các hào đang nhập?' : 'Bỏ thông tin lập quẻ?'}
          confirmLabel={hasInput ? 'Bỏ và rời đi' : 'Bỏ thông tin'}
          onCancel={onDiscardCancel}
          onConfirm={onDiscardConfirm}
        >
          {hasInput ? 'Các hào đã nhập sẽ bị xóa.' : 'Câu hỏi và phương pháp đã chọn sẽ bị xóa.'}
        </ConfirmationDialog>
      )}
    </>
  );
}
