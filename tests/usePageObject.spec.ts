import {test} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

// "../" means moving one level up in the folder structure
//we use export keyword to make the class visible to other files inside the framework

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({page}) => {
    //we need to create an instance of the page object class
    const navigateTo = new NavigationPage(page)
    //we can use the method we created in the page object class
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
    

})