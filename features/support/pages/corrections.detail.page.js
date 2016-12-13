"use strict";
const winston = require('winston');
let Page = require('./page');

class CorrectionsDetailPage extends Page {
    get url() { return "/correction/detail" }

    checkErrorCodeIncluded(errorCode) {
        super.checkOpen();
        winston.debug(`Checking correction detail page contains an element with id=error_code with the value ${errorCode}`);
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        foundErrorCode.should.equal(errorCode);
    }

    checkErrorTypes(errorCode, errorTypes) {
        super.checkOpen();
        // First check the error code we want is displayed
        this.checkErrorCodeIncluded(errorCode);

        let expectedErrorTypes = errorTypes.split(",");
        winston.debug(`Checking for expected error types: ${expectedErrorTypes}`);

        // Error types are shown in the second column on the validation details page
        let errorTypesInTableRows = browser.getText("table#data-error-table td.td-error");
        if (!Array.isArray(errorTypesInTableRows)) {
            errorTypesInTableRows = [errorTypesInTableRows];
        }
        errorTypesInTableRows.should.include.members(expectedErrorTypes);

        for (let type of expectedErrorTypes) {
            // Ensure that the correct error messages are displayed at the top of the corrections detail page for each type
            // Find a div element with the appropriate class e.g. "CorrectionIncorrect"
            let errorMessage = browser.element(`div.Correction${type}`);
            errorMessage.should.not.be.null;
        }
    }
}
module.exports = new CorrectionsDetailPage();