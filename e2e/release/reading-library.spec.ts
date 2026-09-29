import { expect, test } from '@playwright/test';

const sixLines = [6, 7, 8, 9, 6, 7] as const;

const lineNames: Record<number, string> = {
  6: 'Lão âm',
  7: 'Thiếu dương',
  8: 'Thiếu âm',
  9: 'Lão dương',
};

async function startReading(page: import('@playwright/test').Page, method: string) {
  await page.goto('/');
  await page
    .getByRole('textbox', { name: 'Câu hỏi (không bắt buộc)' })
    .fill('Deterministic scenario');
  await page.getByRole('radio', { name: method }).check();
  await page.getByRole('button', { name: 'Bắt đầu gieo quẻ' }).click();
}

async function readResultSummary(page: import('@playwright/test').Page) {
  await expect(page.getByText('Deterministic scenario', { exact: true })).toBeVisible();
  return {
    primary: await page.getByRole('region', { name: 'Quẻ chính' }).innerText(),
    lines: await page.getByRole('region', { name: 'Thông tin các hào' }).innerText(),
  };
}

test('manual and direct entry produce the same result for six fixed values', async ({ page }) => {
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  const directSummary = await readResultSummary(page);

  await page.getByRole('link', { name: 'Trang gieo quẻ' }).click();
  await page.getByRole('button', { name: 'Lập quẻ mới' }).click();
  await page.getByRole('button', { name: 'Thay quẻ hiện tại' }).click();
  await startReading(page, 'Gieo thủ công');
  for (const [index, value] of sixLines.entries()) {
    const coins = page.locator('.manual-coins button');
    await coins.nth(0).click();
    if (value === 6) await coins.nth(0).click();
    else for (let coin = 1; coin < value - 6; coin += 1) await coins.nth(coin).click();
    await expect(page.locator('.manual-outcome')).toContainText(lineNames[value]!);
    await expect(page.locator('.manual-outcome')).not.toContainText('giá trị');
    await page.getByRole('button', { name: 'Xác nhận hào' }).click();
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
    const evidence = page
      .getByRole('status')
      .filter({ hasText: /Lão âm|Thiếu dương|Thiếu âm|Lão dương/ });
    await expect(evidence).toBeVisible();
    const text = await evidence.innerText();
    expect(text.replace(/Hào \d/g, '')).not.toMatch(/giá trị|\b[6789]\b/);
    await expect(page.locator('.forming-lines .is-filled')).toHaveCount(index + 1);
    const tossedValue = await evidence.locator('strong').getAttribute('data-line-value');
    expect(tossedValue && validValues.has(tossedValue)).toBe(true);
    expect(text.match(/mặt (?:trời|trăng)/g) ?? []).toHaveLength(3);
    if (index < 5) await page.getByRole('button', { name: 'Tiếp theo' }).click();
  }

  await page.getByRole('button', { name: 'Tính quẻ' }).click();
  await expect(page.getByText('Deterministic scenario', { exact: true })).toBeVisible();
  const rows = page.locator('.line-fact-row');
  await expect(rows).toHaveCount(6);
  for (const row of await rows.all()) {
    expect(
      validValues.has((await row.locator('.line-input-value').innerText()).trim().charAt(0)),
    ).toBe(true);
  }
});

