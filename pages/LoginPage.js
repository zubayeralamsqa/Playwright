// /pages/LoginPage.js
class LoginPage {
    constructor(page) {
      this.page = page;
      this.usernameInput = '#user-name';
      this.passwordInput = '#password';
      this.loginButton = '#login-button';
      this.errorMessage = 'h3[data-test="error"]';
      this.inventoryItem = '.inventory_item';
    }
  
    async navigate() {
      await this.page.goto('/');
    }
  
    async login(username, password) {
      await this.page.fill(this.usernameInput, username);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  
    async getErrorMessage() {
      return await this.page.locator(this.errorMessage).innerText();
    }
  
    async isLoggedInSuccessfully() {
      const currentUrl = this.page.url(); 
      const inventoryItem = this.page.locator(this.inventoryItem).first();
      const isInventoryVisible = await inventoryItem.isVisible();
      return currentUrl.includes('inventory.html') && isInventoryVisible;
    }
  }
  
  module.exports = { LoginPage };
  