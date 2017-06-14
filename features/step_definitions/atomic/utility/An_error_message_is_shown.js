'use strict';
module.exports = function () {
    this.defineStep(/^an error message is shown$/, function () {
        const errorSummaryText = browser.getText('.error-summary');
        errorSummaryText.should.not.be.null; // eslint-disable-line no-unused-expressions
    });
};
