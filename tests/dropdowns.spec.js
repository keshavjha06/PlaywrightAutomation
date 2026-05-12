import { test, expect } from '@playwright/test'

test('Dropdown Actions', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // Multiple ways to select option from dropdown
    /*  await page.locator('#country').selectOption({ label: "Canada" }) // label / visible text
     await page.locator('#country').selectOption('Japan') // visible text
     await page.locator('#country').selectOption({ value: "india" }) // attribute value
     await page.locator('#country').selectOption({ index: 4 }) // index
     await page.selectOption('#country', 'Brazil') // by text */

    // Assertions
    // 1. check number of options in dropdown
    const options = page.locator('#country option')
    await expect(options).toHaveCount(10)

    //2. check number of options in dropdown using $$()
    const optionscount = await page.$$('#country option')
    console.log("Number of options: ", optionscount.length)
    expect(optionscount.length).toBe(10)

    //3. check presence of value in the dropdown
    const content = await page.locator('#country').textContent()
    expect(content.includes("India")).toBeTruthy()

    /* // 4. check presence of value in the dropdown using for loop
    const optionList = await page.$$('#country option')
    let status = false;
    for (const option of optionList) {
        // console.log(await option.textContent());
        let value = await option.textContent();
        if (value.includes("France")) {
            status = true
            break
        }
    }
    expect(status).toBeTruthy(); */

    // 5. select option from dropdown using loop
    const optionList = await page.$$('#country option')
    for (const option of optionList) {
        let value = await option.textContent();
        if (value.includes('France')) {
            await page.selectOption("#country", { label: value.trim() })
            break;
        }
    }

    await page.waitForTimeout(5000)
})