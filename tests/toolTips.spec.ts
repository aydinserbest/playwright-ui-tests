import {test, expect} from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    
})
/*
tooltip is a very tricky element to locate
it is a dynamic element that shows up and hides in the DOM
it disappears from the page when you move the mouse away from the element, 
when you try to inspect this element you can not see it in the DOM
it is not always visible in the DOM
it is not always easy to locate the tooltip
it is not always easy to identify the right locator
in order to locate the tooltip,sometimes it is challenging to identify the right locator,
because it is not always visible in the DOM.

here is the trick:
you go to the source tab in the browser (with right click + inspect)

you can use a combination of command + backslash to to freeze the browser
in order to find out tooltip which is dynamically shows up and hiding in the dom
with command + backslash you can freeze the browser, it is in debug mode
then click again elements tab

in order to simulate the hover over the button to trigger the tooltipt to show up
we use the method hover in the PW

if the tooltip role is available in the DOM, we can use the getByRole locator
if not, we can use the locator by other locating types
in our example, the tooltip is not assigned a role in the DOM
so we use the locator by other locating types
the tooltip is not assigned a role in the DOM
*/

test('Tooltips', async ({ page }) => {
    await page.getByRole('link', {name: 'Modal & Overlays'}).click()
    await page.getByRole('link', {name: 'Tooltip'}).click()

    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name: 'Top'}).hover()

    page.getByRole('tooltip') //we can use this, if the element has a role of tooltip in the DOM
    //your element should have a role of tooltip in the DOM
    //otherwise, we locate the element by other locating types
    //in our example this role is not assigned to the web element

    //generic assertion
    const toolTip = await page.locator('nb-tooltip').textContent()
    expect(toolTip).toEqual('This is a tooltip')

    //locator assertion
    await expect(page.locator('nb-tooltip')).toHaveText('This is a tooltip')



})