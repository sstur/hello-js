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
  await page.goto('http://localhost:3000/');

  const listItems = page.getByRole('listitem');

  const beforeList = [];

  for (const li of await listItems.all()) {
    const text = await li.innerText();
    beforeList.push(text);
  }

  expect(beforeList).toEqual([
    '✅ Make coffee',
    '⌛️ Do Laundry',
    '⌛️ Learn JavaScript',
  ]);

  const incompleteItems = page.getByText('⌛️');
  while ((await incompleteItems.count()) > 0) {
    await incompleteItems.first().click();
  }

  await expect(page.getByText('✅')).toHaveCount(beforeList.length);
});
