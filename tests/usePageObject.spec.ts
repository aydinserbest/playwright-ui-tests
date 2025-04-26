import {test} from '@playwright/test'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { NavigationPage } from '../page-objects/navigationPage'


test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('parametrized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)

    //simply call the page objects
    await navigateTo.formLayoutsPage()
    // we need to provide tree parameters to the method
    await onFormLayoutsPage.submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1')
    //if we want to run a second test,but with different credentials 
    //all we just have to do is call exactly the same method but use a different  arguements inside of the method
    //for ex. change Option 1 to Option 2
    await onFormLayoutsPage.submitUsingTheGrigdFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
    //we call the other method in formLayoutsPage
    await onFormLayoutsPage.sumbitInlineFormWithNameEmailAndCheckbox('john doe', 'john@test.com', true) 
})
/*
this is how you can use reuse methods inside of page objects
just providing different arguements you can use these methods in different test scenarios
so you technically use the same code implementation but just with different test data
that needed for your test execution
when you hover over the method name, it will show you the parameters that you need to provide
and the types of the parameters
it will give you a hint which arguements this method is expecting,
and 
you can go to the page object which method is implemented
over the method, when you write /** */ 
//it produce information with this style:
//  * @param name
//and when you go and hover the methods,
    //you can see these descriptions