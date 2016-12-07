'use strict';
let ConfirmPage = require("../../../support/pages/confirm.page");
module.exports = function () {
    this.defineStep('I confirm my details are correct', function() {
        ConfirmPage.continue();
    });
};