const ProductsPage = require('../../pages/products.page');
const LoginPage = require("../../pages/login.page");
const testData = require('../data/testData');

describe('Products Page Functionality', () => {
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

    it('should display a list of products', async () => {
        const numberOfProducts = await ProductsPage.getNumberOfProducts();
        expect(numberOfProducts).toBeGreaterThan(0);  // Verify that some products are present
    });

    it('should allow adding a product to the cart', async () => {
        await ProductsPage.addProductToCart(0);  // Attempt to add the first product to the cart
        // Verify the product was added
        const isCartEmpty = await ProductsPage.isCartEmpty();
        expect(isCartEmpty).toBe(false);  // Verify the cart is not empty after adding a product
    });

    it('should allow removing a product from the cart', async () => {
        // Precondition: Add a product to the cart first
        const checkIfCartIsEmpty = await ProductsPage.isCartEmpty();
        if (checkIfCartIsEmpty) {
            await ProductsPage.addProductToCart(0);
        }

        // Now, attempt to remove the product from the cart
        await ProductsPage.removeProductFromCart(0);

        // Verify the product was removed
        const isCartEmpty = await ProductsPage.isCartEmpty();
        expect(isCartEmpty).toBe(true);  // Verify the cart is empty after removal
    });

});
