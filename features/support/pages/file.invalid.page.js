"use strict";
let Page = require('./page');
class FileInvalidPage extends Page {
    get url() {
        return "/file/invalid"
    }

    checkErrorCodeIncluded(errorCode) {
        super.checkOpen();
        let expectedErrorCode = `DR${errorCode}`;
        browser.waitUntil(function () {
            let foundErrorCode = browser.getAttribute("#error_code", "value");
            if (foundErrorCode) {
                foundErrorCode.should.equal(expectedErrorCode);
                return true;
            }
            return false;
        }, browser.options.waitforTimeout, `Failed to find expected hidden element with error code for error ${expectedErrorCode} within the allowed time.`, 25);
    }
}
module.exports = new FileInvalidPage();