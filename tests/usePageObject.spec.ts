import {test} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})
test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await pm.onFormLayoutsPage().sumbitInlineFormWithNameEmailAndCheckbox('john doe', 'john@test.com', true)
    await pm.navigateTo().datepickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(10, 20)
})
//now, it's kind of a human language scenario, which is easy to read and understand

// navigateTo().datepickerPage()
// onDatePickerPage().selectCommonDatePickerFromToday(10)

/*
we initialized all the page objects in the constructor of the PageManager class
so, here, in test, when we created an instance of the PageManager class, 
we can use all the page objects-as initialized and ready to use
const pm = new PageManager(page)

with pm.  we can access all the page objects
and their methods

pm.navigateTo(). --> it equals with:  const navigateTo = new NavigationPage(page)

previous, we were creating instances of the page objects in the test file:
const navigateTo = new NavigationPage(page)
then we were using it like this:
navigateTo.formLayoutsPage()

now, we create only one instance of the PageManager class

pm.navigateTo().
this is the same as:
const navigateTo = new NavigationPage(page)

pm.onFormLayoutsPage()
this is the same as:
const formLayoutsPage = new FormLayoutsPage(page)

pm.onDatePickerPage()
this is the same as:
const datePickerPage = new DatePickerPage(page)

after creating page object, with instance of the page object, we can use its methods
for example:
navigateTo.formLayoutsPage()

now , instead of instance of the page object,
we use pm.navigateTo().formLayoutsPage()

*/
