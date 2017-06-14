'use strict';
const EmailPage = require('../../../support/pages/email.page');
const address = `willgetgblocked+${Math.round(Math.random() * 100000)}@example.com`;

module.exports = function () {
    this.defineStep('I enter the same email address too many times and it gets blocked', function () {
        for (let i = 0; i < 10; i++) {
            EmailPage.open();
            EmailPage.submitEmail(address);
        }
        EmailPage.assertBlocked();

        // Reload page (issue new GET request and recheck)
        EmailPage.open();
        EmailPage.submitEmail(address);
        EmailPage.assertBlocked();
    });
};
