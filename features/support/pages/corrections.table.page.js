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
        let debugHtml = browser.getHTML("body");
        try {
            let row = browser.element(`#ERR_${errorCode}`);
            let heading = browser.getText(`#ERR_${errorCode} abbr`);
            row.should.not.be.null;
            heading.should.equal(fieldName);
        } catch (e) {
            winston.error(`Failed to check for for reported field and error code on corrections table.\nBody text: ${debugHtml}`, e);
            throw e;
        }
    }
}
module.exports = new CorrectionsTablePage();