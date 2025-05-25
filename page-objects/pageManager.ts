import { expect, Page } from '@playwright/test';
/*
up to now, we were importing page objects in the test file and creating instances of them
in the test file as well. 
This is not a good practice, because it makes the test file too big and hard to read.
So, we will create a new class called PageManager, which will be responsible for creating instances of the page objects.

*/
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { NavigationPage } from '../page-objects/navigationPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

export class PageManager {
    //as usual, we create a field for the Page fixture
    private readonly page: Page
    //we create field for every page objects
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly navigationPage: NavigationPage
    private readonly datePickerPage: DatePickerPage
    //then we need to call all our pages in the constructor, including the page fixture

    constructor(page: Page) {
        this.page = page
        //we initialize all our page objects here
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.navigationPage = new NavigationPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }
    //we need to create methods that will return all the instances of the page objects
    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutsPage(){
        return this.formLayoutsPage
    }

    onDatePickerPage(){
        return this.datePickerPage
    }
}