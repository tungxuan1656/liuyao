import { useEffect, useState } from 'react';
import { RefreshCw, WifiOff } from 'lucide-react';
import {
  applyPwaUpdate,
  getPwaUpdateSnapshot,
  subscribePwaUpdate,
  type PwaUpdateSnapshot,
} from '../lib/pwa-update';
import { useReadingSession } from '../reading-session';
import { ConfirmationDialog } from './confirmation-dialog';
import { Alert, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

export function PwaUpdateBanner() {
  const {
    draft,
    reading,
    question,
    method,
    acceptUpdate: signalUpdateAccepted,
  } = useReadingSession();
  const [snapshot, setSnapshot] = useState<PwaUpdateSnapshot>(getPwaUpdateSnapshot);
  const [dismissed, setDismissed] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const unsubscribe = subscribePwaUpdate(() => setSnapshot(getPwaUpdateSnapshot()));
    const updateConnection = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    return () => {
      unsubscribe();
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  if ((!snapshot.updateAvailable || dismissed) && online) return null;

  const hasUnsavedReading = Boolean(question.trim() || method !== 'automatic' || draft || reading);

  async function acceptUpdate() {
    setConfirming(false);
    try {
      await applyPwaUpdate(() => {
        signalUpdateAccepted();
        window.location.reload();
      });
    } catch {
      // Keep the current page and any in-memory reading when the update fails.
    }
  }

  return (
    <>
      {!online ? (
        <Alert
          className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-xl md:bottom-4"
          role="status"
        >
          <WifiOff aria-hidden="true" />
          <AlertTitle>Đang ngoại tuyến</AlertTitle>
        </Alert>
      ) : snapshot.updateAvailable && !dismissed ? (
        <Alert
          className="fixed inset-x-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-xl md:bottom-4"
          role="status"
          aria-labelledby="pwa-update-title"
        >
          <RefreshCw aria-hidden="true" />
          <AlertTitle id="pwa-update-title">Có bản cập nhật</AlertTitle>
          <div className="col-span-full flex flex-wrap gap-2">
            <Button variant="outline" size="lg" type="button" onClick={() => setDismissed(true)}>
              Để sau
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={() => (hasUnsavedReading ? setConfirming(true) : void acceptUpdate())}
            >
              Cập nhật ngay
            </Button>
          </div>
        </Alert>
      ) : null}
      {confirming && (
        <ConfirmationDialog
          title="Tải lại để áp dụng bản cập nhật?"
          confirmLabel="Tải lại và cập nhật"
          cancelLabel="Tiếp tục gieo quẻ"
          onCancel={() => setConfirming(false)}
          onConfirm={() => void acceptUpdate()}
        >
          <p>Tải lại trang sẽ xóa quẻ, câu hỏi và phương pháp đã chọn.</p>
        </ConfirmationDialog>
      )}
    </>
  );
}
