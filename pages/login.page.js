class LoginPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    get errorMessage() { return $(`//*[@id='login_button_container']//*[contains(@class, 'error-message')]`); }
    get lockOutMessage() { return $(`too many attempts`); }

    async open() {
        await browser.url('/');
    }

    async login(username, password) {
        await this.usernameInput.waitForDisplayed();
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();

        // Wait for either the inventory page or an error message to ensure the login attempt has been processed
        await browser.waitUntil(
            async () => await this.isLoggedIn() || await this.isErrorDisplayed(),
            {
                timeout: 5000,
                timeoutMsg: 'Expected to be logged in or to receive an error message'
            }
        );
    }

    // Check if the user is logged in by looking for a URL segment
    async isLoggedIn() {
        return (await browser.getUrl()).includes('/inventory');
    }

    // Check if the error message is displayed on the page
    async isErrorDisplayed() {
        return this.errorMessage.isDisplayed();
    }

    async isLockedAccountDisplayed() {
        return this.lockOutMessage.isDisplayed();
    }
}

module.exports = new LoginPage();