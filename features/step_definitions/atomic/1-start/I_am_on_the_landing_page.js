'use strict';
let StartPage = require("../../../support/pages/start.page");
module.exports = function () {
    this.defineStep('I am on the landing page', function () {
        if (!browser.desiredCapabilities.preloadFiles) {
            StartPage.open();
            StartPage.checkOpen();
        }
    });
};