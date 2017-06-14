'use strict';
const UploadPage = require('../../../support/pages/upload.page');
module.exports = function () {
    this.defineStep('I am unable to continue', function () {
        UploadPage.ensureCantContinue();
    });
};
