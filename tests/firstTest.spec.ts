import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('extracting values', async ({ page}) => {
    //single tekst value
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //get all values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input values
    //all texts you see on the page is not actually a text
    //some of them are properties or just hidden values that are located in the properties

    //if you want to grab a value from the web page which is not a text, is an input value
    //you need to use the method inputValue()
    //and it will return a text that is inside of this inputValue

    const emailField =  basicForm.getByRole('textbox', { name: 'Email' })
    await emailField.fill('test@test.com')
    const emailFieldValue = await emailField.inputValue()
    expect(emailFieldValue).toEqual('test@test.com')

    const placeHolderValue = await emailField.getAttribute('placeholder')
    expect(placeHolderValue).toEqual('Email')
})
test('assertions', async ({ page }) => {
    //General assertions
    //we just provide the VALUE that we want to assert
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
    const value = 5
    expect(value).toEqual(5)

    const text = await basicForm.textContent()
    expect(text).toContain('Submit')
    //toContain is a general assertion
    //WILL NOT WAIT any condition, simply perform tthe assertion

    //Locator assertions
    //before locator assertions, we provide await keyword before expect

    await expect(basicForm).toHaveText('Submit')
    //toHaveText is a Locator assertion
    //they can interact with the web elements
    /*
    toHaveText method will search for the test inside of webelement (basicForm)
    and when he find the expected text, it will make an assertion and return true
    locator assertions have their own time-out
    this type of assertion will wait up to 5 sec for the element to be available
    WHILE THE GENERAL ASSERTİONS will not wait,
    LOCATOR ASSERTIONS WILL WAIT
    */
   //soft assertion
   //not a good practice to use 
   await expect.soft(basicForm).toHaveText('Submit')
    //soft assertion will not fail the test if the assertion is not true
    //if the assertion above fails, the test will continue to run
    //the button will be clicked despite the assertion is not true
    await basicForm.click()
})