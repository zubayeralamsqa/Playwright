// /pages/CheckoutPage.js
class CheckoutPage {
    constructor(page) {
      this.page = page;
      this.firstNameInput = '[data-test="firstName"]';
      this.lastNameInput = '[data-test="lastName"]';
      this.postalCodeInput = '[data-test="postalCode"]';
      this.continueButton = '[data-test="continue"]';
      this.finishButton = '[data-test="finish"]';
      this.orderCompleteText = '.complete-header';
    }
  
    async enterCheckoutInfo(firstName, lastName, postalCode) {
      await this.page.fill(this.firstNameInput, firstName);
      await this.page.fill(this.lastNameInput, lastName);
      await this.page.fill(this.postalCodeInput, postalCode);
      await this.page.click(this.continueButton);
    }
  
    async completeOrder() {
      await this.page.click(this.finishButton);
    }
  
    async isOrderSuccessful() {
      return await this.page.locator(this.orderCompleteText).innerText() === 'THANK YOU FOR YOUR ORDER';
    }
  }
  
  module.exports = { CheckoutPage };
  