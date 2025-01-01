const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/CartPage');
const {ConfirmationPage} = require('../pages/ConfirmationPage');
const {CheckoutPage} = require('../pages/CheckoutPage');

test.describe('Add to Cart Feature', () => {
    
    test.beforeEach(async ({ page }) => {
        // Login as a pre-requisite (assuming successful login is needed)
        await page.goto('https://www.saucedemo.com/');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    test('Positive: Add a single item to cart and verify the count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await expect(inventoryPage.getCartItemCount()).resolves.toBe('1');

        await inventoryPage.goToCart();
        const cartItemsCount = await cartPage.getCartItems();
        expect(cartItemsCount).toBe(1);
    });

    test('Positive: Add multiple items to cart and verify the count', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.addItemToCart('Sauce Labs Backpack');
        await inventoryPage.addItemToCart('Sauce Labs Bike Light');
        await expect(inventoryPage.getCartItemCount()).resolves.toBe('2');

        await inventoryPage.goToCart();
        const cartItemsCount = await cartPage.getCartItems();
        expect(cartItemsCount).toBe(2);
    });


    test('Negative: Verify no items in cart when nothing is added', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await inventoryPage.goToCart();
        const cartItemsCount = await cartPage.getCartItems();
        expect(cartItemsCount).toBe(0);
    });

    test('Negative: Verify cart badge is not visible without adding any items', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);
        await expect(page.locator(inventoryPage.cartBadge)).not.toBeVisible();
    });
    // Order creation and successful journey
    test('Complete order journey from cart page', async ({ page }) => {
        // Navigate to the cart page
        await page.goto('https://www.saucedemo.com/cart.html');
    
        // Initialize Page Objects
        const cartPage = new CartPage(page);
        const inventoryPage = new InventoryPage(page);
        const checkoutPage = new CheckoutPage(page);
        const confirmationPage = new ConfirmationPage(page);
    
        // Proceed to checkout
        await cartPage.proceedToCheckout();
    
        // Fill shipping details
        await checkoutPage.enterCheckoutInfo('John', 'Doe', '12345');
    
        // Complete the order
        await checkoutPage.completeOrder(); 
        //await page.pause();
    
        // Validate confirmation message
        const confirmationMessage = await confirmationPage.getConfirmationMessage();
        expect(confirmationMessage).toBe('Thank you for your order!');
    });
});
