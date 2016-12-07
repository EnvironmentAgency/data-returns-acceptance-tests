'use strict';
let EmailPage = require("../../../support/pages/email.page");
module.exports = function () {
    this.defineStep('I submit an invalid email address', function () {
        EmailPage.submitEmail("XXXX");
    });
};