"use strict";
let Page = require('./page');
class SentPage extends Page {
    get url() { return "/file/sent" }

    isReturnSent() {
        let heading = browser.getText('span#title');
        heading.should.equal("Data sent");
    }

}
module.exports = new SentPage();