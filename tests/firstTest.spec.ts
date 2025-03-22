import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
    
    const text = await basicFormButton.textContent()
    //keyword await, you have to use every time when we worked 
    //with the Promises types of methods
    //textContent method is waiting basicFormButton to be available
    expect(text).toContain('Submit')
    await expect(basicFormButton).toHaveText('Submit')
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})
