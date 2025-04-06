import {test, expect} from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})
/*
the recommended way to get the desired row in the table is to use -row- role type,
with page.getByRole('row'} , we locate the rows, the rows with cels inside it
you can think this row, as a parent of the cells
we can go from this row locate to the cells inside it
so, by using name: '...' text in html, we can get a unique row
a row which we desired to interact with

but, it has two limitations:
1- the text should be an HTML text, not a property value
2- the text should be unique in the row, if it matches more than 1 row, it will not work

*/

test('Web Tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1- get the row by any tests in  this row
    //we will use unique identifier --> email
    //the recommended way to get the desired row in the table is to use -row- role type,
    //and then provide the text which is unique in the row
    const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
    //now we can perform any operation withim the row
   
    await targetRow.locator('.nb-edit').click()

     /*
    but after clicking operation button, we can not re-use getByrOLE LOCATOR ANYMORE BECAUSE
    the text is not there as an html text, it is a property value
    // This command works based on visible text.  
// However, "twitter@outlook.com" is no longer visible text — it's now just a value inside an <input> element.
// "twitter@outlook.com" is now an input value, not visible text — so getByRole won't work anymore.

    inside of input field the text you see not the html text, this is a property value
    // so this locator will not work -->page.getByRole('row', {name: 'twitter@outlook.com'})
    because getByRole and name referring to the html text, reflected in the role
    if the text is not the html text, we can not use getByRole
    if the text on the page that wee see is a property value, we can not use getByRole
    */
   await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('28')
    await page.locator('.nb-checkmark').click()

    //2- get the row based on the value in the specific column
    //we click second page
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    //getByRole('.....', {name: '.....'}) locator should match with only one row, otherwise it gives strict mode error
    //to bypass it, we use  .filter{}
    //the locator below is not working because, we have 2 rows in the html with the same text (11)
    //this locator matches with 2 rows, it returns us with 2 rows in the table
    //const targetRowByID = page.getByRole('row', {name: '11'})
   /*
    
    .filter.{has:page.locator('td') //this filter returns us all colums for each ow those rows
    //then we want to take only 1th column for the two rows
    .nth(1).getByText('11')}//and then that result we  find only text 11 as part of the first column
    */
   const targetRowByID = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('pwrgt@gmail.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText('pwrgt@gmail.com')
})