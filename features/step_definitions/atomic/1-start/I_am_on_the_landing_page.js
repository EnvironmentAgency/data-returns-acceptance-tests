'use strict';
const StartPage = require('../../../support/pages/start.page');
module.exports = function () {
    this.defineStep('I am on the landing page', function () {
        StartPage.open();
        StartPage.checkOpen();
    });
};
