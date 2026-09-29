import { useEffect, useState } from 'react';
import { KNOWLEDGE_PACKAGE_VERSION } from '@liuyao/knowledge';
import { RULE_SET_ID } from '@liuyao/core';
import { getPwaUpdateSnapshot, subscribePwaUpdate, type PwaUpdateSnapshot } from './lib/pwa-update';
import {
  getPwaInstallSnapshot,
  subscribePwaInstall,
  triggerPwaInstallPrompt,
} from './lib/pwa-install';
import './settings.css';
import { Card, CardContent } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';

const appVersion = __APP_VERSION__;
const coreVersion = __CORE_VERSION__;

type UpdateStatus = 'checking' | 'unsupported' | 'unreported' | 'waiting';

export function SettingsPage() {
  const [online, setOnline] = useState<boolean | null>(() =>
    'onLine' in navigator ? navigator.onLine : null,
  );
  const [installSnapshot, setInstallSnapshot] = useState(getPwaInstallSnapshot);
  const installPrompt = installSnapshot.prompt;
  const [installSupported, setInstallSupported] = useState<boolean | null>(() =>
    installPrompt ? true : null,
  );
  const installed =
    installSnapshot.installed ||
    window.matchMedia('(display-mode: standalone)').matches ||
    Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
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
    const unsubscribeInstall = subscribePwaInstall(() => {
      const next = getPwaInstallSnapshot();
      setInstallSnapshot(next);
      setInstallSupported(next.prompt ? true : false);
    });
    window.addEventListener('online', updateNetwork);
    window.addEventListener('offline', updateNetwork);
    setUpdateStatus(
      'serviceWorker' in navigator
        ? getPwaUpdateSnapshot().updateAvailable
          ? 'waiting'
          : 'unreported'
        : 'unsupported',
    );
    return () => {
      unsubscribePwa();
      unsubscribeInstall();
      window.removeEventListener('online', updateNetwork);
      window.removeEventListener('offline', updateNetwork);
    };
  }, []);

  async function installApp() {
    try {
      const choice = await triggerPwaInstallPrompt();
      if (!choice) return;
      setInstallMessage(choice === 'accepted' ? 'Đã bắt đầu cài đặt.' : 'Chưa bắt đầu cài đặt.');
      setInstallSnapshot(getPwaInstallSnapshot());
    } catch {
      setInstallMessage('Không thể bắt đầu cài đặt.');
    }
  }

  return (
    <main className="settings-page">
      <header className="settings-heading">
        <p className="settings-kicker">Lục Hào / Thông tin ứng dụng</p>
        <h1>Cài đặt</h1>
        <p>Xem phiên bản ứng dụng, trạng thái kết nối và quy ước gieo quẻ cố định.</p>
      </header>

      <Card className="settings-section" aria-labelledby="settings-system-heading">
        <CardContent className="p-5">
          <div className="settings-section-heading">
            <span
              className={`settings-orbit${online === false ? ' is-offline' : ''}`}
              aria-hidden="true"
            >
              ☯
            </span>
            <div>
              <h2 id="settings-system-heading">Trạng thái hệ thống</h2>
              <p>Thông tin do trình duyệt và ứng dụng báo cáo.</p>
            </div>
          </div>
          <dl className="settings-facts">
            <div>
              <dt>Kết nối</dt>
              <dd>
                {online === null ? (
                  'Trình duyệt chưa báo cáo'
                ) : (
                  <Badge
                    variant={online ? 'default' : 'secondary'}
                    className={`settings-state${online ? ' is-ready' : ' is-waiting'}`}
                  >
                    {online ? 'Có mạng' : 'Ngoại tuyến'}
                  </Badge>
                )}
              </dd>
            </div>
            <div>
              <dt>Cài đặt ứng dụng</dt>
              <dd>
                {installed
                  ? 'Đã cài trên thiết bị này'
                  : installSupported === true
                    ? 'Có thể cài đặt'
                    : installSupported === false
                      ? 'Không có lời nhắc cài đặt'
                      : 'Chưa có thông tin về khả năng cài đặt'}
              </dd>
            </div>
            <div>
              <dt>Cập nhật ứng dụng</dt>
              <dd>
                {updateStatus === 'checking'
                  ? 'Đang kiểm tra đăng ký hiện có…'
                  : updateStatus === 'unsupported'
                    ? 'Không có thông tin về trạng thái chương trình nền'
                    : updateStatus === 'waiting'
                      ? 'Bản cập nhật đang chờ'
                      : 'Chưa có thông tin về bản cập nhật'}
              </dd>
            </div>
            <div>
              <dt>Khả năng hoạt động ngoại tuyến</dt>
              <dd>
                {pwaSnapshot.offlineReady
                  ? 'Ứng dụng có thể hoạt động ngoại tuyến'
                  : 'Chưa xác nhận khả năng hoạt động ngoại tuyến'}
              </dd>
            </div>
          </dl>
          {installPrompt && (
            <div className="settings-actions">
              <Button type="button" className="settings-action" onClick={installApp}>
                Cài đặt ứng dụng
              </Button>
            </div>
          )}
          {installMessage && (
            <Alert className="settings-feedback" role="status">
              <AlertTitle>Trạng thái cài đặt</AlertTitle>
              <AlertDescription>{installMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="settings-section" aria-labelledby="settings-version-heading">
        <CardContent className="p-5">
          <div className="settings-section-heading">
            <span className="settings-glyph" aria-hidden="true">
              Aa
            </span>
            <div>
              <h2 id="settings-version-heading">Phiên bản</h2>
              <p>Phần mềm cục bộ và quy tắc tính toán.</p>
            </div>
          </div>
          <dl className="settings-facts settings-versions">
            <div>
              <dt>Ứng dụng web</dt>
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
              <dt>Mã quy ước tính</dt>
              <dd>
                <code>{RULE_SET_ID}</code>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card
        className="settings-section settings-conventions"
        aria-labelledby="settings-conventions-heading"
      >
        <CardContent className="p-5">
          <div className="settings-section-heading">
            <span className="settings-glyph settings-lines" aria-hidden="true">
              ☰
            </span>
            <div>
              <h2 id="settings-conventions-heading">Quy ước gieo quẻ</h2>
              <p>Các quy tắc này được cố định trong phiên bản hiện tại.</p>
            </div>
          </div>
          <ul className="settings-convention-list">
            <li>
              <span>Thứ tự hào</span>
              <strong>Từ hào một đến hào sáu, từ dưới lên</strong>
            </li>
            <li>
              <span>Hào động</span>
              <strong>Giá trị 6 và 9</strong>
            </li>
            <li>
              <span>Phân tích lịch</span>
              <strong>Không có trong phiên bản 1</strong>
            </li>
          </ul>
        </CardContent>
      </Card>

      <footer className="settings-footer">
        <p id="settings-privacy">
          Câu hỏi gieo quẻ chỉ tồn tại trong phiên trình duyệt này, không được gửi tới tài khoản
          hoặc dịch vụ đám mây.
        </p>
        <nav aria-label="Thông tin sản phẩm">
          <a href="https://github.com/tungxuan1656/liuyao#readme" target="_blank" rel="noreferrer">
            Giới thiệu
          </a>
          <a
            href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            Giấy phép
          </a>
          <a href="#settings-privacy">Quyền riêng tư</a>
          <a
            href="https://github.com/tungxuan1656/liuyao/blob/main/SECURITY.md"
            target="_blank"
            rel="noreferrer"
          >
            Bảo mật
          </a>
        </nav>
      </footer>
    </main>
  );
}
