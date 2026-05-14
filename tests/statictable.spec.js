import { test, expect } from "@playwright/test"

test("Static table", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Check no of rows and columns
    const rows = page.locator('table[name="BookTable"] tbody tr')
    const columns = page.locator('table[name="BookTable"] tbody tr th')
    console.log("No of rows are : ", await rows.count())
    await expect(rows).toHaveCount(7)
    console.log("No of columns are : ", await columns.count())
    await expect(columns).toHaveCount(4)

    //2. Read all data from 2nd row ( index 2 means 3rd row including header)
    const secondRowcells = rows.nth(2).locator('td')
    console.log("No of cells in 2nd row are : ", await secondRowcells.count())
    const secondRowTexts = await secondRowcells.allInnerTexts()
    console.log("2nd row data are : ", secondRowTexts) // [ 'Learn Java', 'Mukesh', 'Java', '500' ]
    await expect(secondRowcells).toHaveText(['Learn Java', 'Mukesh', 'Java', '500'])

    console.log("printing 2nd row data........");
    for (let text of secondRowTexts) {
        console.log(text);
    }

    //3. Read all data from the table (excluding header)
    const allRowsData = await rows.all() // get all row locators , all() returns array of locators
    for (let row of allRowsData.slice(1)) { // slice(1) used to skip header
        const rowText = await row.locator('td').allInnerTexts()
        // console.log(rowText);
        console.log(rowText.join('\t'))
    }

    //4. Print book names where author is Mukesh
    const mukeshBooks = []
    for (let row of allRowsData.slice(1)) {
        const rowText = await row.locator('td').allInnerTexts()
        const author = rowText[1]
        const book = rowText[0]
        if (author === "Mukesh") {
            console.log(`${author} \t ${book}`)
            mukeshBooks.push(book)
        }
    }

    expect(mukeshBooks).toHaveLength(2) // Assertion

    //5. Total price of books
    let total = 0
    for (let row of allRowsData.slice(1)) {
        const rowText = await row.locator('td').allInnerTexts()
        const price = rowText[3]
        total = total + parseInt(price)
    }
    console.log("Total price is : ", total)
    expect(total).toBe(7100)

})