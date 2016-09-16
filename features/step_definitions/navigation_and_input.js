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
    this.Then('I input an email address', function () {
        return browser.setValue('.form-control', 'tim.stone.ea+' + Math.round(Math.random() * 1000) + '@gmail.com');
        // return browser.setValue('.form-control', "tim.stone.ea+test@gmail.com");
    });

    this.Then('I enter an invalid email address', function () {
        return browser.setValue('.form-control', "xxxxyz.xyz");
    });

    this.Then('an invalid email error message is shown', function () {
        expect(browser.getText('.error-summary'));
    });

    this.Then('I enter the confirmation code', function () {
        return browser.setValue('.form-control', "1960");
    });
};