import { test, expect } from '@playwright/test'

test('multi select dropdown test', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    // Select multiple options from multi select dropdown
    await page.selectOption('#colors', ['Blue', 'Red', 'Yellow'])

    //Assertions
    //1. check number of options in dropdown
    const options = page.locator('#colors option')
    await expect(options).toHaveCount(7)

    //2. check number of options in dropdown using JS array
    const optionscount = await page.$$('#colors option')
    console.log("Number of options: ", optionscount.length)
    expect(optionscount.length).toBe(7)

    //3 check presence of value in the dropdown
    const content = await page.locator('#colors').textContent()
    expect(content.includes('Blue')).toBeTruthy();
    expect(content.includes('Black')).toBeFalsy();

    await page.waitForTimeout(5000)
})