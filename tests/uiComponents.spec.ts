import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})
/*
how to automate list and dropdowns types of the web elements
how to select element from the list
and how to loop through the list of web elements
performing different operations:

when you interact with the listenerCount, the recommended aproach would be
to use:
    getByRole('list')   when the list has a UL tag
    getByRole('listitem') when the list has a LI tag


when you validate the list content single assertion, you can use:
    toHaveText('') locator assetion and providing the array as  your assertion value
    to select the items from the list, the best approach is to use a filter and providing the text of the listitem
    that you want to select:
       .filter({ hasText: 'text' }).click()
    and if you want to loop for your list,using JS for in loops is the best approach or for of loop
*/
test('lists and dropdowns', async ({ page }) => {
    //locate from parent to child, there isa space between the parent and child
    const dropdownMenu = page.locator('ngx-header nb-select')
    //click on the dropdown menu to open it
    await dropdownMenu.click()
    //how to select items from the list
    //the recommended ways in the PW  to interact with the list is to use the getByRole

    page.getByRole('list')   //when the list has a UL tag  represent parent
    //and the list items are the children of the parent
    page.getByRole('listitem') //when the list has a LI tag   and the list items are the children of the parent
    //get all list items from the list
    //and represent the list items as an array

    //in our webexample, we do not have LI tag, we have a UL tag
    //so we will use it
    //1. approach
    //, parent to child
   // const optionList = page.getByRole('list').locator('nb-option')
    //so we found ,first, the list, and then, we found the list items
    //2. approach
    //actually the same thing, just, locator is different
    //again from parent to child
    const optionList = page.locator('nb-option-list nb-option')

    //let's make an assertion that our list has all the list items in the list
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await optionList.filter({ hasText: 'Cosmic'}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        Light: 'rgb(255, 255, 255)',
        Dark: 'rgb(34, 43, 69)',
        Cosmic: 'rgb(50, 50, 89)',
        Corporate: 'rgb(255, 255, 255)'
    }
    await dropdownMenu.click()
    //loop through the list of items
    for(const color in colors){
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color !== 'Corporate') {
            await dropdownMenu.click()
        }
    }
    // What does Playwright do in this line?
// 1. Finds the header element.
// 2. Looks at the actual CSS rendered in the DOM.
//    (It can be inline style or from an external file — doesn't matter.)
// 3. Gets the value of the 'background-color' property.
// 4. Compares it with the expected value from colors[color].
// 5. If it matches → pass ✅, if not → fail ❌.

// 'background-color' is the CSS property we want to check.
// colors[color] gives us the expected value for that theme.

// For example, if color === 'Dark':
// colors['Dark'] → 'rgb(34, 43, 69)'

//In the code, we write:
//colors[color]
//This represents the key (for example: "Cosmic").

//But when the code runs, JavaScript does this behind the scenes:
//colors["Cosmic"]  // and this gives us the value:
//→ 'rgb(50, 50, 89)'

//✅ We write the key,
//✅ But when the code runs, we get the value.

//✨ One-line summary:
//👉 The expression colors[color] gives us the value of the key.




})