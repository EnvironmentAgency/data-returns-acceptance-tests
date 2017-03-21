'use strict';
let Page = require('./page');
class PinPage extends Page {
    get url() {
        return "/pin"
    }

    enterPin(pin) {
        super.checkOpen();
        let pinInput = browser.element('#validation_code');
        if (pin) {
            pinInput.setValue(pin);
        } else {
            pinInput.clearElement();
        }

    }

    submitPin(pin) {
        this.enterPin(pin);
        this.continue();
    }

    isPinFieldAvailable() {
        return browser.isExistingNoWait('#validation_code');
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
}
module.exports = new PinPage();