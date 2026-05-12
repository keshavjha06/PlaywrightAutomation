import { test, expect } from '@playwright/test'

test('Sorted dropdown test', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const dropdownOptions = page.locator('#animals>option')
    // const dropdownOptions = page.locator('#colors>option')
    // console.log(await dropdownOptions.allTextContents())

    const optionsText = (await dropdownOptions.allTextContents()).map(text => text.trim())

    const originalList = [...optionsText];
    const sortedList = [...optionsText].sort();

    console.log("Original List", originalList);
    console.log("Sorted List", sortedList);

    expect(originalList).toEqual(sortedList)


})