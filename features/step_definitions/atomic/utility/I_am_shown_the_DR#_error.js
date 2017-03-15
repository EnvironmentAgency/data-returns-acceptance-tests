'use strict';
module.exports = function () {
    this.defineStep(/^I am shown the DR(\d+) error$/, function (errorCode) {
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        foundErrorCode.should.equal(`DR${errorCode}`);
    });
};