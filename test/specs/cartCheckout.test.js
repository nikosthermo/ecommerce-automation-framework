const CartPage = require('../../pages/cart.page');
const CheckoutPage = require('../../pages/checkout.page');
const ProductsPage = require('../../pages/products.page');
const LoginPage = require("../../pages/login.page");
const testData = require("../data/testData");

describe('Cart and Checkout Functionality', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login(testData.users.standardUser.username, testData.users.standardUser.password);
        expect(await browser.getUrl()).toContain('/inventory.html');
        await ProductsPage.open();
    });

    after(async () => {
        await browser.deleteCookies();
        await browser.refresh();
    });

    it('should allow a user to add items to the cart and checkout', async () => {
        // Add an item to the cart
        await ProductsPage.addProductToCart(0);

        // Go to the cart and verify the item is there
        await CartPage.open();
        expect(await CartPage.getNumberOfItems()).toBe(1);

        // Proceed to checkout
        await CartPage.proceedToCheckout();

        // Complete the checkout process
        await CheckoutPage.enterShippingDetails(testData.shippingInfo.firstName, testData.shippingInfo.lastName, testData.shippingInfo.zipCode);
        await CheckoutPage.continueToNextStep();
        await CheckoutPage.finishCheckout();

        // Verify order confirmation
        const confirmationMessage = await CheckoutPage.getOrderConfirmation();
        expect(confirmationMessage).toContain('Thank you for your order!');
    });
});