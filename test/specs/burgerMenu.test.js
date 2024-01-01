const BurgerMenuPage = require('../../pages/burgerMenu.page');
const LoginPage = require("../../pages/login.page");
const testData = require("../data/testData");
const ProductsPage = require("../../pages/products.page");  // Update with the actual path

describe('Burger Menu Functionality', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login(testData.users.standardUser.username, testData.users.standardUser.password);
        expect(await browser.getUrl()).toContain('/inventory.html');
        await BurgerMenuPage.open();
    });

    afterEach(async () => {
        await browser.deleteCookies();
        await browser.refresh();
    });

    it('should display the burger menu', async () => {
        expect(await BurgerMenuPage.allItemsOption.isDisplayed()).toBe(true);
        expect(await BurgerMenuPage.aboutOption.isDisplayed()).toBe(true);
        expect(await BurgerMenuPage.logoutOption.isDisplayed()).toBe(true);
        expect(await BurgerMenuPage.resetAppStateOption.isDisplayed()).toBe(true);
        expect(await BurgerMenuPage.closeMenuButton.isDisplayed()).toBe(true);
    });

    it('should navigate to about section from the burger menu', async () => {
        await BurgerMenuPage.selectAbout();
        // Add assertions or checks to verify navigation was successful
        expect(await browser.getUrl()).toContain('https://saucelabs.com/');
    });

    it('should log out from the application using the burger menu', async () => {
        await BurgerMenuPage.selectLogout();
        expect(await LoginPage.usernameInput.isDisplayed()).toBe(true);
    });

});