"use strict";
let Page = require('./page');
const waitForNav = require('../lib/wait-for-navigation-on-action');
class StartPage extends Page {
    get url() { return "/start" }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.click();
    }
}
module.exports = new StartPage();