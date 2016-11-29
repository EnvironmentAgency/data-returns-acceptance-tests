"use strict";
let Page = require('./page');

const waitForNav = require('../lib/wait-for-navigation-on-action');

class CorrectionsTablePage extends Page {
    get url() {
        return "/correction/table"
    }

    openCorrectionsDetail(errorCode) {
        super.checkOpen();
        waitForNav(function() {
            browser.click(`//a[contains(@href, 'id=${errorCode}')]`);
        });
    }


    checkReportedFieldForErrorCode(errorCode, fieldName) {
        super.checkOpen();
        let row = browser.element(`#ERR_DR${errorCode}`);
        let heading = browser.getText(`#ERR_DR${errorCode} abbr`);
        row.should.not.be.null;
        heading.should.equal(fieldName);
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
module.exports = new CorrectionsTablePage();