import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})
//PW has a built-in waiting mechanism that automatically waits for elements to be ready
//..before performing actions on them.
//This feature is called auto-waiting.
//but they are limited to certain methods, such as click() and textContent().
//..and not all methods have auto-waiting implemented.
//..so we need to add explicit waits for those methods that do not have auto-waiting implemented.
test("PW Methods which Auto Waits and which does not wait ", async ({ page }) => {

    //auto-waits:
    //class value'sunu locate ederken, . -dot kullanıyoruz
    const successButton = page.locator('.bg-success')
    //example-1
    //await successButton.click() → Playwright automatically waits up to 30 seconds for the element to be ready, 
    //so no extra wait is needed.
    
    //example-2
    //const text = await successButton.textContent()//→ This method also waits for the button to be available before retrieving the text.

    
    //example-3
    //but if we use allTextContents() method, it doesn't wait for the element to be available
    //→ Unlike the others, `allTextContents()` does not wait for the text to appear. 
    //To avoid issues, we need to explicitly wait for the element before calling it,
    //if we did not add a wait before allTextContents(), it would throw an error.
    await successButton.waitFor({ state: 'attached' }) //you can add additional wait for a specific state
    //we want to grab the text from this element:
    const text = await successButton.allTextContents() 
    expect(text).toContain('Data loaded with AJAX get request.')
})

test("Locator assertions default time-out", async ({ page }) => {
    const successButton = page.locator('.bg-success')
    //Default time-out for the locator assertion is 5 seconds
    //so this assertion fails with message: Error: Timed out 5000ms waiting for
    //await expect(successButton).toHaveText('Data loaded with AJAX get request.')
    
    //but we can override the time-out for this method
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})
test('timeouts' , async ({ page }) => {
    const successButton = page.locator('.bg-success')
    await successButton.click({})
    //we know the successButton element will be available after 15 seconds
    //so we set the timeout to 16 seconds
    //according to the default configuration,if you run this test,
    //it should pass because the default timeout is 30 seconds
    //and we know that (checked manually) clicking the button takes 15 seconds for the button to shows up
})


