'use strict';
const UploadPage = require('../../../support/pages/upload.page');
module.exports = function () {
    this.defineStep('I finish uploading files and continue', function () {
        UploadPage.continue();
    });
};
