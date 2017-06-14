'use strict';
const SendPage = require('../../../support/pages/send.page');
module.exports = function () {
    this.defineStep('I choose to send my files now', function () {
        SendPage.continue();
    });
};
