import { Page } from '@playwright/test';
import { HelperBase } from './helperBase';

//this approach is to use locators directly inside of the methods

//we do not need instance of the HelperBase class because we inherit it
//we extend all the methods from the HelperBase class
//all methods from the HelperBase class are visible in this class

export class NavigationPage extends HelperBase {
    //readonly page: Page  we do not need this field because we are inheriting it from the HelperBase class

    constructor(page: Page) {
        //this.page = page
        //we inherit the page from the HelperBase class
        //so we need to call the constructor of the HelperBase class
        super(page)
    }

    async formLayoutsPage() {
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        //we call the method from the HelperBase class as an example
        await this.waitForNumbersOfSeconds(2)
    }

    async datepickerPage() {
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.selectGoupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGoupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }


}