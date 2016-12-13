'use strict';
const winston = require('winston');
let UploadPage = require("../../support/pages/upload.page");
let CorrectionsTablePage = require("../../support/pages/corrections.table.page");
let CorrectionsDetailPage = require("../../support/pages/corrections.detail.page");

module.exports = function () {
    this.defineStep('Correction pages show the appropriate information', {timeout: 10 * 60 * 1000}, function() {
        let fileList = global.fileList;

        let index = 1;

        for (let testFile of fileList) {
            winston.info(`Checking file ${index++} of ${fileList.length}`);
            // For each file to test, make sure we start from the upload page
            winston.debug("Checking if upload page is open");
            if (!UploadPage.isOpen()) {
                winston.debug("Opening the upload page.");
                UploadPage.open();
            }
            UploadPage.openFileDetails(testFile.filename);

            CorrectionsTablePage.checkReportedFieldForErrorCode(testFile.errorCode, testFile.errorField);

            winston.debug("Opening corrections detail");
            CorrectionsTablePage.openCorrectionsDetail(testFile.errorCode);

            winston.debug("Checking corrections detail");
            CorrectionsDetailPage.checkErrorTypes(testFile.errorCode, testFile.errorCategories);
        }
    });
};