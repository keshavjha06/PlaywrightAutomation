import { test, expect } from '@playwright/test';

// npx playwright codegen -o tests/codegen.spec.js - to generate file using codegen

test('test', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');

  await page.getByRole('link', { name: 'Log in' }).click();

  await page.locator('#loginusername').fill('pavanol');

  await page.locator('#loginpassword').fill('test@123');

  await page.getByRole('button', { name: 'Log in' }).click();
});