const LoginPage = require("../../pages/login.page");

// Security Tests
describe('Authentication Security', () => {
    // This will run before each test in this describe block
    beforeEach(async () => {
        await LoginPage.open();
    });

    // This will run after each test in this describe block
    afterEach(async () => {
        await browser.deleteCookies(); // Clear cookies
        await browser.refresh(); // Refresh the browser to reset state
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

    // Case: Brute Force Attack
    it('should lock the account or require additional authentication after consecutive failed logins', async () => {
        for (let i = 0; i < 5; i++) {
            await LoginPage.login('standard_user', 'wrong_password' + i);
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
        await LoginPage.login('standard_user', 'secret_sauce');
        // Simulate user logging out
        await LoginPage.logout(); // Will implement this method later on since it's not part of the original page object
        // Attempt to navigate back to a protected page
        await browser.url('/inventory.html');
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
