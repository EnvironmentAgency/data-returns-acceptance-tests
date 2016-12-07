'use strict';
const waitForNavigation = require("../../../support/lib/wait-for-navigation-on-action");
module.exports = function () {
    this.defineStep(/^I click the link "([^"]*)"$/, function (linkText) {
        waitForNavigation(function () {
            let selector = `//a[contains(text(), "${linkText}")]`;
            return browser.click(selector);
        });
    });
};