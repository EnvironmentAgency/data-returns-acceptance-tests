'use strict';
module.exports = function () {
    this.defineStep(/^an error message is shown$/, function () {
        let errorSummaryText = browser.getText('.error-summary');
        errorSummaryText.should.not.be.null;
    });
};