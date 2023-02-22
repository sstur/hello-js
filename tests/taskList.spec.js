// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Hello World');
});

test('has task items', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const listItems = page.getByRole('listitem');

  await expect(listItems).toHaveText([
    '✅ Make coffee',
    '⌛️ Do Laundry',
    '⌛️ Learn JavaScript',
  ]);
});
