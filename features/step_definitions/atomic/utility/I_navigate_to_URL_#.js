'use strict';
const waitForNavigation = require("../../../support/lib/wait-for-navigation-on-action");
module.exports = function () {
    this.defineStep(/^I navigate to URL "([^"]*)"$/, function (url) {
        browser.url(url);
    });
};