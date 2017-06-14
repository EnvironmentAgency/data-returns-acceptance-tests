'use strict';
const Page = require('./page');
class PinPage extends Page {
    get url () {
        return '/pin';
    }

    enterPin (pin) {
        const pinInput = browser.element('#validation_code');
        if (pin) {
            pinInput.setValue(pin);
        } else {
            pinInput.clearElement();
        }
    }

    submitPin (pin) {
        this.enterPin(pin);
        this.continue();
    }

    isPinFieldAvailable () {
        return browser.isExistingSafe('#validation_code');
    }

    assertBlocked () {
        // Initial check
        const foundErrorCode = browser.getAttribute('#error_code', 'value');
        foundErrorCode.should.equal('DR2280');
        this.isPinFieldAvailable().should.be.false; // eslint-disable-line no-unused-expressions

        // Reload page (issue new GET request and recheck)
        this.open();
        const foundErrorCodeAfterRefresh = browser.getAttribute('#error_code', 'value');
        foundErrorCodeAfterRefresh.should.equal('DR2280');
        this.isPinFieldAvailable().should.be.false; // eslint-disable-line no-unused-expressions
    }
}
module.exports = new PinPage();
