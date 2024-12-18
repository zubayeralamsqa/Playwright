class ConfirmationPage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = '.complete-header';
    }

    async getConfirmationMessage() {
        return this.page.textContent(this.confirmationMessage);
    }
}

module.exports = {ConfirmationPage};