test('automatic casting uses three or four DOM coins and reveals fixed toss faces', async ({
  page,
}) => {
  await startReading(page, 'Gieo tự động');
  const method = page.getByRole('group', { name: 'Số lượng đồng xu' });
  await expect(method.getByRole('button', { name: 'Ba đồng xu' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );

  const stage = page.locator('.casting-stage');
  await expect(stage.locator('.coin-face')).toHaveCount(3);
  await expect(stage.locator('.coin-grid')).toHaveClass(/coin-grid-3/);
  const primaryAction = page.getByRole('button', { name: 'Gieo hào' });
  await primaryAction.click();
  await expect(stage).toHaveClass(/is-casting/);
  await expect(stage.locator('.coin-face')).toHaveCount(3);
  const initialBusyFaces = await stage
    .locator('.coin-face')
    .evaluateAll(faces => faces.map(face => (face.classList.contains('is-heads') ? 1 : 0)));
  await expect
    .poll(async () =>
      stage
        .locator('.coin-face')
        .evaluateAll(faces => faces.map(face => (face.classList.contains('is-heads') ? 1 : 0))),
    )
    .not.toEqual(initialBusyFaces);

  const result = page
    .getByRole('status')
    .filter({ hasText: /Lão âm|Thiếu dương|Thiếu âm|Lão dương/ });
  await expect(result).toBeVisible();
  await expect(stage).not.toHaveClass(/is-casting/);
  const finalFaces = await stage
    .locator('.coin-face')
    .evaluateAll(faces => faces.map(face => (face.classList.contains('is-heads') ? 1 : 0)));
  const evidence = (await result.locator('.coin-evidence').innerText()).match(
    /mặt (?:trời|trăng)/g,
  );
  expect(evidence).not.toBeNull();
  expect(finalFaces).toEqual(evidence!.map(face => (face === 'mặt trời' ? 1 : 0)));

  await page.getByRole('button', { name: 'Xóa các hào' }).click();
  await expect(page.getByRole('alertdialog', { name: 'Xóa toàn bộ các hào?' })).toBeVisible();
  await page.getByRole('button', { name: 'Tiếp tục chỉnh sửa' }).click();
  await expect(result).toBeVisible();
  await page.getByRole('button', { name: 'Xóa các hào' }).click();
  await page.getByRole('button', { name: 'Xóa các hào', exact: true }).last().click();
  await expect(page.getByText('0 / 6 hào')).toBeVisible();
  await expect(stage.locator('.coin-face')).toHaveCount(3);

  await method.getByRole('button', { name: 'Bốn đồng xu' }).click();
  await expect(stage.locator('.coin-face')).toHaveCount(4);
  await expect(stage.locator('.coin-grid')).toHaveClass(/coin-grid-4/);
});

test('automatic casting keeps the primary action stationary before and after a reveal', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await startReading(page, 'Gieo tự động');
  const stage = page.locator('.casting-stage');
  await expect(stage.locator('.coin-face')).toHaveCount(3);

  const primaryAction = page.locator('.casting-primary-action');
  const before = await primaryAction.boundingBox();
  const beforeScroll = await page.evaluate(() => window.scrollY);
  expect(before).not.toBeNull();

  await primaryAction.click();
  await expect(primaryAction).toBeDisabled();
  await expect(stage).toHaveClass(/is-casting/);
  await expect(stage.locator('.coin-face')).toHaveCount(3);
  await expect(stage.locator('.coin-face').first()).toHaveCSS('animation-name', 'coin-flip');
  const evidence = page
    .getByRole('status')
    .filter({ hasText: /Lão âm|Thiếu dương|Thiếu âm|Lão dương/ });
  await expect(evidence).toBeVisible({ timeout: 5_000 });

  const after = await primaryAction.boundingBox();
  const afterScroll = await page.evaluate(() => window.scrollY);
  expect(after).not.toBeNull();
  expect(Math.abs(after!.y + afterScroll - before!.y - beforeScroll)).toBeLessThanOrEqual(1);
});

test('a moving line distinguishes the changed board from the primary board', async ({ page }) => {
  const oneMovingLine = [6, 7, 8, 7, 8, 7] as const;
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of oneMovingLine.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
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
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  await page.getByRole('link', { name: 'Gieo quẻ', exact: true }).click();
  await expect(page.getByText('Deterministic scenario', { exact: true })).toBeVisible();
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
  const drawer = page.getByRole('dialog', { name: /Chi tiết dữ kiện/ });
  await expect(drawer).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('result drawer opens after resizing a rendered desktop result and follows later resizes', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of sixLines.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  const trigger = page.getByRole('button', { name: /Quẻ chính:.*Xem giải thích dữ kiện này/ });
  await expect(page.locator('.wide-inspector')).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  await trigger.focus();
  await trigger.press('Enter');

  const drawer = page.getByRole('dialog', { name: /Chi tiết dữ kiện/ });
  await expect(drawer).toBeVisible();
  await expect
    .poll(() => drawer.evaluate(element => element.contains(document.activeElement)))
    .toBe(true);
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect(trigger).toBeFocused();

  await trigger.press('Enter');
  await expect(drawer).toBeVisible();
  await page.setViewportSize({ width: 1024, height: 900 });
  await expect(drawer).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
  await expect(
    page.locator('.wide-inspector').getByRole('heading', { name: 'Quẻ chính' }),
  ).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(drawer).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('hidden');
  await page.keyboard.press('Escape');
  await expect(drawer).toBeHidden();
  await expect.poll(() => page.evaluate(() => document.body.style.overflow)).toBe('');
});

test('result fact inspectors link canonical entities from desktop and mobile', async ({ page }) => {
  const oneMovingLine = [6, 7, 8, 7, 8, 7] as const;
  await page.setViewportSize({ width: 1024, height: 900 });
  await startReading(page, 'Nhập trực tiếp');
  for (const [index, value] of oneMovingLine.entries()) {
    await page
      .getByRole('group', { name: `Chọn hào ${index + 1}` })
      .getByRole('button')
      .nth(value - 6)
      .click();
  }
  await page.getByRole('button', { name: 'Tính quẻ' }).click();

  const primary = page.getByRole('region', { name: 'Quẻ chính' });
  const changed = page.getByRole('region', { name: 'Quẻ biến' });
  const inspector = page.locator('.wide-inspector');

  const expectCanonicalDestination = async (
    trigger: import('@playwright/test').Locator,
    kind: 'hexagram' | 'trigram',
    displayedName: string,
    expectedId?: string,
  ) => {
    const factLabel = (await trigger.locator('span').first().textContent())?.trim() ?? '';
    await trigger.click();
    await expect(
      inspector.getByRole('heading', { name: new RegExp(factLabel, 'i') }),
    ).toBeVisible();
    const footerLink = inspector.locator('.inspector-footer a');
    await expect(footerLink).toHaveText(`Xem trong thư viện: ${factLabel}`);
    const href = await footerLink.getAttribute('href');
    expect(href).toMatch(new RegExp(`/library/${kind}/${kind}-[a-z0-9-]+$`));
    const id = href!.split('/').at(-1)!;
    if (expectedId) expect(id).toBe(expectedId);
    await footerLink.click();
    await expect(page).toHaveURL(new RegExp(`/library/${kind}/${id}$`));
    await expect(page.getByRole('heading', { name: new RegExp(displayedName, 'i') })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Không tìm thấy mục' })).toHaveCount(0);
    await page.goBack();
    await expect(inspector).toBeVisible();
  };

  const primaryName = (await primary.getByRole('heading').textContent())?.trim() ?? '';
  const primaryHexagramId = `hexagram-${(await primary.locator('.hexagram-number').innerText()).trim()}`;
  await expectCanonicalDestination(
    page.getByRole('button', { name: /Quẻ chính:.*Xem giải thích dữ kiện này/ }),
    'hexagram',
    (await primary.getByRole('heading').textContent())?.trim() ?? '',
    primaryHexagramId,
  );
  const changedHexagramId = `hexagram-${(await changed.locator('.hexagram-number').innerText()).trim()}`;
  await expectCanonicalDestination(
    changed.getByRole('button', { name: /Quẻ biến:.*Xem giải thích dữ kiện này/ }),
    'hexagram',
    (await changed.getByRole('heading').textContent())?.trim() ?? '',
    changedHexagramId,
  );

  for (const label of ['Ngoại quái', 'Nội quái']) {
    const trigger = primary.getByRole('button', {
      name: new RegExp(`${label}:.*Xem giải thích dữ kiện này`),
    });
    const displayedName = await trigger.locator('strong').innerText();
    await expectCanonicalDestination(trigger, 'trigram', displayedName);
  }

  await primary.getByRole('button', { name: /Cung:.*Xem giải thích dữ kiện này/ }).click();
  await expect(inspector.locator('.inspector-footer')).toHaveCount(0);
  await expect(
    inspector.getByRole('link', { name: 'Mở quy tắc trong Thư viện' }).first(),
  ).toBeVisible();
  await inspector.getByRole('button', { name: 'Đóng phần giải thích dữ kiện' }).click();

  await page.setViewportSize({ width: 390, height: 844 });
  const mobilePrimary = page.getByRole('button', {
    name: /Quẻ chính:.*Xem giải thích dữ kiện này/,
  });
  await mobilePrimary.click();
  const drawer = page.getByRole('dialog', { name: /Chi tiết dữ kiện/ });
  await expect(drawer).toBeVisible();
  const mobileFooter = drawer.locator('.inspector-footer a');
  await expect(mobileFooter).toHaveAttribute(
    'href',
    new RegExp(`/library/hexagram/${primaryHexagramId}$`),
  );
  await mobileFooter.click();
  await expect(page).toHaveURL(new RegExp(`/library/hexagram/${primaryHexagramId}$`));
  await expect(page.getByRole('heading', { name: new RegExp(primaryName, 'i') })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Không tìm thấy mục' })).toHaveCount(0);
});
