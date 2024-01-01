const LoginPage = require('../../pages/login.page');
const testData = require('../data/testData');

// Functional Tests
describe('Authentication Functionality', () => {
    // This will run before each test in this describe block
    beforeEach(async () => {
        await LoginPage.open();
    });

    // This will run after each test in this describe block
    afterEach(async () => {
        await browser.deleteCookies(); // Clear cookies
        await browser.refresh(); // Refresh the browser to reset state
    });

    // Happy Path: Valid credentials
    it('should log in successfully with valid credentials', async () => {
        await LoginPage.login(testData.users.standardUser.username, testData.users.standardUser.password);
        expect(await browser.getUrl()).toContain('/inventory.html');
        expect(await LoginPage.errorMessage).not.toBeDisplayed();
    });

    // Negative Path: Invalid username
    it('should not log in with an invalid username', async () => {
        await LoginPage.login('wrong_user', 'secret_sauce');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Username and password do not match'));
    });

    // Negative Path: Invalid password
    it('should not log in with an invalid password', async () => {
        await LoginPage.login('standard_user', 'wrong_password');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Username and password do not match'));
    });

    // Case: Empty username
    it('should require username', async () => {
        await LoginPage.login('', 'secret_sauce');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Username is required'));
    });

    // Case: Empty password
    it('should require password', async () => {
        await LoginPage.login('standard_user', '');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Password is required'));
    });

    // Case: Empty username and password
    it('should require username and password', async () => {
        await LoginPage.login('', '');
        expect(await browser.getUrl()).not.toContain('/inventory.html');
        expect(await LoginPage.errorMessage).toHaveText(expect.stringContaining('Username and password are required'));
    });
});