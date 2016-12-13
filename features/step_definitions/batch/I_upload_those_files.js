'use strict';
let automateUpload = require("../../support/lib/automate-upload");
module.exports = function () {
    /**
     * Uploads the files previously defined in the "Given the following files and expectations step"
     */
    this.defineStep('I upload those files',  {timeout: 10 * 60 * 1000}, function() {
        automateUpload(global.fileList.map(f => f.filename));
    });
};