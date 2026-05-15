import { test, expect } from "@playwright/test";

test("Mouse Hover", async ({ page }) => {

    await page.goto('https://demo.opencart.com/')

    const desktops = page.locator('//a[normalize-space()="Desktops"]')
    const macbook = page.locator('//a[normalize-space()="Mac (1)"]')

    //mouse hover
    await desktops.hover()
    await macbook.hover()

    await page.waitForTimeout(5000)

})

test('Right Click', async ({ page }) => {

    await page.goto('http://swisnl.github.io/jQuery-contextMenu/demo.html');

    // Wait for the button to be visible on the page
    const button = page.locator('//span[normalize-space()="right click me"]');

    // Right-click on the button
    await button.click({ button: 'right' });
    await page.waitForTimeout(5000)

})

test('Double Click', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const btnCopy = page.locator('//button[normalize-space()="Copy Text"]')

    // Double-click on the button
    await btnCopy.dblclick();

    const f2 = page.locator('#field2')
    await expect(f2).toHaveValue('Hello World!')

    await page.waitForTimeout(5000)
})

test.only('Drag and Drop', async ({ page }) => {

    await page.goto('http://www.dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');

    // Drag and Drop rome--> italy
    const rome = page.locator('#box6');
    const italy = page.locator('#box106');

    //Approach 1
    await rome.hover();
    await page.mouse.down();
    await italy.hover();
    await page.mouse.up();

    //Appraoch 2 - direct
    //await rome.dragTo(italy);

    // Drag and Drop Washingtom--> USA
    const washington = page.locator('#box3');
    const usa = page.locator('#box103');
    await washington.dragTo(usa);

    await page.waitForTimeout(5000)
})