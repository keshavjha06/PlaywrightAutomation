import { test, expect } from "@playwright/test"

test("Handle frames", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total frames
    const allframes = page.frames()
    console.log("Total no of frames are : ", allframes.length)

    //handling frame by url
    // await framename = await page.frame('name') if name is present
    /*  const frame1 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1.html" })
        await frame1.fill('[name="mytext1"]', 'Hello from automation')
        await page.waitForTimeout(3000) */

    //using frame locator
    const inputbox = page.frameLocator("frame[src='frame_1.html']").locator('[name="mytext1"]')
    await inputbox.fill("Hello")
    await page.waitForTimeout(3000)

})