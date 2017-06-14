'use strict';
module.exports = function () {
    this.defineStep(/^I navigate to URL "([^"]*)"$/, function (url) {
        browser.url(url);
    });
};
