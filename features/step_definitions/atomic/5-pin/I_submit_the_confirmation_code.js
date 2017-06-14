'use strict';
const PinPage = require('../../../support/pages/pin.page');
module.exports = function () {
    this.defineStep('I submit the confirmation code', function () {
        PinPage.submitPin('1960');
    });
};
