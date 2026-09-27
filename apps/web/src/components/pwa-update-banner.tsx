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
    signalUpdateAccepted();
    await applyPwaUpdate();
  }

  return (
    <>
      {!online ? (
        <aside className="pwa-update-banner pwa-offline-banner" role="status">
          <span className="pwa-update-mark" aria-hidden="true">
            離
          </span>
          <div>
            <h2>You’re offline</h2>
            <p>Some app features remain available on this device.</p>
          </div>
        </aside>
      ) : snapshot.updateAvailable && !dismissed ? (
        <aside className="pwa-update-banner" role="status" aria-labelledby="pwa-update-title">
          <div className="pwa-update-copy">
            <span className="pwa-update-mark" aria-hidden="true">
              更
            </span>
            <div>
              <h2 id="pwa-update-title">An app update is ready</h2>
              <p>
                A reload applies the new version
                {hasUnsavedReading ? ' and clears this in-memory reading' : ''}.
              </p>
            </div>
          </div>
          <div className="pwa-update-actions">
            <button className="pwa-update-later" type="button" onClick={() => setDismissed(true)}>
              Later
            </button>
            <button
              className="pwa-update-accept"
              type="button"
              onClick={() => (hasUnsavedReading ? setConfirming(true) : void acceptUpdate())}
            >
              Update now
            </button>
          </div>
        </aside>
      ) : null}
      {confirming && (
        <ConfirmationDialog
          title="Reload and apply update?"
          confirmLabel="Reload and update"
          cancelLabel="Keep reading"
          onCancel={() => setConfirming(false)}
          onConfirm={() => void acceptUpdate()}
        >
          <p>
            {draft
              ? 'Your reading draft and question are only in memory. Reloading will erase them.'
              : reading
                ? 'Your completed reading is only in memory. Reloading will erase it.'
                : 'Your entered question or selected casting method is only in memory. Reloading will erase it.'}
            {pathname === '/casting' &&
              draft &&
              ' The active casting screen will also be reloaded.'}
          </p>
        </ConfirmationDialog>
      )}
    </>
  );
}
