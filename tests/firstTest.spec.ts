import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('Locator syntax rules', async ({ page }) => {
    //by Tagname
    page.locator('input')
    /*
    1-`page.locator('input')` only finds the element but does nothing. 
    You need to call an action method like `click()`, `fill()`, or `type()` to interact with it.


    2- `click()` is a Promise, meaning it takes time to complete.
    Using `await` ensures the action finishes before moving to the next step.
    */

    //by ID
    await page.locator('#inputEmail1').click()

    //by Class value
    page.locator('.shape-rectangle') //valu starts here with a dot

    //by full Class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')


    //by Attribute
    page.locator('[placeholder="Password"]') //value starts here with a square bracket

    //combine different selectors
    //for ex. by tag and by attribute
    page.locator('input[placeholder="Password"]')
    //or by tag and by attribute and by class
    page.locator('input[placeholder="Password"].shape-rectangle')
    //or, by tag and by attribute and by attribute
    page.locator('input[placeholder="Password"][nbinput]')
    //by Xpath (not recommended)
    page.locator('//input[@placeholder="Password"]')
    //or
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')
    //by exact text match
    page.locator(':text-is("Using the Grid")')

})