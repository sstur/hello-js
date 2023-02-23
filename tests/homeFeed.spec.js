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

  // TODO: Locate the button, click it, assert that we have navigated to the /login page
});
