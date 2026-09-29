import { useEffect, useId, useRef, type ReactNode } from 'react';
import { Button } from './button';

type AlertDialogProps = {
  title: string;
  children: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function AlertDialog({
  title,
  children,
  confirmLabel,
  cancelLabel,
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    requestAnimationFrame(() => {
      dialog.querySelector<HTMLButtonElement>('[data-dialog-cancel]')?.focus();
    });
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);

  return (
    <dialog
      ref={ref}
      role="alertdialog"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      className="ui-alert-dialog"
      onCancel={event => {
        event.preventDefault();
        onCancel();
      }}
    >
      <div className="ui-alert-dialog-content">
        <div className="ui-alert-dialog-header">
          <h2 id={`${id}-title`}>{title}</h2>
          <div id={`${id}-description`} className="ui-alert-dialog-description">
            {children}
          </div>
        </div>
        <div className="ui-alert-dialog-actions">
          <Button
            type="button"
            variant="outline"
            className="ui-alert-dialog-cancel"
            data-dialog-cancel
            onClick={onCancel}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="ui-alert-dialog-confirm"
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  );
}
