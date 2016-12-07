'use strict';
const winston = require('winston');
let UploadPage = require("../../support/pages/upload.page");
let CorrectionsTablePage = require("../../support/pages/corrections.table.page");
let CorrectionsDetailPage = require("../../support/pages/corrections.detail.page");

module.exports = function () {
    this.defineStep('Correction pages show the appropriate information', function() {
        let fileList = global.fileList;

        for (let testFile of fileList) {
            // For each file to test, make sure we start from the upload page
            winston.debug("Ensuring upload page open");
            if (!UploadPage.isOpen()) {
                UploadPage.open();
            }
            winston.debug("Opening file details");
            UploadPage.openFileDetails(testFile.filename);

            winston.debug("Checking reported field and error code");
            CorrectionsTablePage.checkReportedFieldForErrorCode(testFile.errorCode, testFile.errorField);

            winston.debug("Opening corrections detail");
            CorrectionsTablePage.openCorrectionsDetail(testFile.errorCode);

            winston.debug("Checking corrections detail");
            CorrectionsDetailPage.checkErrorTypes(testFile.errorCode, testFile.errorCategories);
        }
    });
};