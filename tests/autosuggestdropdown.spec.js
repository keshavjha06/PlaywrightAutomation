import { test, expect } from '@playwright/test'

test('Auto suggest dropdown test', async ({ page }) => {
    await page.goto("https://www.flipkart.com/")
    await page.getByText('✕').click()

    await page.locator('input:visible').fill("smart") // search text 
    await page.waitForTimeout(5000)

    // Get all suggested options - cmd + shift + P on DOM - emulate a focusse page / Do not emulate focussed page

    const options = page.locator("ul>li")

    const count = await options.count();
    console.log("Number of suggested options ", count);

    // printing all the suggested options in the console

    console.log("5th option ", await options.nth(5).innerText());

    for (let i = 0; i < count; i++) {
        // console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent()); // innerText() and textContent() both works here
    }

    // select / click on smartphone option

    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).innerText();
        if (text === 'smartphone') {
            await options.nth(i).click();
            break;
        }
    }

    // Enter smartphone text using allTextContents()

   /*  const allOptions = await options.allTextContents();
    console.log("All options ", allOptions);

    if (allOptions.includes('smartphone')) {
        await options.filter({ hasText: /^smartphone$/ }).click();
    } */


})