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
          Thao tác này xóa mọi hào đã nhập nhưng vẫn giữ câu hỏi và phương pháp gieo quẻ.
        </ConfirmationDialog>
      )}
      {(isBlocked || discard) && (
        <ConfirmationDialog
          title={hasInput ? 'Bỏ các hào đang nhập?' : 'Bỏ thông tin lập quẻ?'}
          confirmLabel={hasInput ? 'Bỏ và rời đi' : 'Bỏ thông tin'}
          onCancel={onDiscardCancel}
          onConfirm={onDiscardConfirm}
        >
          {hasInput
            ? 'Bỏ các hào đang nhập và rời khỏi phiên gieo quẻ?'
            : 'Bỏ câu hỏi và phương pháp gieo quẻ rồi rời khỏi phiên gieo quẻ?'}
        </ConfirmationDialog>
      )}
    </>
  );
}
