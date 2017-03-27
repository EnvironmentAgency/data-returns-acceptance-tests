"use strict";
let Page = require('./page');
const waitForNav = require('../lib/wait-for-navigation-on-action');

class ControlledListMenu extends Page {
    get url() { return "/controlled-lists" }

    openControlledList(title) {
        let link = browser.element(`=${title}`);
        waitForNav(function() {
            link.click();
        });
    }
}
module.exports = new ControlledListMenu();