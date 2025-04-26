import { Page } from '@playwright/test'; //we imported Page fixture  from playwright library

//class should be exported (export clas...) in order to be visible to other files inside the framework
//we use export keyword in order to make the class visible to other files inside the framework

export class NavigationPage {
    readonly page: Page

    //constructor will wait a parameter of a Page fixture that will be past from the test inside of the NavigationPage 
    constructor(page: Page) {
        this.page = page
    }

    async formLayoutsPage(){
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        //await this.waitForNumberOfSeconds(2)
    }

    async datepickerPage(){
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGoupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGoupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }


}