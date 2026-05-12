import { test, expect } from '@playwright/test'

test('Text Input Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const textBox = page.locator('#name')

    await expect(textBox).toBeVisible()
    await expect(textBox).toBeEnabled()

    const maxLength = await textBox.getAttribute("maxlength") // Return value of maxlength attribute of the element
    expect(maxLength).toBe("15")

    await textBox.fill("John Doe")

    // console.log("Text content of FirstName: ", await textBox.textContent()) returns empty as text is not present in HTML

    const enteredValue = await textBox.inputValue()
    console.log("Input Value of FirstName: ", enteredValue) // Returns the input value of text box
    expect(enteredValue).toBe("John Doe")

    await page.waitForTimeout(3000) //Thread.sleep()

})

// Radio Buttons

test('Radio Button Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const maleRadio = page.locator('#male')

    await expect(maleRadio).toBeVisible()
    await expect(maleRadio).toBeEnabled()
    expect(await maleRadio.isChecked()).toBe(false)

    await maleRadio.check() // select radio button
    // expect(await maleRadio.isChecked()).toBe(true)
    await expect(maleRadio).toBeChecked() // preferable

})

test.only('Check Box Actions', async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    //1. Select specific checkbox using getByLabel and assert

    const sundayCheckbox = page.getByLabel("Sunday")
    // await sundayCheckbox.check();
    // await expect(sundayCheckbox).toBeChecked()

    //2. Select multiple checkbox and assert each is checked

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    /*  for (const day of days) {
         const dayCheckbox = page.getByLabel(day)
         await dayCheckbox.check()
         await expect(dayCheckbox).toBeChecked()
     } */

    const checkboxes = days.map(index => page.getByLabel(index))
    expect(checkboxes.length).toBe(7)

    for (const checkbox of checkboxes) {
        await checkbox.check()
        await expect(checkbox).toBeChecked()
    }

    await page.waitForTimeout(3000)


    // Uncheck last 3 checkboxes and assert
    for (const checkbox of checkboxes.slice(-3)) {
        await checkbox.uncheck()
        await expect(checkbox).not.toBeChecked()
    }

    await page.waitForTimeout(3000)


    // Toggle checkboxes: If checked , uncheck and if unchecked, check. Assert state flipped.

    for (const checkbox of checkboxes) {

        if (await checkbox.isChecked()) {
            //only if checked
            await checkbox.uncheck()
            await expect(checkbox).not.toBeChecked()
        }
        else {
            //if unchecked
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }

    await page.waitForTimeout(3000)

    // Randomly select checkboxes - Select checkboxes by index ( 1, 3, 6) and assert
    const indexes = [1, 3, 6];
    for (const i of indexes) {
        await checkboxes[i].check()
        await expect(checkboxes[i]).toBeChecked()
    }

    await page.waitForTimeout(5000)

    // Select the check box bases on label
    const weekday = "Friday";

    for (const label of days) {
        if (label.toLowerCase() === weekday.toLowerCase()) {
            const checkbox = page.getByLabel(label);
            await checkbox.check()
            await expect(checkbox).toBeChecked()
        }
    }
    await page.waitForTimeout(3000)


})