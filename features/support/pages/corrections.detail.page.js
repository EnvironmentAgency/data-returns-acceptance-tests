'use strict';
const winston = require('winston');
const Page = require('./page');

class CorrectionsDetailPage extends Page {
    get url () { return '/correction/detail'; }

    checkErrorCodeIncluded (errorCode) {
        winston.debug(`Checking correction detail page contains an element with id=error_code with the value ${errorCode}`);
        const foundErrorCode = browser.getAttribute('#error_code', 'value');
        foundErrorCode.should.equal(errorCode);
    }

    checkErrorTypes (errorCode, errorTypes) {
        // First check the error code we want is displayed
        this.checkErrorCodeIncluded(errorCode);
        const expectedErrorTypes = errorTypes.split(',');
        winston.debug(`Checking for expected error types: ${expectedErrorTypes}`);

        // Error types are shown in the second column on the validation details page
        let errorTypesInTableRows = browser.getText('table#data-error-table td.td-error');
        if (!Array.isArray(errorTypesInTableRows)) {
            errorTypesInTableRows = [errorTypesInTableRows];
        }
        errorTypesInTableRows.should.include.members(expectedErrorTypes);

        for (const type of expectedErrorTypes) {
            // Ensure that the correct error messages are displayed at the top of the corrections detail page for each type
            // Find a div element with the appropriate class e.g. "CorrectionIncorrect"
            const errorMessage = browser.element(`div.Correction${type}`);
            errorMessage.should.not.be.null; // eslint-disable-line no-unused-expressions
        }
    }
}
module.exports = new CorrectionsDetailPage();
