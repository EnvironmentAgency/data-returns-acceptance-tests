"use strict";
let Page = require('./page');
class EmailPage extends Page {
    get url() {
        return "/email"
    }

    enterEmail(emailAddress) {
        super.checkOpen();
        let emailInput = browser.element('#email');
        emailInput.setValue(emailAddress);
    }

    submitEmail(emailAddress) {
        this.enterEmail(emailAddress);
        this.continue();
    }

    isEmailFieldAvailable() {
        return browser.isExistingNoWait('#email');
    }

    assertBlocked() {
        super.checkOpen();
        // Initial check
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        foundErrorCode.should.equal("DR2055");
        this.isEmailFieldAvailable().should.be.false;
    }

    ensureErrorShown() {
        super.checkOpen();
        let errorSummaryElement = browser.element('.error-summary');
        errorSummaryElement.waitForExist();
        errorSummaryElement.getText().should.not.be.null;
    }
}
module.exports = new EmailPage();