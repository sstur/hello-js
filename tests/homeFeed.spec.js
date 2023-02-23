// @ts-check
import { test, expect } from '@playwright/test';

test('home feed loads', async ({ page }) => {
  await page.goto('https://chirper.live-app.com/');

  const headerTitle = page.getByText('Home', { exact: true });

  await expect(headerTitle).toBeVisible();
});

test('clicking create post (plus button) will navigate to login', async ({
  page,
}) => {
  await page.goto('https://chirper.live-app.com/');

  // TODO: Locate the button, click it, assert that we have navigated to the /login page
});
