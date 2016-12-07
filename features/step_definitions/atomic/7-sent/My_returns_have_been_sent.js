'use strict';
let SentPage = require("../../../support/pages/sent.page")
module.exports = function () {
    this.defineStep('My returns have been sent', function() {
        SentPage.isReturnSent();
    });
};