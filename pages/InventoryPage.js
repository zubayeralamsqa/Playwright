// pages/InventoryPage.js
class InventoryPage {
  constructor(page) {
      this.page = page;
      this.inventoryList = '.inventory_list'; // Selector for inventory list
      this.addToCartButtons = '.inventory_item button'; // Selector for Add to Cart buttons
      (itemName) => `text=${itemName} >> ../button`;  // Button relative to item name
      this.productNames = '.inventory_item_name'; // Selector for product names
      this.productPrices = '.inventory_item_price'; // Selector for product prices
      this.cartIcon = '.shopping_cart_link'; // Selector for the cart icon
      this.addToCartButton = (itemName) => `text=${itemName} >> ../button`;  // Button relative to item name
      this.cartBadge = '.shopping_cart_badge';
     // this.cartLink = '.shopping_cart_link';
  }

  // Navigate to the inventory page
  async goto() {
      await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  // Check if inventory list is visible
  async isInventoryListVisible() {
      await this.page.waitForSelector(this.inventoryList);
      return await this.page.isVisible(this.inventoryList);
  }

  // Check if product details are displayed
  async getProductDetails(index) {
      return {
          name: await this.page.locator(this.productNames).nth(index).textContent(),
          price: await this.page.locator(this.productPrices).nth(index).textContent()
      };
  }

  // Add product to cart by index
  async addToCart(productIndex = 0) {
      const productButton = this.page.locator(this.addToCartButtons).nth(productIndex);
      await productButton.waitFor({ state: 'visible' });
      await productButton.click();
  }

  // Check if cart icon shows the added product count
  async isCartUpdated(count) {
      return await this.page.locator(this.cartIcon).textContent() === count.toString();
  }

  // Navigate to cart
  async goToCart() {
      await this.page.click(this.cartIcon);
  }

// Add to cart functions
  async addItemToCart(itemName) {
    await this.page.click(this.addToCartButton(itemName));
}

async goToCart() {
    await this.page.click(this.cartIcon);
}

async getCartItemCount() {
    return await this.page.textContent(this.cartBadge);
}
}

module.exports = { InventoryPage };
