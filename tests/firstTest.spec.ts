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