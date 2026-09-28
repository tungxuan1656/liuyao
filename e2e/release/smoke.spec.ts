import { expect, test } from '@playwright/test';

test('production app smoke test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Lục Hào');
  await expect(page.locator('#root')).not.toBeEmpty();
});
