'use strict';
let ConfirmPage = require("../support/pages/confirm.page");
let FileInvalidPage = require("../support/pages/file.invalid.page");
let CorrectionsTablePage = require("../support/pages/corrections.table.page");
let CorrectionsDetailPage = require("../support/pages/corrections.detail.page");

module.exports = function () {
    /**
     * Confirm details page
     */
    this.defineStep(/^I see that the EA_ID (\S+) has been used$/, function (eaId) {
        ConfirmPage.checkEaIdReported(eaId);
    });

    this.defineStep(/^I see that (\S+) has been substituted to (\S+)$/, function (inputEaId, outputEaId) {
        ConfirmPage.checkEaIdSubstituted(inputEaId, outputEaId);
    });

    this.defineStep(/^I confirm my details are correct$/, function() {
        ConfirmPage.continue();
    });

    /**
     * File level validation error methods
     */
    this.defineStep(/^Invalid file information contains error for DR(\d+)$/, function(errorCode) {
        FileInvalidPage.checkErrorCodeIncluded(errorCode);
    });

    /**
     * Corrections table (first level) error page
     */
    this.defineStep(/^Correction table contains error for DR(\d+) for the header "([^"]+)"$/, function (errorNumber, fieldName) {
        CorrectionsTablePage.checkReportedFieldForErrorCode(errorNumber, fieldName);
    });

    this.defineStep(/^I open row correction details for error DR(\d+)$/, function (errorCode) {
        CorrectionsTablePage.openCorrectionsDetail(errorCode);
    });

    /**
     * Corrections detail (second level) error page
     *
     * @param errorCode the DR9XXX code expected
     * @param errorTypes should be a comma delimited (no spaces) string containing all error types you should see on the corrections detail
     * page
     */
    this.defineStep(/^I expect the row correction details for error DR(\d+) to show errors for (.+)/, function(errorCode, errorTypes) {
        CorrectionsDetailPage.checkErrorTypes(errorCode, errorTypes);
    });
};
