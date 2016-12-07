'use strict';
let EmailPage = require("../../../support/pages/email.page");
module.exports = function () {
    this.defineStep('I submit an email address', function () {
        EmailPage.submitEmail('tim.stone.ea+' + Math.round(Math.random() * 1000) + '@gmail.com');
    });
};