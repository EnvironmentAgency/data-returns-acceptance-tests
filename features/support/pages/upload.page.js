"use strict";
let Page = require('./page');
const winston = require('winston');
const waitForNav = require('../lib/wait-for-navigation-on-action');

function getUploadRowSelector(filename) {
    // Selector to find a row which contains a column with the correct filename
    return `//table[@id="upload-list"]//tr[@filename = '${filename}']`;
}

function getUploadFileStatusSelector(filename) {
    // Selector to find the status text for the file upload row
    return `${getUploadRowSelector(filename)}/td[@class='status']`;
}
function getUploadFileMoreDetailsLinkSelector(filename) {
    // Selector to find the more details link for the file upload row
    return `${getUploadRowSelector(filename)}//td[@class='details']/a`;
}
// function getUploadFileRemoveLinkSelector(filename) {
//     // Selector to find the submit button on the remove file form in the upload list
//     return `${getUploadRowSelector(filename)}/td[@class='remove']//input[@type='submit']`;
// }
//

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

    upload(files) {
        super.checkOpen();
        let uploader = browser.element(this.uploaderXpath);
        uploader.waitForExist(browser.options.waitforTimeout);

        let filenames = Array.isArray(files) ? files : [files];
        filenames = filenames.map(filename => `features/support/files/${filename}`);

        let mustSubmit = browser.isExistingNoWait('#submit-upload');
        for (let filename of filenames) {
            browser.chooseFile(this.uploaderXpath, filename);

            // If JavaScript is disabled then there is an additional step to upload the file(s)
            if (mustSubmit) {
                browser.element('#submit-upload').click();
            }
        }
    }

    ensureFileStatusEqual(filename, status) {
        super.checkOpen();
        let fileStatusSelector = getUploadFileStatusSelector(filename);
        let expectedStatus = status.toUpperCase();
        browser.waitUntil(function () {
            let browserStatus = browser.getText(fileStatusSelector).toUpperCase();
            if (browserStatus !== expectedStatus) {
                winston.debug(`Waiting for ${filename} file status ${browserStatus} to match ${expectedStatus}`);
                return false;
            }
            return true;
        }, browser.options.waitforTimeout, `Unexpected file status.  Expected ${status} for file ${filename}`, 250);
    }

    openFileDetails(filename) {
        super.checkOpen();
        winston.debug(`Opening file details for ${filename} from the file upload table.`);
        browser.click(getUploadFileMoreDetailsLinkSelector(filename));
    }

    ensureCanContinue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        let disabled = button.getAttribute("disabled") === 'true';
        disabled.should.be.false;
    }

    ensureCantContinue() {
        super.checkOpen();
        let button = browser.element("#continueBtn");
        let disabled = button.getAttribute("disabled") === 'true';
        disabled.should.be.true;
    }

    continue() {
        super.checkOpen();
        try {
            browser.waitUntil(function () {
                let isDisabled = browser.getAttribute("#continueBtn","disabled");
                if (isDisabled) {
                    winston.debug(`Waiting for upload page continue button to be enabled before continuing. (isDisabled=${isDisabled})`);
                }
                return !isDisabled;
            }, 20000, `Failed to finish uploading files and continue within the allowed time.`, 500);
        } catch (e) {
            winston.error("Error waiting for continue to be enabled", e);
            throw e;
        }
        waitForNav(function () {
            browser.click("#continueBtn");
        });
    }
}
module.exports = new UploadPage();