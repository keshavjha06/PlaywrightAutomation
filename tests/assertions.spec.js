import { test, expect } from '@playwright/test'

test('assetions', async ({ page }) => {
    await page.goto("https://demo.nopcommerce.com/register")

    // URL Assertion
    await expect(page).toHaveURL("https://demo.nopcommerce.com/register")

    // Title Assertion
    await expect(page).toHaveTitle("nopCommerce demo store. Register")

    // Element visible assertion
    const logoElement = page.locator(".header-logo")
    await expect(logoElement).toBeVisible()

    // Element enabled assertion
    const searchStoreBox = page.locator('#small-searchterms')
    await expect(searchStoreBox).toBeEnabled()

    // radio button assertion
    const radioButton = page.locator("#gender-male")
    await radioButton.click()
    await expect(radioButton).toBeChecked()

    //check box assertion
    const newsLetterCheckBox = page.locator("#NewsLetterSubscriptions_0__IsActive")
    await expect(newsLetterCheckBox).toBeChecked()

    //Element Attribute value assertion
    const regButton = page.locator("#register-button")
    await expect(regButton).toHaveAttribute('type', 'submit')

    // toHaveText() assetion
    await expect(page.locator('.page-title h1')).toHaveText('Register')

    //toContainText() assertion
    await expect(page.locator('.page-title h1')).toContainText('Reg')

    //toHaveValue()
    const emailInput = page.locator('#Email')
    await emailInput.fill("test@demo.com")
    await expect(emailInput).toHaveValue("test@demo.com")

    // toHaveCount() assertion
    const links = page.locator("a")
    console.log('Total links: ', await links.count())
    await expect(links).toHaveCount(46)


})