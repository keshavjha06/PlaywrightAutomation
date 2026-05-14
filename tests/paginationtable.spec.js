import { test, expect } from "@playwright/test"

test("Read all data from table pages", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    let hasmorepages = true;

    while (hasmorepages) {
        const rows = await page.locator("#example tbody tr").all()
        for (let row of rows) {
            console.log(await row.innerText());

        }
        await page.waitForTimeout(2000)
        //button[aria-label="Next"]
        //button[aria-controls='example']:has-text("›")
        //button[aria-controls='example']:nth-child(9)
        const nextButton = page.getByRole('link', { name: 'Next' })
        const isDisabled = await nextButton.getAttribute('class')

        if (isDisabled.includes('disabled')) {
            hasmorepages = false;
        }
        else {
            await nextButton.click();
        }

    }

})

test("Filter the rows and check the rows count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const dropdown = page.locator("#dt-length-0")
    await dropdown.selectOption({ label: "25" })

    const rows = await page.locator("#example tbody tr").all()
    console.log("No of rows are : ", rows.length)
    // expect(rows.length).toBe(25)
    expect(rows).toHaveLength(25)




})


test.only("Search for specific data in a table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");

    const searchInput = page.locator("#dt-search-0")
    await searchInput.fill("Paul Byrd")

    await page.waitForTimeout(5000)

    const rows = await page.locator("#example tbody tr").all()
    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            const text = await row.innerText();
            if (text.includes("Paul Byrd")) {
                console.log("Record exist");

                matchFound = true;
                break;
            }
        }
        // expect(matchFound).toBe(true);
        expect(matchFound).toBeTruthy()
    }
    else {
        console.log("No rows found with the search text")
    }

})