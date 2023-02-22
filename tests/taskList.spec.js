// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle('Hello World');
});

// TODO: Your task is to write another test here.
// I'm happy if you just get any test running and passing.
// My suggestion is to reference tests-examples/demo-todo-app.spec.js and see
// how they did their tests.
// One simple test might be to assert that there are three task items initially.
// You must have your dev server running in a Terminal window/tab in order to
// run your tests. To run the dev server enter: npm start
// Remember to run just the playwright tests you can do one of the following:
// - In your terminal, enter: npm run e2e
// - In your terminal, enter: npx playwright test
