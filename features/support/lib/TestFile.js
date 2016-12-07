'use strict';
class TestFile {
    /**
     * Create a new test file
     *
     * @param filename the local filename of the file to test
     * @param expectedStatus the expected status of the file when uploaded (e.g. "READY TO SEND")
     * @param errorCode
     * @param errorCategories
     */
    constructor(filename, expectedStatus, errorCode, errorField, errorCategories) {
        this.filename = filename;
        this.expectedStatus = expectedStatus;
        this.errorCode = errorCode;
        this.errorCategories = errorCategories;
    }

    get filename() {
        return this._filename
    }

    set filename(filename) {
        this._filename = filename
    }

    get expectedStatus() {
        return this._expectedStatus
    }

    set expectedStatus(expectedStatus) {
        this._expectedStatus = expectedStatus
    }

    get errorCode() {
        return this._errorCode
    }

    set errorCode(errorCode) {
        this._errorCode = errorCode
    }

    get errorField() {
        return this._errorField
    }

    set errorField(errorField) {
        this._errorField = errorField
    }

    get errorHeading() {
        return this._errorHeading
    }

    set errorHeading(errorHeading) {
        this._errorHeading = errorHeading
    }


    get errorCategories() {
        return this._errorCategories
    }

    set errorCategories(errorCategories) {
        this._errorCategories = errorCategories
    }
}

module.exports = TestFile;