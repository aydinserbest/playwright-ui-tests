import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})
/*
Using JavaScript:
	•	We directly change the cx and cy attributes (x and y coordinates).
	•	In other words, we manually update the slider’s position through code.
	•	Then, we click to apply this change (in some systems, a click is necessary to activate the movement).
	•	There is no real user interaction here → it’s a direct manipulation.
*/
test('sliders first approach', async ({ page }) => {
    //update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '231.223')
        node.setAttribute('cy', '231.223')
    })
    await tempGauge.click()
})
/*
2. We want to behave like a real user.
    It simulates an actual user interaction.
*/
test('sliders second approach', async ({ page }) => {
    //simulate the actual mouse movement
    //you need to make sure that the area where you're going to move your mouse
    //so we need to scroll to the area where the slider is
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    //PW creates coordinates around the box with x and y
    const box = await tempBox.boundingBox()
    //we can now access the coordinates of the box
    //for this UI page-example
    //we can define the centre of our bounding box and use it as starting point
    //it is in the centre of the box
    //we can use the box coordinates to calculate the centre of the box
    const x = box.x + (box.width / 2)
    const y = box.y + (box.height / 2)
    //start moving the mouse from the centre of the box
    //so the first action, I am putting my mouse cursor to the location where I want to start from
    //second I want to click the mouse button to begin movement
    //third I want to move the mouse to the new location
    //fourth I want to release the mouse button
    await page.mouse.move(x, y)
    //this simulates the mouse click left button on above coordinates
    await page.mouse.down()
    //we want to move the mouse to the right and we update the desired coordinates
    //y will stay the same
    //because ıt is a horizontal slider
    //x will be updated
    //we can move the mouse to the right by adding 100 pixels to the x coordinate
    //this will move the mouse to the right
    await page.mouse.move(x + 100, y)
    //next step we want to move the mouse down
    await page.mouse.move(x + 100, y + 100)
    //after we completed the movement
    //we want to release the mouse button
    await page.mouse.up()
    //assertion
    await expect(tempBox).toContainText('30')
})

