'use strict';
const EmailPage = require('../../../support/pages/email.page');
module.exports = function () {
    this.defineStep('I don\'t enter an email address', function () {
        EmailPage.continue();
    });
};
