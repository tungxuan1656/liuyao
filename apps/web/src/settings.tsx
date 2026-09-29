import { useEffect, useState } from 'react';
import { KNOWLEDGE_PACKAGE_VERSION } from '@liuyao/knowledge';
import { RULE_SET_ID } from '@liuyao/core';
import { getPwaUpdateSnapshot, subscribePwaUpdate, type PwaUpdateSnapshot } from './lib/pwa-update';
import {
  getPwaInstallSnapshot,
  subscribePwaInstall,
  triggerPwaInstallPrompt,
} from './lib/pwa-install';
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
    <main className="mx-auto max-w-2xl p-6 flex flex-col gap-10">
      <header className="text-center flex flex-col gap-2">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">
          Lục Hào / Thông tin ứng dụng
        </p>
        <h1 className="text-4xl font-serif font-bold">Cài đặt</h1>
        <p className="text-muted-foreground">
          Xem phiên bản ứng dụng, trạng thái kết nối và quy ước gieo quẻ cố định.
        </p>
      </header>

      <Card className="border-0 shadow-none" aria-labelledby="settings-system-heading">
        <CardContent className="p-0">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full border border-border text-xl font-serif text-foreground"
              aria-hidden="true"
            >
              ☯
            </span>
            <div>
              <h2 className="text-xl font-serif font-semibold" id="settings-system-heading">
                Trạng thái hệ thống
              </h2>
              <p className="text-sm text-muted-foreground">
                Thông tin do trình duyệt và ứng dụng báo cáo.
              </p>
            </div>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Kết nối</dt>
              <dd className="text-sm font-medium">
                {online === null ? (
                  'Trình duyệt chưa báo cáo'
                ) : (
                  <Badge variant="outline" className="font-normal">
                    {online ? 'Có mạng' : 'Ngoại tuyến'}
                  </Badge>
                )}
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Cài đặt ứng dụng</dt>
              <dd className="text-sm font-medium">
                {installed
                  ? 'Đã cài trên thiết bị này'
                  : installSupported === true
                    ? 'Có thể cài đặt'
                    : installSupported === false
                      ? 'Không có lời nhắc cài đặt'
                      : 'Chưa có thông tin về khả năng cài đặt'}
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Cập nhật ứng dụng</dt>
              <dd className="text-sm font-medium">
                {updateStatus === 'checking'
                  ? 'Đang kiểm tra đăng ký hiện có…'
                  : updateStatus === 'unsupported'
                    ? 'Không có thông tin về trạng thái chương trình nền'
                    : updateStatus === 'waiting'
                      ? 'Bản cập nhật đang chờ'
                      : 'Chưa có thông tin về bản cập nhật'}
              </dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Khả năng hoạt động ngoại tuyến</dt>
              <dd className="text-sm font-medium">
                {pwaSnapshot.offlineReady
                  ? 'Ứng dụng có thể hoạt động ngoại tuyến'
                  : 'Chưa xác nhận khả năng hoạt động ngoại tuyến'}
              </dd>
            </div>
          </dl>
          {installPrompt && (
            <div className="mt-4">
              <Button type="button" onClick={installApp}>
                Cài đặt ứng dụng
              </Button>
            </div>
          )}
          {installMessage && (
            <Alert className="mt-4" role="status">
              <AlertTitle>Trạng thái cài đặt</AlertTitle>
              <AlertDescription>{installMessage}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none" aria-labelledby="settings-version-heading">
        <CardContent className="p-0">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full border border-border text-xl font-serif text-foreground"
              aria-hidden="true"
            >
              Aa
            </span>
            <div>
              <h2 className="text-xl font-serif font-semibold" id="settings-version-heading">
                Phiên bản
              </h2>
              <p className="text-sm text-muted-foreground">Phần mềm cục bộ và quy tắc tính toán.</p>
            </div>
          </div>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Ứng dụng web</dt>
              <dd className="text-sm font-medium">{appVersion}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">@liuyao/core</dt>
              <dd className="text-sm font-medium">{coreVersion}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">@liuyao/knowledge</dt>
              <dd className="text-sm font-medium">{KNOWLEDGE_PACKAGE_VERSION}</dd>
            </div>
            <div className="flex flex-col gap-1 py-4 border-t">
              <dt className="text-xs text-muted-foreground">Mã quy ước tính</dt>
              <dd className="text-sm font-medium">
                <code className="text-xs bg-muted p-1 rounded">{RULE_SET_ID}</code>
              </dd>
            </div>
          </dl>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-none" aria-labelledby="settings-conventions-heading">
        <CardContent className="p-0">
          <div className="flex items-center gap-4 mb-4">
            <span
              className="flex items-center justify-center w-12 h-12 rounded-full border border-border text-xl font-sans text-foreground"
              aria-hidden="true"
            >
              ☰
            </span>
            <div>
              <h2 className="text-xl font-serif font-semibold" id="settings-conventions-heading">
                Quy ước gieo quẻ
              </h2>
              <p className="text-sm text-muted-foreground">
                Các quy tắc này được cố định trong phiên bản hiện tại.
              </p>
            </div>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <li className="flex flex-col gap-2 p-4 bg-muted rounded-md min-h-[5.2rem]">
              <span className="text-xs text-muted-foreground">Thứ tự hào</span>
              <strong className="text-sm font-medium leading-relaxed">
                Từ hào một đến hào sáu, từ dưới lên
              </strong>
            </li>
            <li className="flex flex-col gap-2 p-4 bg-muted rounded-md min-h-[5.2rem]">
              <span className="text-xs text-muted-foreground">Hào động</span>
              <strong className="text-sm font-medium leading-relaxed">Giá trị 6 và 9</strong>
            </li>
            <li className="flex flex-col gap-2 p-4 bg-muted rounded-md min-h-[5.2rem]">
              <span className="text-xs text-muted-foreground">Phân tích lịch</span>
              <strong className="text-sm font-medium leading-relaxed">
                Không có trong phiên bản 1
              </strong>
            </li>
          </ul>
        </CardContent>
      </Card>

      <footer className="grid gap-4 pt-6 border-t mt-4">
        <p
          className="text-sm text-muted-foreground max-w-prose leading-relaxed"
          id="settings-privacy"
        >
          Câu hỏi gieo quẻ chỉ tồn tại trong phiên trình duyệt này, không được gửi tới tài khoản
          hoặc dịch vụ đám mây.
        </p>
        <nav aria-label="Thông tin sản phẩm" className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="https://github.com/tungxuan1656/liuyao#readme"
            target="_blank"
            rel="noreferrer"
          >
            Giới thiệu
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            Giấy phép
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#settings-privacy"
          >
            Quyền riêng tư
          </a>
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
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
