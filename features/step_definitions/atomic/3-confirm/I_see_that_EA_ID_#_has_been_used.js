'use strict';
const ConfirmPage = require('../../../support/pages/confirm.page');
module.exports = function () {
    this.defineStep(/^I see that the EA_ID (\S+) has been used$/, function (eaId) {
        ConfirmPage.checkEaIdReported(eaId);
    });
};
