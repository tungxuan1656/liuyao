import { useEffect, useState } from 'react';
import { KNOWLEDGE_PACKAGE_VERSION } from '@liuyao/knowledge';
import { RULE_SET_ID } from '@liuyao/core';
import { getPwaUpdateSnapshot, subscribePwaUpdate, type PwaUpdateSnapshot } from './lib/pwa-update';
import {
  getPwaInstallSnapshot,
  subscribePwaInstall,
  triggerPwaInstallPrompt,
} from './lib/pwa-install';
import { Button } from './components/ui/button';
import { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';

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
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">Cài đặt</h1>
      </header>

      <div className="grid items-start gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground">Kết nối</dt>
                <dd className="font-medium">
                  {online === null ? 'Chưa có thông tin' : online ? 'Có mạng' : 'Ngoại tuyến'}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground">Cài đặt ứng dụng</dt>
                <dd className="font-medium">
                  {installed
                    ? 'Đã cài đặt'
                    : installSupported === true
                      ? 'Có thể cài đặt'
                      : installSupported === false
                        ? 'Không có lời nhắc cài đặt'
                        : 'Chưa có thông tin'}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground">Cập nhật</dt>
                <dd className="font-medium">
                  {updateStatus === 'checking'
                    ? 'Đang kiểm tra…'
                    : updateStatus === 'unsupported'
                      ? 'Chưa có thông tin'
                      : updateStatus === 'waiting'
                        ? 'Có bản cập nhật'
                        : 'Chưa có bản cập nhật'}
                </dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted-foreground">Hoạt động ngoại tuyến</dt>
                <dd className="font-medium">
                  {pwaSnapshot.offlineReady ? 'Sẵn sàng' : 'Chưa xác nhận'}
                </dd>
              </div>
            </dl>
          </CardContent>
          {(installPrompt || installMessage) && (
            <CardFooter className="flex-col items-start gap-3">
              {installPrompt && (
                <Button size="lg" onClick={installApp}>
                  Cài đặt ứng dụng
                </Button>
              )}
              {installMessage && (
                <Alert role="status">
                  <AlertTitle>Trạng thái cài đặt</AlertTitle>
                  <AlertDescription>{installMessage}</AlertDescription>
                </Alert>
              )}
            </CardFooter>
          )}
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Phiên bản
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <dl className="grid gap-4">
              <div className="flex flex-wrap justify-between gap-2">
                <dt className="text-muted-foreground">Ứng dụng web</dt>
                <dd className="font-medium">{appVersion}</dd>
              </div>
            </dl>
            <details>
              <summary className="min-h-11 cursor-pointer content-center text-muted-foreground">
                Chi tiết kỹ thuật
              </summary>
              <dl className="grid gap-4">
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">@liuyao/core</dt>
                  <dd className="font-medium">{coreVersion}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">@liuyao/knowledge</dt>
                  <dd className="font-medium">{KNOWLEDGE_PACKAGE_VERSION}</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-2">
                  <dt className="text-muted-foreground">Quy ước tính</dt>
                  <dd className="break-all font-mono text-xs">{RULE_SET_ID}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Thứ tự hào</dt>
                  <dd className="font-medium">Hào 1–6, từ dưới lên</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Hào động</dt>
                  <dd className="font-medium">Lão Âm và Lão Dương</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">Phân tích lịch</dt>
                  <dd className="font-medium">Chưa hỗ trợ</dd>
                </div>
              </dl>
            </details>
          </CardContent>
        </Card>

        <Card className="lg:col-span-12">
          <CardHeader>
            <CardTitle role="heading" aria-level={2}>
              Thông tin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p id="settings-privacy" className="text-muted-foreground">
              Tải lại trang sẽ xóa quẻ và câu hỏi. Dữ liệu không được gửi lên mạng.
            </p>
          </CardContent>
          <CardFooter>
            <nav aria-label="Thông tin sản phẩm" className="flex flex-wrap gap-3">
              <Button
                variant="link"
                size="lg"
                render={
                  <a
                    href="https://github.com/tungxuan1656/liuyao#readme"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                Giới thiệu
              </Button>
              <Button
                variant="link"
                size="lg"
                render={
                  <a
                    href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                Giấy phép
              </Button>
              <Button
                variant="link"
                size="lg"
                render={
                  <a
                    href="https://github.com/tungxuan1656/liuyao/blob/main/SECURITY.md"
                    target="_blank"
                    rel="noreferrer"
                  />
                }
              >
                Bảo mật
              </Button>
            </nav>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
