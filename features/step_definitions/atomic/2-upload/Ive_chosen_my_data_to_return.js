'use strict';
const automateUpload = require('../../../support/lib/automate-upload');
const UploadPage = require('../../../support/pages/upload.page');
module.exports = function () {
    this.defineStep(/^I've chosen my data to return$/, function () {
        const file = 'SUCCESS.csv';
        automateUpload([file]);
        UploadPage.ensureFileStatusEqual(file, 'READY TO SEND');
        UploadPage.continue();
    });
};
