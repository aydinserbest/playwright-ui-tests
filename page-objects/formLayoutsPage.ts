import { Page } from '@playwright/test';

export class FormLayoutsPage {
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    //describing what the methods does
    //don't be afraid giving the good descriptive  names to your methods
    //understand what this methods are for and what they are doing

    //and we just call this method from the test and use it
    async submitUsingTheGrigdFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click() //suign in button doesn't have a function on the page, it doesn't work
    }

    //over the method when you write /** */
    //it will produce information with this style, and you can add extra information
    // near parameters 
    //and when you go to the test and hover the methods,
    //you can see these descriptions
    //this is a handy approach and if you keep your page object
    //with good descriptive names
    //and with annotations what those method is doing,
    //it will be easy to navigate across the framework

    /**
     * This method fill out the Inline form with user details
     * @param name - should be first and last name
     * @param email - valid email for the test user
     * @param rememberMe - true or false if user session to be safed
     */
    async sumbitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
        if (rememberMe) //it means it is true
            await inlineForm.getByRole('checkbox').check({ force: true })//our checkbox is visually-hidde, so we need to use force: true
        await inlineForm.getByRole('button').click() //we do not need {name:...} because the button is inside parent and is only one button
    }
}
/*
visually-hidden, html:
<input _ngcontent-vvk-c155="" type="checkbox" class="native-input visually-hidden">
*/

/*
// 1- When you use check() on a checkbox:
// • If the checkbox is already selected, it does nothing.
// • If the checkbox is not selected, it selects it.
// • It never unselects a checkbox (it doesn't perform uncheck).

// 2- When you use click() on a checkbox:
// • It acts based on the current state.
// • If the checkbox is selected, click() will unselect it.
// • If the checkbox is not selected, click() will select it.

// 3- In this test (with rememberMe boolean), we want to control the action:
// 👉 "User can either select or not select the checkbox."
// So, a boolean is used to make it optional.
if we use parameter rememberMe as true, it will check the checkbox
if we use parameter rememberMe as false, it will not check the checkbox
but insidede the methot, it clicks submit button, it is not related to the checkbox
*/