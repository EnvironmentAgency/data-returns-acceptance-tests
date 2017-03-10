'use strict';
const winston = require('winston');
let Page = require('./page');
class PinPage extends Page {
    get url() {
        return "/pin"
    }

    enterPin(pin) {
        super.checkOpen();
        let pinInput = browser.element('#validation_code');
        pinInput.setValue(pin);
    }

    submitPin(pin) {
        if (pin) {
            this.enterPin(pin);
        }
        this.continue();
    }

    isPinFieldAvailable() {
        browser.disableImplicitWait();
        try {
            return browser.isExisting("#validation_code");
        } finally {
            browser.restoreImplicitWait();
        }
    }

    assertBlocked() {
        super.checkOpen();

        // Initial check
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        foundErrorCode.should.equal("DR2280");
        this.isPinFieldAvailable().should.be.false;

        // Reload page (issue new GET request and recheck)
        this.open();
        let foundErrorCodeAfterRefresh = browser.getAttribute("#error_code", "value");
        foundErrorCodeAfterRefresh.should.equal("DR2280");
        this.isPinFieldAvailable().should.be.false;
    }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.click();
    }
}
module.exports = new PinPage();