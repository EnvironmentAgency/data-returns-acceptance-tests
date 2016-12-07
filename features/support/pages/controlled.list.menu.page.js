"use strict";
let Page = require('./page');

class ControlledListMenu extends Page {
    get url() { return "/controlled-lists" }

    openControlledList(title) {
        super.checkOpen();
        let link = browser.element(`=${title}`);
        link.click();
    }
}
module.exports = new ControlledListMenu();