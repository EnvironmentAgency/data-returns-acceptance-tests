"use strict";
let Page = require('./page');

class CorrectionsDetailPage extends Page {
    get url() { return "/correction/detail" }

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

    checkErrorTypes(errorCode, errorTypes) {
        super.checkOpen();
        // First check the error code we want is displayed
        this.checkErrorCodeIncluded(errorCode);

        let expectedErrorTypes = errorTypes.split(",");
        // Error types are shown in the second column on the validation details page
        let errorTypesInTableRows = browser.getText("//tr//td[2]");

        for (let type of expectedErrorTypes) {
            // Ensure this type has one or more entries in the table
            errorTypesInTableRows.should.include(type);

            // Ensure that the correct error messages are displayed at the top of the corrections detail page for each type
            // Find a div element with the appropriate class e.g. "CorrectionIncorrect"
            let errorMessage = browser.element(`div.Correction${type}`);
            errorMessage.should.not.be.null;
        }
    }
}
module.exports = new CorrectionsDetailPage();