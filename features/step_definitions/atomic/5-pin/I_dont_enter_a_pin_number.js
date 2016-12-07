'use strict';
let PinPage = require("../../../support/pages/pin.page");
module.exports = function () {
    this.defineStep('I don\'t enter a pin number', function () {
        PinPage.submitPin("");
    });
};