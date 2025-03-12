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

test('user facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'Sign in'}).first().click()

    await page.getByPlaceholder('Jane Doe').click()
    await page.getByLabel('Email').first().click()

    await page.getByText('Using the Grid').click()
    await page.getByTitle('IoT Dashboard').click()
    //or
    //await page.getByRole('link', { name : 'IoT Dashboard'}).click()
    //await page.getByTestId('')
})
test('test locating child elements', async ({ page }) => {
    //to go to from parent to child, use space between locators
    await page.locator('nb-card nb-radio :text("Option 1")').click()
    //other way:chaining locators with `locator` method, one by one
    await page.locator('nb-card nb-radio').locator(':text("Option 2")').click()
    //or combine regular locators method and facing locators method
    await page.locator('nb-card').getByRole('button', { name : 'Sign in'}).first().click()
    //or using index of the element (try to avoid this)
    await page.locator('nb-card').nth(3).getByRole('button').click() 
    //inside nth(3) element, there is only one button element, so no need to specify the name
    //and also try to avoid using first() or last() methods

})
test('locating the parent elements', async ({ page }) => {
    //1- Locate the parent 'nb-card' by matching its text content using {hasText: ...}, then find the 'Email' input inside it
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', { name : 'Email'}).click()

    //2- Locate the parent 'nb-card' that contains a specific child element with ID 'inputEmail1' using {has: page.locator(...)}, 
    // then find 'Email' input
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', { name : 'Email'}).click()

    //3- Locate the parent 'nb-card' using filter() with text-based filtering (Basic form), then find 'Email' input inside it
    await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', { name : 'Email'}).click()

    //4- Locate the parent 'nb-card' that contains a child element with class '.status-danger' using filter() with {has: page.locator(...)}, 
    // then find 'Email' input
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', { name : 'Email'}).click()

    //5- Locate the parent 'nb-card' that contains an 'nb-checkbox' element using filter({has: ...}) 
    //   and also has specific text 'Sign in' using filter({hasText: ...})
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).click()

    //6- XPath: Locate the text 'Using the Grid' and move up to its parent element using '..', then find 'Email' input inside it
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name : 'Email'}).click()

})