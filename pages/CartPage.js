// pages/CartPage.js
class CartPage {
  constructor(page) {
      this.page = page;
      this.cartItems = '.cart_item'; // Selector for cart items
      this.checkoutButton = '[data-test="checkout"]'; // Selector for checkout button
  }

  // Check if cart items are visible
  async areItemsInCart() {
      await this.page.waitForSelector(this.cartItems);
      return await this.page.isVisible(this.cartItems);
  }

  // Proceed to checkout
  async proceedToCheckout() {
      await this.page.click(this.checkoutButton);
  }
  async getCartItems() {
    return await this.page.locator(this.cartItems).count();
}
}

module.exports = { CartPage };
