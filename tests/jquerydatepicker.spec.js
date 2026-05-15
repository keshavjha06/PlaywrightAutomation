import { test, expect } from '@playwright/test'

async function selectDate(targetYear, targetMonth, targetDate, page, isFuture) {
    while (true) {
        const currentMonth = await page.locator('.ui-datepicker-month').textContent()
        const currentYear = await page.locator('.ui-datepicker-year').textContent()

        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }


        if (isFuture) {
            await page.locator('.ui-datepicker-next').click();
        } else {
            await page.locator('.ui-datepicker-prev').click();
        }
    }

    const allDates = await page.locator('.ui-datepicker-calendar td').all();
    for (let dt of allDates) {
        const dateText = await dt.innerText()
        if (dateText === targetDate) {
            await dt.click();
            break;
        }
    }

}

test("JQuery Date Picker", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/")

    const dateInput = page.locator('#datepicker')
    await expect(dateInput).toBeVisible()

    //using fill() method
    // dateInput.fill("06/20/2025") // mm/dd/yyyy format

    await dateInput.click(); // opens the date picker

    //future target date
    /* const year = "2027"
    const month = "June"
    const date = "15" */

    //past target date
    const year = "2024"
    const month = "June"
    const date = "15"

    selectDate(year, month, date, page, false) // future date - true, past date - false

    const expectedDate = "06/15/2024"
    expect(dateInput).toHaveValue(expectedDate)
    await page.waitForTimeout(5000)

})