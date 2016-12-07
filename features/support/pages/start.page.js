"use strict";
let Page = require('./page');
class StartPage extends Page {
    get url() { return "/start" }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.click();
    }
}
module.exports = new StartPage();