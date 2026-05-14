import { test, expect } from "@playwright/test"

test("Handle frames", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_3.html" })

    // frame3.locator("input[name='mytext3']").fill("Hello from inner frame")

    //nested frames
    const childFrames = await frame3.childFrames()
    console.log("Total no of child frames are : ", childFrames.length)
    await childFrames[0].locator("//*[@id='i6']/div[3]/div").check()
    await page.waitForTimeout(3000)

})