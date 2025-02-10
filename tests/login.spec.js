// /tests/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('SauceDemo Login Tests using POM', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('Login with valid credentials', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    const isLoggedIn = await loginPage.isLoggedInSuccessfully();
    expect(isLoggedIn).toBeTruthy();
  });

  test('Login with invalid username', async ({ page }) => {
    await loginPage.login('invalid_user', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with invalid password', async ({ page }) => {
    await loginPage.login('standard_user', 'invalid_password');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with empty credentials', async ({ page }) => {
    await loginPage.login('', '');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Username is required');
  });

  test('Login with locked out user', async ({ page }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
    //console.log("Test")
  });
});
