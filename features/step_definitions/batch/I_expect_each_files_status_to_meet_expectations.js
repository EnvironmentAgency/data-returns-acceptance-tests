'use strict';
const winston = require('winston');
let UploadPage = require("../../support/pages/upload.page");
module.exports = function () {
    /**
     * Checks the file status of uploads previously defined in the "Given the following files and expectations step"
     */
    this.defineStep('I expect each file\'s status to meet expectations', function() {
        let fileList = global.fileList;
        for (let f of fileList) {
            winston.debug(`Checking status ${f.filename} matches ${f.expectedStatus}`);
            UploadPage.ensureFileStatusEqual(f.filename, f.expectedStatus);
        }
    });
};