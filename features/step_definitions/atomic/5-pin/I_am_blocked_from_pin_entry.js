'use strict';
let PinPage = require("../../../support/pages/pin.page");
module.exports = function () {
    this.defineStep('I am blocked from pin entry', function () {
        PinPage.assertBlocked();
    });
};