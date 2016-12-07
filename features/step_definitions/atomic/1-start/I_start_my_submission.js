'use strict';
let StartPage = require("../../../support/pages/start.page");
module.exports = function () {
    this.defineStep('I start my submission', function () {
        if (!browser.desiredCapabilities.preloadFiles) {
            StartPage.continue();
        }
    });
};