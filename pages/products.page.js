class ProductsPage {
    // Selector for all product items
    get productItems() { return $$('.inventory_item'); }

    // Selector for add-to-cart buttons (assuming one for each product)
    get addToCartButtons() { return $$('.btn_inventory'); }
    // Selector for remove-from-cart buttons (assuming one for each product in the cart)
    get removeFromCartButtons() { return $$(`//button[contains(@id, 'remove')]`); }
    get cartItemCount() { return $$('span.shopping_cart_badge'); }


    // Open the Products page
    async open() {
        await browser.url(`/inventory.html`);
    }

    // Get the count of products displayed
    async getNumberOfProducts() {
        return (await this.productItems).length;
    }

    // Add a specific product to the cart by index
    async addProductToCart(index) {
        const buttons = await this.addToCartButtons;
        if (index < buttons.length) {
            await buttons[index].click();
        } else {
            throw new Error("Product index out of range");
        }
    }

    // Method to remove a specific product from the cart by index
    async removeProductFromCart(index) {
        const buttons = await this.removeFromCartButtons;
        if (index < buttons.length && buttons.length > 0) {
            await buttons[index].click();
        } else {
            throw new Error("Product index out of range or no products in cart");
        }
    }

    // Method to verify if the cart is empty or a specific product is removed
    async isCartEmpty() {
        const itemCount = await this.cartItemCount;
        if (itemCount.length === 0) {  // If the cart count element is not present
            return true;
        }
        const itemCountText = await itemCount[0].getText();
        return itemCountText === '0';
    }
}

module.exports = new ProductsPage();