"use strict";
let Page = require('./page');

const waitForNav = require('../lib/wait-for-navigation-on-action');

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
        super.checkOpen();
        this.enterEmail(emailAddress);
        this.continue();
    }

    ensureErrorShown() {
        super.checkOpen();
        let errorSummaryElement = browser.element('.error-summary');
        errorSummaryElement.waitForExist();
        errorSummaryElement.getText().should.not.be.null;
    }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.click();
    }


}
module.exports = new EmailPage();