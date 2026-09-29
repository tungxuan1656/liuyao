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
    <main className="mx-auto max-w-2xl px-5 py-12 flex flex-col gap-12">
      <header className="flex flex-col gap-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium">
          Lục Hào / Thông tin ứng dụng
        </p>
        <h1 className="text-5xl font-serif font-medium tracking-tight text-neutral-900">Cài đặt</h1>
        <p className="text-neutral-500 leading-relaxed">
          Xem phiên bản ứng dụng, trạng thái kết nối và quy ước gieo quẻ cố định.
        </p>
      </header>

      <section aria-labelledby="settings-system-heading" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 pb-4 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900" id="settings-system-heading">
            Trạng thái hệ thống
          </h2>
          <p className="text-sm text-neutral-500">Thông tin do trình duyệt và ứng dụng báo cáo.</p>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">Kết nối</dt>
            <dd className="text-sm font-medium text-neutral-800">
              {online === null ? 'Trình duyệt chưa báo cáo' : online ? 'Có mạng' : 'Ngoại tuyến'}
            </dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Cài đặt ứng dụng
            </dt>
            <dd className="text-sm font-medium text-neutral-800">
              {installed
                ? 'Đã cài trên thiết bị này'
                : installSupported === true
                  ? 'Có thể cài đặt'
                  : installSupported === false
                    ? 'Không có lời nhắc cài đặt'
                    : 'Chưa có thông tin'}
            </dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">Cập nhật</dt>
            <dd className="text-sm font-medium text-neutral-800">
              {updateStatus === 'checking'
                ? 'Đang kiểm tra…'
                : updateStatus === 'unsupported'
                  ? 'Chưa có thông tin'
                  : updateStatus === 'waiting'
                    ? 'Bản cập nhật đang chờ'
                    : 'Chưa có bản cập nhật'}
            </dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Hoạt động ngoại tuyến
            </dt>
            <dd className="text-sm font-medium text-neutral-800">
              {pwaSnapshot.offlineReady ? 'Sẵn sàng' : 'Chưa xác nhận'}
            </dd>
          </div>
        </dl>
        {installPrompt && (
          <Button type="button" onClick={installApp} className="self-start h-10">
            Cài đặt ứng dụng
          </Button>
        )}
        {installMessage && (
          <Alert role="status">
            <AlertTitle>Trạng thái cài đặt</AlertTitle>
            <AlertDescription>{installMessage}</AlertDescription>
          </Alert>
        )}
      </section>

      <section aria-labelledby="settings-version-heading" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 pb-4 border-b border-neutral-100">
          <h2 className="text-base font-semibold text-neutral-900" id="settings-version-heading">
            Phiên bản
          </h2>
          <p className="text-sm text-neutral-500">Phần mềm cục bộ và quy tắc tính toán.</p>
        </div>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">Ứng dụng web</dt>
            <dd className="text-sm font-medium text-neutral-800">{appVersion}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">@liuyao/core</dt>
            <dd className="text-sm font-medium text-neutral-800">{coreVersion}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">
              @liuyao/knowledge
            </dt>
            <dd className="text-sm font-medium text-neutral-800">{KNOWLEDGE_PACKAGE_VERSION}</dd>
          </div>
          <div className="flex flex-col gap-1 py-3 border-b border-neutral-50">
            <dt className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Mã quy ước tính
            </dt>
            <dd className="text-sm font-medium text-neutral-800">
              <code className="text-xs bg-neutral-100 px-1.5 py-0.5 font-mono">{RULE_SET_ID}</code>
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="settings-conventions-heading" className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 pb-4 border-b border-neutral-100">
          <h2
            className="text-base font-semibold text-neutral-900"
            id="settings-conventions-heading"
          >
            Quy ước gieo quẻ
          </h2>
          <p className="text-sm text-neutral-500">
            Các quy tắc này được cố định trong phiên bản hiện tại.
          </p>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <li className="flex flex-col gap-2 p-4 bg-neutral-50">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Thứ tự hào
            </span>
            <strong className="text-sm font-medium leading-relaxed text-neutral-800">
              Từ hào một đến hào sáu, từ dưới lên
            </strong>
          </li>
          <li className="flex flex-col gap-2 p-4 bg-neutral-50">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider">Hào động</span>
            <strong className="text-sm font-medium leading-relaxed text-neutral-800">
              Lão Âm và Lão Dương
            </strong>
          </li>
          <li className="flex flex-col gap-2 p-4 bg-neutral-50">
            <span className="text-[11px] text-neutral-400 uppercase tracking-wider">
              Phân tích lịch
            </span>
            <strong className="text-sm font-medium leading-relaxed text-neutral-800">
              Không có trong phiên bản 1
            </strong>
          </li>
        </ul>
      </section>

      <footer className="flex flex-col gap-4 pt-6 border-t border-neutral-100">
        <p className="text-sm text-neutral-400 leading-relaxed" id="settings-privacy">
          Câu hỏi gieo quẻ chỉ tồn tại trong phiên trình duyệt này, không được gửi tới tài khoản
          hoặc dịch vụ đám mây.
        </p>
        <nav aria-label="Thông tin sản phẩm" className="flex flex-wrap gap-x-5 gap-y-2">
          <a
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
            href="https://github.com/tungxuan1656/liuyao#readme"
            target="_blank"
            rel="noreferrer"
          >
            Giới thiệu
          </a>
          <a
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
            href="https://github.com/tungxuan1656/liuyao/blob/main/LICENSE"
            target="_blank"
            rel="noreferrer"
          >
            Giấy phép
          </a>
          <a
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
            href="#settings-privacy"
          >
            Quyền riêng tư
          </a>
          <a
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors no-underline"
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
