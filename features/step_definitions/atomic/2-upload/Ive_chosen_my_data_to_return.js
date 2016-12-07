'use strict';
let automateUpload = require("../../../support/lib/automate-upload");
let UploadPage = require("../../../support/pages/upload.page");
module.exports = function () {
    this.defineStep(/^I've chosen my data to return$/, function () {
        let file = 'SUCCESS.csv';
        automateUpload([file]);
        UploadPage.ensureFileStatusEqual(file, "READY TO SEND");
        UploadPage.continue();
    });
};