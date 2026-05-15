import { test } from "@playwright/test";

test('Keyboard actions', async ({ page }) => {

    await page.goto("https://gotranscript.com/text-compare")

    await page.locator('[name="text1"]').fill("welcome to autoamtion");

    //Ctrl + A   - Select the text
    await page.keyboard.press('Meta+A')

    //Ctrl + C  - copy the text
    await page.keyboard.press('Meta+C')

    //Tab
    await page.keyboard.down('Tab')
    await page.keyboard.up('Tab')


    //Ctrl + V  - paste the text
    await page.keyboard.press('Meta+V')

    await page.waitForTimeout(5000);

});

