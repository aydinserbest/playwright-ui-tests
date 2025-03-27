import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})
test.describe('Form Layouts', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('input fields', async ({page}) => {
    const usingTheEmailGridInput = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
    await usingTheEmailGridInput.fill('test@test.com')
    await usingTheEmailGridInput.clear()
    await usingTheEmailGridInput.pressSequentially('test2@test.com', {delay: 100})
    //generic assertions
    const inputValue = await usingTheEmailGridInput.inputValue()
    //inputValue method will extract the value of the input field / from the locator
    //and assign it to the inputValue variable
    expect(inputValue).toEqual('test2@test.com')

    //locators assertions
    //you provide the locator to the expect method and use the method toHaveValue
    await expect(usingTheEmailGridInput).toHaveValue('test2@test.com')
})
test('radio buttons', async ({page}) => {
    //locate with the parent locator
    const parentUsingTheGridForm = page.locator('nb-card', {hasText: 'Using the Grid'})

    //get the radio button by label
    await parentUsingTheGridForm.getByLabel('Option 1').check({force: true})
     //validet the staus of radio button if it is checked
    //1-with generic assertions
    const radioStatus = await parentUsingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()
    //isChecked method will extract the status of the radio button, if it is checked or not
    //and if it is checked, it will return a true value, otherwise false
    //and assign it to the radioStatus variable
    expect(radioStatus).toBeTruthy()
    //get the radio button by role
    await parentUsingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})

    //2- withlocator type of assertion
    await expect(parentUsingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked()

    //in this validation, we are using generic assertion, but we did not assign the isChecked() method to a variable
    //we are using it directly in the expect method
    expect(await parentUsingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
    //go on generic assertion with same way, but this time toBeTruthy() method is used
    expect(await parentUsingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
})
})
