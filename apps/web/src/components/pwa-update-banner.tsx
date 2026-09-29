import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  applyPwaUpdate,
  getPwaUpdateSnapshot,
  subscribePwaUpdate,
  type PwaUpdateSnapshot,
} from '../lib/pwa-update';
import { useReadingSession } from '../reading-session';
import { ConfirmationDialog } from './confirmation-dialog';
import './pwa-update-banner.css';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import { Button } from './ui/button';

export function PwaUpdateBanner() {
  const {
    draft,
    reading,
    question,
    method,
    acceptUpdate: signalUpdateAccepted,
  } = useReadingSession();
  const { pathname } = useLocation();
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
        <Alert className="pwa-update-banner pwa-offline-banner" role="status">
          <span className="pwa-update-mark" aria-hidden="true">
            ◌
          </span>
          <div>
            <AlertTitle>Bạn đang ngoại tuyến</AlertTitle>
            <AlertDescription>
              Một số chức năng của ứng dụng vẫn dùng được trên thiết bị này.
            </AlertDescription>
          </div>
        </Alert>
      ) : snapshot.updateAvailable && !dismissed ? (
        <Alert className="pwa-update-banner" role="status" aria-labelledby="pwa-update-title">
          <div className="pwa-update-copy">
            <span className="pwa-update-mark" aria-hidden="true">
              ↻
            </span>
            <div>
              <AlertTitle id="pwa-update-title">Đã có bản cập nhật ứng dụng</AlertTitle>
              <AlertDescription>
                Tải lại trang để dùng phiên bản mới
                {hasUnsavedReading ? ' và xóa dữ liệu gieo quẻ đang lưu trong bộ nhớ' : ''}.
              </AlertDescription>
            </div>
          </div>
          <div className="pwa-update-actions">
            <Button
              variant="outline"
              className="pwa-update-later"
              type="button"
              onClick={() => setDismissed(true)}
            >
              Để sau
            </Button>
            <Button
              className="pwa-update-accept"
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
          <p>
            {draft
              ? 'Bản gieo quẻ và câu hỏi chỉ được lưu trong bộ nhớ. Tải lại trang sẽ xóa chúng.'
              : reading
                ? 'Quẻ đã hoàn tất chỉ được lưu trong bộ nhớ. Tải lại trang sẽ xóa quẻ.'
                : 'Câu hỏi hoặc phương pháp gieo quẻ đã chọn chỉ được lưu trong bộ nhớ. Tải lại trang sẽ xóa chúng.'}
            {pathname === '/casting' &&
              draft &&
              ' Màn hình gieo quẻ hiện tại cũng sẽ được tải lại.'}
          </p>
        </ConfirmationDialog>
      )}
    </>
  );
}
