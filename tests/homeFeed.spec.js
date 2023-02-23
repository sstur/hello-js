// @ts-check
import { test, expect } from '@playwright/test';

test('home feed loads', async ({ page }) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const headerTitle = page.getByText('Home', { exact: true });

  await expect(headerTitle).toBeVisible();
});

test('clicking create post (plus button) will navigate to login', async ({
  page,
}) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const createPostButton = page
    .getByRole('button')
    .filter({ has: page.locator('.icon-tabler-plus') });

  await expect(createPostButton).toHaveCount(1);

  await createPostButton.click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/login');

  const welcomeHeader = page.getByText('Welcome to Chirper');
  await expect(welcomeHeader).toBeVisible();
});
