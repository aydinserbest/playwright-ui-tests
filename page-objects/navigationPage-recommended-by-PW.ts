import { Locator, Page } from '@playwright/test'; //we imported Page fixture  from playwright library

//this approach is recommended by playwright
//PW has its own recommended approach how to organize locators
//PW recommends seperate locators  from the functional methods
//and using the locators assign inside of the constructor
//so locators will not definitely be inside of the functions
//PW recommends to keep all locators seperately from the method itself
//this approach follows DRY principle (Don't Repeat Yourself)
//BUT this approach violates second suggested principle which is Keep It Simple and Stupid (KISS)


export class NavigationPagePW {
    readonly page: Page
    readonly fromLayoutsManuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator

    constructor(page: Page) {
        this.page = page
        this.fromLayoutsManuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toastrMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.selectGoupMenuItem('Forms')
        await this.fromLayoutsManuItem.click()
    }

    async datepickerPage() {
        await this.selectGoupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage() {
        await this.selectGoupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.toastrMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGoupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }


}