'use strict';
let UploadPage = require("../support/pages/upload.page.js");
module.exports = function () {
    this.defineStep(/^I choose file (.*) to upload$/, function(filename) {
        UploadPage.upload(filename);
    });
};