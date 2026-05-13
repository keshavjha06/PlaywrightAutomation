import { test, expect } from "@playwright/test"

test.skip("Alert with OK", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain("alert")
        expect(dialog.message()).toContain("I am an alert box!")
        await dialog.accept()
    })

    await page.getByRole('button', { name: 'Simple Alert' }).click()
    await page.waitForTimeout(5000)

})

test.skip("Confirmation Dialogue - Alert with OK and cancel", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain("confirm")
        expect(dialog.message()).toContain("Press a button!")
        await dialog.accept() // close using OK button
        // await dialog.dismiss() // close using Cancel button
    })

    await page.getByRole('button', { name: 'Confirmation Alert' }).click()

    // await page.click('#confirmBtn') another way to click the confirmation alert button

    await expect(page.locator('#demo')).toHaveText("You pressed OK!")
    await page.waitForTimeout(5000)

})

test("Prompt Dialogue", async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    // Enabling Dialog window handler
    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain("prompt")
        expect(dialog.message()).toContain("Please enter your name:")
        expect(dialog.defaultValue()).toBe("Harry Potter")
        await dialog.accept('John')
    })

    await page.getByRole('button', { name: 'Prompt Alert' }).click()
    await expect(page.locator('#demo')).toHaveText("Hello John! How are you today?")
    await page.waitForTimeout(5000)

})