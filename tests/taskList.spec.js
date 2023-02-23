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

  const listItems = page
    .getByRole('listitem')
    .filter({ hasText: 'Learn JavaScript' });

  await listItems.click();

  await expect(listItems).toHaveText('✅ Learn JavaScript');
});

test('adding an item, marking it as done, then changing to not done', async ({
  page,
}) => {
  // Task 59
  // Assert the initial state
  // Then create a new task
  // Assert new task has been created in the "not done" state
  // Assert the text input is now empty (it gets cleared after submit)
  // Click to mark the task as done; assert that worked
  // Click again to mark the task as not done; assert that worked
  // Don't forget to setup your test (go to the correct page)
  // To run your tests, use: npm run e2e
  await page.goto('http://localhost:3000/');

  const listItems = page.getByRole('listitem');
  await expect(listItems).toHaveCount(3);

  // Add new item
  const textInput = page.getByPlaceholder('Enter a task');
  await textInput.fill('Buy socks');
  await textInput.press('Enter');
  await expect(listItems).toHaveCount(4);

  // Assert the item exists
  const newItem = page.getByText('Buy socks');
  await expect(newItem).toContainText('⌛️');

  // Assert the text input was cleared after submitting
  await expect(textInput).toHaveValue('');

  // If the item is clicked, it gets flipped to done
  newItem.click();
  await expect(newItem).toContainText('✅');

  // If the item is clicked again, it gets flipped back to not-done
  newItem.click();
  await expect(newItem).toContainText('⌛️');
});
