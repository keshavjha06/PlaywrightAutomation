import { test, expect } from '@playwright/test'

test('soft assertions', async ({ page }) => {
    await page.goto("https://www.demoblaze.com/index.html")

    // Hard Assertion
    await expect(page).toHaveTitle("STORE")
    await expect(page).toHaveURL("https://www.demoblaze.com/index.html")
    await expect(page.locator(".navbar-brand")).toBeVisible()

    console.log("Hard Assertions PASSED")

    // soft Assertion
    await expect.soft(page).toHaveTitle("STORE123")
    await expect.soft(page).toHaveURL("https://www.demoblaze.com/index.html")
    await expect.soft(page.locator(".navbar-brand")).toBeVisible()
    console.log("Soft Assertions PASSED")
})