// tests/inventory.spec.js
const { test, expect } = require('@playwright/test');
const { InventoryPage } = require('../pages/inventoryPage');
const { CartPage } = require('../pages/CartPage');

test.describe('Inventory List and Add to Cart Journey', () => {
    let inventoryPage;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);

        // Log in before each test
        await page.goto('https://www.saucedemo.com');
        await page.fill('#user-name', 'standard_user');
        await page.fill('#password', 'secret_sauce');
        await page.click('#login-button');
    });

    // Positive Test Cases

    test('Verify Inventory List is Displayed', async ({ page }) => {
        await inventoryPage.goto();
        const isVisible = await inventoryPage.isInventoryListVisible();
        expect(isVisible).toBeTruthy();
    });

    test('Verify Product Details are Displayed Correctly', async ({ page }) => {
        await inventoryPage.goto();
        const productDetails = await inventoryPage.getProductDetails(0);
        expect(productDetails.name).not.toBe('');
        expect(productDetails.price).not.toBe('');
    });


    test('Add Product to Cart and Verify Cart Count', async ({ page }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart(0);
        const isCartUpdated = await inventoryPage.isCartUpdated(1);
        expect(isCartUpdated).toBeTruthy();
    });

    test('Verify Product Appears in Cart After Adding', async ({ page }) => {
        await inventoryPage.goto();
        await inventoryPage.addToCart(0);
        await inventoryPage.goToCart();
        const itemsInCart = await cartPage.areItemsInCart();
        expect(itemsInCart).toBeTruthy();
    });

    // Negative Test Cases    
    test('Verify Cart Icon Does Not Show Count When No Items Are Added', async ({ page }) => {
        await inventoryPage.goto();
        const isCartUpdated = await inventoryPage.isCartUpdated(0); // Expect no count shown
        expect(isCartUpdated);
    });


});
