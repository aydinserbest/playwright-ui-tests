import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})
test('repeating locators', async ({ page }) => {
    //inside unique parent with basic form, we find email and password textboxes and fill them, 
    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).fill('test@test.com')
    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Password' }).fill('Welcome123')
    //inside unique parent with basic form, we find submit button and click it
    //it is also unique, so we do not use name: 'SUBMIT' here
    //await page.locator('nb-card').filter({hasText : 'Basic form'}).getByRole('button', { name: 'SUBMIT'}).click()
    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('button').click()

    //above, there are duplications and repeated code, so we can use reusable locators
    //we can extract them to a constant and use them (IN THE NEXT TEST)

})
test('reusing the locators with reusable locators', async ({ page }) => {
    //we reformat our code,assign the locator to a constant and use this constant to call child elements
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })

    await basicForm.getByRole('textbox', { name: 'Email' }).fill('test@test.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
    await basicForm.getByRole("button").click()
})
//if you want, you can make another level of abstraction by creating a new constant, using the existing constants
//a new constant for email input field
test('new abstraction layer', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' })
    const passwordInput = basicForm.getByRole('textbox', { name: 'Password' })
    const submitButton = basicForm.getByRole('button')

    await emailInput.fill('test@test.com')
    await passwordInput.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await submitButton.click()

    await expect(emailInput).toHaveValue('test@test.com')
})
//if you want to reduce duplication of your code,
//you can always reuse your locatorsassigning them to the constants