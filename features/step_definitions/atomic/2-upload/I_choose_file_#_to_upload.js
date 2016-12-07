'use strict';
let automateUpload = require("../../../support/lib/automate-upload");
module.exports = function () {
    this.defineStep(/^I choose file (.*) to upload$/, function(filename) {
        automateUpload([filename]);
    });
};