import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/')
})

test('Update pet type', async ({ page }) => {
    await page.getByText(' Pet Types').click()
    await expect(page.locator('h2')).toHaveText('Pet Types')

    const catPetType = page.locator('tr:has(input[id="0"])');
    await catPetType.getByText('Edit').click()

    await expect(page.locator('h2')).toHaveText('Edit Pet Type')

    const petName = page.locator('#name')
    await petName.clear()
    await petName.fill('rabbit')
    //await page.getByText('Update').click()
    await page.getByRole('button', { name: 'Update' }).click()

    const firstPet = page.locator('input[name="pettype_name"]').first()
    const firstPetValue = await firstPet.inputValue()
    console.log(firstPetValue)
    
    
     expect(firstPetValue).toEqual('rabbit')

    await catPetType.getByText('Edit').click()
    await petName.clear()
    await petName.fill('cat')
    await page.getByText('Update').click()

     expect(firstPetValue).toEqual('cat')

});