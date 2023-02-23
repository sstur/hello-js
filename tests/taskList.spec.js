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

test('add a new task item', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  const textInput = page.getByPlaceholder('Enter a task');

  await textInput.fill('Buy socks');

  const button = page.getByRole('button', { name: 'Add Task' });

  await button.click();

  const listItems = page.getByRole('listitem').filter({ hasText: 'Buy socks' });

  await expect(listItems).toHaveCount(1);
});

test('mark an item as done', async ({ page }) => {
  // 1. Setup the test (go to the page); Remember you local dev server needs to be running.
  // 2. Locate a thing on the page
  // 3. Do an action, e.g. click the thing
  // 4. Make an assertion; use expect() to assert that something is a certain way on the page
});
