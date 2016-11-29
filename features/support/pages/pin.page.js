"use strict";
let Page = require('./page');

const waitForNav = require('../lib/wait-for-navigation-on-action');
class PinPage extends Page {
    get url() {
        return "pin"
    }

    enterPin(pin) {
        super.checkOpen();
        let pinInput = browser.element('#validation-code');
        pinInput.setValue(pin);
    }

    submitPin(pin) {
        this.enterPin(pin);
        this.continue();
    }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.click();
    }
}
module.exports = new PinPage();