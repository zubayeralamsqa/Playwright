class LoginObjects {
    constructor(page) {
        this.page = page;
    }

    get usernameField() {
        return this.page.locator('input[placeholder="Username"]');
    }

    get passwordField() {
        return this.page.locator("input[name='password']");
    }

    get loginButton() {
        return this.page.locator('input[type="submit"]');
    }
}

module.exports = LoginObjects;
