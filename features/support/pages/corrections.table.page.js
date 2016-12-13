"use strict";
const winston = require('winston');
let Page = require('./page');

class CorrectionsTablePage extends Page {
    get url() {
        return "/correction/table"
    }

    openCorrectionsDetail(errorCode) {
        super.checkOpen();

        let errorNumber = errorCode.replace(/\D+/g, '');
        browser.click(`//a[contains(@href, 'id=${errorNumber}')]`);
    }

    checkReportedFieldForErrorCode(errorCode, fieldName) {
        super.checkOpen();
        winston.debug(`Checking reported field (${fieldName}) and error code (${errorCode})`);
        let row = browser.element(`#ERR_${errorCode}`);
        let heading = browser.getText(`#ERR_${errorCode} abbr`);
        row.should.not.be.null;
        heading.should.equal(fieldName);
    }

    checkErrorCodeIncluded(errorCode) {
        super.checkOpen();
        browser.waitUntil(function () {
            let foundErrorCode = browser.getAttribute("#error_code", "value");
            if (foundErrorCode) {
                foundErrorCode.should.equal(errorCode);
                return true;
            }
            return false;
        }, browser.options.waitforTimeout, `Failed to find expected hidden element with error code for error ${errorCode} within the allowed time.`, 25);
    }
}
module.exports = new CorrectionsTablePage();