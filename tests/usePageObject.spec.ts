import {test} from '@playwright/test'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { NavigationPage } from '../page-objects/navigationPage'
import { DatePickerPage } from '../page-objects/datePickerPage'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('parametrized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    await onFormLayoutsPage.sumbitInlineFormWithNameEmailAndCheckbox('john doe', 'john@test.com', true)
    await navigateTo.datepickerPage()
    await onDatePickerPage.selectCommonDatePickerFromToday(10)
    await onDatePickerPage.selectDatePickerWithRangeFromToday(10, 20)
})
