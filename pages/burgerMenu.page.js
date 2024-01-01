class BurgerMenuPage {
    // Elements
    get burgerMenuButton() { return $('#react-burger-menu-btn'); }
    get closeMenuButton() { return $('#react-burger-cross-btn'); }
    get allItemsOption() { return $('#inventory_sidebar_link'); }
    get aboutOption() { return $('#about_sidebar_link'); }
    get logoutOption() { return $('#logout_sidebar_link'); }
    get resetAppStateOption() { return $('#reset_sidebar_link'); }

    // Open the burger menu
    async open() {
        await this.burgerMenuButton.waitForClickable();
        await this.burgerMenuButton.click();
    }

    // Close the burger menu
    async close() {
        if (await this.closeMenuButton.isDisplayed()) {
            await this.closeMenuButton.click();
        }
    }

    // Select 'All Items'
    async selectAllItems() {
        await this.allItemsOption.waitForClickable();
        await this.allItemsOption.click();
    }

    // Select 'About'
    async selectAbout() {
        await this.aboutOption.waitForClickable();
        await this.aboutOption.click();
    }

    // Select 'Logout'
    async selectLogout() {
        await this.logoutOption.waitForClickable();
        await this.logoutOption.click();
    }

    // Select 'Reset App State'
    async selectResetAppState() {
        await this.resetAppStateOption.waitForClickable();
        await this.resetAppStateOption.click();
    }
}

module.exports = new BurgerMenuPage();
