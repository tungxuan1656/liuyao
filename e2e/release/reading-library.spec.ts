import { expect, test } from '@playwright/test';

const sixLines = [6, 7, 8, 9, 6, 7] as const;

async function startReading(page: import('@playwright/test').Page, method: string) {
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'Câu hỏi (không bắt buộc)' })
    .fill('Deterministic scenario');
  await page.getByRole('radio', { name: method }).check();
  await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
}

async function readResultSummary(page: import('@playwright/test').Page) {
  await expect(page.getByRole('heading', { name: 'Deterministic scenario' })).toBeVisible();
  return {
    primary: await page.getByRole('region', { name: 'Quẻ chính' }).innerText(),
    lines: await page.getByRole('region', { name: 'Thông tin các hào' }).innerText(),
  };
}

test('manual and direct entry produce the same result for six fixed values', async ({ page }) => {
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page.getByRole('combobox', { name: `Hào ${index + 1}` }).selectOption(String(value));
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  const directSummary = await readResultSummary(page);

  await page.getByRole('link', { name: 'Trang gieo quẻ' }).click();
  await page.getByRole('button', { name: 'Lập quẻ mới' }).click();
  await page.getByRole('button', { name: 'Thay quẻ hiện tại' }).click();
  await startReading(page, 'Gieo thủ công');
  for (const [index, value] of sixLines.entries()) {
    await page
      .getByRole('combobox', { name: `Giá trị hào ${index + 1} (bắt đầu từ hào một)` })
      .selectOption(String(value));
    if (index < sixLines.length - 1) {
      await page.getByRole('button', { name: 'Hào tiếp theo' }).click();
    }
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect.poll(() => readResultSummary(page)).toEqual(directSummary);
});

test('automatic casting exposes six valid values and visible coin evidence', async ({ page }) => {
  await startReading(page, 'Gieo tự động');
  const validValues = new Set(['6', '7', '8', '9']);
  for (let index = 0; index < 6; index += 1) {
    await page.getByRole('button', { name: 'Gieo hào' }).click();
    const evidence = page.getByRole('status').filter({ hasText: `Đồng xu:` });
    await expect(evidence).toBeVisible();
    const text = await evidence.innerText();
    const tossedValue = await evidence.locator('strong').innerText();
    expect(validValues.has(tossedValue)).toBe(true);
    const coinEvidence = text.split('Đồng xu:')[1] ?? '';
    const coins = coinEvidence.match(/\b[01]\b/g) ?? [];
    expect(coins).toHaveLength(3);
    const mappedValue = coins.reduce((sum, bit) => sum + (bit === '0' ? 2 : 3), 0);
    expect(tossedValue).toBe(String(mappedValue));
    expect(text).toContain('Đồng xu:');
    if (index < 5) await page.getByRole('button', { name: 'Tiếp theo' }).click();
  }

  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect(page.getByRole('heading', { name: 'Deterministic scenario' })).toBeVisible();
  const rows = page.locator('.line-fact-row');
  await expect(rows).toHaveCount(6);
  for (const row of await rows.all()) {
    expect(
      validValues.has((await row.locator('.line-input-value').innerText()).trim().charAt(0)),
    ).toBe(true);
  }
});

test('a moving line distinguishes the changed board from the primary board', async ({ page }) => {
  const oneMovingLine = [6, 7, 8, 7, 8, 7] as const;
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of oneMovingLine.entries()) {
    await page.getByRole('combobox', { name: `Hào ${index + 1}` }).selectOption(String(value));
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  const primary = page.getByRole('region', { name: 'Quẻ chính' });
  const changed = page.getByRole('region', { name: 'Quẻ biến' });
  await expect(primary).toBeVisible();
  await expect(changed).toBeVisible();
  await expect(changed.getByRole('heading')).not.toHaveText(
    await primary.getByRole('heading').innerText(),
  );
  await expect(changed.getByText('Đã đổi âm dương')).toHaveCount(1);
  await expect(changed.locator('.line-note').filter({ hasText: /^$/ })).toHaveCount(5);
});

test('the reading survives navigation to the home tab', async ({ page }) => {
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page.getByRole('combobox', { name: `Hào ${index + 1}` }).selectOption(String(value));
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  await page.getByRole('link', { name: 'Gieo quẻ', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Deterministic scenario' })).toBeVisible();
  await expect(
    page.getByText(`Các hào, từ hào một đến hào sáu: ${sixLines.join(', ')}`),
  ).toBeVisible();
});

test('Library can be opened directly and filtered by search', async ({ page }) => {
  await page.goto('/library/hexagram/hexagram-01');
  await expect(page).toHaveURL(/\/library\/hexagram\/hexagram-01$/);
  await expect(page.getByRole('heading', { name: 'Thuần Càn' })).toBeVisible();

  await page.goto('/library');
  await expect(page.getByRole('heading', { name: /Thư viện/ })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Tìm theo tên và phần mô tả' }).fill('Càn');
  await expect(page.getByRole('link', { name: /Càn/ }).first()).toBeVisible();
  await expect(page.getByText(/mục$/)).toBeVisible();
});

test('result drawer closes with Escape and restores focus to its trigger', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page.getByRole('combobox', { name: `Hào ${index + 1}` }).selectOption(String(value));
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  const trigger = page.getByRole('button', { name: /Quẻ chính:.*Xem giải thích dữ kiện này/ });
  await trigger.focus();
  await trigger.press('Enter');
  const drawer = page.getByRole('dialog', { name: /Chi tiết dữ kiện/ });
  await expect(drawer).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});
