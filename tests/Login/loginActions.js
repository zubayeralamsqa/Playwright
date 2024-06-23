const { chromium } = require('playwright');
const LoginObjects = require('./loginObjects');

class LoginActions {
    constructor(page) {
        this.page = page;
        this.loginObjects = new LoginObjects(page);
    }

    async loadWebsite() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async enterUsername(username) {
        await this.loginObjects.usernameField.fill(username);
    }

    async enterPassword(password) {
        await this.loginObjects.passwordField.fill(password);
    }

    async submit() {
        await this.loginObjects.loginButton.click();
    }
}
module.exports = LoginActions;


