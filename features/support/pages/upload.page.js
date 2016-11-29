"use strict";
let Page = require('./page');

const waitForNav = require('../lib/wait-for-navigation-on-action');

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


class UploadPage extends Page {
    get url() {
        return "/file/choose"
    }

    get uploaderXpath() {
        return "//input[@type='file']"
    }

    get uploader() {
        super.checkOpen();
        return browser.element(this.uploaderXpath);
    }

    upload(filename) {
        super.checkOpen();
        let uploader = browser.element(this.uploaderXpath);
        uploader.waitForExist(browser.options.waitforTimeout);
        browser.chooseFile(this.uploaderXpath, `features/support/files/${filename}`);
    }

    ensureFileStatusEqual(filename, status) {
        let fileStatusSelector = getUploadFileStatusSelector(filename);
        browser.waitUntil(function () {
            return browser.getText(fileStatusSelector) === status;
        }, browser.options.waitforTimeout, `Unexpected file status.  Expected ${status} for file ${filename}`, 25);
    }

    openFileDetails(filename) {
        browser.click(getUploadFileMoreDetailsLinkSelector(filename));
    }

    ensureCanContinue() {
        let button = browser.element("#continueBtn");
        let disabled = button.getAttribute("disabled") === 'true';
        disabled.should.be.false;
    }

    ensureCantContinue() {
        let button = browser.element("#continueBtn");
        let disabled = button.getAttribute("disabled") === 'true';
        disabled.should.be.true;
    }

    continue() {
        browser.waitUntil(function () {
            let button = browser.element("#continueBtn");
            let isDisabled = button.getAttribute("disabled");
            if (!isDisabled) {
                // Found continue button and it is not disabled, click it and continue...
                // button.click();
                return true;
            }
            return false;
        }, browser.options.waitforTimeout, `Failed to finish uploading files and continue within the allowed time.`, 25);

        waitForNav(function() {
            browser.click("#continueBtn");
        });
    }
}
module.exports = new UploadPage();