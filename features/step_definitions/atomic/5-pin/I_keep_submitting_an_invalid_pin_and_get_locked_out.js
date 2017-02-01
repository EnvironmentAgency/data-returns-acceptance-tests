'use strict';
let PinPage = require("../../../support/pages/pin.page");
module.exports = function () {
    this.defineStep('I keep submitting an invalid pin and get locked out', function () {
        for (let i = 0; i < 11; i++) {
            PinPage.submitPin("xxxxyz.xyz");
        }
    });
};