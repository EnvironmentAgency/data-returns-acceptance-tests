'use strict';
const PinPage = require('../../../support/pages/pin.page');
module.exports = function () {
    this.defineStep('I submit an invalid pin number', function () {
        PinPage.submitPin('xxxx');
    });
};
