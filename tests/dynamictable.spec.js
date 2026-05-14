import { test, expect } from '@playwright/test'

test("Dynamic Table test", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table")

    const table = page.locator("table.table tbody")
    await expect(table).toBeVisible()

    //select all the rows and find no of rows
    const rows = await table.locator("tr").all()
    console.log("No of rows are : ", rows.length)
    expect(rows).toHaveLength(4)

    //1. Get CPU load for chrome process
    // Read each row to check chrome presence

    let cpuLoad = '';
    for (const row of rows) {
        const processName = await row.locator('td').nth(0).innerText();
        if (processName === "Chrome") {
            cpuLoad = await row.locator('td:has-text("%")').innerText();
            // cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            console.log("CPU load for chrome process is : ", cpuLoad);
            break;
        }
    }

    //2. Compare it with value of yellow label

    let yellowboxtext = await page.locator("#chrome-cpu").innerText();
    console.log("Chrome cpu load from yellow box : ", yellowboxtext);

    if (yellowboxtext.includes(cpuLoad)) {
        console.log("CPU load of chrome is equal");
    }
    else {
        console.log("CPU load of chrome is NOT equal");
    }

    expect(yellowboxtext).toContain(cpuLoad)

    await page.waitForTimeout(5000);


})