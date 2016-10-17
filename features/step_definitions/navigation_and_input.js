// Maximum wait time
const MAX_WAIT = 45000;
const CHECK_INTERVAL = 100;


function getUploadRowSelector(filename) {
    // Selector to find a row which contains a column with the correct filename
    return `//table[@id="upload-list"]//tr[child::td[@class='filename']/text() = '${filename}']`;
}

function getUploadFileStatusSelector(filename) {
    // Selector to find the status text for the file upload row
    return `${getUploadRowSelector(filename)}/td[@class='status']`;
}
function getUploadFileMoreDetailsLinkSelector(filename) {
    // Selector to find the more details link for the file upload row
    return `${getUploadRowSelector(filename)}//td[@class='details']/a`;
}
function getUploadFileRemoveLinkSelector(filename) {
    // Selector to find the submit button on the remove file form in the upload list
    return `${getUploadRowSelector(filename)}/td[@class='remove']//input[@type='submit']`;
}

function waitForText(selector, expectedText) {
    browser.waitUntil(function () {
        let textFound = browser.getText(selector);
        if (textFound) {
            // If there are multiple h1 elements - we're only interested in the first of them
            if (Array.isArray(textFound) && textFound.length > 0) {
                textFound = textFound[0];
            }
            expect(textFound.toLowerCase()).toEqual(expectedText.toLowerCase());
            return true;
        }
        return false;
    }, MAX_WAIT, `Failed to find expected text "${expectedText}" for the selector ${selector} within the allowed time.`, CHECK_INTERVAL);
}


module.exports = function () {

    this.Before(function () {
        return this.browser.url('/start');
    });

    //------------- Page check navigation -----------------------
    this.Given(/^I am on the start page$/, function () {
        return this.browser.url('/start');
    });

    this.Then(/^I am on the "([^"]*)" page$/, function (heading) {
        return waitForText('h1', heading);
    });

    this.Then(/^I see the page header "([^"]*)"$/, function (expectedHeading) {
        return waitForText('//main//h1', expectedHeading);
    });

    //---------------------- Functions specific to the file upload table -------------
    this.Then(/^I expect the file status for (.*) to be "([^"]*)"$/, function (filename, message) {
        let fileStatusSelector = getUploadFileStatusSelector(filename);
        browser.waitUntil(function () {
            return browser.getText(fileStatusSelector) === message;
        }, MAX_WAIT, `Unexpected file status.  Expected ${message} for file ${filename}`, CHECK_INTERVAL);
    });

    this.Then(/^I open the file details for (.*)$/, function (filename) {
        return browser.click(getUploadFileMoreDetailsLinkSelector(filename));
    });

    this.Then(/^I finish uploading files and continue$/, function () {
        browser.waitUntil(function () {
            let isDisabled = browser.getAttribute("#continue-btn", "disabled");
            if (!isDisabled) {
                // Found continue button and it is not disabled, click it and continue...
                browser.click("#continue-btn");
                return true;
            }
            return false;
        }, MAX_WAIT, `Failed to finish uploading files and continue within the allowed time.`, CHECK_INTERVAL);
    });

    this.Then(/^I am unable to continue/, function () {
        return expect(browser.element("#continue-btn").getAttribute("disabled")).not.toBeNull();
    });


    //----------------------Button press -------------
    this.Then(/^I start my submission$/, function () {
        return browser.click('.button-get-started');
    });

    this.Then(/^I choose to "([^"]*)"$/, function (button) {
        let selector = `//*[contains(@class, "button")][@value="${button}" or text() = "${button}"]`;
        return browser.click(selector);
    });

    //------------------ Input email and code --------------------
    this.Then('I submit an email address', function () {
        browser.setValue('.form-control', 'tim.stone.ea+' + Math.round(Math.random() * 1000) + '@gmail.com');
        browser.click("#nextBtn");
    });

    this.Then('I submit an invalid email address', function () {
        browser.setValue('.form-control', "XXXX");
        browser.click("#nextBtn");
    });

    this.Then('I submit an invalid pin number', function () {
        browser.setValue('.form-control', "xxxxyz.xyz");
        browser.click("#nextBtn");
    });

    this.Then('I don\'t enter an email address', function () {
        browser.click("#nextBtn");
    });

    this.Then('I don\'t enter a pin number', function () {
        browser.setValue('.form-control', "");
        browser.click("#nextBtn");
    });


    this.Then(/^an error message is shown$/, function () {
        expect(browser.getText('.error-summary'));
    });

    this.Then(/^I enter the confirmation code$/, function () {
        return browser.setValue('.form-control', "1960");
    });

    this.Given(/^I've chosen my data to return$/, function () {
        // this.browser.url('/start');
        browser.click('.button-get-started');
        browser.chooseFile("//input[@type='file']", `features/support/files/SUCCESS.csv`);
        browser.waitUntil(function () {
            let isDisabled = browser.getAttribute("#continue-btn", "disabled");
            if (!isDisabled) {
                // Found continue button and it is not disabled, click it and continue...
                browser.click("#continue-btn");
                return true;
            }
            return false;
        }, MAX_WAIT, `Failed to finish uploading files and continue within the allowed time.`, CHECK_INTERVAL);
    });

    this.Given(/^I've confirmed my data$/, function () {
        let selector = `//*[contains(@class, "button")][@value="Continue" or text() = "Continue"]`;
        return browser.click(selector);
    });

};