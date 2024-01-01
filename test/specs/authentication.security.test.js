const LoginPage = require("../../pages/login.page");
const testData = require('../data/testData');
const config = require('../../config/config');
const BurgerMenuPage = require("../../pages/burgerMenu.page");

// Security Tests
describe('Authentication Security', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    afterEach(async () => {
        await browser.deleteCookies();
        await browser.refresh();
    });

    // Case: SQL Injection
    it('should not allow SQL injection', async () => {
        await LoginPage.login("' OR '1'='1", "' OR '1'='1"); // Common SQL injection technique
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toBeDisplayed();
    });

    // Case: Cross-Site Scripting (XSS)
    it('should not be vulnerable to XSS', async () => {
        await LoginPage.login('<script>alert("XSS")</script>', '<script>alert("XSS")</script>');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Username and password do not match'));
    });

    // Case: Brute Force Attack - Skipping since there is not a lockout policy implemented on the login mechanism of the application under test
    it.skip('should lock the account or require additional authentication after consecutive failed logins', async () => {
        for (let i = 0; i < 5; i++) {
            await LoginPage.login(testData.users.standardUser.username, 'wrong_password' + i);
            await browser.pause(500); // Wait briefly between attempts
        }
        // Check for lockout message or additional security questions/CAPTCHA
        const isLocked = await LoginPage.isLockedAccountDisplayed();
        expect(isLocked).toBe(true);
    });

    // Case: Secure Transmission
    it('should use HTTPS for secure data transmission', async () => {
        expect(await browser.getUrl()).toMatch(/^https:\/\//);
    });

    // Case: Session Management after Logout
    it('should invalidate session after logout', async () => {
        await LoginPage.login(testData.users.standardUser.username, testData.users.standardUser.password);
        // Simulate user logging out
        await BurgerMenuPage.open();
        expect(await BurgerMenuPage.logoutOption.isDisplayed()).toBe(true);
        await BurgerMenuPage.selectLogout();
        expect(await LoginPage.usernameInput.isDisplayed()).toBe(true);
        // Attempt to navigate back to a protected page
        await browser.url(config.baseUrl + '/inventory.html');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
    });

    // Case: Input Field Validation
    it('should not accept excessively long input strings', async () => {
        await LoginPage.login('a'.repeat(1000), 'secret_sauce');
        // Assert that an appropriate error message is displayed or the input is truncated
        expect(await LoginPage.errorMessage).toBeDisplayed();
    });

    // Case: Error Message Disclosure
    it('should not display overly descriptive error messages', async () => {
        await LoginPage.login('nonexistent_user', 'wrong_password');
        // Assert that the error message is generic and doesn't reveal whether the user exists
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Invalid username or password'));
    });
});
