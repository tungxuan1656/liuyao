import { useEffect, useState } from 'react';
import { KNOWLEDGE_PACKAGE_VERSION } from '@liuyao/knowledge';
import { RULE_SET_ID } from '@liuyao/core';
import { getPwaUpdateSnapshot, subscribePwaUpdate, type PwaUpdateSnapshot } from './lib/pwa-update';
import './settings.css';

const appVersion = __APP_VERSION__;
const coreVersion = __CORE_VERSION__;

type InstallChoiceEvent = Event & {
  prompt?: () => Promise<void>;
  userChoice?: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type UpdateStatus = 'checking' | 'unsupported' | 'unreported' | 'waiting';

export function SettingsPage() {
  const [online, setOnline] = useState<boolean | null>(() =>
    'onLine' in navigator ? navigator.onLine : null,
  );
  const [installSupported, setInstallSupported] = useState<boolean | null>(null);
  const [installPrompt, setInstallPrompt] = useState<InstallChoiceEvent | null>(null);
  const [installed, setInstalled] = useState(
    () =>
      window.matchMedia('(display-mode: standalone)').matches ||
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone),
  );
  const [installMessage, setInstallMessage] = useState('');
  const [updateStatus, setUpdateStatus] = useState<UpdateStatus>(() =>
    'serviceWorker' in navigator ? 'checking' : 'unsupported',
  );
  const [pwaSnapshot, setPwaSnapshot] = useState<PwaUpdateSnapshot>(getPwaUpdateSnapshot);

  useEffect(() => {
    const unsubscribePwa = subscribePwaUpdate(() => {
      const next = getPwaUpdateSnapshot();
      setPwaSnapshot(next);
      setUpdateStatus(next.updateAvailable ? 'waiting' : 'unreported');
    });
    const updateNetwork = () => {
      if ('onLine' in navigator) setOnline(navigator.onLine);
    };
    const captureInstall = (event: Event) => {
      const choice = event as InstallChoiceEvent;
      if (typeof choice.prompt === 'function' && choice.userChoice) {
        event.preventDefault();
        setInstallSupported(true);
        setInstallPrompt(choice);
      }
    };
    const updateInstalled = () => setInstalled(true);
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    window.addEventListener('beforeinstallprompt', captureInstall);
    window.addEventListener('appinstalled', updateInstalled);
    setUpdateStatus(
      'serviceWorker' in navigator
        ? getPwaUpdateSnapshot().updateAvailable
          ? 'waiting'
          : 'unreported'
        : 'unsupported',
    );
    return () => {
      unsubscribePwa();
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
      window.removeEventListener('beforeinstallprompt', captureInstall);
      window.removeEventListener('appinstalled', updateInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt?.prompt || !installPrompt.userChoice) return;
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    setInstallMessage(
      choice.outcome === 'accepted' ? 'Installation started.' : 'Installation was not started.',
    );
    setInstallPrompt(null);
  }

  return (
    <main className="settings-page">
      <header className="settings-heading">
        <p className="settings-kicker">Lục Hào / App details</p>
        <h1>Settings</h1>
        <p>Check this app’s versions, connection, and fixed reading conventions.</p>
      </header>

      <section className="settings-section" aria-labelledby="settings-system-heading">
        <div className="settings-section-heading">
          <span
            className={`settings-orbit${online === false ? ' is-offline' : ''}`}
            aria-hidden="true"
          >
            六
          </span>
          <div>
            <h2 id="settings-system-heading">System status</h2>
            <p>Signals reported by this browser and app.</p>
          </div>
        </div>
        <dl className="settings-facts">
          <div>
            <dt>Connection</dt>
            <dd>
              {online === null ? (
                'Not reported by this browser'
              ) : (
                <span className={`settings-state${online ? ' is-ready' : ' is-waiting'}`}>
                  <i aria-hidden="true" />
                  {online ? 'Online' : 'Offline'}
                </span>
              )}
            </dd>
          </div>
          <div>
            <dt>Installation</dt>
            <dd>
              {installed
                ? 'Installed on this device'
                : installSupported === true
                  ? 'Available'
                  : installSupported === false
                    ? 'Install prompt unavailable'
                    : 'Install availability not reported'}
            </dd>
          </div>
          <div>
            <dt>App update</dt>
            <dd>
              {updateStatus === 'checking'
                ? 'Checking existing registration…'
                : updateStatus === 'unsupported'
                  ? 'Service-worker status is not available'
                  : updateStatus === 'waiting'
                    ? 'A service-worker update is waiting'
                    : 'Update availability has not been reported'}
            </dd>
          </div>
          <div>
            <dt>Offline readiness</dt>
            <dd>
              {pwaSnapshot.offlineReady
                ? 'App is ready to work offline'
                : 'Offline readiness not confirmed'}
            </dd>
          </div>
        </dl>
        {installPrompt && (
          <div className="settings-actions">
            <button type="button" className="settings-action" onClick={installApp}>
              Install app
            </button>
          </div>
        )}
        {installMessage && (
          <p className="settings-feedback" role="status">
            {installMessage}
          </p>
        )}
      </section>

      <section className="settings-section" aria-labelledby="settings-version-heading">
        <div className="settings-section-heading">
          <span className="settings-glyph" aria-hidden="true">
            文
          </span>
          <div>
            <h2 id="settings-version-heading">Versions</h2>
            <p>Local software and calculation rules.</p>
          </div>
        </div>
        <dl className="settings-facts settings-versions">
          <div>
            <dt>Web app</dt>
            <dd>{appVersion}</dd>
          </div>
          <div>
            <dt>@liuyao/core</dt>
            <dd>{coreVersion}</dd>
          </div>
          <div>
            <dt>@liuyao/knowledge</dt>
            <dd>{KNOWLEDGE_PACKAGE_VERSION}</dd>
          </div>
          <div>
            <dt>Ruleset</dt>
            <dd>
              <code>{RULE_SET_ID}</code>
            </dd>
          </div>
        </dl>
      </section>

      <section
        className="settings-section settings-conventions"
        aria-labelledby="settings-conventions-heading"
      >
        <div className="settings-section-heading">
          <span className="settings-glyph settings-lines" aria-hidden="true">
            ☰
          </span>
          <div>
            <h2 id="settings-conventions-heading">Reading conventions</h2>
            <p>These rules are fixed for this version.</p>
          </div>
        </div>
        <ul className="settings-convention-list">
          <li>
            <span>Line order</span>
            <strong>First to sixth, bottom to top</strong>
          </li>
          <li>
            <span>Changing lines</span>
            <strong>Values 6 and 9</strong>
          </li>
          <li>
            <span>Calendar analysis</span>
            <strong>Not included in V1</strong>
          </li>
        </ul>
      </section>

      <footer className="settings-footer">
        <p id="settings-privacy">
          Reading questions stay in this browser session and are not sent to an account or cloud
          service.
        </p>
        <nav aria-label="Product information">
          <a href="https://github.com/tungxuan1656/liuyao#readme" target="_blank" rel="noreferrer">
            About
          </a>
          <a
            href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            License
          </a>
          <a href="#settings-privacy">Privacy</a>
          <a
            href="https://github.com/tungxuan1656/liuyao/blob/main/SECURITY.md"
            target="_blank"
            rel="noreferrer"
          >
            Security
          </a>
        </nav>
      </footer>
    </main>
  );
}
