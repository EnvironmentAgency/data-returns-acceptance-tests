'use strict';
let ConfirmPage = require("../../../support/pages/confirm.page");
module.exports = function () {
    this.defineStep(/^I see that (\S+) has been substituted to (\S+)$/, function (inputEaId, outputEaId) {
        ConfirmPage.checkEaIdSubstituted(inputEaId, outputEaId);
    });
};