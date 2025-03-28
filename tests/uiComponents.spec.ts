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
})
