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
        return browser.element(this.uploaderXpath);
    }

    upload(files) {
        let uploader = browser.element(this.uploaderXpath);
        uploader.waitForExist(browser.options.waitforTimeout);

        let filenames = Array.isArray(files) ? files : [files];
        filenames = filenames.map(filename => `features/support/files/${filename}`);

        let mustSubmit = browser.isExistingSafe('#submit-upload');
        for (let filename of filenames) {
            browser.chooseFile(this.uploaderXpath, filename);

            // If JavaScript is disabled then there is an additional step to upload the file(s)
            if (mustSubmit) {
                browser.element('#submit-upload').click();
            }
        }
    }

    ensureFileStatusEqual(filename, status) {
        let fileStatusSelector = getUploadFileStatusSelector(filename);
        let expectedStatus = status.toUpperCase();
        let actualStatus = null;
        browser.waitUntil(function () {
            try {
                actualStatus = browser.getText(fileStatusSelector).toUpperCase();
            } catch (e) {
                actualStatus = null;
            }

            if (actualStatus !== null && actualStatus  !== expectedStatus) {
                winston.info(`Waiting for ${filename} file status ${actualStatus} to match expected status ${expectedStatus}`);
                return false;
            }
            return true;
        }, browser.options.waitforTimeout, `Unexpected file status.  Expected ${status} for file ${filename}`, browser.options.waitforInterval);
    }

    openFileDetails(filename) {
        winston.debug(`Opening file details for ${filename} from the file upload table.`);
        let selector = getUploadFileMoreDetailsLinkSelector(filename);
        waitForNav(function () {
            browser.click(selector);
        });
    }

    ensureCanContinue() {
        let button = browser.element("#continueBtn");
        let disabled = button.getAttribute("disabled") === 'true';
        disabled.should.be.false;
    }

    ensureCantContinue() {
        let button = browser.element("#continueBtn");
        let disabledAttribute = button.getAttribute("disabled");
        winston.info("Continue button status: " + disabledAttribute);
        let disabled = disabledAttribute === 'true';
        disabled.should.be.true;
    }
}
module.exports = new UploadPage();