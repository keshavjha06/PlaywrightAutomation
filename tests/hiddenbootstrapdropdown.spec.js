import { test, expect } from '@playwright/test'

test("hidden bootstrap dropdown test", async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // login steps
    await page.getByPlaceholder('Username').fill('Admin')
    await page.getByPlaceholder('Password').fill('admin123')
    await page.locator('button[type="submit"]').click()

    // wait for dashboard to load after login
    await page.waitForURL('**/dashboard/**')

    // click on the PIM
    await page.getByText('PIM', { exact: true }).click()

    // wait for PIM page to load
    await page.waitForURL('**/pim/**')

    // click on the Job Title dropdown
    await page.locator('form i').nth(2).click()
    await page.waitForTimeout(3000)

    // capture all the options in the dropdown
    const options = page.locator("div[role='listbox'] span")
    const count = await options.count()
    console.log("number of options in a dropdown ", count);

    //print all the options
    console.log("All the text contents: ", await options.allTextContents());

    for (let i = 0; i < count; i++) {
        // console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    //click on the desired option using for loop
    for (let i = 0; i < count; i++) {
        const text = await options.nth(i).textContent()
        if (text === 'Automaton Tester') {
            await options.nth(i).click()
            break
        }
    }

    await page.waitForTimeout(3000)
})

