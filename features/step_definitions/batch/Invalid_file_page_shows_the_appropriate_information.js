'use strict';
const winston = require('winston');
let UploadPage = require("../../support/pages/upload.page");
let FileInvalidPage = require("../../support/pages/file.invalid.page");

module.exports = function () {
    this.defineStep('Invalid file page shows the appropriate information', function() {
        let fileList = global.fileList;

        for (let testFile of fileList) {
            // For each file to test, make sure we start from the upload page
            winston.debug("Ensuring upload page open");
            if (!UploadPage.isOpen()) {
                UploadPage.open();
            }
            winston.debug("Opening file details");
            UploadPage.openFileDetails(testFile.filename);

            winston.debug("Checking for appropriate file invalid page");
            FileInvalidPage.checkErrorCodeIncluded(testFile.errorCode);
        }
    });
};