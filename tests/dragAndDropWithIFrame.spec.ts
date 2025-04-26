import { test, expect } from '@playwright/test';
/*
    An iframe is a kind of embedded page inside of the current web page.
    you can not just locate the element inside the iframe to navigate to it
    firrst you need to switch to iframe and then locate the web element

    a website inside of a website,
    every html website has only a single body and
    every html web page begins with just a single html but
    with iframe, we have a second html,
    so this is a kind of page inside of a page
    and so PW can not find the web element , because it is inside of the iframe
    it is not visible
    so in order to get access that area and to find the web element
    we need to switch to the iframe
    and then within the iframe we can find the web element
    
	
*/
test('drag and drop with iframe', async ({ page }) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    await page.getByRole('button', { name: 'Consent' }).click();
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')

    // first approach 
    await frame.locator('li', { hasText: "High Tatras 2"}).dragTo(frame.locator('#trash')) // drag and drop

    //second approach (more preciese control)
    await frame.locator('li', { hasText: "High Tatras 4"}).hover()
    await page.mouse.down()
    await frame.locator('#trash').hover()
    await page.mouse.up()

    // assert that inside of the area that we dragged and dropped the element,
    //the 2 elements are present
    //first we locate the 2 elements 
    //and then we assert that the text of the 2 elements are present (as array, because we drag and drop 2 elements)
    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 4'])
})
/*
note:
// There is no special command to exit from an iframe!
// After working inside the iframe, you simply use page.locator to interact with the main page again.
// We don't really "exit" the iframe.
// We just switch from frameLocator back to page.
// You just need to be careful about which "page" you are using: frame or page?
*/
