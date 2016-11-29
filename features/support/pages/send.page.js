"use strict";
let Page = require('./page');
const waitForNav = require('../lib/wait-for-navigation-on-action');

class SendPage extends Page {
    get url() { return "/file/send" }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.waitForExist();
        button.click();
    }
}
module.exports = new SendPage();