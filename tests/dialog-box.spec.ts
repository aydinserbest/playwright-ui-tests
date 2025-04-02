import {test, expect} from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})

/*
1-web dialog box (regular dialog box)
if the dialog box is just the part of web application,then automation is the same way as normal web element
you just make right click, inspect, and find the locator for the web element

2-browser dialog box
but if the dialog box is the part of the browser, the automation of this type of dialog box is different
it does not belong the web page, it belongs to the browser, we can not use inspect
that is the browser message

there are 2 types of dialog boxes:
1-web dialog box
it is part of the DOM
2-browser dialog box

*/

test('Dialog Box', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    // 'table' is keyword for table role

    //in order to accept the dialog box,
    //we need to create a listener
    page.on('dialog', async dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()  //then PW accept the dialog box
    })
    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    //after deleted the first row, we need to check if the row is deleted
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})