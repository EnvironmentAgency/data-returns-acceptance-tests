'use strict';
const Page = require('./page');
class EmailPage extends Page {
    get url () {
        return '/email';
    }

    enterEmail (emailAddress) {
        const emailInput = browser.element('#email');
        emailInput.setValue(emailAddress);
    }

    submitEmail (emailAddress) {
        this.enterEmail(emailAddress);
        this.continue();
    }

    isEmailFieldAvailable () {
        return browser.isExistingSafe('#email');
    }

    assertBlocked () {
        // Initial check
        const foundErrorCode = browser.getAttribute('#error_code', 'value');
        foundErrorCode.should.equal('DR2055');
        this.isEmailFieldAvailable().should.be.false; // eslint-disable-line no-unused-expressions
    }

    ensureErrorShown () {
        const errorSummaryElement = browser.element('.error-summary');
        errorSummaryElement.waitForExist();
        errorSummaryElement.getText().should.not.be.null; // eslint-disable-line no-unused-expressions
    }
}
module.exports = new EmailPage();
