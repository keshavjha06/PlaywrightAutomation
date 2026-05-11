import { test, expect } from '@playwright/test';

test('locators', async ({ page }) => { // Here page is a fixture

    await page.goto('https://www.demoblaze.com/index.html')

    // click on login button - property
    // await page.locator(id = 'login2').click();
    await page.click('id=login2')

    //username - CSS
    // await page.locator('#loginusername').fill('pavanol')
    await page.fill('#loginusername', 'pavanol')

    //password - CSS
    await page.fill("input[id='loginpassword']", 'test@123')

    //click on login button - XPath
    await page.click("//button[normalize-space()='Log in']")

    //verify logout link presence - XPath
    const logoutLink = page.locator("//a[normalize-space()='Log out']")

    await expect(logoutLink).toBeVisible();

    await page.close();
})