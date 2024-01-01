const config = require('../config/config');

class CartPage {
    get cartItems() { return $$('.cart_item'); }
    get checkoutButton() { return $('#checkout'); }

    async open() {
        await browser.url(config.baseUrl + '/cart.html');
    }

    async getNumberOfItems() {
        return (await this.cartItems).length;
    }

    async removeItem(itemIndex) {
        const removeButton = (await this.cartItems)[itemIndex].$('.btn_secondary');
        await removeButton.click();
    }

    async proceedToCheckout() {
        await this.checkoutButton.waitForClickable();
        await this.checkoutButton.click();
    }

}

module.exports = new CartPage();