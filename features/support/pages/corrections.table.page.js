"use strict";
let Page = require('./page');

const waitForNav = require('../lib/wait-for-navigation-on-action');

class CorrectionsTablePage extends Page {
    get url() {
        return "/correction/table"
    }

    openCorrectionsDetail(errorCode) {
        super.checkOpen();

        let errorNumber = errorCode.replace(/\D+/g, '');
        waitForNav(function() {
            browser.click(`//a[contains(@href, 'id=${errorNumber}')]`);
        });
    }


    checkReportedFieldForErrorCode(errorCode, fieldName) {
        super.checkOpen();
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