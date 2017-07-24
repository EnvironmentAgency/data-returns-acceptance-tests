'use strict';
const TestFile = require('../../support/lib/TestFile');

module.exports = function () {
    /**
     * Allows for multiple files and expectations to be defined in a single step.
     *
     *
     * Expects a datatable with the following structure
     *
     * | Filename   |
     * | file1.csv  |
     * | file2.csv  |
     * | file3.csv  |
     *
     * If status are provided within the table structure then these shall be checked:
     *
     * | Filename   | Status        |
     * | file1.csv  | READY TO SEND |
     * | file2.csv  | FILE ERROR    |
     * | file3.csv  | DATA ERROR    |
     */
    this.defineStep('I have the following files and expectations', function (dataTable) {
        global.fileList = [];
        for (const row of dataTable.hashes()) {
            const testFile = new TestFile(row.Filename);
            testFile.expectedStatus = row.Status;
            // Extract only numeric portion of the error code
            testFile.errorCode = row.ErrorCode;
            testFile.errorField = row.ErrorField;
            testFile.errorFieldArray = row.ErrorField ? row.ErrorField.split(/\W+/) : [];
            testFile.errorCategories = row.ErrorCategories;
            global.fileList.push(testFile);
        }
    });
};
