"use strict";
let Page = require('./page');
const winston = require('winston');
class FileInvalidPage extends Page {
    get url() {
        return "/file/invalid"
    }

    checkErrorCodeIncluded(errorCode) {
        winston.debug(`Checking invalid file page contains an element with id=error_code with the value ${errorCode}`);
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        foundErrorCode.should.equal(errorCode);
    }
}
module.exports = new FileInvalidPage();