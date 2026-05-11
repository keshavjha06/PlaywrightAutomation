import { test, expect } from '@playwright/test';

test('Home Page', async ({ page }) => {
    // async returns promise & await waits for promise as JS is asynchronous to make it synchronous async & await are used.
    // await is used when we want to wait for the promise to resolve and get the value. i.e page is loaded completely
    // await page.goto('https://practice.expandtesting.com/');
    await page.goto('https://www.demoblaze.com/index.html')

    const pageTitle = await page.title();
    console.log('Page title is: ', pageTitle);

    await expect(page).toHaveTitle('STORE');

    const pageURL = page.url();
    console.log('Page URL is: ', pageURL);

    await expect(page).toHaveURL('https://www.demoblaze.com/index.html')
    await page.close();

})
