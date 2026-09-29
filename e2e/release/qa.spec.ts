import { expect, test, type Page } from '@playwright/test';
import { createTwoVersionPwaFixture } from './support/two-version-pwa-fixture';

const sixLines = [6, 7, 8, 9, 6, 7] as const;

function collectPageErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`);
  });
  return errors;
}

async function startReading(page: Page, method: string) {
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Câu hỏi (không bắt buộc)' }).fill('QA sweep');
  await page.getByRole('radio', { name: method }).check();
  await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
}

test('release routes and reading flows have no console or page errors', async ({ page }) => {
  const errors = collectPageErrors(page);

  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect(page.getByRole('heading', { name: 'QA sweep' })).toBeVisible();

  await page.getByRole('link', { name: 'Gieo quẻ', exact: true }).click();
  await page.getByRole('button', { name: 'Lập quẻ mới' }).click();
  await page.getByRole('button', { name: 'Thay quẻ hiện tại' }).click();
  await startReading(page, 'Gieo thủ công');
  for (const [index, value] of sixLines.entries()) {
    const coins = page.locator('.manual-coins button');
    await coins.nth(0).click();
    if (value === 6) await coins.nth(0).click();
    else for (let coin = 1; coin < value - 6; coin += 1) await coins.nth(coin).click();
    await expect(page.locator('.manual-outcome')).toContainText(`Kết quả hào ${value}`);
    await page.getByRole('button', { name: 'Xác nhận hào' }).click();
    if (index < sixLines.length - 1)
      await page.getByRole('button', { name: 'Hào tiếp theo' }).click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect(page.getByRole('heading', { name: 'QA sweep' })).toBeVisible();

  await page.getByRole('link', { name: 'Gieo quẻ', exact: true }).click();
  await page.getByRole('button', { name: 'Lập quẻ mới' }).click();
  await page.getByRole('button', { name: 'Thay quẻ hiện tại' }).click();
  await startReading(page, 'Gieo tự động');
  for (let index = 0; index < 6; index += 1) {
    await page.getByRole('button', { name: 'Gieo hào' }).click();
    const evidence = page.getByRole('status').filter({ hasText: /Hào [6789]/ });
    await expect(evidence).toBeVisible({ timeout: 5_000 });
    await expect(evidence.locator('strong')).toContainText(/Hào [6789]/);
    await expect(evidence).toContainText(/mặt (trời|trăng)/);
    if (index < 5) await page.getByRole('button', { name: 'Tiếp theo' }).click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect(page.getByRole('heading', { name: 'QA sweep' })).toBeVisible();

  await page.goto('/library');
  await expect(page.getByRole('heading', { name: /Thư viện/ })).toBeVisible();
  await page.goto('/library/hexagram/hexagram-01');
  await expect(page.getByRole('heading', { name: 'Thuần Càn' })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('textbox', { name: 'Câu hỏi (không bắt buộc)' }).fill('QA sweep');
  await page.getByRole('radio', { name: 'Nhập trực tiếp' }).check();
  await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
  for (const [index, value] of sixLines.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  const trigger = page.getByRole('button', { name: /Quẻ chính:.*Xem giải thích dữ kiện này/ });
  await trigger.focus();
  await trigger.press('Enter');
  const drawer = page.getByRole('dialog', { name: /Chi tiết dữ kiện:/ });
  await expect(drawer).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();

  expect(errors, errors.join('\n')).toEqual([]);
});

test('waiting-update banner controls meet 44px touch targets at 390x844', async ({ page }) => {
  const fixture = await createTwoVersionPwaFixture();
  const errors = collectPageErrors(page);
  try {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${fixture.origin}/`);
    await expect(page.getByRole('heading', { name: 'Lục Hào' })).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(async () =>
          Boolean((await navigator.serviceWorker.getRegistration())?.active),
        ),
      )
      .toBe(true);
    await page.reload();
    await expect
      .poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller)))
      .toBe(true);

    await page.getByRole('radio', { name: 'Gieo thủ công' }).check();
    await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
    fixture.selectVersion(2);
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) throw new Error('Production service-worker registration is missing.');
      await registration.update();
    });
    await expect
      .poll(() =>
        page.evaluate(async () =>
          Boolean((await navigator.serviceWorker.getRegistration())?.waiting),
        ),
      )
      .toBe(true);

    const banner = page
      .getByRole('status')
      .filter({ has: page.getByRole('heading', { name: 'Đã có bản cập nhật ứng dụng' }) });
    await expect(banner).toBeVisible();
    const controls = [
      page.getByRole('button', { name: 'Để sau' }),
      page.getByRole('button', { name: 'Cập nhật ngay' }),
    ];
    for (const control of controls) {
      const bounds = await control.boundingBox();
      expect(bounds, `${await control.innerText()} must be rendered`).not.toBeNull();
      expect(bounds!.width, `${await control.innerText()} width`).toBeGreaterThanOrEqual(44);
      expect(bounds!.height, `${await control.innerText()} height`).toBeGreaterThanOrEqual(44);
    }
    expect(errors, errors.join('\n')).toEqual([]);
  } finally {
    await fixture.cleanup();
  }
});
