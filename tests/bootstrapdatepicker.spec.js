import { test, expect } from '@playwright/test'

test("Bootstrap Date Picker Test - Check-in and Check-out", async ({ page }) => {
    await page.goto("https://www.booking.com")

    // Dismiss popup (handle gracefully — it may not always show)
    const dismissBtn = page.getByRole('button', { name: 'Dismiss sign-in info.' });
    await dismissBtn.click({ timeout: 5000 }).catch(() => { });

    // Click on date picker field to open calendar
    await page.getByTestId('searchbox-dates-container').click();

    // Check in Date selection
    let checkinYear = "2026"
    let checkinMonth = "November"
    let checkinDate = "15"

    // Navigate through the calendar to find the desired check-in month and year
    while (true) {
        const checkInMonthYear = await page.locator(".d7bd90e008 h3").first().innerText()
        const currentMonth = checkInMonthYear.split(" ")[0]
        const currentYear = checkInMonthYear.split(" ")[1]
        if (currentMonth === checkinMonth && currentYear === checkinYear) {
            break;
        } else {
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    // Select specific check-in date
    let allDates = await page.locator('table.b8fcb0c66a tbody').nth(0).locator('td').all()
    let checkinDateSelected = false;

    for (let date of allDates) {
        const dateText = await date.innerText()
        if (dateText === checkinDate) {
            await date.click();
            checkinDateSelected = true;
            break;
        }
    }

    expect(checkinDateSelected).toBeTruthy();

    // Check out Date selection
    let checkoutYear = "2026"
    let checkoutMonth = "December"
    let checkoutDate = "19"

    // Navigate through the calendar to find the desired check-in month and year
    while (true) {
        const checkInMonthYear = await page.locator(".d7bd90e008 h3").nth(1).innerText()
        const currentMonth = checkInMonthYear.split(" ")[0]
        const currentYear = checkInMonthYear.split(" ")[1]
        if (currentMonth === checkoutMonth && currentYear === checkoutYear) {
            break;
        } else {
            await page.locator("button[aria-label='Next month']").click();
        }
    }

    // Select specific check-out date
    allDates = await page.locator('table.b8fcb0c66a tbody').nth(1).locator('td').all()
    let checkoutDateSelected = false;

    for (let date of allDates) {
        const dateText = await date.innerText()
        if (dateText === checkoutDate) {
            await date.click();
            checkoutDateSelected = true;
            break;
        }
    }

    expect(checkoutDateSelected).toBeTruthy();

    await page.waitForTimeout(5000)


})