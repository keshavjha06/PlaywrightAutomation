import { test, expect } from '@playwright/test'

test('locatingmultipleelements', async ({ page }) => {

    await page.goto('https://www.demoblaze.com/index.html')

    //Get all the links
    /*  const links = await page.$$('a')
     console.log('Total links: ', links.length)
 
     for(const link of links){
         console.log(await link.textContent())
     } */

    // Locate all the products displayed on home page
    await page.waitForSelector("//div[@id='tbodyid']/div//h4/a")

    const products = await page.$$("//div[@id='tbodyid']/div//h4/a")
    console.log('Total products: ', products.length)

    for (const product of products) {
        const productName = await product.textContent()
        console.log(productName)
    }

    await page.close()
})