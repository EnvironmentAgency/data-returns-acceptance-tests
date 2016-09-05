// Maximum wait time
const MAX_WAIT = 45000;
const CHECK_INTERVAL = 100;

function checkForErrorCodeMaker(errorNumber) {
    let expectedErrorCode = `DR${errorNumber}`;
    browser.waitUntil(function () {
        let foundErrorCode = browser.getAttribute("#error_code", "value");
        if (foundErrorCode) {
            expect(expectedErrorCode).toEqual(foundErrorCode);
            return true;
        }
        return false;
    }, MAX_WAIT, `Failed to find expected hidden element with error code for error ${expectedErrorCode} within the allowed time.`, CHECK_INTERVAL);
}

module.exports = function () {
    this.Then(/^Invalid file information contains error for DR(\d+)$/, checkForErrorCodeMaker);
    this.Then(/^I expect the row correction details for error DR(\d+) to be shown$/, checkForErrorCodeMaker);

    this.Then(/^Correction details contains error for DR(\d+) for the header "([^"]+)"$/, function (errorNumber, fieldName) {
        let row = browser.element(`#ERR_DR${errorNumber}`);
        let heading = browser.getText(`#ERR_DR${errorNumber} abbr`);
        return expect(row).not.toBeNull() && expect(heading).toEqual(fieldName);
    });

    this.Then(/^I open row correction details for error DR(\d+)$/, function (errorCode) {
        return browser.click(`//a[contains(@href, 'id=${errorCode}')]`);
    });

    //------------ First level error details table ----------
    this.Given(/^I expect the column heading for error DR(\d+) to be "([^"]+)"$/, function (errorCode, heading) {
        // Column header name is in first cell of the row (td[1])
        return expect(browser.getText(`//tr[@id='ERR_DR${errorCode}']//td[1]`)).toEqual(heading);
    });
    this.Given(/^I expect the error type for error DR(\d+) to be "([^"]+)"$/, function (errorCode, errorType) {
        // Error type is in second cell of the row (td[2])
        return expect(browser.getText(`//tr[@id='ERR_DR${errorCode}']//td[2]`)).toEqual(errorType);
    });
};
