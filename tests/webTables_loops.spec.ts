import { test, expect } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})
//filter page by ages and assert the result
test('Web Tables Loops', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //we will use these ages to filter the table
    const ages = ["20", "30", "40", "200"]

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        // Values from the array will be entered into the Age filter field one by one.
        // As a result, users with that specific age will be displayed as rows in the table.
        // The locator below captures the rows returned after filtering.
        const ageRows = page.locator('tbody tr')
        // Let's check how many rows were returned:
        const rowCount = await ageRows.count()
        console.log('Row count:', rowCount)
        // The .all() method means: "Give me all the actual elements matching this locator as a list."
        for (let row of await ageRows.all()) {
            // For each row, we get the value in the age cell, which is the last <td> in the row.
            const cellValue = await row.locator('td').last().textContent()
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain(' No data found ')
            } else {
                expect(cellValue).toEqual(age)
            }

        }
    }
})
/*
  Tabii! İşte test dosyana ekleyebileceğin şekilde, Playwright terminolojisine uygun ve net açıklamalı İngilizce versiyonu:

// ⚠️ A locator itself is not iterable in a for...of loop
//    You can't directly loop through a locator like:
//    for (let row of rows) { ... }
//    because `rows` is just a locator reference, not a list of elements

// ✅ To get actual DOM elements as an array, use `.all()`
//    This will resolve the locator and return all matched elements,
//    which allows us to use them in a for...of loop
//    Example:
const ageRows = page.locator('tbody tr');
for (let row of await ageRows.all()) {
    // Now `row` is a real element handle, and we can interact with it
    const cellValue = await row.locator('td').last().textContent();
    // do assertions, etc.
}

// 💡 Remember:
//    locator.all() → gets the actual array of DOM elements
//    for...of → used to loop through that array

İstersen aynı yapıyı başka testlerde de kullanabileceğin şekilde snippet olarak da kaydedebiliriz. Yardımcı olayım mı?
*/