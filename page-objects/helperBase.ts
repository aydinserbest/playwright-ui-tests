import { Page } from "@playwright/test";

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async waitForNumbersOfSeconds (timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}
//this class is used to create helper methods that can be used in all page objects
//with inheritance