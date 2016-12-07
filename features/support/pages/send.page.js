"use strict";
let Page = require('./page');
class SendPage extends Page {
    get url() { return "/file/send" }

    continue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        button.waitForVisible(3000);
        button.click();
    }
}
module.exports = new SendPage();