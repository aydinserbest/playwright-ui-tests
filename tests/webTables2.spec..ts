import { test, expect } from '@playwright/test'
test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')

})
test('web tables', async ({ page }) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    // We use getByRole to select a table row.
    // getByRole('row') gets the entire row element.
    // In our example, the target row has 7 <td> (cell) elements, each containing visible text.
    // We can use any of the cell texts inside the <td> tags for the `name` property in getByRole.
    // For example: page.getByRole('row', { name: 'twitter@outlook.com' }) 
    // means we’re selecting the entire row that contains the cell with that value.
    // This locator becomes our parent row locator — `targetrow` — so we can access its child cells via dot notation.

    const targetrow = page.getByRole('row', { name: 'twitter@outlook.com' })
    //From our parent row locator, we locate the Edit button by its class and click it.
    await targetrow.locator('.nb-edit').click()
    // After clicking Edit, we want to change, for example, the content of the email cell.
    // But we can no longer use our previous parent row locator with dot notation,
    // because the text values we used to locate the row are no longer visible text.
    // They are now turned into input values (attributes), not visible text.
    // That’s why `targetrow.locator(...)` will no longer work.
    // We need to switch to a different locator strategy:

    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('22')
    await page.locator('.nb-checkmark').click()
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    /*
    Above, we used page.getByRole('row', { name: '11' }) to select the entire row,
    using "11" as the text value.
    This means we are selecting the row that contains visible text "11" — in this case, the ID cell.
    We could’ve used any other unique cell text in that row as well — as long as it’s visible text.
    The key is: it must be **unique** and still rendered as text (not as input value).
    For example, page.getByRole('row', { name: '11' }) and page.getByRole('row', { name: 'mdo@gmail.com' })
    would both refer to the same row — before clicking the edit icon.
    However, when using page.getByRole('row', { name: '11' }) directly, it may return multiple rows,
    and in strict mode that will cause an error.
    So we chain `.filter()` to narrow it down to the exact row we want.
    */
    const targetRowById = page.getByRole('row', { name: '11' }).filter({ has: page.locator('td').nth(1).getByText('11') })
    targetRowById.locator('.nb-edit').click()
    // after clicking, the variable assigned using the getByRole locator becomes invalid
    // because {name: ...} now refers to a property value, not visible text
    // so we need to locate the element again using standard locating methods
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('pwrgt@gmail.com')
    await page.locator('.nb-checkmark').click()
    // after clicking, the cell values return to being visible text in the HTML
    // so we can now use toHaveText for assertion
    await expect(targetRowById.locator('td').nth(5)).toHaveText('pwrgt@gmail.com')




})
/*
Absolutely! Here is the exact same explanation, fully translated into English, preserving every heading, structure, comment style, and code block as requested:

⸻

💡 1. Why does getByRole('row', {name: '11'}) return two matches, and why is filter({ has: ... }) used?

In your example:

const targetRowById = page.getByRole('row', { name: '11' }).filter({
  has: page.locator('td').nth(1).getByText('11'),
})

🔍 What’s going on here?
    •	getByRole('row', { name: '11' }) ⇒ This line fetches all <tr> (row) elements in the DOM that contain the text “11”.
But here’s the problem:
👉 “11” exists in the ID cell
👉 and also in the Age cell

So Playwright finds two matching rows, and since strict mode is active, it throws an error (because only one match is expected).

⸻

🎯 So what does filter({ has: ... }) do?

.filter({
  has: page.locator('td').nth(1).getByText('11')
})

This line says:
“Yes, you found two rows that contain ‘11’. But I only want the one where the second cell (nth(1)) has exactly the text ‘11’.”

So by filtering, we precisely target the row where the ID cell contains “11”.
This gives us a 100% deterministic locator. ✅ It will never fail in a pull request.

⸻

✅ 2. So is getByText('11') necessary? Isn’t nth(1) alone enough?

Answer: Yes, it’s necessary.

🔍 page.locator('td').nth(1) only points to the second cell, but it doesn’t check what’s inside.

But if you say .getByText('11'), then you’re saying:
“Only include rows where the second cell contains exactly ‘11’.”

So this way, you’re filtering not just by position, but also by content —
ensuring a precise and error-free selection.

⸻

🧠 Summary:
    •	getByRole('row', { name: '11' }) → finds all rows containing “11”.
    •	.filter({ has: page.locator('td').nth(1).getByText('11') }) → filters down to the row where the ID cell has “11”.
    •	This eliminates the other row where “11” is in the Age cell.

⸻

🎯 Conclusion:

This approach is the most accurate and robust way.
Using only .nth(1) is not sufficient, because it doesn’t verify the content.
But when used together with .getByText('11'), you check both position and content, which makes it rock-solid.

⸻

Let me know if you want this turned into inline // comments directly in your test!
*/