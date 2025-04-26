import {test} from '@playwright/test'
import { NavigationPagePW } from '../page-objects/navigationPage-recommended-by-PW'
import { NavigationPage } from '../page-objects/navigationPage'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page with locator structure of PW recommendation', async ({page}) => {
    const navigateTo = new NavigationPagePW(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})
test('navigate to form page with locator structure of other way', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})