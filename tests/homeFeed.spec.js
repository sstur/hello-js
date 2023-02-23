// @ts-check
import { test, expect } from '@playwright/test';

test('home feed loads', async ({ page }) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const headerTitle = page.getByText('Home', { exact: true });

  await expect(headerTitle).toBeVisible();
});

test('navigate to login page, login', async ({ page }) => {
  await page.goto('https://90u6ms-3000.preview.csb.app/');

  const createPostButton = page
    .getByRole('button')
    .filter({ has: page.locator('.icon-tabler-plus') });

  await expect(createPostButton).toHaveCount(1);

  await createPostButton.click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/login');

  const welcomeHeader = page.getByText('Welcome to Chirper');
  await expect(welcomeHeader).toBeVisible();

  await page.getByLabel('Username').fill('oliviagreene');
  await page.getByLabel('Password').fill('asdf');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/');

  const loginButton = page
    .getByRole('button')
    .filter({ has: page.locator('.icon-tabler-login') });

  await expect(loginButton).not.toBeVisible();

  await createPostButton.click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/new');

  const uniqueCode = Date.now().toString(36);
  const examplePostContent = `Test post from Playwright (${uniqueCode})`;

  page.getByPlaceholder("What's happening?").fill(examplePostContent);

  page.getByRole('button', { name: 'Send' }).click();

  await expect(page).toHaveURL('https://90u6ms-3000.preview.csb.app/');

  const newlyCreatedPost = page.getByText(examplePostContent);

  await expect(newlyCreatedPost).toBeVisible();
});
