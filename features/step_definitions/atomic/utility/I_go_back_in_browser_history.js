'use strict';
const waitForNavigation = require('../../../support/lib/wait-for-navigation-on-action');
module.exports = function () {
    this.defineStep(/^I go back in browser history$/, function () {
        waitForNavigation(function () {
            browser.back();
        });
    });
};
