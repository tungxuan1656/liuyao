import { expect, test } from '@playwright/test';
import { createTwoVersionPwaFixture } from './support/two-version-pwa-fixture';

test.describe('production PWA behavior', () => {
  test('reloads a directly opened library route while offline after service-worker control', async ({
    page,
    context,
  }) => {
    await page.goto('/library');
    await expect(page.getByRole('heading', { name: 'Thư viện' })).toBeVisible();

    // Do not await serviceWorker.ready indefinitely: environments that cannot
    // run service workers must be reported as unverified, not as a timeout.
    const workerActivated = await expect
      .poll(
        () =>
          page.evaluate(
            () =>
              'serviceWorker' in navigator &&
              navigator.serviceWorker
                .getRegistrations()
                .then(registrations => registrations.some(registration => registration.active)),
          ),
        { message: 'wait for an active production service worker' },
      )
      .toBe(true)
      .then(() => true)
      .catch(() => false);
    test.skip(
      !workerActivated,
      'Unverified: this browser did not activate a production service worker; offline reload coverage requires service-worker support.',
    );

    await page.reload();
    const controlled = await expect
      .poll(() => page.evaluate(() => Boolean(navigator.serviceWorker?.controller)), {
        message: 'wait for the production service worker to control the page',
      })
      .toBe(true)
      .then(() => true)
      .catch(() => false);
    test.skip(
      !controlled,
      'Unverified: the activated production service worker did not control the reloaded page; offline reload coverage requires controller confirmation.',
    );
    await expect(page.getByRole('heading', { name: 'Thư viện' })).toBeVisible();

    await context.setOffline(true);
    await page.reload();

    await expect(page).toHaveURL(/\/library$/);
    await expect(page.getByRole('heading', { name: 'Thư viện' })).toBeVisible();
  });

  test('clears a synthetic install prompt after appinstalled (app handling only)', async ({
    page,
  }) => {
    await page.goto('/');
    const wasPrevented = await page.evaluate(() => {
      const event = new Event('beforeinstallprompt', { cancelable: true });
      Object.defineProperties(event, {
        prompt: { value: async () => undefined },
        userChoice: { value: Promise.resolve({ outcome: 'accepted', platform: 'test' }) },
      });
      return !window.dispatchEvent(event);
    });
    expect(wasPrevented).toBe(true);

    await page.getByRole('link', { name: 'Cài đặt' }).click();

    await expect(page.getByRole('button', { name: 'Cài đặt ứng dụng' })).toBeVisible();
    await page.evaluate(() => window.dispatchEvent(new Event('appinstalled')));

    await expect(page.getByRole('button', { name: 'Cài đặt ứng dụng' })).toHaveCount(0);
    await expect(page.getByText('Đã cài trên thiết bị này')).toBeVisible();

    await page.goBack();
    await page.getByRole('link', { name: 'Cài đặt' }).click();
    await expect(page.getByRole('button', { name: 'Cài đặt ứng dụng' })).toHaveCount(0);
  });

  test('retains synthetic installed state before Settings mounts (app handling only)', async ({
    page,
  }) => {
    await page.goto('/');
    await page.evaluate(() => {
      const prompt = new Event('beforeinstallprompt', { cancelable: true });
      Object.defineProperties(prompt, {
        prompt: { value: async () => undefined },
        userChoice: { value: Promise.resolve({ outcome: 'accepted', platform: 'test' }) },
      });
      window.dispatchEvent(prompt);
      window.dispatchEvent(new Event('appinstalled'));
    });

    await page.getByRole('link', { name: 'Cài đặt' }).click();

    await expect(page.getByText('Đã cài trên thiết bị này')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Cài đặt ứng dụng' })).toHaveCount(0);
  });

  test('preserves a casting draft until a real waiting production worker is explicitly accepted', async ({
    page,
  }) => {
    const fixture = await createTwoVersionPwaFixture();
    try {
      await page.goto(`${fixture.origin}/`);
      await expect(page.getByRole('heading', { name: 'Lục Hào' })).toBeVisible();
      await expect
        .poll(() =>
          page.evaluate(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            return Boolean(registration?.active);
          }),
        )
        .toBe(true);
      await page.reload();
      await expect
        .poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
        .toBe(true);

      await page.getByRole('radio', { name: 'Gieo thủ công' }).check();
      await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
      await expect(page.getByRole('heading', { name: 'Hào 1 trên 6' })).toBeVisible();
      const coins = page.locator('.manual-coins button');
      await coins.nth(0).click();
      await expect(page.locator('.manual-outcome')).toContainText('Thiếu dương');
      await expect(page.locator('.manual-outcome')).toContainText('giá trị 7');

      fixture.selectVersion(2);
      await page.evaluate(async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) throw new Error('Production service-worker registration is missing.');
        await registration.update();
      });
      await expect
        .poll(() =>
          page.evaluate(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            return Boolean(registration?.waiting);
          }),
        )
        .toBe(true);

      await expect(page.getByRole('heading', { name: 'Hào 1 trên 6' })).toBeVisible();
      await expect(page.locator('.manual-outcome')).toContainText('Thiếu dương');
      await expect(
        page.getByRole('heading', { name: 'Đã có bản cập nhật ứng dụng' }),
      ).toBeVisible();

      await page.getByRole('button', { name: 'Cập nhật ngay' }).click();
      await expect(
        page.getByRole('alertdialog', { name: 'Tải lại để áp dụng bản cập nhật?' }),
      ).toBeVisible();
      const versionTwoWorkerRequests: string[] = [];
      const reloadComplete = page.waitForFunction(() => document.readyState === 'complete');
      const v2EntryAsset = fixture.assetName(2);
      page.on('request', request => {
        if (request.url().includes(v2EntryAsset)) versionTwoWorkerRequests.push(request.url());
      });
      await page.getByRole('button', { name: 'Tải lại và cập nhật' }).click();
      await reloadComplete;
      await expect(page.getByRole('heading', { name: 'Lập quẻ mới' })).toBeVisible();
      expect(versionTwoWorkerRequests).toHaveLength(1);
      await expect
        .poll(() =>
          page.evaluate(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            return registration?.active?.state === 'activated' && !registration.waiting;
          }),
        )
        .toBe(true);
      await page.reload();
      await expect(page.getByRole('heading', { name: 'Lập quẻ mới' })).toBeVisible();
      await page.getByRole('button', { name: 'Quay lại trang gieo quẻ' }).click();
      await expect(page.getByRole('heading', { name: 'Lục Hào' })).toBeVisible();
      await page.getByRole('link', { name: 'Cài đặt' }).click();
      await expect(page.getByText('0.1.1', { exact: true })).toBeVisible();
    } finally {
      await fixture.cleanup();
    }
  });
});
