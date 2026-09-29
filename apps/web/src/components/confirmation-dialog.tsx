import type { ReactNode } from 'react';
import { AlertDialog } from './ui/alert-dialog';

type ConfirmationDialogProps = {
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmationDialog({
  title,
  children,
  confirmLabel,
  cancelLabel = 'Tiếp tục chỉnh sửa',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog
      title={title}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      {children}
    </AlertDialog>
  );
}
