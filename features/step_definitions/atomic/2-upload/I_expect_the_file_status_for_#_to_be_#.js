'use strict';
const UploadPage = require('../../../support/pages/upload.page');
module.exports = function () {
    this.defineStep(/^I expect the file status for (.*) to be "([^"]*)"$/, function (filename, expectedStatus) {
        UploadPage.ensureFileStatusEqual(filename, expectedStatus);
    });
};
