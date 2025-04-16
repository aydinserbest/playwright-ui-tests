import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})
test('date picker', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    await page.getByPlaceholder('Form Picker').click()

    //getByText() find partial match
    //to prevent strict mode (more than 1 match) use getByText({exact: true})
    await page.locator('[class = "day-cell ng-star-inserted"]').getByText('1', { exact: true }).click()

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue('Apr 1, 2025')

    //here we use hard-coded with getByText('1')
    //to use dynamic value we can use javascript date object,
    //dynamic value which depends on the current date,
    //we do not go and update it manually everytime,
    //and you do that some how automatically
})
test('automatically update date with date JS object', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    await page.getByPlaceholder('Form Picker').click()


    let date = new Date()
    date.setDate(date.getDate() + 1)

    //normally .getDate() method will returns the day of the month

    //getDate() returns the day of the month (1-31) for the specified date according to local time.
    //since it is a number, we need to convert it to string
    //and we use this variable in getByText()
    //to get the current date and add 1 to it
    const expectedDate = date.getDate().toString()

    console.log(expectedDate) // it will print the current date + 1

    //not to use hard code in assert toHaveValue() we can pull out the date from date object above
    //and use it in the assert

    //on webpage, the month is being shown in short format
    //not July, jul -as an example
    //so we use short format
    // Normally toLocaleString() returns full date & time,
    // but with { month: 'short' } we only get the short month name like "Apr"
    const expectedMonthShort = date.toLocaleString('En-US', { month: 'short' })
    console.log(expectedMonthShort) // it will print the current month in short format
    const expectedYear = date.getFullYear()
    const expectedDateValue = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    console.log(expectedDateValue) // it will print the current date + 1
    await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(expectedDateValue)

})
//we located the date on the page for current month here:
//await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
//on html, this value selects cuurrent month:
//class = "day-cell ng-star-inserted
//and if we change the code for 14 days later -as an example
//the code will fail, because it will return may not april
// //and the date will be 14 days later, 
//in example, current month april and +14 makes it may
//the below test we will fix this:

test('fix return month', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
    await page.getByPlaceholder('Form Picker').click()

    // 'let' is used here because the 'date' object will be modified later (we will update the date)
    // we're changing the date to tomorrow, so this variable must remain mutable
    let date = new Date()
    date.setDate(date.getDate() + 400)

    // 'const' is used because 'expectedDate' will not change — it's just a final value we use for assertions
    const expectedDate = date.getDate().toString()
    // Normally toLocaleString() returns full date & time,
    // but with { month: 'short' } we only get the short month name like "Apr"
    const expectedMonthShort = date.toLocaleString('default', { month: 'short' })
    const expectedMonthLong = date.toLocaleString('default', { month: 'long' })
    //getFullYear() returns the year of the specified date according to local time.
    const expectedYear = date.getFullYear()
    //will return ful date like this format: Apr 17, 2025
    const expectedDateValue = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

    while (!calenderMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calenderMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class = "day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()

    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(expectedDateValue)

})

