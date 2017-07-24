'use strict';
class TestFile {
    /**
     * Create a new test file
     *
     * @param {String} filename the local filename of the file to test
     */
    constructor (filename) {
        this.filename = filename;
    }

    get filename () {
        return this._filename;
    }

    set filename (filename) {
        this._filename = filename;
    }

    get expectedStatus () {
        return this._expectedStatus;
    }

    set expectedStatus (expectedStatus) {
        this._expectedStatus = expectedStatus;
    }

    get errorCode () {
        return this._errorCode;
    }

    set errorCode (errorCode) {
        this._errorCode = errorCode;
    }

    get errorField () {
        return this._errorField;
    }

    set errorField (errorField) {
        this._errorField = errorField;
    }

    get errorFieldArray () {
        return this._errorFieldArray;
    }

    set errorFieldArray (errorFieldArray) {
        this._errorFieldArray = errorFieldArray;
    }

    get errorCategories () {
        return this._errorCategories;
    }

    set errorCategories (errorCategories) {
        this._errorCategories = errorCategories;
    }
}

module.exports = TestFile;
