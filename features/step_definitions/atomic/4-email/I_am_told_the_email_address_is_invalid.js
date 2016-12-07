'use strict';
let EmailPage = require("../../../support/pages/email.page");
module.exports = function () {
    this.defineStep('I am told the email address is invalid', function () {
        EmailPage.ensureErrorShown();
    });
};