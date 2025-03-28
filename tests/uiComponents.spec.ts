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
    //and assign it to the radioStatus variable, so it is a value, a boolean value
    //and like text inside expect (), we do not need to use await keyword
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
/*
how to automate the checkboxes, how to interact with the checkboxes
PW has a special method to slect and unselect the checkbox
we will learn how to select all checkboxes and how to unselect all checkboxes
as wel as how to perform assertionof this checkbox selection
*/
test('checkboxes', async ({page}) => {
    //navigation to the checkbox page
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    //our checkbox is visually-hidde, so we need to use force: true
    await page.getByLabel('Hide on click').click({force: true})
    //other way to select the checkbox is check and uncheck methods
    //difference between click and check/uncheck methods
    //check method will select the checkbox, if it already selected, it will not unselect it
    //uncheck method will unselect the checkbox, if it already unselected, it will not select it:

    //await page.getByLabel('Hide on click').click({force: true})
   // await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})

   // and another difference, clcik() method just performs click the checkbox, 
   // but check() method does not validate the status of checkbox, 
   // it means check() method  will  check if the checkbox is already selected or not
   //and it will not unselect the checkbox if it is already selected
   //and uncheck() method will also check if the checkbox is already unselected or not
    //and it will not select the checkbox if it is already unselected
   //so to use check or uncheck is beter than click method
   
   await page.getByLabel('Prevent arising of duplicate toast').check({force: true})

   await page.getByLabel('Show toast with icon').uncheck({force: true})

   //other scenario is to select all checkboxes
    //and unselect all checkboxes

    /*
    first we need the locator of all checkboxes-a list of checkboxes
    and then we need to iterate through the list of checkboxes
    and check or uncheck each checkbox
    */
   const allBoxes = page.getByRole('checkbox')
   //but we also need to convert the locator to an array
   //for that we use . all() method

   for(const box of await allBoxes.all()){
    //to select all checkboxes
    await box.check({force: true})
    //let's make a validation that all checkboxes are selected
    //it's similar to the radio button validation above
    //with generic assertions
    expect(await box.isChecked()).toBeTruthy()
    //.isChecked() method will return true if the checkbox is selected, and this is value,so we do not need to use await keyword
   }
    //to unselect all checkboxes
    for(const box of await allBoxes.all()){
        await box.uncheck({force: true})
        //let's make a validation that all checkboxes are unselected
        expect(await box.isChecked()).toBeFalsy()
        //if we expect the result, FALSE, we use toBeFalsy() method
        //if we expect the result, TRUE, we use toBeTruthy() method
        //and this is value,so we do not need to use await keyword
    }
   

})

