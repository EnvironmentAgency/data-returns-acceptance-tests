'use strict';
const EmailPage = require('../../../support/pages/email.page');
module.exports = function () {
    this.defineStep('I submit an email address', function () {
        EmailPage.submitEmail('test+' + Math.round(Math.random() * 100000) + '@example.com');
    });
};
