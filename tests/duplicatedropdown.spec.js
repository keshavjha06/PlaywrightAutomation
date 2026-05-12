import { test, expect } from '@playwright/test'

test('Duplicate Dropdown ', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // const dropdownOptions = page.locator('#colors>option') // duplicates
    const dropdownOptions = page.locator('#animals>option') // no duplicates


    const optionsText = (await dropdownOptions.allTextContents()).map(text => text.trim())

    const myset = new Set(); // duplicates not allowed
    const duplicates = []; //array - duplicates allowed

    for (const text of optionsText) {
        if (myset.has(text)) {
            duplicates.push(text);
        }
        else {
            myset.add(text);
        }
    }

    console.log("Duplicates options are ", duplicates);

    if (duplicates.length > 0) {
        console.log("Duplicate options found ", duplicates)
    }
    else {
        console.log("Duplicate options not found..");

    }

    expect(duplicates.length).toBe(0);

})

